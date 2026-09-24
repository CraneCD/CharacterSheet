/**
 * Sheet values the player can override (AC, Speed). A stored number is an override;
 * null or missing means "use the calculated value", so the stat keeps tracking armor,
 * species and feature changes.
 */

/** Base walking speed before feature bonuses: species speed, or 35 for Wood Elves. */
export function defaultSpeed(speciesSpeed: number | undefined, elvenLineage?: string): number {
    const lineage = (elvenLineage || '').toLowerCase().replace(/\s+/g, '_');
    if (lineage === 'wood_elf') return 35;
    return speciesSpeed || 30;
}

export interface OverridableValue {
    value: number;
    /** The calculated value the stat falls back to. */
    calculated: number;
    /** True when a stored override differs from the calculated value. */
    overridden: boolean;
}

export function resolveOverride(stored: unknown, calculated: number): OverridableValue {
    const override = typeof stored === 'number' && Number.isFinite(stored) ? stored : null;
    return {
        value: override ?? calculated,
        calculated,
        overridden: override !== null && override !== calculated,
    };
}

/** What to store for an edited value: entering the calculated value clears the override. */
export function overrideToStore(value: number, calculated: number): number | null {
    return value === calculated ? null : value;
}
