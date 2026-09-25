import { randomInt } from 'crypto';
import express from 'express';
import { Campaign } from '@prisma/client';
import { prisma } from './prisma';
import { AuthRequest } from '../middleware/auth';

export type CampaignRole = 'dm' | 'player';

/** The requester's role in a campaign, or null when they aren't in it. */
export async function getCampaignRole(userId: string, campaign: Pick<Campaign, 'id' | 'dmId'>): Promise<CampaignRole | null> {
    if (campaign.dmId === userId) return 'dm';
    const member = await prisma.campaignMember.findUnique({
        where: { campaignId_userId: { campaignId: campaign.id, userId } },
    });
    return member ? 'player' : null;
}

/**
 * Load the campaign in `req.params.id` and check the requester's role. Sends
 * 404 (for campaigns you aren't in too, so ids can't be probed) or 403 when
 * `dmOnly` and you're a player, and returns null.
 */
export async function loadCampaign(
    req: AuthRequest,
    res: express.Response,
    options: { dmOnly?: boolean } = {}
): Promise<{ campaign: Campaign; role: CampaignRole } | null> {
    const campaign = await prisma.campaign.findUnique({ where: { id: req.params.id } });
    const role = campaign ? await getCampaignRole(req.user!.id, campaign) : null;
    if (!campaign || !role) {
        res.status(404).json({ error: 'Campaign not found' });
        return null;
    }
    if (options.dmOnly && role !== 'dm') {
        res.status(403).json({ error: 'Only the DM can do that' });
        return null;
    }
    return { campaign, role };
}

// No 0/O or 1/I/L: codes get read aloud and typed from a screen.
const CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const JOIN_CODE_LENGTH = 6;

export function generateJoinCode(): string {
    let code = '';
    for (let i = 0; i < JOIN_CODE_LENGTH; i++) code += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
    return code;
}

/** Join codes are typed by people: ignore case, spaces and dashes. */
export function normalizeJoinCode(value: unknown): string {
    return typeof value === 'string' ? value.toUpperCase().replace(/[\s-]/g, '') : '';
}

/**
 * Run `write` with a fresh join code, retrying on the (rare) unique-constraint
 * collision instead of failing the request.
 */
export async function withUniqueJoinCode<T>(write: (joinCode: string) => Promise<T>, attempts = 5): Promise<T> {
    for (let i = 0; ; i++) {
        try {
            return await write(generateJoinCode());
        } catch (err: any) {
            const collided = err?.code === 'P2002' && String(err?.meta?.target ?? '').includes('joinCode');
            if (!collided || i >= attempts - 1) throw err;
        }
    }
}

/** How a user is shown to others in a campaign: their name, else the part of their email before @. */
export function displayUserName(user: { name: string | null; email?: string }): string {
    const name = user.name?.trim();
    if (name) return name;
    return user.email ? user.email.split('@')[0] : 'Player';
}
