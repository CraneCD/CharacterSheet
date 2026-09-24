import {
    combineModes, exhaustionSummary, hasActiveConditions, isRollAffected, normalizeConditions, rollAdjustment, speedWithConditions,
} from '@/lib/conditions';
import { darkvisionRange, passiveScores, traitResistances } from '@/lib/senses';

const active = (conditions: string[], exhaustion = 0) => ({ conditions, exhaustion });

describe('conditions', () => {
    it('keeps known conditions in order and clamps exhaustion', () => {
        expect(normalizeConditions(['Prone', 'Nope', 'Blinded', 3], 9)).toEqual({ conditions: ['Blinded', 'Prone'], exhaustion: 6 });
        expect(normalizeConditions(undefined, undefined)).toEqual({ conditions: [], exhaustion: 0 });
        expect(hasActiveConditions(active([], 1))).toBe(true);
        expect(hasActiveConditions(active([]))).toBe(false);
    });

    it('gives Disadvantage on checks while Poisoned or Frightened, but not on saves', () => {
        expect(rollAdjustment('check', 'dex', active(['Poisoned']))).toEqual({ mode: 'disadvantage', penalty: 0, autoFail: undefined, reasons: ['Disadvantage (Poisoned)'] });
        expect(rollAdjustment('save', 'con', active(['Poisoned'])).mode).toBe('normal');
        expect(isRollAffected('save', 'con', active(['Poisoned']))).toBe(false);
    });

    it('handles attacks, including Advantage and Disadvantage cancelling', () => {
        expect(rollAdjustment('attack', undefined, active(['Prone', 'Blinded'])).reasons).toEqual(['Disadvantage (Blinded, Prone)']);
        expect(rollAdjustment('attack', undefined, active(['Invisible'])).mode).toBe('advantage');
        const both = rollAdjustment('attack', undefined, active(['Invisible', 'Poisoned']));
        expect(both.mode).toBe('normal');
        expect(both.reasons[0]).toMatch(/cancel out/);
        expect(rollAdjustment('initiative', 'dex', active(['Invisible'])).mode).toBe('advantage');
    });

    it('fails Strength and Dexterity saves automatically while Stunned and the like', () => {
        expect(rollAdjustment('save', 'dex', active(['Stunned'])).autoFail).toBe('Stunned');
        expect(rollAdjustment('save', 'str', active(['Unconscious'])).autoFail).toBe('Unconscious');
        expect(rollAdjustment('save', 'wis', active(['Stunned'])).autoFail).toBeUndefined();
        expect(rollAdjustment('save', 'dex', active(['Restrained'])).mode).toBe('disadvantage');
    });

    it('subtracts 2 per Exhaustion level from every d20 roll', () => {
        const adj = rollAdjustment('save', 'wis', active([], 2));
        expect(adj).toMatchObject({ mode: 'normal', penalty: 4, reasons: ['−4 Exhaustion 2'] });
        expect(exhaustionSummary(0)).toBe('None');
        expect(exhaustionSummary(3)).toBe('Level 3: −6 to d20 rolls, −15 ft. Speed');
        expect(exhaustionSummary(6)).toBe('Level 6: death');
    });

    it('combines a chosen mode with the conditions', () => {
        expect(combineModes('normal', 'disadvantage')).toBe('disadvantage');
        expect(combineModes('advantage', 'disadvantage')).toBe('normal');
        expect(combineModes('advantage', 'normal')).toBe('advantage');
        expect(combineModes('disadvantage', 'disadvantage')).toBe('disadvantage');
    });

    it('stops or slows Speed', () => {
        expect(speedWithConditions(30, active(['Grappled']))).toEqual({ speed: 0, reason: 'Grappled' });
        expect(speedWithConditions(30, active([], 2))).toEqual({ speed: 20, reason: 'Exhaustion 2' });
        expect(speedWithConditions(30, active(['Poisoned']))).toEqual({ speed: 30 });
    });
});

describe('senses', () => {
    it('computes passive scores from skill totals', () => {
        expect(passiveScores([{ name: 'Perception', total: 1 }, { name: 'Insight', total: 4 }])).toEqual({ perception: 11, investigation: 10, insight: 14 });
    });

    it('finds Darkvision range without trusting lineage tables', () => {
        expect(darkvisionRange([{ name: 'Darkvision', description: 'You have Darkvision with a range of 60 feet.' }])).toBe(60);
        expect(darkvisionRange([{ name: 'Darkvision (120 ft.)' }, { name: 'Darkvision', description: 'range of 60 feet' }])).toBe(120);
        // The generic Elven Lineage table mentions Drow's 120 ft.; only the chosen lineage counts
        expect(darkvisionRange([
            { name: 'Darkvision', description: 'You have Darkvision with a range of 60 feet.' },
            { name: 'Elven Lineage', description: 'Drow. The range of your Darkvision increases to 120 feet.' },
        ])).toBe(60);
        expect(darkvisionRange([{ name: 'Elven Lineage (Drow)', description: 'The range of your Darkvision increases to 120 feet.' }])).toBe(120);
        expect(darkvisionRange([{ name: 'Brave', description: 'Advantage on saves against Frightened.' }])).toBe(0);
    });

    it('lists resistances from traits that grant one type', () => {
        expect(traitResistances([
            { name: 'Fiendish Legacy', description: 'Abyssal: Resistance to Poison damage. Chthonic: Resistance to Necrotic damage. Infernal: Resistance to Fire damage.' },
            { name: 'Fiendish Legacy (Abyssal)', description: 'You have Resistance to Poison damage.' },
            { name: 'Dwarven Resilience', description: 'You have Resistance to Poison damage.' },
            { name: 'Damage Resistance', description: 'You have Resistance to the damage type determined by your Draconic Ancestry.' },
        ])).toEqual([{ type: 'Poison', source: 'Fiendish Legacy (Abyssal)' }]);
    });
});
