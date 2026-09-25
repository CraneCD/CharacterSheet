import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        campaign: { findUnique: jest.fn(), findUniqueOrThrow: jest.fn(), create: jest.fn(), update: jest.fn() },
        campaignMember: { findUnique: jest.fn() },
        character: { findUnique: jest.fn() },
        encounter: { findMany: jest.fn(), createMany: jest.fn() },
        campaignSession: { findMany: jest.fn(), createMany: jest.fn() },
        campaignItem: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn(), createMany: jest.fn() },
        monster: { findMany: jest.fn(), createMany: jest.fn() },
        $transaction: jest.fn(),
    },
}));

import { prisma } from '../lib/prisma';
import campaignRoutes from '../routes/campaigns';
import { planImport, prepSchema, PREP_FORMAT } from '../lib/campaignPrep';

process.env.JWT_SECRET = 'test-secret';

const app = express();
app.use(express.json());
app.use('/campaigns', campaignRoutes);

const tokenFor = (id: string) => `Bearer ${jwt.sign({ id, email: `${id}@example.com` }, 'test-secret')}`;
const DM = tokenFor('dm-1');
const PLAYER = tokenFor('player-1');
const mock = (fn: unknown) => fn as jest.Mock;

const campaign = { id: 'camp-1', dmId: 'dm-1', name: 'Obelisk', description: 'A shard falls', joinCode: 'ABC234', notes: 'Old notes', createdAt: new Date(), updatedAt: new Date() };

const wolf = {
    ref: 'dread-wolf', name: 'Dread Wolf', size: 'Large', type: 'Beast', ac: 13, hp: 30, speed: '50 ft.',
    abilities: { str: 16, dex: 14, con: 14, int: 3, wis: 12, cha: 6 }, cr: '1',
};
const prep = {
    format: PREP_FORMAT,
    version: 1,
    campaign: { name: 'Obelisk', description: 'A shard falls' },
    notes: 'Chapter 1: the town',
    sessions: [{ title: 'Chapter 1', dmNotes: 'Start at the inn' }],
    monsters: [wolf],
    encounters: [{
        name: 'Road ambush',
        combatants: [
            { kind: 'monster', name: 'Dread Wolf', monsterRef: 'dread-wolf', initiativeBonus: 2, ac: 13, maxHp: 30, xp: 200 },
            { kind: 'monster', name: 'Goblin Warrior', monsterId: 'goblin-warrior', initiativeBonus: 2, ac: 15, maxHp: 10, xp: 50, hidden: true },
        ],
    }],
    items: [{ name: 'Potion of Healing', rarity: 'common', quantity: 2, value: '50 gp', dmNotes: 'In the chest' }],
};

beforeEach(() => {
    jest.clearAllMocks();
    mock(prisma.campaign.findUnique).mockImplementation(async ({ where }: any) => (where.id === 'camp-1' ? campaign : null));
    mock(prisma.campaign.findUniqueOrThrow).mockResolvedValue(campaign);
    mock(prisma.campaignMember.findUnique).mockImplementation(async ({ where }: any) =>
        where.campaignId_userId.userId === 'player-1' ? { id: 'mem-1' } : null);
    // Interactive transactions run the callback against the same mocked client
    mock(prisma.$transaction).mockImplementation(async (fn: any) => fn(prisma));
    mock(prisma.campaign.create).mockImplementation(async ({ data }: any) => ({ id: 'camp-new', ...data }));
});

describe('prep file schema', () => {
    it('accepts a valid file and fills in empty lists', () => {
        const parsed = prepSchema.parse({ format: PREP_FORMAT, version: 1, campaign: { name: 'Solo' } });
        expect(parsed).toMatchObject({ sessions: [], monsters: [], encounters: [], items: [] });
    });

    it('rejects other files, newer versions and broken monster references', () => {
        expect(prepSchema.safeParse({ format: 'something-else', version: 1, campaign: { name: 'x' } }).success).toBe(false);
        const newer = prepSchema.safeParse({ ...prep, version: 99 });
        expect(newer.success).toBe(false);
        const broken = prepSchema.safeParse({ ...prep, monsters: [] });
        expect(broken.success).toBe(false);
        expect(JSON.stringify(broken)).toContain("isn't in the file");
        const dupes = prepSchema.safeParse({ ...prep, monsters: [wolf, wolf] });
        expect(JSON.stringify(dupes)).toContain('share the ref');
    });
});

describe('planImport', () => {
    const plan = planImport(prepSchema.parse(prep), 'camp-9', 'dm-9');

    it('gives custom monsters new ids owned by the importing DM and points encounters at them', () => {
        expect(plan.monsters).toHaveLength(1);
        const monster = plan.monsters[0];
        expect(monster).toMatchObject({ ownerId: 'dm-9', name: 'Dread Wolf' });
        expect(monster.id).not.toBe('dread-wolf');
        expect((monster.data as any).ref).toBeUndefined();
        const [wolfCombatant, goblin] = (plan.encounters[0].data as any).combatants;
        expect(wolfCombatant).toMatchObject({ monsterId: monster.id, monsterSource: 'custom', hp: { current: 30, max: 30, temp: 0 }, initiative: null });
        expect(goblin).toMatchObject({ monsterId: 'goblin-warrior', monsterSource: 'srd', hidden: true });
        expect(wolfCombatant.id).not.toBe(goblin.id);
    });

    it('imports encounters as planned, and sessions and loot hidden from players', () => {
        expect(plan.encounters[0]).toMatchObject({ campaignId: 'camp-9', status: 'planned', data: { round: 0, turn: 0 } });
        expect(plan.sessions[0]).toMatchObject({ campaignId: 'camp-9', title: 'Chapter 1', shared: false, recap: '' });
        expect(plan.items[0]).toMatchObject({ campaignId: 'camp-9', name: 'Potion of Healing', quantity: 2, revealed: false });
    });

    it('carries coins, dropping empty amounts', () => {
        const withCoins = prepSchema.parse({ ...prep, items: [{ name: 'Vault Coins', coins: { gp: 350, sp: 0 } }, { name: 'Rope', coins: { gp: 0 } }] });
        const planned = planImport(withCoins, 'camp-9', 'dm-9');
        expect(planned.items[0]).toMatchObject({ name: 'Vault Coins', coins: { gp: 350 } });
        expect(planned.items[1]).not.toHaveProperty('coins');
    });

    it('keeps the file order: rows are stamped a millisecond apart', () => {
        const twoOfEach = prepSchema.parse({ ...prep, sessions: [...prep.sessions, { title: 'Chapter 2' }], items: [...prep.items, { name: 'Rope' }] });
        const now = new Date('2026-09-25T12:00:00.000Z');
        const planned = planImport(twoOfEach, 'camp-9', 'dm-9', now);
        expect(planned.sessions.map((s) => s.createdAt.toISOString())).toEqual(['2026-09-25T12:00:00.000Z', '2026-09-25T12:00:00.001Z']);
        expect(planned.items[1].createdAt.getTime() - planned.items[0].createdAt.getTime()).toBe(1);
        expect(planned.encounters[0]).toMatchObject({ createdAt: now, updatedAt: now });
    });
});

describe('prep routes', () => {
    it('create a new campaign from a file, in one transaction', async () => {
        const res = await request(app).post('/campaigns/import').set('Authorization', DM).send(prep);
        expect(res.status).toBe(201);
        expect(res.body).toEqual({ campaign: { id: 'camp-new', name: 'Obelisk' }, counts: { sessions: 1, encounters: 1, monsters: 1, items: 1 } });
        expect(prisma.$transaction).toHaveBeenCalledTimes(1);
        expect(prisma.campaign.create).toHaveBeenCalledWith({ data: expect.objectContaining({ dmId: 'dm-1', name: 'Obelisk', notes: 'Chapter 1: the town' }) });
        expect(mock(prisma.encounter.createMany).mock.calls[0][0].data[0].campaignId).toBe('camp-new');
    });

    it('reject files that fail validation without writing anything', async () => {
        const res = await request(app).post('/campaigns/import').set('Authorization', DM).send({ ...prep, format: 'nope' });
        expect(res.status).toBe(400);
        expect(prisma.campaign.create).not.toHaveBeenCalled();
    });

    it('add to an existing campaign, appending the notes', async () => {
        const res = await request(app).post('/campaigns/camp-1/prep').set('Authorization', DM).send(prep);
        expect(res.status).toBe(200);
        expect(prisma.campaign.update).toHaveBeenCalledWith({ where: { id: 'camp-1' }, data: { notes: 'Old notes\n\n---\n\nChapter 1: the town' } });
        expect(res.body.counts).toEqual({ sessions: 1, encounters: 1, monsters: 1, items: 1 });
    });

    it('are DM only', async () => {
        expect((await request(app).post('/campaigns/camp-1/prep').set('Authorization', PLAYER).send(prep)).status).toBe(403);
        expect((await request(app).get('/campaigns/camp-1/prep').set('Authorization', PLAYER)).status).toBe(403);
    });

    it('export prep without players, rolls or who holds what', async () => {
        mock(prisma.campaignSession.findMany).mockResolvedValue([{ title: 'Session 1', recap: 'We met', dmNotes: 'Twist', shared: true, playedOn: new Date() }]);
        mock(prisma.encounter.findMany).mockResolvedValue([{
            name: 'Ambush', data: {
                round: 3, turn: 1, combatants: [
                    { id: 'a', kind: 'pc', name: 'Hero', characterId: 'char-1', initiative: 18, initiativeBonus: 3 },
                    { id: 'b', kind: 'monster', name: 'Dread Wolf', monsterId: 'mon-1', monsterSource: 'custom', initiative: 12, initiativeBonus: 2, ac: 13, hp: { current: 4, max: 30, temp: 0 }, xp: 200, defeated: true },
                    { id: 'c', kind: 'monster', name: 'Goblin', monsterId: 'goblin-warrior', monsterSource: 'srd', initiative: 9, initiativeBonus: 2, hp: { current: 10, max: 10, temp: 0 } },
                ],
            },
        }]);
        mock(prisma.monster.findMany).mockResolvedValue([{ id: 'mon-1', name: 'Dread Wolf', data: { ...wolf, ref: undefined } }]);
        mock(prisma.campaignItem.findMany).mockResolvedValue([{ name: 'Ring', description: '', rarity: 'rare', quantity: 1, value: '', dmNotes: 'Boss', revealed: true, heldBy: 'char-1' }]);

        const res = await request(app).get('/campaigns/camp-1/prep').set('Authorization', DM);
        expect(res.status).toBe(200);
        const file = res.body;
        expect(prepSchema.safeParse(file).success).toBe(true);
        expect(file.campaign).toEqual({ name: 'Obelisk', description: 'A shard falls' });
        expect(file.sessions).toEqual([{ title: 'Session 1', recap: 'We met', dmNotes: 'Twist', shared: false }]);
        expect(file.encounters[0].combatants).toEqual([
            { kind: 'monster', name: 'Dread Wolf', monsterRef: 'mon-1', initiativeBonus: 2, ac: 13, maxHp: 30, xp: 200 },
            { kind: 'monster', name: 'Goblin', monsterId: 'goblin-warrior', initiativeBonus: 2, maxHp: 10 },
        ]);
        expect(file.monsters[0]).toMatchObject({ ref: 'mon-1', name: 'Dread Wolf' });
        expect(file.items).toEqual([{ name: 'Ring', description: '', rarity: 'rare', quantity: 1, value: '', dmNotes: 'Boss', revealed: false }]);
    });
});

describe('loot', () => {
    it("shows players revealed items only, without the DM's notes", async () => {
        mock(prisma.campaignItem.findMany).mockResolvedValue([{ id: 'i1', name: 'Ring', dmNotes: 'Cursed', revealed: true }]);
        const res = await request(app).get('/campaigns/camp-1/items').set('Authorization', PLAYER);
        expect(res.status).toBe(200);
        expect(mock(prisma.campaignItem.findMany).mock.calls[0][0].where).toEqual({ campaignId: 'camp-1', revealed: true });
        expect(res.body).toEqual([{ id: 'i1', name: 'Ring', revealed: true }]);
    });

    it('is written by the DM only', async () => {
        expect((await request(app).post('/campaigns/camp-1/items').set('Authorization', PLAYER).send({ name: 'Ring' })).status).toBe(403);
        mock(prisma.campaignItem.create).mockImplementation(async ({ data }: any) => ({ id: 'i2', ...data }));
        const res = await request(app).post('/campaigns/camp-1/items').set('Authorization', DM).send({ name: 'Ring', rarity: 'rare' });
        expect(res.status).toBe(201);
        expect(prisma.campaignItem.create).toHaveBeenCalledWith({ data: { name: 'Ring', rarity: 'rare', campaignId: 'camp-1' } });
    });

    it("only gives items to characters in the campaign", async () => {
        mock(prisma.character.findUnique).mockResolvedValue({ campaignId: 'another-campaign' });
        const res = await request(app).post('/campaigns/camp-1/items').set('Authorization', DM).send({ name: 'Ring', heldBy: 'char-9' });
        expect(res.status).toBe(400);
        expect(prisma.campaignItem.create).not.toHaveBeenCalled();
    });

    it("404s for another campaign's item", async () => {
        mock(prisma.campaignItem.findUnique).mockResolvedValue({ id: 'i1', campaignId: 'camp-2' });
        expect((await request(app).put('/campaigns/camp-1/items/i1').set('Authorization', DM).send({ revealed: true })).status).toBe(404);
        expect((await request(app).delete('/campaigns/camp-1/items/i1').set('Authorization', DM)).status).toBe(404);
    });
});
