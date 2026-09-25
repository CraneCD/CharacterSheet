import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        campaign: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
        campaignMember: { findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), delete: jest.fn() },
        character: { findUnique: jest.fn(), findMany: jest.fn(), update: jest.fn(), updateMany: jest.fn() },
        user: { findUnique: jest.fn() },
        encounter: { findFirst: jest.fn(), findUnique: jest.fn(), findMany: jest.fn(), create: jest.fn(), update: jest.fn(), updateMany: jest.fn(), delete: jest.fn() },
        campaignSession: { findMany: jest.fn(), findUnique: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn() },
        referenceItem: { findMany: jest.fn() },
        $transaction: jest.fn(),
    },
}));

import { prisma } from '../lib/prisma';
import campaignRoutes from '../routes/campaigns';
import { describeHealth } from '../lib/campaignViews';
import characterRoutes from '../routes/characters';

process.env.JWT_SECRET = 'test-secret';

const app = express();
app.use(express.json());
app.use('/campaigns', campaignRoutes);
app.use('/characters', characterRoutes);

const tokenFor = (id: string) => `Bearer ${jwt.sign({ id, email: `${id}@example.com` }, 'test-secret')}`;
const DM = tokenFor('dm-1');
const PLAYER = tokenFor('player-1');
const STRANGER = tokenFor('stranger');

const campaign = { id: 'camp-1', dmId: 'dm-1', name: 'Curse of Strahd', description: null, joinCode: 'ABC234', notes: 'Strahd is the vampire', createdAt: new Date(), updatedAt: new Date() };
const mock = (fn: unknown) => fn as jest.Mock;

beforeEach(() => {
    jest.clearAllMocks();
    mock(prisma.campaign.findUnique).mockImplementation(async ({ where }: any) =>
        (where.id === 'camp-1' || where.joinCode === 'ABC234') ? campaign : null);
    // player-1 is a member; nobody else is
    mock(prisma.campaignMember.findUnique).mockImplementation(async ({ where }: any) =>
        where.campaignId_userId.userId === 'player-1' ? { id: 'mem-1', campaignId: 'camp-1', userId: 'player-1' } : null);
    mock(prisma.$transaction).mockImplementation(async (ops: any[]) => Promise.all(ops));
    mock(prisma.referenceItem.findMany).mockResolvedValue([]);
});

describe('POST /campaigns', () => {
    it('requires a name', async () => {
        const res = await request(app).post('/campaigns').set('Authorization', DM).send({ name: '  ' });
        expect(res.status).toBe(400);
        expect(prisma.campaign.create).not.toHaveBeenCalled();
    });

    it('retries when a generated join code is already taken', async () => {
        mock(prisma.campaign.create)
            .mockRejectedValueOnce(Object.assign(new Error('Unique'), { code: 'P2002', meta: { target: ['joinCode'] } }))
            .mockImplementationOnce(async ({ data }: any) => ({ id: 'camp-2', ...data }));
        const res = await request(app).post('/campaigns').set('Authorization', DM).send({ name: 'New' });
        expect(res.status).toBe(201);
        expect(prisma.campaign.create).toHaveBeenCalledTimes(2);
        expect(res.body.joinCode).toMatch(/^[A-Z2-9]{6}$/);
        expect(res.body.dmId).toBe('dm-1');
    });
});

describe('POST /campaigns/join', () => {
    it('ignores case and spaces in the code', async () => {
        const res = await request(app).post('/campaigns/join').set('Authorization', STRANGER).send({ joinCode: ' abc 234 ' });
        expect(res.status).toBe(200);
        expect(prisma.campaignMember.create).toHaveBeenCalledWith({ data: { campaignId: 'camp-1', userId: 'stranger' } });
    });

    it('404s on an unknown code', async () => {
        const res = await request(app).post('/campaigns/join').set('Authorization', STRANGER).send({ joinCode: 'NOPE99' });
        expect(res.status).toBe(404);
    });

    it("doesn't let the DM join as a player, or a member join twice", async () => {
        expect((await request(app).post('/campaigns/join').set('Authorization', DM).send({ joinCode: 'ABC234' })).status).toBe(400);
        expect((await request(app).post('/campaigns/join').set('Authorization', PLAYER).send({ joinCode: 'ABC234' })).status).toBe(409);
        expect(prisma.campaignMember.create).not.toHaveBeenCalled();
    });

    it('brings a character along, moving it out of its old campaign', async () => {
        const joined = new Set<string>();
        mock(prisma.campaignMember.create).mockImplementation(async ({ data }: any) => { joined.add(data.userId); return data; });
        mock(prisma.campaignMember.findUnique).mockImplementation(async ({ where }: any) =>
            joined.has(where.campaignId_userId.userId) ? { id: 'mem-2' } : null);
        mock(prisma.character.findUnique).mockResolvedValue({ id: 'char-9', userId: 'stranger', campaignId: 'other-campaign' });
        mock(prisma.character.update).mockResolvedValue({ id: 'char-9', campaignId: 'camp-1' });

        const res = await request(app).post('/campaigns/join').set('Authorization', STRANGER).send({ joinCode: 'ABC234', characterId: 'char-9' });
        expect(res.status).toBe(200);
        expect(prisma.character.update).toHaveBeenCalledWith(expect.objectContaining({ where: { id: 'char-9' }, data: { campaignId: 'camp-1' } }));
    });

    it("won't bring someone else's character", async () => {
        mock(prisma.character.findUnique).mockResolvedValue({ id: 'char-9', userId: 'someone-else' });
        const res = await request(app).post('/campaigns/join').set('Authorization', STRANGER).send({ joinCode: 'ABC234', characterId: 'char-9' });
        expect(res.status).toBe(403);
        expect(prisma.campaignMember.create).not.toHaveBeenCalled();
    });
});

describe('GET /campaigns/:id', () => {
    const partyCharacter = {
        id: 'char-1', userId: 'player-1', name: 'Ireena', race: 'human', class: 'fighter', level: 3, updatedAt: new Date(),
        data: { portrait: 'data:x', hp: { current: 9, max: 28, temp: 0 }, conditions: ['Poisoned'], derivedStats: { ac: 16 }, notepad: { pages: ['secret'] } },
    };
    beforeEach(() => {
        mock(prisma.user.findUnique).mockResolvedValue({ id: 'dm-1', name: 'Dana', email: 'dm-1@example.com' });
        mock(prisma.campaignMember.findMany).mockResolvedValue([{ userId: 'player-1', joinedAt: new Date(), user: { id: 'player-1', name: null, email: 'pat@example.com' } }]);
        mock(prisma.character.findMany).mockResolvedValue([partyCharacter]);
        mock(prisma.encounter.findFirst).mockResolvedValue({
            id: 'enc-1', name: 'Ambush', status: 'active',
            data: {
                round: 2, turn: 1, combatants: [
                    { id: 'a', kind: 'pc', name: 'Ireena', characterId: 'char-1', initiative: 15 },
                    { id: 'b', kind: 'monster', name: 'Zombie 1', initiative: 8, hp: { current: 5, max: 15, temp: 0 }, ac: 8 },
                    { id: 'c', kind: 'monster', name: 'Hidden Wight', initiative: 5, hidden: true, hp: { current: 82, max: 82, temp: 0 } },
                ],
            },
        });
    });

    it("hides the campaign from people who aren't in it", async () => {
        const res = await request(app).get('/campaigns/camp-1').set('Authorization', STRANGER);
        expect(res.status).toBe(404);
    });

    it('shows players the party but not sheets, the join code or DM notes', async () => {
        const res = await request(app).get('/campaigns/camp-1').set('Authorization', PLAYER);
        expect(res.status).toBe(200);
        expect(res.body.role).toBe('player');
        expect(res.body.joinCode).toBeUndefined();
        expect(res.body.notes).toBeUndefined();
        expect(res.body.members[0].name).toBe('pat');
        expect(res.body.party[0]).toEqual({ id: 'char-1', userId: 'player-1', name: 'Ireena', race: 'human', class: 'fighter', level: 3, portrait: 'data:x', isMine: true });
    });

    it('shows players the turn order without hidden monsters or monster HP', async () => {
        const res = await request(app).get('/campaigns/camp-1').set('Authorization', PLAYER);
        const combatants = res.body.activeEncounter.combatants;
        expect(combatants.map((c: any) => c.name)).toEqual(['Ireena', 'Zombie 1']);
        expect(combatants[1]).toMatchObject({ isCurrent: true, health: 'bloodied' });
        // Damaged but above half: "hurt", not the exact numbers
        expect(describeHealth({ current: 10, max: 15 })).toBe('hurt');
        expect(describeHealth({ current: 15, max: 15 })).toBe('healthy');
        expect(describeHealth({ current: 0, max: 15 })).toBe('down');
        expect(combatants[1].hp).toBeUndefined();
        expect(combatants[1].ac).toBeUndefined();
    });

    it('gives the DM HP, conditions, derived stats, notes and the join code', async () => {
        const res = await request(app).get('/campaigns/camp-1').set('Authorization', DM);
        expect(res.body.role).toBe('dm');
        expect(res.body.joinCode).toBe('ABC234');
        expect(res.body.notes).toBe('Strahd is the vampire');
        expect(res.body.party[0]).toMatchObject({ hp: { current: 9, max: 28, temp: 0 }, conditions: ['Poisoned'], derivedStats: { ac: 16 } });
        expect(res.body.party[0].notepad).toBeUndefined();
        expect(res.body.activeEncounter).toEqual({ id: 'enc-1', name: 'Ambush' });
    });
});

describe('PATCH/DELETE /campaigns/:id', () => {
    it('is DM only', async () => {
        expect((await request(app).patch('/campaigns/camp-1').set('Authorization', PLAYER).send({ notes: 'x' })).status).toBe(403);
        expect((await request(app).delete('/campaigns/camp-1').set('Authorization', PLAYER)).status).toBe(403);
        expect(prisma.campaign.update).not.toHaveBeenCalled();
        expect(prisma.campaign.delete).not.toHaveBeenCalled();
    });

    it('saves DM notes', async () => {
        mock(prisma.campaign.update).mockImplementation(async ({ data }: any) => ({ ...campaign, ...data }));
        const res = await request(app).patch('/campaigns/camp-1').set('Authorization', DM).send({ notes: 'New notes' });
        expect(res.status).toBe(200);
        expect(res.body.notes).toBe('New notes');
    });
});

describe('DELETE /campaigns/:id/members/:userId', () => {
    it('lets a player leave, taking their characters with them', async () => {
        const res = await request(app).delete('/campaigns/camp-1/members/player-1').set('Authorization', PLAYER);
        expect(res.status).toBe(200);
        expect(prisma.character.updateMany).toHaveBeenCalledWith({ where: { campaignId: 'camp-1', userId: 'player-1' }, data: { campaignId: null } });
        expect(prisma.campaignMember.delete).toHaveBeenCalledWith({ where: { id: 'mem-1' } });
    });

    it('lets the DM remove a player', async () => {
        const res = await request(app).delete('/campaigns/camp-1/members/player-1').set('Authorization', DM);
        expect(res.status).toBe(200);
    });

    it("doesn't let a player remove someone else, or the DM leave", async () => {
        expect((await request(app).delete('/campaigns/camp-1/members/player-2').set('Authorization', PLAYER)).status).toBe(403);
        expect((await request(app).delete('/campaigns/camp-1/members/dm-1').set('Authorization', DM)).status).toBe(400);
        expect(prisma.campaignMember.delete).not.toHaveBeenCalled();
    });
});

describe('PUT /campaigns/assign-character', () => {
    beforeEach(() => {
        mock(prisma.character.findUnique).mockResolvedValue({ id: 'char-1', userId: 'player-1' });
        mock(prisma.character.update).mockImplementation(async ({ data }: any) => ({ id: 'char-1', ...data }));
    });

    it('moves your character into a campaign you play in', async () => {
        const res = await request(app).put('/campaigns/assign-character').set('Authorization', PLAYER).send({ characterId: 'char-1', campaignId: 'camp-1' });
        expect(res.status).toBe(200);
        expect(res.body.campaignId).toBe('camp-1');
    });

    it('takes it out of its campaign', async () => {
        const res = await request(app).put('/campaigns/assign-character').set('Authorization', PLAYER).send({ characterId: 'char-1', campaignId: null });
        expect(res.status).toBe(200);
        expect(prisma.character.update).toHaveBeenCalledWith(expect.objectContaining({ data: { campaignId: null } }));
    });

    it("refuses campaigns you aren't in and characters you don't own", async () => {
        mock(prisma.character.findUnique).mockResolvedValue({ id: 'char-1', userId: 'stranger' });
        expect((await request(app).put('/campaigns/assign-character').set('Authorization', STRANGER).send({ characterId: 'char-1', campaignId: 'camp-1' })).status).toBe(404);
        expect((await request(app).put('/campaigns/assign-character').set('Authorization', PLAYER).send({ characterId: 'char-1', campaignId: null })).status).toBe(403);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });
});

describe('encounters', () => {
    const encounter = { id: 'enc-1', campaignId: 'camp-1', name: 'Ambush', status: 'planned', data: { combatants: [], round: 0, turn: 0 } };
    beforeEach(() => {
        mock(prisma.encounter.findUnique).mockResolvedValue(encounter);
        mock(prisma.encounter.update).mockImplementation(async ({ data }: any) => ({ ...encounter, ...data }));
    });

    it('are DM only', async () => {
        expect((await request(app).get('/campaigns/camp-1/encounters').set('Authorization', PLAYER)).status).toBe(403);
        expect((await request(app).put('/campaigns/camp-1/encounters/enc-1').set('Authorization', PLAYER).send({ name: 'x' })).status).toBe(403);
    });

    it('validates combatants', async () => {
        const res = await request(app).put('/campaigns/camp-1/encounters/enc-1').set('Authorization', DM)
            .send({ data: { round: 0, turn: 0, combatants: [{ id: 'x', kind: 'dragon', name: 'Bad', initiative: null }] } });
        expect(res.status).toBe(400);
        expect(prisma.encounter.update).not.toHaveBeenCalled();
    });

    it('starting one sets any other running encounter back to planned', async () => {
        const res = await request(app).put('/campaigns/camp-1/encounters/enc-1').set('Authorization', DM).send({ status: 'active' });
        expect(res.status).toBe(200);
        expect(prisma.encounter.updateMany).toHaveBeenCalledWith({
            where: { campaignId: 'camp-1', status: 'active', id: { not: 'enc-1' } },
            data: { status: 'planned' },
        });
    });

    it("404s for another campaign's encounter", async () => {
        mock(prisma.encounter.findUnique).mockResolvedValue({ ...encounter, campaignId: 'camp-2' });
        expect((await request(app).get('/campaigns/camp-1/encounters/enc-1').set('Authorization', DM)).status).toBe(404);
    });
});

describe('sessions', () => {
    it("keep the DM's notes from players", async () => {
        mock(prisma.campaignSession.findMany).mockResolvedValue([{ id: 's1', campaignId: 'camp-1', title: 'One', recap: 'We met', dmNotes: 'Twist next week' }]);
        const asPlayer = await request(app).get('/campaigns/camp-1/sessions').set('Authorization', PLAYER);
        expect(asPlayer.body[0]).toEqual({ id: 's1', campaignId: 'camp-1', title: 'One', recap: 'We met' });
        const asDm = await request(app).get('/campaigns/camp-1/sessions').set('Authorization', DM);
        expect(asDm.body[0].dmNotes).toBe('Twist next week');
    });

    it('are written by the DM only', async () => {
        expect((await request(app).post('/campaigns/camp-1/sessions').set('Authorization', PLAYER).send({ title: 'x' })).status).toBe(403);
        mock(prisma.campaignSession.create).mockImplementation(async ({ data }: any) => ({ id: 's2', ...data }));
        const res = await request(app).post('/campaigns/camp-1/sessions').set('Authorization', DM).send({ title: 'Two', playedOn: '2026-09-20' });
        expect(res.status).toBe(201);
        expect(prisma.campaignSession.create).toHaveBeenCalledWith({
            data: expect.objectContaining({ campaignId: 'camp-1', title: 'Two', playedOn: new Date('2026-09-20T00:00:00.000Z') }),
        });
    });
});

describe('GET /characters/:id for the DM', () => {
    const sheet = { id: 'char-1', userId: 'player-1', name: 'Ireena', race: 'human', class: 'fighter', level: 3, isPublic: false, campaignId: 'camp-1', campaign: { id: 'camp-1', name: 'Curse of Strahd', dmId: 'dm-1' }, data: {} };

    it("lets the campaign's DM read the sheet without writing to it", async () => {
        mock(prisma.character.findUnique).mockResolvedValue(sheet);
        const res = await request(app).get('/characters/char-1').set('Authorization', DM);
        expect(res.status).toBe(200);
        expect(res.body.access).toBe('dm');
        expect(res.body.campaign).toEqual({ id: 'camp-1', name: 'Curse of Strahd' });
        expect(prisma.character.update).not.toHaveBeenCalled();
    });

    it('still blocks other players', async () => {
        mock(prisma.character.findUnique).mockResolvedValue(sheet);
        expect((await request(app).get('/characters/char-1').set('Authorization', tokenFor('player-2'))).status).toBe(403);
    });

    it('keeps edits owner-only', async () => {
        mock(prisma.character.findUnique).mockResolvedValue(sheet);
        expect((await request(app).patch('/characters/char-1/data').set('Authorization', DM).send({ speed: 5 })).status).toBe(403);
    });
});
