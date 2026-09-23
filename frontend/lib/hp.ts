import { HP } from './types';

/** Hit point math for the sheet's damage / heal / temp HP controls (2024 rules). */

export type DeathSaves = NonNullable<HP['deathSaves']>;

const NO_DEATH_SAVES: DeathSaves = { successes: 0, failures: 0 };

export interface DamageResult {
    hp: HP;
    /** Damage soaked by temporary hit points. */
    absorbedByTemp: number;
    /** Hit points actually lost. */
    hpLost: number;
    /** Took damage while already at 0 HP: death save failures added (2 on a critical hit). */
    deathSaveFailuresAdded: number;
    /** Damage left over after dropping to 0 met or beat max HP: the character dies outright. */
    instantDeath: boolean;
}

function clampAmount(amount: number): number {
    return Number.isFinite(amount) ? Math.max(0, Math.floor(amount)) : 0;
}

/**
 * Temporary hit points absorb damage first. Damage taken at 0 HP adds a death save failure
 * (two for a critical hit); damage that reduces you to 0 with at least your max HP left over kills you.
 */
export function applyDamage(hp: HP, amount: number, options: { critical?: boolean } = {}): DamageResult {
    const damage = clampAmount(amount);
    const temp = Math.max(0, hp.temp || 0);
    const absorbedByTemp = Math.min(temp, damage);
    const remaining = damage - absorbedByTemp;
    const deathSaves = hp.deathSaves ?? NO_DEATH_SAVES;

    if (hp.current <= 0) {
        const added = remaining > 0 ? (options.critical ? 2 : 1) : 0;
        return {
            hp: {
                ...hp,
                current: 0,
                temp: temp - absorbedByTemp,
                deathSaves: added > 0 ? { ...deathSaves, failures: Math.min(3, deathSaves.failures + added) } : deathSaves,
            },
            absorbedByTemp,
            hpLost: 0,
            deathSaveFailuresAdded: added,
            instantDeath: remaining >= hp.max && hp.max > 0,
        };
    }

    const hpLost = Math.min(hp.current, remaining);
    const overflow = remaining - hpLost;
    const current = hp.current - hpLost;
    return {
        hp: { ...hp, current, temp: temp - absorbedByTemp },
        absorbedByTemp,
        hpLost,
        deathSaveFailuresAdded: 0,
        instantDeath: current === 0 && overflow >= hp.max && hp.max > 0,
    };
}

/** Healing can't raise HP above max; any healing from 0 HP clears death saves. */
export function applyHealing(hp: HP, amount: number): { hp: HP; healed: number } {
    const healing = clampAmount(amount);
    const current = Math.min(hp.max, Math.max(0, hp.current) + healing);
    const healed = current - Math.max(0, hp.current);
    return {
        hp: { ...hp, current, deathSaves: current > 0 ? { ...NO_DEATH_SAVES } : hp.deathSaves },
        healed,
    };
}

/** Temporary hit points don't stack: keep whichever is higher. */
export function applyTempHp(hp: HP, amount: number): { hp: HP; gained: boolean } {
    const temp = clampAmount(amount);
    const current = Math.max(0, hp.temp || 0);
    if (temp <= current) return { hp, gained: false };
    return { hp: { ...hp, temp }, gained: true };
}

export type HpStatus = 'healthy' | 'bloodied' | 'critical' | 'down' | 'dead';

/** For the HP bar color and 0 HP state. Bloodied is at or below half. */
export function getHpStatus(hp: HP): HpStatus {
    if (hp.current <= 0) {
        return (hp.deathSaves?.failures ?? 0) >= 3 ? 'dead' : 'down';
    }
    if (hp.max <= 0) return 'healthy';
    const ratio = hp.current / hp.max;
    if (ratio <= 0.25) return 'critical';
    if (ratio <= 0.5) return 'bloodied';
    return 'healthy';
}
