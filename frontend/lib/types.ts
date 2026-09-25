import type { DerivedStats } from './campaigns';

export interface Spell {
    id: string;
    level: number;
    name: string;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    classes: string[];
    description: string;
    ritual?: boolean;
    source?: string;
    /** Pre-2024 or playtest content kept for existing characters; hidden from pickers. */
    legacy?: boolean;
}

export interface CharacterSpell {
    id: string;
    name: string;
    level: number;
    school: string;
    prepared: boolean;
}

export type ItemCategory = 'armor' | 'weapon' | 'shield' | 'tool' | 'magic-item' | 'potion' | 'scroll' | 'miscellaneous';

export interface CharacterItem {
    /** Present on entries fetched straight from /reference/base-items (not on a character's stored copy). */
    id?: string;
    /** Reference id of the base item this was added from, if any. Used to merge in live admin edits at render time. */
    baseItemId?: string;
    name: string;
    quantity?: number;
    description?: string;
    equipped?: boolean;
    category?: ItemCategory;
    type?: 'armor' | 'weapon' | 'shield' | 'other';
    armorMethod?: 'light' | 'medium' | 'heavy' | 'shield' | 'none'; // logic hint
    baseAC?: number; // for armor/shield
    damage?: string; // "1d8"
    damageType?: string; // "slashing"
    properties?: string[]; // ["finesse", "heavy", "versatile (1d10)", "thrown (range 20/60)"]
    /** 2024 weapon mastery property id (e.g. "sap"). */
    mastery?: string;
    notes?: string;
    isBaseItem?: boolean; // To distinguish base items from custom items
}

export interface HP {
    current: number;
    max: number;
    temp: number;
    /** Death saving throws: successes and failures (0-3 each). Reset when stable or healed. */
    deathSaves?: { successes: number; failures: number };
}

export interface HitDice {
    total: number; // Total number of hit dice available
    spent: number; // Number of hit dice spent (for short rest healing)
    dieType: number; // The die type (6, 8, 10, or 12)
}

export interface ClassResource {
    name: string; // e.g., "Sorcery Points", "Ki Points", "Action Surge"
    current: number; // Current available uses/points
    max: number; // Maximum uses/points
    resetType: 'short' | 'long' | 'none'; // When resource resets
    /** If set, short rest restores this many uses (e.g. 1 for Second Wind) instead of full reset. */
    shortRestRegain?: number;
    description?: string; // Optional description
}

export interface ClassResources {
    [resourceName: string]: ClassResource;
}

export interface Currency {
    cp?: number; // Copper
    sp?: number; // Silver
    ep?: number; // Electrum
    gp?: number; // Gold
    pp?: number; // Platinum
}

export interface CharacterData {
    hp: HP;
    hitDice?: HitDice; // Hit dice tracking
    classResources?: ClassResources; // Class-specific resources (sorcery points, focus points, etc.)
    /** Rules version the stored classResources were derived from (see RESOURCE_RULES_VERSION). */
    classResourcesRules?: string;
    /** Manual AC override; null/missing = calculated from armor and features. */
    ac?: number | null;
    /** Manual base speed override; null/missing = species default. */
    speed?: number | null;
    abilityScores: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
    skills: string[];
    /** Skills with Expertise (double proficiency bonus). */
    expertise?: string[];
    /** Languages known by the character. */
    languages?: string[];
    /** Stored at creation from race; used for Features & Traits display. */
    racialTraits?: string[];
    /** Elf only: chosen lineage (drow, high_elf, wood_elf). */
    elvenLineage?: string;
    /** Chosen species option for species with lineageOptions (e.g. 'red', 'forest_gnome', 'infernal'). Elves also set elvenLineage. */
    speciesLineage?: string;
    /** Chosen size for species that can be Medium or Small. */
    size?: string;
    backgroundId?: string;
    /** 2024 background ability increases actually applied at creation, e.g. { dex: 2, con: 1 }. */
    backgroundAsi?: { [ability: string]: number };
    toolProficiencies?: string[];
    /** Magic Initiate feat: class list (cleric/druid/wizard), ability, and chosen spell IDs. */
    magicInitiate?: {
        class: 'cleric' | 'druid' | 'wizard';
        ability: 'int' | 'wis' | 'cha';
        cantrips: string[];
        spell1: string | null;
    };
    equipment: (string | CharacterItem)[];
    spells: CharacterSpell[];
    spellSlotsUsed?: { [level: number]: number };
    /** Magic Initiate: 1st-level spell uses remaining (1 = available, 0 = used). Resets on long rest. */
    magicInitiateSpell1Used?: number;
    /** Wizard only: spell IDs in the spellbook. Spells can only be prepared if in the spellbook. */
    spellbook?: string[];
    features: CharacterFeature[];
    actions?: CharacterAction[];
    /** Subclass of the primary class; kept for older data. Use `subclasses` (see lib/subclasses.ts). */
    subclassId?: string;
    /** Subclass chosen for each class: { fighter: 'champion', wizard: 'evocation' }. */
    subclasses?: { [classId: string]: string };
    /** Multiclassed Warlocks: Pact Magic slots expended (separate from spellSlotsUsed). */
    pactSlotsUsed?: number;
    currency?: Currency;
    classes?: { [classId: string]: number }; // Multiclass support: { 'fighter': 5, 'wizard': 3 } means Fighter 5 / Wizard 3
    fightingStyles?: string[]; // e.g. ['archery', 'defense'] – IDs from fighting-styles reference
    /** Notes card pages; saved as you type. */
    notepad?: { pages: string[] };
    /** Active conditions by name ("Poisoned", ...); see lib/conditions */
    conditions?: string[];
    /** Exhaustion level 0-6 */
    exhaustion?: number;
    /** Character portrait as data URL (base64 image); null once removed. */
    portrait?: string | null;
    /** AC, passives, ... as the sheet last worked them out, for the DM's party view (lib/campaigns) */
    derivedStats?: DerivedStats;
}

export interface CharacterAction {
    id?: string;
    name: string;
    /** Saved text. For spell actions the sheet shows the current spell text instead (lib/spellActions). */
    description: string;
    type: 'action' | 'bonus' | 'reaction' | 'other';
    /** For "Cast <spell>" actions: the spell they cast. */
    spellId?: string;
}

export interface CharacterFeature {
    id?: string;
    name: string;
    description: string;
    source: string; // e.g. "Racial", "Class", "Background", "Feat"
    level?: number;
    /** Reference id of the feat this was added from, if any. Used to merge in live admin edits at render time. */
    featId?: string;
}

export interface LineageOption {
    id: string;
    name: string;
    description: string;
}

export interface Race {
    id: string;
    name: string;
    description: string;
    size: string;
    speed: number;
    traits: string[];
    languages: string[];
    lineageOptions?: { trait: string; label: string; options: LineageOption[] };
    source?: string;
    legacy?: boolean;
}

export interface ClassInfo {
    id: string;
    name: string;
    description?: string;
    hitDie: number;
    primaryAbility: string[];
    savingThrows: string[];
    armorProficiencies: string[];
    weaponProficiencies: string[];
    startingEquipment: string[];
    skillChoices?: number;
    skillOptions?: string[];
    spellcaster?: boolean;
    spellcastingAbility?: string;
    preparedCaster?: boolean; // Cleric, Druid, Paladin, Ranger, Wizard change prepared spells on a Long Rest
    toolProficiencies?: string[];
    subclassLevel?: number;
    multiclassPrerequisites?: { [ability: string]: number }; // Ability score requirements for multiclassing
}

export interface Background {
    id: string;
    name: string;
    description: string;
    /** 2024: the three abilities this background can raise (+2/+1 or +1/+1/+1). */
    abilityScores?: string[];
    /** Origin feat id granted by the background. */
    originFeat?: string;
    originFeatNote?: string;
    skillProficiencies: string[];
    toolProficiencies?: string[];
    languages?: number;
    /** "items... or 50 GP" lines, same format as class starting equipment. */
    startingEquipment?: string[];
    /** Pre-2024 data only. */
    equipment?: string[];
    /** Pre-2024 data only: fixed increases. */
    abilityScoreIncrease?: { [key: string]: number };
    feature?: {
        name: string;
        description: string;
    };
    source?: string;
    legacy?: boolean;
}

export interface SubclassFeature {
    level: number;
    name: string;
    description: string;
}

export interface Subclass {
    id: string;
    classId: string;
    name: string;
    description: string;
    features: SubclassFeature[];
    /** Always-prepared subclass spells, by class level. */
    spells?: { level: number; spellId: string }[];
    spellcasting?: { spellListClass: string; spellcastingAbility: string; casterLevelDivisor: number };
    source?: string;
    legacy?: boolean;
}

export interface Feat {
    id: string;
    name: string;
    category?: 'origin' | 'general' | 'fighting-style' | 'epic-boon';
    description: string;
    prerequisites?: {
        abilityScore?: { [ability: string]: number };
        abilityScoreAny?: { [ability: string]: number };
        race?: string[];
        class?: string[];
        proficiency?: string[];
        level?: number;
        feature?: string;
    };
    abilityScoreOptions?: string[];
    abilityScoreMax?: number;
    /** Pre-2024 data only. */
    abilityScoreIncrease?: { [ability: string]: number };
    repeatable?: boolean;
    source?: string;
    legacy?: boolean;
}
