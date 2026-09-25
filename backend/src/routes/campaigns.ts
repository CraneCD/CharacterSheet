import express from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { prisma } from '../lib/prisma';
import { displayUserName, getCampaignRole, loadCampaign, normalizeJoinCode, withUniqueJoinCode } from '../lib/campaignAccess';
import { basicCharacterView, dmCharacterView, playerEncounterView } from '../lib/campaignViews';
import encounterRoutes from './encounters';
import sessionRoutes from './sessions';
import itemRoutes from './items';
import { exportPrep, importAsNewCampaign, importIntoCampaign, prepSchema } from '../lib/campaignPrep';

const router = express.Router();

router.use(authenticateToken);

const characterFields = { id: true, userId: true, name: true, race: true, class: true, level: true, updatedAt: true, data: true } as const;

const createSchema = z.object({
    name: z.string().trim().min(1, 'Give the campaign a name').max(100),
    description: z.string().trim().max(2000).optional(),
});

const updateSchema = z.object({
    name: z.string().trim().min(1, 'Give the campaign a name').max(100).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
    notes: z.string().max(50000).nullable().optional(),
});

const joinSchema = z.object({
    joinCode: z.string().min(1, 'Enter a join code').max(20),
    characterId: z.string().max(64).optional(),
});

function sendValidationError(res: express.Response, error: z.ZodError) {
    return res.status(400).json({ error: error.errors });
}

// List campaigns you run or play in
router.get('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;
        const campaigns = await prisma.campaign.findMany({
            where: { OR: [{ dmId: userId }, { members: { some: { userId } } }] },
            include: {
                dm: { select: { name: true, email: true } },
                _count: { select: { members: true, characters: true } },
                characters: { where: { userId }, select: { id: true, name: true } },
                encounters: { where: { status: 'active' }, select: { id: true, name: true } },
            },
            orderBy: { updatedAt: 'desc' },
        });
        res.json(campaigns.map((c) => ({
            id: c.id,
            name: c.name,
            description: c.description,
            role: c.dmId === userId ? 'dm' : 'player',
            dmName: displayUserName(c.dm),
            memberCount: c._count.members,
            characterCount: c._count.characters,
            myCharacters: c.characters,
            activeEncounter: c.encounters[0] ?? null,
            updatedAt: c.updatedAt,
        })));
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});

// Create a campaign (you're its DM)
router.post('/', async (req: AuthRequest, res) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const campaign = await withUniqueJoinCode((joinCode) => prisma.campaign.create({
            data: { dmId: req.user!.id, name: parsed.data.name, description: parsed.data.description || null, joinCode },
        }));
        res.status(201).json({ ...campaign, role: 'dm' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create campaign' });
    }
});

/**
 * Put one of your characters in a campaign you play in. A character is in one
 * campaign at a time, so this moves it out of any other.
 */
async function assignCharacter(userId: string, characterId: string, campaignId: string | null) {
    const character = await prisma.character.findUnique({ where: { id: characterId } });
    if (!character || character.userId !== userId) return { status: 403, error: 'Access denied' } as const;
    if (campaignId) {
        const campaign = await prisma.campaign.findUnique({ where: { id: campaignId } });
        const role = campaign ? await getCampaignRole(userId, campaign) : null;
        if (!campaign || !role) return { status: 404, error: 'Campaign not found' } as const;
        if (role === 'dm') return { status: 400, error: "You're the DM of this campaign; characters join as players" } as const;
    }
    const updated = await prisma.character.update({
        where: { id: characterId },
        data: { campaignId },
        select: { id: true, campaignId: true, campaign: { select: { id: true, name: true } } },
    });
    return { status: 200, body: updated } as const;
}

// Join with a code, optionally bringing a character
router.post('/join', async (req: AuthRequest, res) => {
    const parsed = joinSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const userId = req.user!.id;
        const joinCode = normalizeJoinCode(parsed.data.joinCode);
        const campaign = await prisma.campaign.findUnique({ where: { joinCode } });
        if (!campaign) {
            return res.status(404).json({ error: 'No campaign has that code. Check it with your DM.' });
        }
        if (campaign.dmId === userId) {
            return res.status(400).json({ error: "You're the DM of this campaign" });
        }
        const existing = await prisma.campaignMember.findUnique({
            where: { campaignId_userId: { campaignId: campaign.id, userId } },
        });
        if (existing) {
            return res.status(409).json({ error: "You're already in this campaign" });
        }
        if (parsed.data.characterId) {
            const character = await prisma.character.findUnique({ where: { id: parsed.data.characterId } });
            if (!character || character.userId !== userId) return res.status(403).json({ error: 'Access denied' });
        }

        await prisma.campaignMember.create({ data: { campaignId: campaign.id, userId } });
        if (parsed.data.characterId) {
            await assignCharacter(userId, parsed.data.characterId, campaign.id);
        }
        res.json({ campaign: { id: campaign.id, name: campaign.name } });
    } catch (error) {
        res.status(500).json({ error: 'Failed to join campaign' });
    }
});

// Start a new campaign (you're its DM) from a prep file
router.post('/import', async (req: AuthRequest, res) => {
    const parsed = prepSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        res.status(201).json(await importAsNewCampaign(parsed.data, req.user!.id));
    } catch (error) {
        res.status(500).json({ error: 'Failed to import the campaign' });
    }
});

// Move one of your characters into a campaign you're in, or out of its campaign (campaignId: null)
router.put('/assign-character', async (req: AuthRequest, res) => {
    const parsed = z.object({ characterId: z.string().max(64), campaignId: z.string().max(64).nullable() }).safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const result = await assignCharacter(req.user!.id, parsed.data.characterId, parsed.data.campaignId);
        if (result.status !== 200) return res.status(result.status).json({ error: result.error });
        res.json(result.body);
    } catch (error) {
        res.status(500).json({ error: "Failed to update the character's campaign" });
    }
});

// One campaign: members, party, active encounter (+ join code and notes for the DM)
router.get('/:id', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res);
        if (!loaded) return;
        const { campaign, role } = loaded;
        const isDm = role === 'dm';

        const [dm, members, characters, active] = await Promise.all([
            prisma.user.findUnique({ where: { id: campaign.dmId }, select: { id: true, name: true, email: true } }),
            prisma.campaignMember.findMany({
                where: { campaignId: campaign.id },
                include: { user: { select: { id: true, name: true, email: true } } },
                orderBy: { joinedAt: 'asc' },
            }),
            prisma.character.findMany({ where: { campaignId: campaign.id }, select: characterFields, orderBy: { name: 'asc' } }),
            prisma.encounter.findFirst({ where: { campaignId: campaign.id, status: 'active' }, orderBy: { updatedAt: 'desc' } }),
        ]);

        res.json({
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            role,
            dm: dm ? { id: dm.id, name: displayUserName(dm) } : null,
            joinCode: isDm ? campaign.joinCode : undefined,
            notes: isDm ? campaign.notes ?? '' : undefined,
            members: members.map((m) => ({ userId: m.userId, name: displayUserName(m.user), joinedAt: m.joinedAt })),
            // Players see who's in the party, never each other's sheets
            party: characters.map((c) => (isDm ? dmCharacterView(c) : { ...basicCharacterView(c), isMine: c.userId === req.user!.id })),
            activeEncounter: active ? (isDm ? { id: active.id, name: active.name } : playerEncounterView(active)) : null,
            createdAt: campaign.createdAt,
            updatedAt: campaign.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaign' });
    }
});

// Rename, describe, or save DM notes
router.patch('/:id', async (req: AuthRequest, res) => {
    const parsed = updateSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const updated = await prisma.campaign.update({ where: { id: loaded.campaign.id }, data: parsed.data });
        res.json({ id: updated.id, name: updated.name, description: updated.description, notes: updated.notes ?? '', updatedAt: updated.updatedAt });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update campaign' });
    }
});

// Delete a campaign. Characters stay with their players, just not in a campaign.
router.delete('/:id', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        await prisma.campaign.delete({ where: { id: loaded.campaign.id } });
        res.json({ message: 'Campaign deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete campaign' });
    }
});

// New join code (the old one stops working)
router.post('/:id/join-code', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        const updated = await withUniqueJoinCode((joinCode) => prisma.campaign.update({
            where: { id: loaded.campaign.id },
            data: { joinCode },
        }));
        res.json({ joinCode: updated.joinCode });
    } catch (error) {
        res.status(500).json({ error: 'Failed to make a new join code' });
    }
});

// Leave (your own id) or, as the DM, remove a player. Their characters leave with them.
router.delete('/:id/members/:userId', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res);
        if (!loaded) return;
        const { campaign, role } = loaded;
        const targetId = req.params.userId;
        const isSelf = targetId === req.user!.id;
        if (!isSelf && role !== 'dm') return res.status(403).json({ error: 'Only the DM can remove players' });
        if (targetId === campaign.dmId) return res.status(400).json({ error: "The DM can't leave their own campaign; delete it instead" });

        const member = await prisma.campaignMember.findUnique({
            where: { campaignId_userId: { campaignId: campaign.id, userId: targetId } },
        });
        if (!member) return res.status(404).json({ error: 'Not a member of this campaign' });

        await prisma.$transaction([
            prisma.character.updateMany({ where: { campaignId: campaign.id, userId: targetId }, data: { campaignId: null } }),
            prisma.campaignMember.delete({ where: { id: member.id } }),
        ]);
        res.json({ message: isSelf ? 'You left the campaign' : 'Player removed' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update membership' });
    }
});

// Download the campaign's prep (notes, sessions, encounters, custom monsters, loot)
router.get('/:id/prep', async (req: AuthRequest, res) => {
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        res.json(await exportPrep(loaded.campaign.id));
    } catch (error) {
        res.status(500).json({ error: 'Failed to export the campaign' });
    }
});

// Add a prep file's content to this campaign
router.post('/:id/prep', async (req: AuthRequest, res) => {
    const parsed = prepSchema.safeParse(req.body);
    if (!parsed.success) return sendValidationError(res, parsed.error);
    try {
        const loaded = await loadCampaign(req, res, { dmOnly: true });
        if (!loaded) return;
        res.json(await importIntoCampaign(parsed.data, loaded.campaign, req.user!.id));
    } catch (error) {
        res.status(500).json({ error: 'Failed to import into the campaign' });
    }
});

router.use('/:id/encounters', encounterRoutes);
router.use('/:id/sessions', sessionRoutes);
router.use('/:id/items', itemRoutes);

export default router;
