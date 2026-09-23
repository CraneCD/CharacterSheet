import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        character: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        referenceItem: {
            findMany: jest.fn(),
        },
    },
}));

import { prisma } from '../lib/prisma';
import characterRoutes from '../routes/characters';
import { buildReferenceRows } from '../lib/referenceSeed';

process.env.JWT_SECRET = 'test-secret';

const app = express();
app.use(express.json());
app.use('/characters', characterRoutes);

const token = jwt.sign({ id: 'user-1', email: 'u@example.com' }, 'test-secret');

const ownedCharacter = (data: object) => ({
    id: 'char-1',
    userId: 'user-1',
    name: 'Test',
    race: 'Human',
    class: 'Fighter',
    level: 3,
    data,
});

const referenceRows = buildReferenceRows();

beforeEach(() => {
    jest.clearAllMocks();
    (prisma.referenceItem.findMany as jest.Mock).mockImplementation(async ({ where }: any) =>
        referenceRows.filter(r => r.type === where.type).map(r => ({ key: r.key, data: r.data })));
    (prisma.character.update as jest.Mock).mockImplementation(async (args: any) => ({
        ...ownedCharacter({}),
        ...args.data,
    }));
});

describe('PATCH /characters/:id/data', () => {
    it('merges only the provided fields into the data blob', async () => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue(
            ownedCharacter({ hp: { current: 5, max: 10 }, languages: ['Common'] })
        );

        const res = await request(app)
            .patch('/characters/char-1/data')
            .set('Authorization', `Bearer ${token}`)
            .send({ speed: 30 });

        expect(res.status).toBe(200);
        expect(prisma.character.update).toHaveBeenCalledWith({
            where: { id: 'char-1' },
            data: { data: { hp: { current: 5, max: 10 }, languages: ['Common'], speed: 30 } },
        });
    });

    it('rejects access to characters owned by someone else', async () => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue({
            ...ownedCharacter({}),
            userId: 'someone-else',
        });

        const res = await request(app)
            .patch('/characters/char-1/data')
            .set('Authorization', `Bearer ${token}`)
            .send({ speed: 30 });

        expect(res.status).toBe(403);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });

    it('rejects non-object bodies', async () => {
        const res = await request(app)
            .patch('/characters/char-1/data')
            .set('Authorization', `Bearer ${token}`)
            .send([1, 2, 3]);

        expect(res.status).toBe(400);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });

    it('rejects prototype-polluting field names', async () => {
        const res = await request(app)
            .patch('/characters/char-1/data')
            .set('Authorization', `Bearer ${token}`)
            .set('Content-Type', 'application/json')
            .send('{"__proto__": {"polluted": true}}');

        expect(res.status).toBe(400);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });

    it('requires authentication', async () => {
        const res = await request(app)
            .patch('/characters/char-1/data')
            .send({ speed: 30 });

        expect(res.status).toBe(401);
    });
});

describe('PATCH /characters/:id/hp (refactored via mutateCharacterData)', () => {
    it('clamps current HP to max', async () => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue(
            ownedCharacter({ hp: { current: 5, max: 10, temp: 0 } })
        );

        const res = await request(app)
            .patch('/characters/char-1/hp')
            .set('Authorization', `Bearer ${token}`)
            .send({ current: 999 });

        expect(res.status).toBe(200);
        const saved = (prisma.character.update as jest.Mock).mock.calls[0][0].data.data;
        expect(saved.hp.current).toBe(10);
    });

    it('denies non-owners', async () => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue({
            ...ownedCharacter({ hp: { current: 5, max: 10, temp: 0 } }),
            userId: 'someone-else',
        });

        const res = await request(app)
            .patch('/characters/char-1/hp')
            .set('Authorization', `Bearer ${token}`)
            .send({ current: 999 });

        expect(res.status).toBe(403);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });
});

describe('PATCH /characters/:id/equipment (error path via mutateCharacterData)', () => {
    it('returns 400 for an invalid index without saving', async () => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue(
            ownedCharacter({ equipment: [{ name: 'Sword' }] })
        );

        const res = await request(app)
            .patch('/characters/char-1/equipment')
            .set('Authorization', `Bearer ${token}`)
            .send({ index: 5, item: { equipped: true } });

        expect(res.status).toBe(400);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });
});

describe('subclasses per class', () => {
    const levelUp = (character: object, body: object) => {
        (prisma.character.findUnique as jest.Mock).mockResolvedValue(character);
        return request(app)
            .post('/characters/char-1/level-up')
            .set('Authorization', `Bearer ${token}`)
            .send(body);
    };
    const savedData = () => (prisma.character.update as jest.Mock).mock.calls[0][0].data;

    it('gives a second class its own subclass and keeps the first', async () => {
        const res = await levelUp(
            { ...ownedCharacter({ classes: { fighter: 5, wizard: 2 }, subclassId: 'champion', abilityScores: { int: 14 } }), level: 7 },
            { hpIncrease: 4, classToLevel: 'wizard', subclassId: 'evocation' }
        );
        expect(res.status).toBe(200);
        const saved = savedData();
        expect(saved.data.classes).toEqual({ fighter: 5, wizard: 3 });
        expect(saved.data.subclasses).toEqual({ fighter: 'champion', wizard: 'evocation' });
        // Single-subclass mirror for older clients keeps the subclass it already had
        expect(saved.data.subclassId).toBe('champion');
        expect(saved.data.levelHistory.at(-1)).toMatchObject({ classId: 'wizard', subclassId: 'evocation', multiclass: false });
    });

    it('assigns a legacy subclassId to the class it belongs to', async () => {
        // Fighter 1 / Rogue 3 who picked Arcane Trickster before per-class tracking; Fighter is character.class
        await levelUp(
            { ...ownedCharacter({ classes: { fighter: 1, rogue: 3 }, subclassId: 'arcane_trickster', abilityScores: {} }), level: 4 },
            { hpIncrease: 5, classToLevel: 'fighter' }
        );
        expect(savedData().data.subclasses).toEqual({ rogue: 'arcane_trickster' });
    });

    it('adds subclass features for the leveled class at its own class level', async () => {
        const data = { classes: { fighter: 6, wizard: 5 }, subclasses: { fighter: 'champion', wizard: 'evocation' }, features: [], abilityScores: {} };
        // Wizard 5 -> 6 gains Sculpt Spells even though the character is level 12
        await levelUp({ ...ownedCharacter(data), level: 11 }, { hpIncrease: 4, classToLevel: 'wizard' });
        let names = savedData().data.features.map((f: any) => f.name);
        expect(names).toContain('Sculpt Spells');
        expect(names).not.toContain('Additional Fighting Style');

        // Fighter 6 -> 7 gains the Champion's Additional Fighting Style, not wizard features
        jest.clearAllMocks();
        await levelUp({ ...ownedCharacter({ ...data, features: [] }), level: 11 }, { hpIncrease: 6, classToLevel: 'fighter' });
        names = savedData().data.features.map((f: any) => f.name);
        expect(names).toContain('Additional Fighting Style');
        expect(names).not.toContain('Sculpt Spells');
    });

    it('rejects a subclass from another class', async () => {
        const res = await levelUp(
            { ...ownedCharacter({ classes: { fighter: 2 }, abilityScores: {} }), level: 2 },
            { hpIncrease: 6, subclassId: 'evocation' }
        );
        expect(res.status).toBe(400);
        expect(prisma.character.update).not.toHaveBeenCalled();
    });

    it('rejects replacing a class\'s existing subclass', async () => {
        const res = await levelUp(
            { ...ownedCharacter({ classes: { fighter: 3 }, subclasses: { fighter: 'champion' }, abilityScores: {} }), level: 3 },
            { hpIncrease: 6, subclassId: 'battle_master' }
        );
        expect(res.status).toBe(400);
    });

    it('computes resources for every class with its own subclass', async () => {
        await levelUp(
            { ...ownedCharacter({ classes: { fighter: 3, rogue: 2 }, subclasses: { fighter: 'battle_master' }, abilityScores: {} }), level: 5 },
            { hpIncrease: 5, classToLevel: 'rogue', subclassId: 'soulknife' }
        );
        const resources = savedData().data.classResources;
        expect(Object.keys(resources)).toEqual(expect.arrayContaining(['Second Wind', 'Superiority Dice', 'Psionic Energy Dice']));
    });

    it('keeps the current primary class when another class ties it', async () => {
        // Stored key order puts wizard first, as Postgres jsonb does
        await levelUp(
            { ...ownedCharacter({ classes: { wizard: 2, fighter: 3 }, subclasses: { fighter: 'champion' }, abilityScores: {}, hitDice: { total: 5, spent: 0, dieType: 10 } }), level: 5 },
            { hpIncrease: 4, classToLevel: 'wizard', subclassId: 'evocation' }
        );
        expect(savedData().class).toBe('Fighter');
        expect(savedData().data.hitDice.dieType).toBe(10);
    });

    it('level-down removes the class level and the subclass chosen at that level', async () => {
        const data = {
            classes: { fighter: 5, wizard: 3 },
            subclasses: { fighter: 'champion', wizard: 'evocation' },
            subclassId: 'champion',
            features: [],
            abilityScores: {},
            levelHistory: [{ level: 8, classId: 'wizard', subclassId: 'evocation', newFeatures: [], timestamp: new Date().toISOString() }],
        };
        (prisma.character.findUnique as jest.Mock).mockResolvedValue({ ...ownedCharacter(data), level: 8 });
        const res = await request(app).post('/characters/char-1/level-down').set('Authorization', `Bearer ${token}`).send({});
        expect(res.status).toBe(200);
        const saved = savedData();
        expect(saved.level).toBe(7);
        expect(saved.data.classes).toEqual({ fighter: 5, wizard: 2 });
        expect(saved.data.subclasses).toEqual({ fighter: 'champion' });
        expect(saved.data.subclassId).toBe('champion');
    });

    it('level-down of a new multiclass removes that class', async () => {
        const data = {
            classes: { paladin: 3, warlock: 1 },
            abilityScores: {},
            levelHistory: [{ level: 4, classId: 'warlock', multiclass: true, newFeatures: [], timestamp: new Date().toISOString() }],
        };
        (prisma.character.findUnique as jest.Mock).mockResolvedValue({ ...ownedCharacter(data), class: 'Paladin', level: 4 });
        await request(app).post('/characters/char-1/level-down').set('Authorization', `Bearer ${token}`).send({});
        expect(savedData().data.classes).toEqual({ paladin: 3 });
        expect(savedData().class).toBe('Paladin');
    });
});
