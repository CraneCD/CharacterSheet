import express from 'express';
import { z } from 'zod';
import { authenticateToken, requireAdmin, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { invalidateReferenceCache } from '../lib/referenceCache';
import { REFERENCE_TYPES, ReferenceType, isReferenceType, withCanonicalId } from '../lib/referenceTypes';
import { uniqueSlug } from '../utils/slug';

const router = express.Router();

router.use(authenticateToken, requireAdmin);

// Loose per-type shape checks. This is an internal admin tool, not public
// input — the goal is to catch typos that would break the character sheet
// (a missing `hitDie`, a spell with no `name`), not to fully model every
// resource. .passthrough() keeps any extra fields the admin form sends.
const shapeSchemas: Record<ReferenceType, z.ZodTypeAny> = {
    spell: z.object({
        name: z.string().min(1),
        level: z.number().int().min(0).max(9),
        school: z.string().min(1),
        castingTime: z.string().min(1),
        range: z.string().min(1),
        components: z.string().min(1),
        duration: z.string().min(1),
        classes: z.array(z.string()),
        description: z.string().min(1),
        ritual: z.boolean().optional(),
    }).passthrough(),
    race: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        size: z.string().min(1),
        speed: z.number(),
        traits: z.array(z.string()),
        languages: z.array(z.string()),
    }).passthrough(),
    class: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        hitDie: z.number().int().positive(),
        primaryAbility: z.array(z.string()),
        savingThrows: z.array(z.string()),
        spellcaster: z.boolean(),
    }).passthrough(),
    background: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        // 2024 backgrounds: three ability options and an Origin feat; legacy ones may keep a narrative feature.
        abilityScores: z.array(z.enum(['str', 'dex', 'con', 'int', 'wis', 'cha'])).length(3).optional(),
        originFeat: z.string().min(1).optional(),
        feature: z.object({ name: z.string(), description: z.string() }).optional(),
    }).passthrough(),
    subclass: z.object({
        classId: z.string().min(1),
        name: z.string().min(1),
        description: z.string().min(1),
        features: z.array(z.object({
            level: z.number().int(),
            name: z.string(),
            description: z.string(),
        })),
    }).passthrough(),
    // key = classId; data is the class's whole feature list, not a single object.
    classFeature: z.array(z.object({
        level: z.number().int(),
        name: z.string().min(1),
        description: z.string().min(1),
    })),
    feat: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
    }).passthrough(),
    baseItem: z.object({
        name: z.string().min(1),
        category: z.enum(['armor', 'weapon', 'shield', 'tool', 'magic-item', 'potion', 'scroll', 'miscellaneous']),
    }).passthrough(),
    // key = trait name.
    trait: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
    }).passthrough(),
    fightingStyle: z.object({
        name: z.string().min(1),
        description: z.string().min(1),
    }).passthrough(),
};

function parseType(req: express.Request, res: express.Response): ReferenceType | null {
    const { type } = req.params;
    if (!isReferenceType(type)) {
        res.status(404).json({ error: `Unknown reference type: ${type}` });
        return null;
    }
    return type;
}

// List all reference types with row counts, for the admin home page.
router.get('/reference', async (req, res) => {
    const counts = await Promise.all(
        REFERENCE_TYPES.map(async (type) => ({
            type,
            count: await prisma.referenceItem.count({ where: { type } }),
        }))
    );
    res.json(counts);
});

// List rows for a type, optionally filtered by ?q= (matches key or data.name).
router.get('/reference/:type', async (req, res) => {
    const type = parseType(req, res);
    if (!type) return;

    const rows = await prisma.referenceItem.findMany({ where: { type }, orderBy: { key: 'asc' } });
    const q = typeof req.query.q === 'string' ? req.query.q.trim().toLowerCase() : '';
    const filtered = q
        ? rows.filter((r) => {
            const name = (r.data as any)?.name;
            return r.key.toLowerCase().includes(q) || (typeof name === 'string' && name.toLowerCase().includes(q));
        })
        : rows;

    res.json(filtered.map((r) => ({
        key: r.key,
        data: withCanonicalId(type, r.key, r.data),
        updatedAt: r.updatedAt,
    })));
});

// Get a single row.
router.get('/reference/:type/:key', async (req, res) => {
    const type = parseType(req, res);
    if (!type) return;

    const row = await prisma.referenceItem.findUnique({ where: { type_key: { type, key: req.params.key } } });
    if (!row) return res.status(404).json({ error: 'Not found' });

    res.json({ key: row.key, data: withCanonicalId(type, row.key, row.data), updatedAt: row.updatedAt });
});

const createSchema = z.object({
    key: z.string().trim().min(1).max(200).optional(),
    data: z.any(),
});

// Create a new row. `key` is optional for types whose data carries a `name`
// (it's slugified into a key); required for `trait` (key = trait name) and
// `classFeature` (key = classId).
router.post('/reference/:type', async (req, res) => {
    const type = parseType(req, res);
    if (!type) return;

    const parsedBody = createSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(400).json({ error: parsedBody.error.errors });
    }

    const shapeResult = shapeSchemas[type].safeParse(parsedBody.data.data);
    if (!shapeResult.success) {
        return res.status(400).json({ error: shapeResult.error.errors });
    }

    let key = parsedBody.data.key;
    if (!key) {
        const name = Array.isArray(shapeResult.data) ? undefined : shapeResult.data?.name;
        if (!name) {
            return res.status(400).json({ error: 'key is required for this type' });
        }
        if (type === 'trait') {
            // Traits are looked up by exact name (not a slug) throughout the
            // frontend (racial traits reference them by their literal string).
            key = name.trim();
        } else {
            const taken = new Set((await prisma.referenceItem.findMany({ where: { type }, select: { key: true } })).map(r => r.key));
            key = uniqueSlug(name, taken);
        }
    }

    try {
        const row = await prisma.referenceItem.create({
            data: { type, key, data: shapeResult.data },
        });
        invalidateReferenceCache(type);
        res.status(201).json({ key: row.key, data: withCanonicalId(type, row.key, row.data), updatedAt: row.updatedAt });
    } catch (error: any) {
        if (error?.code === 'P2002') {
            return res.status(409).json({ error: `A ${type} with key "${key}" already exists` });
        }
        throw error;
    }
});

// Replace a row's data. Key is immutable once created.
router.put('/reference/:type/:key', async (req, res) => {
    const type = parseType(req, res);
    if (!type) return;

    const shapeResult = shapeSchemas[type].safeParse(req.body?.data);
    if (!shapeResult.success) {
        return res.status(400).json({ error: shapeResult.error.errors });
    }

    const existing = await prisma.referenceItem.findUnique({ where: { type_key: { type, key: req.params.key } } });
    if (!existing) return res.status(404).json({ error: 'Not found' });

    const row = await prisma.referenceItem.update({
        where: { type_key: { type, key: req.params.key } },
        data: { data: shapeResult.data },
    });
    invalidateReferenceCache(type);
    res.json({ key: row.key, data: withCanonicalId(type, row.key, row.data), updatedAt: row.updatedAt });
});

router.delete('/reference/:type/:key', async (req, res) => {
    const type = parseType(req, res);
    if (!type) return;

    try {
        await prisma.referenceItem.delete({ where: { type_key: { type, key: req.params.key } } });
        invalidateReferenceCache(type);
        res.json({ success: true });
    } catch (error: any) {
        if (error?.code === 'P2025') {
            return res.status(404).json({ error: 'Not found' });
        }
        throw error;
    }
});

export default router;
