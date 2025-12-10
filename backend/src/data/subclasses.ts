export interface SubclassFeature {
    level: number;
    name: string;
    description: string;
}

export interface SubclassSpell {
    level: number;
    spellId: string;
}

export interface Subclass {
    id: string;
    classId: string;
    name: string;
    description: string;
    features: SubclassFeature[];
    spells?: SubclassSpell[];
}

export const subclasses: Subclass[] = [
    {
        id: 'champion',
        classId: 'fighter',
        name: 'Champion',
        description: 'You focus on the development of raw physical power to deadly perfection.',
        features: [
            { level: 3, name: 'Improved Critical', description: 'Your weapon attacks score a critical hit on a roll of 19 or 20.' },
            { level: 7, name: 'Remarkable Athlete', description: 'You can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn\'t already use your proficiency bonus. You can also jump extra distance.' },
            { level: 10, name: 'Additional Fighting Style', description: 'You can choose a second Fighting Style option.' },
            { level: 15, name: 'Superior Critical', description: 'Your weapon attacks score a critical hit on a roll of 18-20.' },
            { level: 18, name: 'Survivor', description: 'At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left.' }
        ]
    },
    {
        id: 'evocation',
        classId: 'wizard',
        name: 'School of Evocation',
        description: 'You focus your study on magic that creates powerful elemental effects.',
        features: [
            { level: 2, name: 'Evocation Savant', description: 'The gold and time you must spend to copy an evocation spell into your spellbook is halved.' },
            { level: 2, name: 'Sculpt Spells', description: 'You can create pockets of relative safety within the effects of your evocation spells. Choose 1 + spell level creatures to automatically save and take no damage if they would otherwise take half.' },
            { level: 6, name: 'Potent Cantrip', description: 'Your damaging cantrips affect creatures that succeed on a saving throw against them, dealing half damage.' },
            { level: 10, name: 'Empowered Evocation', description: 'You can add your Intelligence modifier to one damage roll of any wizard evocation spell you cast.' },
            { level: 14, name: 'Overchannel', description: 'When you cast a wizard spell of 1st through 5th level that deals damage, you can deal maximum damage with that spell. Taking this action again before a long rest causes necrotic damage.' }
        ]
    },
    {
        id: 'thief',
        classId: 'rogue',
        name: 'Thief',
        description: 'You hone your skills in the larcenous arts.',
        features: [
            { level: 3, name: 'Fast Hands', description: 'You can use the bonus action granted by your Cunning Action to make a Dexterity (Sleight of Hand) check, use your thieves\' tools to disarm a trap or open a lock, or take the Use an Object action.' },
            { level: 3, name: 'Second-Story Work', description: 'Climbing no longer costs you extra movement. In addition, when you make a running jump, the distance you cover increases by a number of feet equal to your Dexterity modifier.' },
            { level: 9, name: 'Supreme Sneak', description: 'You have advantage on a Dexterity (Stealth) check if you move no more than half your speed on the same turn.' },
            { level: 13, name: 'Use Magic Device', description: 'You can ignore all class, race, and level requirements on the use of magic items.' },
            { level: 17, name: 'Thief\'s Reflexes', description: 'You can take two turns during the first round of any combat. You take your first turn at your normal initiative and your second turn at your initiative minus 10.' }
        ]
    },
    {
        id: 'life',
        classId: 'cleric',
        name: 'Life Domain',
        description: 'The Life domain focuses on the vibrant positive energy – one of the fundamental forces of the universe – that sustains all life.',
        features: [
            { level: 1, name: 'Disciple of Life', description: 'Whenever you use a spell of 1st level or higher to restore hit points to a creature, the creature regains additional hit points equal to 2 + the spell\'s level.' },
            { level: 2, name: 'Channel Divinity: Preserve Life', description: 'As an action, you can restore 5 times your cleric level in hit points to creatures within 30 feet, dividing the points as you choose (up to half the creature\'s hit point maximum).' },
            { level: 6, name: 'Blessed Healer', description: 'When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell\'s level.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Supreme Healing', description: 'When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die.' }
        ]
    },
    {
        id: 'hunter',
        classId: 'ranger',
        name: 'Hunter',
        description: 'Emulating the Hunter archetype means accepting your place as a bulwark between civilization and the terrors of the wilderness.',
        features: [
            { level: 3, name: 'Hunter\'s Prey', description: 'At 3rd level, you gain one of the following features of your choice: Colossus Slayer, Giant Killer, or Horde Breaker.' },
            { level: 7, name: 'Defensive Tactics', description: 'At 7th level, you gain one of the following features of your choice: Escape the Horde, Multiattack Defense, or Steel Will.' },
            { level: 11, name: 'Multiattack', description: 'At 11th level, you gain one of the following features of your choice: Volley or Whirlwind Attack.' },
            { level: 15, name: 'Superior Hunter\'s Defense', description: 'At 15th level, you gain one of the following features of your choice: Evasion, Stand Against the Tide, or Uncanny Dodge.' }
        ]
    },
    {
        id: 'berserker',
        classId: 'barbarian',
        name: 'Path of the Berserker',
        description: 'For some barbarians, rage is a means to an end, that end being violence.',
        features: [
            { level: 3, name: 'Frenzy', description: 'You can go into a frenzy when you rage. If you do so, for the duration of your rage you can make a single melee weapon attack as a bonus action on each of your turns after this one. When your rage ends, you suffer one level of exhaustion.' },
            { level: 6, name: 'Mindless Rage', description: 'You can\'t be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.' },
            { level: 10, name: 'Intimidating Presence', description: 'You can use your action to frighten someone with your menacing presence.' },
            { level: 14, name: 'Retaliation', description: 'When you take damage from a creature that is within 5 feet of you, you can use your reaction to make a melee weapon attack against that creature.' }
        ]
    },
    {
        id: 'lore',
        classId: 'bard',
        name: 'College of Lore',
        description: 'Bards of the College of Lore know something about practically everything.',
        features: [
            { level: 3, name: 'Bonus Proficiencies', description: 'You gain proficiency with three skills of your choice.' },
            { level: 3, name: 'Cutting Words', description: 'You can use your reaction to distract, confuse, or sap the confidence of others. When a creature makes an attack roll, ability check, or damage roll, you can use your reaction to expend one use of Bardic Inspiration and subtract the number rolled from the creature\'s roll.' },
            { level: 6, name: 'Additional Magical Secrets', description: 'You learn two spells of your choice from any class. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip.' },
            { level: 14, name: 'Peerless Skill', description: 'When you make an ability check, you can expend one use of Bardic Inspiration to add the number rolled to your check. You can choose to do so after you roll the die but before the DM tells you whether you succeed or fail.' }
        ]
    },
    {
        id: 'land',
        classId: 'druid',
        name: 'Circle of the Land',
        description: 'The Circle of the Land is made up of mystics and sages who safeguard ancient knowledge and rites through a vast oral tradition.',
        features: [
            { level: 2, name: 'Bonus Cantrip', description: 'You learn one additional druid cantrip of your choice.' },
            { level: 2, name: 'Natural Recovery', description: 'During a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher.' },
            { level: 3, name: 'Circle Spells', description: 'You gain circle spells based on the land where you became a druid (Arctic, Coast, Desert, Forest, Grassland, Mountain, Swamp, or Underdark).' },
            { level: 6, name: 'Land\'s Stride', description: 'Moving through nonmagical difficult terrain costs you no extra movement. You can pass through nonmagical plants without being slowed or taking damage.' },
            { level: 10, name: 'Nature\'s Ward', description: 'You can\'t be charmed or frightened by elementals or fey, and you are immune to poison and disease.' },
            { level: 14, name: 'Nature\'s Sanctuary', description: 'Creatures of the natural world sense your connection to nature and become hesitant to attack you.' }
        ]
    },
    {
        id: 'open_hand',
        classId: 'monk',
        name: 'Way of the Open Hand',
        description: 'Monks of the Way of the Open Hand are the ultimate masters of martial arts combat.',
        features: [
            { level: 3, name: 'Open Hand Technique', description: 'Whenever you hit a creature with one of the attacks granted by your Flurry of Blows, you can impose one of the following effects on that target: knock prone, push 15 feet, or prevent reactions.' },
            { level: 6, name: 'Wholeness of Body', description: 'You gain the ability to heal yourself. As an action, you can regain hit points equal to three times your monk level.' },
            { level: 11, name: 'Tranquility', description: 'You can enter a special meditation that surrounds you with an aura of peace. At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest.' },
            { level: 17, name: 'Quivering Palm', description: 'You gain the ability to set up lethal vibrations in someone\'s body. When you hit a creature with an unarmed strike, you can spend 3 ki points to start these imperceptible vibrations, which last for a number of days equal to your monk level.' }
        ]
    },
    {
        id: 'devotion',
        classId: 'paladin',
        name: 'Oath of Devotion',
        description: 'The Oath of Devotion binds a paladin to the loftiest ideals of justice, virtue, and order.',
        features: [
            { level: 3, name: 'Channel Divinity: Sacred Weapon', description: 'As an action, you can imbue one weapon that you are holding with positive energy, adding your Charisma modifier to attack rolls.' },
            { level: 3, name: 'Channel Divinity: Turn the Unholy', description: 'As an action, you present your holy symbol and speak a prayer censuring fiends and undead.' },
            { level: 7, name: 'Aura of Devotion', description: 'You and friendly creatures within 10 feet of you can\'t be charmed while you are conscious.' },
            { level: 15, name: 'Purity of Spirit', description: 'You are always under the effects of a protection from evil and good spell.' },
            { level: 20, name: 'Holy Nimbus', description: 'As an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that.' }
        ]
    },
    {
        id: 'draconic',
        classId: 'sorcerer',
        name: 'Draconic Bloodline',
        description: 'Your innate magic comes from draconic magic that was mingled with your blood or that of your ancestors.',
        features: [
            { level: 1, name: 'Draconic Resilience', description: 'Your hit point maximum increases by 1 and increases by 1 again whenever you gain a level in this class. Additionally, unarmored AC equals 13 + Dex mod.' },
            { level: 6, name: 'Elemental Affinity', description: 'When you cast a spell that deals damage of the type associated with your draconic ancestry, you can add your Charisma modifier to one damage roll of that spell.' },
            { level: 14, name: 'Dragon Wings', description: 'You gain the ability to sprout a pair of dragon wings from your back, gaining a flying speed equal to your current speed.' },
            { level: 18, name: 'Draconic Presence', description: 'You can channel the dread presence of your dragon ancestor, causing those around you to become awestruck or frightened.' }
        ]
    },
    {
        id: 'fiend',
        classId: 'warlock',
        name: 'The Fiend',
        description: 'You have made a pact with a fiend from the lower planes of existence.',
        features: [
            { level: 1, name: 'Dark One\'s Blessing', description: 'When you reduce a hostile creature to 0 hit points, you gain temporary hit points equal to your Charisma modifier + your warlock level.' },
            { level: 6, name: 'Dark One\'s Own Luck', description: 'When you make an ability check or a saving throw, you can use this feature to add a d10 to your roll.' },
            { level: 10, name: 'Fiendish Resilience', description: 'You can choose one damage type when you finish a short or long rest. You gain resistance to that damage type until you choose a different one.' },
            { level: 14, name: 'Hurl Through Hell', description: 'When you hit a creature with an attack, you can use this feature to instantly transport the target through the lower planes, causing 10d10 psychic damage.' }
        ]
    },
    // --- New Subclasses ---
    {
        id: 'totem',
        classId: 'barbarian',
        name: 'Path of the Totem Warrior',
        description: 'You revere a spirit animal and draw upon its power.',
        features: [
            { level: 3, name: 'Spirit Seeker', description: 'You have the ability to cast the beast sense and speak with animals spells, but only as rituals.' },
            { level: 3, name: 'Totem Spirit', description: 'You choose a totem spirit (Bear, Eagle, Elk, Tiger, Wolf) and gain its feature.' },
            { level: 6, name: 'Aspect of the Beast', description: 'You gain a magical benefit based on the totem animal of your choice.' },
            { level: 10, name: 'Spirit Walker', description: 'You can cast the commune with nature spell, but only as a ritual.' },
            { level: 14, name: 'Totemic Attunement', description: 'You gain a magical benefit based on the totem animal of your choice.' }
        ]
    },
    {
        id: 'valor',
        classId: 'bard',
        name: 'College of Valor',
        description: 'Bards of the College of Valor are daring skalds whose tales keep the memory of the great heroes of the past alive.',
        features: [
            { level: 3, name: 'Bonus Proficiencies', description: 'You gain proficiency with medium armor, shields, and martial weapons.' },
            { level: 3, name: 'Combat Inspiration', description: 'A creature that has a Bardic Inspiration die from you can roll that die and add the number rolled to a weapon damage roll it just made. Alternatively, when an attack roll is made against the creature, it can use its reaction to roll the Bardic Inspiration die and add the number rolled to its AC against that attack.' },
            { level: 6, name: 'Extra Attack', description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.' },
            { level: 14, name: 'Battle Magic', description: 'When you use your action to cast a bard spell, you can make one weapon attack as a bonus action.' }
        ]
    },
    {
        id: 'light',
        classId: 'cleric',
        name: 'Light Domain',
        description: 'The Light domain focuses on the ideals of rebirth and renewal, truth, vigilance, and beauty.',
        features: [
            { level: 1, name: 'Bonus Cantrip', description: 'You gain the light cantrip if you don\'t already know it.' },
            { level: 1, name: 'Warding Flare', description: 'When you are attacked by a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll.' },
            { level: 2, name: 'Channel Divinity: Radiance of the Dawn', description: 'As an action, you can use your Channel Divinity to banish darkness and deal radiant damage to hostile creatures within 30 feet of you.' },
            { level: 6, name: 'Improved Flare', description: 'You can use your Warding Flare feature when a creature that you can see within 30 feet of you attacks a creature other than you.' },
            { level: 8, name: 'Potent Spellcasting', description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.' },
            { level: 17, name: 'Corona of Light', description: 'You can use your action to activate an aura of sunlight that lasts for 1 minute or until you dismiss it using another action. Enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant damage.' }
        ]
    },
    {
        id: 'moon',
        classId: 'druid',
        name: 'Circle of the Moon',
        description: 'Druids of the Circle of the Moon are fierce guardians of the wilds. Their order gathers under the full moon to share news and trade warnings.',
        features: [
            { level: 2, name: 'Combat Wild Shape', description: 'You gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action. Additionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended.' },
            { level: 2, name: 'Circle Forms', description: 'The rites of your circle grant you the ability to transform into more dangerous animal forms. Starting at 2nd level, you can transform into a beast with a challenge rating as high as 1.' },
            { level: 6, name: 'Primal Strike', description: 'Your attacks in beast form count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.' },
            { level: 10, name: 'Elemental Wild Shape', description: 'You can expend two uses of Wild Shape at the same time to transform into an air elemental, an earth elemental, a fire elemental, or a water elemental.' },
            { level: 14, name: 'Thousand Forms', description: 'You can cast the alter self spell at will.' }
        ]
    },
    {
        id: 'battle_master',
        classId: 'fighter',
        name: 'Battle Master',
        description: 'Those who emulate the archetypal Battle Master employ martial techniques passed down through generations.',
        features: [
            { level: 3, name: 'Combat Superiority', description: 'You gain a set of superiority dice that are fueled by the special maneuvers you learn.' },
            { level: 3, name: 'Student of War', description: 'You gain proficiency with one type of artisan\'s tools of your choice.' },
            { level: 7, name: 'Know Your Enemy', description: 'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own.' },
            { level: 10, name: 'Improved Combat Superiority', description: 'Your superiority dice turn into d10s.' },
            { level: 15, name: 'Relentless', description: 'If you roll initiative and have no superiority dice remaining, you regain 1 superiority die.' },
            { level: 18, name: 'Improved Combat Superiority (d12)', description: 'Your superiority dice turn into d12s.' }
        ]
    },
    {
        id: 'shadow',
        classId: 'monk',
        name: 'Way of Shadow',
        description: 'Monks of the Way of Shadow follow a tradition that values stealth and subterfuge.',
        features: [
            { level: 3, name: 'Shadow Arts', description: 'You can use your ki to duplicate the effects of certain spells (darkness, darkvision, pass without trace, or silence) without providing material components.' },
            { level: 6, name: 'Shadow Step', description: 'You can use your bonus action to teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness. You then have advantage on the first melee attack you make before the end of the turn.' },
            { level: 11, name: 'Cloak of Shadows', description: 'When you are in an area of dim light or darkness, you can use your action to become invisible.' },
            { level: 17, name: 'Opportunist', description: 'Whenever a creature within 5 feet of you is hit by an attack made by a creature other than you, you can use your reaction to make a melee attack against that creature.' }
        ]
    },
    {
        id: 'ancients',
        classId: 'paladin',
        name: 'Oath of the Ancients',
        description: 'The Oath of the Ancients is as old as the race of elves and the rituals of the druids.',
        features: [
            { level: 3, name: 'Channel Divinity: Nature\'s Wrath', description: 'You can use your Channel Divinity to invoke primeval forces to ensnare a foe.' },
            { level: 3, name: 'Channel Divinity: Turn the Faithless', description: 'You can use your Channel Divinity to utter ancient words that are painful for fey and fiends to hear.' },
            { level: 7, name: 'Aura of Warding', description: 'You and friendly creatures within 10 feet of you have resistance to damage from spells.' },
            { level: 15, name: 'Undying Sentinel', description: 'When you are reduced to 0 hit points and are not killed outright, you can choose to drop to 1 hit point instead. Additionally, you suffer none of the drawbacks of old age.' },
            { level: 20, name: 'Elder Champion', description: 'You can assume the form of an ancient force of nature, taking on a specialized appearance.' }
        ]
    },
    {
        id: 'beast_master',
        classId: 'ranger',
        name: 'Beast Master',
        description: 'The Beast Master archetype embodies a friendship between the civilized races and the beasts of the world.',
        features: [
            { level: 3, name: 'Ranger\'s Companion', description: 'You gain a beast companion that accompanies you on your adventures and is trained to fight alongside you.' },
            { level: 7, name: 'Exceptional Training', description: 'On any of your turns when your beast companion doesn\'t attack, you can use a bonus action to command the beast to take the Dash, Disengage, or Help action on its turn.' },
            { level: 11, name: 'Bestial Fury', description: 'When you command your beast to take the Attack action, the beast can make two attacks, or it can take the Multiattack action if it has that action.' },
            { level: 15, name: 'Share Spells', description: 'When you cast a spell targeting yourself, you can also affect your beast companion with the spell if the beast is within 30 feet of you.' }
        ]
    },
    {
        id: 'assassin',
        classId: 'rogue',
        name: 'Assassin',
        description: 'You focus your training on the grim art of death.',
        features: [
            { level: 3, name: 'Assassinate', description: 'You represent the pinnacle of your training. You have advantage on attack rolls against any creature that hasn\'t taken a turn in the combat yet. In addition, any hit you score against a creature that is surprised is a critical hit.' },
            { level: 3, name: 'Bonus Proficiencies', description: 'You gain proficiency with the disguise kit and the poisoner\'s kit.' },
            { level: 9, name: 'Infiltration Expertise', description: 'You can unfailingly create false identities for yourself.' },
            { level: 13, name: 'Impostor', description: 'You gain the ability to mimic another person\'s speech, writing, and behavior.' },
            { level: 17, name: 'Death Strike', description: 'When you attack and hit a creature that is surprised, it must make a Constitution saving throw (DC 8 + your Dex modifier + your proficiency bonus). On a failed save, double the damage of your attack against the creature.' }
        ]
    },
    {
        id: 'wild_magic',
        classId: 'sorcerer',
        name: 'Wild Magic',
        description: 'Your innate magic comes from the wild forces of chaos that underlie the order of creation.',
        features: [
            { level: 1, name: 'Wild Magic Surge', description: 'Immediately after you cast a sorcerer spell of 1st level or higher, the DM can have you roll a d20. If you roll a 1, roll on the Wild Magic Surge table to create a random magical effect.' },
            { level: 1, name: 'Tides of Chaos', description: 'You can manipulate the forces of chance and chaos to gain advantage on one attack roll, ability check, or saving throw.' },
            { level: 6, name: 'Bend Luck', description: 'You have the ability to twist fate using your wild magic. When another creature you can see makes an attack roll, an ability check, or a saving throw, you can use your reaction and spend 2 sorcery points to roll 1d4 and apply the number rolled as a bonus or penalty (your choice) to the creature\'s roll.' },
            { level: 14, name: 'Controlled Chaos', description: 'Whenever you roll on the Wild Magic Surge table, you can roll twice and use either number.' },
            { level: 18, name: 'Spell Bombardment', description: 'The harmful energy of your spells intensifies. When you roll damage for a spell and roll the highest number possible on any of the dice, choose one of those dice, roll it again and add that roll to the damage.' }
        ]
    },
    {
        id: 'archfey',
        classId: 'warlock',
        name: 'The Archfey',
        description: 'Your patron is a lord or lady of the fey, a creature of legend who holds secrets that were forgotten before the mortal races were born.',
        features: [
            { level: 1, name: 'Fey Presence', description: 'You can use your action to cause each creature in a 10-foot cube originating from you to make a Wisdom saving throw against your warlock spell save DC. The creatures that fail their saving throws are all charmed or frightened by you (your choice) until the end of your next turn.' },
            { level: 6, name: 'Misty Escape', description: 'You can vanish in a puff of mist in response to harm. When you take damage, you can use your reaction to turn invisible and teleport up to 60 feet since invisibility lasts until the start of your next turn.' },
            { level: 10, name: 'Beguiling Defenses', description: 'You are immune to being charmed, and when another creature attempts to charm you, you can use your reaction to attempt to turn the charm back on that creature.' },
            { level: 14, name: 'Dark Delirium', description: 'You can plunge a creature into an illusory realm. The target must make a Wisdom saving throw. On a failed save, it sees itself in a misty realm and is charmed or frightened for 1 minute or until you lose concentration.' }
        ]
    },
    {
        id: 'abjuration',
        classId: 'wizard',
        name: 'School of Abjuration',
        description: 'The School of Abjuration emphasizes magic that blocks, banishes, or protects.',
        features: [
            { level: 2, name: 'Abjuration Savant', description: 'The gold and time you must spend to copy an abjuration spell into your spellbook is halved.' },
            { level: 2, name: 'Arcane Ward', description: 'You can weave magic around yourself for protection. When you cast an abjuration spell of 1st level or higher, you can simultaneously use a strand of the spell\'s magic to create a magical ward on yourself that lasts until you finish a long rest.' },
            { level: 6, name: 'Projected Ward', description: 'When a creature that you can see within 30 feet of you takes damage, you can use your reaction to cause your Arcane Ward to absorb that damage.' },
            { level: 10, name: 'Improved Abjuration', description: 'When you cast an abjuration spell that requires you to make an ability check as part of casting that spell (as in counterspell and dispel magic), you add your proficiency bonus to that ability check.' },
            { level: 14, name: 'Spell Resistance', description: 'You have advantage on saving throws against spells. Furtthermore, you have resistance against the damage of spells.' }
        ]
    },
    // --- Fighter Expansion Subclasses ---
    {
        id: 'arcane_archer',
        classId: 'fighter',
        name: 'Arcane Archer',
        description: 'An Arcane Archer studies a unique elven method of archery that weaves magic into attacks to produce supernatural effects.',
        features: [
            { level: 3, name: 'Arcane Archer Lore', description: 'You gain proficiency in the Arcana or Nature skill, and you learn either the Prestidigitation or Druidcraft cantrip.' },
            { level: 3, name: 'Arcane Shot', description: 'You prefer to unleash special magical effects with some of your shots. You gain two Arcane Shot options of your choice.' },
            { level: 7, name: 'Magic Arrow', description: 'Whenever you fire a nonmagical arrow from a shortbow or longbow, you can make it magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.' },
            { level: 7, name: 'Curving Shot', description: 'When you make an attack roll with a magic arrow and miss, you can use a bonus action to reroll the attack roll against a different target within 60 feet of the original target.' },
            { level: 10, name: 'Additional Arcane Shot Option', description: 'You gain one additional Arcane Shot option of your choice.' },
            { level: 15, name: 'Ever-Ready Shot', description: 'Starting at 15th level, your magical archery is available whenever battle starts. If you roll initiative and have no uses of Arcane Shot remaining, you regain one use of it.' },
            { level: 18, name: 'Improved Arcane Shot', description: 'Your Arcane Shot options improve and become more powerful.' }
        ]
    },
    {
        id: 'banneret',
        classId: 'fighter',
        name: 'Banneret (Purple Dragon Knight)',
        description: 'Bannerets are knights who inspire their allies to greatness through their own heroic deeds.',
        features: [
            { level: 3, name: 'Rallying Cry', description: 'When you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level.' },
            { level: 7, name: 'Royal Envoy', description: 'You gain proficiency in the Persuasion skill. If you are already proficient in it, you gain proficiency in one of the following skills of your choice: Animal Handling, Insight, Intimidation, or Performance. Your proficiency bonus is doubled for any ability check you make that uses Persuasion.' },
            { level: 10, name: 'Inspiring Surge', description: 'When you use your Action Surge feature, you can choose one creature within 60 feet of you that is allied with you. That creature can make one melee or ranged weapon attack with its reaction.' },
            { level: 15, name: 'Bulwark', description: 'When you decide to use your Indomitable feature to reroll an Intelligence, a Wisdom, or a Charisma saving throw and you aren\'t incapacitated, you can choose one ally within 60 feet of you that also failed its saving throw against the same effect. If that creature can see or hear you, it can reroll its saving throw and must use the new roll.' }
        ]
    },
    {
        id: 'cavalier',
        classId: 'fighter',
        name: 'Cavalier',
        description: 'The archetypal Cavalier excels at mounted combat. Usually born among the nobility and raised at court, a Cavalier is equally at home leading a cavalry charge or exchanging repartee at a state dinner.',
        features: [
            { level: 3, name: 'Bonus Proficiency', description: 'You gain proficiency in one of the following skills of your choice: Animal Handling, History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.' },
            { level: 3, name: 'Born to the Saddle', description: 'You have advantage on saving throws made to avoid falling off your mount. If you fall off your mount and descend no more than 10 feet, you can land on your feet if you\'re not incapacitated. Mounting or dismounting a creature costs you only 5 feet of movement, rather than half your speed.' },
            { level: 3, name: 'Unwavering Mark', description: 'When you hit a creature with a melee weapon attack, you can mark the creature until the end of your next turn. This effect ends early if you are incapacitated or you die, or if someone else marks the creature.' },
            { level: 7, name: 'Warding Maneuver', description: 'If you or a creature you can see within 5 feet of you is hit by an attack, you can roll 1d8 as a reaction if you\'re wielding a melee weapon or a shield. Roll the die, and add the number rolled to the target\'s AC against that attack. If the attack still hits, the target has resistance against the attack\'s damage.' },
            { level: 10, name: 'Hold the Line', description: 'Creatures provoke an opportunity attack from you when they move 5 feet or more while within your reach, and if you hit a creature with an opportunity attack, the target\'s speed is reduced to 0 until the end of the current turn.' },
            { level: 15, name: 'Ferocious Charger', description: 'If you move at least 10 feet in a straight line right before attacking a creature and you hit it with the attack, that target must succeed on a Strength saving throw (DC 8 + your proficiency bonus + your Strength modifier) or be knocked prone.' },
            { level: 18, name: 'Vigilant Defender', description: 'You answer an enemy\'s attack with a riposte. In combat, you get a special reaction that you can take once on every creature\'s turn, except your turn. You can use this special reaction only to make an opportunity attack, and you can\'t use it on the same turn that you take your normal reaction.' }
        ]
    },
    {
        id: 'echo_knight',
        classId: 'fighter',
        name: 'Echo Knight',
        description: 'A mysterious disciple of the Dunamancy school of magic, the Echo Knight has mastered the art of using dunamis to summon the fading shades of unrealized timelines to aid them in battle.',
        features: [
            { level: 3, name: 'Manifest Echo', description: 'You can use a bonus action to magically manifest an echo of yourself in an unoccupied space you can see within 15 feet of you. This echo is a magical, translucent, gray image of you that lasts until it is destroyed, until you dismiss it as a bonus action, until you manifest another echo, or until you\'re incapacitated.' },
            { level: 3, name: 'Unleash Incarnation', description: 'You can heighten your echo\'s fury. Whenever you take the Attack action, you can make one additional melee attack from the echo\'s position. You can use this feature a number of times equal to your Constitution modifier (a minimum of once). You regain all expended uses when you finish a long rest.' },
            { level: 7, name: 'Echo Avatar', description: 'You can temporarily transfer your consciousness to your echo. As an action, you can see through your echo\'s eyes and hear through its ears.' },
            { level: 10, name: 'Shadow Martyr', description: 'You can make your echo throw itself in front of an attack directed at another creature that you can see. Before an attack roll is made, you can use your reaction to teleport the echo to an unoccupied space within 5 feet of the targeted creature. The attack roll that triggered the reaction is instead made against your echo.' },
            { level: 15, name: 'Reclaim Potential', description: 'You\'ve learned to absorb the fleeting magic of your echo. When an echo of yours is destroyed by taking damage, you can gain a number of temporary hit points equal to 2d6 + your Constitution modifier, provided you don\'t already have temporary hit points.' },
            { level: 18, name: 'Legion of One', description: 'You can use a bonus action to create two echoes with your Manifest Echo feature, and these echoes can coexist. If you try to create a third echo, the previous two echoes are destroyed. Anything you can do from one echo\'s position can be done from the other\'s instead.' }
        ]
    },
    {
        id: 'eldritch_knight',
        classId: 'fighter',
        name: 'Eldritch Knight',
        description: 'The archetypal Eldritch Knight combines the martial mastery common to all fighters with a careful study of magic.',
        features: [
            { level: 3, name: 'Spellcasting', description: 'You augment your martial prowess with the ability to cast spells.' },
            { level: 3, name: 'Weapon Bond', description: 'You learn a ritual that creates a magical bond between yourself and one weapon. You perform the ritual over the course of 1 hour, which can be done during a short rest. The weapon must be within your reach throughout the ritual, at the conclusion of which you touch the weapon and forge the bond.' },
            { level: 7, name: 'War Magic', description: 'When you use your action to cast a cantrip, you can make one weapon attack as a bonus action.' },
            { level: 10, name: 'Eldritch Strike', description: 'You learn how to make your weapon strikes undercut a creature\'s resistance to your spells. When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.' },
            { level: 15, name: 'Arcane Charge', description: 'You gain the ability to teleport up to 30 feet to an unoccupied space you can see when becomes Action Surge action.' },
            { level: 18, name: 'Improved War Magic', description: 'When you use your action to cast a spell, you can make one weapon attack as a bonus action.' }
        ]
    },
    {
        id: 'psi_warrior',
        classId: 'fighter',
        name: 'Psi Warrior',
        description: 'Awake to the psionic power within, a Psi Warrior is a fighter who augments their physical might with psi-infused weapon strikes, telekinetic lashes, and barriers of mental force.',
        features: [
            { level: 3, name: 'Psionic Power', description: 'You harbor a wellspring of psionic energy within yourself. This energy is represented by your Psionic Energy dice, which are each a d6. You have a number of these dice equal to twice your proficiency bonus, and they fuel various psionic powers you have.' },
            { level: 7, name: 'Telekinetic Adept', description: 'You have mastered new ways to use your telekinetic abilities: Psi-Powered Leap and Telekinetic Thrust.' },
            { level: 10, name: 'Guarded Mind', description: 'The psionic energy flowing through you has bolstered your mind. You have resistance to psychic damage. Moreover, if you start your turn charmed or frightened, you can expend a Psionic Energy die and end every effect on yourself subjecting you to those conditions.' },
            { level: 15, name: 'Bulwark of Force', description: 'You can shield yourself and others with telekinetic force. As a bonus action, you can choose creatures, which can include you, that you can see within 30 feet of you, up to a number of creatures equal to your Intelligence modifier (minimum of one creature). Each of the chosen creatures is protected by half cover for 1 minute or until you\'re incapacitated.' },
            { level: 18, name: 'Telekinetic Master', description: 'Your ability to move creatures and objects with your mind is matched by few. You can cast the telekinesis spell, requiring no components, and your spellcasting ability for the spell is Intelligence.' }
        ]
    },
    {
        id: 'rune_knight',
        classId: 'fighter',
        name: 'Rune Knight',
        description: 'Rune Knights enhance their martial prowess using the supernatural power of runes, an ancient practice that originated with giants.',
        features: [
            { level: 3, name: 'Mone of the Rune Carver', description: 'You can use smith\'s tools or calligrapher\'s supplies to craft runes.' },
            { level: 3, name: 'Rune Carver', description: 'You learn how to use runes to enhance your gear. You know two runes of your choice.' },
            { level: 3, name: 'Giant\'s Might', description: 'You can imbue yourself with the might of giants. As a bonus action, you magically gain the following benefits, which last for 1 minute: If you are smaller than Large, you become Large, along with anything you are wearing. If you lack the room to become Large, your size doesn\'t change.' },
            { level: 7, name: 'Runic Shield', description: 'You learn to invoke your rune magic to protect your allies. When another creature you can see within 60 feet of you is hit by an attack roll, you can use your reaction to force the attacker to reroll the d20 and use the new roll.' },
            { level: 10, name: 'Great Stature', description: 'The magic of your runes permanently alters you. When you gain this feature, you roll 3d4. You grow a number of inches in height equal to the roll. Moreover, the extra damage you deal with your Giant\'s Might feature increases to 1d8.' },
            { level: 15, name: 'Master of Runes', description: 'You can invoke each rune you know from your Rune Carver feature twice, rather than once, and you regain all expended uses when you finish a short or long rest.' },
            { level: 18, name: 'Runic Juggernaut', description: 'You learn how to amplify your rune-powered transformation. As a result, the extra damage you deal with the Giant\'s Might feature increases to 1d10. Moreover, when you use that feature, your size can increase to Huge, and while you are that size, your reach increases by 5 feet.' }
        ]
    },
    {
        id: 'samurai',
        classId: 'fighter',
        name: 'Samurai',
        description: 'The Samurai is a fighter who draws on an implacable fighting spirit to overcome enemies.',
        features: [
            { level: 3, name: 'Bonus Proficiency', description: 'You gain proficiency in one of the following skills of your choice: History, Insight, Performance, or Persuasion. Alternatively, you learn one language of your choice.' },
            { level: 3, name: 'Fighting Spirit', description: 'As a bonus action on your turn, you can give yourself advantage on weapon attack rolls until the end of the current turn. When you do so, you also gain 5 temporary hit points.' },
            { level: 7, name: 'Elegant Courtier', description: 'You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).' },
            { level: 10, name: 'Tireless Spirit', description: 'When you roll initiative and have no uses of Fighting Spirit remaining, you regain one use.' },
            { level: 15, name: 'Rapid Strike', description: 'You learn to trade accuracy for swift strikes. If you take the Attack action on your turn and have advantage on an attack roll against one of the targets, you can forgo the advantage for that roll to make an additional weapon attack against that target, as part of the same action.' },
            { level: 18, name: 'Strength Before Death', description: 'If you take damage that reduces you to 0 hit points and doesn\'t kill you outright, you can use your reaction to delay falling unconscious, and you can immediately take an extra turn, interrupting the current turn.' }
        ]
    },
    // --- Sorcerer Expansion Subclasses ---
    {
        id: 'aberrant_mind',
        classId: 'sorcerer',
        name: 'Aberrant Mind',
        description: 'An alien influence has wrapped its tendrils around your mind, giving you psionic power. You can touch other minds with that power and alter the world around you.',
        features: [
            { level: 1, name: 'Psionic Spells', description: 'You learn additional spells when you reach certain levels in this class. These spells count as sorcerer spells for you, but they don\'t count against the number of sorcerer spells you know.' },
            { level: 1, name: 'Telepathic Speech', description: 'You can form a telepathic connection between your mind and the mind of another. As a bonus action, choose one creature you can see within 30 feet of you. You and the chosen creature can speak telepathically with each other while the two of you are within a number of miles of each other equal to your Charisma modifier (minimum of 1 mile).' },
            { level: 6, name: 'Psionic Sorcery', description: 'When you cast any spell of 1st level or higher from your Psionic Spells feature, you can cast it by expending a spell slot as normal or by spending a number of sorcery points equal to the spell\'s level. If you cast the spell using sorcery points, it requires no verbal or somatic components, and it requires no material components, unless they are consumed by the spell.' },
            { level: 6, name: 'Psychic Defenses', description: 'You gain resistance to psychic damage, and you have advantage on saving throws against being charmed or frightened.' },
            { level: 14, name: 'Revelation in Flesh', description: 'You can unleash the aberrant truth hidden within your flesh. As a bonus action, you can spend 1 or more sorcery points to magically transform your body for 10 minutes.' },
            { level: 18, name: 'Warping Implosion', description: 'You can unleash your aberrant power as a space-warping anomaly. As an action, you can teleport to an unoccupied space you can see within 120 feet of you. Immediately after you disappear, each creature within 30 feet of the space you left must make a Strength saving throw.' }
        ]
    },
    {
        id: 'clockwork_soul',
        classId: 'sorcerer',
        name: 'Clockwork Soul',
        description: 'The cosmic force of order has suffused you with magic. That power arises from Mechanus or a realm like it—a plane of existence shaped entirely by clockwork efficiency.',
        features: [
            { level: 1, name: 'Clockwork Magic', description: 'You learn additional spells when you reach certain levels in this class.' },
            { level: 1, name: 'Restore Balance', description: 'When a creature you can see within 60 feet of you is about to roll a d20 with advantage or disadvantage, you can use your reaction to prevent the roll from being affected by advantage and disadvantage. You can use this feature a number of times equal to your proficiency bonus.' },
            { level: 6, name: 'Bastion of Law', description: 'You can tap into the grand equation of existence to imbue a creature with a shimmering shield of order. As an action, you can expend 1 to 5 sorcery points to create a magical ward around yourself or another creature you can see within 30 feet of you. The ward lasts until you finish a long rest or until you use this feature again.' },
            { level: 14, name: 'Trance of Order', description: 'You gain the ability to align your consciousness to the endless calculations of Mechanus. As a bonus action, you can enter this state for 1 minute. For the duration, attack rolls against you can\'t be made with advantage, and whenever you make an attack roll, an ability check, or a saving throw, you can treat a roll of 9 or lower on the d20 as a 10.' },
            { level: 18, name: 'Clockwork Cavalcade', description: 'You summon spirits of order to expunge disorder around you. As an action, you summon the spirits in a 30-foot cube originating from you. The spirits look like modrons or other constructs of your choice. The spirits are intangible and invulnerable, and they create the effects: restore HP, repair objects, end conditions.' }
        ]
    },
    {
        id: 'divine_soul',
        classId: 'sorcerer',
        name: 'Divine Soul',
        description: 'Sometimes the spark of magic that fuels a sorcerer comes from a divine source that glimmers within the soul.',
        features: [
            { level: 1, name: 'Divine Magic', description: 'Your link to the divine allows you to learn spells from the cleric class. When your Spellcasting feature lets you learn or replace a sorcerer cantrip or a sorcerer spell of 1st level or higher, you can choose the new spell from the cleric spell list or the sorcerer spell list.' },
            { level: 1, name: 'Favored by the Gods', description: 'If you fail a saving throw or miss with an attack roll, you can roll 2d4 and add it to the total, possibly changing the outcome.' },
            { level: 6, name: 'Empowered Healing', description: 'Whenever you or an ally within 5 feet of you rolls dice to determine the number of hit points a spell restores, you can spend 1 sorcery point to reroll any number of those dice once.' },
            { level: 14, name: 'Otherworldly Wings', description: 'You can use a bonus action to manifest a pair of spectral wings from your back. While the wings are present, you have a flying speed of 30 feet.' },
            { level: 18, name: 'Unearthly Recovery', description: 'You gain the ability to overcome grievous injuries. As a bonus action when you have fewer than half of your hit points remaining, you can regain a number of hit points equal to half your hit point maximum.' }
        ]
    },
    {
        id: 'lunar_sorcery',
        classId: 'sorcerer',
        name: 'Lunar Sorcery',
        description: 'On many worlds, the moon is a revered celestial body with magical properties. You draw on this power.',
        features: [
            { level: 1, name: 'Lunar Embodiment', description: 'You learn additional spells based on the phase of the moon: Full Moon, New Moon, or Crescent Moon.' },
            { level: 1, name: 'Moon Fire', description: 'You can call down the radiant light of the moon. You learn the sacred flame spell, which doesn\'t count against the number of sorcerer cantrips you know.' },
            { level: 6, name: 'Lunar Boons', description: 'The current phase of your Lunar Embodiment has an effect on your metamagic.' },
            { level: 6, name: 'Waxing and Waning', description: 'You can change your Lunar Embodiment phase as a bonus action.' },
            { level: 14, name: 'Lunar Empowerment', description: 'The power of a lunar phase saturates your being. Full Moon: You can use a bonus action to shed bright light. New Moon: You have advantage on Stealth checks. Crescent Moon: You have resistance to necrotic and radiant damage.' },
            { level: 18, name: 'Lunar Phenomenon', description: 'As a bonus action, you can tap into a special power of your current Lunar Embodiment phase. Full Moon: Blinding burst of light. New Moon: Gloom and damage. Crescent Moon: Teleportation.' }
        ]
    },
    {
        id: 'shadow_magic',
        classId: 'sorcerer',
        name: 'Shadow Magic',
        description: 'You are a creature of shadow, for your innate magic comes from the Shadowfell itself.',
        features: [
            { level: 1, name: 'Eyes of the Dark', description: 'You have darkvision with a range of 120 feet.' },
            { level: 1, name: 'Strength of the Grave', description: 'When damage reduces you to 0 hit points, you can make a Charisma saving throw (DC 5 + the damage taken). On a success, you instead drop to 1 hit point. You can\'t use this feature if you are reduced to 0 hit points by radiant damage or by a critical hit.' },
            { level: 3, name: 'Darkness', description: 'You learn the darkness spell, which doesn\'t count against your number of sorcerer spells known. You can cast it by spending 2 sorcery points or by expending a spell slot. If you cast it with sorcery points, you can see through the darkness created by the spell.' }, // Added level 3 although not strictly L1/6/14/18 pattern, important feature
            { level: 6, name: 'Hound of Ill Omen', description: 'As a bonus action, you can spend 3 sorcery points to summon a hound of ill omen to target one creature you can see within 120 feet of you.' },
            { level: 14, name: 'Shadow Walk', description: 'At 14th level, you gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action, you can teleport up to 120 feet to an unoccupied space you can see that is also in dim light or darkness.' },
            { level: 18, name: 'Umbral Form', description: 'You can spend 6 sorcery points as a bonus action to transform yourself into a shadowy form. In this form, you have resistance to all damage except force and radiant damage, and you can move through other creatures and objects as if they were difficult terrain.' }
        ]
    },
    {
        id: 'storm_sorcery',
        classId: 'sorcerer',
        name: 'Storm Sorcery',
        description: 'Your innate magic comes from the power of elemental air.',
        features: [
            { level: 1, name: 'Wind Speaker', description: 'The arcane magic you command is infused with elemental air. You can speak, read, and write Primordial.' },
            { level: 1, name: 'Tempestuous Magic', description: 'You can use a bonus action on your turn to cause whirling gusts of elemental air to briefly surround you, immediately before or after you cast a spell of 1st level or higher. Doing so allows you to fly up to 10 feet without provoking opportunity attacks.' },
            { level: 6, name: 'Heart of the Storm', description: 'You gain resistance to lightning and thunder damage. In addition, whenever you start casting a spell of 1st level or higher that deals lightning or thunder damage, stormy magic erupts from you.' },
            { level: 6, name: 'Storm Guide', description: 'You gain the ability to subtly control the weather. If it is raining, you can use an action to cause the rain to stop falling in a 20-foot-radius sphere centered on you.' },
            { level: 14, name: 'Storm\'s Fury', description: 'When you are hit by a melee attack, you can use your reaction to deal lightning damage to the attacker. The attacker must also make a Strength saving throw or be pushed up to 20 feet away from you.' },
            { level: 18, name: 'Wind Soul', description: 'You have immunity to lightning and thunder damage. You also gain a magical flying speed of 60 feet.' }
        ]
    },
    // --- Rogue Expansion Subclasses ---
    {
        id: 'arcane_trickster',
        classId: 'rogue',
        name: 'Arcane Trickster',
        description: 'Some rogues enhance their fine-honed skills of stealth and agility with magic, learning tricks of enchantment and illusion.',
        features: [
            { level: 3, name: 'Spellcasting', description: 'You gain the ability to cast spells.' },
            { level: 3, name: 'Mage Hand Legerdemain', description: 'When you cast mage hand, you can make the spectral hand invisible, and you can perform the following additional tasks with it: stow object, retrieve object, use thieves\' tools.' },
            { level: 9, name: 'Magical Ambush', description: 'If you are hidden from a creature when you cast a spell on it, the creature has disadvantage on any saving throw it makes against the spell this turn.' },
            { level: 13, name: 'Versatile Trickster', description: 'You gain the ability to distract targets with your Mage Hand. As a bonus action on your turn, you can designate a creature within 5 feet of the spectral hand created by the spell. Doing so gives you advantage on attack rolls against that creature until the end of the turn.' },
            { level: 17, name: 'Spell Thief', description: 'You gain the ability to magically steal the knowledge of how to cast a spell from another spellcaster. Immediately after a creature casts a spell that targets you or includes you in its area of effect, you can use your reaction to force the creature to make a saving throw with its spellcasting ability modifier. The DC equals your spell save DC. On a failed save, you negate the spell\'s effect against you, and you steal the knowledge of the spell if it is at least 1st level and of a level you can cast.' }
        ]
    },
    {
        id: 'inquisitive',
        classId: 'rogue',
        name: 'Inquisitive',
        description: 'As an archetypal Inquisitive, you excel at rooting out secrets and unraveling mysteries.',
        features: [
            { level: 3, name: 'Ear for Deceit', description: 'Whenever you make a Wisdom (Insight) check to determine whether a creature is lying, treat a roll of 7 or lower on the d20 as an 8.' },
            { level: 3, name: 'Eye for Detail', description: 'You can use a bonus action to make a Wisdom (Perception) check to spot a hidden creature or object or to make an Intelligence (Investigation) check to uncover or decipher clues.' },
            { level: 3, name: 'Insightful Fighting', description: 'As a bonus action, you can make a Wisdom (Insight) check against a creature you can see that isn\'t incapacitated, contested by the target\'s Charisma (Deception) check. If you succeed, you can use your Sneak Attack against that target even if you don\'t have advantage on the attack roll, but not if you have disadvantage on it.' },
            { level: 9, name: 'Steady Eye', description: 'You have advantage on any Wisdom (Perception) or Intelligence (Investigation) check if you move no more than half your speed on the same turn.' },
            { level: 13, name: 'Unerring Eye', description: 'You can sense the presence of illusions, shapechangers not in their original form, and other magic designed to deceive the senses within 30 feet of you, provided you aren\'t blinded or deafened.' },
            { level: 17, name: 'Eye for Weakness', description: 'While your Insightful Fighting feature applies to a creature, your Sneak Attack damage against that creature increases by 3d6.' }
        ]
    },
    {
        id: 'mastermind',
        classId: 'rogue',
        name: 'Mastermind',
        description: 'Your focus is on people and on the influence and secrets they have.',
        features: [
            { level: 3, name: 'Master of Intrigue', description: 'You gain proficiency with the disguise kit, the forgery kit, and one gaming set of your choice. You also learn two languages of your choice. Additionally, you can unerringly mimic the speech patterns and accent of a creature that you hear speak for at least 1 minute.' },
            { level: 3, name: 'Master of Tactics', description: 'You can use the Help action as a bonus action. Additionally, when you use the Help action to aid an ally in attacking a creature, the target of that attack can be within 30 feet of you, rather than within 5 feet of you, if the target can see or hear you.' },
            { level: 9, name: 'Insightful Manipulator', description: 'If you spend at least 1 minute observing or interacting with another creature outside combat, you can learn certain information about its capabilities compared to your own.' },
            { level: 13, name: 'Misdirection', description: 'You can sometimes cause another creature to suffer an attack meant for you. When you are targeted by an attack while a creature within 5 feet of you is granting you cover against that attack, you can use your reaction to have the attack target that creature instead of you.' },
            { level: 17, name: 'Soul of Deceit', description: 'Your thoughts can\'t be read by telepathy or other means unless you allow it. You can present false thoughts by succeeding on a Charisma (Deception) check against the mind reader\'s Wisdom (Insight) check. Additionally, no matter what you say, magic that would determine if you are telling the truth indicates that you are being truthful.' }
        ]
    },
    {
        id: 'phantom',
        classId: 'rogue',
        name: 'Phantom',
        description: 'Many rogues walk a fine line between life and death, but a Phantom takes that walk one step further, casually risking contact with undead spirits.',
        features: [
            { level: 3, name: 'Whispers of the Dead', description: 'When you finish a short or long rest, you can choose one skill or tool proficiency that you lack and gain it, as a ghostly presence shares its knowledge with you.' },
            { level: 3, name: 'Wails from the Grave', description: 'As you nudge someone closer to the grave, you can channel the power of death to harm someone else as well. Immediately after you deal your Sneak Attack damage to a creature on your turn, you can target a second creature that you can see within 30 feet of the first creature. Roll half the number of Sneak Attack dice for your level (round up), and the second creature takes necrotic damage equal to the roll\'s total.' },
            { level: 9, name: 'Tokens of the Departed', description: 'When a life ends in your presence, you\'re able to snatch a token from the departing soul, a sliver of its life essence that takes physical form: as a reaction when a creature you can see dies within 30 feet of you, you can open a free hand and cause a tiny trinket to appear there, a soul trinket.' },
            { level: 13, name: 'Ghost Walk', description: 'You can phase partially into the realm of the dead, becoming like a ghost. As a bonus action, you assume a spectral form. While in this form, you have a flying speed of 10 feet, you can hover, and attack rolls have disadvantage against you. You can also move through creatures and objects as if they were difficult terrain.' },
            { level: 17, name: 'Death\'s Friend', description: 'Your association with death has become so close that you gain the following benefits: At the end of a long rest, a soul trinket appears in your hand if you don\'t have one. When you use your Wails from the Grave feature, you can deal the necrotic damage to both the first and the second creature.' }
        ]
    },
    {
        id: 'scout',
        classId: 'rogue',
        name: 'Scout',
        description: 'You are skilled in stealth and surviving far from the streets of a city, allowing you to scout ahead of your companions during expeditions.',
        features: [
            { level: 3, name: 'Skirmisher', description: 'You can move up to half your speed as a reaction when an enemy ends its turn within 5 feet of you. This movement doesn\'t provoke opportunity attacks.' },
            { level: 3, name: 'Survivalist', description: 'You gain proficiency in the Nature and Survival skills. Your proficiency bonus is doubled for any ability check you make that uses either of those proficiencies.' },
            { level: 9, name: 'Superior Mobility', description: 'Your walking speed increases by 10 feet. If you have a climbing or swimming speed, this increase applies to that speed as well.' },
            { level: 13, name: 'Ambush Master', description: 'You have advantage on initiative rolls. In addition, the first creature you hit during the first round of a combat becomes easier for you and others to strike; attack rolls against that target have advantage until the start of your next turn.' },
            { level: 17, name: 'Sudden Strike', description: 'If you take the Attack action on your turn, you can make one additional attack as a bonus action. This attack can benefit from your Sneak Attack even if you have already used it this turn, but you can\'t use your Sneak Attack against the same target more than once in a turn.' }
        ]
    },
    {
        id: 'soulknife',
        classId: 'rogue',
        name: 'Soulknife',
        description: 'Most assassins strike with physical weapons, and many burglars and spies use thieves\' tools to infiltrate secure locations. In contrast, a Soulknife strikes and infiltrates with the mind, cutting through barriers both physical and psychic.',
        features: [
            { level: 3, name: 'Psionic Power', description: 'You harbor a wellspring of psionic energy within yourself. This energy is represented by your Psionic Energy dice, which are each a d6. You have a number of these dice equal to twice your proficiency bonus, and they fuel various psionic powers you have.' },
            { level: 3, name: 'Psychic Blades', description: 'You can manifest your psionic power as shimmering blades of psychic energy. Whenever you take the Attack action, you can manifest a psychic blade from your free hand and make the attack with that blade.' },
            { level: 9, name: 'Soul Blades', description: 'Your Psychic Blades are now an expression of your psi-infused soul, giving you finer control over them: Homing Strikes and Psychic Teleportation.' },
            { level: 13, name: 'Psychic Veil', description: 'You can weave a veil of psychic static to mask yourself. As an action, you can magically become invisible, along with anything you are wearing or carrying, for 1 hour or until you dismiss this effect (no action required).' },
            { level: 17, name: 'Rend Mind', description: 'You can sweep your Psychic Blades directly through a creature\'s mind. When you use your Psychic Blades to deal Sneak Attack damage to a creature, you can force that target to make a Wisdom saving throw. If the save fails, the target is stunned for 1 minute.' }
        ]
    },
    {
        id: 'swashbuckler',
        classId: 'rogue',
        name: 'Swashbuckler',
        description: 'You focus your training on the art of the blade, relying on speed, elegance, and charm in equal parts.',
        features: [
            { level: 3, name: 'Fancy Footwork', description: 'During your turn, if you make a melee attack against a creature, that creature can\'t make opportunity attacks against you for the rest of your turn.' },
            { level: 3, name: 'Rakish Audacity', description: 'Your confidence propels you into battle. You can give yourself a bonus to your initiative rolls equal to your Charisma modifier. You also gain an additional way to use your Sneak Attack; you don\'t need advantage on the attack roll to use your Sneak Attack against a creature if you are within 5 feet of it, no other creatures are within 5 feet of you, and you don\'t have disadvantage on the attack roll.' },
            { level: 9, name: 'Panache', description: 'Your charm becomes extraordinarily beguiling. As an action, you can make a Charisma (Persuasion) check contested by a creature\'s Wisdom (Insight) check. The creature must be able to hear you, and the two of you must share a language. If you succeed on the check and the creature is hostile to you, it has disadvantage on attack rolls against targets other than you and can\'t make opportunity attacks against targets other than you.' },
            { level: 13, name: 'Elegant Maneuver', description: 'You can use a bonus action on your turn to gain advantage on the next Dexterity (Acrobatics) or Strength (Athletics) check you make during the same turn.' },
            { level: 17, name: 'Master Duelist', description: 'Your mastery of the blade lets you turn failure into success in combat. If you miss with an attack roll, you can roll it again with advantage. Once you do so, you can\'t use this feature again until you finish a short or long rest.' }
        ]
    },
    // --- Cleric Expansion Subclasses ---
    {
        id: 'arcana',
        classId: 'cleric',
        name: 'Arcana Domain',
        description: 'Magic is an energy that suffuses the multiverse and that fuels both destruction and creation. Gods of the Arcana domain know the secrets and potential of magic intimately.',
        features: [
            { level: 1, name: 'Arcane Initiate', description: 'You gain proficiency in the Arcana skill, and you gain two cantrips of your choice from the wizard spell list. For you, these cantrips count as cleric cantrips.' },
            { level: 2, name: 'Channel Divinity: Arcane Abjuration', description: 'As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.' },
            { level: 6, name: 'Spell Breaker', description: 'When you restore hit points to an ally with a spell of 1st level or higher, you can also end one spell of your choice on that creature. The level of the spell you end must be equal to or lower than the level of the spell slot you use to cast the healing spell.' },
            { level: 8, name: 'Potent Spellcasting', description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.' },
            { level: 17, name: 'Arcane Mastery', description: 'You choose four spells from the wizard spell list, one from each of the following levels: 6th, 7th, 8th, and 9th. You add them to your list of domain spells. Like your other domain spells, they are always prepared and count as cleric spells for you.' }
        ]
    },
    {
        id: 'death',
        classId: 'cleric',
        name: 'Death Domain',
        description: 'The Death domain is concerned with the forces that cause death, as well as the negative energy that gives rise to undead creatures.',
        features: [
            { level: 1, name: 'Reaper', description: 'You learn one necromancy cantrip of your choice from any spell list. When you cast a necromancy cantrip that normally targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other.' },
            { level: 2, name: 'Channel Divinity: Touch of Death', description: 'When you hit a creature with a melee attack, you can use Channel Divinity to deal extra necrotic damage to the target. The damage equals 5 + twice your cleric level.' },
            { level: 6, name: 'Inescapable Destruction', description: 'Necrotic damage dealt by your cleric spells and Channel Divinity options ignores resistance to necrotic damage.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 necrotic damage. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Improved Reaper', description: 'When you cast a necromancy spell of 1st through 5th level that targets only one creature, the spell can instead target two creatures within range and within 5 feet of each other. If the spell consumes its material components, you must provide them for each target.' }
        ]
    },
    {
        id: 'forge',
        classId: 'cleric',
        name: 'Forge Domain',
        description: 'The gods of the forge are patrons of artisans who work with metal, from a humble blacksmith to a mighty elven artisan.',
        features: [
            { level: 1, name: 'Blessing of the Forge', description: 'At the end of a long rest, you can touch one nonmagical object that is a suit of armor or a simple or martial weapon. Until the end of your next long rest or until you die, the object becomes a magic item, granting a +1 bonus to AC if it\'s armor or a +1 bonus to attack and damage rolls if it\'s a weapon.' },
            { level: 2, name: 'Channel Divinity: Artisan\'s Blessing', description: 'You can use your Channel Divinity to create simple items. You conduct an hour-long ritual that crafts a nonmagical item that must include some metal: a simple or martial weapon, a suit of armor, ten pieces of ammunition, a set of tools, or another metal object.' },
            { level: 6, name: 'Soul of the Forge', description: 'You gain resistance to fire damage. While wearing heavy armor, you gain a +1 bonus to AC.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 fire damage to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Saint of Forge and Fire', description: 'You gain immunity to fire damage. While wearing heavy armor, you have resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.' }
        ]
    },
    {
        id: 'grave',
        classId: 'cleric',
        name: 'Grave Domain',
        description: 'Gods of the grave watch over the line between life and death. To these deities, death and the afterlife are a foundational part of the multiverse.',
        features: [
            { level: 1, name: 'Circle of Mortality', description: 'When you would normally roll one or more dice to restore hit points with a spell to a creature at 0 hit points, you instead use the highest number possible for each die. You also learn the spare the dying cantrip, which has a range of 30 feet for you, and it doesn\'t count against the number of cleric cantrips you know.' },
            { level: 2, name: 'Channel Divinity: Path to the Grave', description: 'As an action, you choose one creature you can see within 30 feet of you, cursing it until the end of your next turn. The next time you or an ally of yours hits the cursed creature with an attack, the creature has vulnerability to all of that attack\'s damage, and then the curse ends.' },
            { level: 6, name: 'Sentinel at Death\'s Door', description: 'As a reaction when you or a creature you can see within 30 feet of you suffers a critical hit, you can turn that hit into a normal hit. Any effects triggered by a critical hit are canceled.' },
            { level: 8, name: 'Potent Spellcasting', description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.' },
            { level: 17, name: 'Keeper of Souls', description: 'When an enemy you can see dies within 60 feet of you, you or one creature of your choice that is within 60 feet of you regains hit points equal to the enemy\'s number of Hit Dice. You can use this feature only if you aren\'t incapacitated. Once you use it, you can\'t do so again until the start of your next turn.' }
        ]
    },
    {
        id: 'knowledge',
        classId: 'cleric',
        name: 'Knowledge Domain',
        description: 'The gods of knowledge—including Oghma, Boccob, Gilean, Aureon, and Thoth—value learning and understanding above all.',
        features: [
            { level: 1, name: 'Blessings of Knowledge', description: 'You learn two languages of your choice. You also become proficient in your choice of two specific skills, and your proficiency bonus is doubled for any ability check you make that uses either of those skills.' },
            { level: 2, name: 'Channel Divinity: Knowledge of the Ages', description: 'You can use your Channel Divinity to tap into a divine well of knowledge. As an action, you choose one skill or tool. For 10 minutes, you have proficiency with the chosen skill or tool.' },
            { level: 6, name: 'Channel Divinity: Read Thoughts', description: 'You can use your Channel Divinity to read a creature\'s thoughts. You can then use your action to force the creature to make a Wisdom saving throw.' },
            { level: 8, name: 'Potent Spellcasting', description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.' },
            { level: 17, name: 'Visions of the Past', description: 'You can call up visions of the past that relate to an object you hold or your immediate surroundings. You spend at least 1 minute in meditation and prayer, then receive dreamlike, shadowy glimpses of recent events.' }
        ]
    },
    {
        id: 'nature',
        classId: 'cleric',
        name: 'Nature Domain',
        description: 'Gods of nature are as varied as the natural world itself, from inscrutable gods of the deep forests to friendly deities associated with particular springs and groves.',
        features: [
            { level: 1, name: 'Acolyte of Nature', description: 'You learn one druid cantrip of your choice. You also gain proficiency in one of the following skills of your choice: Animal Handling, Nature, or Survival. You gain proficiency with heavy armor.' },
            { level: 2, name: 'Channel Divinity: Charm Animals and Plants', description: 'As an action, you present your holy symbol and invoke the name of your deity. Each beast and plant creature that can see you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage.' },
            { level: 6, name: 'Dampen Elements', description: 'When you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 cold, fire, or lightning damage (your choice) to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Master of Nature', description: 'You gain the ability to command animals and plant creatures. While creatures are charmed by your Charm Animals and Plants feature, you can take a bonus action on your turn to verbally command what each of those creatures will do on its next turn.' }
        ]
    },
    {
        id: 'order',
        classId: 'cleric',
        name: 'Order Domain',
        description: 'The Order domain represents discipline, as well as devotion to the laws that govern a society, an institution, or the universe itself.',
        features: [
            { level: 1, name: 'Voice of Authority', description: 'You can invoke the power of law to embolden an ally to attack. If you cast a spell with a spell slot of 1st level or higher and target an ally with the spell, that ally can use their reaction immediately after the spell to make one weapon attack against a creature of your choice that you can see.' },
            { level: 2, name: 'Channel Divinity: Order\'s Demand', description: 'As an action, you present your holy symbol, and each creature of your choice that can see or hear you within 30 feet of you must succeed on a Wisdom saving throw or be charmed by you until the end of your next turn or until the charmed creature takes any damage. You can also cause any charmed creature to drop what it is holding when it fails the saving throw.' },
            { level: 6, name: 'Embodiment of the Law', description: 'You become remarkably adept at channeling magical energy to compel others. If you cast a spell of the enchantment school using a spell slot of 1st level or higher, you can change the spell\'s casting time to 1 bonus action for this casting, provided the spell\'s casting time is normally 1 action.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 psychic damage to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Order\'s Wrath', description: 'If you deal your Divine Strike damage to a creature on your turn, you can curse that creature until the start of your next turn. The next time one of your allies hits the cursed creature with an attack, the target takes an extra 2d8 psychic damage, and the curse ends.' }
        ]
    },
    {
        id: 'peace',
        classId: 'cleric',
        name: 'Peace Domain',
        description: 'The balm of peace thrives at the heart of healthy communities, between friendly nations, and in the souls of the kindhearted.',
        features: [
            { level: 1, name: 'Emboldening Bond', description: 'You can forge an empowering bond among people who are at peace with one another. As an action, you choose a number of willing creatures within 30 feet of you equal to your proficiency bonus. For 10 minutes, the creature can add a d4 to an attack roll, an ability check, or a saving throw it makes.' },
            { level: 2, name: 'Channel Divinity: Balm of Peace', description: 'As an action, you can move up to your speed, without provoking opportunity attacks, and when you move within 5 feet of any other creature during this action, you can restore a number of hit points to that creature equal to 2d6 + your Wisdom modifier.' },
            { level: 6, name: 'Protective Bond', description: 'When a creature affected by your Emboldening Bond feature is about to take damage, a second bonded creature within 30 feet of the first can use its reaction to teleport to an unoccupied space within 5 feet of the first creature. The second creature then takes all the damage instead.' },
            { level: 8, name: 'Potent Spellcasting', description: 'You add your Wisdom modifier to the damage you deal with any cleric cantrip.' },
            { level: 17, name: 'Expansive Bond', description: 'The benefits of your Emboldening Bond and Protective Bond features now work when the creatures are within 60 feet of each other. Moreover, when a creature uses Protective Bond to take someone else\'s damage, the creature has resistance to that damage.' }
        ]
    },
    {
        id: 'tempest',
        classId: 'cleric',
        name: 'Tempest Domain',
        description: 'Gods whose portfolios include the Tempest domain govern storms, sea, and sky.',
        features: [
            { level: 1, name: 'Wrath of the Storm', description: 'Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack, you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, or half as much damage on a successful one.' },
            { level: 2, name: 'Channel Divinity: Destructive Wrath', description: 'When you roll lightning or thunder damage, you can use your Channel Divinity to deal maximum damage, instead of rolling.' },
            { level: 6, name: 'Thunderbolt Strike', description: 'When you deal lightning damage to a Large or smaller creature, you can also push it up to 10 feet away from you.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 thunder damage to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Stormborn', description: 'You have a flying speed equal to your current walking speed whenever you are not underground or indoors.' }
        ]
    },
    {
        id: 'trickery',
        classId: 'cleric',
        name: 'Trickery Domain',
        description: 'Gods of trickery—such as Tymora, Beshaba, Olidammara, Traveler, Garl Glittergold, and Loki—are mischief-makers and instigators who stand as a constant challenge to the accepted order among both gods and mortals.',
        features: [
            { level: 1, name: 'Blessing of the Trickster', description: 'You can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.' },
            { level: 2, name: 'Channel Divinity: Invoke Duplicity', description: 'As an action, you create a perfect illusion of yourself that lasts for 1 minute, or until you lose your concentration (as if you were concentrating on a spell). The illusion appears in an unoccupied space that you can see within 30 feet of you. As a bonus action on your turn, you can move the illusion up to 30 feet to a space you can see, but it must remain within 120 feet of you.' },
            { level: 6, name: 'Channel Divinity: Cloak of Shadows', description: 'As an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 poison damage. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Improved Duplicity', description: 'You can create up to four duplicates of yourself, instead of one, when you use Invoke Duplicity. As a bonus action on your turn, you can move any number of them up to 30 feet, to a maximum range of 120 feet.' }
        ]
    },
    {
        id: 'twilight',
        classId: 'cleric',
        name: 'Twilight Domain',
        description: 'The Twilight domain governs the transition and blending of light into darkness. It is a time of rest and comfort, but also a time when safety and familiarity drift into the unknown.',
        features: [
            { level: 1, name: 'Eyes of Night', description: 'You can see through the deepest gloom. You have darkvision out to a range of 300 feet. In that radius, you can see in dim light as if it were bright light and in darkness as if it were dim light. As an action, you can magically share the darkvision of this feature with willing creatures you can see within 10 feet of you, up to a number of creatures equal to your Wisdom modifier (minimum of one creature).' },
            { level: 1, name: 'Vigilant Blessing', description: 'You can give one creature you touch (including possibly yourself) advantage on the next initiative roll the creature makes. This benefit ends immediately after the roll or if you use this feature again.' },
            { level: 2, name: 'Channel Divinity: Twilight Sanctuary', description: 'You can use your Channel Divinity to refresh your allies with soothing twilight. As an action, you present your holy symbol, and a sphere of twilight emanates from you. The sphere is centered on you, has a 30-foot radius, and is filled with dim light. The sphere moves with you, and it lasts for 1 minute or until you are incapacitated or die.' },
            { level: 6, name: 'Part of the Night', description: 'You can use a bonus action to turn into a shadowy form that gives you a flying speed equal to your walking speed. You can stay in this form for 1 minute or until you revert to your normal form as a bonus action.' }, // Wait, checking source... 'Part of the Night' logic from some sources is different: "Steps of Night: fly speed in dim light/darkness". I will stick to "Steps of Night" logic. Correcting name.
            { level: 6, name: 'Steps of Night', description: 'You can draw on the mystical power of the night to rise into the air. As a bonus action when you are in dim light or darkness, you can magically give yourself a flying speed equal to your walking speed for 1 minute.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 radiant damage to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Twilight Shroud', description: 'The twilight that you summon offers a protective embrace: You and your allies have half cover while in the sphere created by your Twilight Sanctuary.' }
        ]
    },
    {
        id: 'war',
        classId: 'cleric',
        name: 'War Domain',
        description: 'War has many manifestations. It can make heroes of ordinary people. It can be desperate and horrific, with acts of cruelty and cowardice eclipsing instances of excellence and courage.',
        features: [
            { level: 1, name: 'War Priest', description: 'From 1st level, your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action. You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.' },
            { level: 2, name: 'Channel Divinity: Guided Strike', description: 'You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the GM says whether the attack hits or misses.' },
            { level: 6, name: 'Channel Divinity: War God\'s Blessing', description: 'When a creature within 30 feet of you makes an attack roll, you can use your reaction to grant that creature a +10 bonus to the roll, using your Channel Divinity. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.' },
            { level: 8, name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal an extra 1d8 damage of the same type dealt by the weapon to the target. At 14th level, the extra damage increases to 2d8.' },
            { level: 17, name: 'Avatar of Battle', description: 'You gain resistance to bludgeoning, piercing, and slashing damage from nonmagical attacks.' }
        ]
    },
    // --- Paladin Expansion Subclasses ---
    {
        id: 'conquest',
        classId: 'paladin',
        name: 'Oath of Conquest',
        description: 'The Oath of Conquest calls to paladins who seek glory in battle and the subjugation of their enemies.',
        features: [
            { level: 3, name: 'Channel Divinity: Conquering Presence', description: 'You can use your Channel Divinity to exude a terrifying presence. As an action, you force each creature of your choice that you can see within 30 feet of you to make a Wisdom saving throw. On a failed save, a creature becomes frightened of you for 1 minute.' },
            { level: 3, name: 'Channel Divinity: Guided Strike', description: 'You can use your Channel Divinity to strike with supernatural accuracy. When you make an attack roll, you can use your Channel Divinity to gain a +10 bonus to the roll. You make this choice after you see the roll, but before the DM says whether the attack hits or misses.' },
            { level: 7, name: 'Aura of Conquest', description: 'You constantly emanate a menacing aura while you\'re not incapacitated. The aura extends 10 feet from you in every direction, but not through total cover. If a creature is frightened of you, its speed is reduced to 0 while in the aura, and that creature takes psychic damage equal to half your paladin level if it starts its turn there.' },
            { level: 15, name: 'Scornful Rebuke', description: 'Whenever a creature hits you with an attack, that creature takes psychic damage equal to your Charisma modifier (minimum of 1) if you\'re not incapacitated.' },
            { level: 20, name: 'Invincible Conqueror', description: 'You gain the ability to harness extraordinary martial prowess. As an action, you can magically become an avatar of conquest, gaining resistance to all damage, an extra attack, and improved criticals for 1 minute.' }
        ]
    },
    {
        id: 'crown',
        classId: 'paladin',
        name: 'Oath of the Crown',
        description: 'The Oath of the Crown is sworn to the ideals of civilization, be it the spirit of a nation, the fealty owed to a sovereign, or the service to a deity of law and rulership.',
        features: [
            { level: 3, name: 'Channel Divinity: Champion Challenge', description: 'As a bonus action, you issue a challenge that compels other creatures to do battle with you. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can\'t willingly move more than 30 feet away from you.' },
            { level: 3, name: 'Channel Divinity: Turn the Tide', description: 'As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points.' },
            { level: 7, name: 'Divine Allegiance', description: 'When a creature within 5 feet of you takes damage, you can use your reaction to magically substitute your own health for that of the target creature, causing that creature to take no damage. Instead, you take the damage. This damage to you can\'t be reduced or prevented in any way.' },
            { level: 15, name: 'Unyielding Spirit', description: 'You have advantage on saving throws to avoid being paralyzed or stunned.' },
            { level: 20, name: 'Exalted Champion', description: 'You can use your action to gain the following benefits for 1 hour: resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons; your allies within 30 feet of you have advantage on death saving throws and Wisdom saving throws.' }
        ]
    },
    {
        id: 'glory',
        classId: 'paladin',
        name: 'Oath of Glory',
        description: 'Paladins who take the Oath of Glory believe they and their companions are destined to achieve glory through deeds of heroism.',
        features: [
            { level: 3, name: 'Channel Divinity: Peerless Athlete', description: 'As a bonus action, you can use your Channel Divinity to augment your athleticism. For 10 minutes, you have advantage on Strength (Athletics) and Dexterity (Acrobatics) checks; you can carry, push, drag, and lift twice as much weight as normal; and the distance of your long and high jumps increases by 10 feet.' },
            { level: 3, name: 'Channel Divinity: Inspiring Smite', description: 'Immediately after you deal damage to a creature with your Divine Smite, you can use your Channel Divinity as a bonus action and distribute temporary hit points to creatures of your choice within 30 feet of you, which can include you. The total number of temporary hit points equals 2d8 + your level in this class.' },
            { level: 7, name: 'Aura of Alacrity', description: 'You emanate an aura that fills you and your companions with supernatural speed. Your walking speed increases by 10 feet. In addition, if you aren\'t incapacitated, the walking speed of any ally who starts their turn within 5 feet of you increases by 10 feet until the end of that turn.' },
            { level: 15, name: 'Glorious Defense', description: 'When you or another creature you can see within 10 feet of you is hit by an attack roll, you can use your reaction to grant a bonus to the target\'s AC against that attack, potentially causing it to miss. The bonus equals your Charisma modifier (minimum of +1). If the attack misses, you can make one weapon attack against the attacker as part of this reaction.' },
            { level: 20, name: 'Living Legend', description: 'You can empower yourself with the legends—whether true or exaggerated—of your great deeds. As a bonus action, you gain the following benefits for 1 minute: advantage on Charisma checks, once on each of your turns when you miss with a weapon attack you can hit instead, and you can use your reaction to reroll a failed saving throw.' }
        ]
    },
    {
        id: 'redemption',
        classId: 'paladin',
        name: 'Oath of Redemption',
        description: 'The Oath of Redemption sets a paladin on a difficult path, one that requires a holy warrior to use violence only as a last resort.',
        features: [
            { level: 3, name: 'Channel Divinity: Emissary of Peace', description: 'You can use your Channel Divinity to augment your presence with divine power. As a bonus action, you grant yourself a +5 bonus to Charisma (Persuasion) checks for the next 10 minutes.' },
            { level: 3, name: 'Channel Divinity: Rebuke the Violent', description: 'You can use your Channel Divinity to rebuke those who use violence. Immediately after an attacker within 30 feet of you deals damage with an attack against a creature other than you, you can use your reaction to force the attacker to make a Wisdom saving throw. On a failed save, the attacker takes radiant damage equal to the damage it just dealt. On a successful save, it takes half as much damage.' },
            { level: 7, name: 'Aura of the Guardian', description: 'When a creature within 10 feet of you takes damage, you can use your reaction to magically take that damage, instead of that creature taking it. This feature doesn\'t transfer any other effects that might accompany the damage, and this damage can\'t be reduced in any way.' },
            { level: 15, name: 'Protective Spirit', description: 'You regain hit points equal to 1d6 + half your paladin level if you end your turn in combat with fewer than half of your hit points remaining and you aren\'t incapacitated.' },
            { level: 20, name: 'Emissary of Redemption', description: 'You become an avatar of peace, which gives you two benefits: You have resistance to all damage dealt by other creatures (their attacks, spells, and other effects), and whenever a creature hits you with an attack, it takes radiant damage equal to half the damage you take from the attack.' }
        ]
    },
    {
        id: 'vengeance',
        classId: 'paladin',
        name: 'Oath of Vengeance',
        description: 'The Oath of Vengeance is a solemn commitment to punish those who have committed a grievous sin.',
        features: [
            { level: 3, name: 'Channel Divinity: Abjure Enemy', description: 'As an action, you present your holy symbol and speak a prayer of denunciation, using your Channel Divinity. Choose one creature within 60 feet of you that you can see. That creature must make a Wisdom saving throw, unless it is immune to being frightened. Fiends and undead have disadvantage on this saving throw. On a failed save, the creature is frightened for 1 minute or until it takes any damage. While frightened, the creature\'s speed is 0, and it can\'t benefit from any bonus to its speed.' },
            { level: 3, name: 'Channel Divinity: Vow of Enmity', description: 'As a bonus action, you can utter a vow of enmity against a creature you can see within 10 feet of you, using your Channel Divinity. You gain advantage on attack rolls against the creature for 1 minute or until it drops to 0 hit points or falls unconscious.' },
            { level: 7, name: 'Relentless Avenger', description: 'When you hit a creature with an opportunity attack, you can move up to half your speed immediately after the attack and as part of the same reaction. This movement doesn\'t provoke opportunity attacks.' },
            { level: 15, name: 'Soul of Vengeance', description: 'When a creature under the effect of your Vow of Enmity makes an attack, you can use your reaction to make a melee weapon attack against that creature if it is within range.' },
            { level: 20, name: 'Avenging Angel', description: 'You can use an action to transform into an angel of vengeance for 1 hour. You gain wings and a flying speed of 60 feet, and you radiate an aura of menace.' }
        ]
    },
    {
        id: 'watchers',
        classId: 'paladin',
        name: 'Oath of the Watchers',
        description: 'The Oath of the Watchers binds paladins to protect mortal realms from the predations of extraplanar creatures.',
        features: [
            { level: 3, name: 'Channel Divinity: Watcher\'s Will', description: 'You can use your Channel Divinity to invest your presence with the warding power of your faith. As an action, you can choose a number of creatures you can see within 30 feet of you, up to a number equal to your Charisma modifier (minimum of one creature). For 1 minute, you and the chosen creatures have advantage on Intelligence, Wisdom, and Charisma saving throws.' },
            { level: 3, name: 'Channel Divinity: Abjure the Extraplanar', description: 'You can use your Channel Divinity to castigate unworldly beings. As an action, you present your holy symbol and each celestial, elemental, fey, or fiend within 30 feet of you that can hear you must make a Wisdom saving throw. On a failed save, the creature is turned for 1 minute or until it takes damage.' },
            { level: 7, name: 'Aura of the Sentinel', description: 'You emit an aura of alertness while you aren\'t incapacitated. When you and any creatures of your choice within 10 feet of you roll initiative, you all gain a bonus to initiative equal to your proficiency bonus.' },
            { level: 15, name: 'Vigilant Rebuke', description: 'You\'ve learned how to chastise anyone who dares wield beguilements against you and your wards. Whenever you or a creature you can see within 30 feet of you succeeds on an Intelligence, a Wisdom, or a Charisma saving throw, you can use your reaction to deal 2d8 + your Charisma modifier force damage to the creature that forced the saving throw.' },
            { level: 20, name: 'Mortal Bulwark', description: 'You manifest a spark of divine power in defense of the mortal realms. As a bonus action, you gain the following benefits for 1 minute: You gain truesight with a range of 120 feet, and you have advantage on attack rolls against celestials, elementals, fey, and fiends.' }
        ]
    },
    {
        id: 'oathbreaker',
        classId: 'paladin',
        name: 'Oathbreaker',
        description: 'An Oathbreaker is a paladin who breaks their sacred oaths to pursue some dark ambition or serve an evil power.',
        features: [
            { level: 3, name: 'Channel Divinity: Control Undead', description: 'As an action, the paladin targets one undead creature they can see within 30 feet of them. The target must make a Wisdom saving throw. On a failed save, the target must obey the paladin\'s commands for the next 24 hours, or until the paladin uses this Channel Divinity option again.' },
            { level: 3, name: 'Channel Divinity: Dreadful Aspect', description: 'As an action, the paladin channels the darkest emotions and focuses them into a burst of magical menace. Each creature of the paladin\'s choice within 30 feet of the paladin must make a Wisdom saving throw if it can see the paladin. On a failed save, the target is frightened of the paladin for 1 minute.' },
            { level: 7, name: 'Aura of Hate', description: 'The paladin, as well as any fiends and undead within 10 feet of the paladin, gains a bonus to melee weapon damage rolls equal to the paladin\'s Charisma modifier (minimum of +1).' },
            { level: 15, name: 'Supernatural Resistance', description: 'The paladin gains resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.' },
            { level: 20, name: 'Dread Lord', description: 'The paladin can use an action to surround themselves with an aura of gloom that lasts for 1 minute. The aura reduces bright light to dim light within 30 feet of the paladin. Whenever an enemy that is frightened by the paladin starts its turn in the aura, it takes 4d10 psychic damage.' }
        ]
    },
    // --- Ranger Expansion Subclasses ---
    {
        id: 'fey_wanderer',
        classId: 'ranger',
        name: 'Fey Wanderer',
        description: 'A Fey Wanderer guards the border between the Feywild and the Material Plane, navigating both with equal ease.',
        features: [
            { level: 3, name: 'Dreadful Strikes', description: 'When you hit a creature with a weapon, you can deal an extra 1d4 psychic damage to the target, which can take this extra damage only once per turn. The extra damage increases to 1d6 when you reach 11th level in this class.' },
            { level: 3, name: 'Fey Wanderer Magic', description: 'You learn an additional spell when you reach certain levels in this class: Charm Person (3rd), Misty Step (5th), Dispel Magic (9th), Dimension Door (13th), Mislead (17th).' },
            { level: 3, name: 'Otherworldly Glamour', description: 'Whenever you make a Charisma check, you gain a bonus to the check equal to your Wisdom modifier (minimum of +1).' },
            { level: 7, name: 'Beguiling Twist', description: 'You have advantage on saving throws against being charmed or frightened. In addition, whenever you or a creature you can see within 120 feet of you succeeds on a saving throw against being charmed or frightened, you can use your reaction to force a different creature you can see within 120 feet of you to make a Wisdom saving throw. If the save fails, the target is charmed or frightened by you (your choice) for 1 minute.' },
            { level: 11, name: 'Fey Reinforcements', description: 'You know the summon fey spell. It doesn\'t count against the number of ranger spells you know, and you can cast it without a material component. You can also cast it once without a spell slot, and you regain the ability to do so when you finish a long rest.' },
            { level: 15, name: 'Misty Wanderer', description: 'You can cast misty step without expending a spell slot. You can do so a number of times equal to your Wisdom modifier (minimum of once), and you regain all expended uses when you finish a long rest. In addition, whenever you cast misty step, you can bring along one willing creature you can see within 5 feet of you.' }
        ]
    },
    {
        id: 'gloom_stalker',
        classId: 'ranger',
        name: 'Gloom Stalker',
        description: 'Gloom Stalkers are at home in the darkest places: deep in the earth, in gloomy alleyways, and in primeval forests. Most folk enter such places with trepidation, but a Gloom Stalker ventures boldly into the darkness.',
        features: [
            { level: 3, name: 'Dread Ambusher', description: 'You master the art of the ambush. You can give yourself a bonus to your initiative rolls equal to your Wisdom modifier. At the start of your first turn of each combat, your walking speed increases by 10 feet, which lasts until the end of that turn. If you take the Attack action on that turn, you can make one additional weapon attack as part of that action. If that attack hits, the target takes an extra 1d8 damage of the weapon\'s damage type.' },
            { level: 3, name: 'Umbral Sight', description: 'You gain darkvision out to a range of 60 feet. If you already have darkvision from your race, its range increases by 30 feet. You are also adept at evading creatures that rely on darkvision. While in darkness, you are invisible to any creature that relies on darkvision to see you in that darkness.' },
            { level: 7, name: 'Iron Mind', description: 'You gain proficiency in Wisdom saving throws. If you already have this proficiency, you instead gain proficiency in Intelligence or Charisma saving throws (your choice).' },
            { level: 11, name: 'Stalker\'s Flurry', description: 'Once on each of your turns when you miss with a weapon attack, you can make another weapon attack as part of the same action.' },
            { level: 15, name: 'Shadowy Dodge', description: 'Whenever a creature attacks you and does not have advantage on the roll, you can use your reaction to impose disadvantage on it. You can use this feature whenever you want, provided you aren\'t incapacitated.' }
        ]
    },
    {
        id: 'horizon_walker',
        classId: 'ranger',
        name: 'Horizon Walker',
        description: 'Horizon Walkers guard the world against threats that originate from other planes or that seek to ravage the mortal realm with otherworldly magic.',
        features: [
            { level: 3, name: 'Detect Portal', description: 'As an action, you detect the distance and direction to the closest planar portal within 1 mile of you. You also sense which plane of existence the portal leads to.' },
            { level: 3, name: 'Planar Warrior', description: 'As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack.' },
            { level: 7, name: 'Ethereal Step', description: 'As a bonus action, you can cast the etherealness spell with this feature, without expending a spell slot, but the spell ends at the end of the current turn.' },
            { level: 11, name: 'Distant Strike', description: 'When you take the Attack action, you can teleport up to 10 feet before each attack to an unoccupied space you can see. If you attack at least two different creatures with the action, you can make one additional attack with it against a third creature.' },
            { level: 15, name: 'Spectral Defense', description: 'When you take damage from an attack, you can use your reaction to give yourself resistance to all of that attack\'s damage on this turn.' }
        ]
    },
    {
        id: 'monster_slayer',
        classId: 'ranger',
        name: 'Monster Slayer',
        description: 'You have dedicated yourself to hunting down creatures of the night and wielders of grim magic.',
        features: [
            { level: 3, name: 'Hunter\'s Sense', description: 'As an action, choose one creature you can see within 60 feet of you. You immediately learn whether the creature has any damage immunities, resistances, or vulnerabilities and what they are. You can use this feature a number of times equal to your Wisdom modifier (minimum of once).' },
            { level: 3, name: 'Slayer\'s Prey', description: 'As a bonus action, you designate one creature you can see within 60 feet of you as the target of this feature. The first time each turn that you hit that target with a weapon attack, it takes an extra 1d6 damage from the weapon.' },
            { level: 7, name: 'Supernatural Defense', description: 'Whenever the target of your Slayer\'s Prey forces you to make a saving throw and whenever you make an ability check to escape that target\'s grapple, add 1d6 to your roll.' },
            { level: 11, name: 'Magic-User\'s Nemesis', description: 'When you see a creature casting a spell or teleporting within 60 feet of you, you can use your reaction to try to magically foil it. The creature must succeed on a Wisdom saving throw against your spell save DC, or its spell or teleport fails and is wasted.' },
            { level: 15, name: 'Slayer\'s Counter', description: 'If the target of your Slayer\'s Prey forces you to make a saving throw, you can use your reaction to make one weapon attack against the quarry. You make this attack immediately before making the saving throw. If the attack hits, your save automatically succeeds, in addition to the attack\'s normal effects.' }
        ]
    },
    {
        id: 'swarmkeeper',
        classId: 'ranger',
        name: 'Swarmkeeper',
        description: 'A Swarmkeeper ranger works to protect nature by gathering a swarm of nature spirits to aid them.',
        features: [
            { level: 3, name: 'Gathered Swarm', description: 'A swarm of intangible nature spirits has bonded to you and can assist you in battle. Once on each of your turns, you can cause the swarm to assist you in one of the following ways, immediately after you hit a creature with an attack: add 1d6 piercing damage, move the target 15 feet horizontally, or move yourself 5 feet horizontally.' },
            { level: 7, name: 'Writhing Tide', description: 'You can condense part of your swarm into a focused mass that lifts you up. As a bonus action, you gain a flying speed of 10 feet and can hover. This effect lasts for 1 minute.' },
            { level: 11, name: 'Mighty Swarm', description: 'Your Gathered Swarm damage increases to 1d8. If you attempt to move a creature with the swarm, you can knock the creature prone if the saving throw fails. When you move yourself with the swarm, you gain half cover until the start of your next turn.' },
            { level: 15, name: 'Swarming Dispersal', description: 'When you take damage, you can use your reaction to give yourself resistance to that damage. You vanish into your swarm and then teleport to an unoccupied space that you can see within 30 feet of you.' }
        ]
    },
    {
        id: 'drakewarden',
        classId: 'ranger',
        name: 'Drakewarden',
        description: 'Drakewardens are rangers who use their magical connection with nature to form an enduring bond with a minor dragon, a drake.',
        features: [
            { level: 3, name: 'Draconic Gift', description: 'The bond you share with your drake creates a deeper connection to dragon kind, granting you the following benefits: Thaumaturgy cantrip, and you learn to speak, read, and write Draconic.' },
            { level: 3, name: 'Drake Companion', description: 'As an action, you can magically summon the drake that is bound to you. It appears in an unoccupied space of your choice within 30 feet of you. The drake is friendly to you and your companions, and it obeys your commands.' },
            { level: 7, name: 'Bond of Fang and Scale', description: 'While your drake is summoned, you and the drake gain the following benefits: You gain resistance to the damage type associated with your drake\'s Draconic Essence. Choose one: The drake deals an extra 1d6 damage of that type when it bites, or you can ride the drake.' },
            { level: 11, name: 'Drake\'s Breath', description: 'As an action, you can exhale a 30-foot cone of damaging breath or cause your drake to exhale it. Choose acid, cold, fire, lightning, or poison damage. Each creature in the cone must make a Dexterity saving throw, taking 8d6 damage on a failed save, or half as much damage on a successful one.' },
            { level: 15, name: 'Perfected Bond', description: 'Your drake grows to Large size. The drake\'s bite attack deals an extra 1d6 damage of the type chosen for its Draconic Essence. When either you or the drake takes damage while you\'re within 30 feet of each other, you can use your reaction to give yourself or the drake resistance to that instance of damage.' }
        ]
    },
    // --- Bard Expansion Subclasses ---
    {
        id: 'creation',
        classId: 'bard',
        name: 'College of Creation',
        description: 'Bards of the College of Creation believe that the cosmos is a work of art - the creation of the first dragons and gods.',
        features: [
            { level: 3, name: 'Mote of Potential', description: 'When you give a creature a Bardic Inspiration die, you can utter a note from the Song of Creation to create a tiny elusive sphere of energy that orbits within 5 feet of that creature. The mote provides a bonus effect when the Bardic Inspiration die is used.' },
            { level: 3, name: 'Performance of Creation', description: 'As an action, you can channel the magic of the Song of Creation to create one nonmagical item of your choice in an unoccupied space within 10 feet of you. The item must appear on a surface or in a liquid that can support it.' },
            { level: 6, name: 'Animating Performance', description: 'As an action, you can target a Large or smaller nonmagical item you can see within 30 feet of you and animate it. The animate item uses the Dancing Item stat block.' },
            { level: 14, name: 'Creative Crescendo', description: 'When you use your Performance of Creation feature, you can create more than one item at once. You can create a number of items equal to your Charisma modifier (minimum of one).' }
        ]
    },
    {
        id: 'eloquence',
        classId: 'bard',
        name: 'College of Eloquence',
        description: 'Adherents of the College of Eloquence master the art of oratory. Persuasion is regarded as a high art, and a well-reasoned argument as potent as a sharp sword.',
        features: [
            { level: 3, name: 'Silver Tongue', description: 'You are a master at saying the right thing at the right time. When you make a Charisma (Persuasion) or Charisma (Deception) check, you can treat a d20 roll of 9 or lower as a 10.' },
            { level: 3, name: 'Unsettling Words', description: 'You can spin words that unsettle a creature and cause it to doubt itself. As a bonus action, you can expend one use of your Bardic Inspiration and choose one creature you can see within 60 feet of you. Roll the Bardic Inspiration die. The creature must subtract the number rolled from the next saving throw it makes before the start of your next turn.' },
            { level: 6, name: 'Unfailing Inspiration', description: 'Your inspiring words are so persuasive that others feel driven to succeed. When a creature adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll fails, the creature can keep the Bardic Inspiration die.' },
            { level: 14, name: 'Infectious Inspiration', description: 'When you successfully inspire someone, the power of your eloquence can spread to someone else. When a creature within 60 feet of you adds one of your Bardic Inspiration dice to its ability check, attack roll, or saving throw and the roll succeeds, you can use your reaction to encourage a different creature (other than yourself) that can hear you within 60 feet of you, giving it a Bardic Inspiration die without expending any of your Bardic Inspiration uses.' }
        ]
    },
    {
        id: 'glamour',
        classId: 'bard',
        name: 'College of Glamour',
        description: 'The College of Glamour is the home of bards who mastered their craft in the vibrant realm of the Feywild or under the tutelage of someone who dwelt there.',
        features: [
            { level: 3, name: 'Mantle of Inspiration', description: 'As a bonus action, you can spend one use of your Bardic Inspiration to grant yourself a wondrous appearance. When you do so, choose a number of creatures you can see and that can see you within 60 feet of you, up to a number equal to your Charisma modifier (minimum of one). Each of them gains 5 temporary hit points. When a creature gains these temporary hit points, it can immediately use its reaction to move up to its speed, without provoking opportunity attacks.' },
            { level: 3, name: 'Enthralling Performance', description: 'You can charge your performance with seductive, fey magic. If you perform for at least 1 minute, you can attempt to inspire wonder in your audience. At the end of the performance, choose a number of humanoids within 60 feet of you who watched and listened to all of it, up to a number equal to your Charisma modifier (minimum of one). Each target must succeed on a Wisdom saving throw against your spell save DC or be charmed by you.' },
            { level: 6, name: 'Mantle of Majesty', description: 'You gain the ability to cloak yourself in a fey magic that makes others want to serve you. As a bonus action, you cast command, without expending a spell slot, and you take on an appearance of unearthly beauty for 1 minute.' },
            { level: 14, name: 'Unbreakable Majesty', description: 'Your appearance permanently gains an otherworldly aspect that makes you look more lovely and fierce. In addition, as a bonus action, you can assume a magically majestic presence for 1 minute. For the duration, whenever any creature tries to attack you for the first time on a turn, the attacker must make a Charisma saving throw against your spell save DC.' }
        ]
    },
    {
        id: 'spirits',
        classId: 'bard',
        name: 'College of Spirits',
        description: 'Bards of the College of Spirits seek tales with inherent power—be they legends, histories, or fictions—and bring them to life.',
        features: [
            { level: 3, name: 'Guiding Whispers', description: 'You learn the guidance cantrip, which doesn\'t count against the number of bard cantrips you know. For you, it has a range of 60 feet.' },
            { level: 3, name: 'Spiritual Focus', description: 'You can use the following objects as a spellcasting focus for your bard spells: a candle, crystal ball, skull, spirit board, or tarokka deck.' },
            { level: 3, name: 'Tales from Beyond', description: 'You can reach out to spirits to guide you and others. You can use a bonus action to expend one use of your Bardic Inspiration and roll on the Spirit Tales table to determine the tale the spirits generally tell you.' },
            { level: 6, name: 'Spiritual Focus (Damage/Healing)', description: 'When you cast a bard spell that deals damage or restores hit points through the Spiritual Focus, roll a d6, and you gain a bonus to one damage or healing roll of the spell equal to the number rolled.' },
            { level: 14, name: 'Mystical Connection', description: 'Your connection to spirits has become semi-permanent. Whenever you roll on the Spirit Tales table, you can roll the die twice and choose which of the two effects to bestow. If you roll the same number on both dice, you can ignore the number and choose any effect on the table.' }
        ]
    },
    {
        id: 'swords',
        classId: 'bard',
        name: 'College of Swords',
        description: 'Bards of the College of Swords are called blades, and they entertain through daring feats of weapon prowess.',
        features: [
            { level: 3, name: 'Bonus Proficiencies', description: 'You gain proficiency with medium armor and the scimitar.' },
            { level: 3, name: 'Fighting Style', description: 'You adopt a particular style of fighting as your specialty. Choose one of the following options: Dueling or Two-Weapon Fighting.' },
            { level: 3, name: 'Blade Flourish', description: 'Whenever you take the Attack action on your turn, your walking speed increases by 10 feet until the end of the turn, and if a weapon attack that you make as part of this action hits a creature, you can use one of the following Blade Flourish options of your choice.' },
            { level: 6, name: 'Extra Attack', description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.' },
            { level: 14, name: 'Master\'s Flourish', description: 'Whenever you use a Blade Flourish option, you can roll a d6 and use it instead of expending a Bardic Inspiration die.' }
        ]
    },
    {
        id: 'whispers',
        classId: 'bard',
        name: 'College of Whispers',
        description: 'Most folk are happy to welcome a bard into their midst, but these bards are wolves among sheep.',
        features: [
            { level: 3, name: 'Psychic Blades', description: 'When you hit a creature with a weapon attack, you can expend one use of your Bardic Inspiration to deal an extra 2d6 psychic damage to that target. You can do so only once per round on your turn.' },
            { level: 3, name: 'Words of Terror', description: 'If you speak to a humanoid alone for at least 1 minute, you can attempt to seed paranoia in its mind. At the end of the conversation, the target must succeed on a Wisdom saving throw against your spell save DC or be frightened of you or another creature of your choice.' },
            { level: 6, name: 'Mantle of Whispers', description: 'When a humanoid dies within 30 feet of you, you can use your reaction to capture its shadow using your reaction. You can use the shadow to adopt the dead humanoid\'s persona.' },
            { level: 14, name: 'Shadow Lore', description: 'You gain the ability to weave dark magic into your words and tap into a creature\'s deepest fears. As an action, you magically whisper a phrase that only one creature of your choice within 30 feet of you can hear. The target must make a Wisdom saving throw against your spell save DC. On a failed save, the target is charmed by you for the next 8 hours.' }
        ]
    },
    // --- Wizard Expansion Subclasses ---
    {
        id: 'bladesinging',
        classId: 'wizard',
        name: 'Bladesinging',
        description: 'Bladesingers master a tradition of wizardry that incorporates swordplay and dance.',
        features: [
            { level: 2, name: 'Training in War and Song', description: 'You gain proficiency with light armor, and you gain proficiency with one type of one-handed melee weapon of your choice. You also gain proficiency in the Performance skill if you don\'t already have it.' },
            { level: 2, name: 'Bladesong', description: 'You can invoke a secret elven magic called the Bladesong, provided that you aren\'t wearing medium or heavy armor or using a shield. It graces you with supernatural speed, agility, and focus.' },
            { level: 6, name: 'Extra Attack', description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn. Moreover, you can cast one of your cantrips in place of one of those attacks.' },
            { level: 10, name: 'Song of Defense', description: 'You can direct your magic to absorb damage while your Bladesong is active. When you take damage, you can use your reaction to expend one spell slot and reduce that damage to you by an amount equal to five times the spell slot\'s level.' },
            { level: 14, name: 'Song of Victory', description: 'You can add your Intelligence modifier (minimum of +1) to the damage of your melee weapon attacks while your Bladesong is active.' }
        ]
    },
    {
        id: 'chronurgy',
        classId: 'wizard',
        name: 'Chronurgy Magic',
        description: 'Chronurgy magic focuses on time, manipulating it to aid allies and hinder foes.',
        features: [
            { level: 2, name: 'Chronal Shift', description: 'You can magically exert limited control over the flow of time around a creature. As a reaction, after you or a creature you can see within 30 feet of you makes an attack roll, an ability check, or a saving throw, you can force the creature to reroll.' },
            { level: 2, name: 'Temporal Awareness', description: 'You can add your Intelligence modifier to your initiative rolls.' },
            { level: 6, name: 'Momentary Stasis', description: 'As an action, you can magically force a Large or smaller creature you can see within 60 feet of you to make a Constitution saving throw. Unless the saving throw is a success, the creature is encased in a field of magical energy until the end of your next turn or until the creature takes any damage. While encased in this way, the creature is incapacitated and has a speed of 0.' },
            { level: 10, name: 'Arcane Abeyance', description: 'When you cast a spell using a spell slot of 4th level or lower, you can condense the spell\'s magic into a mote. The spell is frozen in time at the moment of casting and held within a gray bead for 1 hour. A creature holding the bead can use its action to release the spell.' },
            { level: 14, name: 'Convergent Future', description: 'You can peer through possible futures and magically pull one of them into events around you, ensuring a particular outcome. When you or a creature you can see within 60 feet of you makes an attack roll, an ability check, or a saving throw, you can use your reaction to ignore the die roll and decide whether the number rolled is the minimum needed to succeed or one less than that number (your choice).' }
        ]
    },
    {
        id: 'conjuration',
        classId: 'wizard',
        name: 'School of Conjuration',
        description: 'As a conjurer, you favor spells that produce objects and creatures from thin air.',
        features: [
            { level: 2, name: 'Conjuration Savant', description: 'The gold and time you must spend to copy a conjuration spell into your spellbook is halved.' },
            { level: 2, name: 'Minor Conjuration', description: 'You can use your action to conjure up an inanimate object in your hand or on the ground in an unoccupied space that you can see within 10 feet of you. This object can be no larger than 3 feet on a side and weigh no more than 10 pounds, and its form must be that of a nonmagical object that you have seen.' },
            { level: 6, name: 'Benign Transposition', description: 'You can use your action to teleport up to 30 feet to an unoccupied space that you can see. Alternatively, you can choose a space within range that is occupied by a Small or Medium creature. If that creature is willing, you both teleport, swapping places.' },
            { level: 10, name: 'Focused Conjuration', description: 'While you are concentrating on a conjuration spell, your concentration can\'t be broken as a result of taking damage.' },
            { level: 14, name: 'Durable Summons', description: 'Any creature that you summon or create with a conjuration spell has 30 temporary hit points.' }
        ]
    },
    {
        id: 'divination',
        classId: 'wizard',
        name: 'School of Divination',
        description: 'The School of Divination creates masters of remote viewing, supernatural knowledge, and foresight.',
        features: [
            { level: 2, name: 'Divination Savant', description: 'The gold and time you must spend to copy a divination spell into your spellbook is halved.' },
            { level: 2, name: 'Portent', description: 'Glimpses of the future begin to press in on your awareness. When you finish a long rest, roll two d20s and record the numbers rolled. You can replace any attack roll, saving throw, or ability check made by you or a creature that you can see with one of these foretelling rolls.' },
            { level: 6, name: 'Expert Divination', description: 'Casting divination spells comes so easily to you that it expends only a fraction of your spellcasting efforts. When you cast a divination spell of 2nd level or higher using a spell slot, you regain one expended spell slot.' },
            { level: 10, name: 'The Third Eye', description: 'You can use your action to increase your powers of perception (Darkvision, Ethereal Sight, Greater Comprehension, or See Invisibility).' },
            { level: 14, name: 'Greater Portent', description: 'You roll three d20s for your Portent feature, rather than two.' }
        ]
    },
    {
        id: 'enchantment',
        classId: 'wizard',
        name: 'School of Enchantment',
        description: 'As a member of the School of Enchantment, you have honed your ability to magically entrance and beguile other people and monsters.',
        features: [
            { level: 2, name: 'Enchantment Savant', description: 'The gold and time you must spend to copy an enchantment spell into your spellbook is halved.' },
            { level: 2, name: 'Hypnotic Gaze', description: 'As an action, choose one creature that you can see within 5 feet of you. If the target can see or hear you, it must succeed on a Wisdom saving throw against your wizard spell save DC or be charmed by you until the end of your next turn.' },
            { level: 6, name: 'Instinctive Charm', description: 'When a creature you can see within 30 feet of you makes an attack roll against you, you can use your reaction to divert the attack, provided that another creature is within the attack\'s range.' },
            { level: 10, name: 'Split Enchantment', description: 'When you cast an enchantment spell of 1st level or higher that targets only one creature, you can have it target a second creature.' },
            { level: 14, name: 'Alter Memories', description: 'When you cast an enchantment spell to charm one or more creatures, you can alter one creature\'s understanding so that it remains unaware of being charmed.' }
        ]
    },
    {
        id: 'graviturgy',
        classId: 'wizard',
        name: 'Graviturgy Magic',
        description: 'Graviturgy magic manipulates the forces of gravity to crush foes or lighten burdens.',
        features: [
            { level: 2, name: 'Adjust Density', description: 'As an action, you can magically alter the weight of one object or creature you can see within 30 feet of you. The object or creature must be Large or smaller. The target\'s weight is halved or doubled for up to 1 minute, affecting its speed and ability checks.' },
            { level: 6, name: 'Gravity Well', description: 'Whenever you cast a spell on a creature, you can move the target 5 feet to an unoccupied space of your choice if the target is willing to move, the spell hits it with an attack, or it fails a saving throw against the spell.' },
            { level: 10, name: 'Violent Attraction', description: 'When another creature that you can see within 60 feet of you hits with a weapon attack, you can use your reaction to increase the attack\'s damage by 1d10. Alternatively, if a creature you can see within 60 feet of you takes damage from a fall, you can use your reaction to increase the fall\'s damage by 2d10.' },
            { level: 14, name: 'Event Horizon', description: 'As an action, you can magically emit a powerful field of gravitational energy that tugs at other creatures for 1 minute or until your concentration ends. For the duration, whenever a creature hostile to you starts its turn within 30 feet of you, it must make a Strength saving throw. On a failed save, it takes 2d10 force damage, and its speed is reduced to 0 until the start of its next turn.' }
        ]
    },
    {
        id: 'illusion',
        classId: 'wizard',
        name: 'School of Illusion',
        description: 'You focus your studies on magic that dazzles the senses, befuddles the mind, and tricks even the wisest folk.',
        features: [
            { level: 2, name: 'Illusion Savant', description: 'The gold and time you must spend to copy an illusion spell into your spellbook is halved.' },
            { level: 2, name: 'Improved Minor Illusion', description: 'You learn the minor illusion cantrip. If you already know this cantrip, you learn a different wizard cantrip of your choice. The cantrip doesn\'t count against your number of cantrips known. When you cast minor illusion, you can create both a sound and an image with a single casting of the spell.' },
            { level: 6, name: 'Malleable Illusions', description: 'When you cast an illusion spell that has a duration of 1 minute or longer, you can use your action to change the nature of that illusion (using the spell\'s normal parameters for the illusion), provided that you can see the illusion.' },
            { level: 10, name: 'Illusory Self', description: 'You can create an illusory duplicate of yourself as an instant, almost instinctual reaction to danger. When a creature makes an attack roll against you, you can use your reaction to interpose the illusory duplicate between the attacker and yourself. The attack automatically misses you, then the illusion dissipates.' },
            { level: 14, name: 'Illusory Reality', description: 'You have learned the secret of weaving shadow magic into your illusions to give them a semi-reality. When you cast an illusion spell of 1st level or higher, you can choose one inanimate, nonmagical object that is part of the illusion and make that object real. You can do this on your turn as a bonus action while the spell is ongoing.' }
        ]
    },
    {
        id: 'necromancy',
        classId: 'wizard',
        name: 'School of Necromancy',
        description: 'The School of Necromancy explores the cosmic forces of life, death, and undeath.',
        features: [
            { level: 2, name: 'Necromancy Savant', description: 'The gold and time you must spend to copy a necromancy spell into your spellbook is halved.' },
            { level: 2, name: 'Grim Harvest', description: 'When you kill a creature with a spell of 1st level or higher, you regain hit points equal to twice the spell\'s level, or three times its level if the spell belongs to the School of Necromancy. You don\'t gain this benefit for killing constructs or undead.' },
            { level: 6, name: 'Undead Thralls', description: 'You add the animate dead spell to your spellbook if it is not there already. When you cast animate dead, you can target one additional corpse or pile of bones, creating another zombie or skeleton, as appropriate. Each creature you create with the spell gains benefits to its hit points and damage.' },
            { level: 10, name: 'Inured to Undeath', description: 'You have resistance to necrotic damage, and your hit point maximum can\'t be reduced.' },
            { level: 14, name: 'Command Undead', description: 'You can use magic to bring undead under your control, even those created by other wizards. As an action, you can choose one undead that you can see within 60 feet of you. That creature must make a Charisma saving throw against your wizard spell save DC.' }
        ]
    },
    {
        id: 'scribes',
        classId: 'wizard',
        name: 'Order of Scribes',
        description: 'Magic of the book—that\'s what many folk call wizardry. The Order of Scribes is the most ancient and respected of the wizardly orders.',
        features: [
            { level: 2, name: 'Wizardly Quill', description: 'You can summon a magic quill. It doesn\'t require ink, and the time you must spend to copy a spell into your spellbook equals 2 minutes per spell level if you use the quill.' },
            { level: 2, name: 'Awakened Spellbook', description: 'You awaken a sentience within your spellbook. It grants you the ability to replace damage types of spells and cast rituals more quickly.' },
            { level: 6, name: 'Master Scrivener', description: 'You can create a magic scroll without expending a spell slot. The scroll contains a wizard spell of 1st or 2nd level that is in your spellbook, has a casting time of 1 action, and doesn\'t require material components worth more than 1 gp.' },
            { level: 10, name: 'Manifest Mind', description: 'You can temporarily conjure the mind of your Awakened Spellbook. As a bonus action, you can cause the spectral mind to hover in an unoccupied space of your choice within 60 feet of you. The spectral mind is intangible and doesn\'t occupy its space, and it sheds dim light in a 10-foot radius.' },
            { level: 14, name: 'One with the Word', description: 'Your connection to your spellbook is so profound that your soul has become entwined with it. You have advantage on all Arcana checks. Additionally, you can take a reaction to dismiss your spectral mind to avoid damage.' }
        ]
    },
    {
        id: 'transmutation',
        classId: 'wizard',
        name: 'School of Transmutation',
        description: 'You are a student of spells that modify energy and matter. To you, the world is not a fixed thing, but eminently mutable.',
        features: [
            { level: 2, name: 'Transmutation Savant', description: 'The gold and time you must spend to copy a transmutation spell into your spellbook is halved.' },
            { level: 2, name: 'Minor Alchemy', description: 'You can temporarily alter the physical properties of one nonmagical object, changing it from one substance into another.' },
            { level: 6, name: 'Transmuter\'s Stone', description: 'You can spend 8 hours creating a transmuter\'s stone that stores transmutation magic. You can grasp the stone and gain a benefit of your choice (Darkvision, Speed Increase, Proficiency in Con saves, Energy Resistance).' },
            { level: 10, name: 'Shapechanger', description: 'You add the polymorph spell to your spellbook, if it isn\'t there already. You can cast polymorph without expending a spell slot. When you do so, you can target only yourself and transform into a beast whose challenge rating is 1 or lower.' },
            { level: 14, name: 'Master Transmuter', description: 'You can use your action to consume the reserve of transmutation magic stored within your transmuter\'s stone in a single burst. When you do so, choose one of the following effects: Major Transformation, Panacea, Restore Life, or Restore Youth.' }
        ]
    },
    {
        id: 'war_magic',
        classId: 'wizard',
        name: 'War Magic',
        description: 'War Magic blends principles of evocation and abjuration. It teaches techniques that empower a caster\'s spells, while also providing methods for a wizard to bolster their own defenses.',
        features: [
            { level: 2, name: 'Arcane Deflection', description: 'When you are hit by an attack or you fail a saving throw, you can use your reaction to gain a +2 bonus to your AC against that attack or a +4 bonus to that saving throw. When you use this feature, you can\'t cast spells other than cantrips until the end of your next turn.' },
            { level: 2, name: 'Tactical Wit', description: 'You can give yourself a bonus to your initiative rolls equal to your Intelligence modifier.' },
            { level: 6, name: 'Power Surge', description: 'You can store magical energy within yourself to later empower your damaging spells. You can store a maximum number of power surges equal to your Intelligence modifier (minimum of one).' },
            { level: 10, name: 'Durable Magic', description: 'While you maintain concentration on a spell, you have a +2 bonus to AC and all saving throws.' },
            { level: 14, name: 'Deflecting Shroud', description: 'When you use your Arcane Deflection feature, you can cause magical energy to arc from you. Up to three creatures of your choice that you can see within 60 feet of you each take force damage equal to half your wizard level.' }
        ]
    },
    // --- Barbarian Expansion Subclasses ---
    {
        id: 'ancestral_guardian',
        classId: 'barbarian',
        name: 'Path of the Ancestral Guardian',
        description: 'Some barbarians hail from cultures that revere their ancestors. These tribes teach that the warriors of the past linger in the world as mighty spirits, who can guide and protect the living.',
        features: [
            { level: 3, name: 'Ancestral Protectors', description: 'Starting when you choose this path at 3rd level, spectral warriors appear when you enter your rage. While you\'re raging, the first creature you hit with an attack on your turn becomes the target of the warriors, which hinder its attacks. Until the start of your next turn, that target has disadvantage on any attack roll that isn\'t against you, and when the target hits a creature other than you with an attack, that creature has resistance to the damage dealt by the attack.' },
            { level: 6, name: 'Spirit Shield', description: 'You learn to use your guardian spirits to protect your allies. If you are raging and another creature you can see within 30 feet of you takes damage, you can use your reaction to reduce that damage by 2d6.' },
            { level: 10, name: 'Consult the Spirits', description: 'You gain the ability to consult with your ancestral spirits. When you do so, you cast the augury or clairvoyance spell, without using a spell slot or material components. Rather than creating a spherical sensor, this use of clairvoyance invisibly summons one of your ancestral spirits to the chosen location.' },
            { level: 14, name: 'Vengeful Ancestors', description: 'Your ancestral spirits grow powerful enough to retaliate. When you use your Spirit Shield to reduce the damage of an attack, the attacker takes force damage equal to the damage that your Spirit Shield prevents.' }
        ]
    },
    {
        id: 'battlerager',
        classId: 'barbarian',
        name: 'Path of the Battlerager',
        description: 'Known as Kuldjargh (literally "axe idiot") in Dwarvish, Battleragers are fearless warriors who throw themselves into battle, striking with their body and giving their all for victory.',
        features: [
            { level: 3, name: 'Battlerager Armor', description: 'You gain the ability to use Spiked Armor as a weapon. While you are wearing spiked armor and are raging, you can use a bonus action to make one melee weapon attack with your armor spikes against a target within 5 feet of you. If the attack hits, the spikes deal 1d4 piercing damage. You use your Strength modifier for the attack and damage rolls.' },
            { level: 6, name: 'Reckless Abandon', description: 'When you use Reckless Attack while raging, you also gain temporary hit points equal to your Constitution modifier (minimum of 1). They vanish if any of them are left when your rage ends.' },
            { level: 10, name: 'Battlerager Charge', description: 'You can take the Dash action as a bonus action while you are raging.' },
            { level: 14, name: 'Spiked Retribution', description: 'When a creature within 5 feet of you hits you with a melee attack, the attacker takes 3 piercing damage if you are raging, aren\'t incapacitated, and are wearing spiked armor.' }
        ]
    },
    {
        id: 'beast',
        classId: 'barbarian',
        name: 'Path of the Beast',
        description: 'Barbarians who walk the Path of the Beast draw their rage from a bestial spark burning within their souls. That beast bursts forth in the throes of rage, physically transforming the barbarian.',
        features: [
            { level: 3, name: 'Form of the Beast', description: 'When you enter your rage, you can transform, revealing the bestial power within you. Until the rage ends, you manifest a natural weapon. It counts as a simple melee weapon for you, and you add your Strength modifier to the attack and damage rolls when you attack with it. Choose between Bite, Claws, or Tail.' },
            { level: 6, name: 'Bestial Soul', description: 'The feral power within you increases, causing the natural weapons of your Form of the Beast to count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage. You also gain a benefit related to your adaptation (Swimming, Climbing, or Jumping).' },
            { level: 10, name: 'Infectious Fury', description: 'When you hit a creature with your natural weapons while you are raging, the beast within you can curse your target with rabid fury. The target must make a Wisdom saving throw or suffer one of the following effects: attack another creature of your choice or take 2d12 psychic damage.' },
            { level: 14, name: 'Call the Hunt', description: 'The beast within you grows so powerful that you can spread its ferocity to your allies. When you enter your rage, you can choose a number of other willing creatures you can see within 30 feet of you equal to your Constitution modifier (minimum of one). You gain 5 temporary hit points for each creature that accepts this feature. Until the rage ends, the chosen creatures can each deal an extra 1d6 damage when they hit with an attack.' }
        ]
    },
    {
        id: 'giant',
        classId: 'barbarian',
        name: 'Path of the Giant',
        description: 'Barbarians who walk the Path of the Giant draw strength from the primal forces that are the Giants.',
        features: [
            { level: 3, name: 'Giant Power', description: 'You learn to speak, read, and write Giant. You also learn either the Druidcraft or Thaumaturgy cantrip.' },
            { level: 3, name: 'Giant\'s Havoc', description: 'When you rage, you gain the following benefits: Crushing Throw (add Rage damage to thrown weapons) and Giant Stature (become Large, reach increases by 5 feet).' },
            { level: 6, name: 'Elemental Cleaver', description: 'When you enter your rage, you can infuse a weapon you are holding with one of the following damage types: acid, cold, fire, thunder, or lightning. While you wield the infused weapon during your rage, the weapon\'s damage type changes to the chosen type, it deals an extra 1d6 damage of the chosen type when it hits, and it gains the thrown property.' },
            { level: 10, name: 'Mighty Impel', description: 'As a bonus action while raging, you can choose one Medium or smaller creature within your reach and move it to an unoccupied space you can see within 30 feet of you. An unwilling creature must make a Strength saving throw to avoid the effect.' },
            { level: 14, name: 'Demiurgic Colossus', description: 'When you rage, your reach increases by 10 feet, your size can increase to Huge, and Mighty Impel can affect creatures up to Large size.' }
        ]
    },
    {
        id: 'storm_herald',
        classId: 'barbarian',
        name: 'Path of the Storm Herald',
        description: 'Typical barbarians harbor a fury within. Their rage makes them strong, quick, and tough. Those who follow the Path of the Storm Herald learn to transform that rage into a mantle of primal magic, which swirls around them.',
        features: [
            { level: 3, name: 'Storm Aura', description: 'While you are raging, you emanate a stormy, magical aura. The aura extends 10 feet from you in every direction, but not through total cover. You choose one environment (Desert, Sea, or Tundra) and gain its effect.' },
            { level: 6, name: 'Storm Soul', description: 'The storm grants you benefits even when your aura isn\'t active. You gain resistance and other benefits based on your chosen environment (Desert, Sea, or Tundra).' },
            { level: 10, name: 'Shielding Storm', description: 'You learn to use your mastery of the storm to protect others. Each creature of your choice has the damage resistance you gained from the Storm Soul feature while the creature is in your Storm Aura.' },
            { level: 14, name: 'Raging Storm', description: 'The power of the storm you channel grows mightier, lashing out at your foes. The effect is based on your chosen environment (Desert, Sea, or Tundra).' }
        ]
    },
    {
        id: 'wild_magic_barbarian',
        classId: 'barbarian',
        name: 'Path of Wild Magic',
        description: 'Many places in the multiverse abound with beauty, intense emotion, and rampant magic; the Feywild, the Upper Planes, and other realms of supernatural power radiate with such forces.',
        features: [
            { level: 3, name: 'Magic Awareness', description: 'As an action, you can open your awareness to the presence of concentrated magic. Until the end of your next turn, you know the location of any spell or magic item within 60 feet of you that isn\'t behind total cover.' },
            { level: 3, name: 'Wild Surge', description: 'The magical energy roiling inside you sometimes erupts from you. When you enter your rage, roll on the Wild Magic table to determine the magical effect produced.' },
            { level: 6, name: 'Bolstering Magic', description: 'You can harness your wild magic to bolster yourself or a companion. As an action, you can touch one creature (which can be yourself) and confer one of the following benefits: For 10 minutes, the creature can roll a d3 whenever making an attack roll or an ability check and add the number rolled to the d20 roll; or roll a d3. The creature regains one expended spell slot, the level of which equals the number rolled or lower (you can\'t do this again until a long rest).' },
            { level: 10, name: 'Unstable Backlash', description: 'When you are imperiled during your rage, the magic within you can lash out; immediately after you take damage or fail a saving throw while raging, you can use your reaction to roll on the Wild Magic table and immediately produce the effect rolled. This effect replaces your current Wild Magic effect.' },
            { level: 14, name: 'Controlled Surge', description: 'Whenever you roll on the Wild Magic table, you can roll the die twice and choose which of the two effects to unleash. If you roll the same number on both dice, you can ignore the number and choose any effect on the table.' }
        ]
    },
    {
        id: 'zealot',
        classId: 'barbarian',
        name: 'Path of the Zealot',
        description: 'Some deities inspire their followers to pitch themselves into a ferocious battle fury. These barbarians are zealots—warriors who channel their rage into powerful displays of divine power.',
        features: [
            { level: 3, name: 'Divine Fury', description: 'While you\'re raging, the first creature you hit on each of your turns with a weapon attack takes extra damage equal to 1d6 + half your barbarian level. The extra damage is necrotic or radiant; you choose the type when you gain this feature.' },
            { level: 3, name: 'Warrior of the Gods', description: 'If a spell, such as raise dead, has the sole effect of restoring you to life (but not undeath), the caster doesn\'t need material components to cast the spell on you.' },
            { level: 6, name: 'Fanatical Focus', description: 'If you fail a saving throw while you\'re raging, you can reroll it, and you must use the new roll. You can use this ability only once per rage.' },
            { level: 10, name: 'Zealous Presence', description: 'As a bonus action, you unleash a battle cry infused with divine energy. Up to ten other creatures of your choice within 60 feet of you gain advantage on attack rolls and saving throws until the start of your next turn.' },
            { level: 14, name: 'Rage beyond Death', description: 'While you\'re raging, having 0 hit points doesn\'t knock you unconscious. You still must make death saving throws, and you suffer the normal effects of taking damage while at 0 hit points. However, if you would die due to failing death saving throws, you don\'t die until your rage ends, and you die then only if you still have 0 hit points.' }
        ]
    },
    // --- Druid Expansion Subclasses ---
    {
        id: 'dreams',
        classId: 'druid',
        name: 'Circle of Dreams',
        description: 'Druids who are members of the Circle of Dreams hail from regions that have strong ties to the Feywild and its dreamlike realms.',
        features: [
            { level: 2, name: 'Balm of the Summer Court', description: 'You have a pool of fey energy represented by a number of d6s equal to your druid level. As a bonus action, you can choose one creature you can see within 120 feet of you and spend a number of those dice equal to half your druid level or less. Roll the spent dice and add them together. The target regains a number of hit points equal to the total. The target also gains 1 temporary hit point per die spent.' },
            { level: 6, name: 'Hearth of Moonlight and Shadow', description: 'At 6th level, home can be wherever you are. During a short or long rest, you can invoke the shadowy power of the Gloaming Court to help guard your campsite.' },
            { level: 10, name: 'Hidden Paths', description: 'At 10th level, you can use the hidden, magical pathways that some fey use to traverse space in the blink of an eye. As a bonus action on your turn, you can teleport up to 60 feet to an unoccupied space you can see. Alternatively, you can use your action to teleport one willing creature you touch up to 30 feet to an unoccupied space you can see.' },
            { level: 14, name: 'Walker in Dreams', description: 'At 14th level, the magic of the Feywild grants you the ability to travel mentally or physically through dreamlands. When you finish a short rest, you can cast one of the following spells, without expending a spell slot or requiring material components: dream (with you as the messenger), scrying, or teleportation circle.' }
        ]
    },
    {
        id: 'shepherd',
        classId: 'druid',
        name: 'Circle of the Shepherd',
        description: 'Druids of the Circle of the Shepherd commune with the spirits of nature, especially the spirits of beasts and the fey, and call to those spirits for aid.',
        features: [
            { level: 2, name: 'Speech of the Woods', description: 'At 2nd level, you gain the ability to converse with beasts and many fey. You learn to speak, read, and write Sylvan. In addition, beasts can understand your speech, and you gain the ability to decipher their noises and motions.' },
            { level: 2, name: 'Spirit Totem', description: 'Starting at 2nd level, you can call forth nature spirits to influence the world around you. As a bonus action, you can magically summon an incorporeal spirit to a point you can see within 60 feet of you.' },
            { level: 6, name: 'Mighty Summoner', description: 'At 6th level, beasts and fey that you conjure are more resilient than normal. Any beast or fey summoned or created by a spell that you cast gains the following benefits: The creature appears with more hit points. The damage from its natural weapons is considered magical for the purpose of overcoming immunity and resistance to nonmagical attacks and damage.' },
            { level: 10, name: 'Guardian Spirit', description: 'Beginning at 10th level, your Spirit Totem safeguards the beasts and fey that you call forth. When a beast or fey that you summoned or created with a spell ends its turn in your Spirit Totem aura, that creature regains hit points equal to half your druid level.' },
            { level: 14, name: 'Faithful Summons', description: 'Starting at 14th level, the nature spirits you commune with protect you when you are the most defenseless. If you are reduced to 0 hit points or are incapacitated against your will, you can immediately gain the benefits of conjure animals as if it were cast using a 9th-level spell slot.' }
        ]
    },
    {
        id: 'spores',
        classId: 'druid',
        name: 'Circle of Spores',
        description: 'Druids of the Circle of Spores find beauty in decay. They see within mold and other fungi the ability to transform lifeless material into abundant, albeit somewhat strange, life.',
        features: [
            { level: 2, name: 'Halo of Spores', description: 'Starting at 2nd level, you are surrounded by invisible, necrotic spores that are harmless until you unleash them on a creature nearby. When a creature you can see moves into a space within 10 feet of you or starts its turn there, you can use your reaction to deal 1d4 necrotic damage to that creature unless it succeeds on a Constitution saving throw.' },
            { level: 2, name: 'Symbiotic Entity', description: 'At 2nd level, you gain the ability to channel magic into your spores. As an action, you can expend a use of your Wild Shape feature to awaken those spores, rather than transforming into a beast form, and you gain 4 temporary hit points for each level you have in this class.' },
            { level: 6, name: 'Fungal Infestation', description: 'At 6th level, your spores gain the ability to infest a corpse and animate it. If a beast or humanoid that is Small or Medium dies within 10 feet of you, you can use your reaction to animate it, causing it to stand up immediately with 1 hit point.' },
            { level: 10, name: 'Spreading Spores', description: 'At 10th level, you gain the ability to seed an area with deadly spores. As a bonus action while your Symbiotic Entity feature is active, you can hurl spores up to 30 feet away, where they swirl in a 10-foot cube for 1 minute.' },
            { level: 14, name: 'Fungal Body', description: 'At 14th level, the fungal spores in your body alter you: you can\'t be blinded, deafened, frightened, or poisoned, and any critical hit against you counts as a normal hit, unless you\'re incapacitated.' }
        ]
    },
    {
        id: 'stars',
        classId: 'druid',
        name: 'Circle of Stars',
        description: 'The Circle of Stars allows druids to draw on the power of starlight. These druids have tracked heavenly patterns since time immemorial, discovering secrets hidden amid the constellations.',
        features: [
            { level: 2, name: 'Star Map', description: 'At 2nd level, you\'ve created a star map as part of your heavenly studies. You gain the guidance cantrip and can cast guiding bolt without expending a spell slot.' },
            { level: 2, name: 'Starry Form', description: 'At 2nd level, you gain the ability to harness constellations\' power to alter your form. As a bonus action, you can expend a use of your Wild Shape feature to take on a starry form, rather than transforming into a beast.' },
            { level: 6, name: 'Cosmic Omen', description: 'At 6th level, you learn to use your star map to divine the will of the cosmos. Whenever you finish a long rest, you can consult your Star Map for omens. When you do so, roll a die.' },
            { level: 10, name: 'Twinkling Constellations', description: 'At 10th level, the constellations of your Starry Form improve. The 1d8 of the Archer and the Chalice becomes 2d8, and while the Dragon is active, you have a flying speed of 20 feet and can hover.' },
            { level: 14, name: 'Full of Stars', description: 'At 14th level, while in your Starry Form, you become partially incorporeal, giving you resistance to bludgeoning, piercing, and slashing damage.' }
        ]
    },
    {
        id: 'wildfire',
        classId: 'druid',
        name: 'Circle of Wildfire',
        description: 'Druids within the Circle of Wildfire understand that destruction is sometimes the precursor of creation: a forest fire promotes later growth, and volcanic ash nourishes new life.',
        features: [
            { level: 2, name: 'Summon Wildfire Spirit', description: 'At 2nd level, you can summon the primal spirit bound to your soul. As an action, you can expend one use of your Wild Shape feature to summon your Wildfire Spirit, rather than transforming into a beast.' },
            { level: 6, name: 'Enhanced Bond', description: 'At 6th level, the bond with your Wildfire Spirit enhances your destructive and restorative spells. Whenever you cast a spell that deals fire damage or restores hit points while your Wildfire Spirit is summoned, roll a d8, and you gain a bonus equal to the number rolled to one damage or healing roll of the spell.' },
            { level: 10, name: 'Cauterizing Flames', description: 'At 10th level, you gain the ability to turn death into magical flames that can heal or incinerate. When a Small or larger creature dies within 30 feet of you or your Wildfire Spirit, a harmless spectral flame springs forth in the dead creature\'s space and flickers there for 1 minute.' },
            { level: 14, name: 'Blazing Revival', description: 'At 14th level, the bond with your Wildfire Spirit can save you from death. If the spirit is within 120 feet of you when you are reduced to 0 hit points and thereby fall unconscious, you can cause the spirit to drop to 0 hit points. You then regain half your hit points and immediately rise to your feet.' }
        ]
    },
    // --- Monk Expansion Subclasses ---
    {
        id: 'astral_self',
        classId: 'monk',
        name: 'Way of the Astral Self',
        description: 'A monk who follows the Way of the Astral Self believes their body is an illusion. They see their ki as a representation of their true form, an astral self.',
        features: [
            { level: 3, name: 'Arms of the Astral Self', description: 'As a bonus action, you can spend 1 ki point to summon the arms of your astral self. For 10 minutes, these spectral arms hover near your shoulders or surround your arms. You can use your Wisdom modifier in place of your Strength modifier when making Strength checks and saving throws. You can use the spectral arms to make unarmed strikes.' },
            { level: 6, name: 'Visage of the Astral Self', description: 'You can summon the visage of your astral self. As a bonus action, or as part of the bonus action you take to activate Arms of the Astral Self, you can spend 1 ki point to summon this visage for 10 minutes. It covers your face like a helmet or mask. You gain benefits like Astral Sight and Wisdom of the Spirit.' },
            { level: 11, name: 'Body of the Astral Self', description: 'When you have both your spectral arms and visage summoned, you can cause the body of your astral self to appear (no additional action required). This spectral body covers your physical form like a suit of armor, connecting with the arms and visage. You can deflect energy and deal extra damage.' },
            { level: 17, name: 'Awakened Astral Self', description: 'Your connection to your astral self is complete, allowing you to unleash its full potential. While you have your Body of the Astral Self summoned, you gain +2 AC and can attack three times when you take the Attack action.' }
        ]
    },
    {
        id: 'ascendant_dragon',
        classId: 'monk',
        name: 'Way of the Ascendant Dragon',
        description: 'Monks who follow the Way of the Ascendant Dragon emulate the power of dragons, channeling their ki to unleash dragon-like abilities.',
        features: [
            { level: 3, name: 'Draconic Disciple', description: 'You can channel draconic power to magnify your presence and imbue your unarmed strikes with the essence of a dragon\'s breath. You gain Draconic Presence and Draconic Strike (change damage type to acid, cold, fire, lightning, or poison).' },
            { level: 3, name: 'Breath of the Dragon', description: 'You can channel your ki into destructive waves of energy like a dragon\'s breath. When you take the Attack action on your turn, you can replace one of the attacks with an exhalation of draconic energy in either a 20-foot cone or a 30-foot line.' },
            { level: 6, name: 'Wings Unfurled', description: 'When you use your Step of the Wind, you can unfurl spectral draconic wings from your back that vanish at the end of your turn. While the wings exist, you have a flying speed equal to your walking speed.' },
            { level: 11, name: 'Aspect of the Wyrm', description: 'The power of your draconic spirit now radiates from you, warding your allies or inspiring fear in your enemies. You can create an aura of draconic power.' },
            { level: 17, name: 'Ascendant Aspect', description: 'Your draconic spirit reaches its peak. You gain Blindsight, Explosive Fury (breath weapon empowers you), and your breath weapon damage increases.' }
        ]
    },
    {
        id: 'drunken_master',
        classId: 'monk',
        name: 'Way of the Drunken Master',
        description: 'The Way of the Drunken Master teaches its students to move with the jerky, unpredictable movements of a drunkard.',
        features: [
            { level: 3, name: 'Bonus Proficiencies', description: 'You gain proficiency in the Performance skill if you don\'t already have it. Your martial arts technique mixes combat training with the precision of a dancer and the antics of a jester. You also gain proficiency with brewer\'s supplies.' },
            { level: 3, name: 'Drunken Technique', description: 'You learn how to twist and turn quickly as part of your Flurry of Blows. Whenever you use Flurry of Blows, you gain the benefit of the Disengage action, and your walking speed increases by 10 feet until the end of the current turn.' },
            { level: 6, name: 'Tipsy Sway', description: 'You can move in sudden, swaying ways. You gain the following benefits: Leap to Your Feet (stand up from prone with 5 feet movement) and Redirect Attack (use reaction to cause a missed attack to hit another creature).' },
            { level: 11, name: 'Drunkard\'s Luck', description: 'You always seem to get a lucky break at the right moment. When you make an ability check, an attack roll, or a saving throw and have disadvantage on the roll, you can spend 2 ki points to cancel the disadvantage for that roll.' },
            { level: 17, name: 'Intoxicated Frenzy', description: 'You gain the ability to make an overwhelming number of attacks against a group of enemies. When you use your Flurry of Blows, you can make up to three additional attacks with it (up to a total of five Flurry of Blows attacks), provided that each Flurry of Blows attack targets a different creature this turn.' }
        ]
    },
    {
        id: 'kensei',
        classId: 'monk',
        name: 'Way of the Kensei',
        description: 'Monks of the Way of the Kensei train relentlessly with their weapons, to the point where the weapon becomes an extension of the body.',
        features: [
            { level: 3, name: 'Path of the Kensei', description: 'You gain proficiency with kensei weapons and can use them as monk weapons. You also gain Agile Parry (AC bonus) and Kensei\'s Shot (extra ranged damage).' },
            { level: 6, name: 'One with the Blade', description: 'You extend your ki into your kensei weapons, granting you the following benefits: Magic Kensei Weapons (count as magical) and Deft Strike (spend ki for extra damage).' },
            { level: 11, name: 'Sharpen the Blade', description: 'You gain the ability to augment your weapons further with your ki. As a bonus action, you can expend up to 3 ki points to grant one kensei weapon you touch a bonus to attack and damage rolls when you attack with it.' },
            { level: 17, name: 'Unerring Accuracy', description: 'Your mastery of weapons grants you extraordinary accuracy. If you miss with an attack roll using a monk weapon on your turn, you can reroll it. You can use this feature only once on each of your turns.' }
        ]
    },
    {
        id: 'long_death',
        classId: 'monk',
        name: 'Way of the Long Death',
        description: 'Monks of the Way of the Long Death are obsessed with the meaning and mechanics of dying.',
        features: [
            { level: 3, name: 'Touch of Death', description: 'Your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level.' },
            { level: 6, name: 'Hour of Reaping', description: 'You gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. creatures within 30 feet must make a Wisdom save or be frightened.' },
            { level: 11, name: 'Mastery of Death', description: 'You use your familiarity with death to escape its grasp. When you are reduced to 0 hit points, you can expend 1 ki point (no action required) to have 1 hit point instead.' },
            { level: 17, name: 'Touch of the Long Death', description: 'You can channel necrotic energy into a creature. As an action, you touch one creature within 5 feet of you, and it must make a Constitution saving throw. It takes 2d10 necrotic damage per ki point spent (up to 10 points).' }
        ]
    },
    {
        id: 'mercy',
        classId: 'monk',
        name: 'Way of Mercy',
        description: 'Monks of the Way of Mercy learn to manipulate the life force of others to bring aid to those in need. They are wandering physicians to the poor and hurt.',
        features: [
            { level: 3, name: 'Implements of Mercy', description: 'You gain proficiency in the Insight and Medicine skills, and you gain proficiency with the herbalism kit.' },
            { level: 3, name: 'Hand of Healing', description: 'You can use your ki to heal wounds. As an action, oou can spend 1 ki point to touch a creature and restore hit points equal to a roll of your Martial Arts die + your Wisdom modifier.' },
            { level: 3, name: 'Hand of Harm', description: 'You use your ki to inflict wounds. When you hit a creature with an unarmed strike, you can spend 1 ki point to deal extra necrotic damage equal to one roll of your Martial Arts die + your Wisdom modifier.' },
            { level: 6, name: 'Physician\'s Touch', description: 'You can administer even greater cures with your Hand of Healing, ending one disease or condition (blinded, deafened, paralyzed, poisoned, or stunned). Your Hand of Harm can now poison the creature.' },
            { level: 11, name: 'Flurry of Healing and Harm', description: 'You can now mete out a flurry of comfort and hurt. When you use Flurry of Blows, you can replace each of the unarmed strikes with a use of your Hand of Healing, without spending ki points for the healing.' },
            { level: 17, name: 'Hand of Ultimate Mercy', description: 'Your mastery of life energy opens the door to the ultimate mercy. As an action, you can touch the corpse of a creature that died within the last 24 hours and expend 5 ki points. The creature then returns to life.' }
        ]
    },
    {
        id: 'sun_soul',
        classId: 'monk',
        name: 'Way of the Sun Soul',
        description: 'Monks of the Way of the Sun Soul learn to channel their own life energy into searing bolts of light.',
        features: [
            { level: 3, name: 'Radiant Sun Bolt', description: 'You can hurl searing bolts of magical radiance. You gain a new attack option that you can use with the Attack action. This special attack is a ranged spell attack with a range of 30 feet and deals radiant damage.' },
            { level: 6, name: 'Searing Arc Strike', description: 'You gain the ability to channel your ki into searing waves of energy. Immediately after you take the Attack action on your turn, you can cast the burning hands spell as a bonus action.' },
            { level: 11, name: 'Searing Sunburst', description: 'You gain the ability to create an orb of light that erupts into a devastating explosion. As an action, you create an orb and hurl it at a point within 150 feet, where it erupts into a sphere of radiant light for a brief but deadly instant.' },
            { level: 17, name: 'Sun Shield', description: 'You become wreathed in a luminous, magical aura. You shed bright light for 30 feet and dim light for an additional 30 feet. You can use your reaction to deal radiant damage to a creature that hits you with a melee attack.' }
        ]
    },
    // --- Warlock Expansion Subclasses ---
    {
        id: 'celestial',
        classId: 'warlock',
        name: 'The Celestial',
        description: 'Your patron is a powerful being of the Upper Planes. You have bound yourself to an ancient empyrean, solar, ki-rin, unicorn, or other entity that resides in the planes of everlasting bliss.',
        features: [
            { level: 1, name: 'Bonus Cantrips', description: 'You learn the light and sacred flame cantrips.' },
            { level: 1, name: 'Healing Light', description: 'You have a pool of d6s that you spend to heal others. The number of dice in the pool equals 1 + your warlock level. As a bonus action, you can heal a creature you can see within 60 feet of you, spending dice from the pool. The maximum number of dice you can spend at once equals your Charisma modifier.' },
            { level: 6, name: 'Radiant Soul', description: 'Your link to the Celestial allows you to serve as a conduit for radiant energy. You have resistance to radiant damage, and when you cast a spell that deals radiant or fire damage, you can add your Charisma modifier to one radiant or fire damage roll of that spell.' },
            { level: 10, name: 'Celestial Resilience', description: 'You gain temporary hit points whenever you finish a short or long rest. These temporary hit points equal your warlock level + your Charisma modifier. Additionally, choose up to five creatures you can see at the end of the rest. Those creatures each gain temporary hit points equal to half your warlock level + your Charisma modifier.' },
            { level: 14, name: 'Searing Vengeance', description: 'When you have to make a death saving throw at the start of your turn, you can instead spring back to your feet with a burst of radiant energy. You regain hit points equal to half your hit point maximum, and then you stand up if you chose to. Each creature of your choice that is within 30 feet of you takes radiant damage equal to 2d8 + your Charisma modifier and is blinded until the end of the current turn.' }
        ]
    },
    {
        id: 'fathomless',
        classId: 'warlock',
        name: 'The Fathomless',
        description: 'You have plunged into a pact with the deeps. An entity of the ocean, the Elemental Plane of Water, or another otherworldly sea now guides you.',
        features: [
            { level: 1, name: 'Tentacle of the Deeps', description: 'You can magically summon a spectral tentacle that strikes at your foes. As a bonus action, you create a 10-foot-long tentacle at a point you can see within 60 feet of you. You can use your bonus action to move it and attack with it.' },
            { level: 1, name: 'Gift of the Sea', description: 'You gain a swimming speed of 40 feet, and you can breathe underwater.' },
            { level: 6, name: 'Oceanic Soul', description: 'You are now even more at home in the depths. You gain resistance to cold damage. In addition, when you are fully submerged, any creature that is also fully submerged can understand your speech, and you can understand theirs.' },
            { level: 6, name: 'Guardian Coil', description: 'Your Tentacle of the Deeps can defend you and others, interposing itself between them and harm. When you or a creature you can see takes damage while within 10 feet of the tentacle, you can use your reaction to choose one of those creatures and reduce the damage to that creature by 1d8.' },
            { level: 10, name: 'Grasping Tentacles', description: 'You learn the Evard\'s black tentacles spell. You can cast it once without expending a spell slot, and you regain the ability to do so when you finish a long rest. Whenever you cast this spell, your patron\'s magic bolsters you, granting you a number of temporary hit points equal to your warlock level.' },
            { level: 14, name: 'Fathomless Plunge', description: 'You can magically transport yourself and up to five willing creatures that you can see within 30 feet of you. You vanish and then reappear in a body of water that you\'ve seen that is on the same plane of existence.' }
        ]
    },
    {
        id: 'genie',
        classId: 'warlock',
        name: 'The Genie',
        description: 'You have made a pact with one of the rarest kinds of genie, a noble genie. Such entities are rulers of vast fiefs on the Elemental Planes.',
        features: [
            { level: 1, name: 'Genie\'s Vessel', description: 'Your patron gifts you a magical vessel that grants you a measure of the genie\'s power. You can use the vessel as a spellcasting focus, and you can enter it to rest.' },
            { level: 1, name: 'Genie\'s Wrath', description: 'Once during each of your turns when you hit with an attack roll, you can deal extra damage to the target equal to your proficiency bonus. The type of this damage is determined by your patron (Dao, Djinni, Efreeti, or Marid).' },
            { level: 6, name: 'Elemental Gift', description: 'You begin to take on characteristics of your patron\'s kind. You have resistance to a damage type determined by your patron kind. You can also give yourself a flying speed of 30 feet for 10 minutes.' },
            { level: 10, name: 'Sanctuary Vessel', description: 'When you enter your Genie\'s Vessel, you can now bring up to five willing creatures with you. Anyone who remains within the vessel for at least 10 minutes finishes a short rest and regains hit points.' },
            { level: 14, name: 'Limited Wish', description: 'You entreat your patron to grant you a small wish. You can speak your desire to your Genie\'s Vessel to cast any spell of 6th level or lower from any class spell list. The spell takes effect as part of this action and requires no material components.' }
        ]
    },
    {
        id: 'great_old_one',
        classId: 'warlock',
        name: 'The Great Old One',
        description: 'Your patron is a mysterious entity whose nature is utterly foreign to the fabric of reality.',
        features: [
            { level: 1, name: 'Awakened Mind', description: 'You can telepathically speak to any creature you can see within 30 feet of you. You don\'t need to share a language with the creature for it to understand your telepathic utterances, but the creature must be able to understand at least one language.' },
            { level: 6, name: 'Entropic Ward', description: 'You learn to magically ward yourself against attack and to turn an enemy\'s failed strike into good luck for yourself. When a creature makes an attack roll against you, you can use your reaction to impose disadvantage on that roll. If the attack misses you, your next attack roll against the creature has advantage.' },
            { level: 10, name: 'Thought Shield', description: 'Your thoughts cannot be read by telepathy or other means unless you allow it. You also have resistance to psychic damage, and whenever a creature deals psychic damage to you, that creature takes the same amount of damage that you do.' },
            { level: 14, name: 'Create Thrall', description: 'You gain the ability to infect a humanoid\'s mind with the alien magic of your patron. You can use your action to touch an incapacitated humanoid. That creature is then charmed by you until a remove curse spell is cast on it, the charmed condition is removed from it, or you use this feature again.' }
        ]
    },
    {
        id: 'hexblade',
        classId: 'warlock',
        name: 'The Hexblade',
        description: 'You have made your pact with a mysterious entity from the Shadowfell—a force that manifests in sentient magic weapons carved from the stuff of shadow.',
        features: [
            { level: 1, name: 'Hexblade\'s Curse', description: 'You gain the ability to place a baleful curse on someone. As a bonus action, choose one creature you can see within 30 feet of you. The target is cursed for 1 minute (crit on 19-20, bonus damage, healing on death).' },
            { level: 1, name: 'Hex Warrior', description: 'You acquire the training necessary to effectively arm yourself for battle. You gain proficiency with medium armor, shields, and martial weapons. Whenever you finish a long rest, you can touch one weapon that you are proficient with and that lacks the two-handed property. When you attack with that weapon, you can use your Charisma modifier, instead of Strength or Dexterity, for the attack and damage rolls.' },
            { level: 6, name: 'Accursed Specter', description: 'You can curse the soul of a person you slay, temporarily binding it to your service. When you slay a humanoid, you can cause its spirit to rise from its corpse as a specter.' },
            { level: 10, name: 'Armor of Hexes', description: 'Your hex grows more powerful. If the target cursed by your Hexblade\'s Curse hits you with an attack roll, you can use your reaction to roll a d6. On a 4 or higher, the attack misses you, regardless of its roll.' },
            { level: 14, name: 'Master of Hexes', description: 'You can spread your Hexblade\'s Curse from a slain creature to another creature. When the creature cursed by your Hexblade\'s Curse dies, you can apply the curse to a different creature you can see within 30 feet of you.' }
        ]
    },
    {
        id: 'undead',
        classId: 'warlock',
        name: 'The Undead',
        description: 'You\'ve made a pact with a deathless being, a creature that defies the cycle and life and death, forsaking its shell of mortality for eternal power.',
        features: [
            { level: 1, name: 'Form of Dread', description: 'You manifest an aspect of your patron\'s dreadful power. As a bonus action, you transform for 1 minute. You gain temporary hit points, immunity to fear, and can frighten foes when you hit them.' },
            { level: 6, name: 'Grave Touched', description: 'Your patron\'s powers have a profound effect on your body and magic. You don\'t need to eat, drink, or breathe. In addition, when you hit a creature with an attack and roll damage, you can replace the damage with necrotic damage. While in your Form of Dread, you can roll an extra damage die when dealing necrotic damage.' },
            { level: 10, name: 'Necrotic Husk', description: 'Your connection to undeath and necrotic energy now saturates your body. You have resistance to necrotic damage. If you are reduced to 0 hit points, you can use your reaction to drop to 1 hit point instead and cause your body to erupt with deathly energy.' },
            { level: 14, name: 'Spirit Projection', description: 'Your spirit can become untethered from your physical form. As an action, you can project your spirit from your body. The body you leave behind is unconscious and in a state of suspended animation. Your spirit resembles your mortal form in almost every way, replicating your game statistics but not your possessions. You gain a flying speed, resistance to bludgeoning/piercing/slashing, and can move through creatures/objects.' }
        ]
    },
    {
        id: 'undying',
        classId: 'warlock',
        name: 'The Undying',
        description: 'Death holds no sway over your patron, who has unlocked the secrets of everlasting life, although such a prize - like all power - comes at a price.',
        features: [
            { level: 1, name: 'Among the Dead', description: 'You learn the spare the dying cantrip. Undead have difficulty harming you. If an undead targets you directly with an attack or a harmful spell, that creature must make a Wisdom saving throw (DC equal to your spell save DC). On a failed save, the creature must choose a new target or forfeit targeting someone.' },
            { level: 6, name: 'Defy Death', description: 'You can give yourself vitality when you cheat death or when you help someone else cheat it. You regain hit points equal to 1d8 + your Constitution modifier (minimum of 1 hit point) when you succeed on a death saving throw or when you stabilize a creature with spare the dying.' },
            { level: 10, name: 'Undying Nature', description: 'You can hold your breath indefinitely, and you don\'t require food, water, or sleep, although you still require rest to reduce exhaustion and still benefit from finishing short and long rests. You age at a slower rate.' },
            { level: 14, name: 'Indestructible Life', description: 'You partake of some of the true secrets of the Undying. On your turn, you can use a bonus action to regain hit points equal to 1d8 + your warlock level. Additionally, if you put a severed body part of yours back in place when you use this feature, the part reattaches.' }
        ]
    }
];
