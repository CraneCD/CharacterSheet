import { backfillLootValues, lootValue, valueFromDescription, withLootValues } from '../lib/lootValues';

describe('loot values', () => {
    it('reads a value from the loot description', () => {
        expect(valueFromDescription('A deep red gem worth 1,000 gold pieces.')).toBe('1,000 gp');
        expect(valueFromDescription('Silver ring. Value: 25 gp')).toBe('25 gp');
        expect(valueFromDescription('Valued at about 2.5 GP by the guild.')).toBe('2.5 gp');
        expect(valueFromDescription('A merchant sells for 5 sp each.')).toBe('5 sp');
        expect(valueFromDescription('Contains 50 gp and a note.')).toBeNull();
        expect(valueFromDescription('')).toBeNull();
    });

    it("prefers the loot's own Value, and gives coin piles none", () => {
        expect(lootValue({ value: ' 75 gp ', description: 'worth 10 gp' })).toBe('75 gp');
        expect(lootValue({ value: '', description: 'worth 10 gp' })).toBe('10 gp');
        expect(lootValue({ value: '10 gp', coins: { gp: 10 } })).toBeNull();
    });

    it('fills entries without a value, matching names case-insensitively', () => {
        const { equipment, filled } = withLootValues(
            ['ruby', { name: 'Gold Idol', value: '' }, { name: 'Silk Rope', value: '5 gp' }, { name: 'Torch' }],
            [{ name: 'Ruby', value: '1,000 gp' }, { name: 'Gold Idol', value: '500 gp' }, { name: 'Silk Rope', value: '10 gp' }],
        );
        expect(equipment).toEqual([{ name: 'ruby', value: '1,000 gp' }, { name: 'Gold Idol', value: '' }, { name: 'Silk Rope', value: '5 gp' }, { name: 'Torch' }]);
        expect(filled).toEqual(['ruby']);
    });

    it('updates characters holding loot, only when applying', async () => {
        const updatedAt = new Date();
        const prisma = {
            campaignItem: {
                findMany: jest.fn().mockResolvedValue([
                    { name: 'Ruby', value: '', description: 'Worth 1,000 gp.', coins: null, heldBy: 'c1' },
                    { name: 'Coins', value: '', description: '', coins: { gp: 5 }, heldBy: 'c1' },
                    { name: 'Idol', value: '500 gp', description: '', coins: null, heldBy: 'c2' },
                ]),
            },
            character: {
                findMany: jest.fn().mockResolvedValue([
                    { id: 'c1', name: 'Aria', updatedAt, data: { hp: { current: 5 }, equipment: [{ name: 'Ruby', quantity: 1 }] } },
                    { id: 'c2', name: 'Borin', updatedAt, data: { equipment: [{ name: 'Idol', value: '450 gp' }] } },
                ]),
                updateMany: jest.fn().mockResolvedValue({ count: 1 }),
            },
        };

        const dry = await backfillLootValues(prisma as any, { apply: false });
        expect(dry).toEqual({ charactersChecked: 2, charactersUpdated: 1, items: [{ characterId: 'c1', characterName: 'Aria', item: 'Ruby', value: '1,000 gp' }] });
        expect(prisma.character.updateMany).not.toHaveBeenCalled();

        await backfillLootValues(prisma as any, { apply: true });
        expect(prisma.character.updateMany).toHaveBeenCalledTimes(1);
        expect(prisma.character.updateMany).toHaveBeenCalledWith({
            where: { id: 'c1', updatedAt },
            data: { data: { hp: { current: 5 }, equipment: [{ name: 'Ruby', quantity: 1, value: '1,000 gp' }] } },
        });
    });
});
