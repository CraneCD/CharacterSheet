import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        character: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
    },
}));

import { prisma } from '../lib/prisma';
import characterRoutes from '../routes/characters';

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

beforeEach(() => {
    jest.clearAllMocks();
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
