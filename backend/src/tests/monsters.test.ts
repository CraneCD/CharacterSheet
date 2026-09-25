import { monsters } from '../data/monsters';
import { monsterSchema } from '../lib/monsterSchema';

const DICE = /^\d+d\d+([+-]\d+)?$/;

describe('SRD monsters', () => {
    it('have unique, slug-shaped ids', () => {
        const ids = monsters.map(m => m.id);
        expect(new Set(ids).size).toBe(ids.length);
        for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    });

    it('match the stat block schema admins and custom monsters use', () => {
        for (const m of monsters) {
            const result = monsterSchema.safeParse(m);
            if (!result.success) throw new Error(`${m.id}: ${result.error.message}`);
        }
    });

    it('write hit dice and damage as rollable dice', () => {
        for (const m of monsters) {
            if (m.hitDice) expect(m.hitDice).toMatch(DICE);
            for (const a of [...(m.actions ?? []), ...(m.bonusActions ?? []), ...(m.reactions ?? []), ...(m.legendaryActions ?? [])]) {
                if (a.damage) expect(a.damage).toMatch(DICE);
                // A rollable attack needs both numbers
                if (a.attackBonus !== undefined) expect(a.damage).toBeDefined();
            }
        }
    });

    it('keep passive Perception consistent with the Perception skill', () => {
        for (const m of monsters) {
            const perception = m.skills?.Perception;
            if (perception !== undefined && m.passivePerception !== undefined) {
                expect(`${m.id}: ${m.passivePerception}`).toBe(`${m.id}: ${10 + perception}`);
            }
        }
    });
});
