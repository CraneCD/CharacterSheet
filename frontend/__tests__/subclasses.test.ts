import {
    calculateAllClassResources,
    getCharacterSubclasses,
    getClassLevels,
    getSubclassMap,
    updateAllClassResources,
} from '@/lib/subclasses';

const SUBCLASSES = [
    { id: 'champion', classId: 'fighter', name: 'Champion' },
    { id: 'battle_master', classId: 'fighter', name: 'Battle Master' },
    { id: 'arcane_trickster', classId: 'rogue', name: 'Arcane Trickster' },
    { id: 'evocation', classId: 'wizard', name: 'Evoker' },
];

describe('getSubclassMap', () => {
    it('reads the per-class map', () => {
        expect(getSubclassMap({ subclasses: { fighter: 'champion', Wizard: 'evocation' } }, SUBCLASSES))
            .toEqual({ fighter: 'champion', wizard: 'evocation' });
    });

    it('assigns a legacy subclassId to the class it belongs to, not the primary class', () => {
        expect(getSubclassMap({ subclassId: 'arcane_trickster' }, SUBCLASSES, 'fighter')).toEqual({ rogue: 'arcane_trickster' });
    });

    it('falls back to the primary class for an unknown legacy subclass', () => {
        expect(getSubclassMap({ subclassId: 'homebrew' }, SUBCLASSES, 'fighter')).toEqual({ fighter: 'homebrew' });
    });

    it('does not duplicate a legacy subclassId already in the map', () => {
        expect(getSubclassMap({ subclassId: 'champion', subclasses: { fighter: 'champion', wizard: 'evocation' } }, SUBCLASSES, 'fighter'))
            .toEqual({ fighter: 'champion', wizard: 'evocation' });
    });

    it('ignores malformed data', () => {
        expect(getSubclassMap({ subclasses: ['champion'] as unknown }, SUBCLASSES)).toEqual({});
        expect(getSubclassMap(undefined, SUBCLASSES)).toEqual({});
    });
});

describe('getClassLevels / getCharacterSubclasses', () => {
    it('falls back to one class at the character level', () => {
        expect(getClassLevels({}, 'Fighter', 4)).toEqual({ fighter: 4 });
        expect(getClassLevels({ classes: { fighter: 5, wizard: 3 } }, 'fighter', 8)).toEqual({ fighter: 5, wizard: 3 });
    });

    it('pairs each subclass with its own class level', () => {
        const result = getCharacterSubclasses({ fighter: 'champion', wizard: 'evocation' }, { fighter: 5, wizard: 3 }, SUBCLASSES);
        expect(result.map(r => [r.classId, r.classLevel, r.subclass.id])).toEqual([
            ['fighter', 5, 'champion'],
            ['wizard', 3, 'evocation'],
        ]);
    });

    it('drops subclasses for classes the character no longer has', () => {
        expect(getCharacterSubclasses({ wizard: 'evocation' }, { fighter: 5 }, SUBCLASSES)).toEqual([]);
    });
});

describe('class resources across classes', () => {
    it('computes each class at its own level with its own subclass', () => {
        const res = calculateAllClassResources({ fighter: 3, sorcerer: 4 }, { fighter: 'battle_master' }, {});
        expect(res['Superiority Dice']).toBeDefined();
        expect(res['Second Wind']).toBeDefined();
        // Sorcery Points = Sorcerer level, not character level
        expect(res['Sorcery Points'].max).toBe(4);
    });

    it('keeps the larger pool when two classes share a resource name', () => {
        const res = calculateAllClassResources({ cleric: 6, paladin: 3 }, {}, {});
        expect(res['Channel Divinity'].max).toBe(3);
    });

    it('keeps current values and non-class resources on update', () => {
        const existing = {
            'Second Wind': { name: 'Second Wind', current: 0, max: 2, resetType: 'short' as const },
            'Heroic Inspiration': { name: 'Heroic Inspiration', current: 0, max: 1, resetType: 'long' as const },
        };
        const out = updateAllClassResources({ fighter: 4 }, {}, existing, {});
        expect(out['Heroic Inspiration']).toEqual(existing['Heroic Inspiration']);
        expect(out['Second Wind'].current).toBe(Math.max(0, out['Second Wind'].max - 2));
    });
});
