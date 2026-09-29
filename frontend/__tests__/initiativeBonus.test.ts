import { describeInitiative, getInitiative } from '@/lib/initiativeBonus';
import { rollAdjustment } from '@/lib/conditions';

const modifiers = { dex: 2, int: 1, wis: 3, cha: -1 };
const base = { modifiers, proficiencyBonus: 2 };

describe('initiative', () => {
    it('is just Dexterity without features', () => {
        expect(getInitiative({ ...base, features: [] })).toEqual({ total: 2, bonuses: [], advantage: [] });
    });

    it('adds the Proficiency Bonus for Alert, stored as a feat or only as the background stub', () => {
        expect(getInitiative({ ...base, features: [{ name: 'Alert', featId: 'alert' }] }).total).toBe(4);
        expect(getInitiative({ ...base, features: [], backgroundFeatureName: 'Origin Feat: Alert' }).total).toBe(4);
        // Counted once when both are present
        expect(getInitiative({
            ...base,
            features: [{ name: 'Alert', featId: 'alert' }],
            backgroundFeatureName: 'Origin Feat: Alert',
        }).bonuses).toEqual([{ name: 'Alert', value: 2 }]);
    });

    it('adds Wisdom for Dread Ambusher and the Proficiency Bonus for Hare-Trigger', () => {
        const result = getInitiative({
            ...base,
            features: [{ name: 'Dread Ambusher' }, { name: 'Dread Ambusher' }],
            racialTraits: ['Hare-Trigger'],
        });
        expect(result.bonuses).toEqual([{ name: 'Hare-Trigger', value: 2 }, { name: 'Dread Ambusher', value: 3 }]);
        expect(result.total).toBe(7);
        expect(describeInitiative(result, 2)).toBe('Dex +2, Hare-Trigger +2, Dread Ambusher +3 = +7');
    });

    it('never applies an optional bonus that would lower the roll', () => {
        expect(getInitiative({ ...base, features: [{ name: 'Rakish Audacity' }] }).total).toBe(2);
    });

    it('lists features that give Advantage', () => {
        const result = getInitiative({ ...base, features: [{ name: 'Feral Instinct' }, { name: 'Remarkable Athlete' }] });
        expect(result.advantage).toEqual(['Feral Instinct', 'Remarkable Athlete']);
        expect(result.total).toBe(2);
    });

    it('rolls feature Advantage alongside conditions', () => {
        const none = { conditions: [], exhaustion: 0 };
        expect(rollAdjustment('initiative', 'dex', none, ['Feral Instinct']).mode).toBe('advantage');
        const poisoned = rollAdjustment('initiative', 'dex', { conditions: ['Poisoned'], exhaustion: 0 }, ['Feral Instinct']);
        expect(poisoned.mode).toBe('normal');
        expect(poisoned.reasons[0]).toMatch(/Feral Instinct.*cancel/);
    });
});
