import express from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { monsterSchema } from '../lib/monsterSchema';

// A DM's custom monsters, usable in any campaign they run. SRD monsters are
// reference data (/api/reference/monsters).
const router = express.Router();

router.use(authenticateToken);

const MAX_MONSTERS_PER_USER = 500;

function sendValidationError(res: express.Response, error: z.ZodError) {
    return res.status(400).json({ error: error.errors });
}

/** Stored row -> the same shape as an SRD monster, plus `source` so encounters know where it came from. */
function toMonster(row: { id: string; name: string; data: unknown; updatedAt: Date }) {
    return { ...(row.data as object), id: row.id, name: row.name, source: 'custom', updatedAt: row.updatedAt };
}

async function findOwned(req: AuthRequest, res: express.Response) {
    const row = await prisma.monster.findUnique({ where: { id: req.params.id } });
    if (!row || row.ownerId !== req.user!.id) {
        res.status(404).json({ error: 'Monster not found' });
        return null;
    }
    return row;
}

router.get('/', async (req: AuthRequest, res) => {
    try {
        const rows = await prisma.monster.findMany({ where: { ownerId: req.user!.id }, orderBy: { name: 'asc' } });
        res.json(rows.map(toMonster));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch monsters' });
    }
});

router.post('/', async (req: AuthRequest, res) => {
    const parsed = monsterSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const count = await prisma.monster.count({ where: { ownerId: req.user!.id } });
        if (count >= MAX_MONSTERS_PER_USER) {
            return res.status(400).json({ error: `You can keep up to ${MAX_MONSTERS_PER_USER} custom monsters` });
        }
        const { id: _ignored, source: _source, ...data } = parsed.data as any;
        const row = await prisma.monster.create({ data: { ownerId: req.user!.id, name: data.name, data } });
        res.status(201).json(toMonster(row));
    } catch (error) {
        res.status(500).json({ error: 'Failed to save monster' });
    }
});

router.put('/:id', async (req: AuthRequest, res) => {
    const parsed = monsterSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const existing = await findOwned(req, res);
        if (!existing) return;
        const { id: _ignored, source: _source, updatedAt: _updated, ...data } = parsed.data as any;
        const row = await prisma.monster.update({ where: { id: existing.id }, data: { name: data.name, data } });
        res.json(toMonster(row));
    } catch (error) {
        res.status(500).json({ error: 'Failed to save monster' });
    }
});

router.delete('/:id', async (req: AuthRequest, res) => {
    try {
        const existing = await findOwned(req, res);
        if (!existing) return;
        await prisma.monster.delete({ where: { id: existing.id } });
        res.json({ message: 'Monster deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete monster' });
    }
});

export default router;
