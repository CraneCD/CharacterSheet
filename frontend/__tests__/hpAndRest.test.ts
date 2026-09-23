import { applyDamage, applyHealing, applyTempHp, getHpStatus } from '@/lib/hp';
import { hitDieHealing, planLongRest, planShortRest, rollHitDie } from '@/lib/rest';

const hp = (current: number, max = 30, temp = 0) => ({ current, max, temp });

describe('applyDamage', () => {
    it('takes damage from temporary HP first', () => {
        const r = applyDamage(hp(20, 30, 5), 8);
        expect(r.absorbedByTemp).toBe(5);
        expect(r.hpLost).toBe(3);
        expect(r.hp).toMatchObject({ current: 17, temp: 0 });
    });

    it('stops at 0 HP and flags instant death when the leftover reaches max HP', () => {
        expect(applyDamage(hp(10), 25)).toMatchObject({ hp: { current: 0 }, hpLost: 10, instantDeath: false });
        expect(applyDamage(hp(10), 40).instantDeath).toBe(true);
    });

    it('adds death save failures for damage at 0 HP (two on a critical)', () => {
        const down = { ...hp(0), deathSaves: { successes: 1, failures: 1 } };
        expect(applyDamage(down, 3).hp.deathSaves).toEqual({ successes: 1, failures: 2 });
        expect(applyDamage(down, 3, { critical: true }).hp.deathSaves).toEqual({ successes: 1, failures: 3 });
        expect(applyDamage(down, 3).deathSaveFailuresAdded).toBe(1);
    });

    it('ignores zero, negative and non-numeric amounts', () => {
        expect(applyDamage(hp(10), -4).hp.current).toBe(10);
        expect(applyDamage(hp(10), NaN).hp.current).toBe(10);
    });
});

describe('applyHealing / applyTempHp', () => {
    it('heals up to max and clears death saves', () => {
        const down = { ...hp(0), deathSaves: { successes: 2, failures: 1 } };
        const r = applyHealing(down, 7);
        expect(r.hp.current).toBe(7);
        expect(r.hp.deathSaves).toEqual({ successes: 0, failures: 0 });
        expect(applyHealing(hp(28), 10)).toMatchObject({ hp: { current: 30 }, healed: 2 });
    });

    it('keeps the higher temporary HP instead of stacking', () => {
        expect(applyTempHp(hp(10, 30, 5), 3)).toMatchObject({ gained: false, hp: { temp: 5 } });
        expect(applyTempHp(hp(10, 30, 5), 8)).toMatchObject({ gained: true, hp: { temp: 8 } });
    });

    it('classifies HP for the bar', () => {
        expect(getHpStatus(hp(30))).toBe('healthy');
        expect(getHpStatus(hp(15))).toBe('bloodied');
        expect(getHpStatus(hp(7))).toBe('critical');
        expect(getHpStatus(hp(0))).toBe('down');
        expect(getHpStatus({ ...hp(0), deathSaves: { successes: 0, failures: 3 } })).toBe('dead');
    });
});

describe('hit dice', () => {
    it('heals the roll plus CON, minimum 1', () => {
        expect(hitDieHealing(6, 2)).toBe(8);
        expect(hitDieHealing(1, -3)).toBe(1);
    });

    it('rolls within the die', () => {
        expect(rollHitDie(10, () => 0)).toBe(1);
        expect(rollHitDie(10, () => 0.999)).toBe(10);
    });
});

const ctx = { warlockLevel: 0, multiclass: false, hasMagicInitiateSpell: false };
const resources = {
    'Second Wind': { name: 'Second Wind', current: 0, max: 3, resetType: 'short' as const, shortRestRegain: 1 },
    'Action Surge': { name: 'Action Surge', current: 0, max: 1, resetType: 'short' as const },
    'Indomitable': { name: 'Indomitable', current: 0, max: 1, resetType: 'long' as const },
    'Lucky': { name: 'Lucky', current: 1, max: 3, resetType: 'none' as const },
};

describe('planLongRest', () => {
    it('restores HP, hit dice, slots and resources, and summarizes it', () => {
        const plan = planLongRest({
            hp: { current: 12, max: 31, temp: 4, deathSaves: { successes: 0, failures: 1 } },
            hitDice: { total: 3, spent: 2, dieType: 10 },
            spellSlotsUsed: { 1: 2 },
            classResources: resources,
        }, ctx);

        expect(plan.updates.hp).toEqual({ current: 31, max: 31, temp: 0, deathSaves: { successes: 0, failures: 0 } });
        expect(plan.updates.hitDice).toEqual({ total: 3, spent: 0, dieType: 10 });
        expect(plan.updates.spellSlotsUsed).toEqual({});
        expect(plan.updates).not.toHaveProperty('classResources');
        expect(plan.resetsResources).toBe(true);
        expect(plan.resources['Second Wind'].current).toBe(3);
        expect(plan.resources['Indomitable'].current).toBe(1);
        expect(plan.resources['Lucky'].current).toBe(1);
        expect(plan.summary).toEqual([
            'HP restored to 31 (+19)',
            '4 temporary HP ended',
            'Regained 2 Hit Dice',
            'Spell slots restored',
            'Second Wind, Action Surge and Indomitable restored',
        ]);
    });

    it('has nothing to report when already rested', () => {
        const plan = planLongRest({ hp: { current: 31, max: 31, temp: 0 }, hitDice: { total: 3, spent: 0, dieType: 10 } }, ctx);
        expect(plan.summary).toEqual([]);
        expect(plan.resetsResources).toBe(false);
    });

    it('readies the Magic Initiate spell', () => {
        const plan = planLongRest({ magicInitiateSpell1Used: 0 }, { ...ctx, hasMagicInitiateSpell: true });
        expect(plan.updates.magicInitiateSpell1Used).toBe(1);
        expect(plan.summary).toContain('Magic Initiate spell ready');
    });
});

describe('planShortRest', () => {
    it('spends hit dice to heal and recovers short-rest resources', () => {
        const plan = planShortRest({
            hp: { current: 10, max: 31, temp: 0 },
            hitDice: { total: 3, spent: 1, dieType: 10 },
            classResources: resources,
        }, ctx, [4, 7, 9], 2);

        // Only 2 dice available: (4+2) + (7+2) = 15
        expect(plan.updates.hitDice).toEqual({ total: 3, spent: 3, dieType: 10 });
        expect(plan.updates.hp?.current).toBe(25);
        expect(plan.resources['Second Wind'].current).toBe(1);
        expect(plan.resources['Action Surge'].current).toBe(1);
        expect(plan.resources['Indomitable'].current).toBe(0);
        expect(plan.summary).toEqual(['Spent 2 Hit Dice: healed 15 HP', 'Second Wind and Action Surge recovered']);
    });

    it('leaves HP and hit dice alone when no dice are spent', () => {
        const plan = planShortRest({ hp: { current: 10, max: 31, temp: 0 }, hitDice: { total: 3, spent: 0, dieType: 10 } }, ctx, [], 2);
        expect(plan.updates).toEqual({});
        expect(plan.summary).toEqual([]);
    });

    it('restores Pact Magic slots: all slots for a single-class Warlock, pact slots when multiclassed', () => {
        const single = planShortRest({ spellSlotsUsed: { 2: 2 } }, { ...ctx, warlockLevel: 5 }, [], 0);
        expect(single.updates).toEqual({ spellSlotsUsed: {} });
        expect(single.summary).toEqual(['Pact Magic slots restored']);

        const multi = planShortRest({ spellSlotsUsed: { 1: 1 }, pactSlotsUsed: 1 }, { ...ctx, warlockLevel: 2, multiclass: true }, [], 0);
        expect(multi.updates).toEqual({ pactSlotsUsed: 0 });
    });
});
