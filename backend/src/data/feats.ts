// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export type FeatCategory = 'origin' | 'general' | 'fighting-style' | 'epic-boon';

export interface FeatPrerequisite {
    /** Every listed score must meet its minimum. */
    abilityScore?: { [ability: string]: number };
    /** At least one listed score must meet its minimum (e.g. "Strength or Dexterity 13+"). */
    abilityScoreAny?: { [ability: string]: number };
    race?: string[];
    /** Character must have a level in one of these classes (used for "Spellcasting" / "Fighting Style" prerequisites). */
    class?: string[];
    /** Armor/shield training required (e.g. "Medium Armor"). */
    proficiency?: string[];
    /** Minimum character level. */
    level?: number;
    /** Human-readable feature requirement (e.g. "Fighting Style", "Spellcasting or Pact Magic"). */
    feature?: string;
}

export interface Feat {
    id: string;
    name: string;
    category: FeatCategory;
    description: string;
    prerequisites?: FeatPrerequisite;
    /** Abilities the feat's +1 Ability Score Increase can go to (the player picks one). */
    abilityScoreOptions?: string[];
    /** Cap for that increase (20 for most feats, 30 for Epic Boons). */
    abilityScoreMax?: number;
    repeatable?: boolean;
    source?: string;
    legacy?: boolean;
}

export const feats: Feat[] = [
    {
        "id": "alert",
        "name": "Alert",
        "category": "origin",
        "description": "You gain the following benefits.\nInitiative Proficiency. When you roll Initiative, you can add your Proficiency Bonus to the roll.\nInitiative Swap. Immediately after you roll Initiative, you can swap your Initiative with the Initiative of one willing ally in the same combat. You can't make this swap if you or the ally has the Incapacitated condition.",
        "source": "SRD 5.2"
    },
    {
        "id": "magic-initiate",
        "name": "Magic Initiate",
        "category": "origin",
        "description": "You gain the following benefits.\nTwo Cantrips. You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability for this feat's spells (choose when you select this feat).\nLevel 1 Spell. Choose a level 1 spell from the same list you selected for this feat's cantrips. You always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have.\nSpell Change. Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the chosen spell list.",
        "source": "SRD 5.2",
        "repeatable": true
    },
    {
        "id": "savage-attacker",
        "name": "Savage Attacker",
        "category": "origin",
        "description": "You've trained to deal particularly damaging strikes. Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll against the target.",
        "source": "SRD 5.2"
    },
    {
        "id": "skilled",
        "name": "Skilled",
        "category": "origin",
        "description": "You gain proficiency in any combination of three skills or tools of your choice.",
        "source": "SRD 5.2",
        "repeatable": true
    },
    {
        "id": "ability-score-improvement",
        "name": "Ability Score Improvement",
        "category": "general",
        "description": "Increase one ability score of your choice by 2, or increase two ability scores of your choice by 1. This feat can't increase an ability score above 20.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 4
        }
    },
    {
        "id": "grappler",
        "name": "Grappler",
        "category": "general",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\nPunch and Grab. When you hit a creature with an Unarmed Strike as part of the Attack action on your turn, you can use both the Damage and the Grapple option. You can use this benefit only once per turn.\nAttack Advantage. You have Advantage on attack rolls against a creature Grappled by you.\nFast Wrestler. You don't have to spend extra movement to move a creature Grappled by you if the creature is your size or smaller.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20
    },
    {
        "id": "archery",
        "name": "Archery",
        "category": "fighting-style",
        "description": "You gain a +2 bonus to attack rolls you make with Ranged weapons.",
        "source": "SRD 5.2",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        }
    },
    {
        "id": "defense",
        "name": "Defense",
        "category": "fighting-style",
        "description": "While you're wearing Light, Medium, or Heavy armor, you gain a +1 bonus to Armor Class.",
        "source": "SRD 5.2",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        }
    },
    {
        "id": "great-weapon-fighting",
        "name": "Great Weapon Fighting",
        "category": "fighting-style",
        "description": "When you roll damage for an attack you make with a Melee weapon that you are holding with two hands, you can treat any 1 or 2 on a damage die as a 3. The weapon must have the Two-Handed or Versatile property to gain this benefit.",
        "source": "SRD 5.2",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        }
    },
    {
        "id": "two-weapon-fighting",
        "name": "Two Weapon Fighting",
        "category": "fighting-style",
        "description": "When you make an extra attack as a result of using a weapon that has the Light property, you can add your ability modifier to the damage of that attack if you aren't already adding it to the damage.",
        "source": "SRD 5.2",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        }
    },
    {
        "id": "boon-of-combat-prowess",
        "name": "Boon of Combat Prowess",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nPeerless Aim. When you miss with an attack roll, you can hit instead. Once you use this benefit, you can't use it again until the start of your next turn.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-dimensional-travel",
        "name": "Boon of Dimensional Travel",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nBlink Steps. Immediately after you take the Attack action or the Magic action, you can teleport up to 30 feet to an unoccupied space you can see.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-fate",
        "name": "Boon of Fate",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nImprove Fate. When you or another creature within 60 feet of you succeeds on or fails a D20 Test, you can roll 2d4 and apply the total rolled as a bonus or penalty to the d20 roll. Once you use this benefit, you can't use it again until you roll Initiative or finish a Short or Long Rest.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-irresistible-offense",
        "name": "Boon of Irresistible Offense",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nOvercome Defenses. The Bludgeoning, Piercing, and Slashing damage you deal always ignores Resistance.\nOverwhelming Strike. When you roll a 20 on the d20 for an attack roll, you can deal extra damage to the target equal to the ability score increased by this feat. The extra damage's type is the same as the attack's type.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-spell-recall",
        "name": "Boon of Spell Recall",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nFree Casting. Whenever you cast a spell with a level 1–4 spell slot, roll 1d4. If the number you roll is the same as the slot's level, the slot isn't expended.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19,
            "feature": "Spellcasting",
            "class": [
                "bard",
                "cleric",
                "druid",
                "paladin",
                "ranger",
                "sorcerer",
                "warlock",
                "wizard"
            ]
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-the-night-spirit",
        "name": "Boon of the Night Spirit",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nMerge with Shadows. While within Dim Light or Darkness, you can give yourself the Invisible condition as a Bonus Action. The condition ends on you immediately after you take an action, a Bonus Action, or a Reaction.\nShadowy form. While within Dim Light or Darkness, you have Resistance to all damage except Psychic and Radiant.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "boon-of-truesight",
        "name": "Boon of Truesight",
        "category": "epic-boon",
        "description": "You gain the following benefits.\nAbility Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\nTruesight. You have Truesight with a range of 60 feet.",
        "source": "SRD 5.2",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30
    },
    {
        "id": "crafter",
        "name": "Crafter",
        "category": "origin",
        "description": "You gain the following benefits.\n- Tool Proficiency. You gain proficiency with three different Artisan's Tools of your choice.\n- Discount. Whenever you buy a nonmagical item, you receive a 20 percent discount on it.\n- Fast Crafting. When you finish a Long Rest, you can craft one piece of gear (such as a ladder, torch, rope or pouch) using a set of Artisan's Tools you are proficient with. The item lasts until you finish another Long Rest.",
        "source": "PHB 2024"
    },
    {
        "id": "healer",
        "name": "Healer",
        "category": "origin",
        "description": "You gain the following benefits.\n- Battle Medic. If you have a Healer's Kit, you can expend one use of it and tend to a creature within 5 feet of yourself as a Utilize action. That creature can expend one of its Hit Point Dice, and you then roll that die. The creature regains Hit Points equal to the roll plus your Proficiency Bonus.\n- Healing Rerolls. Whenever you roll a die to determine the Hit Points you restore with a spell or with this feat's Battle Medic benefit, you can reroll the die if it rolls a 1, and you must use the new roll.",
        "source": "PHB 2024"
    },
    {
        "id": "lucky",
        "name": "Lucky",
        "category": "origin",
        "description": "You gain the following benefits.\n- Luck Points. You have a number of Luck Points equal to your Proficiency Bonus and regain all of them when you finish a Long Rest.\n- Advantage. When you roll a d20 for a D20 Test, you can spend 1 Luck Point to give yourself Advantage on the roll.\n- Disadvantage. When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to impose Disadvantage on that roll.",
        "source": "PHB 2024"
    },
    {
        "id": "musician",
        "name": "Musician",
        "category": "origin",
        "description": "You gain the following benefits.\n- Instrument Training. You gain proficiency with three Musical Instruments of your choice.\n- Encouraging Song. As you finish a Short or Long Rest, you can play a song on a Musical Instrument you are proficient with and give Heroic Inspiration to allies who hear the song. The number of allies you can affect equals your Proficiency Bonus.",
        "source": "PHB 2024"
    },
    {
        "id": "tavern-brawler",
        "name": "Tavern Brawler",
        "category": "origin",
        "description": "You gain the following benefits.\n- Enhanced Unarmed Strike. When you hit with your Unarmed Strike and deal damage, you can deal Bludgeoning damage equal to 1d4 plus your Strength modifier instead of the normal damage.\n- Damage Rerolls. Whenever you roll a damage die for your Unarmed Strike, you can reroll it if it rolls a 1, and you must use the new roll.\n- Improvised Weaponry. You have proficiency with improvised weapons.\n- Push. When you hit a creature with an Unarmed Strike as part of the Attack action on your turn, you can deal damage and also push the target 5 feet away from you. You can use this benefit only once per turn.",
        "source": "PHB 2024"
    },
    {
        "id": "tough",
        "name": "Tough",
        "category": "origin",
        "description": "Your Hit Point maximum increases by an amount equal to twice your character level when you gain this feat. Whenever you gain a character level thereafter, your Hit Point maximum increases by an additional 2 Hit Points.",
        "source": "PHB 2024"
    },
    {
        "id": "actor",
        "name": "Actor",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "cha": 13
            }
        },
        "abilityScoreOptions": [
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Charisma score by 1, to a maximum of 20.\n- Impersonation. While you're disguised as a real or fictional person, you have Advantage on Charisma (Deception or Performance) checks to convince others that you are that person.\n- Mimicry. You can mimic the sounds of other creatures, including speech. A creature that hears the mimicry must succeed on a Wisdom (Insight) check (DC 8 plus your Charisma modifier and Proficiency Bonus) to determine the effect is faked.",
        "source": "PHB 2024"
    },
    {
        "id": "athlete",
        "name": "Athlete",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "str": 13,
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Climb Speed. You gain a Climb Speed equal to your Speed.\n- Hop Up. When you have the Prone condition, you can right yourself with only 5 feet of movement.\n- Jumping. You can make a running Long or High Jump after moving only 5 feet.",
        "source": "PHB 2024"
    },
    {
        "id": "charger",
        "name": "Charger",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "str": 13,
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Improved Dash. When you take the Dash action, your Speed increases by 10 feet for that action.\n- Charge Attack. If you move at least 10 feet in a straight line toward a target immediately before hitting it with a melee attack roll as part of the Attack action, choose one: gain a 1d8 bonus to the attack's damage roll, or push the target up to 10 feet away if it is no more than one size larger than you. You can use this benefit only once on each of your turns.",
        "source": "PHB 2024"
    },
    {
        "id": "chef",
        "name": "Chef",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "con",
            "wis"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Constitution or Wisdom score by 1, to a maximum of 20.\n- Cook's Utensils. You gain proficiency with Cook's Utensils if you don't already have it.\n- Replenishing Meal. As part of a Short Rest, you can cook special food if you have ingredients and Cook's Utensils. You can prepare enough for a number of creatures equal to 4 plus your Proficiency Bonus. At the end of the Short Rest, any creature who eats the food and spends one or more Hit Point Dice regains an extra 1d8 Hit Points.\n- Bolstering Treats. With 1 hour of work or when you finish a Long Rest, you can cook a number of treats equal to your Proficiency Bonus. A creature can use a Bonus Action to eat one and gain Temporary Hit Points equal to your Proficiency Bonus. The treats go stale 8 hours after they are made.",
        "source": "PHB 2024"
    },
    {
        "id": "crossbow-expert",
        "name": "Crossbow Expert",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity score by 1, to a maximum of 20.\n- Ignore Loading. You ignore the Loading property of the Hand Crossbow, Heavy Crossbow, and Light Crossbow (all called crossbows elsewhere in this feat). If you're holding one of them, you can load a piece of ammunition into it even if you lack a free hand.\n- Firing in Melee. Being within 5 feet of an enemy doesn't impose Disadvantage on your attack rolls with crossbows.\n- Dual Wielding. When you make the extra attack of the Light property, you can add your ability modifier to the damage of the extra attack if that attack is with a crossbow that has the Light property and you aren't already adding that modifier to the damage.",
        "source": "PHB 2024"
    },
    {
        "id": "crusher",
        "name": "Crusher",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "con"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Constitution score by 1, to a maximum of 20.\n- Push. Once per turn, when you hit a creature with an attack that deals Bludgeoning damage, you can move it 5 feet to an unoccupied space if the target is no more than one size larger than you.\n- Enhanced Critical. When you score a Critical Hit that deals Bludgeoning damage to a creature, attack rolls against that creature have Advantage until the start of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "defensive-duelist",
        "name": "Defensive Duelist",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity score by 1, to a maximum of 20.\n- Parry. If you're holding a Finesse weapon and another creature hits you with a melee attack, you can take a Reaction to add your Proficiency Bonus to your Armor Class, potentially causing the attack to miss you. You gain this bonus to your AC against melee attacks until the start of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "dual-wielder",
        "name": "Dual Wielder",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "str": 13,
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Enhanced Dual Wielding. When you take the Attack action on your turn and attack with a weapon that has the Light property, you can make one extra attack as a Bonus Action later on the same turn with a different Melee weapon, which can't have the Two-Handed property. You don't add your ability modifier to the extra attack's damage unless that modifier is negative.\n- Quick Draw. You can draw or stow two weapons that lack the Two-Handed property when you would normally be able to draw or stow only one.",
        "source": "PHB 2024"
    },
    {
        "id": "durable",
        "name": "Durable",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "con"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Constitution score by 1, to a maximum of 20.\n- Defy Death. You have Advantage on Death Saving Throws.\n- Speedy Recovery. As a Bonus Action, you can expend one of your Hit Point Dice, roll the die, and regain a number of Hit Points equal to the roll.",
        "source": "PHB 2024"
    },
    {
        "id": "elemental-adept",
        "name": "Elemental Adept",
        "category": "general",
        "repeatable": true,
        "prerequisites": {
            "level": 4,
            "feature": "Spellcasting or Pact Magic",
            "class": [
                "bard",
                "cleric",
                "druid",
                "paladin",
                "ranger",
                "sorcerer",
                "warlock",
                "wizard"
            ]
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Energy Mastery. Choose one of the following damage types: Acid, Cold, Fire, Lightning, or Thunder. Spells you cast ignore Resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.\n- Repeatable. You can take this feat more than once, but you must choose a different damage type each time.",
        "source": "PHB 2024"
    },
    {
        "id": "fey-touched",
        "name": "Fey Touched",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Fey Magic. Choose one level 1 spell from the Divination or Enchantment school of magic. You always have that spell and the Misty Step spell prepared. You can cast each of these spells without expending a spell slot. Once you cast either spell in this way, you can't cast that spell in this way again until you finish a Long Rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat.",
        "source": "PHB 2024"
    },
    {
        "id": "great-weapon-master",
        "name": "Great Weapon Master",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "str": 13
            }
        },
        "abilityScoreOptions": [
            "str"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength score by 1, to a maximum of 20.\n- Heavy Weapon Mastery. When you hit a creature with a weapon that has the Heavy property as part of the Attack action on your turn, you can cause the weapon to deal extra damage to the target. The extra damage equals your Proficiency Bonus.\n- Hew. Immediately after you score a Critical Hit with a Melee weapon or reduce a creature to 0 Hit Points with one, you can make one attack with the same weapon as a Bonus Action.",
        "source": "PHB 2024"
    },
    {
        "id": "heavily-armored",
        "name": "Heavily Armored",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "proficiency": [
                "Medium Armor"
            ]
        },
        "abilityScoreOptions": [
            "con",
            "str"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Constitution or Strength score by 1, to a maximum of 20.\n- Armor Training. You gain training with Heavy armor.",
        "source": "PHB 2024"
    },
    {
        "id": "heavy-armor-master",
        "name": "Heavy Armor Master",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "proficiency": [
                "Heavy Armor"
            ]
        },
        "abilityScoreOptions": [
            "con",
            "str"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Constitution or Strength score by 1, to a maximum of 20.\n- Damage Reduction. When you're hit by an attack while you're wearing Heavy armor, any Bludgeoning, Piercing, and Slashing damage dealt to you by that attack is reduced by an amount equal to your Proficiency Bonus.",
        "source": "PHB 2024"
    },
    {
        "id": "inspiring-leader",
        "name": "Inspiring Leader",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "wis": 13,
                "cha": 13
            }
        },
        "abilityScoreOptions": [
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Wisdom or Charisma score by 1, to a maximum of 20.\n- Bolstering Performance. When you finish a Short or Long Rest, you can give an inspiring performance. Choose up to six allies (which can include yourself) within 30 feet of yourself who witness the performance. The chosen creatures each gain Temporary Hit Points equal to your character level plus the modifier of the ability you increased with this feat.",
        "source": "PHB 2024"
    },
    {
        "id": "keen-mind",
        "name": "Keen Mind",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "int": 13
            }
        },
        "abilityScoreOptions": [
            "int"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence score by 1, to a maximum of 20.\n- Lore Knowledge. Choose one of the following skills: Arcana, History, Investigation, Nature, or Religion. If you lack proficiency in the chosen skill, you gain proficiency in it, and if you already have proficiency in it, you gain Expertise in it.\n- Quick Study. You can take the Study action as a Bonus Action.",
        "source": "PHB 2024"
    },
    {
        "id": "lightly-armored",
        "name": "Lightly Armored",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Armor Training. You gain training with Light armor and Shields.",
        "source": "PHB 2024"
    },
    {
        "id": "mage-slayer",
        "name": "Mage Slayer",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Concentration Breaker. When you damage a creature that is concentrating, it has Disadvantage on the saving throw it makes to maintain Concentration.\n- Guarded Mind. If you fail an Intelligence, a Wisdom, or a Charisma saving throw, you can cause yourself to succeed instead. Once you use this benefit, you can't use it again until you finish a Short or Long Rest.",
        "source": "PHB 2024"
    },
    {
        "id": "martial-weapon-training",
        "name": "Martial Weapon Training",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Weapon Proficiency. You gain proficiency with Martial weapons.",
        "source": "PHB 2024"
    },
    {
        "id": "medium-armor-master",
        "name": "Medium Armor Master",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "proficiency": [
                "Medium Armor"
            ]
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Dexterous Wearer. While you're wearing Medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity score of 16 or higher.",
        "source": "PHB 2024"
    },
    {
        "id": "moderately-armored",
        "name": "Moderately Armored",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "proficiency": [
                "Light Armor"
            ]
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Armor Training. You gain training with Medium armor.",
        "source": "PHB 2024"
    },
    {
        "id": "mounted-combatant",
        "name": "Mounted Combatant",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "wis"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength, Dexterity, or Wisdom score by 1, to a maximum of 20.\n- Mounted Strike. While mounted, you have Advantage on attack rolls against any unmounted creature within 5 feet of your mount that is at least one size smaller than the mount.\n- Leap Aside. If your mount is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw and only half damage if it fails. For your mount to gain this benefit, you must be riding it, and neither of you can have the Incapacitated condition.\n- Veer. While mounted, you can force an attack that hits your mount to hit you instead if you don't have the Incapacitated condition.",
        "source": "PHB 2024"
    },
    {
        "id": "observant",
        "name": "Observant",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "int": 13,
                "wis": 13
            }
        },
        "abilityScoreOptions": [
            "int",
            "wis"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence or Wisdom score by 1, to a maximum of 20.\n- Keen Observer. Choose one of the following skills: Insight, Investigation, or Perception. If you lack proficiency with the chosen skill, you gain proficiency in it, and if you already have proficiency in it, you gain Expertise in it.\n- Quick Search. You can take the Search action as a Bonus Action.",
        "source": "PHB 2024"
    },
    {
        "id": "piercer",
        "name": "Piercer",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Puncture. Once per turn, when you hit a creature with an attack that deals Piercing damage, you can reroll one of the attack's damage dice, and you must use the new roll.\n- Enhanced Critical. When you score a Critical Hit that deals Piercing damage to a creature, you can roll one additional damage die when determining the extra Piercing damage the target takes.",
        "source": "PHB 2024"
    },
    {
        "id": "poisoner",
        "name": "Poisoner",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "dex",
            "int"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity or Intelligence score by 1, to a maximum of 20.\n- Potent Poison. When you make a damage roll that deals Poison damage, it ignores Resistance to Poison damage.\n- Brew Poison. You gain proficiency with the Poisoner's Kit. With 1 hour of work using such a kit and expending 50 GP worth of materials, you can create a number of poison doses equal to your Proficiency Bonus. As a Bonus Action, you can apply a dose to a weapon or piece of ammunition. Once applied, the poison retains its potency for 1 minute or until you deal damage with the poisoned item. When a creature takes damage from the poisoned item, it must succeed on a Constitution saving throw (DC 8 plus the modifier of the ability increased by this feat and your Proficiency Bonus) or take 2d8 Poison damage and have the Poisoned condition until the end of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "polearm-master",
        "name": "Polearm Master",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "str": 13,
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Pole Strike. Immediately after you take the Attack action and attack with a Quarterstaff, a Spear, or a weapon that has the Heavy and Reach properties, you can use a Bonus Action to make a melee attack with the opposite end of the weapon. The weapon deals Bludgeoning damage, and the weapon's damage die for this attack is a d4.\n- Reactive Strike. While you're holding a Quarterstaff, a Spear, or a weapon that has the Heavy and Reach properties, you can take a Reaction to make one melee attack against a creature that enters the reach you have with that weapon.",
        "source": "PHB 2024"
    },
    {
        "id": "resilient",
        "name": "Resilient",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Choose one ability in which you lack saving throw proficiency. Increase the chosen ability score by 1, to a maximum of 20.\n- Saving Throw Proficiency. You gain saving throw proficiency with the chosen ability.",
        "source": "PHB 2024"
    },
    {
        "id": "ritual-caster",
        "name": "Ritual Caster",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "int": 13,
                "wis": 13,
                "cha": 13
            }
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Ritual Spells. Choose a number of level 1 spells equal to your Proficiency Bonus that have the Ritual tag. You always have those spells prepared, and you can cast them with any spell slots you have. The spells' spellcasting ability is the ability increased by this feat. Whenever your Proficiency Bonus increases thereafter, you can add an additional level 1 spell with the Ritual tag to the spells always prepared with this feature.\n- Quick Ritual. With this benefit, you can cast a Ritual spell that you have prepared using its regular casting time rather than the extended time for a Ritual. Doing so doesn't require a spell slot. Once you cast the spell in this way, you can't use this benefit again until you finish a Long Rest.",
        "source": "PHB 2024"
    },
    {
        "id": "sentinel",
        "name": "Sentinel",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "str": 13,
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Guardian. Immediately after a creature within 5 feet of you takes the Disengage action or hits a target other than you with an attack, you can make an Opportunity Attack against that creature.\n- Halt. When you hit a creature with an Opportunity Attack, the creature's Speed becomes 0 for the rest of the current turn.",
        "source": "PHB 2024"
    },
    {
        "id": "shadow-touched",
        "name": "Shadow Touched",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Shadow Magic. Choose one level 1 spell from the Illusion or Necromancy school of magic. You always have that spell and the Invisibility spell prepared. You can cast each of these spells without expending a spell slot. Once you cast either spell in this way, you can't cast that spell in this way again until you finish a Long Rest. You can also cast these spells using spell slots you have of the appropriate level. The spells' spellcasting ability is the ability increased by this feat.",
        "source": "PHB 2024"
    },
    {
        "id": "sharpshooter",
        "name": "Sharpshooter",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity score by 1, to a maximum of 20.\n- Bypass Cover. Your ranged attacks with weapons ignore Half Cover and Three-Quarters Cover.\n- Firing in Melee. Being within 5 feet of an enemy doesn't impose Disadvantage on your attack rolls with Ranged weapons.\n- Long Shots. Attacking at long range doesn't impose Disadvantage on your attack rolls with Ranged weapons.",
        "source": "PHB 2024"
    },
    {
        "id": "shield-master",
        "name": "Shield Master",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "proficiency": [
                "Shields"
            ]
        },
        "abilityScoreOptions": [
            "str"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength score by 1, to a maximum of 20.\n- Shield Bash. If you attack a creature within 5 feet of you as part of the Attack action and hit it with a Melee weapon, you can immediately bash the target with your Shield if it's equipped, forcing the target to make a Strength saving throw (DC 8 plus your Strength modifier and Proficiency Bonus). On a failed save, you either push the target 5 feet from you or cause it to have the Prone condition (your choice). You can use this benefit only once on each of your turns.\n- Interpose Shield. If you're subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can take a Reaction to take no damage if you succeed on the saving throw and are holding a Shield.",
        "source": "PHB 2024"
    },
    {
        "id": "skill-expert",
        "name": "Skill Expert",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 20.\n- Skill Proficiency. You gain proficiency in one skill of your choice.\n- Expertise. Choose one skill in which you have proficiency but lack Expertise. You gain Expertise with that skill.",
        "source": "PHB 2024"
    },
    {
        "id": "skulker",
        "name": "Skulker",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScore": {
                "dex": 13
            }
        },
        "abilityScoreOptions": [
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity score by 1, to a maximum of 20.\n- Blindsight. You have Blindsight with a range of 10 feet.\n- Fog of War. You exploit the distractions of battle, gaining Advantage on any Dexterity (Stealth) check you make as part of the Hide action during combat.\n- Sniper. If you make an attack roll while hidden and the roll misses, making the attack roll doesn't reveal your location.",
        "source": "PHB 2024"
    },
    {
        "id": "slasher",
        "name": "Slasher",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Hamstring. Once per turn when you hit a creature with an attack that deals Slashing damage, you can reduce the Speed of that creature by 10 feet until the start of your next turn.\n- Enhanced Critical. When you score a Critical Hit that deals Slashing damage to a creature, it has Disadvantage on attack rolls until the start of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "speedy",
        "name": "Speedy",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "abilityScoreAny": {
                "dex": 13,
                "con": 13
            }
        },
        "abilityScoreOptions": [
            "dex",
            "con"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Dexterity or Constitution score by 1, to a maximum of 20.\n- Speed Increase. Your Speed increases by 10 feet.\n- Dash over Difficult Terrain. When you take the Dash action on your turn, Difficult Terrain doesn't cost you extra movement for the rest of that turn.\n- Agile Movement. Opportunity Attacks have Disadvantage against you.",
        "source": "PHB 2024"
    },
    {
        "id": "spell-sniper",
        "name": "Spell Sniper",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "feature": "Spellcasting or Pact Magic",
            "class": [
                "bard",
                "cleric",
                "druid",
                "paladin",
                "ranger",
                "sorcerer",
                "warlock",
                "wizard"
            ]
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Bypass Cover. Your attack rolls for spells ignore Half Cover and Three-Quarters Cover.\n- Casting in Melee. Being within 5 feet of an enemy doesn't impose Disadvantage on your attack rolls with spells.\n- Increased Range. When you cast a spell that has a range of at least 10 feet and requires you to make an attack roll, you can increase the spell's range by 60 feet.",
        "source": "PHB 2024"
    },
    {
        "id": "telekinetic",
        "name": "Telekinetic",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Minor Telekinesis. You learn the Mage Hand spell. You can cast it without Verbal or Somatic components, you can make the spectral hand Invisible, and its range and the distance it can be away from you both increase by 30 feet when you cast it. The spell's spellcasting ability is the ability increased by this feat.\n- Telekinetic Shove. As a Bonus Action, you can telekinetically shove one creature you can see within 30 feet of yourself. When you do so, the target must succeed on a Strength saving throw (DC 8 plus the ability modifier of the score increased by this feat and your Proficiency Bonus) or be moved 5 feet toward or away from you.",
        "source": "PHB 2024"
    },
    {
        "id": "telepathic",
        "name": "Telepathic",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Telepathic Utterance. You can speak telepathically to any creature you can see within 60 feet of yourself. Your telepathic utterances are in a language you know, and the creature understands you only if it knows that language. Your communication doesn't give the creature the ability to respond to you telepathically.\n- Detect Thoughts. You always have the Detect Thoughts spell prepared. You can cast it without a spell slot or spell components, and you must finish a Long Rest before you can cast it in this way again. You can also cast it using spell slots you have of the appropriate level. Your spellcasting ability for the spell is the ability increased by this feat.",
        "source": "PHB 2024"
    },
    {
        "id": "war-caster",
        "name": "War Caster",
        "category": "general",
        "prerequisites": {
            "level": 4,
            "feature": "Spellcasting or Pact Magic",
            "class": [
                "bard",
                "cleric",
                "druid",
                "paladin",
                "ranger",
                "sorcerer",
                "warlock",
                "wizard"
            ]
        },
        "abilityScoreOptions": [
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Intelligence, Wisdom, or Charisma score by 1, to a maximum of 20.\n- Concentration. You have Advantage on Constitution saving throws that you make to maintain Concentration.\n- Reactive Spell. When a creature provokes an Opportunity Attack from you by leaving your reach, you can take a Reaction to cast a spell at the creature rather than making an Opportunity Attack. The spell must have a casting time of one action and must target only that creature.\n- Somatic Components. You can perform the Somatic components of spells even when you have weapons or a Shield in one or both hands.",
        "source": "PHB 2024"
    },
    {
        "id": "weapon-master",
        "name": "Weapon Master",
        "category": "general",
        "prerequisites": {
            "level": 4
        },
        "abilityScoreOptions": [
            "str",
            "dex"
        ],
        "abilityScoreMax": 20,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- Mastery Property. Your training with weapons allows you to use the mastery property of one kind of Simple or Martial weapon of your choice, provided you have proficiency with it. Whenever you finish a Long Rest, you can change the kind of weapon to another eligible kind.",
        "source": "PHB 2024"
    },
    {
        "id": "blind-fighting",
        "name": "Blind Fighting",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "You have Blindsight with a range of 10 feet.",
        "source": "PHB 2024"
    },
    {
        "id": "dueling",
        "name": "Dueling",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "When you're holding a Melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.",
        "source": "PHB 2024"
    },
    {
        "id": "interception",
        "name": "Interception",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "When a creature you can see hits another creature within 5 feet of you with an attack roll, you can take a Reaction to reduce the damage dealt to the target by 1d10 plus your Proficiency Bonus. You must be holding a Shield or a Simple or Martial weapon to use this Reaction.",
        "source": "PHB 2024"
    },
    {
        "id": "protection",
        "name": "Protection",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "When a creature you can see attacks a target other than you that is within 5 feet of you, you can take a Reaction to interpose your Shield if you're holding one. You impose Disadvantage on the triggering attack roll and all other attack rolls against the target until the start of your next turn if you remain within 5 feet of the target.",
        "source": "PHB 2024"
    },
    {
        "id": "thrown-weapon-fighting",
        "name": "Thrown Weapon Fighting",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "When you hit with a ranged attack roll using a weapon that has the Thrown property, you gain a +2 bonus to the damage roll.",
        "source": "PHB 2024"
    },
    {
        "id": "unarmed-fighting",
        "name": "Unarmed Fighting",
        "category": "fighting-style",
        "prerequisites": {
            "feature": "Fighting Style",
            "class": [
                "fighter",
                "paladin",
                "ranger"
            ]
        },
        "description": "When you hit with your Unarmed Strike and deal damage, you can deal Bludgeoning damage equal to 1d6 plus your Strength modifier instead of the normal damage of an Unarmed Strike. If you aren't holding any weapons or a Shield when you make the attack roll, the d6 becomes a d8. At the start of each of your turns, you can deal 1d4 Bludgeoning damage to one creature Grappled by you.",
        "source": "PHB 2024"
    },
    {
        "id": "boon-of-energy-resistance",
        "name": "Boon of Energy Resistance",
        "category": "epic-boon",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\n- Energy Resistances. You gain Resistance to two of the following damage types of your choice: Acid, Cold, Fire, Lightning, Necrotic, Poison, Psychic, Radiant, or Thunder. Whenever you finish a Long Rest, you can change your choices.\n- Energy Redirection. When you take damage of one of the types chosen for this feat, you can take a Reaction to direct damage of the same type toward another creature you can see within 60 feet of yourself that isn't behind Total Cover. That creature must succeed on a Dexterity saving throw (DC 8 plus your Constitution modifier and Proficiency Bonus) or take damage equal to 2d12 plus your Constitution modifier.",
        "source": "PHB 2024"
    },
    {
        "id": "boon-of-fortitude",
        "name": "Boon of Fortitude",
        "category": "epic-boon",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\n- Fortified Health. Your Hit Point maximum increases by 40. In addition, whenever you regain Hit Points, you can regain additional Hit Points equal to your Constitution modifier. Once you've regained these additional Hit Points, you can't do so again until the start of your next turn.",
        "source": "PHB 2024"
    },
    {
        "id": "boon-of-recovery",
        "name": "Boon of Recovery",
        "category": "epic-boon",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\n- Last Stand. When you would be reduced to 0 Hit Points, you can drop to 1 Hit Point instead and regain a number of Hit Points equal to half your Hit Point maximum. Once you use this benefit, you can't use it again until you finish a Long Rest.\n- Recover Vitality. You have a pool of ten d10s. As a Bonus Action, you can expend dice from the pool, roll them, and regain a number of Hit Points equal to the roll's total. You regain all the expended dice when you finish a Long Rest.",
        "source": "PHB 2024"
    },
    {
        "id": "boon-of-skill",
        "name": "Boon of Skill",
        "category": "epic-boon",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\n- All-Around Adept. You gain proficiency in all skills.\n- Expertise. Choose one skill in which you lack Expertise. You gain Expertise in that skill.",
        "source": "PHB 2024"
    },
    {
        "id": "boon-of-speed",
        "name": "Boon of Speed",
        "category": "epic-boon",
        "prerequisites": {
            "level": 19
        },
        "abilityScoreOptions": [
            "str",
            "dex",
            "con",
            "int",
            "wis",
            "cha"
        ],
        "abilityScoreMax": 30,
        "description": "You gain the following benefits.\n- Ability Score Increase. Increase one ability score of your choice by 1, to a maximum of 30.\n- Escape Artist. As a Bonus Action, you can take the Disengage action, which also ends the Grappled condition on you.\n- Quickness. Your Speed increases by 30 feet.",
        "source": "PHB 2024"
    },
    {
        "id": "dungeon-delver",
        "name": "Dungeon Delver",
        "description": "Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n- You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n- You have advantage on saving throws made to avoid or resist traps.\n- You have resistance to the damage dealt by traps.\n- You can search for traps while traveling at a normal pace, instead of only at a slow pace.",
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "category": "general"
    },
    {
        "id": "linguist",
        "name": "Linguist",
        "description": "You have studied languages and codes, gaining the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You learn three languages of your choice.\n- You can ably create written ciphers. Others can't decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic.",
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "category": "general"
    },
    {
        "id": "martial-adept",
        "name": "Martial Adept",
        "description": "You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:\n- You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver's effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).\n- You gain one superiority die, which is a d6. This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.",
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "category": "general"
    },
    {
        "id": "mobile",
        "name": "Mobile",
        "description": "You are exceptionally speedy and agile. You gain the following benefits:\n- Your speed increases by 10 feet.\n- When you use the Dash action, difficult terrain doesn't slow your movement that turn.\n- When you make a melee attack against a creature, you don't provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.",
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "category": "general"
    }
];
