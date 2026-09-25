import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        campaign: { findUnique: jest.fn() },
        campaignMember: { findUnique: jest.fn() },
        campaignItem: { findUnique: jest.fn(), updateMany: jest.fn(), deleteMany: jest.fn(), createMany: jest.fn(), create: jest.fn(), update: jest.fn() },
        character: { findUnique: jest.fn(), findMany: jest.fn(), updateMany: jest.fn() },
        $transaction: jest.fn(),
    },
}));

import { prisma } from '../lib/prisma';
import campaignRoutes from '../routes/campaigns';
import characterRoutes from '../routes/characters';
import { addCoins, addLootToSheet, planDistribution, LootItem } from '../lib/lootDelivery';

process.env.JWT_SECRET = 'test-secret';

const app = express();
app.use(express.json());
app.use('/campaigns', campaignRoutes);
app.use('/characters', characterRoutes);

const tokenFor = (id: string) => `Bearer ${jwt.sign({ id, email: `${id}@example.com` }, 'test-secret')}`;
const DM = tokenFor('dm-1');
const PLAYER = tokenFor('player-1');
const mock = (fn: unknown) => fn as jest.Mock;

const campaign = { id: 'camp-1', dmId: 'dm-1', name: 'Obelisk', joinCode: 'ABC234' };
const stamp = new Date('2026-09-25T12:00:00Z');
const potion = { id: 'item-1', campaignId: 'camp-1', name: 'Potion of Healing', description: 'Heals 2d4 + 2.', rarity: 'common', quantity: 3, value: '50 gp', revealed: true, heldBy: null, coins: null, dmNotes: 'In the chest', updatedAt: stamp };
const coins = { ...potion, id: 'item-2', name: 'Vault Coins', description: '', rarity: '', quantity: 1, value: '', coins: { gp: 350, sp: 189 } };
const hidden = { ...potion, id: 'item-3', name: 'Dagger of Venom', quantity: 1, rarity: 'rare', revealed: false };
const aria = { id: 'char-1', userId: 'player-1', campaignId: 'camp-1', name: 'Aria', updatedAt: stamp, data: { equipment: ['Rope'], currency: { gp: 10 } } };
const borin = { id: 'char-2', userId: 'player-2', campaignId: 'camp-1', name: 'Borin', updatedAt: stamp, data: { equipment: [{ name: 'potion of healing', quantity: 1 }] } };
const items = [potion, coins, hidden];
const characters = [aria, borin];

beforeEach(() => {
    jest.clearAllMocks();
    mock(prisma.campaign.findUnique).mockResolvedValue(campaign);
    mock(prisma.campaignMember.findUnique).mockImplementation(async ({ where }: any) =>
        ['player-1', 'player-2'].includes(where.campaignId_userId.userId) ? { id: 'mem', campaignId: 'camp-1', userId: where.campaignId_userId.userId } : null);
    mock(prisma.$transaction).mockImplementation(async (fn: any) => fn(prisma));
    mock(prisma.campaignItem.findUnique).mockImplementation(async ({ where }: any) => items.find((i) => i.id === where.id) ?? null);
    mock(prisma.character.findMany).mockImplementation(async ({ where }: any) => characters.filter((c) => where.id.in.includes(c.id)));
    mock(prisma.character.findUnique).mockImplementation(async ({ where }: any) => characters.find((c) => c.id === where.id) ?? null);
    mock(prisma.campaignItem.updateMany).mockResolvedValue({ count: 1 });
    mock(prisma.campaignItem.deleteMany).mockResolvedValue({ count: 1 });
    mock(prisma.campaignItem.createMany).mockResolvedValue({ count: 1 });
    mock(prisma.character.updateMany).mockResolvedValue({ count: 1 });
});

const sheetWrites = () => mock(prisma.character.updateMany).mock.calls.map(([arg]: any) => ({ id: arg.where.id, data: arg.data.data }));

describe('planDistribution', () => {
    const item = potion as unknown as LootItem;

    it('gives what was asked and keeps the rest in the pool', () => {
        expect(planDistribution(item, [{ characterId: 'a', quantity: 1 }, { characterId: 'b' }])).toEqual({
            currency: false,
            shares: [{ characterId: 'a', quantity: 1, coins: null }, { characterId: 'b', quantity: 1, coins: null }],
            remaining: { quantity: 1, coins: null },
        });
        expect(planDistribution(item, [{ characterId: 'a', quantity: 3 }])).toMatchObject({ remaining: null });
    });

    it('refuses more than there is, a character twice, or something already held', () => {
        expect(planDistribution(item, [{ characterId: 'a', quantity: 4 }])).toEqual({ error: 'There are only 3 to give' });
        expect(planDistribution(item, [{ characterId: 'a' }, { characterId: 'a' }])).toEqual({ error: 'List each character once' });
        expect(planDistribution({ ...item, heldBy: 'x' }, [{ characterId: 'a' }])).toEqual({ error: 'Someone already has this' });
    });

    it('splits coins by denomination', () => {
        const pile = coins as unknown as LootItem;
        expect(planDistribution(pile, [{ characterId: 'a', coins: { gp: 175, sp: 94 } }, { characterId: 'b', coins: { gp: 175, sp: 94 } }])).toEqual({
            currency: true,
            shares: [{ characterId: 'a', quantity: 1, coins: { gp: 175, sp: 94 } }, { characterId: 'b', quantity: 1, coins: { gp: 175, sp: 94 } }],
            remaining: { quantity: 1, coins: { sp: 1 } },
        });
        expect(planDistribution(pile, [{ characterId: 'a', coins: { pp: 1 } }])).toEqual({ error: 'There are only 0 pp to give' });
        expect(planDistribution(pile, [{ characterId: 'a', coins: { gp: 0 } }])).toEqual({ error: 'Give each character some coins' });
    });
});

describe('addLootToSheet', () => {
    it('adds a new entry with where it came from', () => {
        const sheet = addLootToSheet({ equipment: ['Rope'] }, potion as unknown as LootItem, { quantity: 2, coins: null }, 'Obelisk');
        expect(sheet.equipment).toEqual(['Rope', {
            name: 'Potion of Healing', quantity: 2, description: 'Heals 2d4 + 2.', category: 'potion', notes: 'Loot from Obelisk · Common · Worth 50 gp',
        }]);
    });

    it('stacks onto an entry with the same name', () => {
        const sheet = addLootToSheet(borin.data, potion as unknown as LootItem, { quantity: 2, coins: null }, 'Obelisk');
        expect(sheet.equipment).toEqual([{ name: 'potion of healing', quantity: 3 }]);
    });

    it('puts coins in the purse', () => {
        expect(addLootToSheet(aria.data, coins as unknown as LootItem, { quantity: 1, coins: { gp: 5, sp: 2 } }, 'Obelisk').currency)
            .toEqual({ pp: 0, gp: 15, ep: 0, sp: 2, cp: 0 });
        expect(addCoins({ gp: 3 }, { gp: -5, cp: 4 })).toEqual({ pp: 0, gp: 0, ep: 0, sp: 0, cp: 4 });
    });
});

describe('POST /campaigns/:id/items/:itemId/distribute', () => {
    const distribute = (token: string, itemId: string, shares: object[]) =>
        request(app).post(`/campaigns/camp-1/items/${itemId}/distribute`).set('Authorization', token).send({ shares });

    it('lets a player claim found loot for their character, onto their sheet', async () => {
        const res = await distribute(PLAYER, 'item-1', [{ characterId: 'char-1', quantity: 3 }]);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ given: [{ characterId: 'char-1', name: 'Aria' }] });
        expect(prisma.campaignItem.updateMany).toHaveBeenCalledWith({ where: { id: 'item-1', updatedAt: stamp }, data: { heldBy: 'char-1', revealed: true } });
        expect(sheetWrites()).toEqual([{ id: 'char-1', data: expect.objectContaining({ equipment: ['Rope', expect.objectContaining({ name: 'Potion of Healing', quantity: 3 })] }) }]);
        expect(mock(prisma.character.updateMany).mock.calls[0][0].where).toEqual({ id: 'char-1', updatedAt: stamp });
    });

    it("doesn't let players take hidden loot or claim for someone else", async () => {
        expect((await distribute(PLAYER, 'item-3', [{ characterId: 'char-1' }])).status).toBe(404);
        const res = await distribute(PLAYER, 'item-1', [{ characterId: 'char-2' }]);
        expect(res.status).toBe(403);
        expect(prisma.character.updateMany).not.toHaveBeenCalled();
    });

    it('lets the DM give hidden loot, which reveals it', async () => {
        const res = await distribute(DM, 'item-3', [{ characterId: 'char-2' }]);
        expect(res.status).toBe(200);
        expect(prisma.campaignItem.updateMany).toHaveBeenCalledWith(expect.objectContaining({ data: { heldBy: 'char-2', revealed: true } }));
    });

    it('splits coins: a row per recipient, each purse credited, the pile gone', async () => {
        const res = await distribute(DM, 'item-2', [{ characterId: 'char-1', coins: { gp: 175, sp: 95 } }, { characterId: 'char-2', coins: { gp: 175, sp: 94 } }]);
        expect(res.status).toBe(200);
        expect(prisma.campaignItem.deleteMany).toHaveBeenCalledWith({ where: { id: 'item-2', updatedAt: stamp } });
        const rows = mock(prisma.campaignItem.createMany).mock.calls[0][0].data;
        expect(rows.map((r: any) => [r.heldBy, r.coins, r.revealed])).toEqual([['char-1', { gp: 175, sp: 95 }, true], ['char-2', { gp: 175, sp: 94 }, true]]);
        expect(sheetWrites().map((w) => [w.id, w.data.currency])).toEqual([
            ['char-1', { pp: 0, gp: 185, ep: 0, sp: 95, cp: 0 }],
            ['char-2', { pp: 0, gp: 175, ep: 0, sp: 94, cp: 0 }],
        ]);
    });

    it('keeps what nobody took in the pool', async () => {
        await distribute(DM, 'item-1', [{ characterId: 'char-1', quantity: 1 }]);
        expect(prisma.campaignItem.updateMany).toHaveBeenCalledWith({ where: { id: 'item-1', updatedAt: stamp }, data: { quantity: 2, coins: expect.anything() } });
        expect(mock(prisma.campaignItem.createMany).mock.calls[0][0].data).toEqual([expect.objectContaining({ heldBy: 'char-1', quantity: 1, name: 'Potion of Healing' })]);
    });

    it('rejects more than there is, and characters outside the campaign', async () => {
        expect((await distribute(DM, 'item-1', [{ characterId: 'char-1', quantity: 5 }])).body.error).toBe('There are only 3 to give');
        mock(prisma.character.findMany).mockResolvedValueOnce([{ ...aria, campaignId: 'other' }]);
        expect((await distribute(DM, 'item-1', [{ characterId: 'char-1' }])).status).toBe(400);
        expect(prisma.character.updateMany).not.toHaveBeenCalled();
    });

    it('retries when the loot changes underneath, then gives up with 409', async () => {
        mock(prisma.campaignItem.updateMany).mockResolvedValueOnce({ count: 0 });
        expect((await distribute(PLAYER, 'item-1', [{ characterId: 'char-1', quantity: 3 }])).status).toBe(200);
        expect(prisma.$transaction).toHaveBeenCalledTimes(2);

        mock(prisma.campaignItem.updateMany).mockResolvedValue({ count: 0 });
        const res = await distribute(PLAYER, 'item-1', [{ characterId: 'char-1', quantity: 3 }]);
        expect(res.status).toBe(409);
    });
});

describe('POST /characters/:id/currency', () => {
    it("applies the change to the stored purse and doesn't go below zero", async () => {
        const res = await request(app).post('/characters/char-1/currency').set('Authorization', PLAYER).send({ change: { gp: -15, sp: 3 } });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ currency: { pp: 0, gp: 0, ep: 0, sp: 3, cp: 0 } });
        expect(prisma.character.updateMany).toHaveBeenCalledWith({
            where: { id: 'char-1', updatedAt: stamp },
            data: { data: { ...aria.data, currency: { pp: 0, gp: 0, ep: 0, sp: 3, cp: 0 } } },
        });
    });

    it("retries if the sheet changed meanwhile, and is the owner's only", async () => {
        mock(prisma.character.updateMany).mockResolvedValueOnce({ count: 0 });
        expect((await request(app).post('/characters/char-1/currency').set('Authorization', PLAYER).send({ change: { gp: 1 } })).status).toBe(200);
        expect(prisma.character.updateMany).toHaveBeenCalledTimes(2);
        expect((await request(app).post('/characters/char-2/currency').set('Authorization', PLAYER).send({ change: { gp: 1 } })).status).toBe(403);
        expect((await request(app).post('/characters/char-1/currency').set('Authorization', PLAYER).send({ change: { gems: 1 } })).status).toBe(400);
    });
});
