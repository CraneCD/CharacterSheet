import express from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { loadCampaign } from '../lib/campaignAccess';

// Mounted at /api/campaigns/:id/sessions (after authenticateToken). Everyone in
// the campaign reads the log; only the DM writes it or sees dmNotes.
const router = express.Router({ mergeParams: true });

const dateOnly = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Use a date like 2026-09-25');

const sessionSchema = z.object({
    title: z.string().trim().min(1, 'Give the session a title').max(150),
    playedOn: dateOnly.nullable().optional(),
    recap: z.string().max(20000).optional(),
    dmNotes: z.string().max(20000).optional(),
});

function sendValidationError(res: express.Response, error: z.ZodError) {
    return res.status(400).json({ error: error.errors });
}

const toDate = (value: string | null | undefined) =>
    value === undefined ? undefined : value === null ? null : new Date(`${value}T00:00:00.000Z`);

router.get('/', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res);
        if (!loaded) return;
        const sessions = await prisma.campaignSession.findMany({
            where: { campaignId: loaded.campaign.id },
            orderBy: [{ playedOn: { sort: 'desc', nulls: 'first' } }, { createdAt: 'desc' }],
        });
        const isDm = loaded.role === 'dm';
        res.json(sessions.map(({ dmNotes, ...s }) => (isDm ? { ...s, dmNotes } : s)));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch sessions' });
    }
});

router.post('/', async (req: AuthRequest, res) => {
    const parsed = sessionSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const { title, recap, dmNotes, playedOn } = parsed.data;
        const session = await prisma.campaignSession.create({
            data: { campaignId: loaded.campaign.id, title, recap, dmNotes, playedOn: toDate(playedOn) ?? null },
        });
        res.status(201).json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add session' });
    }
});

router.put('/:sessionId', async (req: AuthRequest, res) => {
    const parsed = sessionSchema.partial().safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const existing = await prisma.campaignSession.findUnique({ where: { id: req.params.sessionId } });
        if (!existing || existing.campaignId !== loaded.campaign.id) return res.status(404).json({ error: 'Session not found' });
        const { playedOn, ...rest } = parsed.data;
        const session = await prisma.campaignSession.update({
            where: { id: existing.id },
            data: { ...rest, playedOn: toDate(playedOn) },
        });
        res.json(session);
    } catch (error) {
        res.status(500).json({ error: 'Failed to save session' });
    }
});

router.delete('/:sessionId', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const existing = await prisma.campaignSession.findUnique({ where: { id: req.params.sessionId } });
        if (!existing || existing.campaignId !== loaded.campaign.id) return res.status(404).json({ error: 'Session not found' });
        await prisma.campaignSession.delete({ where: { id: existing.id } });
        res.json({ message: 'Session deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete session' });
    }
});

export default router;
