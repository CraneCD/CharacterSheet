// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface SubclassFeature {
    level: number;
    name: string;
    description: string;
}

export interface SubclassSpell {
    /** Class level at which the spell becomes always prepared. */
    level: number;
    spellId: string;
}

/** Spellcasting granted by subclass (e.g. Arcane Trickster, Eldritch Knight). */
export interface SubclassSpellcasting {
    spellListClass: string;  // e.g. 'wizard' - which class's spell list to use
    spellcastingAbility: string;  // e.g. 'int'
    casterLevelDivisor: number;  // 3 for third casters
}

export interface Subclass {
    id: string;
    classId: string;
    name: string;
    description: string;
    features: SubclassFeature[];
    /** Always-prepared subclass spells. */
    spells?: SubclassSpell[];
    /** If set, this subclass grants spellcasting to a non-spellcasting base class. */
    spellcasting?: SubclassSpellcasting;
    source?: string;
    legacy?: boolean;
}

export const subclasses: Subclass[] = [
    {
        "id": "berserker",
        "classId": "barbarian",
        "name": "Path of the Berserker",
        "description": "Barbarians who walk the Path of the Berserker direct their Rage primarily toward violence, thrilling in the chaos of battle.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Frenzy",
                "description": "If you use Reckless Attack while your Rage is active, you deal extra damage to the first target you hit on your turn with a Strength-based attack. To determine the extra damage, roll a number of d6s equal to your Rage Damage bonus, and add them together. The damage has the same type as the weapon or Unarmed Strike used for the attack."
            },
            {
                "level": 6,
                "name": "Mindless Rage",
                "description": "You have Immunity to the Charmed and Frightened conditions while your Rage is active. If you're Charmed or Frightened when you enter your Rage, the condition ends on you."
            },
            {
                "level": 10,
                "name": "Retaliation",
                "description": "When you take damage from a creature that is within 5 feet of you, you can take a Reaction to make one melee attack against that creature, using a weapon or an Unarmed Strike."
            },
            {
                "level": 14,
                "name": "Intimidating Presence",
                "description": "As a Bonus Action, you can strike terror into others with your menacing presence and primal power.\nWhen you do so, each creature of your choice in a 30-foot Emanation originating from you must make a Wisdom saving throw (DC 8 plus your Strength modifier and Proficiency Bonus). On a failed save, a creature has the Frightened condition for 1 minute. At the end of each of the Frightened creature's turns, the creature repeats the save, ending the effect on itself on a success.\nOnce you use this feature, you can't use it again until you finish a Long Rest unless you expend a use of your Rage (no action required) to restore your use of it."
            }
        ]
    },
    {
        "id": "wild_heart",
        "classId": "barbarian",
        "name": "Path of the Wild Heart",
        "description": "Barbarians of the Wild Heart view themselves as kin to animals and draw on their power when they Rage.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Animal Speaker",
                "description": "You can cast Beast Sense and Speak with Animals, but only as Rituals. Wisdom is your spellcasting ability for them."
            },
            {
                "level": 3,
                "name": "Rage of the Wilds",
                "description": "Whenever you activate your Rage, choose one option: Bear (Resistance to every damage type except Force, Necrotic, Psychic, and Radiant while raging), Eagle (when you activate the Rage you can take the Disengage and Dash actions as part of that Bonus Action, and on later turns you can take both as a Bonus Action), or Wolf (while raging, your allies have Advantage on attack rolls against enemies within 5 feet of you)."
            },
            {
                "level": 6,
                "name": "Aspect of the Wilds",
                "description": "Choose one option, changeable when you finish a Long Rest: Owl (Darkvision 60 feet, or +60 feet if you already have it), Panther (Climb Speed equal to your Speed), or Salmon (Swim Speed equal to your Speed)."
            },
            {
                "level": 10,
                "name": "Nature Speaker",
                "description": "You can cast Commune with Nature, but only as a Ritual. Wisdom is your spellcasting ability for it."
            },
            {
                "level": 14,
                "name": "Power of the Wilds",
                "description": "Whenever you activate your Rage, choose one option: Falcon (Fly Speed equal to your Speed while raging if you aren't wearing armor), Lion (while raging, enemies within 5 feet of you have Disadvantage on attack rolls against targets other than you or another Barbarian with this option), or Ram (while raging, when you hit a Large or smaller creature with a melee attack you can cause it to have the Prone condition)."
            }
        ]
    },
    {
        "id": "world_tree",
        "classId": "barbarian",
        "name": "Path of the World Tree",
        "description": "Barbarians of the World Tree connect with the cosmic tree Yggdrasil through their Rage, drawing on its vitality and its roots that span the planes.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Vitality of the Tree",
                "description": "Vitality Surge: when you activate your Rage, you gain Temporary Hit Points equal to your Barbarian level. Life-Giving Force: at the start of each of your turns while raging, you can choose another creature within 10 feet of you to gain Temporary Hit Points equal to a number of d6s equal to your Rage Damage bonus; they vanish when your Rage ends."
            },
            {
                "level": 6,
                "name": "Branches of the Tree",
                "description": "Whenever a creature you can see starts its turn within 30 feet of you while your Rage is active, you can take a Reaction to summon spectral branches. The target must succeed on a Strength saving throw (DC 8 + Strength modifier + Proficiency Bonus) or be teleported to an unoccupied space within 5 feet of you (or the nearest one), and its Speed becomes 0 until the end of the current turn."
            },
            {
                "level": 10,
                "name": "Battering Roots",
                "description": "During your turn, your reach is 10 feet greater with any Melee weapon that has the Heavy or Versatile property. When you hit with such a weapon on your turn, you can activate the Push or Topple mastery property in addition to a different mastery property you're using with that weapon."
            },
            {
                "level": 14,
                "name": "Travel along the Tree",
                "description": "When you activate your Rage and as a Bonus Action while raging, you can teleport up to 60 feet to an unoccupied space you can see. In addition, once per Rage, you can increase the range to 150 feet and bring up to six willing creatures within 10 feet of you, who arrive within 10 feet of your destination."
            }
        ]
    },
    {
        "id": "zealot",
        "classId": "barbarian",
        "name": "Path of the Zealot",
        "description": "Barbarians who walk the Path of the Zealot receive boons from a god or pantheon and channel them into zealous fury.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Divine Fury",
                "description": "On each of your turns while your Rage is active, the first creature you hit with a weapon or an Unarmed Strike takes extra damage equal to 1d6 plus half your Barbarian level (round down). The extra damage is Necrotic or Radiant (your choice each time)."
            },
            {
                "level": 3,
                "name": "Warrior of the Gods",
                "description": "You have a pool of d12s (four at level 3, five at level 6, six at level 12, seven at level 17) that you can spend to heal yourself. As a Bonus Action, expend dice from the pool, roll them, and regain Hit Points equal to the total. You regain all expended dice when you finish a Long Rest."
            },
            {
                "level": 6,
                "name": "Fanatical Focus",
                "description": "Once per active Rage, if you fail a saving throw, you can reroll it with a bonus equal to your Rage Damage bonus, and you must use the new roll."
            },
            {
                "level": 10,
                "name": "Zealous Presence",
                "description": "As a Bonus Action, you unleash a battle cry. Up to ten other creatures of your choice within 60 feet of you gain Advantage on attack rolls and saving throws until the start of your next turn. Once you use this feature, you can't use it again until you finish a Long Rest unless you expend a use of your Rage (no action required) to restore it."
            },
            {
                "level": 14,
                "name": "Rage of the Gods",
                "description": "When you activate your Rage, you can assume the form of a divine warrior for 1 minute or until you drop to 0 Hit Points. You gain a Fly Speed equal to your Speed and can hover, you have Resistance to Necrotic, Psychic, and Radiant damage, and when a creature within 30 feet of you would drop to 0 Hit Points, you can take a Reaction to expend a use of Rage and instead change its Hit Points to a number equal to your Barbarian level. Once you assume this form, you can't do so again until you finish a Long Rest."
            }
        ]
    },
    {
        "id": "dance",
        "classId": "bard",
        "name": "College of Dance",
        "description": "Bards of the College of Dance know that the Words of Creation can't be contained in speech or song alone; they channel magic through movement.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Dazzling Footwork",
                "description": "While you aren't wearing armor or wielding a Shield: you have Advantage on Charisma (Performance) checks that involve dancing; your base Armor Class equals 10 + your Dexterity and Charisma modifiers; when you expend a use of Bardic Inspiration as part of an action, Bonus Action, or Reaction, you can make one Unarmed Strike as part of it; and your Unarmed Strikes can use Dexterity for attack rolls and deal Bludgeoning damage equal to your Bardic Inspiration die plus your Dexterity modifier."
            },
            {
                "level": 6,
                "name": "Inspiring Movement",
                "description": "When an enemy you can see ends its turn within 5 feet of you, you can take a Reaction and expend one use of Bardic Inspiration to move up to half your Speed. One ally within 30 feet of you can then also move up to half its Speed using its Reaction. None of this movement provokes Opportunity Attacks."
            },
            {
                "level": 6,
                "name": "Tandem Footwork",
                "description": "When you roll Initiative, you can expend one use of Bardic Inspiration if you don't have the Incapacitated condition. Roll the die; you and each ally within 30 feet of you who can see or hear you gain a bonus to Initiative equal to the roll."
            },
            {
                "level": 14,
                "name": "Leading Evasion",
                "description": "When you are subjected to an effect that allows a Dexterity saving throw for half damage, you take no damage on a success and half damage on a failure. If any creatures within 5 feet of you make the same saving throw, they share this benefit. You can't use this feature if you have the Incapacitated condition."
            }
        ]
    },
    {
        "id": "glamour",
        "classId": "bard",
        "name": "College of Glamour",
        "description": "The College of Glamour traces its origins to the beguiling magic of the Feywild.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Beguiling Magic",
                "description": "You always have Charm Person and Mirror Image prepared. Immediately after you cast an Enchantment or Illusion spell using a spell slot, you can force a creature you can see within 60 feet of you to make a Wisdom saving throw against your spell save DC; on a failure it has the Charmed or Frightened condition (your choice) for 1 minute, repeating the save at the end of each of its turns. Once used, you can't use this benefit again until you finish a Long Rest, unless you expend a use of Bardic Inspiration to restore it."
            },
            {
                "level": 3,
                "name": "Mantle of Inspiration",
                "description": "As a Bonus Action, you can expend a use of Bardic Inspiration and roll the die. Choose a number of creatures within 60 feet of you, up to your Charisma modifier (minimum of one). Each gains Temporary Hit Points equal to two times the number rolled, and can immediately use its Reaction to move up to its Speed without provoking Opportunity Attacks."
            },
            {
                "level": 6,
                "name": "Mantle of Majesty",
                "description": "You always have Command prepared. As a Bonus Action, you cast Command without expending a spell slot and take on an unearthly appearance for 1 minute or until your Concentration ends. During this time, you can cast Command as a Bonus Action without expending a spell slot. Once used, you can't use this feature again until you finish a Long Rest unless you expend a level 3+ spell slot to restore it."
            },
            {
                "level": 14,
                "name": "Unbreakable Majesty",
                "description": "As a Bonus Action, you can assume a magically majestic presence for 1 minute or until you have the Incapacitated condition. During that time, whenever any creature hits you with an attack roll for the first time on a turn, the attacker must succeed on a Charisma saving throw against your spell save DC, or the attack misses instead. Once you assume this presence, you can't do so again until you finish a Short or Long Rest."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "charm-person"
            },
            {
                "level": 3,
                "spellId": "mirror-image"
            },
            {
                "level": 6,
                "spellId": "command"
            }
        ]
    },
    {
        "id": "lore",
        "classId": "bard",
        "name": "College of Lore",
        "description": "Bards of the College of Lore collect spells and secrets from diverse sources such as scholarly tomes, mystical rites, and peasant tales.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Bonus Proficiencies",
                "description": "You gain proficiency with three skills of your choice."
            },
            {
                "level": 3,
                "name": "Cutting Words",
                "description": "You learn to use your wit to supernaturally distract, confuse, and otherwise sap the confidence and competence of others. When a creature that you can see within 60 feet of yourself makes a damage roll or succeeds on an ability check or attack roll, you can take a Reaction to expend one use of your Bardic Inspiration; roll your Bardic Inspiration die, and subtract the number rolled from the creature's roll, reducing the damage or potentially turning the success into a failure."
            },
            {
                "level": 6,
                "name": "Magical Discoveries",
                "description": "You learn two spells of your choice. These spells can come from the Cleric, Druid, or Wizard spell list or any combination thereof (see a class's section for its spell list). A spell you choose must be a cantrip or a spell for which you have spell slots, as shown in the Bard Features table.\nYou always have the chosen spells prepared, and whenever you gain a Bard level, you can replace one of the spells with another spell that meets these requirements."
            },
            {
                "level": 14,
                "name": "Peerless Skill",
                "description": "When you make an ability check or attack roll and fail, you can expend one use of Bardic Inspiration; roll the Bardic Inspiration die, and add the number rolled to the d20, potentially turning a failure into a success. On a failure, the Bardic Inspiration isn't expended."
            }
        ]
    },
    {
        "id": "valor",
        "classId": "bard",
        "name": "College of Valor",
        "description": "Bards of the College of Valor are daring skalds whose tales keep alive the memory of the great heroes of the past.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Combat Inspiration",
                "description": "A creature that has one of your Bardic Inspiration dice can use it in either of the following ways: Defense (when hit by an attack roll, it can use its Reaction to roll the die and add the number to its AC against that attack, potentially causing a miss), or Offense (immediately after hitting a target with an attack roll, it can roll the die and add the number to the attack's damage)."
            },
            {
                "level": 3,
                "name": "Martial Training",
                "description": "You gain proficiency with Martial weapons and training with Medium armor and Shields. In addition, you can use a Simple or Martial weapon as a Spellcasting Focus for your Bard spells."
            },
            {
                "level": 6,
                "name": "Extra Attack",
                "description": "You can attack twice instead of once whenever you take the Attack action on your turn. In addition, you can cast one of your cantrips that has a casting time of an action in place of one of those attacks."
            },
            {
                "level": 14,
                "name": "Battle Magic",
                "description": "After you cast a spell that has a casting time of an action, you can make one attack with a weapon as a Bonus Action."
            }
        ]
    },
    {
        "id": "life",
        "classId": "cleric",
        "name": "Life Domain",
        "description": "The Life Domain focuses on the positive energy that helps sustain all life in the multiverse.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Disciple of Life",
                "description": "When a spell you cast with a spell slot restores Hit Points to a creature, that creature regains additional Hit Points on the turn you cast the spell. The additional Hit Points equal 2 plus the spell slot's level."
            },
            {
                "level": 3,
                "name": "Life Domain Spells",
                "description": "When you reach a Cleric level listed below, you thereafter always have the listed spells prepared.\nCleric level 3: Aid, Bless, Cure Wounds, Lesser Restoration\nCleric level 5: Mass Healing Word, Revivify\nCleric level 7: Aura of Life, Death Ward\nCleric level 9: Greater Restoration, Mass Cure Wounds"
            },
            {
                "level": 3,
                "name": "Preserve Life",
                "description": "As a Magic action, you present your Holy Symbol and expend a use of your Channel Divinity to evoke healing energy that can restore a number of Hit Points equal to five times your Cleric level. Choose Bloodied creatures within 30 feet of yourself (which can include you), and divide those Hit Points among them. This feature can restore a creature to no more than half its Hit Point maximum."
            },
            {
                "level": 6,
                "name": "Blessed Healer",
                "description": "The healing spells you cast on others heal you as well. Immediately after you cast a spell with a spell slot that restores Hit Points to one or more creatures other than yourself, you regain Hit Points equal to 2 plus the spell slot's level."
            },
            {
                "level": 17,
                "name": "Supreme Healing",
                "description": "When you would normally roll one or more dice to restore Hit Points to a creature with a spell or Channel Divinity, don't roll those dice for the healing; instead use the highest number possible for each die. For example, instead of restoring 2d6 Hit Points to a creature with a spell, you restore 12."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "aid"
            },
            {
                "level": 3,
                "spellId": "bless"
            },
            {
                "level": 3,
                "spellId": "cure-wounds"
            },
            {
                "level": 3,
                "spellId": "lesser-restoration"
            },
            {
                "level": 5,
                "spellId": "mass-healing-word"
            },
            {
                "level": 5,
                "spellId": "revivify"
            },
            {
                "level": 7,
                "spellId": "aura-of-life"
            },
            {
                "level": 7,
                "spellId": "death-ward"
            },
            {
                "level": 9,
                "spellId": "greater-restoration"
            },
            {
                "level": 9,
                "spellId": "mass-cure-wounds"
            }
        ]
    },
    {
        "id": "light",
        "classId": "cleric",
        "name": "Light Domain",
        "description": "The Light Domain emphasizes the divine power to bring about blazing fire and revelation.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Light Domain Spells",
                "description": "When you reach a Cleric level listed below, you thereafter always have the listed spells prepared.\nCleric level 3: Burning Hands, Faerie Fire, Scorching Ray, See Invisibility\nCleric level 5: Daylight, Fireball\nCleric level 7: Arcane Eye, Wall of Fire\nCleric level 9: Flame Strike, Scrying"
            },
            {
                "level": 3,
                "name": "Radiance of the Dawn",
                "description": "As a Magic action, you present your Holy Symbol and expend a use of Channel Divinity to emit a flash of light in a 30-foot Emanation. Any magical Darkness in that area is dispelled, and each creature of your choice in the area must make a Constitution saving throw, taking Radiant damage equal to 2d10 plus your Cleric level on a failed save or half as much on a successful one."
            },
            {
                "level": 3,
                "name": "Warding Flare",
                "description": "When a creature you can see within 30 feet of yourself makes an attack roll, you can take a Reaction to impose Disadvantage on that attack roll. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), regaining all uses when you finish a Long Rest."
            },
            {
                "level": 6,
                "name": "Improved Warding Flare",
                "description": "You regain all expended uses of Warding Flare when you finish a Short or Long Rest. Whenever you use Warding Flare, you can give the target of the triggering attack Temporary Hit Points equal to 2d6 plus your Wisdom modifier."
            },
            {
                "level": 17,
                "name": "Corona of Light",
                "description": "As a Magic action, you cause yourself to emit an aura of sunlight that lasts for 1 minute or until you dismiss it, shedding Bright Light in a 60-foot radius and Dim Light for an additional 30 feet. Your enemies in the Bright Light have Disadvantage on saving throws against your Radiance of the Dawn and any spell that deals Fire or Radiant damage. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a Long Rest."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "burning-hands"
            },
            {
                "level": 3,
                "spellId": "faerie-fire"
            },
            {
                "level": 3,
                "spellId": "scorching-ray"
            },
            {
                "level": 3,
                "spellId": "see-invisibility"
            },
            {
                "level": 5,
                "spellId": "daylight"
            },
            {
                "level": 5,
                "spellId": "fireball"
            },
            {
                "level": 7,
                "spellId": "arcane-eye"
            },
            {
                "level": 7,
                "spellId": "wall-of-fire"
            },
            {
                "level": 9,
                "spellId": "flame-strike"
            },
            {
                "level": 9,
                "spellId": "scrying"
            }
        ]
    },
    {
        "id": "trickery",
        "classId": "cleric",
        "name": "Trickery Domain",
        "description": "The Trickery Domain offers magic of deception, illusion, and stealth.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Trickery Domain Spells",
                "description": "When you reach a Cleric level listed below, you thereafter always have the listed spells prepared.\nCleric level 3: Charm Person, Disguise Self, Invisibility, Pass without Trace\nCleric level 5: Hypnotic Pattern, Nondetection\nCleric level 7: Confusion, Dimension Door\nCleric level 9: Dominate Person, Modify Memory"
            },
            {
                "level": 3,
                "name": "Blessing of the Trickster",
                "description": "As a Magic action, you can choose yourself or a willing creature within 30 feet of yourself to have Advantage on Dexterity (Stealth) checks. This blessing lasts until you finish a Long Rest or you use this feature again."
            },
            {
                "level": 3,
                "name": "Invoke Duplicity",
                "description": "As a Bonus Action, you can expend one use of Channel Divinity to create a perfect visual illusion of yourself in an unoccupied space you can see within 30 feet of yourself. It lasts for 1 minute; you can move it up to 30 feet as a Bonus Action. You can cast spells as though you were in the illusion's space, and when both you and your illusion are within 5 feet of a creature that can see the illusion, you have Advantage on attack rolls against that creature."
            },
            {
                "level": 6,
                "name": "Trickster's Transposition",
                "description": "Whenever you take the Bonus Action to create or move the illusion of your Invoke Duplicity, you can teleport, swapping places with the illusion."
            },
            {
                "level": 17,
                "name": "Improved Duplicity",
                "description": "The illusion of your Invoke Duplicity grows more powerful: whenever you or your allies make an attack roll against a creature within 5 feet of the illusion, the attack roll has Advantage, and when the illusion ends, you or a creature of your choice within 5 feet of it regains Hit Points equal to your Cleric level."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "charm-person"
            },
            {
                "level": 3,
                "spellId": "disguise-self"
            },
            {
                "level": 3,
                "spellId": "invisibility"
            },
            {
                "level": 3,
                "spellId": "pass-without-trace"
            },
            {
                "level": 5,
                "spellId": "hypnotic-pattern"
            },
            {
                "level": 5,
                "spellId": "nondetection"
            },
            {
                "level": 7,
                "spellId": "confusion"
            },
            {
                "level": 7,
                "spellId": "dimension-door"
            },
            {
                "level": 9,
                "spellId": "dominate-person"
            },
            {
                "level": 9,
                "spellId": "modify-memory"
            }
        ]
    },
    {
        "id": "war",
        "classId": "cleric",
        "name": "War Domain",
        "description": "War has many manifestations; the War Domain grants the power to inspire valor and smite foes.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "War Domain Spells",
                "description": "When you reach a Cleric level listed below, you thereafter always have the listed spells prepared.\nCleric level 3: Guiding Bolt, Magic Weapon, Shield of Faith, Spiritual Weapon\nCleric level 5: Crusader's Mantle, Spirit Guardians\nCleric level 7: Fire Shield, Freedom of Movement\nCleric level 9: Hold Monster, Steel Wind Strike"
            },
            {
                "level": 3,
                "name": "Guided Strike",
                "description": "When you or a creature within 30 feet of you misses with an attack roll, you can expend one use of Channel Divinity and give that roll a +10 bonus, potentially causing it to hit. When you use this feature to benefit another creature's attack roll, you must take a Reaction to do so."
            },
            {
                "level": 3,
                "name": "War Priest",
                "description": "As a Bonus Action, you can make one attack with a weapon or an Unarmed Strike. You can use this Bonus Action a number of times equal to your Wisdom modifier (minimum of once), regaining all expended uses when you finish a Short or Long Rest."
            },
            {
                "level": 6,
                "name": "War God's Blessing",
                "description": "You can expend a use of your Channel Divinity to cast Shield of Faith or Spiritual Weapon rather than expending a spell slot. When you cast either spell in this way, the spell doesn't require Concentration and lasts for 1 minute."
            },
            {
                "level": 17,
                "name": "Avatar of Battle",
                "description": "You gain Resistance to Bludgeoning, Piercing, and Slashing damage."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "guiding-bolt"
            },
            {
                "level": 3,
                "spellId": "magic-weapon"
            },
            {
                "level": 3,
                "spellId": "shield-of-faith"
            },
            {
                "level": 3,
                "spellId": "spiritual-weapon"
            },
            {
                "level": 5,
                "spellId": "crusaders-mantle"
            },
            {
                "level": 5,
                "spellId": "spirit-guardians"
            },
            {
                "level": 7,
                "spellId": "fire-shield"
            },
            {
                "level": 7,
                "spellId": "freedom-of-movement"
            },
            {
                "level": 9,
                "spellId": "hold-monster"
            },
            {
                "level": 9,
                "spellId": "steel-wind-strike"
            }
        ]
    },
    {
        "id": "land",
        "classId": "druid",
        "name": "Circle of the Land",
        "description": "The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Circle of the Land Spells Whenever you finish a Long Rest, choose one type of land: arid, polar, temperate, or tropical. Consult the table below that corresponds to the chosen type; you have the spells listed for your Druid level and lower prepared.",
                "description": "Arid Land\nDruid Level Circle Spells\n3 Blur, Burning Hands, Fire Bolt\n5 Fireball\n7 Blight\n9 Wall of Stone\nPolar Land\nDruid Level Circle Spells\n3 Fog Cloud, Hold Person, Ray of Frost\n5 Sleet Storm\n7 Ice Storm\n9 Cone of Cold\nTemperate Land\nDruid Level Circle Spells\n3 Misty Step, Shocking Grasp, Sleep\n5 Lightning Bolt\n7 Freedom of Movement\n9 Tree Stride\nTropical Land\nDruid Level Circle Spells\n3 Acid Splash, Ray of Sickness, Web\n5 Stinking Cloud\n7 Polymorph\n9 Insect Plague"
            },
            {
                "level": 3,
                "name": "Land's Aid",
                "description": "As a Magic action, you can expend a use of your Wild Shape and choose a point within 60 feet of yourself. Vitality-giving flowers and life-draining thorns appear for a moment in a 10-foot-radius Sphere centered on that point. Each creature of your choice in the Sphere must make a Constitution saving throw against your spell save DC, taking 2d6 Necrotic damage on a failed save or half as much damage on a successful one. One creature of your choice in that area regains 2d6 Hit Points.\nThe damage and healing increase by 1d6 when you reach Druid levels 10 (3d6) and 14 (4d6)."
            },
            {
                "level": 6,
                "name": "Natural Recovery",
                "description": "You can cast one of the level 1+ spells that you have prepared from your Circle Spells feature without expending a spell slot, and you must finish a Long Rest before you do so again.\nIn addition, when you finish a Short Rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your Druid level (round up), and none of them can be level 6+. For example, if you're a level 6 Druid, you can recover up to three levels' worth of spell slots. You can recover a level 3 spell slot, a level 2 and a level 1 spell slot, or three level 1 spell slots. Once you recover spell slots with this feature, you can't do so again until you finish a Long Rest."
            },
            {
                "level": 10,
                "name": "Nature's Ward",
                "description": "You are immune to the Poisoned condition, and you have Resistance to a damage type associated with your current land choice in the Circle Spells feature, as shown in the Nature's Ward table.\nNature's Ward\nLand Type Resistance\nArid Fire\nPolar Cold\nLand Type Resistance\nTemperate Lightning\nTropical Poison"
            },
            {
                "level": 14,
                "name": "Nature's Sanctuary",
                "description": "As a Magic action, you can expend a use of your Wild Shape and cause spectral trees and vines to appear in a 15-foot Cube on the ground within 120 feet of yourself. They last there for 1 minute or until you have the Incapacitated condition or die. You and your allies have Half Cover while in that area, and your allies gain the current Resistance of your Nature's Ward while there.\nAs a Bonus Action, you can move the Cube up to 60 feet to ground within 120 feet of yourself."
            }
        ]
    },
    {
        "id": "moon",
        "classId": "druid",
        "name": "Circle of the Moon",
        "description": "Druids of the Circle of the Moon draw on lunar magic to transform themselves.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Circle Forms",
                "description": "When you use Wild Shape, you can transform into a Beast with a Challenge Rating as high as your Druid level divided by 3 (round down). While in a Wild Shape form, your AC equals 13 plus your Wisdom modifier if that total is higher than the Beast's AC, and you gain Temporary Hit Points equal to three times your Druid level."
            },
            {
                "level": 3,
                "name": "Circle of the Moon Spells",
                "description": "You always have your Circle of the Moon spells prepared, and you can cast them while you're in a Wild Shape form."
            },
            {
                "level": 6,
                "name": "Improved Circle Forms",
                "description": "While in a Wild Shape form, each of your attacks can deal Radiant damage instead of its normal type, and you can add your Wisdom modifier to your Constitution saving throws."
            },
            {
                "level": 10,
                "name": "Moonlight Step",
                "description": "As a Bonus Action, you magically teleport up to 30 feet to an unoccupied space you can see, and you have Advantage on the next attack roll you make before the end of this turn. You can use this feature a number of times equal to your Wisdom modifier (minimum of once), regaining all expended uses when you finish a Long Rest. You can also regain uses by expending a level 2+ spell slot for each use."
            },
            {
                "level": 14,
                "name": "Lunar Form",
                "description": "Once per turn while in a Wild Shape form, you can deal an extra 2d10 Radiant damage to a target you hit with a Wild Shape attack. In addition, when you use Moonlight Step, you can also teleport one willing creature within 10 feet of you to an unoccupied space within 10 feet of your destination."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "cure-wounds"
            },
            {
                "level": 3,
                "spellId": "moonbeam"
            },
            {
                "level": 3,
                "spellId": "starry-wisp"
            },
            {
                "level": 5,
                "spellId": "conjure-animals"
            },
            {
                "level": 7,
                "spellId": "fount-of-moonlight"
            },
            {
                "level": 9,
                "spellId": "mass-cure-wounds"
            }
        ]
    },
    {
        "id": "sea",
        "classId": "druid",
        "name": "Circle of the Sea",
        "description": "Druids of the Circle of the Sea draw on the tempestuous forces of oceans and storms.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Circle of the Sea Spells",
                "description": "When you reach a Druid level listed below, you thereafter always have the listed spells prepared.\nDruid level 3: Fog Cloud, Gust of Wind, Ray of Frost, Shatter, Thunderwave\nDruid level 5: Lightning Bolt, Water Breathing\nDruid level 7: Control Water, Ice Storm\nDruid level 9: Conjure Elemental, Hold Monster"
            },
            {
                "level": 3,
                "name": "Wrath of the Sea",
                "description": "As a Bonus Action, you can expend a use of Wild Shape to manifest a 5-foot Emanation of ocean spray around yourself for 10 minutes. When you manifest it and as a Bonus Action on later turns, you can choose another creature you can see in the Emanation; it must succeed on a Constitution saving throw against your spell save DC or take Cold damage equal to a number of d6s equal to your Wisdom modifier (minimum of one) and, if Large or smaller, be pushed up to 15 feet away from you."
            },
            {
                "level": 6,
                "name": "Aquatic Affinity",
                "description": "The size of the Emanation created by your Wrath of the Sea increases to 10 feet, and you gain a Swim Speed equal to your Speed."
            },
            {
                "level": 10,
                "name": "Stormborn",
                "description": "While your Wrath of the Sea is active, you have a Fly Speed equal to your Speed and Resistance to Cold, Lightning, and Thunder damage."
            },
            {
                "level": 14,
                "name": "Oceanic Gift",
                "description": "Instead of manifesting the Emanation of Wrath of the Sea around yourself, you can manifest it around one willing creature within 60 feet of yourself, which gains all its benefits and uses your spell save DC and Wisdom modifier. You can also manifest it around both yourself and that creature by expending two uses of Wild Shape."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "fog-cloud"
            },
            {
                "level": 3,
                "spellId": "gust-of-wind"
            },
            {
                "level": 3,
                "spellId": "ray-of-frost"
            },
            {
                "level": 3,
                "spellId": "shatter"
            },
            {
                "level": 3,
                "spellId": "thunderwave"
            },
            {
                "level": 5,
                "spellId": "lightning-bolt"
            },
            {
                "level": 5,
                "spellId": "water-breathing"
            },
            {
                "level": 7,
                "spellId": "control-water"
            },
            {
                "level": 7,
                "spellId": "ice-storm"
            },
            {
                "level": 9,
                "spellId": "conjure-elemental"
            },
            {
                "level": 9,
                "spellId": "hold-monster"
            }
        ]
    },
    {
        "id": "stars",
        "classId": "druid",
        "name": "Circle of the Stars",
        "description": "The Circle of the Stars has tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Star Map",
                "description": "You've created a star chart as part of your heavenly studies; it is a Spellcasting Focus for you. While holding it, you have the Guidance and Guiding Bolt spells prepared, and you can cast Guiding Bolt without expending a spell slot a number of times equal to your Wisdom modifier (minimum of once), regaining all uses when you finish a Long Rest."
            },
            {
                "level": 3,
                "name": "Starry Form",
                "description": "As a Bonus Action, you can expend a use of Wild Shape to take on a starry form for 10 minutes instead of transforming into a beast. Choose a constellation: Archer (when you activate the form and as a Bonus Action on later turns, make a ranged spell attack dealing 1d8 plus your Wisdom modifier Radiant damage), Chalice (whenever you cast a spell with a spell slot that restores Hit Points, you or another creature within 30 feet regains an extra 1d8 plus your Wisdom modifier), or Dragon (when you make an Intelligence or Wisdom check or a Constitution save to maintain Concentration, you can treat a roll of 9 or lower on the d20 as a 10)."
            },
            {
                "level": 6,
                "name": "Cosmic Omen",
                "description": "Whenever you finish a Long Rest, you can consult your Star Map for omens and roll a die. Until your next Long Rest, you gain Weal (even) or Woe (odd). When a creature you can see within 30 feet of you is about to succeed or fail a D20 Test, you can take a Reaction to roll a d6 and add it to (Weal) or subtract it from (Woe) the roll. You can use this Reaction a number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a Long Rest."
            },
            {
                "level": 10,
                "name": "Twinkling Constellations",
                "description": "The 1d8 of the Archer and Chalice becomes 2d8, and while the Dragon is active you have a Fly Speed of 20 feet and can hover. At the start of each of your turns while in your Starry Form, you can change which constellation glimmers on your body."
            },
            {
                "level": 14,
                "name": "Full of Stars",
                "description": "While in your Starry Form, you become partially incorporeal, giving you Resistance to Bludgeoning, Piercing, and Slashing damage."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "guidance"
            },
            {
                "level": 3,
                "spellId": "guiding-bolt"
            }
        ]
    },
    {
        "id": "battle_master",
        "classId": "fighter",
        "name": "Battle Master",
        "description": "Battle Masters are students of the art of battle, learning martial techniques passed down through generations.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Combat Superiority",
                "description": "You learn three maneuvers of your choice (such as Ambush, Bait and Switch, Commander's Strike, Commanding Presence, Disarming Attack, Distracting Strike, Evasive Footwork, Feinting Attack, Goading Attack, Lunging Attack, Maneuvering Attack, Menacing Attack, Parry, Precision Attack, Pushing Attack, Rally, Riposte, Sweeping Attack, Tactical Assessment, Trip Attack). You learn two more at Fighter levels 7, 10, and 15, and can replace one when you gain a Fighter level. You have four Superiority Dice (d8s), gaining another at levels 7 and 15; you regain all expended dice on a Short or Long Rest. Maneuver save DC = 8 + Strength or Dexterity modifier + Proficiency Bonus."
            },
            {
                "level": 3,
                "name": "Student of War",
                "description": "You gain proficiency with one type of Artisan's Tools of your choice, and you gain proficiency in one skill of your choice from the skills available to Fighters at level 1."
            },
            {
                "level": 7,
                "name": "Know Your Enemy",
                "description": "As a Bonus Action, you can discern whether a creature you can see within 30 feet has any Immunities, Resistances, or Vulnerabilities, and if so, what they are. Once you use this feature, you can't do so again until you finish a Long Rest unless you expend one Superiority Die to restore it."
            },
            {
                "level": 10,
                "name": "Improved Combat Superiority",
                "description": "Your Superiority Die becomes a d10."
            },
            {
                "level": 15,
                "name": "Relentless",
                "description": "Once per turn, when you use a maneuver, you can roll 1d8 and use the number rolled instead of expending a Superiority Die."
            },
            {
                "level": 18,
                "name": "Ultimate Combat Superiority",
                "description": "Your Superiority Die becomes a d12."
            }
        ]
    },
    {
        "id": "champion",
        "classId": "fighter",
        "name": "Champion",
        "description": "A Champion focuses on the development of martial prowess in a relentless pursuit of victory.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Improved Critical",
                "description": "Your attack rolls with weapons and Unarmed Strikes can score a Critical Hit on a roll of 19 or 20 on the d20."
            },
            {
                "level": 3,
                "name": "Remarkable Athlete",
                "description": "Thanks to your athleticism, you have Advantage on Initiative rolls and Strength (Athletics) checks.\nIn addition, immediately after you score a Critical Hit, you can move up to half your Speed without provoking Opportunity Attacks."
            },
            {
                "level": 7,
                "name": "Additional Fighting Style",
                "description": "You gain another Fighting Style feat of your choice."
            },
            {
                "level": 10,
                "name": "Heroic Warrior",
                "description": "The thrill of battle drives you toward victory. During combat, you can give yourself Heroic Inspiration whenever you start your turn without it."
            },
            {
                "level": 15,
                "name": "Superior Critical",
                "description": "Your attack rolls with weapons and Unarmed Strikes can now score a Critical Hit on a roll of 18-20 on the d20."
            },
            {
                "level": 18,
                "name": "Survivor",
                "description": "You attain the pinnacle of resilience in battle, giving you these benefits.\nDefy Death. You have Advantage on Death Saving Throws. Moreover, when you roll 18-20 on a Death Saving Throw, you gain the benefit of rolling a 20 on it.\nHeroic Rally. At the start of each of your turns, you regain Hit Points equal to 5 plus your Constitution modifier if you are Bloodied and have at least 1 Hit Point."
            }
        ]
    },
    {
        "id": "eldritch_knight",
        "classId": "fighter",
        "name": "Eldritch Knight",
        "description": "Eldritch Knights combine the martial mastery common to all Fighters with a careful study of magic.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Spellcasting",
                "description": "You have learned to cast spells. You know two Wizard cantrips (three at Fighter level 10) and prepare level 1+ Wizard spells as shown on the Eldritch Knight Spellcasting table, using the one-third-caster spell slot progression. Intelligence is your spellcasting ability, and you can use an Arcane Focus."
            },
            {
                "level": 3,
                "name": "War Bond",
                "description": "You learn a ritual that creates a magical bond between yourself and one weapon (performed over 1 hour, which can be during a Short Rest). You can't be disarmed of that weapon unless you have the Incapacitated condition, and if it is on the same plane of existence you can summon it to your hand as a Bonus Action. You can have up to two bonded weapons."
            },
            {
                "level": 7,
                "name": "War Magic",
                "description": "When you take the Attack action on your turn, you can replace one of the attacks with a casting of one of your Wizard cantrips that has a casting time of an action."
            },
            {
                "level": 10,
                "name": "Eldritch Strike",
                "description": "When you hit a creature with an attack using a weapon, that creature has Disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn."
            },
            {
                "level": 15,
                "name": "Arcane Charge",
                "description": "When you use your Action Surge, you can teleport up to 30 feet to an unoccupied space you can see. You can teleport before or after the additional action."
            },
            {
                "level": 18,
                "name": "Improved War Magic",
                "description": "When you take the Attack action on your turn, you can replace two of the attacks with a casting of one of your level 1 or level 2 Wizard spells that has a casting time of an action."
            }
        ],
        "spellcasting": {
            "spellListClass": "wizard",
            "spellcastingAbility": "int",
            "casterLevelDivisor": 3
        }
    },
    {
        "id": "psi_warrior",
        "classId": "fighter",
        "name": "Psi Warrior",
        "description": "Psi Warriors augment their physical might with psionic power, using it to empower strikes, protect allies, and move objects with their minds.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Psionic Power",
                "description": "You have a pool of Psionic Energy Dice (four d6s at level 3, increasing in number and size as you level: d8 at 5, d10 at 11, d12 at 17). You regain one expended die on a Short Rest and all on a Long Rest. Powers: Protective Field (when you or a creature within 30 feet takes damage, take a Reaction and expend a die to reduce the damage by the roll plus your Intelligence modifier), Psionic Strike (once per turn, after you hit a target within 30 feet with a weapon, expend a die to deal extra Force damage equal to the roll plus your Intelligence modifier), and Telekinetic Movement (Magic action: move a Large or smaller loose object or willing creature up to 30 feet; once per Short or Long Rest unless you expend a die)."
            },
            {
                "level": 7,
                "name": "Telekinetic Adept",
                "description": "Psi-Powered Leap: as a Bonus Action, you gain a Fly Speed equal to twice your Speed until the end of the current turn (once per Short or Long Rest unless you expend a die). Telekinetic Thrust: when you deal damage with Psionic Strike, you can force the target to make a Strength saving throw (DC 8 + Intelligence modifier + Proficiency Bonus) or have the Prone condition or be pushed up to 10 feet."
            },
            {
                "level": 10,
                "name": "Guarded Mind",
                "description": "You have Resistance to Psychic damage. If you start your turn with the Charmed or Frightened condition, you can expend a Psionic Energy Die (no action required) to end every effect on yourself giving you those conditions."
            },
            {
                "level": 15,
                "name": "Bulwark of Force",
                "description": "As a Bonus Action, choose creatures (including yourself) within 30 feet, up to your Intelligence modifier (minimum one). Each has Half Cover for 1 minute or until you have the Incapacitated condition. Once used, you can't do so again until you finish a Long Rest unless you expend a Psionic Energy Die to restore it."
            },
            {
                "level": 18,
                "name": "Telekinetic Master",
                "description": "You always have Telekinesis prepared. You can cast it without a spell slot or components (Intelligence is your spellcasting ability), once per Long Rest unless you expend a Psionic Energy Die. While concentrating on it, you can make one attack with a weapon as a Bonus Action on each of your turns."
            }
        ]
    },
    {
        "id": "mercy",
        "classId": "monk",
        "name": "Warrior of Mercy",
        "description": "Warriors of Mercy manipulate the life force of others, bringing aid to those in need or a swift end to the wicked.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Hand of Harm",
                "description": "Once per turn when you hit a creature with an Unarmed Strike and deal damage, you can expend 1 Focus Point to deal extra Necrotic damage equal to one roll of your Martial Arts die plus your Wisdom modifier."
            },
            {
                "level": 3,
                "name": "Hand of Healing",
                "description": "As a Magic action, you can expend 1 Focus Point to touch a creature and restore Hit Points equal to a roll of your Martial Arts die plus your Wisdom modifier. When you use Flurry of Blows, you can replace one of the Unarmed Strikes with a use of this feature without expending a Focus Point for the healing."
            },
            {
                "level": 3,
                "name": "Implements of Mercy",
                "description": "You gain proficiency in the Insight and Medicine skills and proficiency with the Herbalism Kit."
            },
            {
                "level": 6,
                "name": "Physician's Touch",
                "description": "When you use Hand of Harm on a creature, you can also give it the Poisoned condition until the end of your next turn. When you use Hand of Healing, you can also end one of the following conditions on the creature: Blinded, Deafened, Paralyzed, Poisoned, or Stunned."
            },
            {
                "level": 11,
                "name": "Flurry of Healing and Harm",
                "description": "When you use Flurry of Blows, you can replace each Unarmed Strike with a use of Hand of Healing without expending Focus Points for the healing. When you make an Unarmed Strike with Flurry of Blows and deal damage, you can use Hand of Harm with that strike without expending a Focus Point (still once per turn). You can use these benefits a total number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a Long Rest."
            },
            {
                "level": 17,
                "name": "Hand of Ultimate Mercy",
                "description": "As a Magic action, you can touch the corpse of a creature that died within the past 24 hours and expend 5 Focus Points. The creature then returns to life with a number of Hit Points equal to 4d10 plus your Wisdom modifier, and the conditions Blinded, Deafened, Paralyzed, Poisoned, and Stunned are removed. Once you use this feature, you can't use it again until you finish a Long Rest."
            }
        ]
    },
    {
        "id": "shadow",
        "classId": "monk",
        "name": "Warrior of Shadow",
        "description": "Warriors of Shadow practice stealth and subterfuge, harnessing the power of the Shadowfell.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Shadow Arts",
                "description": "Darkness: you can expend 1 Focus Point to cast Darkness without spell components; you can see within its area, and while it persists you can move its area to a space within 60 feet of you at the start of each of your turns. Darkvision: you gain Darkvision with a range of 60 feet, or +60 feet if you already have it. Shadowy Figments: you know the Minor Illusion cantrip, with Wisdom as your spellcasting ability."
            },
            {
                "level": 6,
                "name": "Shadow Step",
                "description": "While entirely within Dim Light or Darkness, you can use a Bonus Action to teleport up to 60 feet to an unoccupied space you can see that is also in Dim Light or Darkness. You then have Advantage on the next melee attack you make before the end of the current turn."
            },
            {
                "level": 11,
                "name": "Improved Shadow Step",
                "description": "You can expend 1 Focus Point when you use Shadow Step to remove the requirement that you start and end in Dim Light or Darkness. As part of the same Bonus Action, you can make an Unarmed Strike immediately after you teleport."
            },
            {
                "level": 17,
                "name": "Cloak of Shadows",
                "description": "As a Magic action while entirely within Dim Light or Darkness, you can expend 3 Focus Points to shroud yourself with shadows for 1 minute, until you have the Incapacitated condition, or until you end your turn in Bright Light. During this time you have the Invisible condition, you can move through occupied spaces as Difficult Terrain, and you can use Flurry of Blows without expending Focus Points."
            }
        ]
    },
    {
        "id": "elements",
        "classId": "monk",
        "name": "Warrior of the Elements",
        "description": "Warriors of the Elements tap into the power of the elemental planes, harnessing their energies through their bodies.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Elemental Attunement",
                "description": "At the start of your turn, you can expend 1 Focus Point to imbue yourself with elemental energy for 10 minutes or until you have the Incapacitated condition. While attuned, your reach is 10 feet greater when you make an Unarmed Strike, your Unarmed Strikes can deal Acid, Cold, Fire, Lightning, or Thunder damage, and when you hit with an Unarmed Strike you can force the target to make a Strength saving throw (your Focus save DC) or be moved up to 10 feet toward or away from you."
            },
            {
                "level": 3,
                "name": "Manipulate Elements",
                "description": "You know the Elementalism cantrip. Wisdom is your spellcasting ability for it."
            },
            {
                "level": 6,
                "name": "Elemental Burst",
                "description": "As a Magic action, you can expend 2 Focus Points to cause elemental energy to burst in a 20-foot-radius Sphere centered on a point within 120 feet of yourself. Choose a damage type: Acid, Cold, Fire, Lightning, or Thunder. Each creature in the Sphere makes a Dexterity saving throw, taking damage of the chosen type equal to three rolls of your Martial Arts die on a failure or half as much on a success."
            },
            {
                "level": 11,
                "name": "Stride of the Elements",
                "description": "While your Elemental Attunement is active, you also have a Fly Speed and a Swim Speed equal to your Speed."
            },
            {
                "level": 17,
                "name": "Elemental Epitome",
                "description": "While your Elemental Attunement is active: you have Resistance to one damage type of your choice (Acid, Cold, Fire, Lightning, or Thunder), changeable at the start of each turn; when you use Step of the Wind, your Speed increases by 20 feet and creatures you pass within 5 feet take damage equal to one roll of your Martial Arts die; and once on each of your turns you can deal extra damage equal to one roll of your Martial Arts die to a target you hit with an Unarmed Strike."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "elementalism"
            }
        ]
    },
    {
        "id": "open_hand",
        "classId": "monk",
        "name": "Warrior of the Open Hand",
        "description": "Warriors of the Open Hand are masters of unarmed combat, learning techniques to push and trip their opponents.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Open Hand Technique",
                "description": "Whenever you hit a creature with an attack granted by your Flurry of Blows, you can impose one of the following effects on that target.\nAddle. The target can't make Opportunity Attacks until the start of its next turn.\nPush. The target must succeed on a Strength saving throw or be pushed up to 15 feet away from you.\nTopple. The target must succeed on a Dexterity saving throw or have the Prone condition."
            },
            {
                "level": 6,
                "name": "Wholeness of Body",
                "description": "You gain the ability to heal yourself. As a Bonus Action, you can roll your Martial Arts die. You regain a number of Hit Points equal to the number rolled\nplus your Wisdom modifier (minimum of 1 Hit Point regained).\nYou can use this feature a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a Long Rest."
            },
            {
                "level": 11,
                "name": "Fleet Step",
                "description": "When you take a Bonus Action other than Step of the Wind, you can also use Step of the Wind immediately after that Bonus Action."
            },
            {
                "level": 17,
                "name": "Quivering Palm",
                "description": "You gain the ability to set up lethal vibrations in someone's body. When you hit a creature with an Unarmed Strike, you can expend 4 Focus Points to start these imperceptible vibrations, which last\nfor a number of days equal to your Monk level. The vibrations are harmless unless you take an action to end them. Alternatively, when you take the Attack action on your turn, you can forgo one of the attacks to end the vibrations. To end them, you and the target must be on the same plane of existence. When you end them, the target must make a Constitution saving throw, taking 10d12 Force damage on a failed save or half as much damage on a successful one.\nYou can have only one creature under the effect of this feature at a time. You can end the vibrations harmlessly (no action required)."
            }
        ]
    },
    {
        "id": "ancients",
        "classId": "paladin",
        "name": "Oath of the Ancients",
        "description": "The Oath of the Ancients is as old as the first elves; paladins who swear it cherish the light and beauty in the world.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Oath of the Ancients Spells",
                "description": "When you reach a Paladin level listed below, you thereafter always have the listed spells prepared.\nPaladin level 3: Ensnaring Strike, Speak with Animals\nPaladin level 5: Misty Step, Moonbeam\nPaladin level 9: Plant Growth, Protection from Energy\nPaladin level 13: Ice Storm, Stoneskin\nPaladin level 17: Commune with Nature, Tree Stride"
            },
            {
                "level": 3,
                "name": "Nature's Wrath",
                "description": "As a Magic action, you can expend one use of your Channel Divinity to conjure spectral vines around nearby creatures. Each creature of your choice that you can see within 15 feet of yourself must succeed on a Strength saving throw or have the Restrained condition for 1 minute, repeating the save at the end of each of its turns."
            },
            {
                "level": 7,
                "name": "Aura of Warding",
                "description": "Ancient magic lies so heavily upon you that it forms an eldritch ward. You and your allies have Resistance to Necrotic, Psychic, and Radiant damage while in your Aura of Protection."
            },
            {
                "level": 15,
                "name": "Undying Sentinel",
                "description": "When you are reduced to 0 Hit Points and not killed outright, you can drop to 1 Hit Point instead, and you then regain a number of Hit Points equal to three times your Paladin level. Once you use this feature, you can't do so again until you finish a Long Rest. Additionally, you can't be aged magically, and you cease visibly aging."
            },
            {
                "level": 20,
                "name": "Elder Champion",
                "description": "As a Bonus Action, you can imbue your Aura of Protection with primal power for 1 minute: at the start of each of your turns you regain 10 Hit Points, you can cast Paladin spells that have a casting time of an action as a Bonus Action instead, and enemies in your aura have Disadvantage on saving throws against your spells and Channel Divinity options. Once used, you can't use this feature again until you finish a Long Rest unless you expend a level 5 spell slot to restore it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "ensnaring-strike"
            },
            {
                "level": 3,
                "spellId": "speak-with-animals"
            },
            {
                "level": 5,
                "spellId": "misty-step"
            },
            {
                "level": 5,
                "spellId": "moonbeam"
            },
            {
                "level": 9,
                "spellId": "plant-growth"
            },
            {
                "level": 9,
                "spellId": "protection-from-energy"
            },
            {
                "level": 13,
                "spellId": "ice-storm"
            },
            {
                "level": 13,
                "spellId": "stoneskin"
            },
            {
                "level": 17,
                "spellId": "commune-with-nature"
            },
            {
                "level": 17,
                "spellId": "tree-stride"
            }
        ]
    },
    {
        "id": "devotion",
        "classId": "paladin",
        "name": "Oath of Devotion",
        "description": "The Oath of Devotion binds paladins to the ideals of justice and order.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Oath of Devotion Spells",
                "description": "When you reach a Paladin level listed below, you thereafter always have the listed spells prepared.\nPaladin level 3: Protection from Evil and Good, Shield of Faith\nPaladin level 5: Aid, Zone of Truth\nPaladin level 9: Beacon of Hope, Dispel Magic\nPaladin level 13: Freedom of Movement, Guardian of Faith\nPaladin level 17: Commune, Flame Strike"
            },
            {
                "level": 3,
                "name": "Sacred Weapon",
                "description": "When you take the Attack action, you can expend one use of your Channel Divinity to imbue one Melee weapon that you are holding with positive energy. For 10 minutes or until you use this feature again, you add your Charisma modifier to attack rolls you make with that weapon (minimum bonus of +1), and each time you hit with it, you cause it to deal its normal damage type or Radiant damage.\nThe weapon also emits Bright Light in a 20-foot radius and Dim Light 20 feet beyond that.\nYou can end this effect early (no action required). This effect also ends if you aren't carrying the weapon."
            },
            {
                "level": 7,
                "name": "Aura of Devotion",
                "description": "You and your allies have Immunity to the Charmed condition while in your Aura of Protection. If a Charmed ally enters the aura, that condition has no effect on that ally while there."
            },
            {
                "level": 15,
                "name": "Smite of Protection",
                "description": "Your magical smite now radiates protective energy. Whenever you cast Divine Smite, you and your allies have Half Cover while in your Aura of Protection.\nThe aura has this benefit until the start of your next turn."
            },
            {
                "level": 20,
                "name": "Holy Nimbus",
                "description": "As a Bonus Action, you can imbue your Aura of Protection with holy power, granting the benefits below for 10 minutes or until you end them (no action required). Once you use this feature, you can't use it again until you finish a Long Rest. You can also restore your use of it by expending a level 5 spell slot (no action required).\nHoly Ward. You have Advantage on any saving throw you are forced to make by a Fiend or an Undead.\nRadiant Damage. Whenever an enemy starts its turn in the aura, that creature takes Radiant damage equal to your Charisma modifier plus your Proficiency Bonus.\nSunlight. The aura is filled with Bright Light that is sunlight."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "protection-from-evil-and-good"
            },
            {
                "level": 3,
                "spellId": "shield-of-faith"
            },
            {
                "level": 5,
                "spellId": "aid"
            },
            {
                "level": 5,
                "spellId": "zone-of-truth"
            },
            {
                "level": 9,
                "spellId": "beacon-of-hope"
            },
            {
                "level": 9,
                "spellId": "dispel-magic"
            },
            {
                "level": 13,
                "spellId": "freedom-of-movement"
            },
            {
                "level": 13,
                "spellId": "guardian-of-faith"
            },
            {
                "level": 17,
                "spellId": "commune"
            },
            {
                "level": 17,
                "spellId": "flame-strike"
            }
        ]
    },
    {
        "id": "glory",
        "classId": "paladin",
        "name": "Oath of Glory",
        "description": "Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Oath of Glory Spells",
                "description": "When you reach a Paladin level listed below, you thereafter always have the listed spells prepared.\nPaladin level 3: Guiding Bolt, Heroism\nPaladin level 5: Enhance Ability, Magic Weapon\nPaladin level 9: Haste, Protection from Energy\nPaladin level 13: Compulsion, Freedom of Movement\nPaladin level 17: Legend Lore, Yolande's Regal Presence"
            },
            {
                "level": 3,
                "name": "Inspiring Smite",
                "description": "Immediately after you cast Divine Smite, you can expend one use of your Channel Divinity and distribute Temporary Hit Points to creatures of your choice within 30 feet of you (which can include you). The total number of Temporary Hit Points equals 2d8 plus your Paladin level."
            },
            {
                "level": 3,
                "name": "Peerless Athlete",
                "description": "As a Bonus Action, you can expend one use of your Channel Divinity to augment your athleticism. For 1 hour, you have Advantage on Strength (Athletics) and Dexterity (Acrobatics) checks, and the distance of your Long and High Jumps increases by 10 feet."
            },
            {
                "level": 7,
                "name": "Aura of Alacrity",
                "description": "Your Speed increases by 10 feet. In addition, whenever an ally enters your Aura of Protection for the first time on a turn or starts its turn there, the ally's Speed increases by 10 feet until the end of its next turn."
            },
            {
                "level": 15,
                "name": "Glorious Defense",
                "description": "When you or another creature you can see within 10 feet of you is hit by an attack roll, you can take a Reaction to grant a bonus to the target's AC against that attack equal to your Charisma modifier (minimum +1). If the attack misses, you can make one attack with a weapon against the attacker as part of this Reaction if it is within your reach. You can use this feature a number of times equal to your Charisma modifier (minimum of once), regaining all uses on a Long Rest."
            },
            {
                "level": 20,
                "name": "Living Legend",
                "description": "As a Bonus Action, you gain the following benefits for 10 minutes: Advantage on all Charisma checks; once on each of your turns, when you make an attack roll with a weapon and miss, you can cause that attack to hit instead; and when you fail a saving throw, you can take a Reaction to reroll it. Once used, you can't use this feature again until you finish a Long Rest unless you expend a level 5 spell slot to restore it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "guiding-bolt"
            },
            {
                "level": 3,
                "spellId": "heroism"
            },
            {
                "level": 5,
                "spellId": "enhance-ability"
            },
            {
                "level": 5,
                "spellId": "magic-weapon"
            },
            {
                "level": 9,
                "spellId": "haste"
            },
            {
                "level": 9,
                "spellId": "protection-from-energy"
            },
            {
                "level": 13,
                "spellId": "compulsion"
            },
            {
                "level": 13,
                "spellId": "freedom-of-movement"
            },
            {
                "level": 17,
                "spellId": "legend-lore"
            },
            {
                "level": 17,
                "spellId": "yolandes-regal-presence"
            }
        ]
    },
    {
        "id": "vengeance",
        "classId": "paladin",
        "name": "Oath of Vengeance",
        "description": "The Oath of Vengeance is a solemn commitment to punish those who have committed grievous evils.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Oath of Vengeance Spells",
                "description": "When you reach a Paladin level listed below, you thereafter always have the listed spells prepared.\nPaladin level 3: Bane, Hunter's Mark\nPaladin level 5: Hold Person, Misty Step\nPaladin level 9: Haste, Protection from Energy\nPaladin level 13: Banishment, Dimension Door\nPaladin level 17: Hold Monster, Scrying"
            },
            {
                "level": 3,
                "name": "Vow of Enmity",
                "description": "When you take the Attack action, you can expend one use of your Channel Divinity to utter a vow of enmity against a creature you can see within 30 feet of you. You have Advantage on attack rolls against the creature for 1 minute or until you use this feature again. If the creature drops to 0 Hit Points before the vow ends, you can transfer the vow to a different creature within 30 feet of yourself (no action required)."
            },
            {
                "level": 7,
                "name": "Relentless Avenger",
                "description": "When you hit a creature with an Opportunity Attack, you can reduce the creature's Speed to 0 until the end of the current turn. You can then move up to half your Speed as part of the same Reaction without provoking Opportunity Attacks."
            },
            {
                "level": 15,
                "name": "Soul of Vengeance",
                "description": "Immediately after a creature under the effect of your Vow of Enmity hits or misses with an attack roll, you can take a Reaction to make a melee attack against that creature if it's within range."
            },
            {
                "level": 20,
                "name": "Avenging Angel",
                "description": "As a Bonus Action, you gain the following benefits for 10 minutes: you sprout spectral wings, gaining a Fly Speed of 60 feet and the ability to hover; and whenever an enemy starts its turn in your Aura of Protection, it must succeed on a Wisdom saving throw or have the Frightened condition for 1 minute or until it takes damage, and attack rolls against it have Advantage while it is Frightened. Once used, you can't use this feature again until you finish a Long Rest unless you expend a level 5 spell slot to restore it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "bane"
            },
            {
                "level": 3,
                "spellId": "hunters-mark"
            },
            {
                "level": 5,
                "spellId": "hold-person"
            },
            {
                "level": 5,
                "spellId": "misty-step"
            },
            {
                "level": 9,
                "spellId": "haste"
            },
            {
                "level": 9,
                "spellId": "protection-from-energy"
            },
            {
                "level": 13,
                "spellId": "banishment"
            },
            {
                "level": 13,
                "spellId": "dimension-door"
            },
            {
                "level": 17,
                "spellId": "hold-monster"
            },
            {
                "level": 17,
                "spellId": "scrying"
            }
        ]
    },
    {
        "id": "beast_master",
        "classId": "ranger",
        "name": "Beast Master",
        "description": "A Beast Master Ranger forms a mystical bond with a special animal, drawing on primal magic to fight alongside it.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Primal Companion",
                "description": "You magically summon a primal beast (Beast of the Land, Sea, or Sky) whose statistics scale with your level and Proficiency Bonus. It is friendly to you and acts on your turn. It moves and takes the Dodge action unless you take a Bonus Action to command it to take an action in its stat block (such as Beast's Strike) or another action. You can sacrifice one of your attacks when you take the Attack action to command it to take the Beast's Strike action. If it has died within the last hour, you can revive it with a Magic action by expending a spell slot; you can also summon a different beast when you finish a Long Rest."
            },
            {
                "level": 7,
                "name": "Exceptional Training",
                "description": "When you take a Bonus Action to command your Primal Companion to take an action, you can also command it to take the Dash, Disengage, Dodge, or Help action as a Bonus Action. In addition, whenever it hits with an attack roll and deals damage, it can deal your choice of Force damage or its normal damage type."
            },
            {
                "level": 11,
                "name": "Bestial Fury",
                "description": "When you command your Primal Companion to take the Beast's Strike action, the beast can use it twice. In addition, the first time each turn it hits a creature under the effect of your Hunter's Mark spell, the beast deals extra Force damage equal to the bonus damage of that spell."
            },
            {
                "level": 15,
                "name": "Share Spells",
                "description": "When you cast a spell targeting yourself, you can also affect your Primal Companion with the spell if the beast is within 30 feet of you."
            }
        ]
    },
    {
        "id": "fey_wanderer",
        "classId": "ranger",
        "name": "Fey Wanderer",
        "description": "A Fey Wanderer carries fey mirth and menace, drawing on the magic of the Feywild.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Fey Wanderer Spells",
                "description": "When you reach a Ranger level listed below, you thereafter always have the listed spells prepared.\nRanger level 3: Charm Person\nRanger level 5: Misty Step\nRanger level 9: Summon Fey\nRanger level 13: Dimension Door\nRanger level 17: Mislead"
            },
            {
                "level": 3,
                "name": "Dreadful Strikes",
                "description": "You can augment your weapon strikes with mind-scarring magic. When you hit a creature with a weapon, you can deal an extra 1d4 Psychic damage to the target, which can take this extra damage only once per turn. The extra damage increases to 1d6 when you reach Ranger level 11."
            },
            {
                "level": 3,
                "name": "Otherworldly Glamour",
                "description": "Whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1). You also gain proficiency in one of these skills of your choice: Deception, Performance, or Persuasion."
            },
            {
                "level": 7,
                "name": "Beguiling Twist",
                "description": "You have Advantage on saving throws to avoid or end the Charmed or Frightened condition. Whenever you or a creature you can see within 120 feet of you succeeds on a saving throw to avoid or end the Charmed or Frightened condition, you can take a Reaction to force a different creature you can see within 120 feet of yourself to make a Wisdom saving throw against your spell save DC; on a failure it is Charmed or Frightened (your choice) for 1 minute, repeating the save at the end of each of its turns."
            },
            {
                "level": 11,
                "name": "Fey Reinforcements",
                "description": "You can cast Summon Fey without a Material component. You can also cast it once without a spell slot, and you regain the ability to cast it in this way when you finish a Long Rest. Whenever you start casting the spell, you can modify it so that it doesn't require Concentration; if you do so, the spell's duration becomes 1 minute for that casting."
            },
            {
                "level": 15,
                "name": "Misty Wanderer",
                "description": "You can cast Misty Step without expending a spell slot a number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a Long Rest. Whenever you cast Misty Step, you can bring along one willing creature you can see within 5 feet of yourself, which teleports to an unoccupied space of your choice within 5 feet of your destination."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "charm-person"
            },
            {
                "level": 5,
                "spellId": "misty-step"
            },
            {
                "level": 9,
                "spellId": "summon-fey"
            },
            {
                "level": 13,
                "spellId": "dimension-door"
            },
            {
                "level": 17,
                "spellId": "mislead"
            }
        ]
    },
    {
        "id": "gloom_stalker",
        "classId": "ranger",
        "name": "Gloom Stalker",
        "description": "Gloom Stalkers are at home in the darkest places, stalking foes that dwell in shadow.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Gloom Stalker Spells",
                "description": "When you reach a Ranger level listed below, you thereafter always have the listed spells prepared.\nRanger level 3: Disguise Self\nRanger level 5: Rope Trick\nRanger level 9: Fear\nRanger level 13: Greater Invisibility\nRanger level 17: Seeming"
            },
            {
                "level": 3,
                "name": "Dread Ambusher",
                "description": "Ambusher's Leap: at the start of your first turn of each combat, your Speed increases by 10 feet until the end of that turn. Dreadful Strike: when you attack a creature and hit it with a weapon, you can deal an extra 2d6 Psychic damage; you can use this benefit only once per turn, a number of times equal to your Wisdom modifier (minimum of once), regaining all uses on a Long Rest. Initiative Bonus: when you roll Initiative, you can add your Wisdom modifier to the roll."
            },
            {
                "level": 3,
                "name": "Umbral Sight",
                "description": "You gain Darkvision with a range of 60 feet (or +60 feet if you already have it). While entirely in Darkness, you have the Invisible condition to any creature that relies on Darkvision to see you in that Darkness."
            },
            {
                "level": 7,
                "name": "Iron Mind",
                "description": "You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice)."
            },
            {
                "level": 11,
                "name": "Stalker's Flurry",
                "description": "The Psychic damage of your Dreadful Strike becomes 2d8. When you use the Dreadful Strike effect, you can also cause one of the following: Sudden Strike (you can make another attack with the same weapon against a different creature within 5 feet of the original target and within the weapon's range) or Mass Fear (the target and each creature within 10 feet of it must make a Wisdom saving throw against your spell save DC, having the Frightened condition until the start of your next turn on a failure)."
            },
            {
                "level": 15,
                "name": "Shadowy Dodge",
                "description": "When a creature makes an attack roll against you, you can take a Reaction to impose Disadvantage on that roll. Whether the attack hits or misses, you can then teleport up to 30 feet to an unoccupied space you can see."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "disguise-self"
            },
            {
                "level": 5,
                "spellId": "rope-trick"
            },
            {
                "level": 9,
                "spellId": "fear"
            },
            {
                "level": 13,
                "spellId": "greater-invisibility"
            },
            {
                "level": 17,
                "spellId": "seeming"
            }
        ]
    },
    {
        "id": "hunter",
        "classId": "ranger",
        "name": "Hunter",
        "description": "Hunters stalk prey in the wilds and elsewhere, learning specialized techniques for fighting dangerous threats.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Hunter's Lore",
                "description": "You can call on the forces of nature to reveal certain strengths and weaknesses of your prey. While a creature is marked by your Hunter's Mark, you know whether that creature has any Immunities, Resistances, or Vulnerabilities, and if the creature has any, you know what they are."
            },
            {
                "level": 3,
                "name": "Hunter's Prey",
                "description": "You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one.\nColossus Slayer. Your tenacity can wear down even the most resilient foes. When you hit a creature with a weapon, the weapon deals an extra 1d8 damage to the target if it's missing any of its Hit Points. You can deal this extra damage only once per turn.\nHorde Breaker. Once on each of your turns when you make an attack with a weapon, you can make another attack with the same weapon against a different creature that is within 5 feet of the original target, that is within the weapon's range, and that you haven't attacked this turn."
            },
            {
                "level": 7,
                "name": "Defensive Tactics",
                "description": "You gain one of the following feature options of your choice. Whenever you finish a Short or Long Rest, you can replace the chosen option with the other one.\nEscape the Horde. Opportunity Attacks have Disadvantage against you.\nMultiattack Defense. When a creature hits you with an attack roll, that creature has Disadvantage on all other attack rolls against you this turn."
            },
            {
                "level": 11,
                "name": "Superior Hunter's Prey",
                "description": "Once per turn when you deal damage to a creature marked by your Hunter's Mark, you can also deal that spell's extra damage to a different creature that you can see within 30 feet of the first creature."
            },
            {
                "level": 15,
                "name": "Superior Hunter's Defense",
                "description": "When you take damage, you can take a Reaction to give yourself Resistance to that damage and any other damage of the same type until the end of the current turn."
            }
        ]
    },
    {
        "id": "arcane_trickster",
        "classId": "rogue",
        "name": "Arcane Trickster",
        "description": "Arcane Tricksters enhance their fine-honed skills of stealth and agility with spells, learning magical tricks to aid them in their trade.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Spellcasting",
                "description": "You have learned to cast spells. You know Mage Hand plus two other Wizard cantrips (one more at Rogue level 10), and prepare level 1+ Wizard spells as shown on the Arcane Trickster Spellcasting table, using the one-third-caster spell slot progression. Intelligence is your spellcasting ability, and you can use an Arcane Focus."
            },
            {
                "level": 3,
                "name": "Mage Hand Legerdemain",
                "description": "When you cast Mage Hand, you can cast it as a Bonus Action, and you can make the spectral hand Invisible. You can control the hand as a Bonus Action, and through it you can make Dexterity (Sleight of Hand) checks."
            },
            {
                "level": 9,
                "name": "Magical Ambush",
                "description": "If you have the Invisible condition when you cast a spell on a creature, it has Disadvantage on any saving throw it makes against the spell on the same turn."
            },
            {
                "level": 13,
                "name": "Versatile Trickster",
                "description": "You gain the ability to distract targets with your Mage Hand. When you use the Trip option of your Cunning Strike on a creature, you can also use that option on another creature within 5 feet of the spectral hand."
            },
            {
                "level": 17,
                "name": "Spell Thief",
                "description": "Immediately after a creature casts a spell that targets you or includes you in its area of effect, you can take a Reaction to force the creature to make an Intelligence saving throw (DC = your spell save DC). On a failed save, you negate the spell's effect against you, and you steal the knowledge of the spell if it is at least level 1 and of a level you can cast; for 8 hours you have it prepared and the creature can't cast it. Once you use this feature, you can't use it again until you finish a Long Rest."
            }
        ],
        "spellcasting": {
            "spellListClass": "wizard",
            "spellcastingAbility": "int",
            "casterLevelDivisor": 3
        }
    },
    {
        "id": "assassin",
        "classId": "rogue",
        "name": "Assassin",
        "description": "An Assassin's training focuses on using stealth, poison, and disguise to eliminate foes with deadly efficiency.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Assassinate",
                "description": "Initiative: you have Advantage on Initiative rolls. Surprising Strikes: during the first round of each combat, you have Advantage on attack rolls against any creature that hasn't taken a turn, and if your Sneak Attack hits any target during that round, the target takes extra damage of the weapon's type equal to your Rogue level."
            },
            {
                "level": 3,
                "name": "Assassin's Tools",
                "description": "You gain a Disguise Kit and a Poisoner's Kit, and you have proficiency with them."
            },
            {
                "level": 9,
                "name": "Infiltration Expertise",
                "description": "Masterful Mimicry: you can unerringly mimic another person's speech, handwriting, or both if you have spent at least 1 hour studying them. Roving Aim: your Speed isn't reduced to 0 by using Steady Aim."
            },
            {
                "level": 13,
                "name": "Envenom Weapons",
                "description": "When you use the Poison option of your Cunning Strike, the target also takes 2d6 Poison damage whenever it fails the saving throw. This damage ignores Resistance to Poison damage."
            },
            {
                "level": 17,
                "name": "Death Strike",
                "description": "When you hit with your Sneak Attack on the first round of a combat, the target must succeed on a Constitution saving throw (DC 8 + your Dexterity modifier + Proficiency Bonus), or the attack's damage is doubled against the target."
            }
        ]
    },
    {
        "id": "soulknife",
        "classId": "rogue",
        "name": "Soulknife",
        "description": "A Soulknife strikes with the mind, cutting through barriers both physical and psychic with blades of psionic energy.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Psionic Power",
                "description": "You have a pool of Psionic Energy Dice (four d6s at level 3, increasing in number and size as you level: d8 at 5, d10 at 11, d12 at 17). You regain one expended die on a Short Rest and all on a Long Rest. Psi-Bolstered Knack: if you fail an ability check using a skill or tool you're proficient with, you can roll a die and add it to the check (the die is expended only if the check then succeeds). Psychic Whispers: as a Magic action, choose creatures you can see up to your Proficiency Bonus and roll a die; for that many hours, you can speak telepathically with them (the first use after each Long Rest doesn't expend a die)."
            },
            {
                "level": 3,
                "name": "Psychic Blades",
                "description": "Whenever you take the Attack action or make an Opportunity Attack, you can manifest a Psychic Blade: a Simple Melee weapon with the Finesse and Thrown (range 60/120) properties that deals 1d6 Psychic damage and uses the Vex mastery property. After you attack with it, you can make a melee or ranged attack with a second blade as a Bonus Action on the same turn, dealing 1d4 Psychic damage."
            },
            {
                "level": 9,
                "name": "Soul Blades",
                "description": "Homing Strikes: if you make an attack roll with your Psychic Blade and miss, you can roll one Psionic Energy Die and add it to the roll; the die is expended only if the attack then hits. Psychic Teleportation: as a Bonus Action, you manifest a Psychic Blade, expend one die, and throw the blade at an unoccupied space within a number of feet equal to 10 times the roll; you teleport there and the blade vanishes."
            },
            {
                "level": 13,
                "name": "Psychic Veil",
                "description": "As a Magic action, you gain the Invisible condition for 1 hour or until you dismiss it. The invisibility ends early immediately after you deal damage to a creature or force a creature to make a saving throw. Once used, you can't do so again until you finish a Long Rest unless you expend a Psionic Energy Die to restore it."
            },
            {
                "level": 17,
                "name": "Rend Mind",
                "description": "When you use your Psychic Blades to deal Sneak Attack damage to a creature, you can force that target to make a Wisdom saving throw (DC 8 + your Dexterity modifier + Proficiency Bonus). If the save fails, the target has the Stunned condition for 1 minute, repeating the save at the end of each of its turns. Once used, you can't do so again until you finish a Long Rest unless you expend three Psionic Energy Dice to restore it."
            }
        ]
    },
    {
        "id": "thief",
        "classId": "rogue",
        "name": "Thief",
        "description": "A mix of burglar, treasure hunter, and explorer, the Thief is the epitome of an adventurer.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Fast Hands",
                "description": "As a Bonus Action, you can do one of the following.\nSleight of Hand. Make a Dexterity (Sleight of Hand) check to pick a lock or disarm a trap with Thieves' Tools or to pick a pocket.\nUse an Object. Take the Utilize action, or take the Magic action to use a magic item that requires that action."
            },
            {
                "level": 3,
                "name": "Second-Story Work",
                "description": "You've trained to get into especially hard-to-reach places, granting you these benefits.\nClimber. You gain a Climb Speed equal to your Speed.\nJumper. You can determine your jump distance using your Dexterity rather than your Strength."
            },
            {
                "level": 9,
                "name": "Supreme Sneak",
                "description": "You gain the following Cunning Strike option.\nStealth Attack (Cost: 1d6). If you have the Hide action's Invisible condition, this attack doesn't end that condition on you if you end the turn behind Three-Quarters Cover or Total Cover."
            },
            {
                "level": 13,
                "name": "Use Magic Device",
                "description": "You've learned how to maximize use of magic items, granting you the following benefits.\nAttunement. You can attune to up to four magic items at once.\nCharges. Whenever you use a magic item property that expends charges, roll 1d6. On a roll of 6, you use the property without expending the charges.\nScrolls. You can use any Spell Scroll, using Intelligence as your spellcasting ability for the spell. If the spell is a cantrip or a level 1 spell, you can cast it reliably. If the scroll contains a higher-level spell, you must first succeed on an Intelligence (Arcana) check (DC 10 plus the spell's level). On a successful check, you cast the spell from the scroll. On a failed check, the scroll disintegrates."
            },
            {
                "level": 17,
                "name": "Thief's Reflexes",
                "description": "You are adept at laying ambushes and quickly escaping danger. You can take two turns during the first round of any combat. You take your first turn at your normal Initiative and your second turn at your Initiative minus 10."
            }
        ]
    },
    {
        "id": "aberrant_mind",
        "classId": "sorcerer",
        "name": "Aberrant Sorcery",
        "description": "An alien influence has wrapped its tendrils around your mind, giving you psionic power.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Psionic Spells",
                "description": "When you reach a Sorcerer level listed in the Psionic Spells table, you thereafter always have the listed spells prepared."
            },
            {
                "level": 3,
                "name": "Telepathic Speech",
                "description": "As a Bonus Action, choose one creature you can see within 30 feet of yourself. You and the chosen creature can communicate telepathically while within a number of miles of each other equal to your Charisma modifier (minimum of 1 mile), for a number of minutes equal to your Sorcerer level."
            },
            {
                "level": 6,
                "name": "Psionic Sorcery",
                "description": "When you cast any level 1+ spell from your Psionic Spells feature, you can cast it by expending a spell slot as normal or by spending a number of Sorcery Points equal to the spell's level. If you cast it using Sorcery Points, it requires no Verbal or Somatic components, and it requires no Material components unless they are consumed or have a cost."
            },
            {
                "level": 6,
                "name": "Psychic Defenses",
                "description": "You have Resistance to Psychic damage, and you have Advantage on saving throws to avoid or end the Charmed or Frightened condition."
            },
            {
                "level": 14,
                "name": "Revelation in Flesh",
                "description": "As a Bonus Action, you can spend 1 or more Sorcery Points to transform your body for 10 minutes. For each point spent, gain one: Aquatic Adaptation (Swim Speed equal to twice your Speed and you can breathe underwater), Glistening Flight (Fly Speed equal to your Speed and you can hover), See the Invisible (see any Invisible creature within 60 feet that isn't behind Total Cover), or Wormlike Movement (you can move through spaces as narrow as 1 inch and spend 5 feet of movement to escape nonmagical restraints or the Grappled condition)."
            },
            {
                "level": 18,
                "name": "Warping Implosion",
                "description": "As a Magic action, you teleport to an unoccupied space you can see within 120 feet of yourself. Each creature within 30 feet of the space you left must make a Strength saving throw against your spell save DC, taking 3d10 Force damage and being pulled straight toward that space on a failure, or half as much damage on a success. Once used, you can't use this feature again until you finish a Long Rest unless you spend 5 Sorcery Points to restore it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "arms-of-hadar"
            },
            {
                "level": 3,
                "spellId": "calm-emotions"
            },
            {
                "level": 3,
                "spellId": "detect-thoughts"
            },
            {
                "level": 3,
                "spellId": "dissonant-whispers"
            },
            {
                "level": 3,
                "spellId": "mind-sliver"
            },
            {
                "level": 5,
                "spellId": "hunger-of-hadar"
            },
            {
                "level": 5,
                "spellId": "sending"
            },
            {
                "level": 7,
                "spellId": "evards-black-tentacles"
            },
            {
                "level": 7,
                "spellId": "summon-aberration"
            },
            {
                "level": 9,
                "spellId": "rarys-telepathic-bond"
            },
            {
                "level": 9,
                "spellId": "telekinesis"
            }
        ]
    },
    {
        "id": "clockwork_soul",
        "classId": "sorcerer",
        "name": "Clockwork Sorcery",
        "description": "The cosmic force of order has suffused you with magic drawn from Mechanus.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Clockwork Spells",
                "description": "When you reach a Sorcerer level listed in the Clockwork Spells table, you thereafter always have the listed spells prepared."
            },
            {
                "level": 3,
                "name": "Restore Balance",
                "description": "When a creature you can see within 60 feet of yourself is about to roll a d20 with Advantage or Disadvantage, you can take a Reaction to prevent the roll from being affected by Advantage and Disadvantage. You can use this feature a number of times equal to your Charisma modifier (minimum of once), regaining all uses on a Long Rest."
            },
            {
                "level": 6,
                "name": "Bastion of Law",
                "description": "As a Magic action, you can spend 1 to 5 Sorcery Points to create a ward around yourself or another creature you can see within 30 feet. The ward is a number of d8s equal to the points spent. When the warded creature takes damage, it can expend any number of those dice, roll them, and reduce the damage by the total. The ward lasts until you finish a Long Rest or use this feature again."
            },
            {
                "level": 14,
                "name": "Trance of Order",
                "description": "As a Bonus Action, you can enter a state of clockwork consciousness for 1 minute. For the duration, attack rolls against you can't benefit from Advantage, and whenever you make a D20 Test, you can treat a roll of 9 or lower on the d20 as a 10. Once used, you can't use this feature again until you finish a Long Rest unless you spend 5 Sorcery Points to restore it."
            },
            {
                "level": 18,
                "name": "Clockwork Cavalcade",
                "description": "As a Magic action, you summon spirits of order in a 30-foot Cube originating from you. Within it, you can restore up to 100 Hit Points divided among creatures of your choice, repair damaged objects, and end every spell of level 6 or lower on creatures and objects of your choice. Once used, you can't use this feature again until you finish a Long Rest unless you spend 7 Sorcery Points to restore it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "aid"
            },
            {
                "level": 3,
                "spellId": "alarm"
            },
            {
                "level": 3,
                "spellId": "lesser-restoration"
            },
            {
                "level": 3,
                "spellId": "protection-from-evil-and-good"
            },
            {
                "level": 5,
                "spellId": "dispel-magic"
            },
            {
                "level": 5,
                "spellId": "protection-from-energy"
            },
            {
                "level": 7,
                "spellId": "freedom-of-movement"
            },
            {
                "level": 7,
                "spellId": "summon-construct"
            },
            {
                "level": 9,
                "spellId": "greater-restoration"
            },
            {
                "level": 9,
                "spellId": "wall-of-force"
            }
        ]
    },
    {
        "id": "draconic",
        "classId": "sorcerer",
        "name": "Draconic Sorcery",
        "description": "Your innate magic comes from the gift of a dragon.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Draconic Resilience",
                "description": "The magic in your body manifests physical traits of your draconic gift. Your Hit Point maximum increases by 3, and it increases by 1 whenever you gain another Sorcerer level.\nParts of you are also covered by dragon-like scales. While you aren't wearing armor, your base Armor Class equals 10 plus your Dexterity and Charisma modifiers."
            },
            {
                "level": 3,
                "name": "Draconic Spells",
                "description": "When you reach a Sorcerer level listed below, you thereafter always have the listed spells prepared.\nSorcerer level 3: Alter Self, Chromatic Orb, Command, Dragon's Breath\nSorcerer level 5: Fear, Fly\nSorcerer level 7: Arcane Eye, Charm Monster\nSorcerer level 9: Legend Lore, Summon Dragon"
            },
            {
                "level": 6,
                "name": "Elemental Affinity",
                "description": "Your draconic magic has an affinity with a damage type associated with dragons. Choose one of those types: Acid, Cold, Fire, Lightning, or Poison.\nYou have Resistance to that damage type, and when you cast a spell that deals damage of that type, you can add your Charisma modifier to one damage roll of that spell."
            },
            {
                "level": 14,
                "name": "Dragon Wings",
                "description": "As a Bonus Action, you can cause draconic wings to appear on your back. The wings last for 1 hour or until you dismiss them (no action required). For the duration, you have a Fly Speed of 60 feet.\nOnce you use this feature, you can't use it again until you finish a Long Rest unless you spend 3 Sorcery Points (no action required) to restore your use of it."
            },
            {
                "level": 18,
                "name": "Dragon Companion",
                "description": "You can cast Summon Dragon without a Material component. You can also cast it once without a spell slot, and you regain the ability to cast it in this way when you finish a Long Rest.\nWhenever you start casting the spell, you can modify it so that it doesn't require Concentration. If you do so, the spell's duration becomes 1 minute for that casting."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "alter-self"
            },
            {
                "level": 3,
                "spellId": "chromatic-orb"
            },
            {
                "level": 3,
                "spellId": "command"
            },
            {
                "level": 3,
                "spellId": "dragons-breath"
            },
            {
                "level": 5,
                "spellId": "fear"
            },
            {
                "level": 5,
                "spellId": "fly"
            },
            {
                "level": 7,
                "spellId": "arcane-eye"
            },
            {
                "level": 7,
                "spellId": "charm-monster"
            },
            {
                "level": 9,
                "spellId": "legend-lore"
            },
            {
                "level": 9,
                "spellId": "summon-draconic-spirit"
            }
        ]
    },
    {
        "id": "wild_magic",
        "classId": "sorcerer",
        "name": "Wild Magic Sorcery",
        "description": "Your innate magic stems from the forces of chaos that underlie the order of creation.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Wild Magic Surge",
                "description": "Once per turn, you can roll a d20 immediately after you cast a Sorcerer spell with a spell slot. If you roll a 20, roll on the Wild Magic Surge table to create a magical effect."
            },
            {
                "level": 3,
                "name": "Tides of Chaos",
                "description": "You can manipulate chaos itself to give yourself Advantage on one D20 Test before you roll the d20. Once you do so, you must cast a Sorcerer spell with a spell slot or finish a Long Rest before you can use this feature again. If you do cast a Sorcerer spell with a spell slot before you finish a Long Rest, you automatically roll on the Wild Magic Surge table."
            },
            {
                "level": 6,
                "name": "Bend Luck",
                "description": "Immediately after another creature you can see rolls the d20 for a D20 Test, you can take a Reaction and spend 1 Sorcery Point to roll 1d4 and apply the number rolled as a bonus or penalty (your choice) to the d20 roll."
            },
            {
                "level": 14,
                "name": "Controlled Chaos",
                "description": "Whenever you roll on the Wild Magic Surge table, you can roll twice and use either number."
            },
            {
                "level": 18,
                "name": "Tamed Surge",
                "description": "Immediately after you cast a Sorcerer spell with a spell slot, you can create an effect of your choice from the Wild Magic Surge table instead of rolling on it (except the final row). Once used, you can't do so again until you finish a Long Rest."
            }
        ]
    },
    {
        "id": "archfey",
        "classId": "warlock",
        "name": "Archfey Patron",
        "description": "Your pact draws on the power of the Feywild, from a lord or lady of the fey.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Archfey Spells",
                "description": "When you reach a Warlock level listed in the Archfey Spells table, you thereafter always have the listed spells prepared."
            },
            {
                "level": 3,
                "name": "Steps of the Fey",
                "description": "You can cast Misty Step without expending a spell slot a number of times equal to your Charisma modifier (minimum of once), regaining all uses on a Long Rest. Whenever you cast that spell, you can choose one additional effect: Refreshing Step (you or one creature within 10 feet gains 1d10 Temporary Hit Points) or Taunting Step (creatures within 5 feet of the space you left must succeed on a Wisdom saving throw or have Disadvantage on attack rolls against creatures other than you until the start of your next turn)."
            },
            {
                "level": 6,
                "name": "Misty Escape",
                "description": "You can cast Misty Step as a Reaction when you take damage. Your Steps of the Fey gains new options: Disappearing Step (you have the Invisible condition until the start of your next turn or until you attack, deal damage, or cast a spell) and Dreadful Step (creatures within 5 feet of the space you left or arrived in must succeed on a Wisdom saving throw or take 2d10 Psychic damage)."
            },
            {
                "level": 10,
                "name": "Beguiling Defenses",
                "description": "You are immune to the Charmed condition. In addition, immediately after a creature you can see hits you with an attack roll, you can take a Reaction to reduce the damage you take by half, and force the attacker to make a Wisdom saving throw; on a failure it takes Psychic damage equal to the damage you take. Once used, you can't use this Reaction again until you finish a Long Rest unless you expend a Pact Magic spell slot to restore it."
            },
            {
                "level": 14,
                "name": "Bewitching Magic",
                "description": "Immediately after you cast an Enchantment or Illusion spell using an action and a spell slot, you can cast Misty Step as part of the same action without expending a spell slot."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "calm-emotions"
            },
            {
                "level": 3,
                "spellId": "faerie-fire"
            },
            {
                "level": 3,
                "spellId": "misty-step"
            },
            {
                "level": 3,
                "spellId": "phantasmal-force"
            },
            {
                "level": 3,
                "spellId": "sleep"
            },
            {
                "level": 5,
                "spellId": "blink"
            },
            {
                "level": 5,
                "spellId": "plant-growth"
            },
            {
                "level": 7,
                "spellId": "dominate-beast"
            },
            {
                "level": 7,
                "spellId": "greater-invisibility"
            },
            {
                "level": 9,
                "spellId": "dominate-person"
            },
            {
                "level": 9,
                "spellId": "seeming"
            }
        ]
    },
    {
        "id": "celestial",
        "classId": "warlock",
        "name": "Celestial Patron",
        "description": "Your pact draws on the Upper Planes, the realms of everlasting bliss.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Celestial Spells",
                "description": "When you reach a Warlock level listed in the Celestial Spells table, you thereafter always have the listed spells prepared."
            },
            {
                "level": 3,
                "name": "Healing Light",
                "description": "You gain a pool of d6s equal to 1 plus your Warlock level. As a Bonus Action, you can heal yourself or one creature you can see within 60 feet of you by expending dice from the pool (up to your Charisma modifier, minimum one die at a time); roll them and restore Hit Points equal to the total. You regain all expended dice when you finish a Long Rest."
            },
            {
                "level": 6,
                "name": "Radiant Soul",
                "description": "You have Resistance to Radiant damage. Once per turn, when a spell you cast deals Radiant or Fire damage, you can add your Charisma modifier to that spell's damage against one of the spell's targets."
            },
            {
                "level": 10,
                "name": "Celestial Resilience",
                "description": "You gain Temporary Hit Points whenever you use your Magical Cunning feature or finish a Short or Long Rest. They equal your Warlock level plus your Charisma modifier. Additionally, choose up to five creatures you can see when you gain them; each gains Temporary Hit Points equal to half your Warlock level plus your Charisma modifier."
            },
            {
                "level": 14,
                "name": "Searing Vengeance",
                "description": "When you or an ally within 60 feet of you is about to make a Death Saving Throw, you can unleash radiant energy: that creature regains Hit Points equal to half its Hit Point maximum and can end the Prone condition on itself, and each creature of your choice within 30 feet of it takes Radiant damage equal to 2d8 plus your Charisma modifier and has the Blinded condition until the end of the current turn. Once used, you can't use this feature again until you finish a Long Rest."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "aid"
            },
            {
                "level": 3,
                "spellId": "cure-wounds"
            },
            {
                "level": 3,
                "spellId": "guiding-bolt"
            },
            {
                "level": 3,
                "spellId": "lesser-restoration"
            },
            {
                "level": 3,
                "spellId": "light"
            },
            {
                "level": 3,
                "spellId": "sacred-flame"
            },
            {
                "level": 5,
                "spellId": "daylight"
            },
            {
                "level": 5,
                "spellId": "revivify"
            },
            {
                "level": 7,
                "spellId": "guardian-of-faith"
            },
            {
                "level": 7,
                "spellId": "wall-of-fire"
            },
            {
                "level": 9,
                "spellId": "greater-restoration"
            },
            {
                "level": 9,
                "spellId": "summon-celestial"
            }
        ]
    },
    {
        "id": "fiend",
        "classId": "warlock",
        "name": "Fiend Patron",
        "description": "Your pact draws on the Lower Planes, the realms of perdition.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Dark One's Blessing",
                "description": "When you reduce an enemy to 0 Hit Points, you gain Temporary Hit Points equal to your Charisma modifier plus your Warlock level (minimum of 1 Temporary Hit Point). You also gain this benefit if someone else reduces an enemy within 10 feet of you to 0 Hit Points."
            },
            {
                "level": 3,
                "name": "Fiend Spells",
                "description": "When you reach a Warlock level listed below, you thereafter always have the listed spells prepared.\nWarlock level 3: Burning Hands, Command, Scorching Ray, Suggestion\nWarlock level 5: Fireball, Stinking Cloud\nWarlock level 7: Fire Shield, Wall of Fire\nWarlock level 9: Geas, Insect Plague"
            },
            {
                "level": 6,
                "name": "Dark One's Own Luck",
                "description": "You can call on your fiendish patron to alter fate in your favor. When you make an ability check or a saving throw, you can use this feature to add 1d10 to your roll. You can do so after seeing the roll but before any of the roll's effects occur.\nYou can use this feature a number of times equal to your Charisma modifier (minimum of once), but you can use it no more than once per roll. You regain all expended uses when you finish a Long Rest."
            },
            {
                "level": 10,
                "name": "Fiendish Resilience",
                "description": "Choose one damage type, other than Force, whenever you finish a Short or Long Rest. You have Resistance to that damage type until you choose a different one with this feature."
            },
            {
                "level": 14,
                "name": "Hurl Through Hell",
                "description": "Once per turn when you hit a creature with an attack roll, you can try to instantly transport the target through the Lower Planes. The target must succeed on a Charisma saving throw against your spell save DC, or the target disappears and hurtles through a nightmare landscape. The target takes 8d10 Psychic damage if it isn't a Fiend, and it has the Incapacitated condition until the end of your next turn, when it returns to the space it previously occupied or the nearest unoccupied space.\nOnce you use this feature, you can't use it again until you finish a Long Rest unless you expend a Pact Magic spell slot (no action required) to restore your use of it."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "burning-hands"
            },
            {
                "level": 3,
                "spellId": "command"
            },
            {
                "level": 3,
                "spellId": "scorching-ray"
            },
            {
                "level": 3,
                "spellId": "suggestion"
            },
            {
                "level": 5,
                "spellId": "fireball"
            },
            {
                "level": 5,
                "spellId": "stinking-cloud"
            },
            {
                "level": 7,
                "spellId": "fire-shield"
            },
            {
                "level": 7,
                "spellId": "wall-of-fire"
            },
            {
                "level": 9,
                "spellId": "geas"
            },
            {
                "level": 9,
                "spellId": "insect-plague"
            }
        ]
    },
    {
        "id": "great_old_one",
        "classId": "warlock",
        "name": "Great Old One Patron",
        "description": "Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Awakened Mind",
                "description": "You can form a telepathic connection between your mind and the mind of another. As a Bonus Action, choose one creature you can see within 30 feet of yourself; you and it can speak telepathically with each other while within a number of miles equal to your Charisma modifier (minimum 1 mile). The connection lasts for a number of minutes equal to your Warlock level."
            },
            {
                "level": 3,
                "name": "Great Old One Spells",
                "description": "When you reach a Warlock level listed in the Great Old One Spells table, you thereafter always have the listed spells prepared."
            },
            {
                "level": 3,
                "name": "Psychic Spells",
                "description": "When you cast a Warlock spell that deals damage, you can change its damage type to Psychic. In addition, when you cast a Warlock spell that is an Enchantment or Illusion, you can do so without Verbal or Somatic components."
            },
            {
                "level": 6,
                "name": "Clairvoyant Combatant",
                "description": "When you form a telepathic bond with a creature using Awakened Mind, you can force it to make a Wisdom saving throw against your spell save DC. On a failure, for the bond's duration it has Disadvantage on attack rolls against you and you have Advantage on attack rolls against it. Once used, you can't use this feature again until you finish a Short or Long Rest unless you expend a Pact Magic spell slot to restore it."
            },
            {
                "level": 10,
                "name": "Eldritch Hex",
                "description": "You always have Hex prepared. When you cast it and choose an ability, the target also has Disadvantage on saving throws of the chosen ability for the spell's duration."
            },
            {
                "level": 10,
                "name": "Thought Shield",
                "description": "Your thoughts can't be read by telepathy or other means unless you allow it. You also have Resistance to Psychic damage, and whenever a creature deals Psychic damage to you, that creature takes the same amount of damage that you take."
            },
            {
                "level": 14,
                "name": "Create Thrall",
                "description": "When you cast Summon Aberration, you can modify it so that it doesn't require Concentration; if you do so, the spell's duration becomes 1 minute for that casting, and when summoned the Aberration has a number of Temporary Hit Points equal to your Warlock level plus your Charisma modifier. In addition, the first time each turn the Aberration hits a creature under your Hex, it deals extra Psychic damage equal to the bonus damage of that spell."
            }
        ],
        "spells": [
            {
                "level": 3,
                "spellId": "detect-thoughts"
            },
            {
                "level": 3,
                "spellId": "dissonant-whispers"
            },
            {
                "level": 3,
                "spellId": "phantasmal-force"
            },
            {
                "level": 3,
                "spellId": "tashas-hideous-laughter"
            },
            {
                "level": 5,
                "spellId": "clairvoyance"
            },
            {
                "level": 5,
                "spellId": "hunger-of-hadar"
            },
            {
                "level": 7,
                "spellId": "confusion"
            },
            {
                "level": 7,
                "spellId": "summon-aberration"
            },
            {
                "level": 9,
                "spellId": "modify-memory"
            },
            {
                "level": 9,
                "spellId": "telekinesis"
            },
            {
                "level": 10,
                "spellId": "hex"
            }
        ]
    },
    {
        "id": "abjuration",
        "classId": "wizard",
        "name": "Abjurer",
        "description": "Abjurers study magic that blocks, banishes, or protects, using it to shield themselves and others.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Abjuration Savant",
                "description": "Choose two Wizard spells from the Abjuration school, each no higher than level 2, and add them to your spellbook for free. Whenever you gain access to a new level of spell slots, you can add one Abjuration spell of that level to your spellbook for free."
            },
            {
                "level": 3,
                "name": "Arcane Ward",
                "description": "When you cast an Abjuration spell with a spell slot, you can create a magical ward on yourself that lasts until you finish a Long Rest. The ward has a Hit Point maximum equal to twice your Wizard level plus your Intelligence modifier. Whenever you take damage, the ward takes the damage instead. When you cast an Abjuration spell with a spell slot, the ward regains Hit Points equal to twice the slot's level, and as a Bonus Action you can expend a spell slot to restore twice its level in Hit Points to the ward."
            },
            {
                "level": 6,
                "name": "Projected Ward",
                "description": "When a creature that you can see within 30 feet of yourself takes damage, you can take a Reaction to cause your Arcane Ward to absorb that damage."
            },
            {
                "level": 10,
                "name": "Spell Breaker",
                "description": "You always have Counterspell and Dispel Magic prepared. You can cast Dispel Magic as a Bonus Action, and you can add your Proficiency Bonus to its ability check. When you cast either spell with a spell slot, that slot isn't expended if the spell fails to stop a spell."
            },
            {
                "level": 14,
                "name": "Spell Resistance",
                "description": "You have Advantage on saving throws against spells, and you have Resistance to the damage of spells."
            }
        ],
        "spells": [
            {
                "level": 10,
                "spellId": "counterspell"
            },
            {
                "level": 10,
                "spellId": "dispel-magic"
            }
        ]
    },
    {
        "id": "divination",
        "classId": "wizard",
        "name": "Diviner",
        "description": "Diviners strive to penetrate the veils of space, the planes, and time, and to understand what lies beyond.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Divination Savant",
                "description": "Choose two Wizard spells from the Divination school, each no higher than level 2, and add them to your spellbook for free. Whenever you gain access to a new level of spell slots, you can add one Divination spell of that level to your spellbook for free."
            },
            {
                "level": 3,
                "name": "Portent",
                "description": "When you finish a Long Rest, roll two d20s and record the numbers. You can replace any D20 Test made by you or a creature that you can see with one of these foretelling rolls; you must choose to do so before the roll. Each foretelling roll can be used only once, and you lose any unused rolls when you finish a Long Rest."
            },
            {
                "level": 6,
                "name": "Expert Divination",
                "description": "When you cast a Divination spell using a level 2+ spell slot, you regain one expended spell slot. The slot you regain must be of a level lower than the slot you expended and can't be higher than level 5."
            },
            {
                "level": 10,
                "name": "The Third Eye",
                "description": "As a Bonus Action, choose one of the following benefits, which lasts until you start a Short or Long Rest: Darkvision (range 120 feet), Greater Comprehension (you can read any language), or See Invisibility (you can cast See Invisibility without a spell slot). You can't use this feature again until you finish a Short or Long Rest."
            },
            {
                "level": 14,
                "name": "Greater Portent",
                "description": "You roll three d20s for your Portent feature rather than two."
            }
        ]
    },
    {
        "id": "evocation",
        "classId": "wizard",
        "name": "Evoker",
        "description": "Evokers focus their study on magic that creates powerful elemental effects.",
        "source": "SRD 5.2",
        "features": [
            {
                "level": 3,
                "name": "Evocation Savant",
                "description": "Choose two Wizard spells from the Evocation school, each of which must be no higher than level 2, and add them to your spellbook for free.\nIn addition, whenever you gain access to a new level of spell slots in this class, you can add one Wizard spell from the Evocation school to your spellbook for free. The chosen spell must be of a level for which you have spell slots."
            },
            {
                "level": 3,
                "name": "Potent Cantrip",
                "description": "Your damaging cantrips affect even creatures that avoid the brunt of the effect. When you cast a cantrip at a creature and you miss with the attack roll or the target succeeds on a saving throw against the cantrip, the target takes half the cantrip's damage (if any) but suffers no additional effect from the cantrip."
            },
            {
                "level": 6,
                "name": "Sculpt Spells",
                "description": "You can create pockets of relative safety within the effects of your evocations. When you cast an Evocation spell that affects other creatures that you can see, you can choose a number of them equal to 1 plus the spell's level. The chosen creatures automatically succeed on their saving throws against the spell, and they take no damage if they would normally take half damage on a successful save."
            },
            {
                "level": 10,
                "name": "Empowered Evocation",
                "description": "Whenever you cast a Wizard spell from the Evocation school, you can add your Intelligence modifier to one damage roll of that spell."
            },
            {
                "level": 14,
                "name": "Overchannel",
                "description": "You can increase the power of your spells. When you cast a Wizard spell with a spell slot of levels 1-5 that deals damage, you can deal maximum damage with that spell on the turn you cast it.\nThe first time you do so, you suffer no adverse effect. If you use this feature again before you finish a Long Rest, you take 2d12 Necrotic damage for each level of the spell slot immediately after you cast it. This damage ignores Resistance and Immunity.\nEach time you use this feature again before finishing a Long Rest, the Necrotic damage per spell level increases by 1d12."
            }
        ]
    },
    {
        "id": "illusion",
        "classId": "wizard",
        "name": "Illusionist",
        "description": "Illusionists specialize in magic that dazzles the senses and tricks the mind.",
        "source": "PHB 2024",
        "features": [
            {
                "level": 3,
                "name": "Illusion Savant",
                "description": "Choose two Wizard spells from the Illusion school, each no higher than level 2, and add them to your spellbook for free. Whenever you gain access to a new level of spell slots, you can add one Illusion spell of that level to your spellbook for free."
            },
            {
                "level": 3,
                "name": "Improved Illusions",
                "description": "You can cast Illusion spells without providing Verbal components, and if an Illusion spell you cast has a range of 10+ feet, the range increases by 60 feet. You know the Minor Illusion cantrip (or another Wizard cantrip if you already know it), and you can cast it as a Bonus Action and create both a sound and an image with a single casting."
            },
            {
                "level": 6,
                "name": "Phantasmal Creatures",
                "description": "You always have Summon Beast and Summon Fey prepared. Whenever you cast either spell, you can change its school to Illusion, which causes the summoned creature to appear spectral. You can cast the Illusion version of each spell without expending a spell slot, but casting it without a slot halves the creature's Hit Points; once you cast either spell without a slot, you must finish a Long Rest before you can cast that spell in that way again."
            },
            {
                "level": 10,
                "name": "Illusory Self",
                "description": "When a creature hits you with an attack roll, you can take a Reaction to interpose an illusory duplicate of yourself between the attacker and yourself. The attack automatically misses you, then the illusion dissipates. Once used, you can't use this feature again until you finish a Short or Long Rest unless you expend a level 2+ spell slot to restore it."
            },
            {
                "level": 14,
                "name": "Illusory Reality",
                "description": "When you cast an Illusion spell with a spell slot, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real. You can do this on your turn as a Bonus Action while the spell is ongoing. The object remains real for 1 minute, during which it can't deal damage or give any conditions."
            }
        ],
        "spells": [
            {
                "level": 6,
                "spellId": "summon-beast"
            },
            {
                "level": 6,
                "spellId": "summon-fey"
            }
        ]
    },
    {
        "id": "totem",
        "classId": "barbarian",
        "name": "Path of the Totem Warrior",
        "description": "You revere a spirit animal and draw upon its power.",
        "features": [
            {
                "level": 3,
                "name": "Spirit Seeker",
                "description": "You have the ability to cast the beast sense and speak with animals spells, but only as rituals."
            },
            {
                "level": 3,
                "name": "Totem Spirit",
                "description": "You choose a totem spirit (Bear, Eagle, Elk, Tiger, Wolf) and gain its feature."
            },
            {
                "level": 6,
                "name": "Aspect of the Beast",
                "description": "You gain a magical benefit based on the totem animal of your choice."
            },
            {
                "level": 10,
                "name": "Spirit Walker",
                "description": "You can cast the commune with nature spell, but only as a ritual."
            },
            {
                "level": 14,
                "name": "Totemic Attunement",
                "description": "You gain a magical benefit based on the totem animal of your choice."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "gunslinger",
        "classId": "fighter",
        "name": "Gunslinger",
        "description": "You master experimental firearms and deadly trick shots on the battlefield.",
        "features": [
            {
                "level": 3,
                "name": "Firearm Proficiency & Gunsmith",
                "description": "You gain proficiency with firearms and tinker's tools, and you can craft, repair, and maintain firearms during rests."
            },
            {
                "level": 3,
                "name": "Adept Marksman",
                "description": "You gain a pool of grit points fueled by critical hits and finishing foes, which you spend to perform special trick shots with your firearms."
            },
            {
                "level": 7,
                "name": "Lightning Reload",
                "description": "You can reload one firearm you are holding as part of the Attack action or as a bonus action, and you have advantage on checks to clear misfires."
            },
            {
                "level": 10,
                "name": "Trick Shooter",
                "description": "Your trick shots improve; when you hit with a firearm attack, you can apply additional rider effects such as disarming, pushing, or hampering your target."
            },
            {
                "level": 15,
                "name": "Vicious Intent",
                "description": "Your firearm attacks score a critical hit on a roll of 19 or 20, and critical hits restore more grit to you."
            },
            {
                "level": 18,
                "name": "Hemorrhaging Critical",
                "description": "When you score a critical hit with a firearm, the target suffers bleeding wounds, taking extra damage each turn until it receives magical healing or a successful Medicine check."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "arcane_archer",
        "classId": "fighter",
        "name": "Arcane Archer",
        "description": "An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects.",
        "features": [
            {
                "level": 3,
                "name": "Arcane Archer Lore",
                "description": "You gain proficiency in the Arcana or Nature skill, and you learn either the Prestidigitation or Druidcraft cantrip."
            },
            {
                "level": 3,
                "name": "Arcane Shot",
                "description": "You prefer to unleash special magical effects with some of your shots. You gain two Arcane Shot options of your choice."
            },
            {
                "level": 7,
                "name": "Magic Arrow",
                "description": "Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage."
            },
            {
                "level": 7,
                "name": "Curving Shot",
                "description": "When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target."
            },
            {
                "level": 10,
                "name": "Additional Arcane Shot Option",
                "description": "You gain one additional Arcane Shot option of your choice."
            },
            {
                "level": 15,
                "name": "Ever-Ready Shot",
                "description": "Starting at 15th level, your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it."
            },
            {
                "level": 18,
                "name": "Improved Arcane Shot",
                "description": "Your Arcane Shot options improve and become more powerful."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "banneret",
        "classId": "fighter",
        "name": "Banneret (Purple Dragon Knight)",
        "description": "Bannerets are knights who inspire their allies to greatness through their own heroic deeds.",
        "features": [
            {
                "level": 3,
                "name": "Rallying Cry",
                "description": "When you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level."
            },
            {
                "level": 7,
                "name": "Royal Envoy",
                "description": "You gain proficiency in the Persuasion skill. If you are already proficient in it, you gain proficiency in one of the following skills of your choice: Animal Handling, Insight, Intimidation, or Performance. Your proficiency bonus is doubled for any ability check you make that uses Persuasion."
            },
            {
                "level": 10,
                "name": "Inspiring Surge",
                "description": "When you use your Action Surge feature, you can choose one creature within 60 feet of you that is allied with you. That creature can make one melee or ranged weapon attack with its reaction."
            },
            {
                "level": 15,
                "name": "Bulwark",
                "description": "When you decide to use your Indomitable feature to reroll an Intelligence, a Wisdom, or a Charisma saving throw and you aren't incapacitated, you can choose one ally within 60 feet of you that also failed its saving throw against the same effect. If that creature can see or hear you, it can reroll its saving throw and must use the new roll."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "cavalier",
        "classId": "fighter",
        "name": "Cavalier",
        "description": "The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner.",
        "features": [
            {
                "level": 3,
                "name": "Bonus Proficiency",
                "description": "You gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice."
            },
            {
                "level": 3,
                "name": "Born to the Saddle",
                "description": "You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you're not incapacitated. Mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed."
            },
            {
                "level": 3,
                "name": "Unwavering Mark",
                "description": "When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature."
            },
            {
                "level": 7,
                "name": "Warding Maneuver",
                "description": "If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you're wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target's AC against that attack. If the attack still hits, the target has resistance against the attack's damage."
            },
            {
                "level": 10,
                "name": "Hold the Line",
                "description": "Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target's speed is reduced to 0 until the end of the current turn."
            },
            {
                "level": 15,
                "name": "Ferocious Charger",
                "description": "If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone."
            },
            {
                "level": 18,
                "name": "Vigilant Defender",
                "description": "You answer an enemy's attack with a riposte. In combat, you get a special reaction that you can take once on every creature's turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can't use it on the same turn that you take your normal reaction."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "echo_knight",
        "classId": "fighter",
        "name": "Echo Knight",
        "description": "A mysterious disciple of the Dunamancy school of magic, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle.",
        "features": [
            {
                "level": 3,
                "name": "Manifest Echo",
                "description": "You can use a bonus action to magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you're incapacitated."
            },
            {
                "level": 3,
                "name": "Unleash Incarnation",
                "description": "You can heighten your echo's fury. Whenever you take the Attack action, you can make one additional melee attack from the echo's position. You can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest."
            },
            {
                "level": 7,
                "name": "Echo Avatar",
                "description": "You can temporarily transfer your consciousness to your echo. As an action, you can see through your echo's eyes and hear through its ears."
            },
            {
                "level": 10,
                "name": "Shadow Martyr",
                "description": "You can make your echo throw itself in front of an attack directed at another creature that you can see. Before an attack roll is made, you can use your reaction to teleport the echo to an unoccupied space within 5 feet of the targeted creature. The attack roll that triggered the reaction is instead made against your echo."
            },
            {
                "level": 15,
                "name": "Reclaim Potential",
                "description": "You've learned to absorb the fleeting magic of your echo. When an echo of yours is destroyed by taking damage, you can gain a number of temporary hit points equal to 2d6 + your Constitution modifier, provided you don't already have temporary hit points."
            },
            {
                "level": 18,
                "name": "Legion of One",
                "description": "You can use a bonus action to create two echoes with your Manifest Echo feature, and these echoes can coexist. If you try to create a third echo, the previous two echoes are destroyed. Anything you can do from one echo's position can be done from the other's instead."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "rune_knight",
        "classId": "fighter",
        "name": "Rune Knight",
        "description": "Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants.",
        "features": [
            {
                "level": 3,
                "name": "Mone of the Rune Carver",
                "description": "You can use smith's tools or calligrapher's supplies to craft runes."
            },
            {
                "level": 3,
                "name": "Rune Carver",
                "description": "You learn how to use runes to enhance your gear. You know two runes of your choice."
            },
            {
                "level": 3,
                "name": "Giant's Might",
                "description": "You can imbue yourself with the might of giants. As a bonus action, you magically gain the following benefits, which last for 1 minute: If you are smaller than Large, you become Large, along with anything you are wearing. If you lack the room to become Large, your size doesn't change."
            },
            {
                "level": 7,
                "name": "Runic Shield",
                "description": "You learn to invoke your rune magic to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to force the attacker to reroll the d20 and use the new roll."
            },
            {
                "level": 10,
                "name": "Great Stature",
                "description": "The magic of your runes permanently alters you. When you gain this feature, you roll 3d4. You grow a number of inches in height equal to the roll. Moreover, the extra damage you deal with your Giant's Might feature increases to 1d8."
            },
            {
                "level": 15,
                "name": "Master of Runes",
                "description": "You can invoke each rune you know from your Rune Carver feature twice, rather than once, and you regain all expended uses when you finish a short or long rest."
            },
            {
                "level": 18,
                "name": "Runic Juggernaut",
                "description": "You learn how to amplify your rune-powered transformation. As a result, the extra damage you deal with the Giant's Might feature increases to 1d10. Moreover, when you use that feature, your size can increase to Huge, and while you are that size, your reach increases by 5 feet."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "samurai",
        "classId": "fighter",
        "name": "Samurai",
        "description": "The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies.",
        "features": [
            {
                "level": 3,
                "name": "Bonus Proficiency",
                "description": "You gain proficiency in one of the following skills of your choice: History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice."
            },
            {
                "level": 3,
                "name": "Fighting Spirit",
                "description": "As a bonus action on your turn, you can give yourself advantage on weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points."
            },
            {
                "level": 7,
                "name": "Elegant Courtier",
                "description": "You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice)."
            },
            {
                "level": 10,
                "name": "Tireless Spirit",
                "description": "When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use."
            },
            {
                "level": 15,
                "name": "Rapid Strike",
                "description": "You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action."
            },
            {
                "level": 18,
                "name": "Strength Before Death",
                "description": "If you take damage that reduces you to 0 hit points and doesn't kill you outright, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn, interrupting the current turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "divine_soul",
        "classId": "sorcerer",
        "name": "Divine Soul",
        "description": "Sometimes the spark of magic that fuels a sorcerer comes from a divine source that glimmers within the soul.",
        "features": [
            {
                "level": 3,
                "name": "Divine Magic",
                "description": "Your link to the divine allows you to learn spells from the cleric class. When your Spellcasting feature lets you learn or replace a sorcerer cantrip or a sorcerer spell of 1st level or higher, you can choose the new spell from the cleric spell list or the sorcerer spell list."
            },
            {
                "level": 3,
                "name": "Favored by the Gods",
                "description": "If you fail a saving throw or miss with an attack roll, you can roll 2d4 and add it to the total, possibly changing the outcome."
            },
            {
                "level": 6,
                "name": "Empowered Healing",
                "description": "Whenever you or an ally within 5 feet of you rolls dice to determine the number of hit points a spell restores, you can spend 1 sorcery point to reroll any number of those dice once."
            },
            {
                "level": 14,
                "name": "Otherworldly Wings",
                "description": "You can use a bonus action to manifest a pair of spectral wings from your back. While the wings are present, you have a flying speed of 30 feet."
            },
            {
                "level": 18,
                "name": "Unearthly Recovery",
                "description": "You gain the ability to overcome grievous injuries. As a bonus action when you have fewer than half of your hit points remaining, you can regain a number of hit points equal to half your hit point maximum."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "lunar_sorcery",
        "classId": "sorcerer",
        "name": "Lunar Sorcery",
        "description": "On many worlds, the moon is a revered celestial body with magical properties. You draw on this power.",
        "features": [
            {
                "level": 3,
                "name": "Lunar Embodiment",
                "description": "You learn additional spells based on the phase of the moon: Full Moon, New Moon, or Crescent Moon."
            },
            {
                "level": 3,
                "name": "Moon Fire",
                "description": "You can call down the radiant light of the moon. You learn the sacred flame spell, which doesn't count against the number of sorcerer cantrips you know."
            },
            {
                "level": 6,
                "name": "Lunar Boons",
                "description": "The current phase of your Lunar Embodiment has an effect on your metamagic."
            },
            {
                "level": 6,
                "name": "Waxing and Waning",
                "description": "You can change your Lunar Embodiment phase as a bonus action."
            },
            {
                "level": 14,
                "name": "Lunar Empowerment",
                "description": "The power of a lunar phase saturates your being. Full Moon: You can use a bonus action to shed bright light. New Moon: You have advantage on Stealth checks. Crescent Moon: You have resistance to necrotic and radiant damage."
            },
            {
                "level": 18,
                "name": "Lunar Phenomenon",
                "description": "As a bonus action, you can tap into a special power of your current Lunar Embodiment phase. Full Moon: Blinding burst of light. New Moon: Gloom and damage. Crescent Moon: Teleportation."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "shadow_magic",
        "classId": "sorcerer",
        "name": "Shadow Magic",
        "description": "You are a creature of shadow, for your innate magic comes from the Shadowfell itself.",
        "features": [
            {
                "level": 3,
                "name": "Eyes of the Dark",
                "description": "You have darkvision with a range of 120 feet."
            },
            {
                "level": 3,
                "name": "Strength of the Grave",
                "description": "When damage reduces you to 0 hit points, you can make a Charisma saving throw (DC 5 + the damage taken). On a success, you instead drop to 1 hit point. You can't use this feature if you are reduced to 0 hit points by radiant damage or by a critical hit."
            },
            {
                "level": 3,
                "name": "Darkness",
                "description": "You learn the darkness spell, which doesn't count against your number of sorcerer spells known. You can cast it by spending 2 sorcery points or by expending a spell slot. If you cast it with sorcery points, you can see through the darkness created by the spell."
            },
            {
                "level": 6,
                "name": "Hound of Ill Omen",
                "description": "As a bonus action, you can spend 3 sorcery points to summon a hound of ill omen to target one creature you can see within 120 feet of you."
            },
            {
                "level": 14,
                "name": "Shadow Walk",
                "description": "At 14th level, you gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action, you can teleport up to 120 feet to an unoccupied space you can see that is also in dim light or darkness."
            },
            {
                "level": 18,
                "name": "Umbral Form",
                "description": "You can spend 6 sorcery points as a bonus action to transform yourself into a shadowy form. In this form, you have resistance to all damage except force and radiant damage, and you can move through other creatures and objects as if they were difficult terrain."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "storm_sorcery",
        "classId": "sorcerer",
        "name": "Storm Sorcery",
        "description": "Your innate magic comes from the power of elemental air.",
        "features": [
            {
                "level": 3,
                "name": "Wind Speaker",
                "description": "The arcane magic you command is infused with elemental air. You can speak, read, and write Primordial."
            },
            {
                "level": 3,
                "name": "Tempestuous Magic",
                "description": "You can use a bonus action on your turn to cause whirling gusts of elemental air to briefly surround you, immediately before or after you cast a spell of 1st level or higher. Doing so allows you to fly up to 10 feet without provoking opportunity attacks."
            },
            {
                "level": 6,
                "name": "Heart of the Storm",
                "description": "You gain resistance to lightning and thunder damage. In addition, whenever you start casting a spell of 1st level or higher that deals lightning or thunder damage, stormy magic erupts from you."
            },
            {
                "level": 6,
                "name": "Storm Guide",
                "description": "You gain the ability to subtly control the weather. If it is raining, you can use an action to cause the rain to stop falling in a 20-foot-radius sphere centered on you."
            },
            {
                "level": 14,
                "name": "Storm's Fury",
                "description": "When you are hit by a melee attack, you can use your reaction to deal lightning damage to the attacker. The attacker must also make a Strength saving throw or be pushed up to 20 feet away from you."
            },
            {
                "level": 18,
                "name": "Wind Soul",
                "description": "You have immunity to lightning and thunder damage. You also gain a magical flying speed of 60 feet."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "inquisitive",
        "classId": "rogue",
        "name": "Inquisitive",
        "description": "As an archetypal Inquisitive, you excel at rooting out secrets and unraveling mysteries.",
        "features": [
            {
                "level": 3,
                "name": "Ear for Deceit",
                "description": "Whenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8."
            },
            {
                "level": 3,
                "name": "Eye for Detail",
                "description": "You can use a bonus action to make a Wisdom (Perception) check to spot a hidden creature or object or to make an Intelligence (Investigation) check to uncover or decipher clues."
            },
            {
                "level": 3,
                "name": "Insightful Fighting",
                "description": "As a bonus action, you can make a Wisdom (Insight) check against a creature you can see that isn't incapacitated, contested by the target's Charisma (Deception) check. If you succeed, you can use your Sneak Attack against that target even if you don't have advantage on the attack roll, but not if you have disadvantage on it."
            },
            {
                "level": 9,
                "name": "Steady Eye",
                "description": "You have advantage on any Wisdom (Perception) or Intelligence (Investigation) check if you move no more than half your speed on the same turn."
            },
            {
                "level": 13,
                "name": "Unerring Eye",
                "description": "You can sense the presence of illusions, shapechangers not in their original form, and other magic designed to deceive the senses within 30 feet of you, provided you aren't blinded or deafened."
            },
            {
                "level": 17,
                "name": "Eye for Weakness",
                "description": "While your Insightful Fighting feature applies to a creature, your Sneak Attack damage against that creature increases by 3d6."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "mastermind",
        "classId": "rogue",
        "name": "Mastermind",
        "description": "Your focus is on people and on the influence and secrets they have.",
        "features": [
            {
                "level": 3,
                "name": "Master of Intrigue",
                "description": "You gain proficiency with the disguise kit, the forgery kit, and one gaming set of your choice. You also learn two languages of your choice. Additionally, you can unerringly mimic the speech patterns and accent of a creature that you hear speak for at least 1 minute."
            },
            {
                "level": 3,
                "name": "Master of Tactics",
                "description": "You can use the Help action as a bonus action. Additionally, when you use the Help action to aid an ally in attacking a creature, the target of that attack can be within 30 feet of you, rather than within 5 feet of you, if the target can see or hear you."
            },
            {
                "level": 9,
                "name": "Insightful Manipulator",
                "description": "If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own."
            },
            {
                "level": 13,
                "name": "Misdirection",
                "description": "You can sometimes cause another creature to suffer an attack meant for you. When you are targeted by an attack while a creature within 5 feet of you is granting you cover against that attack, you can use your reaction to have the attack target that creature instead of you."
            },
            {
                "level": 17,
                "name": "Soul of Deceit",
                "description": "Your thoughts can't be read by telepathy or other means unless you allow it. You can present false thoughts by succeeding on a Charisma (Deception) check against the mind reader's Wisdom (Insight) check. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "phantom",
        "classId": "rogue",
        "name": "Phantom",
        "description": "Many rogues walk a fine line between life and death, but a Phantom takes that walk one step further, casually risking contact with undead spirits.",
        "features": [
            {
                "level": 3,
                "name": "Whispers of the Dead",
                "description": "When you finish a short or long rest, you can choose one skill or tool proficiency that you lack and gain it, as a ghostly presence shares its knowledge with you."
            },
            {
                "level": 3,
                "name": "Wails from the Grave",
                "description": "As you nudge someone closer to the grave, you can channel the power of death to harm someone else as well. Immediately after you deal your Sneak Attack damage to a creature on your turn, you can target a second creature that you can see within 30 feet of the first creature. Roll half the number of Sneak Attack dice for your level (round up), and the second creature takes necrotic damage equal to the roll's total."
            },
            {
                "level": 9,
                "name": "Tokens of the Departed",
                "description": "When a life ends in your presence, you're able to snatch a token from the departing soul, a sliver of its life essence that takes physical form: as a reaction when a creature you can see dies within 30 feet of you, you can open a free hand and cause a tiny trinket to appear there, a soul trinket."
            },
            {
                "level": 13,
                "name": "Ghost Walk",
                "description": "You can phase partially into the realm of the dead, becoming like a ghost. As a bonus action, you assume a spectral form. While in this form, you have a flying speed of 10 feet, you can hover, and attack rolls have disadvantage against you. You can also move through creatures and objects as if they were difficult terrain."
            },
            {
                "level": 17,
                "name": "Death's Friend",
                "description": "Your association with death has become so close that you gain the following benefits: At the end of a long rest, a soul trinket appears in your hand if you don't have one. When you use your Wails from the Grave feature, you can deal the necrotic damage to both the first and the second creature."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "scout",
        "classId": "rogue",
        "name": "Scout",
        "description": "You are skilled in stealth and surviving far from the streets of a city, allowing you to scout ahead of your companions during expeditions.",
        "features": [
            {
                "level": 3,
                "name": "Skirmisher",
                "description": "You can move up to half your speed as a reaction when an enemy ends its turn within 5 feet of you. This movement doesn't provoke opportunity attacks."
            },
            {
                "level": 3,
                "name": "Survivalist",
                "description": "You gain proficiency in the Nature and Survival skills. Your proficiency bonus is doubled for any ability check you make that uses either of those proficiencies."
            },
            {
                "level": 9,
                "name": "Superior Mobility",
                "description": "Your walking speed increases by 10 feet. If you have a climbing or swimming speed, this increase applies to that speed as well."
            },
            {
                "level": 13,
                "name": "Ambush Master",
                "description": "You have advantage on initiative rolls. In addition, the first creature you hit during the first round of a combat becomes easier for you and others to strike; attack rolls against that target have advantage until the start of your next turn."
            },
            {
                "level": 17,
                "name": "Sudden Strike",
                "description": "If you take the Attack action on your turn, you can make one additional attack as a bonus action. This attack can benefit from your Sneak Attack even if you have already used it this turn, but you can't use your Sneak Attack against the same target more than once in a turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "swashbuckler",
        "classId": "rogue",
        "name": "Swashbuckler",
        "description": "You focus your training on the art of the blade, relying on speed, elegance, and charm in equal parts.",
        "features": [
            {
                "level": 3,
                "name": "Fancy Footwork",
                "description": "During your turn, if you make a melee attack against a creature, that creature can't make opportunity attacks against you for the rest of your turn."
            },
            {
                "level": 3,
                "name": "Rakish Audacity",
                "description": "Your confidence propels you into battle. You can give yourself a bonus to your initiative rolls equal to your Charisma modifier. You also gain an additional way to use your Sneak Attack; you don't need advantage on the attack roll to use your Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don't have disadvantage on the attack roll."
            },
            {
                "level": 9,
                "name": "Panache",
                "description": "Your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature's Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language. If you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can't make opportunity attacks against targets other than you."
            },
            {
                "level": 13,
                "name": "Elegant Maneuver",
                "description": "You can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn."
            },
            {
                "level": 17,
                "name": "Master Duelist",
                "description": "Your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can't use this feature again until you finish a short or long rest."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "arcana",
        "classId": "cleric",
        "name": "Arcana Domain",
        "description": "Magic is an energy that suffuses the multiverse and that fuels both destruction and creation. Gods of the Arcana domain know the secrets and potential of magic intimately.",
        "features": [
            {
                "level": 3,
                "name": "Arcane Initiate",
                "description": "You gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Arcane Abjuration",
                "description": "As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage."
            },
            {
                "level": 6,
                "name": "Spell Breaker",
                "description": "When you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell."
            },
            {
                "level": 17,
                "name": "Arcane Mastery",
                "description": "You choose four spells from the wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "death",
        "classId": "cleric",
        "name": "Death Domain",
        "description": "The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures.",
        "features": [
            {
                "level": 3,
                "name": "Reaper",
                "description": "You learn one necromancy cantrip of your choice from any spell list. When you cast a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Touch of Death",
                "description": "When you hit a creature with a melee attack, you can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice your cleric level."
            },
            {
                "level": 6,
                "name": "Inescapable Destruction",
                "description": "Necrotic damage dealt by your cleric spells and Channel Divinity options ignores resistance to necrotic damage."
            },
            {
                "level": 17,
                "name": "Improved Reaper",
                "description": "When you cast a necromancy spell of 1st through 5th level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, you must provide them for each target."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "forge",
        "classId": "cleric",
        "name": "Forge Domain",
        "description": "The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith to a mighty elven artisan.",
        "features": [
            {
                "level": 3,
                "name": "Blessing of the Forge",
                "description": "At the end of a long rest, you can touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest or until you die, the object becomes a magic item, granting a +1 bonus to AC if it's armor or a +1 bonus to attack and damage rolls if it's a weapon."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Artisan's Blessing",
                "description": "You can use your Channel Divinity to create simple items. You conduct an hour-long ritual that crafts a nonmagical item that must include some metal: a simple or martial weapon, a suit of armor, ten pieces of ammunition, a set of tools, or another metal object."
            },
            {
                "level": 6,
                "name": "Soul of the Forge",
                "description": "You gain resistance to fire damage. While wearing heavy armor, you gain a +1 bonus to AC."
            },
            {
                "level": 17,
                "name": "Saint of Forge and Fire",
                "description": "You gain immunity to fire damage. While wearing heavy armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "grave",
        "classId": "cleric",
        "name": "Grave Domain",
        "description": "Gods of the grave watch over the line between life and death. To these deities, death and the afterlife are a foundational part of the multiverse.",
        "features": [
            {
                "level": 3,
                "name": "Circle of Mortality",
                "description": "When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die. You also learn the spare the dying cantrip, which has a range of 30 feet for you, and it doesn't count against the number of cleric cantrips you know."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Path to the Grave",
                "description": "As an action, you choose one creature you can see within 30 feet of you, cursing it until the end of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack's damage, and then the curse ends."
            },
            {
                "level": 6,
                "name": "Sentinel at Death's Door",
                "description": "As a reaction when you or a creature you can see within 30 feet of you suffers a critical hit, you can turn that hit into a normal hit. Any effects triggered by a critical hit are canceled."
            },
            {
                "level": 17,
                "name": "Keeper of Souls",
                "description": "When an enemy you can see dies within 60 feet of you, you or one creature of your choice that is within 60 feet of you regains hit points equal to the enemy's number of Hit Dice. You can use this feature only if you aren't incapacitated. Once you use it, you can't do so again until the start of your next turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "knowledge",
        "classId": "cleric",
        "name": "Knowledge Domain",
        "description": "The gods of knowledge—including Oghma, Boccob, Gilean, Aureon, and Thoth—value learning and understanding above all.",
        "features": [
            {
                "level": 3,
                "name": "Blessings of Knowledge",
                "description": "You learn two languages of your choice. You also become proficient in your choice of two specific skills, and your proficiency bonus is doubled for any ability check you make that uses either of those skills."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Knowledge of the Ages",
                "description": "You can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool."
            },
            {
                "level": 6,
                "name": "Channel Divinity: Read Thoughts",
                "description": "You can use your Channel Divinity to read a creature's thoughts. You can then use your action to force the creature to make a Wisdom saving throw."
            },
            {
                "level": 17,
                "name": "Visions of the Past",
                "description": "You can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "nature",
        "classId": "cleric",
        "name": "Nature Domain",
        "description": "Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests to friendly deities associated with particular springs and groves.",
        "features": [
            {
                "level": 3,
                "name": "Acolyte of Nature",
                "description": "You learn one druid cantrip of your choice. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival. You gain proficiency with heavy armor."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Charm Animals and Plants",
                "description": "As an action, you present your holy symbol and invoke the name of your deity. Each beast and plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage."
            },
            {
                "level": 6,
                "name": "Dampen Elements",
                "description": "When you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage."
            },
            {
                "level": 17,
                "name": "Master of Nature",
                "description": "You gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "order",
        "classId": "cleric",
        "name": "Order Domain",
        "description": "The Order domain represents discipline, as well as devotion to the laws that govern a society, an institution, or the universe itself.",
        "features": [
            {
                "level": 3,
                "name": "Voice of Authority",
                "description": "You can invoke the power of law to embolden an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Order's Demand",
                "description": "As an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any charmed creature to drop what it is holding when it fails the saving throw."
            },
            {
                "level": 6,
                "name": "Embodiment of the Law",
                "description": "You become remarkably adept at channeling magical energy to compel others. If you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell's casting time to 1 bonus action for this casting, provided the spell's casting time is normally 1 action."
            },
            {
                "level": 17,
                "name": "Order's Wrath",
                "description": "If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target takes an extra 2d8 psychic damage, and the curse ends."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "peace",
        "classId": "cleric",
        "name": "Peace Domain",
        "description": "The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted.",
        "features": [
            {
                "level": 3,
                "name": "Emboldening Bond",
                "description": "You can forge an empowering bond among people who are at peace with one another. As an action, you choose a number of willing creatures within 30 feet of you equal to your proficiency bonus. For 10 minutes, the creature can add a d4 to an attack roll, an ability check, or a saving throw it makes."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Balm of Peace",
                "description": "As an action, you can move up to your speed, without provoking opportunity attacks, and when you move within 5 feet of any other creature during this action, you can restore a number of hit points to that creature equal to 2d6 + your Wisdom modifier."
            },
            {
                "level": 6,
                "name": "Protective Bond",
                "description": "When a creature affected by your Emboldening Bond feature is about to take damage, a second bonded creature within 30 feet of the first can use its reaction to teleport to an unoccupied space within 5 feet of the first creature. The second creature then takes all the damage instead."
            },
            {
                "level": 17,
                "name": "Expansive Bond",
                "description": "The benefits of your Emboldening Bond and Protective Bond features now work when the creatures are within 60 feet of each other. Moreover, when a creature uses Protective Bond to take someone else's damage, the creature has resistance to that damage."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "tempest",
        "classId": "cleric",
        "name": "Tempest Domain",
        "description": "Gods whose portfolios include the Tempest domain govern storms, sea, and sky.",
        "features": [
            {
                "level": 3,
                "name": "Wrath of the Storm",
                "description": "Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, or half as much damage on a successful one."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Destructive Wrath",
                "description": "When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling."
            },
            {
                "level": 6,
                "name": "Thunderbolt Strike",
                "description": "When you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you."
            },
            {
                "level": 17,
                "name": "Stormborn",
                "description": "You have a flying speed equal to your current walking speed whenever you are not underground or indoors."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "twilight",
        "classId": "cleric",
        "name": "Twilight Domain",
        "description": "The Twilight domain governs the transition and blending of light into darkness. It is a time of rest and comfort, but also a time when safety and familiarity drift into the unknown.",
        "features": [
            {
                "level": 3,
                "name": "Eyes of Night",
                "description": "You can see through the deepest gloom. You have darkvision out to a range of 300 feet. In that radius, you can see in dim light as if it were bright light and in darkness as if it were dim light. As an action, you can magically share the darkvision of this feature with willing creatures you can see within 10 feet of you, up to a number of creatures equal to your Wisdom modifier (minimum of one creature)."
            },
            {
                "level": 3,
                "name": "Vigilant Blessing",
                "description": "You can give one creature you touch (including possibly yourself) advantage on the next initiative roll the creature makes. This benefit ends immediately after the roll or if you use this feature again."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Twilight Sanctuary",
                "description": "You can use your Channel Divinity to refresh your allies with soothing twilight. As an action, you present your holy symbol, and a sphere of twilight emanates from you. The sphere is centered on you, has a 30-foot radius, and is filled with dim light. The sphere moves with you, and it lasts for 1 minute or until you are incapacitated or die."
            },
            {
                "level": 6,
                "name": "Part of the Night",
                "description": "You can use a bonus action to turn into a shadowy form that gives you a flying speed equal to your walking speed. You can stay in this form for 1 minute or until you revert to your normal form as a bonus action."
            },
            {
                "level": 6,
                "name": "Steps of Night",
                "description": "You can draw on the mystical power of the night to rise into the air. As a bonus action when you are in dim light or darkness, you can magically give yourself a flying speed equal to your walking speed for 1 minute."
            },
            {
                "level": 17,
                "name": "Twilight Shroud",
                "description": "The twilight that you summon offers a protective embrace: You and your allies have half cover while in the sphere created by your Twilight Sanctuary."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "conquest",
        "classId": "paladin",
        "name": "Oath of Conquest",
        "description": "The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies.",
        "features": [
            {
                "level": 3,
                "name": "Channel Divinity: Conquering Presence",
                "description": "You can use your Channel Divinity to exude a terrifying presence. As an action, you force each creature of your choice that you can see within 30 feet of you to make a Wisdom saving throw. On a failed save, a creature becomes frightened of you for 1 minute."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Guided Strike",
                "description": "You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses."
            },
            {
                "level": 7,
                "name": "Aura of Conquest",
                "description": "You constantly emanate a menacing aura while you're not incapacitated. The aura extends 10 feet from you in every direction, but not through total cover. If a creature is frightened of you, its speed is reduced to 0 while in the aura, and that creature takes psychic damage equal to half your paladin level if it starts its turn there."
            },
            {
                "level": 15,
                "name": "Scornful Rebuke",
                "description": "Whenever a creature hits you with an attack, that creature takes psychic damage equal to your Charisma modifier (minimum of 1) if you're not incapacitated."
            },
            {
                "level": 20,
                "name": "Invincible Conqueror",
                "description": "You gain the ability to harness extraordinary martial prowess. As an action, you can magically become an avatar of conquest, gaining resistance to all damage, an extra attack, and improved criticals for 1 minute."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "crown",
        "classId": "paladin",
        "name": "Oath of the Crown",
        "description": "The Oath of the Crown is sworn to the ideals of civilization, be it the spirit of a nation, the fealty owed to a sovereign, or the service to a deity of law and rulership.",
        "features": [
            {
                "level": 3,
                "name": "Channel Divinity: Champion Challenge",
                "description": "As a bonus action, you issue a challenge that compels other creatures to do battle with you. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can't willingly move more than 30 feet away from you."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Turn the Tide",
                "description": "As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points."
            },
            {
                "level": 7,
                "name": "Divine Allegiance",
                "description": "When a creature within 5 feet of you takes damage, you can use your reaction to magically substitute your own health for that of the target creature, causing that creature to take no damage. Instead, you take the damage. This damage to you can't be reduced or prevented in any way."
            },
            {
                "level": 15,
                "name": "Unyielding Spirit",
                "description": "You have advantage on saving throws to avoid being paralyzed or stunned."
            },
            {
                "level": 20,
                "name": "Exalted Champion",
                "description": "You can use your action to gain the following benefits for 1 hour: resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons; your allies within 30 feet of you have advantage on death saving throws and Wisdom saving throws."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "redemption",
        "classId": "paladin",
        "name": "Oath of Redemption",
        "description": "The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort.",
        "features": [
            {
                "level": 3,
                "name": "Channel Divinity: Emissary of Peace",
                "description": "You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Rebuke the Violent",
                "description": "You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage."
            },
            {
                "level": 7,
                "name": "Aura of the Guardian",
                "description": "When a creature within 10 feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn't transfer any other effects that might accompany the damage, and this damage can't be reduced in any way."
            },
            {
                "level": 15,
                "name": "Protective Spirit",
                "description": "You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren't incapacitated."
            },
            {
                "level": 20,
                "name": "Emissary of Redemption",
                "description": "You become an avatar of peace, which gives you two benefits: You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects), and whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "watchers",
        "classId": "paladin",
        "name": "Oath of the Watchers",
        "description": "The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures.",
        "features": [
            {
                "level": 3,
                "name": "Channel Divinity: Watcher's Will",
                "description": "You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Abjure the Extraplanar",
                "description": "You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage."
            },
            {
                "level": 7,
                "name": "Aura of the Sentinel",
                "description": "You emit an aura of alertness while you aren't incapacitated. When you and any creatures of your choice within 10 feet of you roll initiative, you all gain a bonus to initiative equal to your proficiency bonus."
            },
            {
                "level": 15,
                "name": "Vigilant Rebuke",
                "description": "You've learned how to chastise anyone who dares wield beguilements against you and your wards. Whenever you or a creature you can see within 30 feet of you succeeds on an Intelligence, a Wisdom, or a Charisma saving throw, you can use your reaction to deal 2d8 + your Charisma modifier force damage to the creature that forced the saving throw."
            },
            {
                "level": 20,
                "name": "Mortal Bulwark",
                "description": "You manifest a spark of divine power in defense of the mortal realms. As a bonus action, you gain the following benefits for 1 minute: You gain truesight with a range of 120 feet, and you have advantage on attack rolls against celestials, elementals, fey, and fiends."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "oathbreaker",
        "classId": "paladin",
        "name": "Oathbreaker",
        "description": "An Oathbreaker is a paladin who breaks their sacred oaths to pursue some dark ambition or serve an evil power.",
        "features": [
            {
                "level": 3,
                "name": "Channel Divinity: Control Undead",
                "description": "As an action, the paladin targets one undead creature they can see within 30 feet of them. The target must make a Wisdom saving throw. On a failed save, the target must obey the paladin's commands for the next 24 hours, or until the paladin uses this Channel Divinity option again."
            },
            {
                "level": 3,
                "name": "Channel Divinity: Dreadful Aspect",
                "description": "As an action, the paladin channels the darkest emotions and focuses them into a burst of magical menace. Each creature of the paladin's choice within 30 feet of the paladin must make a Wisdom saving throw if it can see the paladin. On a failed save, the target is frightened of the paladin for 1 minute."
            },
            {
                "level": 7,
                "name": "Aura of Hate",
                "description": "The paladin, as well as any fiends and undead within 10 feet of the paladin, gains a bonus to melee weapon damage rolls equal to the paladin's Charisma modifier (minimum of +1)."
            },
            {
                "level": 15,
                "name": "Supernatural Resistance",
                "description": "The paladin gains resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons."
            },
            {
                "level": 20,
                "name": "Dread Lord",
                "description": "The paladin can use an action to surround themselves with an aura of gloom that lasts for 1 minute. The aura reduces bright light to dim light within 30 feet of the paladin. Whenever an enemy that is frightened by the paladin starts its turn in the aura, it takes 4d10 psychic damage."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "horizon_walker",
        "classId": "ranger",
        "name": "Horizon Walker",
        "description": "Horizon Walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic.",
        "features": [
            {
                "level": 3,
                "name": "Detect Portal",
                "description": "As an action, you detect the distance and direction to the closest planar portal within 1 mile of you. You also sense which plane of existence the portal leads to."
            },
            {
                "level": 3,
                "name": "Planar Warrior",
                "description": "As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack."
            },
            {
                "level": 7,
                "name": "Ethereal Step",
                "description": "As a bonus action, you can cast the etherealness spell with this feature, without expending a spell slot, but the spell ends at the end of the current turn."
            },
            {
                "level": 11,
                "name": "Distant Strike",
                "description": "When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see. If you attack at least two different creatures with the action, you can make one additional attack with it against a third creature."
            },
            {
                "level": 15,
                "name": "Spectral Defense",
                "description": "When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack's damage on this turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "monster_slayer",
        "classId": "ranger",
        "name": "Monster Slayer",
        "description": "You have dedicated yourself to hunting down creatures of the night and wielders of grim magic.",
        "features": [
            {
                "level": 3,
                "name": "Hunter's Sense",
                "description": "As an action, choose one creature you can see within 60 feet of you. You immediately learn whether the creature has any damage immunities, resistances, or vulnerabilities and what they are. You can use this feature a number of times equal to your Wisdom modifier (minimum of once)."
            },
            {
                "level": 3,
                "name": "Slayer's Prey",
                "description": "As a bonus action, you designate one creature you can see within 60 feet of you as the target of this feature. The first time each turn that you hit that target with a weapon attack, it takes an extra 1d6 damage from the weapon."
            },
            {
                "level": 7,
                "name": "Supernatural Defense",
                "description": "Whenever the target of your Slayer's Prey forces you to make a saving throw and whenever you make an ability check to escape that target's grapple, add 1d6 to your roll."
            },
            {
                "level": 11,
                "name": "Magic-User's Nemesis",
                "description": "When you see a creature casting a spell or teleporting within 60 feet of you, you can use your reaction to try to magically foil it. The creature must succeed on a Wisdom saving throw against your spell save DC, or its spell or teleport fails and is wasted."
            },
            {
                "level": 15,
                "name": "Slayer's Counter",
                "description": "If the target of your Slayer's Prey forces you to make a saving throw, you can use your reaction to make one weapon attack against the quarry. You make this attack immediately before making the saving throw. If the attack hits, your save automatically succeeds, in addition to the attack's normal effects."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "swarmkeeper",
        "classId": "ranger",
        "name": "Swarmkeeper",
        "description": "A Swarmkeeper ranger works to protect nature by gathering a swarm of nature spirits to aid them.",
        "features": [
            {
                "level": 3,
                "name": "Gathered Swarm",
                "description": "A swarm of intangible nature spirits has bonded to you and can assist you in battle. Once on each of your turns, you can cause the swarm to assist you in one of the following ways, immediately after you hit a creature with an attack: add 1d6 piercing damage, move the target 15 feet horizontally, or move yourself 5 feet horizontally."
            },
            {
                "level": 7,
                "name": "Writhing Tide",
                "description": "You can condense part of your swarm into a focused mass that lifts you up. As a bonus action, you gain a flying speed of 10 feet and can hover. This effect lasts for 1 minute."
            },
            {
                "level": 11,
                "name": "Mighty Swarm",
                "description": "Your Gathered Swarm damage increases to 1d8. If you attempt to move a creature with the swarm, you can knock the creature prone if the saving throw fails. When you move yourself with the swarm, you gain half cover until the start of your next turn."
            },
            {
                "level": 15,
                "name": "Swarming Dispersal",
                "description": "When you take damage, you can use your reaction to give yourself resistance to that damage. You vanish into your swarm and then teleport to an unoccupied space that you can see within 30 feet of you."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "drakewarden",
        "classId": "ranger",
        "name": "Drakewarden",
        "description": "Drakewardens are rangers who use their magical connection with nature to form an enduring bond with a minor dragon, a drake.",
        "features": [
            {
                "level": 3,
                "name": "Draconic Gift",
                "description": "The bond you share with your drake creates a deeper connection to dragon kind, granting you the following benefits: Thaumaturgy cantrip, and you learn to speak, read, and write Draconic."
            },
            {
                "level": 3,
                "name": "Drake Companion",
                "description": "As an action, you can magically summon the drake that is bound to you. It appears in an unoccupied space of your choice within 30 feet of you. The drake is friendly to you and your companions, and it obeys your commands."
            },
            {
                "level": 7,
                "name": "Bond of Fang and Scale",
                "description": "While your drake is summoned, you and the drake gain the following benefits: You gain resistance to the damage type associated with your drake's Draconic Essence. Choose one: The drake deals an extra 1d6 damage of that type when it bites, or you can ride the drake."
            },
            {
                "level": 11,
                "name": "Drake's Breath",
                "description": "As an action, you can exhale a 30-foot cone of damaging breath or cause your drake to exhale it. Choose acid, cold, fire, lightning, or poison damage. Each creature in the cone must make a Dexterity saving throw, taking 8d6 damage on a failed save, or half as much damage on a successful one."
            },
            {
                "level": 15,
                "name": "Perfected Bond",
                "description": "Your drake grows to Large size. The drake's bite attack deals an extra 1d6 damage of the type chosen for its Draconic Essence. When either you or the drake takes damage while you're within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "creation",
        "classId": "bard",
        "name": "College of Creation",
        "description": "Bards of the College of Creation believe that the cosmos is a work of art - the creation of the first dragons and gods.",
        "features": [
            {
                "level": 3,
                "name": "Mote of Potential",
                "description": "When you give a creature a Bardic Inspiration die, you can utter a note from the Song of Creation to create a tiny elusive sphere of energy that orbits within 5 feet of that creature. The mote provides a bonus effect when the Bardic Inspiration die is used."
            },
            {
                "level": 3,
                "name": "Performance of Creation",
                "description": "As an action, you can channel the magic of the Song of Creation to create one nonmagical item of your choice in an unoccupied space within 10 feet of you. The item must appear on a surface or in a liquid that can support it."
            },
            {
                "level": 6,
                "name": "Animating Performance",
                "description": "As an action, you can target a Large or smaller nonmagical item you can see within 30 feet of you and animate it. The animate item uses the Dancing Item stat block."
            },
            {
                "level": 14,
                "name": "Creative Crescendo",
                "description": "When you use your Performance of Creation feature, you can create more than one item at once. You can create a number of items equal to your Charisma modifier (minimum of one)."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "eloquence",
        "classId": "bard",
        "name": "College of Eloquence",
        "description": "Adherents of the College of Eloquence master the art of oratory. Persuasion is regarded as a high art, and a well-reasoned argument as potent as a sharp sword.",
        "features": [
            {
                "level": 3,
                "name": "Silver Tongue",
                "description": "You are a master at saying the right thing at the right time. When you make a Charisma (Persuasion) or Charisma (Deception) check, you can treat a d20 roll of 9 or lower as a 10."
            },
            {
                "level": 3,
                "name": "Unsettling Words",
                "description": "You can spin words that unsettle a creature and cause it to doubt itself. As a bonus action, you can expend one use of your Bardic Inspiration and choose one creature you can see within 60 feet of you. Roll the Bardic Inspiration die. The creature must subtract the number rolled from the next saving throw it makes before the start of your next turn."
            },
            {
                "level": 6,
                "name": "Unfailing Inspiration",
                "description": "Your inspiring words are so persuasive that others feel driven to succeed. When a creature adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll fails, the creature can keep the Bardic Inspiration die."
            },
            {
                "level": 14,
                "name": "Infectious Inspiration",
                "description": "When you successfully inspire someone, the power of your eloquence can spread to someone else. When a creature within 60 feet of you adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll succeeds, you can use your reaction to encourage a different creature (other than yourself) that can hear you within 60 feet of you, giving it a Bardic Inspiration die without expending any of your Bardic Inspiration uses."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "spirits",
        "classId": "bard",
        "name": "College of Spirits",
        "description": "Bards of the College of Spirits seek tales with inherent power—be they legends, histories, or fictions—and bring them to life.",
        "features": [
            {
                "level": 3,
                "name": "Guiding Whispers",
                "description": "You learn the guidance cantrip, which doesn't count against the number of bard cantrips you know. For you, it has a range of 60 feet."
            },
            {
                "level": 3,
                "name": "Spiritual Focus",
                "description": "You can use the following objects as a spellcasting focus for your bard spells: a candle, crystal ball, skull, spirit board, or tarokka deck."
            },
            {
                "level": 3,
                "name": "Tales from Beyond",
                "description": "You can reach out to spirits to guide you and others. You can use a bonus action to expend one use of your Bardic Inspiration and roll on the Spirit Tales table to determine the tale the spirits generally tell you."
            },
            {
                "level": 6,
                "name": "Spiritual Focus (Damage/Healing)",
                "description": "When you cast a bard spell that deals damage or restores hit points through the Spiritual Focus, roll a d6, and you gain a bonus to one damage or healing roll of the spell equal to the number rolled."
            },
            {
                "level": 14,
                "name": "Mystical Connection",
                "description": "Your connection to spirits has become semi-permanent. Whenever you roll on the Spirit Tales table, you can roll the die twice and choose which of the two effects to bestow. If you roll the same number on both dice, you can ignore the number and choose any effect on the table."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "swords",
        "classId": "bard",
        "name": "College of Swords",
        "description": "Bards of the College of Swords are called blades, and they entertain through daring feats of weapon prowess.",
        "features": [
            {
                "level": 3,
                "name": "Bonus Proficiencies",
                "description": "You gain proficiency with medium armor and the scimitar."
            },
            {
                "level": 3,
                "name": "Fighting Style",
                "description": "You adopt a particular style of fighting as your specialty. Choose one of the following options: Dueling or Two-Weapon Fighting."
            },
            {
                "level": 3,
                "name": "Blade Flourish",
                "description": "Whenever you take the Attack action on your turn, your walking speed increases by 10 feet until the end of the turn, and if a weapon attack that you make as part of this action hits a creature, you can use one of the following Blade Flourish options of your choice."
            },
            {
                "level": 6,
                "name": "Extra Attack",
                "description": "You can attack twice, instead of once, whenever you take the Attack action on your turn."
            },
            {
                "level": 14,
                "name": "Master's Flourish",
                "description": "Whenever you use a Blade Flourish option, you can roll a d6 and use it instead of expending a Bardic Inspiration die."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "whispers",
        "classId": "bard",
        "name": "College of Whispers",
        "description": "Most folk are happy to welcome a bard into their midst, but these bards are wolves among sheep.",
        "features": [
            {
                "level": 3,
                "name": "Psychic Blades",
                "description": "When you hit a creature with a weapon attack, you can expend one use of your Bardic Inspiration to deal an extra 2d6 psychic damage to that target. You can do so only once per round on your turn."
            },
            {
                "level": 3,
                "name": "Words of Terror",
                "description": "If you speak to a humanoid alone for at least 1 minute, you can attempt to seed paranoia in its mind. At the end of the conversation, the target must succeed on a Wisdom saving throw against your spell save DC or be frightened of you or another creature of your choice."
            },
            {
                "level": 6,
                "name": "Mantle of Whispers",
                "description": "When a humanoid dies within 30 feet of you, you can use your reaction to capture its shadow using your reaction. You can use the shadow to adopt the dead humanoid's persona."
            },
            {
                "level": 14,
                "name": "Shadow Lore",
                "description": "You gain the ability to weave dark magic into your words and tap into a creature's deepest fears. As an action, you magically whisper a phrase that only one creature of your choice within 30 feet of you can hear. The target must make a Wisdom saving throw against your spell save DC. On a failed save, the target is charmed by you for the next 8 hours."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "bladesinging",
        "classId": "wizard",
        "name": "Bladesinging",
        "description": "Bladesingers master a tradition of wizardry that incorporates swordplay and dance.",
        "features": [
            {
                "level": 3,
                "name": "Training in War and Song",
                "description": "You gain proficiency with light armor, and you gain proficiency with one type of one-handed melee weapon of your choice. You also gain proficiency in the Performance skill if you don't already have it."
            },
            {
                "level": 3,
                "name": "Bladesong",
                "description": "You can invoke a secret elven magic called the Bladesong, provided that you aren't wearing medium or heavy armor or using a shield. It graces you with supernatural speed, agility, and focus."
            },
            {
                "level": 6,
                "name": "Extra Attack",
                "description": "You can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks."
            },
            {
                "level": 10,
                "name": "Song of Defense",
                "description": "You can direct your magic to absorb damage while your Bladesong is active. When you take damage, you can use your reaction to expend one spell slot and reduce that damage to you by an amount equal to five times the spell slot's level."
            },
            {
                "level": 14,
                "name": "Song of Victory",
                "description": "You can add your Intelligence modifier (minimum of +1) to the damage of your melee weapon attacks while your Bladesong is active."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "chronurgy",
        "classId": "wizard",
        "name": "Chronurgy Magic",
        "description": "Chronurgy magic focuses on time, manipulating it to aid allies and hinder foes.",
        "features": [
            {
                "level": 3,
                "name": "Chronal Shift",
                "description": "You can magically exert limited control over the flow of time around a creature. As a reaction, after you or a creature you can see within 30 feet of you makes an attack roll, an ability check, or a saving throw, you can force the creature to reroll."
            },
            {
                "level": 3,
                "name": "Temporal Awareness",
                "description": "You can add your Intelligence modifier to your initiative rolls."
            },
            {
                "level": 6,
                "name": "Momentary Stasis",
                "description": "As an action, you can magically force a Large or smaller creature you can see within 60 feet of you to make a Constitution saving throw. Unless the saving throw is a success, the creature is encased in a field of magical energy until the end of your next turn or until the creature takes any damage. While encased in this way, the creature is incapacitated and has a speed of 0."
            },
            {
                "level": 10,
                "name": "Arcane Abeyance",
                "description": "When you cast a spell using a spell slot of 4th level or lower, you can condense the spell's magic into a mote. The spell is frozen in time at the moment of casting and held within a gray bead for 1 hour. A creature holding the bead can use its action to release the spell."
            },
            {
                "level": 14,
                "name": "Convergent Future",
                "description": "You can peer through possible futures and magically pull one of them into events around you, ensuring a particular outcome. When you or a creature you can see within 60 feet of you makes an attack roll, an ability check, or a saving throw, you can use your reaction to ignore the die roll and decide whether the number rolled is the minimum needed to succeed or one less than that number (your choice)."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "conjuration",
        "classId": "wizard",
        "name": "School of Conjuration",
        "description": "As a conjurer, you favor spells that produce objects and creatures from thin air.",
        "features": [
            {
                "level": 3,
                "name": "Conjuration Savant",
                "description": "The gold and time you must spend to copy a conjuration spell into your spellbook is halved."
            },
            {
                "level": 3,
                "name": "Minor Conjuration",
                "description": "You can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen."
            },
            {
                "level": 6,
                "name": "Benign Transposition",
                "description": "You can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places."
            },
            {
                "level": 10,
                "name": "Focused Conjuration",
                "description": "While you are concentrating on a conjuration spell, your concentration can't be broken as a result of taking damage."
            },
            {
                "level": 14,
                "name": "Durable Summons",
                "description": "Any creature that you summon or create with a conjuration spell has 30 temporary hit points."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "enchantment",
        "classId": "wizard",
        "name": "School of Enchantment",
        "description": "As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters.",
        "features": [
            {
                "level": 3,
                "name": "Enchantment Savant",
                "description": "The gold and time you must spend to copy an enchantment spell into your spellbook is halved."
            },
            {
                "level": 3,
                "name": "Hypnotic Gaze",
                "description": "As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn."
            },
            {
                "level": 6,
                "name": "Instinctive Charm",
                "description": "When a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack's range."
            },
            {
                "level": 10,
                "name": "Split Enchantment",
                "description": "When you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature."
            },
            {
                "level": 14,
                "name": "Alter Memories",
                "description": "When you cast an enchantment spell to charm one or more creatures, you can alter one creature's understanding so that it remains unaware of being charmed."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "graviturgy",
        "classId": "wizard",
        "name": "Graviturgy Magic",
        "description": "Graviturgy magic manipulates the forces of gravity to crush foes or lighten burdens.",
        "features": [
            {
                "level": 3,
                "name": "Adjust Density",
                "description": "As an action, you can magically alter the weight of one object or creature you can see within 30 feet of you. The object or creature must be Large or smaller. The target's weight is halved or doubled for up to 1 minute, affecting its speed and ability checks."
            },
            {
                "level": 6,
                "name": "Gravity Well",
                "description": "Whenever you cast a spell on a creature, you can move the target 5 feet to an unoccupied space of your choice if the target is willing to move, the spell hits it with an attack, or it fails a saving throw against the spell."
            },
            {
                "level": 10,
                "name": "Violent Attraction",
                "description": "When another creature that you can see within 60 feet of you hits with a weapon attack, you can use your reaction to increase the attack's damage by 1d10. Alternatively, if a creature you can see within 60 feet of you takes damage from a fall, you can use your reaction to increase the fall's damage by 2d10."
            },
            {
                "level": 14,
                "name": "Event Horizon",
                "description": "As an action, you can magically emit a powerful field of gravitational energy that tugs at other creatures for 1 minute or until your concentration ends. For the duration, whenever a creature hostile to you starts its turn within 30 feet of you, it must make a Strength saving throw. On a failed save, it takes 2d10 force damage, and its speed is reduced to 0 until the start of its next turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "necromancy",
        "classId": "wizard",
        "name": "School of Necromancy",
        "description": "The School of Necromancy explores the cosmic forces of life, death, and undeath.",
        "features": [
            {
                "level": 3,
                "name": "Necromancy Savant",
                "description": "The gold and time you must spend to copy a necromancy spell into your spellbook is halved."
            },
            {
                "level": 3,
                "name": "Grim Harvest",
                "description": "When you kill a creature with a spell of 1st level or higher, you regain hit points equal to twice the spell's level, or three times its level if the spell belongs to the School of Necromancy. You don't gain this benefit for killing constructs or undead."
            },
            {
                "level": 6,
                "name": "Undead Thralls",
                "description": "You add the animate dead spell to your spellbook if it is not there already. When you cast animate dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate. Each creature you create with the spell gains benefits to its hit points and damage."
            },
            {
                "level": 10,
                "name": "Inured to Undeath",
                "description": "You have resistance to necrotic damage, and your hit point maximum can't be reduced."
            },
            {
                "level": 14,
                "name": "Command Undead",
                "description": "You can use magic to bring undead under your control, even those created by other wizards. As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw against your wizard spell save DC."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "scribes",
        "classId": "wizard",
        "name": "Order of Scribes",
        "description": "Magic of the book—that's what many folk call wizardry. The Order of Scribes is the most ancient and respected of the wizardly orders.",
        "features": [
            {
                "level": 3,
                "name": "Wizardly Quill",
                "description": "You can summon a magic quill. It doesn't require ink, and the time you must spend to copy a spell into your spellbook equals 2 minutes per spell level if you use the quill."
            },
            {
                "level": 3,
                "name": "Awakened Spellbook",
                "description": "You awaken a sentience within your spellbook. It grants you the ability to replace damage types of spells and cast rituals more quickly."
            },
            {
                "level": 6,
                "name": "Master Scrivener",
                "description": "You can create a magic scroll without expending a spell slot. The scroll contains a wizard spell of 1st or 2nd level that is in your spellbook, has a casting time of 1 action, and doesn't require material components worth more than 1 gp."
            },
            {
                "level": 10,
                "name": "Manifest Mind",
                "description": "You can temporarily conjure the mind of your Awakened Spellbook. As a bonus action, you can cause the spectral mind to hover in an unoccupied space of your choice within 60 feet of you. The spectral mind is intangible and doesn't occupy its space, and it sheds dim light in a 10-foot radius."
            },
            {
                "level": 14,
                "name": "One with the Word",
                "description": "Your connection to your spellbook is so profound that your soul has become entwined with it. You have advantage on all Arcana checks. Additionally, you can take a reaction to dismiss your spectral mind to avoid damage."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "transmutation",
        "classId": "wizard",
        "name": "School of Transmutation",
        "description": "You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable.",
        "features": [
            {
                "level": 3,
                "name": "Transmutation Savant",
                "description": "The gold and time you must spend to copy a transmutation spell into your spellbook is halved."
            },
            {
                "level": 3,
                "name": "Minor Alchemy",
                "description": "You can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another."
            },
            {
                "level": 6,
                "name": "Transmuter's Stone",
                "description": "You can spend 8 hours creating a transmuter's stone that stores transmutation magic. You can grasp the stone and gain a benefit of your choice (Darkvision, Speed Increase, Proficiency in Con saves, Energy Resistance)."
            },
            {
                "level": 10,
                "name": "Shapechanger",
                "description": "You add the polymorph spell to your spellbook, if it isn't there already. You can cast polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or lower."
            },
            {
                "level": 14,
                "name": "Master Transmuter",
                "description": "You can use your action to consume the reserve of transmutation magic stored within your transmuter's stone in a single burst. When you do so, choose one of the following effects: Major Transformation, Panacea, Restore Life, or Restore Youth."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "war_magic",
        "classId": "wizard",
        "name": "War Magic",
        "description": "War Magic blends principles of evocation and abjuration. It teaches techniques that empower a caster's spells, while also providing methods for a wizard to bolster their own defenses.",
        "features": [
            {
                "level": 3,
                "name": "Arcane Deflection",
                "description": "When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw. When you use this feature, you can't cast spells other than cantrips until the end of your next turn."
            },
            {
                "level": 3,
                "name": "Tactical Wit",
                "description": "You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier."
            },
            {
                "level": 6,
                "name": "Power Surge",
                "description": "You can store magical energy within yourself to later empower your damaging spells. You can store a maximum number of power surges equal to your Intelligence modifier (minimum of one)."
            },
            {
                "level": 10,
                "name": "Durable Magic",
                "description": "While you maintain concentration on a spell, you have a +2 bonus to AC and all saving throws."
            },
            {
                "level": 14,
                "name": "Deflecting Shroud",
                "description": "When you use your Arcane Deflection feature, you can cause magical energy to arc from you. Up to three creatures of your choice that you can see within 60 feet of you each take force damage equal to half your wizard level."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "ancestral_guardian",
        "classId": "barbarian",
        "name": "Path of the Ancestral Guardian",
        "description": "Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living.",
        "features": [
            {
                "level": 3,
                "name": "Ancestral Protectors",
                "description": "Starting when you choose this path at 3rd level, spectral warriors appear when you enter your rage. While you're raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn't against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack."
            },
            {
                "level": 6,
                "name": "Spirit Shield",
                "description": "You learn to use your guardian spirits to protect your allies. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6."
            },
            {
                "level": 10,
                "name": "Consult the Spirits",
                "description": "You gain the ability to consult with your ancestral spirits. When you do so, you cast the augury or clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location."
            },
            {
                "level": 14,
                "name": "Vengeful Ancestors",
                "description": "Your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes force damage equal to the damage that your Spirit Shield prevents."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "battlerager",
        "classId": "barbarian",
        "name": "Path of the Battlerager",
        "description": "Known as Kuldjargh (literally \"axe idiot\") in Dwarvish, Battleragers are fearless warriors who throw themselves into battle, striking with their body and giving their all for victory.",
        "features": [
            {
                "level": 3,
                "name": "Battlerager Armor",
                "description": "You gain the ability to use Spiked Armor as a weapon. While you are wearing spiked armor and are raging, you can use a bonus action to make one melee weapon attack with your armor spikes against a target within 5 feet of you. If the attack hits, the spikes deal 1d4 piercing damage. You use your Strength modifier for the attack and damage rolls."
            },
            {
                "level": 6,
                "name": "Reckless Abandon",
                "description": "When you use Reckless Attack while raging, you also gain temporary hit points equal to your Constitution modifier (minimum of 1). They vanish if any of them are left when your rage ends."
            },
            {
                "level": 10,
                "name": "Battlerager Charge",
                "description": "You can take the Dash action as a bonus action while you are raging."
            },
            {
                "level": 14,
                "name": "Spiked Retribution",
                "description": "When a creature within 5 feet of you hits you with a melee attack, the attacker takes 3 piercing damage if you are raging, aren't incapacitated, and are wearing spiked armor."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "beast",
        "classId": "barbarian",
        "name": "Path of the Beast",
        "description": "Barbarians who walk the Path of the Beast draw their rage from a bestial spark burning within their souls. That beast bursts forth in the throes of rage, physically transforming the barbarian.",
        "features": [
            {
                "level": 3,
                "name": "Form of the Beast",
                "description": "When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it. Choose between Bite, Claws, or Tail."
            },
            {
                "level": 6,
                "name": "Bestial Soul",
                "description": "The feral power within you increases, causing the natural weapons of your Form of the Beast to count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. You also gain a benefit related to your adaptation (Swimming, Climbing, or Jumping)."
            },
            {
                "level": 10,
                "name": "Infectious Fury",
                "description": "When you hit a creature with your natural weapons while you are raging, the beast within you can curse your target with rabid fury. The target must make a Wisdom saving throw or suffer one of the following effects: attack another creature of your choice or take 2d12 psychic damage."
            },
            {
                "level": 14,
                "name": "Call the Hunt",
                "description": "The beast within you grows so powerful that you can spread its ferocity to your allies. When you enter your rage, you can choose a number of other willing creatures you can see within 30 feet of you equal to your Constitution modifier (minimum of one). You gain 5 temporary hit points for each creature that accepts this feature. Until the rage ends, the chosen creatures can each deal an extra 1d6 damage when they hit with an attack."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "giant",
        "classId": "barbarian",
        "name": "Path of the Giant",
        "description": "Barbarians who walk the Path of the Giant draw strength from the primal forces that are the Giants.",
        "features": [
            {
                "level": 3,
                "name": "Giant Power",
                "description": "You learn to speak, read, and write Giant. You also learn either the Druidcraft or Thaumaturgy cantrip."
            },
            {
                "level": 3,
                "name": "Giant's Havoc",
                "description": "When you rage, you gain the following benefits: Crushing Throw (add Rage damage to thrown weapons) and Giant Stature (become Large, reach increases by 5 feet)."
            },
            {
                "level": 6,
                "name": "Elemental Cleaver",
                "description": "When you enter your rage, you can infuse a weapon you are holding with one of the following damage types: acid, cold, fire, thunder, or lightning. While you wield the infused weapon during your rage, the weapon's damage type changes to the chosen type, it deals an extra 1d6 damage of the chosen type when it hits, and it gains the thrown property."
            },
            {
                "level": 10,
                "name": "Mighty Impel",
                "description": "As a bonus action while raging, you can choose one Medium or smaller creature within your reach and move it to an unoccupied space you can see within 30 feet of you. An unwilling creature must make a Strength saving throw to avoid the effect."
            },
            {
                "level": 14,
                "name": "Demiurgic Colossus",
                "description": "When you rage, your reach increases by 10 feet, your size can increase to Huge, and Mighty Impel can affect creatures up to Large size."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "storm_herald",
        "classId": "barbarian",
        "name": "Path of the Storm Herald",
        "description": "Typical barbarians harbor a fury within. Their rage makes them strong, quick, and tough. Those who follow the Path of the Storm Herald learn to transform that rage into a mantle of primal magic, which swirls around them.",
        "features": [
            {
                "level": 3,
                "name": "Storm Aura",
                "description": "While you are raging, you emanate a stormy, magical aura. The aura extends 10 feet from you in every direction, but not through total cover. You choose one environment (Desert, Sea, or Tundra) and gain its effect."
            },
            {
                "level": 6,
                "name": "Storm Soul",
                "description": "The storm grants you benefits even when your aura isn't active. You gain resistance and other benefits based on your chosen environment (Desert, Sea, or Tundra)."
            },
            {
                "level": 10,
                "name": "Shielding Storm",
                "description": "You learn to use your mastery of the storm to protect others. Each creature of your choice has the damage resistance you gained from the Storm Soul feature while the creature is in your Storm Aura."
            },
            {
                "level": 14,
                "name": "Raging Storm",
                "description": "The power of the storm you channel grows mightier, lashing out at your foes. The effect is based on your chosen environment (Desert, Sea, or Tundra)."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "wild_magic_barbarian",
        "classId": "barbarian",
        "name": "Path of Wild Magic",
        "description": "Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other realms of supernatural power radiate with such forces.",
        "features": [
            {
                "level": 3,
                "name": "Magic Awareness",
                "description": "As an action, you can open your awareness to the presence of concentrated magic. Until the end of your next turn, you know the location of any spell or magic item within 60 feet of you that isn't behind total cover."
            },
            {
                "level": 3,
                "name": "Wild Surge",
                "description": "The magical energy roiling inside you sometimes erupts from you. When you enter your rage, roll on the Wild Magic table to determine the magical effect produced."
            },
            {
                "level": 6,
                "name": "Bolstering Magic",
                "description": "You can harness your wild magic to bolster yourself or a companion. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits: For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll; or roll a d3. The creature regains one expended spell slot, the level of which equals the number rolled or lower (you can't do this again until a long rest)."
            },
            {
                "level": 10,
                "name": "Unstable Backlash",
                "description": "When you are imperiled during your rage, the magic within you can lash out; immediately after you take damage or fail a saving throw while raging, you can use your reaction to roll on the Wild Magic table and immediately produce the effect rolled. This effect replaces your current Wild Magic effect."
            },
            {
                "level": 14,
                "name": "Controlled Surge",
                "description": "Whenever you roll on the Wild Magic table, you can roll the die twice and choose which of the two effects to unleash. If you roll the same number on both dice, you can ignore the number and choose any effect on the table."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "dreams",
        "classId": "druid",
        "name": "Circle of Dreams",
        "description": "Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms.",
        "features": [
            {
                "level": 3,
                "name": "Balm of the Summer Court",
                "description": "You have a pool of fey energy represented by a number of d6s equal to your druid level. As a bonus action, you can choose one creature you can see within 120 feet of you and spend a number of those dice equal to half your druid level or less. Roll the spent dice and add them together. The target regains a number of hit points equal to the total. The target also gains 1 temporary hit point per die spent."
            },
            {
                "level": 6,
                "name": "Hearth of Moonlight and Shadow",
                "description": "At 6th level, home can be wherever you are. During a short or long rest, you can invoke the shadowy power of the Gloaming Court to help guard your campsite."
            },
            {
                "level": 10,
                "name": "Hidden Paths",
                "description": "At 10th level, you can use the hidden, magical pathways that some fey use to traverse space in the blink of an eye. As a bonus action on your turn, you can teleport up to 60 feet to an unoccupied space you can see. Alternatively, you can use your action to teleport one willing creature you touch up to 30 feet to an unoccupied space you can see."
            },
            {
                "level": 14,
                "name": "Walker in Dreams",
                "description": "At 14th level, the magic of the Feywild grants you the ability to travel mentally or physically through dreamlands. When you finish a short rest, you can cast one of the following spells, without expending a spell slot or requiring material components: dream (with you as the messenger), scrying, or teleportation circle."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "shepherd",
        "classId": "druid",
        "name": "Circle of the Shepherd",
        "description": "Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid.",
        "features": [
            {
                "level": 3,
                "name": "Speech of the Woods",
                "description": "At 2nd level, you gain the ability to converse with beasts and many fey. You learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions."
            },
            {
                "level": 3,
                "name": "Spirit Totem",
                "description": "Starting at 2nd level, you can call forth nature spirits to influence the world around you. As a bonus action, you can magically summon an incorporeal spirit to a point you can see within 60 feet of you."
            },
            {
                "level": 6,
                "name": "Mighty Summoner",
                "description": "At 6th level, beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains the following benefits: The creature appears with more hit points. The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage."
            },
            {
                "level": 10,
                "name": "Guardian Spirit",
                "description": "Beginning at 10th level, your Spirit Totem safeguards the beasts and fey that you call forth. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains hit points equal to half your druid level."
            },
            {
                "level": 14,
                "name": "Faithful Summons",
                "description": "Starting at 14th level, the nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of conjure animals as if it were cast using a 9th-level spell slot."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "spores",
        "classId": "druid",
        "name": "Circle of Spores",
        "description": "Druids of the Circle of Spores find beauty in decay. They see within mold and other fungi the ability to transform lifeless material into abundant, albeit somewhat strange, life.",
        "features": [
            {
                "level": 3,
                "name": "Halo of Spores",
                "description": "Starting at 2nd level, you are surrounded by invisible, necrotic spores that are harmless until you unleash them on a creature nearby. When a creature you can see moves into a space within 10 feet of you or starts its turn there, you can use your reaction to deal 1d4 necrotic damage to that creature unless it succeeds on a Constitution saving throw."
            },
            {
                "level": 3,
                "name": "Symbiotic Entity",
                "description": "At 2nd level, you gain the ability to channel magic into your spores. As an action, you can expend a use of your Wild Shape feature to awaken those spores, rather than transforming into a beast form, and you gain 4 temporary hit points for each level you have in this class."
            },
            {
                "level": 6,
                "name": "Fungal Infestation",
                "description": "At 6th level, your spores gain the ability to infest a corpse and animate it. If a beast or humanoid that is Small or Medium dies within 10 feet of you, you can use your reaction to animate it, causing it to stand up immediately with 1 hit point."
            },
            {
                "level": 10,
                "name": "Spreading Spores",
                "description": "At 10th level, you gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute."
            },
            {
                "level": 14,
                "name": "Fungal Body",
                "description": "At 14th level, the fungal spores in your body alter you: you can't be blinded, deafened, frightened, or poisoned, and any critical hit against you counts as a normal hit, unless you're incapacitated."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "wildfire",
        "classId": "druid",
        "name": "Circle of Wildfire",
        "description": "Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation: a forest fire promotes later growth, and volcanic ash nourishes new life.",
        "features": [
            {
                "level": 3,
                "name": "Summon Wildfire Spirit",
                "description": "At 2nd level, you can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your Wildfire Spirit, rather than transforming into a beast."
            },
            {
                "level": 6,
                "name": "Enhanced Bond",
                "description": "At 6th level, the bond with your Wildfire Spirit enhances your destructive and restorative spells. Whenever you cast a spell that deals fire damage or restores hit points while your Wildfire Spirit is summoned, roll a d8, and you gain a bonus equal to the number rolled to one damage or healing roll of the spell."
            },
            {
                "level": 10,
                "name": "Cauterizing Flames",
                "description": "At 10th level, you gain the ability to turn death into magical flames that can heal or incinerate. When a Small or larger creature dies within 30 feet of you or your Wildfire Spirit, a harmless spectral flame springs forth in the dead creature's space and flickers there for 1 minute."
            },
            {
                "level": 14,
                "name": "Blazing Revival",
                "description": "At 14th level, the bond with your Wildfire Spirit can save you from death. If the spirit is within 120 feet of you when you are reduced to 0 hit points and thereby fall unconscious, you can cause the spirit to drop to 0 hit points. You then regain half your hit points and immediately rise to your feet."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "astral_self",
        "classId": "monk",
        "name": "Way of the Astral Self",
        "description": "A monk who follows the Way of the Astral Self believes their body is an illusion. They see their ki as a representation of their true form, an astral self.",
        "features": [
            {
                "level": 3,
                "name": "Arms of the Astral Self",
                "description": "As a bonus action, you can spend 1 ki point to summon the arms of your astral self. For 10 minutes, these spectral arms hover near your shoulders or surround your arms. You can use your Wisdom modifier in place of your Strength modifier when making Strength checks and saving throws. You can use the spectral arms to make unarmed strikes."
            },
            {
                "level": 6,
                "name": "Visage of the Astral Self",
                "description": "You can summon the visage of your astral self. As a bonus action, or as part of the bonus action you take to activate Arms of the Astral Self, you can spend 1 ki point to summon this visage for 10 minutes. It covers your face like a helmet or mask. You gain benefits like Astral Sight and Wisdom of the Spirit."
            },
            {
                "level": 11,
                "name": "Body of the Astral Self",
                "description": "When you have both your spectral arms and visage summoned, you can cause the body of your astral self to appear (no additional action required). This spectral body covers your physical form like a suit of armor, connecting with the arms and visage. You can deflect energy and deal extra damage."
            },
            {
                "level": 17,
                "name": "Awakened Astral Self",
                "description": "Your connection to your astral self is complete, allowing you to unleash its full potential. While you have your Body of the Astral Self summoned, you gain +2 AC and can attack three times when you take the Attack action."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "ascendant_dragon",
        "classId": "monk",
        "name": "Way of the Ascendant Dragon",
        "description": "Monks who follow the Way of the Ascendant Dragon emulate the power of dragons, channeling their Focus Points to unleash dragon-like abilities.",
        "features": [
            {
                "level": 3,
                "name": "Draconic Disciple",
                "description": "You can channel draconic power to magnify your presence and imbue your unarmed strikes with the essence of a dragon's breath. You gain Draconic Presence and Draconic Strike (change damage type to acid, cold, fire, lightning, or poison)."
            },
            {
                "level": 3,
                "name": "Breath of the Dragon",
                "description": "You can channel your ki into destructive waves of energy like a dragon's breath. When you take the Attack action on your turn, you can replace one of the attacks with an exhalation of draconic energy in either a 20-foot cone or a 30-foot line."
            },
            {
                "level": 6,
                "name": "Wings Unfurled",
                "description": "When you use your Step of the Wind, you can unfurl spectral draconic wings from your back that vanish at the end of your turn. While the wings exist, you have a flying speed equal to your walking speed."
            },
            {
                "level": 11,
                "name": "Aspect of the Wyrm",
                "description": "The power of your draconic spirit now radiates from you, warding your allies or inspiring fear in your enemies. You can create an aura of draconic power."
            },
            {
                "level": 17,
                "name": "Ascendant Aspect",
                "description": "Your draconic spirit reaches its peak. You gain Blindsight, Explosive Fury (breath weapon empowers you), and your breath weapon damage increases."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "drunken_master",
        "classId": "monk",
        "name": "Way of the Drunken Master",
        "description": "The Way of the Drunken Master teaches its students to move with the jerky, unpredictable movements of a drunkard.",
        "features": [
            {
                "level": 3,
                "name": "Bonus Proficiencies",
                "description": "You gain proficiency in the Performance skill if you don't already have it. Your martial arts technique mixes combat training with the precision of a dancer and the antics of a jester. You also gain proficiency with brewer's supplies."
            },
            {
                "level": 3,
                "name": "Drunken Technique",
                "description": "You learn how to twist and turn quickly as part of your Flurry of Blows. Whenever you use Flurry of Blows, you gain the benefit of the Disengage action, and your walking speed increases by 10 feet until the end of the current turn."
            },
            {
                "level": 6,
                "name": "Tipsy Sway",
                "description": "You can move in sudden, swaying ways. You gain the following benefits: Leap to Your Feet (stand up from prone with 5 feet movement) and Redirect Attack (use reaction to cause a missed attack to hit another creature)."
            },
            {
                "level": 11,
                "name": "Drunkard's Luck",
                "description": "You always seem to get a lucky break at the right moment. When you make an ability check, an attack roll, or a saving throw and have disadvantage on the roll, you can spend 2 Focus Points to cancel the disadvantage for that roll."
            },
            {
                "level": 17,
                "name": "Intoxicated Frenzy",
                "description": "You gain the ability to make an overwhelming number of attacks against a group of enemies. When you use your Flurry of Blows, you can make up to three additional attacks with it (up to a total of five Flurry of Blows attacks), provided that each Flurry of Blows attack targets a different creature this turn."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "kensei",
        "classId": "monk",
        "name": "Way of the Kensei",
        "description": "Monks of the Way of the Kensei train relentlessly with their weapons, to the point where the weapon becomes an extension of the body.",
        "features": [
            {
                "level": 3,
                "name": "Path of the Kensei",
                "description": "You gain proficiency with kensei weapons and can use them as monk weapons. You also gain Agile Parry (AC bonus) and Kensei's Shot (extra ranged damage)."
            },
            {
                "level": 6,
                "name": "One with the Blade",
                "description": "You extend your Focus Points into your kensei weapons, granting you the following benefits: Magic Kensei Weapons (count as magical) and Deft Strike (spend Focus Points for extra damage)."
            },
            {
                "level": 11,
                "name": "Sharpen the Blade",
                "description": "You gain the ability to augment your weapons further with your Focus Points. As a Bonus Action, you can expend up to 3 Focus Points to grant one kensei weapon you touch a bonus to attack and damage rolls when you attack with it."
            },
            {
                "level": 17,
                "name": "Unerring Accuracy",
                "description": "Your mastery of weapons grants you extraordinary accuracy. If you miss with an attack roll using a monk weapon on your turn, you can reroll it. You can use this feature only once on each of your turns."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "long_death",
        "classId": "monk",
        "name": "Way of the Long Death",
        "description": "Monks of the Way of the Long Death are obsessed with the meaning and mechanics of dying.",
        "features": [
            {
                "level": 3,
                "name": "Touch of Death",
                "description": "Your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level."
            },
            {
                "level": 6,
                "name": "Hour of Reaping",
                "description": "You gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. creatures within 30 feet must make a Wisdom save or be frightened."
            },
            {
                "level": 11,
                "name": "Mastery of Death",
                "description": "You use your familiarity with death to escape its grasp. When you are reduced to 0 hit points, you can expend 1 Focus Point (no action required) to have 1 hit point instead."
            },
            {
                "level": 17,
                "name": "Touch of the Long Death",
                "description": "You can channel necrotic energy into a creature. As an action, you touch one creature within 5 feet of you, and it must make a Constitution saving throw. It takes 2d10 necrotic damage per Focus Point spent (up to 10 points)."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "sun_soul",
        "classId": "monk",
        "name": "Way of the Sun Soul",
        "description": "Monks of the Way of the Sun Soul learn to channel their own life energy into searing bolts of light.",
        "features": [
            {
                "level": 3,
                "name": "Radiant Sun Bolt",
                "description": "You can hurl searing bolts of magical radiance. You gain a new attack option that you can use with the Attack action. This special attack is a ranged spell attack with a range of 30 feet and deals radiant damage."
            },
            {
                "level": 6,
                "name": "Searing Arc Strike",
                "description": "You gain the ability to channel your ki into searing waves of energy. Immediately after you take the Attack action on your turn, you can cast the burning hands spell as a bonus action."
            },
            {
                "level": 11,
                "name": "Searing Sunburst",
                "description": "You gain the ability to create an orb of light that erupts into a devastating explosion. As an action, you create an orb and hurl it at a point within 150 feet, where it erupts into a sphere of radiant light for a brief but deadly instant."
            },
            {
                "level": 17,
                "name": "Sun Shield",
                "description": "You become wreathed in a luminous, magical aura. You shed bright light for 30 feet and dim light for an additional 30 feet. You can use your reaction to deal radiant damage to a creature that hits you with a melee attack."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "fathomless",
        "classId": "warlock",
        "name": "The Fathomless",
        "description": "You have plunged into a pact with the deeps. An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now guides you.",
        "features": [
            {
                "level": 3,
                "name": "Tentacle of the Deeps",
                "description": "You can magically summon a spectral tentacle that strikes at your foes. As a bonus action, you create a 10-foot-long tentacle at a point you can see within 60 feet of you. You can use your bonus action to move it and attack with it."
            },
            {
                "level": 3,
                "name": "Gift of the Sea",
                "description": "You gain a swimming speed of 40 feet, and you can breathe underwater."
            },
            {
                "level": 6,
                "name": "Oceanic Soul",
                "description": "You are now even more at home in the depths. You gain resistance to cold damage. In addition, when you are fully submerged, any creature that is also fully submerged can understand your speech, and you can understand theirs."
            },
            {
                "level": 6,
                "name": "Guardian Coil",
                "description": "Your Tentacle of the Deeps can defend you and others, interposing itself between them and harm. When you or a creature you can see takes damage while within 10 feet of the tentacle, you can use your reaction to choose one of those creatures and reduce the damage to that creature by 1d8."
            },
            {
                "level": 10,
                "name": "Grasping Tentacles",
                "description": "You learn the Evard's black tentacles spell. You can cast it once without expending a spell slot, and you regain the ability to do so when you finish a long rest. Whenever you cast this spell, your patron's magic bolsters you, granting you a number of temporary hit points equal to your warlock level."
            },
            {
                "level": 14,
                "name": "Fathomless Plunge",
                "description": "You can magically transport yourself and up to five willing creatures that you can see within 30 feet of you. You vanish and then reappear in a body of water that you've seen that is on the same plane of existence."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "genie",
        "classId": "warlock",
        "name": "The Genie",
        "description": "You have made a pact with one of the rarest kinds of genie, a noble genie. Such entities are rulers of vast fiefs on the Elemental Planes.",
        "features": [
            {
                "level": 3,
                "name": "Genie's Vessel",
                "description": "Your patron gifts you a magical vessel that grants you a measure of the genie's power. You can use the vessel as a spellcasting focus, and you can enter it to rest."
            },
            {
                "level": 3,
                "name": "Genie's Wrath",
                "description": "Once during each of your turns when you hit with an attack roll, you can deal extra damage to the target equal to your proficiency bonus. The type of this damage is determined by your patron (Dao, Djinni, Efreeti, or Marid)."
            },
            {
                "level": 6,
                "name": "Elemental Gift",
                "description": "You begin to take on characteristics of your patron's kind. You have resistance to a damage type determined by your patron kind. You can also give yourself a flying speed of 30 feet for 10 minutes."
            },
            {
                "level": 10,
                "name": "Sanctuary Vessel",
                "description": "When you enter your Genie's Vessel, you can now bring up to five willing creatures with you. Anyone who remains within the vessel for at least 10 minutes finishes a short rest and regains hit points."
            },
            {
                "level": 14,
                "name": "Limited Wish",
                "description": "You entreat your patron to grant you a small wish. You can speak your desire to your Genie's Vessel to cast any spell of 6th level or lower from any class spell list. The spell takes effect as part of this action and requires no material components."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "hexblade",
        "classId": "warlock",
        "name": "The Hexblade",
        "description": "You have made your pact with a mysterious entity from the Shadowfell—a force that manifests in sentient magic weapons carved from the stuff of shadow.",
        "features": [
            {
                "level": 3,
                "name": "Hexblade's Curse",
                "description": "You gain the ability to place a baleful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute (crit on 19-20, bonus damage, healing on death)."
            },
            {
                "level": 3,
                "name": "Hex Warrior",
                "description": "You acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls."
            },
            {
                "level": 6,
                "name": "Accursed Specter",
                "description": "You can curse the soul of a person you slay, temporarily binding it to your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter."
            },
            {
                "level": 10,
                "name": "Armor of Hexes",
                "description": "Your hex grows more powerful. If the target cursed by your Hexblade's Curse hits you with an attack roll, you can use your reaction to roll a d6. On a 4 or higher, the attack misses you, regardless of its roll."
            },
            {
                "level": 14,
                "name": "Master of Hexes",
                "description": "You can spread your Hexblade's Curse from a slain creature to another creature. When the creature cursed by your Hexblade's Curse dies, you can apply the curse to a different creature you can see within 30 feet of you."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "undead",
        "classId": "warlock",
        "name": "The Undead",
        "description": "You've made a pact with a deathless being, a creature that defies the cycle and life and death, forsaking its shell of mortality for eternal power.",
        "features": [
            {
                "level": 3,
                "name": "Form of Dread",
                "description": "You manifest an aspect of your patron's dreadful power. As a bonus action, you transform for 1 minute. You gain temporary hit points, immunity to fear, and can frighten foes when you hit them."
            },
            {
                "level": 6,
                "name": "Grave Touched",
                "description": "Your patron's powers have a profound effect on your body and magic. You don't need to eat, drink, or breathe. In addition, when you hit a creature with an attack and roll damage, you can replace the damage with necrotic damage. While in your Form of Dread, you can roll an extra damage die when dealing necrotic damage."
            },
            {
                "level": 10,
                "name": "Necrotic Husk",
                "description": "Your connection to undeath and necrotic energy now saturates your body. You have resistance to necrotic damage. If you are reduced to 0 hit points, you can use your reaction to drop to 1 hit point instead and cause your body to erupt with deathly energy."
            },
            {
                "level": 14,
                "name": "Spirit Projection",
                "description": "Your spirit can become untethered from your physical form. As an action, you can project your spirit from your body. The body you leave behind is unconscious and in a state of suspended animation. Your spirit resembles your mortal form in almost every way, replicating your game statistics but not your possessions. You gain a flying speed, resistance to bludgeoning/piercing/slashing, and can move through creatures/objects."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "undying",
        "classId": "warlock",
        "name": "The Undying",
        "description": "Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize - like all power - comes at a price.",
        "features": [
            {
                "level": 3,
                "name": "Among the Dead",
                "description": "You learn the spare the dying cantrip. Undead have difficulty harming you. If an undead targets you directly with an attack or a harmful spell, that creature must make a Wisdom saving throw (DC equal to your spell save DC). On a failed save, the creature must choose a new target or forfeit targeting someone."
            },
            {
                "level": 6,
                "name": "Defy Death",
                "description": "You can give yourself vitality when you cheat death or when you help someone else cheat it. You regain hit points equal to 1d8 + your Constitution modifier (minimum of 1 hit point) when you succeed on a death saving throw or when you stabilize a creature with spare the dying."
            },
            {
                "level": 10,
                "name": "Undying Nature",
                "description": "You can hold your breath indefinitely, and you don't require food, water, or sleep, although you still require rest to reduce exhaustion and still benefit from finishing short and long rests. You age at a slower rate."
            },
            {
                "level": 14,
                "name": "Indestructible Life",
                "description": "You partake of some of the true secrets of the Undying. On your turn, you can use a bonus action to regain hit points equal to 1d8 + your warlock level. Additionally, if you put a severed body part of yours back in place when you use this feature, the part reattaches."
            }
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    }
];
