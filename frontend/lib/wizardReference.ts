/**
 * Canonical race traits and background ASI/skills for the create wizard.
 * Used as fallback when API data is missing or stale (e.g. old deployment).
 * Keep in sync with backend src/data/races.ts and backgrounds.ts.
 */

/** Elven lineage options (2024 PHB). */
export const ELVEN_LINEAGES = [
    { id: 'drow', name: 'Drow' },
    { id: 'high_elf', name: 'High Elf' },
    { id: 'wood_elf', name: 'Wood Elf' }
] as const;

/** Elven lineage spells by character level (2024 PHB). Level 1 = cantrip, level 3 = 1st-level spell, level 5 = 2nd-level spell. */
export const ELVEN_LINEAGE_SPELLS: Record<string, { level: number; spellId: string }[]> = {
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
    ]
};

/** Subclass bonus spells that are always prepared (2024 PHB). Level = class level when spell is gained. */
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

export const RACE_TRAITS: Record<string, string[]> = {
    human: ['Resourceful', 'Skillful', 'Versatile'],
    elf: ['Darkvision', 'Elven Lineage', 'Fey Ancestry', 'Keen Senses', 'Trance'],
    dwarf: ['Darkvision', 'Dwarven Resilience', 'Dwarven Toughness', 'Stonecunning'],
    halfling: ['Brave', 'Halfling Nimbleness', 'Luck', 'Naturally Stealthy'],
    dragonborn: ['Darkvision', 'Draconic Ancestry', 'Breath Weapon', 'Damage Resistance', 'Draconic Flight'],
    gnome: ['Darkvision', 'Gnomish Cunning', 'Gnomish Lineage'],
    'half-elf': ['Darkvision', 'Fey Ancestry', 'Skill Versatility'],
    'half-orc': ['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks'],
    tiefling: ['Darkvision', 'Fiendish Legacy', 'Hellish Resistance', 'Otherworldly Presence'],
    orc: ['Adrenaline Rush', 'Darkvision', 'Relentless Endurance'],
};

export const BACKGROUND_ASI: Record<string, Record<string, number>> = {
    acolyte: { wis: 2, int: 1 },
    criminal: { dex: 2, cha: 1 },
    'folk-hero': { con: 2, wis: 1 },
    noble: { cha: 2, int: 1 },
    sage: { int: 2, wis: 1 },
    soldier: { str: 2, con: 1 },
    anthropologist: { int: 2, wis: 1 },
    archaeologist: { int: 2, str: 1 },
    athlete: { str: 2, dex: 1 },
    charlatan: { cha: 2, dex: 1 },
    'city-watch': { str: 2, wis: 1 },
    'clan-crafter': { con: 2, int: 1 },
    'cloistered-scholar': { int: 2, wis: 1 },
    courtier: { cha: 2, wis: 1 },
    entertainer: { cha: 2, dex: 1 },
    faceless: { dex: 2, int: 1 },
    'faction-agent': { int: 2, wis: 1 },
    'far-traveler': { wis: 2, dex: 1 },
    feylost: { cha: 2, wis: 1 },
    fisher: { con: 2, wis: 1 },
    'giant-foundling': { str: 2, con: 1 },
    gladiator: { str: 2, cha: 1 },
    'guild-artisan': { int: 2, cha: 1 },
    'guild-merchant': { cha: 2, wis: 1 },
    'haunted-one': { wis: 2, int: 1 },
    hermit: { wis: 2, int: 1 },
    'house-agent': { int: 2, cha: 1 },
    inheritor: { cha: 2, wis: 1 },
    'investigator-scag': { int: 2, wis: 1 },
    'investigator-vrgr': { int: 2, wis: 1 },
    knight: { cha: 2, int: 1 },
    'knight-of-the-order': { cha: 2, str: 1 },
    marine: { str: 2, con: 1 },
    'mercenary-veteran': { str: 2, cha: 1 },
    outlander: { str: 2, wis: 1 },
    pirate: { dex: 2, wis: 1 },
    rewarded: { cha: 2, int: 1 },
    ruined: { cha: 2, wis: 1 },
    'rune-carver': { int: 2, wis: 1 },
    sailor: { dex: 2, wis: 1 },
    shipwright: { int: 2, str: 1 },
    smuggler: { dex: 2, cha: 1 },
    spy: { dex: 2, int: 1 },
    wayfarer: { dex: 2, cha: 1 },
};

export const BACKGROUND_SKILLS: Record<string, string[]> = {
    acolyte: ['Insight', 'Religion'],
    criminal: ['Deception', 'Stealth'],
    'folk-hero': ['Animal Handling', 'Survival'],
    noble: ['History', 'Persuasion'],
    sage: ['Arcana', 'History'],
    soldier: ['Athletics', 'Intimidation'],
    anthropologist: ['Insight', 'Religion'],
    archaeologist: ['History', 'Survival'],
    athlete: ['Athletics', 'Acrobatics'],
    charlatan: ['Deception', 'Sleight of Hand'],
    'city-watch': ['Athletics', 'Insight'],
    'clan-crafter': ['History', 'Insight'],
    'cloistered-scholar': ['History', 'Investigation'],
    courtier: ['Insight', 'Persuasion'],
    entertainer: ['Acrobatics', 'Performance'],
    faceless: ['Deception', 'Intimidation'],
    'faction-agent': ['Insight', 'Investigation'],
    'far-traveler': ['Insight', 'Perception'],
    feylost: ['Deception', 'Survival'],
    fisher: ['History', 'Survival'],
    'giant-foundling': ['Athletics', 'Intimidation'],
    gladiator: ['Athletics', 'Performance'],
    'guild-artisan': ['Insight', 'Persuasion'],
    'guild-merchant': ['Insight', 'Persuasion'],
    'haunted-one': ['Investigation', 'Religion'],
    hermit: ['Medicine', 'Religion'],
    'house-agent': ['Investigation', 'Persuasion'],
    inheritor: ['Survival', 'Investigation'],
    'investigator-scag': ['Investigation', 'Insight'],
    'investigator-vrgr': ['Investigation', 'Insight'],
    knight: ['History', 'Persuasion'],
    'knight-of-the-order': ['Persuasion', 'History'],
    marine: ['Athletics', 'Survival'],
    'mercenary-veteran': ['Athletics', 'Persuasion'],
    outlander: ['Athletics', 'Survival'],
    pirate: ['Athletics', 'Perception'],
    rewarded: ['Investigation', 'Persuasion'],
    ruined: ['Deception', 'Survival'],
    'rune-carver': ['Arcana', 'History'],
    sailor: ['Athletics', 'Perception'],
    shipwright: ['History', 'Investigation'],
    smuggler: ['Deception', 'Stealth'],
    spy: ['Deception', 'Stealth'],
    wayfarer: ['Insight', 'Stealth'],
};

export function getRaceTraits(raceId: string, elvenLineage?: string): string[] {
    const k = (raceId || '').toLowerCase();
    if (k === 'elf' && elvenLineage) {
        const lineage = (elvenLineage || '').toLowerCase().replace(/\s+/g, '_');
        return ELF_TRAITS_BY_LINEAGE[lineage] ?? RACE_TRAITS.elf;
    }
    return RACE_TRAITS[k] ?? [];
}

export function getBackgroundAsi(backgroundId: string): Record<string, number> {
    const k = (backgroundId || '').toLowerCase();
    return BACKGROUND_ASI[k] ?? {};
}

export function getBackgroundSkills(backgroundId: string): string[] {
    const k = (backgroundId || '').toLowerCase();
    return BACKGROUND_SKILLS[k] ?? [];
}

/** Origin feats (1st-level) for Versatile (2024 PHB). Only these appear for human feat pick. IDs from /reference/feats. */
export const ORIGIN_FEAT_IDS = [
    'alert', 'healer', 'lucky', 'magic-initiate', 'savage-attacker', 'skilled',
    'tavern-brawler', 'tough'
];

/** All skills for Skillful "choose one" picker. */
export const SKILLS_FOR_SKILLFUL = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception',
    'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine',
    'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion',
    'Sleight of Hand', 'Stealth', 'Survival'
];

/** Standard D&D languages. */
export const STANDARD_LANGUAGES = [
    'Common',
    'Dwarvish',
    'Elvish',
    'Giant',
    'Gnomish',
    'Goblin',
    'Halfling',
    'Orc',
    'Abyssal',
    'Celestial',
    'Deep Speech',
    'Draconic',
    'Infernal',
    'Primordial',
    'Sylvan',
    'Undercommon',
    'Aarakocra',
    'Auran',
    'Aquan',
    'Ignan',
    'Terran',
    'Thieves\' Cant'
];

/** Race languages (fixed languages from race, excluding "choice" entries). */
export const RACE_LANGUAGES: Record<string, string[]> = {
    human: ['Common'],
    elf: ['Common', 'Elvish'],
    dwarf: ['Common', 'Dwarvish'],
    halfling: ['Common', 'Halfling'],
    dragonborn: ['Common', 'Draconic'],
    gnome: ['Common', 'Gnomish'],
    'half-elf': ['Common', 'Elvish'],
    'half-orc': ['Common', 'Orc'],
    tiefling: ['Common', 'Infernal'],
    orc: ['Common', 'Orc'],
    aarakocra: ['Common', 'Aarakocra', 'Auran'],
};

/** Race language choices (number of "choose one" languages). */
export const RACE_LANGUAGE_CHOICES: Record<string, number> = {
    human: 1,
    'half-elf': 1,
};

/** Background language choices (number of languages granted). */
export const BACKGROUND_LANGUAGE_CHOICES: Record<string, number> = {
    acolyte: 2,
    sage: 2,
    noble: 1,
};

export function getRaceLanguages(raceId: string): string[] {
    const k = (raceId || '').toLowerCase();
    return RACE_LANGUAGES[k] ?? [];
}

export function getRaceLanguageChoices(raceId: string): number {
    const k = (raceId || '').toLowerCase();
    return RACE_LANGUAGE_CHOICES[k] ?? 0;
}

export function getBackgroundLanguageChoices(backgroundId: string): number {
    const k = (backgroundId || '').toLowerCase();
    return BACKGROUND_LANGUAGE_CHOICES[k] ?? 0;
}
