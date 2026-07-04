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

// 5.5e (2024 PHB) Ranger spell slots - custom table, not half-caster formula
const RANGER_SPELL_SLOTS_2024: { [level: number]: number[] } = {
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

// 5e Paladin/Ranger half-caster formula (for 2014 rules or multiclass)
const getHalfCasterSlots = (level: number) => {
    const effectiveLevel = Math.floor(level / 2);
    if (effectiveLevel < 1) return [];
    return SPELL_SLOTS_TABLE[Math.min(effectiveLevel, 20)] || [];
};

export const getSlotsForClass = (classId: string, level: number, casterLevelDivisor?: number) => {
    const cid = classId.toLowerCase();
    if (casterLevelDivisor) {
        const effectiveLevel = Math.floor(level / casterLevelDivisor);
        if (effectiveLevel < 1) return [];
        return SPELL_SLOTS_TABLE[Math.min(effectiveLevel, 20)] || [];
    }
    if (cid === 'ranger') {
        return RANGER_SPELL_SLOTS_2024[Math.min(level, 20)] || [];
    }
    if (cid === 'paladin') {
        return getHalfCasterSlots(level);
    }
    // Full caster
    if (level < 1) return [];
    return SPELL_SLOTS_TABLE[Math.min(level, 20)] || [];
};

/** Third caster (AT/EK) spells known by class level: 3,4,5,6,7,8,9 at levels 3,4,7,10,13,16,19. */
export const THIRD_CASTER_SPELLS_KNOWN: number[] = [0, 0, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9];
export const THIRD_CASTER_CANTRIPS: Record<string, number> = { arcane_trickster: 3, eldritch_knight: 2 };
