import express from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { loadCampaign } from '../lib/campaignAccess';
import { itemFields } from '../lib/itemSchema';

// Mounted at /api/campaigns/:id/items (after authenticateToken). The campaign's
// loot: the DM sees and edits everything; players see revealed items only,
// without the DM's notes.
const router = express.Router({ mergeParams: true });

const itemSchema = z.object({
    ...itemFields,
    /** A character in this campaign, or null for the party / nobody yet */
    heldBy: z.string().max(64).nullable().optional(),
});

function sendValidationError(res: express.Response, error: z.ZodError) {
    return res.status(400).json({ error: error.errors });
}

/** heldBy must be a character in this campaign. */
async function checkHolder(campaignId: string, heldBy: string | null | undefined) {
    if (!heldBy) return true;
    const character = await prisma.character.findUnique({ where: { id: heldBy }, select: { campaignId: true } });
    return character?.campaignId === campaignId;
}

async function findItem(campaignId: string, itemId: string) {
    const item = await prisma.campaignItem.findUnique({ where: { id: itemId } });
    return item && item.campaignId === campaignId ? item : null;
}

router.get('/', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res);
        if (!loaded) return;
        const isDm = loaded.role === 'dm';
        const items = await prisma.campaignItem.findMany({
            where: { campaignId: loaded.campaign.id, ...(isDm ? {} : { revealed: true }) },
            orderBy: [{ revealed: 'desc' }, { name: 'asc' }],
        });
        res.json(items.map(({ dmNotes, ...item }) => (isDm ? { ...item, dmNotes } : item)));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch loot' });
    }
});

router.post('/', async (req: AuthRequest, res) => {
    const parsed = itemSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        if (!(await checkHolder(loaded.campaign.id, parsed.data.heldBy))) {
            return res.status(400).json({ error: "That character isn't in this campaign" });
        }
        const item = await prisma.campaignItem.create({ data: { ...parsed.data, campaignId: loaded.campaign.id, name: parsed.data.name } });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

router.put('/:itemId', async (req: AuthRequest, res) => {
    const parsed = itemSchema.partial().safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const existing = await findItem(loaded.campaign.id, req.params.itemId);
        if (!existing) return res.status(404).json({ error: 'Item not found' });
        if (!(await checkHolder(loaded.campaign.id, parsed.data.heldBy))) {
            return res.status(400).json({ error: "That character isn't in this campaign" });
        }
        const item = await prisma.campaignItem.update({ where: { id: existing.id }, data: parsed.data });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save item' });
    }
});

router.delete('/:itemId', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const existing = await findItem(loaded.campaign.id, req.params.itemId);
        if (!existing) return res.status(404).json({ error: 'Item not found' });
        await prisma.campaignItem.delete({ where: { id: existing.id } });
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

export default router;
