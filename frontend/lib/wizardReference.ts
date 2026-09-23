/**
 * Rules tables for the create wizard, level-up, and sheet (2024 PHB).
 * The API (/reference/*) is the source of truth for species, backgrounds and
 * feats (admins can edit those); the maps below are fallbacks for when the API
 * data isn't available and are generated from backend/src/data.
 */

/** Elven lineage options (2024 PHB). */
export const ELVEN_LINEAGES = [
    { id: 'drow', name: 'Drow' },
    { id: 'high_elf', name: 'High Elf' },
    { id: 'wood_elf', name: 'Wood Elf' }
] as const;

/**
 * Spells granted by a species or its lineage choice, by character level
 * (level 1 = cantrip or always-prepared spell). Keys are lineage option ids,
 * or species ids for spells every member of the species gets.
 */
export const SPECIES_LINEAGE_SPELLS: Record<string, { level: number; spellId: string }[]> = {
    drow: [
        { level: 1, spellId: 'dancing-lights' },
        { level: 3, spellId: 'faerie-fire' },
        { level: 5, spellId: 'darkness' }
    ],
    high_elf: [
        { level: 1, spellId: 'prestidigitation' },
        { level: 3, spellId: 'detect-magic' },
        { level: 5, spellId: 'misty-step' }
    ],
    wood_elf: [
        { level: 1, spellId: 'druidcraft' },
        { level: 3, spellId: 'longstrider' },
        { level: 5, spellId: 'pass-without-trace' }
    ],
    forest_gnome: [
        { level: 1, spellId: 'minor-illusion' },
        { level: 1, spellId: 'speak-with-animals' }
    ],
    rock_gnome: [
        { level: 1, spellId: 'mending' },
        { level: 1, spellId: 'prestidigitation' }
    ],
    abyssal: [
        { level: 1, spellId: 'poison-spray' },
        { level: 3, spellId: 'ray-of-sickness' },
        { level: 5, spellId: 'hold-person' }
    ],
    chthonic: [
        { level: 1, spellId: 'chill-touch' },
        { level: 3, spellId: 'false-life' },
        { level: 5, spellId: 'ray-of-enfeeblement' }
    ],
    infernal: [
        { level: 1, spellId: 'fire-bolt' },
        { level: 3, spellId: 'hellish-rebuke' },
        { level: 5, spellId: 'darkness' }
    ],
    aasimar: [
        { level: 1, spellId: 'light' }
    ]
};

/** @deprecated use SPECIES_LINEAGE_SPELLS (kept for existing imports). */
export const ELVEN_LINEAGE_SPELLS = SPECIES_LINEAGE_SPELLS;

/** Spells a character gets from their species (and lineage choice) at a character level. */
export function getSpeciesSpellEntries(raceId: string, lineageId?: string): { level: number; spellId: string }[] {
    const out: { level: number; spellId: string }[] = [];
    const r = (raceId || '').toLowerCase();
    const l = (lineageId || '').toLowerCase().replace(/\s+/g, '_');
    if (SPECIES_LINEAGE_SPELLS[r]) out.push(...SPECIES_LINEAGE_SPELLS[r]);
    if (l && SPECIES_LINEAGE_SPELLS[l]) out.push(...SPECIES_LINEAGE_SPELLS[l]);
    return out;
}

/** Fallback subclass spells when the subclass record has no `spells` list. Level = class level. */
export const SUBCLASS_BONUS_SPELLS: Record<string, { level: number; spellId: string }[]> = {
    gloom_stalker: [
        { level: 3, spellId: 'disguise-self' },
        { level: 5, spellId: 'rope-trick' },
        { level: 9, spellId: 'fear' },
        { level: 13, spellId: 'greater-invisibility' },
        { level: 17, spellId: 'seeming' }
    ]
};

/** Elf traits by lineage (2024 PHB). Base traits + lineage-specific. */
export const ELF_TRAITS_BY_LINEAGE: Record<string, string[]> = {
    drow: ['Darkvision', 'Elven Lineage (Drow)', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Superior Darkvision', 'Dancing Lights'],
    high_elf: ['Darkvision', 'Elven Lineage (High Elf)', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Cantrip (Prestidigitation)'],
    wood_elf: ['Darkvision', 'Elven Lineage (Wood Elf)', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Fleet of Foot', 'Druidcraft']
};

/** 2024 PHB species traits (fallback when the API is unavailable). */
export const RACE_TRAITS: Record<string, string[]> = {
    aasimar: ["Celestial Resistance", "Darkvision", "Healing Hands", "Light Bearer", "Celestial Revelation"],
    dragonborn: ["Draconic Ancestry", "Breath Weapon", "Damage Resistance", "Darkvision", "Draconic Flight"],
    dwarf: ["Darkvision (120 ft.)", "Dwarven Resilience", "Dwarven Toughness", "Stonecunning"],
    elf: ["Darkvision", "Elven Lineage", "Fey Ancestry", "Keen Senses", "Trance"],
    gnome: ["Darkvision", "Gnomish Cunning", "Gnomish Lineage"],
    goliath: ["Giant Ancestry", "Large Form", "Powerful Build"],
    halfling: ["Brave", "Halfling Nimbleness", "Luck", "Naturally Stealthy"],
    human: ["Resourceful", "Skillful", "Versatile"],
    orc: ["Adrenaline Rush", "Darkvision (120 ft.)", "Relentless Endurance"],
    tiefling: ["Darkvision", "Fiendish Legacy", "Otherworldly Presence"],
};

/** 2024 background ability-score options (three abilities per background). */
export const BACKGROUND_ABILITIES: Record<string, string[]> = {
    acolyte: ["int", "wis", "cha"],
    artisan: ["str", "dex", "int"],
    charlatan: ["dex", "con", "cha"],
    criminal: ["dex", "con", "int"],
    entertainer: ["str", "dex", "cha"],
    farmer: ["str", "con", "wis"],
    guard: ["str", "int", "wis"],
    guide: ["dex", "con", "wis"],
    hermit: ["con", "wis", "cha"],
    merchant: ["con", "int", "cha"],
    noble: ["str", "int", "cha"],
    sage: ["con", "int", "wis"],
    sailor: ["str", "dex", "wis"],
    scribe: ["dex", "int", "wis"],
    soldier: ["str", "dex", "con"],
    wayfarer: ["dex", "wis", "cha"],
    "folk-hero": ["str", "con", "wis"],
    anthropologist: ["int", "wis", "cha"],
    archaeologist: ["str", "int", "wis"],
    athlete: ["str", "dex", "con"],
    "city-watch": ["str", "int", "wis"],
    "clan-crafter": ["str", "con", "int"],
    "cloistered-scholar": ["int", "wis", "cha"],
    courtier: ["int", "wis", "cha"],
    faceless: ["dex", "int", "cha"],
    "faction-agent": ["int", "wis", "cha"],
    "far-traveler": ["dex", "wis", "cha"],
    feylost: ["dex", "wis", "cha"],
    fisher: ["str", "con", "wis"],
    "giant-foundling": ["str", "con", "wis"],
    gladiator: ["str", "dex", "cha"],
    "guild-artisan": ["dex", "int", "cha"],
    "guild-merchant": ["con", "wis", "cha"],
    "haunted-one": ["con", "int", "wis"],
    "house-agent": ["dex", "int", "cha"],
    inheritor: ["con", "wis", "cha"],
    "investigator-scag": ["dex", "int", "wis"],
    "investigator-vrgr": ["dex", "int", "wis"],
    knight: ["str", "int", "cha"],
    "knight-of-the-order": ["str", "wis", "cha"],
    marine: ["str", "dex", "con"],
    "mercenary-veteran": ["str", "dex", "cha"],
    outlander: ["str", "con", "wis"],
    pirate: ["str", "dex", "wis"],
    rewarded: ["int", "wis", "cha"],
    ruined: ["con", "wis", "cha"],
    "rune-carver": ["str", "int", "wis"],
    shipwright: ["str", "con", "int"],
    smuggler: ["dex", "con", "cha"],
    spy: ["dex", "int", "cha"],
};

export const BACKGROUND_SKILLS: Record<string, string[]> = {
    acolyte: ["Insight", "Religion"],
    artisan: ["Investigation", "Persuasion"],
    charlatan: ["Deception", "Sleight of Hand"],
    criminal: ["Sleight of Hand", "Stealth"],
    entertainer: ["Acrobatics", "Performance"],
    farmer: ["Animal Handling", "Nature"],
    guard: ["Athletics", "Perception"],
    guide: ["Stealth", "Survival"],
    hermit: ["Medicine", "Religion"],
    merchant: ["Animal Handling", "Persuasion"],
    noble: ["History", "Persuasion"],
    sage: ["Arcana", "History"],
    sailor: ["Acrobatics", "Perception"],
    scribe: ["Investigation", "Perception"],
    soldier: ["Athletics", "Intimidation"],
    wayfarer: ["Insight", "Stealth"],
    "folk-hero": ["Animal Handling", "Survival"],
    anthropologist: ["Insight", "Religion"],
    archaeologist: ["History", "Survival"],
    athlete: ["Athletics", "Acrobatics"],
    "city-watch": ["Athletics", "Insight"],
    "clan-crafter": ["History", "Insight"],
    "cloistered-scholar": ["History", "Investigation"],
    courtier: ["Insight", "Persuasion"],
    faceless: ["Deception", "Intimidation"],
    "faction-agent": ["Insight", "Investigation"],
    "far-traveler": ["Insight", "Perception"],
    feylost: ["Deception", "Survival"],
    fisher: ["History", "Survival"],
    "giant-foundling": ["Athletics", "Intimidation"],
    gladiator: ["Athletics", "Performance"],
    "guild-artisan": ["Insight", "Persuasion"],
    "guild-merchant": ["Insight", "Persuasion"],
    "haunted-one": ["Investigation", "Religion"],
    "house-agent": ["Investigation", "Persuasion"],
    inheritor: ["Survival", "Investigation"],
    "investigator-scag": ["Investigation", "Insight"],
    "investigator-vrgr": ["Investigation", "Insight"],
    knight: ["History", "Persuasion"],
    "knight-of-the-order": ["Persuasion", "History"],
    marine: ["Athletics", "Survival"],
    "mercenary-veteran": ["Athletics", "Persuasion"],
    outlander: ["Athletics", "Survival"],
    pirate: ["Athletics", "Perception"],
    rewarded: ["Investigation", "Persuasion"],
    ruined: ["Deception", "Survival"],
    "rune-carver": ["Arcana", "History"],
    shipwright: ["History", "Investigation"],
    smuggler: ["Deception", "Stealth"],
    spy: ["Deception", "Stealth"],
};

/** Origin feat granted by each background (feat id). */
export const BACKGROUND_ORIGIN_FEATS: Record<string, string> = {
    acolyte: "magic-initiate",
    artisan: "crafter",
    charlatan: "skilled",
    criminal: "alert",
    entertainer: "musician",
    farmer: "tough",
    guard: "alert",
    guide: "magic-initiate",
    hermit: "healer",
    merchant: "lucky",
    noble: "skilled",
    sage: "magic-initiate",
    sailor: "tavern-brawler",
    scribe: "skilled",
    soldier: "savage-attacker",
    wayfarer: "lucky",
    "folk-hero": "tough",
    anthropologist: "skilled",
    archaeologist: "skilled",
    athlete: "tavern-brawler",
    "city-watch": "alert",
    "clan-crafter": "crafter",
    "cloistered-scholar": "magic-initiate",
    courtier: "skilled",
    faceless: "skilled",
    "faction-agent": "alert",
    "far-traveler": "musician",
    feylost: "magic-initiate",
    fisher: "tough",
    "giant-foundling": "tough",
    gladiator: "savage-attacker",
    "guild-artisan": "crafter",
    "guild-merchant": "lucky",
    "haunted-one": "alert",
    "house-agent": "skilled",
    inheritor: "lucky",
    "investigator-scag": "alert",
    "investigator-vrgr": "alert",
    knight: "skilled",
    "knight-of-the-order": "savage-attacker",
    marine: "tough",
    "mercenary-veteran": "savage-attacker",
    outlander: "tough",
    pirate: "tavern-brawler",
    rewarded: "lucky",
    ruined: "tough",
    "rune-carver": "crafter",
    shipwright: "crafter",
    smuggler: "lucky",
    spy: "alert",
};

/** Skills a species trait grants as a choice. */
export const KEEN_SENSES_SKILLS = ['Insight', 'Perception', 'Survival'];

/** Traits for a species, with the lineage option folded in (e.g. "Gnomish Lineage (Forest Gnome)"). */
export function getRaceTraits(
    raceId: string,
    elvenLineage?: string,
    race?: { traits?: string[]; lineageOptions?: { trait: string; options: { id: string; name: string }[] } } | null,
    lineageId?: string
): string[] {
    const k = (raceId || '').toLowerCase();
    if (k === 'elf' && elvenLineage) {
        const lineage = (elvenLineage || '').toLowerCase().replace(/\s+/g, '_');
        return ELF_TRAITS_BY_LINEAGE[lineage] ?? RACE_TRAITS.elf;
    }
    const base = race?.traits && race.traits.length > 0 ? [...race.traits] : [...(RACE_TRAITS[k] ?? [])];
    const opt = lineageId && race?.lineageOptions?.options.find(o => o.id === lineageId);
    if (opt && race?.lineageOptions) {
        base.push(`${race.lineageOptions.trait} (${opt.name})`);
    }
    return base;
}

/** Ability options for a background: the API record's `abilityScores`, else the fallback table. */
export function getBackgroundAbilityOptions(backgroundId: string, bg?: { abilityScores?: string[] } | null): string[] {
    if (bg?.abilityScores && bg.abilityScores.length > 0) return bg.abilityScores;
    return BACKGROUND_ABILITIES[(backgroundId || '').toLowerCase()] ?? [];
}

/** @deprecated 2024 backgrounds let the player choose; kept for old callers. Returns {}. */
export function getBackgroundAsi(_backgroundId: string): Record<string, number> {
    return {};
}

/**
 * Validate a 2024 background ability-score assignment: either +2/+1 to two
 * different listed abilities or +1 to all three.
 */
export function isValidBackgroundAsi(asi: Record<string, number> | undefined, options: string[]): boolean {
    if (!asi) return false;
    const entries = Object.entries(asi).filter(([, v]) => v > 0);
    if (entries.some(([k]) => !options.includes(k))) return false;
    const vals = entries.map(([, v]) => v).sort();
    return (vals.length === 2 && vals[0] === 1 && vals[1] === 2) || (vals.length === 3 && vals.every(v => v === 1));
}

export function getBackgroundSkills(backgroundId: string, bg?: { skillProficiencies?: string[] } | null): string[] {
    if (bg?.skillProficiencies && bg.skillProficiencies.length > 0) return bg.skillProficiencies;
    const k = (backgroundId || '').toLowerCase();
    return BACKGROUND_SKILLS[k] ?? [];
}

/** Magic Initiate feat: allowed class lists (2024 PHB: Cleric, Druid, or Wizard). */
export const MAGIC_INITIATE_CLASSES = [
    { id: 'cleric', name: 'Cleric' },
    { id: 'druid', name: 'Druid' },
    { id: 'wizard', name: 'Wizard' }
] as const;

/** Magic Initiate: spellcasting ability choice. */
export const MAGIC_INITIATE_ABILITIES = [
    { id: 'int', name: 'Intelligence' },
    { id: 'wis', name: 'Wisdom' },
    { id: 'cha', name: 'Charisma' }
] as const;

/** Origin feats (2024 PHB). Used for Human Versatile; the API's feat `category` is preferred when present. */
export const ORIGIN_FEAT_IDS = [
    'alert', 'crafter', 'healer', 'lucky', 'magic-initiate', 'musician', 'savage-attacker', 'skilled',
    'tavern-brawler', 'tough'
];

/** All skills for Skillful "choose one" picker. */
export const SKILLS_FOR_SKILLFUL = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
    'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
    'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
    'Sleight of Hand', 'Stealth', 'Survival'
];

/** 2024 Standard Languages: a new character knows Common plus two of these. */
export const STANDARD_LANGUAGES_2024 = [
    'Common Sign Language',
    'Draconic',
    'Dwarvish',
    'Elvish',
    'Giant',
    'Gnomish',
    'Goblin',
    'Halfling',
    'Orc'
];

/** Every language a character can learn later (standard + rare). */
export const STANDARD_LANGUAGES = [
    'Common',
    ...STANDARD_LANGUAGES_2024,
    'Abyssal',
    'Celestial',
    'Deep Speech',
    'Druidic',
    'Infernal',
    'Primordial',
    'Sylvan',
    'Thieves\' Cant',
    'Undercommon',
    'Aarakocra',
    'Auran',
    'Aquan',
    'Ignan',
    'Terran'
];

/** 2024: every character knows Common (species no longer grant fixed languages). */
export function getRaceLanguages(_raceId: string): string[] {
    return ['Common'];
}

/** 2024: Common plus two languages of the player's choice, regardless of species. */
export function getRaceLanguageChoices(_raceId: string): number {
    return 2;
}

/** 2024 backgrounds don't grant languages. */
export function getBackgroundLanguageChoices(_backgroundId: string): number {
    return 0;
}
