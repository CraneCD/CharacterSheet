// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface ClassInfo {
    id: string;
    name: string;
    description: string;
    hitDie: number;
    primaryAbility: string[];
    savingThrows: string[];
    skillChoices: number;
    skillOptions: string[];
    armorProficiencies: string[];
    weaponProficiencies: string[];
    toolProficiencies?: string[];
    /** One line per choice; options are separated by " or ", items within an option by ", ". */
    startingEquipment: string[];
    spellcaster: boolean;
    spellcastingAbility?: string;
    /** Cleric, Druid, Paladin, Ranger, Wizard: prepared list can change on a Long Rest. Bard, Sorcerer, Warlock change spells when they gain a level. */
    preparedCaster?: boolean;
    subclassLevel?: number;
    multiclassPrerequisites?: { [ability: string]: number }; // Fighter needs Str OR Dex 13 (handled in logic)
}

export const classes: ClassInfo[] = [
    {
        "id": "fighter",
        "name": "Fighter",
        "hitDie": 10,
        "description": "A master of all arms and armor, skilled in weapon mastery and combat tactics.",
        "primaryAbility": [
            "str",
            "dex"
        ],
        "savingThrows": [
            "str",
            "con"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Acrobatics",
            "Animal Handling",
            "Athletics",
            "History",
            "Insight",
            "Intimidation",
            "Persuasion",
            "Perception",
            "Survival"
        ],
        "armorProficiencies": [
            "Light armor",
            "Medium armor",
            "Heavy armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Chain Mail, Greatsword, Flail, 8 Javelins, Dungeoneer's Pack, 4 GP or Studded Leather Armor, Scimitar, Shortsword, Longbow, 20 Arrows, Quiver, Dungeoneer's Pack, 11 GP or 155 GP"
        ],
        "spellcaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "str": 13
        }
    },
    {
        "id": "wizard",
        "name": "Wizard",
        "hitDie": 6,
        "description": "A scholarly magic-user who studies arcane secrets recorded in a spellbook.",
        "primaryAbility": [
            "int"
        ],
        "savingThrows": [
            "int",
            "wis"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Arcana",
            "History",
            "Insight",
            "Investigation",
            "Medicine",
            "Nature",
            "Religion"
        ],
        "armorProficiencies": [
            "None"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "2 Daggers, Arcane Focus (Quarterstaff), Robe, Spellbook, Scholar's Pack, 5 GP or 55 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "int",
        "preparedCaster": true,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "int": 13
        }
    },
    {
        "id": "rogue",
        "name": "Rogue",
        "hitDie": 8,
        "description": "A dexterous expert in stealth and subterfuge who strikes where foes are weakest.",
        "primaryAbility": [
            "dex"
        ],
        "savingThrows": [
            "dex",
            "int"
        ],
        "skillChoices": 4,
        "skillOptions": [
            "Acrobatics",
            "Athletics",
            "Deception",
            "Insight",
            "Intimidation",
            "Investigation",
            "Perception",
            "Persuasion",
            "Sleight of Hand",
            "Stealth"
        ],
        "armorProficiencies": [
            "Light armor"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons that have the Finesse or Light property"
        ],
        "toolProficiencies": [
            "Thieves' Tools"
        ],
        "startingEquipment": [
            "Leather Armor, 2 Daggers, Shortsword, Shortbow, 20 Arrows, Quiver, Thieves' Tools, Burglar's Pack, 8 GP or 100 GP"
        ],
        "spellcaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "dex": 13
        }
    },
    {
        "id": "cleric",
        "name": "Cleric",
        "hitDie": 8,
        "description": "A miraculous priest who channels divine magic in service of a god or pantheon.",
        "primaryAbility": [
            "wis"
        ],
        "savingThrows": [
            "wis",
            "cha"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "History",
            "Insight",
            "Medicine",
            "Persuasion",
            "Religion"
        ],
        "armorProficiencies": [
            "Light armor",
            "Medium armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Chain Shirt, Shield, Mace, Holy Symbol, Priest's Pack, 7 GP or 110 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "wis",
        "preparedCaster": true,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "wis": 13
        }
    },
    {
        "id": "ranger",
        "name": "Ranger",
        "hitDie": 10,
        "description": "A wandering warrior imbued with primal magic who hunts threats at the edges of civilization.",
        "primaryAbility": [
            "dex",
            "wis"
        ],
        "savingThrows": [
            "str",
            "dex"
        ],
        "skillChoices": 3,
        "skillOptions": [
            "Animal Handling",
            "Athletics",
            "Insight",
            "Investigation",
            "Nature",
            "Perception",
            "Stealth",
            "Survival"
        ],
        "armorProficiencies": [
            "Light armor",
            "Medium armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Studded Leather Armor, Scimitar, Shortsword, Longbow, 20 Arrows, Quiver, Druidic Focus (sprig of mistletoe), Explorer's Pack, 7 GP or 150 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "wis",
        "preparedCaster": true,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "dex": 13,
            "wis": 13
        }
    },
    {
        "id": "barbarian",
        "name": "Barbarian",
        "hitDie": 12,
        "description": "A fierce warrior of primal power who can channel Rage into devastating strikes.",
        "primaryAbility": [
            "str"
        ],
        "savingThrows": [
            "str",
            "con"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Animal Handling",
            "Athletics",
            "Intimidation",
            "Nature",
            "Perception",
            "Survival"
        ],
        "armorProficiencies": [
            "Light armor",
            "Medium armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Greataxe, 4 Handaxes, Explorer's Pack, 15 GP or 75 GP"
        ],
        "spellcaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "str": 13
        }
    },
    {
        "id": "bard",
        "name": "Bard",
        "hitDie": 8,
        "description": "An inspiring performer whose music and words weave magic.",
        "primaryAbility": [
            "cha"
        ],
        "savingThrows": [
            "dex",
            "cha"
        ],
        "skillChoices": 3,
        "skillOptions": [
            "Acrobatics",
            "Animal Handling",
            "Arcana",
            "Athletics",
            "Deception",
            "History",
            "Insight",
            "Intimidation",
            "Investigation",
            "Medicine",
            "Nature",
            "Perception",
            "Performance",
            "Persuasion",
            "Religion",
            "Sleight of Hand",
            "Stealth",
            "Survival"
        ],
        "armorProficiencies": [
            "Light armor"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [
            "Three Musical Instruments of your choice"
        ],
        "startingEquipment": [
            "Leather Armor, 2 Daggers, Musical Instrument, Entertainer's Pack, 19 GP or 90 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "cha",
        "preparedCaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "cha": 13
        }
    },
    {
        "id": "druid",
        "name": "Druid",
        "hitDie": 8,
        "description": "A nature priest of primal power who can take on the forms of beasts.",
        "primaryAbility": [
            "wis"
        ],
        "savingThrows": [
            "int",
            "wis"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Animal Handling",
            "Arcana",
            "Insight",
            "Medicine",
            "Nature",
            "Perception",
            "Religion",
            "Survival"
        ],
        "armorProficiencies": [
            "Light armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [
            "Herbalism Kit"
        ],
        "startingEquipment": [
            "Leather Armor, Shield, Sickle, Druidic Focus (Quarterstaff), Explorer's Pack, Herbalism Kit, 9 GP or 50 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "wis",
        "preparedCaster": true,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "wis": 13
        }
    },
    {
        "id": "monk",
        "name": "Monk",
        "hitDie": 8,
        "description": "A martial artist who channels a mystic energy called Focus through unarmed strikes and swift movement.",
        "primaryAbility": [
            "dex",
            "wis"
        ],
        "savingThrows": [
            "str",
            "dex"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Acrobatics",
            "Athletics",
            "History",
            "Insight",
            "Religion",
            "Stealth"
        ],
        "armorProficiencies": [
            "None"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons that have the Light property"
        ],
        "toolProficiencies": [
            "One type of Artisan's Tools or Musical Instrument"
        ],
        "startingEquipment": [
            "Spear, 5 Daggers, Artisan's Tools/Musical Instrument (your tool choice), Explorer's Pack, 11 GP or 50 GP"
        ],
        "spellcaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "dex": 13,
            "wis": 13
        }
    },
    {
        "id": "paladin",
        "name": "Paladin",
        "hitDie": 10,
        "description": "A devout warrior bound by a sacred oath, wielding divine magic.",
        "primaryAbility": [
            "str",
            "cha"
        ],
        "savingThrows": [
            "wis",
            "cha"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Athletics",
            "Insight",
            "Intimidation",
            "Medicine",
            "Persuasion",
            "Religion"
        ],
        "armorProficiencies": [
            "Light armor",
            "Medium armor",
            "Heavy armor",
            "Shields"
        ],
        "weaponProficiencies": [
            "Simple weapons",
            "Martial weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Chain Mail, Shield, Longsword, 6 Javelins, Holy Symbol, Priest's Pack, 9 GP or 150 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "cha",
        "preparedCaster": true,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "str": 13,
            "cha": 13
        }
    },
    {
        "id": "sorcerer",
        "name": "Sorcerer",
        "hitDie": 6,
        "description": "A dazzling mage filled with innate magic from a gift, bloodline, or cosmic event.",
        "primaryAbility": [
            "cha"
        ],
        "savingThrows": [
            "con",
            "cha"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Arcana",
            "Deception",
            "Insight",
            "Intimidation",
            "Persuasion",
            "Religion"
        ],
        "armorProficiencies": [
            "None"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Spear, 2 Daggers, Arcane Focus (crystal), Dungeoneer's Pack, 28 GP or 50 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "cha",
        "preparedCaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "cha": 13
        }
    },
    {
        "id": "warlock",
        "name": "Warlock",
        "hitDie": 8,
        "description": "An occultist empowered by a pact with an otherworldly patron.",
        "primaryAbility": [
            "cha"
        ],
        "savingThrows": [
            "wis",
            "cha"
        ],
        "skillChoices": 2,
        "skillOptions": [
            "Arcana",
            "Deception",
            "History",
            "Intimidation",
            "Investigation",
            "Nature",
            "Religion"
        ],
        "armorProficiencies": [
            "Light armor"
        ],
        "weaponProficiencies": [
            "Simple weapons"
        ],
        "toolProficiencies": [],
        "startingEquipment": [
            "Leather Armor, Sickle, 2 Daggers, Arcane Focus (orb), Book (occult lore), Scholar's Pack, 15 GP or 100 GP"
        ],
        "spellcaster": true,
        "spellcastingAbility": "cha",
        "preparedCaster": false,
        "subclassLevel": 3,
        "multiclassPrerequisites": {
            "cha": 13
        }
    }
];
