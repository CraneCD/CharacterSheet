export interface FeatPrerequisite {
    abilityScore?: { [ability: string]: number }; // e.g., { str: 13 }
    race?: string[];
    class?: string[];
    proficiency?: string[];
    level?: number;
}

export interface Feat {
    id: string;
    name: string;
    description: string;
    prerequisites?: FeatPrerequisite;
    abilityScoreIncrease?: { [ability: string]: number }; // Some feats give +1 to a stat
}

export const feats: Feat[] = [
    {
        id: 'alert',
        name: 'Alert',
        description: 'Always on the lookout for danger, you gain the following benefits:\n- You gain a +5 bonus to initiative.\n- You can\'t be surprised while you are conscious.\n- Other creatures don\'t gain advantage on attack rolls against you as a result of being hidden from you.'
    },
    {
        id: 'athlete',
        name: 'Athlete',
        description: 'You have undergone extensive physical training to gain the following benefits:\n- When you are prone, standing up uses only 5 feet of your movement.\n- Climbing doesn\'t cost you extra movement.\n- You can make a running long jump or a running high jump after moving only 5 feet on foot, rather than 10 feet.',
        abilityScoreIncrease: { str: 1 }
    },
    {
        id: 'actor',
        name: 'Actor',
        description: 'Skilled at mimicry and dramatics, you gain the following benefits:\n- You have advantage on Charisma (Deception) and Charisma (Performance) checks when trying to pass yourself off as a different person.\n- You can mimic the speech of another person or the sounds made by other creatures. You must have heard the person speaking, or heard the creature make the sound, for at least 1 minute. A successful Wisdom (Insight) check contested by your Charisma (Deception) check allows a listener to determine that the effect is faked.\n- You can read lips.',
        abilityScoreIncrease: { cha: 1 }
    },
    {
        id: 'charger',
        name: 'Charger',
        description: 'When you use your action to Dash, you can use a bonus action to make one melee weapon attack or to shove a creature. If you move at least 10 feet in a straight line immediately before taking this bonus action, you either gain a +5 bonus to the attack\'s damage roll (if you chose to make a melee attack and hit) or push the target up to 10 feet away from you (if you chose to shove and you succeed).'
    },
    {
        id: 'crossbow-expert',
        name: 'Crossbow Expert',
        description: 'Thanks to extensive practice with the crossbow, you gain the following benefits:\n- You ignore the loading property of crossbows with which you are proficient.\n- Being within 5 feet of a hostile creature doesn\'t impose disadvantage on your ranged attack rolls.\n- When you use the Attack action and attack with a one-handed weapon, you can use a bonus action to attack with a hand crossbow you are holding.'
    },
    {
        id: 'defensive-duelist',
        name: 'Defensive Duelist',
        description: 'When you are wielding a finesse weapon with which you are proficient and another creature hits you with a melee attack, you can use your reaction to add your proficiency bonus to your AC for that attack, potentially causing the attack to miss you.',
        prerequisites: {
            abilityScore: { dex: 13 }
        }
    },
    {
        id: 'dual-wielder',
        name: 'Dual Wielder',
        description: 'You master fighting with two weapons, gaining the following benefits:\n- You gain a +1 bonus to AC while you are wielding a separate melee weapon in each hand.\n- You can use two-weapon fighting even when the one-handed melee weapons you are wielding aren\'t light.\n- You can draw or stow two one-handed weapons when you would normally be able to draw or stow only one.'
    },
    {
        id: 'dungeon-delver',
        name: 'Dungeon Delver',
        description: 'Alert to the hidden traps and secret doors found in many dungeons, you gain the following benefits:\n- You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to detect the presence of secret doors.\n- You have advantage on saving throws made to avoid or resist traps.\n- You have resistance to the damage dealt by traps.\n- You can search for traps while traveling at a normal pace, instead of only at a slow pace.'
    },
    {
        id: 'durable',
        name: 'Durable',
        description: 'Hardy and resilient, you gain the following benefits:\n- When you roll a Hit Die to regain hit points, the minimum number of hit points you regain from the roll equals twice your Constitution modifier (minimum of 2).\n- You gain proficiency in Constitution saving throws.',
        abilityScoreIncrease: { con: 1 }
    },
    {
        id: 'elemental-adept',
        name: 'Elemental Adept',
        description: 'When you gain this feat, choose one of the following damage types: acid, cold, fire, lightning, or thunder. Spells you cast ignore resistance to damage of the chosen type. In addition, when you roll damage for a spell you cast that deals damage of that type, you can treat any 1 on a damage die as a 2.',
        prerequisites: {
            abilityScore: { int: 13 }
        }
    },
    {
        id: 'grappler',
        name: 'Grappler',
        description: 'You\'ve developed the skills necessary to hold your own in close-quarters grappling. You gain the following benefits:\n- You have advantage on attack rolls against a creature you are grappling.\n- You can use your action to try to pin a creature grappled by you. To do so, make another grapple check. If you succeed, you and the creature are both restrained until the grapple ends.\n- Creatures that are one size larger than you don\'t automatically succeed on checks to escape your grapple.',
        prerequisites: {
            abilityScore: { str: 13 }
        }
    },
    {
        id: 'great-weapon-master',
        name: 'Great Weapon Master',
        description: 'You\'ve learned to put the weight of a weapon to your advantage, letting its momentum empower your strikes. You gain the following benefits:\n- On your turn, when you score a critical hit with a melee weapon or reduce a creature to 0 hit points with one, you can make one melee weapon attack as a bonus action.\n- Before you make a melee attack with a heavy weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack\'s damage.',
        prerequisites: {
            abilityScore: { str: 13 }
        }
    },
    {
        id: 'healer',
        name: 'Healer',
        description: 'You are an able physician, allowing you to mend wounds quickly and get your allies back in the fight. You gain the following benefits:\n- When you use a healer\'s kit to stabilize a dying creature, that creature also regains 1 hit point.\n- As an action, you can spend one use of a healer\'s kit to tend to a creature and restore 1d6 + 4 hit points to it, plus additional hit points equal to the creature\'s maximum number of Hit Dice. The creature can\'t regain hit points from this feat again until it finishes a short or long rest.'
    },
    {
        id: 'heavily-armored',
        name: 'Heavily Armored',
        description: 'You have trained to master the use of heavy armor, gaining the following benefits:\n- Increase your Strength score by 1, to a maximum of 20.\n- You gain proficiency with heavy armor.',
        prerequisites: {
            proficiency: ['Medium Armor']
        },
        abilityScoreIncrease: { str: 1 }
    },
    {
        id: 'heavy-armor-master',
        name: 'Heavy Armor Master',
        description: 'You can use your armor to deflect strikes that would kill others. You gain the following benefits:\n- Increase your Strength score by 1, to a maximum of 20.\n- While you are wearing heavy armor, bludgeoning, piercing, and slashing damage that you take from nonmagical weapons is reduced by 3.',
        prerequisites: {
            proficiency: ['Heavy Armor']
        },
        abilityScoreIncrease: { str: 1 }
    },
    {
        id: 'inspiring-leader',
        name: 'Inspiring Leader',
        description: 'You can spend 10 minutes inspiring your companions, shoring up their resolve to fight. When you do so, choose up to six friendly creatures (which can include yourself) within 30 feet of you who can see or hear you and who can understand you. Each creature can gain temporary hit points equal to your level + your Charisma modifier. A creature can\'t gain temporary hit points from this feat again until it has finished a short or long rest.',
        prerequisites: {
            abilityScore: { cha: 13 }
        }
    },
    {
        id: 'keen-mind',
        name: 'Keen Mind',
        description: 'You have a mind that can track time, direction, and detail with uncanny precision. You gain the following benefits:\n- You always know which way is north.\n- You always know the number of hours left before the next sunrise or sunset.\n- You can accurately recall anything you have seen or heard within the past month.',
        abilityScoreIncrease: { int: 1 }
    },
    {
        id: 'lightly-armored',
        name: 'Lightly Armored',
        description: 'You have trained to master the use of light armor, gaining the following benefits:\n- Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- You gain proficiency with light armor.',
        abilityScoreIncrease: { str: 1 } // User can choose str or dex
    },
    {
        id: 'linguist',
        name: 'Linguist',
        description: 'You have studied languages and codes, gaining the following benefits:\n- Increase your Intelligence score by 1, to a maximum of 20.\n- You learn three languages of your choice.\n- You can ably create written ciphers. Others can\'t decipher a code you create unless you teach them, they succeed on an Intelligence check (DC equal to your Intelligence score + your proficiency bonus), or they use magic.',
        abilityScoreIncrease: { int: 1 }
    },
    {
        id: 'lucky',
        name: 'Lucky',
        description: 'You have inexplicable luck that seems to kick in at just the right moment. You have 3 luck points. Whenever you make an attack roll, an ability check, or a saving throw, you can spend one luck point to roll an additional d20. You can choose to spend one of your luck points after you roll the die, but before the outcome is determined. You choose which of the d20s is used for the attack roll, ability check, or saving throw. You can also spend one luck point when an attack roll is made against you. Roll a d20, and then choose whether the attack uses the attacker\'s roll or yours. If more than one creature spends a luck point to influence the outcome of a roll, the points cancel each other out; no additional dice are rolled. You regain your expended luck points when you finish a long rest.'
    },
    {
        id: 'mage-slayer',
        name: 'Mage Slayer',
        description: 'You have practiced techniques useful in melee combat against spellcasters, gaining the following benefits:\n- When a creature within 5 feet of you casts a spell, you can use your reaction to make a melee weapon attack against that creature.\n- When you damage a creature that is concentrating on a spell, that creature has disadvantage on the saving throw it makes to maintain its concentration.\n- You have advantage on saving throws against spells cast by creatures within 5 feet of you.'
    },
    {
        id: 'magic-initiate',
        name: 'Magic Initiate',
        description: 'Choose a class: bard, cleric, druid, sorcerer, warlock, or wizard. You learn two cantrips of your choice from that class\'s spell list. In addition, choose one 1st-level spell from that same list. You learn that spell and can cast it at its lowest level. Once you cast it, you must finish a long rest before you can cast it again using this feat. Your spellcasting ability for these spells depends on the class you chose: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.'
    },
    {
        id: 'martial-adept',
        name: 'Martial Adept',
        description: 'You have martial training that allows you to perform special combat maneuvers. You gain the following benefits:\n- You learn two maneuvers of your choice from among those available to the Battle Master archetype in the fighter class. If a maneuver you use requires your target to make a saving throw to resist the maneuver\'s effects, the saving throw DC equals 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice).\n- You gain one superiority die, which is a d6. This die is used to fuel your maneuvers. A superiority die is expended when you use it. You regain your expended superiority dice when you finish a short or long rest.'
    },
    {
        id: 'medium-armor-master',
        name: 'Medium Armor Master',
        description: 'You have practiced moving in medium armor to gain the following benefits:\n- Wearing medium armor doesn\'t impose disadvantage on your Dexterity (Stealth) checks.\n- When you wear medium armor, you can add 3, rather than 2, to your AC if you have a Dexterity of 16 or higher.',
        prerequisites: {
            proficiency: ['Medium Armor'],
            abilityScore: { dex: 16 }
        }
    },
    {
        id: 'mobile',
        name: 'Mobile',
        description: 'You are exceptionally speedy and agile. You gain the following benefits:\n- Your speed increases by 10 feet.\n- When you use the Dash action, difficult terrain doesn\'t slow your movement that turn.\n- When you make a melee attack against a creature, you don\'t provoke opportunity attacks from that creature for the rest of the turn, whether you hit or not.',
        abilityScoreIncrease: { dex: 1 }
    },
    {
        id: 'moderately-armored',
        name: 'Moderately Armored',
        description: 'You have trained to master the use of medium armor and shields, gaining the following benefits:\n- Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- You gain proficiency with medium armor and shields.',
        prerequisites: {
            proficiency: ['Light Armor']
        },
        abilityScoreIncrease: { str: 1 } // User can choose str or dex
    },
    {
        id: 'mounted-combatant',
        name: 'Mounted Combatant',
        description: 'You are a dangerous foe to face while mounted. While you are mounted and aren\'t incapacitated, you gain the following benefits:\n- You have advantage on melee attack rolls against any unmounted creature that is smaller than your mount.\n- You can force an attack targeted at your mount to target you instead.\n- If your mount is subjected to an effect that allows it to make a Dexterity saving throw to take only half damage, it instead takes no damage if it succeeds on the saving throw, and only half damage if it fails.'
    },
    {
        id: 'observant',
        name: 'Observant',
        description: 'Quick to notice details of your environment, you gain the following benefits:\n- If you can see a creature\'s mouth while it is speaking a language you understand, you can interpret what it\'s saying by reading its lips.\n- You have a +5 bonus to your passive Wisdom (Perception) and passive Intelligence (Investigation) scores.',
        abilityScoreIncrease: { wis: 1 } // User can choose int or wis
    },
    {
        id: 'polearm-master',
        name: 'Polearm Master',
        description: 'You can keep your enemies at bay with reach weapons. You gain the following benefits:\n- When you take the Attack action and attack with only a glaive, halberd, quarterstaff, or spear, you can use a bonus action to make a melee attack with the opposite end of the weapon. This attack uses the same ability modifier as the primary attack. The weapon\'s damage die for this attack is a d4, and it deals bludgeoning damage.\n- While you are wielding a glaive, halberd, pike, quarterstaff, or spear, other creatures provoke an opportunity attack from you when they enter your reach.'
    },
    {
        id: 'resilient',
        name: 'Resilient',
        description: 'Choose one ability score. You gain the following benefits:\n- Increase the chosen ability score by 1, to a maximum of 20.\n- You gain proficiency in saving throws using the chosen ability.',
        abilityScoreIncrease: { str: 1 } // User chooses which ability
    },
    {
        id: 'ritual-caster',
        name: 'Ritual Caster',
        description: 'You have learned a number of spells that you can cast as rituals. These spells are written in a ritual book, which you must have in hand while casting one of them. When you choose this feat, you acquire a ritual book holding two 1st-level spells of your choice. Choose one of the following classes: bard, cleric, druid, sorcerer, warlock, or wizard. You must choose your spells from that class\'s spell list, and the spells you choose must have the ritual tag. The class you choose also determines your spellcasting ability for these spells. You can cast a wizard spell as a ritual if that spell has the ritual tag and you have the spell in your ritual book. You can\'t cast the spell except as a ritual, unless you\'ve learned the spell by some other means. You can also add a spell you have learned to your ritual book. The spell must be a 1st-level spell, have the ritual tag, and be on the spell list for the class you chose. The process of copying the spell into your ritual book takes 2 hours per level of the spell and costs 50 gp per level. The cost represents material components you expend as you experiment with the spell to master it, as well as the fine inks you need to record it.',
        prerequisites: {
            abilityScore: { int: 13 }
        }
    },
    {
        id: 'savage-attacker',
        name: 'Savage Attacker',
        description: 'Once per turn when you roll damage for a melee weapon attack, you can reroll the damage dice and use either total.'
    },
    {
        id: 'sentinel',
        name: 'Sentinel',
        description: 'You have mastered techniques to take advantage of every drop in any enemy\'s guard, gaining the following benefits:\n- When you hit a creature with an opportunity attack, the creature\'s speed becomes 0 for the rest of the turn.\n- Creatures within 5 feet of you provoke opportunity attacks from you even if they take the Disengage action before leaving your reach.\n- When a creature within 5 feet of you makes an attack against a target other than you (and that target doesn\'t have this feat), you can use your reaction to make a melee weapon attack against the attacking creature.'
    },
    {
        id: 'sharpshooter',
        name: 'Sharpshooter',
        description: 'You have mastered ranged weapons and can make shots that others find impossible. You gain the following benefits:\n- Attacking at long range doesn\'t impose disadvantage on your ranged weapon attack rolls.\n- Your ranged weapon attacks ignore half cover and three-quarters cover.\n- Before you make an attack with a ranged weapon that you are proficient with, you can choose to take a -5 penalty to the attack roll. If the attack hits, you add +10 to the attack\'s damage.',
        prerequisites: {
            abilityScore: { dex: 13 }
        }
    },
    {
        id: 'shield-master',
        name: 'Shield Master',
        description: 'You use shields not just for protection but also for offense. You gain the following benefits:\n- If you take the Attack action on your turn, you can use a bonus action to try to shove a creature within 5 feet of you using your shield.\n- If you aren\'t incapacitated, you can add your shield\'s AC bonus to any Dexterity saving throw you make against a spell or other harmful effect that targets only you.\n- If you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you can use your reaction to take no damage if you succeed on the saving throw, interposing your shield between yourself and the source of the effect.'
    },
    {
        id: 'skilled',
        name: 'Skilled',
        description: 'You gain proficiency in any combination of three skills or tools of your choice.'
    },
    {
        id: 'skulker',
        name: 'Skulker',
        description: 'You are expert at slinking through shadows. You gain the following benefits:\n- You can try to hide when you are lightly obscured from the creature from which you are hiding.\n- When you are hidden from a creature and miss it with a ranged weapon attack, making the attack doesn\'t reveal your position.\n- Dim light doesn\'t impose disadvantage on your Wisdom (Perception) checks relying on sight.',
        prerequisites: {
            abilityScore: { dex: 13 }
        }
    },
    {
        id: 'spell-sniper',
        name: 'Spell Sniper',
        description: 'You have learned techniques to enhance your attacks with certain kinds of spells. You gain the following benefits:\n- When you cast a spell that requires you to make an attack roll, the spell\'s range is doubled.\n- Your ranged spell attacks ignore half cover and three-quarters cover.\n- You learn one cantrip that requires an attack roll. Choose the cantrip from the bard, cleric, druid, sorcerer, warlock, or wizard spell list. Your spellcasting ability for this cantrip depends on the spell list you chose from: Charisma for bard, sorcerer, or warlock; Wisdom for cleric or druid; or Intelligence for wizard.',
        prerequisites: {
            abilityScore: { int: 13 }
        }
    },
    {
        id: 'tavern-brawler',
        name: 'Tavern Brawler',
        description: 'Accustomed to rough-and-tumble fighting using whatever weapons happen to be at hand, you gain the following benefits:\n- Increase your Strength or Constitution score by 1, to a maximum of 20.\n- You are proficient with improvised weapons and unarmed strikes.\n- Your unarmed strike uses a d4 for damage.\n- When you hit a creature with an unarmed strike or an improvised weapon on your turn, you can use a bonus action to attempt to grapple the target.',
        abilityScoreIncrease: { str: 1 } // User can choose str or con
    },
    {
        id: 'tough',
        name: 'Tough',
        description: 'Your hit point maximum increases by an amount equal to twice your level when you gain this feat. Thereafter, whenever you gain a level, your hit point maximum increases by an additional 2 hit points.'
    },
    {
        id: 'war-caster',
        name: 'War Caster',
        description: 'You have practiced casting spells in the midst of combat, learning techniques that grant you the following benefits:\n- You have advantage on Constitution saving throws that you make to maintain your concentration on a spell when you take damage.\n- You can perform the somatic components of spells even when you have weapons or a shield in one or both hands.\n- When a hostile creature\'s movement provokes an opportunity attack from you, you can use your reaction to cast a spell at the creature, rather than making an opportunity attack. The spell must have a casting time of 1 action and must target only that creature.',
        prerequisites: {
            abilityScore: { int: 13 }
        }
    },
    {
        id: 'weapon-master',
        name: 'Weapon Master',
        description: 'You have practiced extensively with a variety of weapons, gaining the following benefits:\n- Increase your Strength or Dexterity score by 1, to a maximum of 20.\n- You gain proficiency with four weapons of your choice.',
        abilityScoreIncrease: { str: 1 } // User can choose str or dex
    }
];
