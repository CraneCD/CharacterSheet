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
}

export interface CharacterSpell {
    id: string;
    name: string;
    level: number;
    school: string;
    prepared: boolean;
}

export type ItemCategory = 'armor' | 'weapon' | 'shield' | 'magic-item' | 'potion' | 'scroll' | 'miscellaneous';

export interface CharacterItem {
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
    properties?: string[]; // ["finesse", "heavy"]
    notes?: string;
    isBaseItem?: boolean; // To distinguish base items from custom items
}

export interface HP {
    current: number;
    max: number;
    temp: number;
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
    classResources?: ClassResources; // Class-specific resources (sorcery points, ki, etc.)
    ac?: number; // Optional - if not set, will be calculated
    speed?: number; // Optional - if not set, will use race default
    abilityScores: {
        str: number;
        dex: number;
        con: number;
        int: number;
        wis: number;
        cha: number;
    };
    skills: string[];
    equipment: (string | CharacterItem)[];
    spells: CharacterSpell[];
    spellSlotsUsed?: { [level: number]: number };
    features: CharacterFeature[];
    actions?: CharacterAction[];
    subclassId?: string;
    currency?: Currency;
    classes?: { [classId: string]: number }; // Multiclass support: { 'fighter': 5, 'wizard': 3 } means Fighter 5 / Wizard 3
    fightingStyles?: string[]; // e.g. ['archery', 'defense'] – IDs from fighting-styles reference
}

export interface CharacterAction {
    id?: string;
    name: string;
    description: string;
    type: 'action' | 'bonus' | 'reaction' | 'other';
}

export interface CharacterFeature {
    id?: string;
    name: string;
    description: string;
    source: string; // e.g. "Racial", "Class", "Background", "Feat"
    level?: number;
}

export interface Race {
    id: string;
    name: string;
    description: string;
    abilityScoreIncrease: { [key: string]: number };
    size: string;
    speed: number;
    traits: string[];
    languages: string[];
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
    preparedCaster?: boolean; // If true, class knows all spells and prepares a subset each day (Cleric, Druid, Paladin, Ranger)
    subclassLevel?: number;
    multiclassPrerequisites?: { [ability: string]: number }; // Ability score requirements for multiclassing
}

export interface Background {
    id: string;
    name: string;
    description: string;
    skillProficiencies: string[];
    toolProficiencies?: string[];
    languages?: number;
    equipment?: string[];
    feature: {
        name: string;
        description: string;
    };
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
}
