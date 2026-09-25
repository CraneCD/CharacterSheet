import express from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { loadCampaign } from '../lib/campaignAccess';

// Mounted at /api/campaigns/:id/encounters (after authenticateToken). DM only:
// players see the active encounter through GET /api/campaigns/:id.
const router = express.Router({ mergeParams: true });

const STATUSES = ['planned', 'active', 'completed'] as const;

const hpSchema = z.object({
    current: z.number().int().min(-9999).max(9999),
    max: z.number().int().min(0).max(9999),
    temp: z.number().int().min(0).max(9999).default(0),
});

const combatantSchema = z.object({
    id: z.string().min(1).max(64),
    kind: z.enum(['pc', 'monster', 'npc']),
    name: z.string().trim().min(1).max(100),
    characterId: z.string().max(64).optional(),
    /** SRD monster key or custom Monster id */
    monsterId: z.string().max(100).optional(),
    monsterSource: z.enum(['srd', 'custom']).optional(),
    initiative: z.number().int().min(-20).max(99).nullable(),
    initiativeBonus: z.number().int().min(-20).max(30).default(0),
    ac: z.number().int().min(0).max(50).optional(),
    hp: hpSchema.optional(),
    conditions: z.array(z.string().max(40)).max(20).optional(),
    xp: z.number().int().min(0).max(200000).optional(),
    hidden: z.boolean().optional(),
    defeated: z.boolean().optional(),
    notes: z.string().max(1000).optional(),
});

const encounterDataSchema = z.object({
    combatants: z.array(combatantSchema).max(80),
    /** 0 until combat starts */
    round: z.number().int().min(0).max(9999),
    /** Index into combatants (stored in turn order) */
    turn: z.number().int().min(0).max(80),
    log: z.array(z.string().max(300)).max(200).optional(),
});

const EMPTY_DATA = { combatants: [], round: 0, turn: 0 };

const createSchema = z.object({
    name: z.string().trim().min(1, 'Give the encounter a name').max(100),
    data: encounterDataSchema.optional(),
});

const updateSchema = z.object({
    name: z.string().trim().min(1, 'Give the encounter a name').max(100).optional(),
    status: z.enum(STATUSES).optional(),
    data: encounterDataSchema.optional(),
});

function sendValidationError(res: express.Response, error: z.ZodError) {
    return res.status(400).json({ error: error.errors });
}

async function findEncounter(campaignId: string, encounterId: string) {
    const encounter = await prisma.encounter.findUnique({ where: { id: encounterId } });
    return encounter && encounter.campaignId === campaignId ? encounter : null;
}

router.get('/', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const encounters = await prisma.encounter.findMany({
            where: { campaignId: loaded.campaign.id },
            orderBy: { updatedAt: 'desc' },
        });
        res.json(encounters);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch encounters' });
    }
});

router.post('/', async (req: AuthRequest, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const encounter = await prisma.encounter.create({
            data: { campaignId: loaded.campaign.id, name: parsed.data.name, data: parsed.data.data ?? EMPTY_DATA },
        });
        res.status(201).json(encounter);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create encounter' });
    }
});

router.get('/:encounterId', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const encounter = await findEncounter(loaded.campaign.id, req.params.encounterId);
        if (!encounter) return res.status(404).json({ error: 'Encounter not found' });
        res.json(encounter);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch encounter' });
    }
});

// Save the encounter. Starting one (status: active) sets any other running
// encounter in the campaign back to planned: players follow one fight at a time.
router.put('/:encounterId', async (req: AuthRequest, res) => {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const encounter = await findEncounter(loaded.campaign.id, req.params.encounterId);
        if (!encounter) return res.status(404).json({ error: 'Encounter not found' });

        const update = prisma.encounter.update({ where: { id: encounter.id }, data: parsed.data });
        if (parsed.data.status === 'active' && encounter.status !== 'active') {
            const [, updated] = await prisma.$transaction([
                prisma.encounter.updateMany({
                    where: { campaignId: loaded.campaign.id, status: 'active', id: { not: encounter.id } },
                    data: { status: 'planned' },
                }),
                update,
            ]);
            return res.json(updated);
        }
        res.json(await update);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save encounter' });
    }
});

router.delete('/:encounterId', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const encounter = await findEncounter(loaded.campaign.id, req.params.encounterId);
        if (!encounter) return res.status(404).json({ error: 'Encounter not found' });
        await prisma.encounter.delete({ where: { id: encounter.id } });
        res.json({ message: 'Encounter deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete encounter' });
    }
});

export default router;
