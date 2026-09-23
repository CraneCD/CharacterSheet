// 5e Standard Spell Slots Table (Wizard, Cleric, Druid, Sorcerer, Bard)
const SPELL_SLOTS_TABLE: { [level: number]: number[] } = {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

// 5.5e (2024 PHB) Paladin and Ranger spell slots (both cast from level 1) - not the 2014 half-caster formula
const HALF_CASTER_SPELL_SLOTS_2024: { [level: number]: number[] } = {
    1: [2],
    2: [2],
    3: [3],
    4: [3],
    5: [4, 2],
    6: [4, 2],
    7: [4, 3],
    8: [4, 3],
    9: [4, 3, 2],
    10: [4, 3, 2],
    11: [4, 3, 3],
    12: [4, 3, 3],
    13: [4, 3, 3, 1],
    14: [4, 3, 3, 1],
    15: [4, 3, 3, 2],
    16: [4, 3, 3, 2],
    17: [4, 3, 3, 3, 1],
    18: [4, 3, 3, 3, 1],
    19: [4, 3, 3, 3, 2],
    20: [4, 3, 3, 3, 2],
};

// 2024 PHB Warlock Pact Magic: [number of slots, slot level] by Warlock level.
const PACT_MAGIC_2024: { [level: number]: [number, number] } = {
    1: [1, 1], 2: [2, 1], 3: [2, 2], 4: [2, 2], 5: [2, 3], 6: [2, 3], 7: [2, 4], 8: [2, 4], 9: [2, 5], 10: [2, 5],
    11: [3, 5], 12: [3, 5], 13: [3, 5], 14: [3, 5], 15: [3, 5], 16: [3, 5], 17: [4, 5], 18: [4, 5], 19: [4, 5], 20: [4, 5],
};

/** Pact Magic slots as a per-spell-level array (all slots share the highest level; lower levels have 0). */
export const getPactMagicSlots = (level: number): number[] => {
    if (level < 1) return [];
    const [count, slotLevel] = PACT_MAGIC_2024[Math.min(level, 20)];
    return Array.from({ length: slotLevel }, (_, i) => (i === slotLevel - 1 ? count : 0));
};

export const getSlotsForClass = (classId: string, level: number, casterLevelDivisor?: number) => {
    const cid = classId.toLowerCase();
    if (casterLevelDivisor) {
        // Eldritch Knight / Arcane Trickster table == full-caster table at ceil(level / 3), starting at level 3.
        if (level < 3) return [];
        const effectiveLevel = Math.ceil(level / casterLevelDivisor);
        return SPELL_SLOTS_TABLE[Math.min(effectiveLevel, 20)] || [];
    }
    if (cid === 'ranger' || cid === 'paladin') {
        return HALF_CASTER_SPELL_SLOTS_2024[Math.min(level, 20)] || [];
    }
    if (cid === 'warlock') {
        return getPactMagicSlots(level);
    }
    // Full caster
    if (level < 1) return [];
    return SPELL_SLOTS_TABLE[Math.min(level, 20)] || [];
};

/** Eldritch Knight / Arcane Trickster (2024) prepared spells by class level. */
export const THIRD_CASTER_SPELLS_KNOWN: number[] = [0, 0, 3, 4, 4, 4, 5, 6, 6, 7, 8, 8, 9, 10, 10, 11, 11, 11, 12, 13];
/** Cantrips at subclass level 3 (one more at class level 10; see getThirdCasterCantrips). */
export const THIRD_CASTER_CANTRIPS: Record<string, number> = { arcane_trickster: 3, eldritch_knight: 2 };
export const getThirdCasterCantrips = (subclassId: string, classLevel: number): number =>
    (THIRD_CASTER_CANTRIPS[subclassId] ?? 2) + (classLevel >= 10 ? 1 : 0);
