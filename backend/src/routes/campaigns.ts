import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// List campaigns (DM'd or Joined)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;

        const campaigns = await prisma.campaign.findMany({
            where: {
                OR: [
                    { dmId: userId },
                    { members: { some: { userId } } }
                ]
            },
            include: {
                dm: { select: { name: true } },
                _count: { select: { members: true, characters: true } }
            }
        });

        res.json(campaigns);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch campaigns' });
    }
});

// Create Campaign
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;
        const { name, description } = req.body;

        // Generate a simple 6-char join code
        const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        const campaign = await prisma.campaign.create({
            data: {
                dmId: userId,
                name,
                description,
                joinCode
            }
        });

        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create campaign' });
    }
});

// Join Campaign via Code
router.post('/join', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const userId = req.user!.id;
        const { joinCode } = req.body;

        const campaign = await prisma.campaign.findUnique({ where: { joinCode } });
        if (!campaign) {
            return res.status(404).json({ error: 'Campaign not found' });
        }

        // Check if already a member
        const existingMember = await prisma.campaignMember.findUnique({
            where: {
                campaignId_userId: {
                    campaignId: campaign.id,
                    userId
                }
            }
        });

        if (existingMember) {
            return res.status(400).json({ error: 'Already a member' });
        }

        await prisma.campaignMember.create({
            data: {
                campaignId: campaign.id,
                userId
            }
        });

        res.json({ message: 'Joined campaign successfully', campaign });
    } catch (error) {
        res.status(500).json({ error: 'Failed to join campaign' });
    }
});

export default router;
