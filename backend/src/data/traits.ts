export interface Trait {
    name: string;
    description: string;
}

export const traits: { [key: string]: Trait } = {
    // Common Traits
    'Darkvision': {
        name: 'Darkvision',
        description: 'You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can\'t discern color in darkness, only shades of gray.'
    },
    'Superior Darkvision': {
        name: 'Superior Darkvision',
        description: 'Your darkvision has a radius of 120 feet.'
    },
    'Keen Senses': {
        name: 'Keen Senses',
        description: 'You have proficiency in the Perception skill.'
    },
    'Fey Ancestry': {
        name: 'Fey Ancestry',
        description: 'You have advantage on saving throws against being charmed, and magic can\'t put you to sleep.'
    },
    'Trance': {
        name: 'Trance',
        description: 'Elves don\'t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day. (The Common word for such meditation is "trance.") While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8 hours of sleep.'
    },
    'Versatile': {
        name: 'Versatile',
        description: 'You gain proficiency in one skill of your choice.'
    },
    'Lucky': {
        name: 'Lucky',
        description: 'When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.'
    },
    'Brave': {
        name: 'Brave',
        description: 'You have advantage on saving throws against being frightened.'
    },
    'Halfling Nimbleness': {
        name: 'Halfling Nimbleness',
        description: 'You can move through the space of any creature that is of a size larger than yours.'
    },
    'Dwarven Resilience': {
        name: 'Dwarven Resilience',
        description: 'You have advantage on saving throws against poison, and you have resistance against poison damage.'
    },
    'Dwarven Combat Training': {
        name: 'Dwarven Combat Training',
        description: 'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.'
    },
    'Stonecunning': {
        name: 'Stonecunning',
        description: 'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.'
    },
    'Draconic Ancestry': {
        name: 'Draconic Ancestry',
        description: 'You have draconic ancestry. Choose one type of dragon from the Draconic Ancestry table. Your breath weapon and damage resistance are determined by the dragon type, as shown in the table.'
    },
    'Breath Weapon': {
        name: 'Breath Weapon',
        description: 'You can use your action to exhale destructive energy. Your draconic ancestry determines the size, shape, and damage type of the exhalation. When you use your breath weapon, each creature in the area of the exhalation must make a saving throw, the type of which is determined by your draconic ancestry. The DC for this saving throw equals 8 + your Constitution modifier + your proficiency bonus. A creature takes 2d6 damage on a failed save, and half as much damage on a successful one. The damage increases to 3d6 at 6th level, 4d6 at 11th level, and 5d6 at 16th level. After you use your breath weapon, you can\'t use it again until you complete a short or long rest.'
    },
    'Damage Resistance': {
        name: 'Damage Resistance',
        description: 'You have resistance to the damage type associated with your draconic ancestry.'
    },
    'Gnome Cunning': {
        name: 'Gnome Cunning',
        description: 'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.'
    },
    'Skill Versatility': {
        name: 'Skill Versatility',
        description: 'You gain proficiency in two skills of your choice.'
    },
    'Menacing': {
        name: 'Menacing',
        description: 'You gain proficiency in the Intimidation skill.'
    },
    'Relentless Endurance': {
        name: 'Relentless Endurance',
        description: 'When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can\'t use this feature again until you finish a long rest.'
    },
    'Savage Attacks': {
        name: 'Savage Attacks',
        description: 'When you score a critical hit with a melee weapon attack, you can roll one of the weapon\'s damage dice one additional time and add it to the extra damage of the critical hit.'
    },
    'Hellish Resistance': {
        name: 'Hellish Resistance',
        description: 'You have resistance to fire damage.'
    },
    'Infernal Legacy': {
        name: 'Infernal Legacy',
        description: 'You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells.'
    },
    // Flight and Movement
    'Flight': {
        name: 'Flight',
        description: 'You have a flying speed equal to your walking speed.'
    },
    'Flight (50 ft.)': {
        name: 'Flight (50 ft.)',
        description: 'You have a flying speed of 50 feet.'
    },
    'Talons': {
        name: 'Talons',
        description: 'You are proficient with your unarmed strikes, which deal 1d4 slashing damage on a hit.'
    },
    'Rabbit Hop': {
        name: 'Rabbit Hop',
        description: 'As a bonus action, you can jump a number of feet equal to 5 × your proficiency bonus, without provoking opportunity attacks. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.'
    },
    'Lucky Footwork': {
        name: 'Lucky Footwork',
        description: 'When you fail a Dexterity saving throw, you can use your reaction to roll a d4 and add it to the save, potentially turning the failure into a success. You can\'t use this trait if you\'re prone or your speed is 0.'
    },
    'Hare-Trigger': {
        name: 'Hare-Trigger',
        description: 'You can add your proficiency bonus to your initiative rolls.'
    },
    'Feline Agility': {
        name: 'Feline Agility',
        description: 'Your reflexes and agility allow you to move with a burst of speed. When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can\'t use it again until you move 0 feet on one of your turns.'
    },
    'Silent Feathers': {
        name: 'Silent Feathers',
        description: 'You have proficiency in the Stealth skill.'
    },
    'Mirthful Leaps': {
        name: 'Mirthful Leaps',
        description: 'You can jump a number of feet equal to 5 × your proficiency bonus when you make a running jump, and you can make a standing jump as if you had a running start.'
    },
    // Magic and Spellcasting
    'Fairy Magic': {
        name: 'Fairy Magic',
        description: 'You know the druidcraft cantrip. Starting at 3rd level, you can cast the faerie fire spell with this trait. Starting at 5th level, you can also cast the enlarge/reduce spell with this trait, without requiring a material component. Once you cast faerie fire or enlarge/reduce with this trait, you can\'t cast that spell with it again until you finish a long rest. You can also cast either of those spells using any spell slots you have of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).'
    },
    'Firbolg Magic': {
        name: 'Firbolg Magic',
        description: 'You know the detect magic and disguise self spells. You can cast disguise self with this trait, and you regain the ability to cast it with this trait when you finish a short or long rest. You can also cast either of these spells using any spell slots you have of the appropriate level. Wisdom is your spellcasting ability for these spells when you cast them with this trait.'
    },
    'Githyanki Psionics': {
        name: 'Githyanki Psionics',
        description: 'You know the mage hand cantrip, and the hand is invisible when you cast the cantrip with this trait. When you reach 3rd level, you can cast the jump spell once with this trait, and you regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the misty step spell once with this trait, and you regain the ability to do so when you finish a long rest. Intelligence is your spellcasting ability for these spells when you cast them with this trait, and they don\'t require components.'
    },
    'Githzerai Psionics': {
        name: 'Githzerai Psionics',
        description: 'You know the mage hand cantrip, and the hand is invisible when you cast the cantrip with this trait. When you reach 3rd level, you can cast the shield spell once with this trait, and you regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the detect thoughts spell once with this trait, and you regain the ability to do so when you finish a long rest. Intelligence is your spellcasting ability for these spells when you cast them with this trait, and they don\'t require components.'
    },
    'Duergar Magic': {
        name: 'Duergar Magic',
        description: 'When you reach 3rd level, you can cast the enlarge/reduce spell on yourself once with this trait, using only the spell\'s enlarge option. When you reach 5th level, you can cast the invisibility spell on yourself once with this trait. You regain the ability to cast these spells with this trait when you finish a long rest. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells when you cast them with this trait (choose when you select this race).'
    },
    'Fey Step': {
        name: 'Fey Step',
        description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest.'
    },
    'Serpentine Spellcasting': {
        name: 'Serpentine Spellcasting',
        description: 'You know the poison spray cantrip. You can cast animal friendship an unlimited number of times with this trait, but you can target only snakes with it. Starting at 3rd level, you can cast suggestion with this trait. Once you cast it, you can\'t do so again until you finish a long rest. You can also cast it using any spell slots you have of the appropriate level. Charisma is your spellcasting ability for these spells when you cast them with this trait.'
    },
    // Resistance and Immunity
    'Celestial Resistance': {
        name: 'Celestial Resistance',
        description: 'You have resistance to necrotic damage and radiant damage.'
    },
    'Poison Immunity': {
        name: 'Poison Immunity',
        description: 'You are immune to poison damage and the poisoned condition.'
    },
    'Magic Resistance': {
        name: 'Magic Resistance',
        description: 'You have advantage on saving throws against spells and other magical effects.'
    },
    'Necrotic Resistance': {
        name: 'Necrotic Resistance',
        description: 'You have resistance to necrotic damage.'
    },
    'Fire Resistance': {
        name: 'Fire Resistance',
        description: 'You have resistance to fire damage.'
    },
    'Sunlight Sensitivity': {
        name: 'Sunlight Sensitivity',
        description: 'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.'
    },
    // Physical Traits
    'Powerful Build': {
        name: 'Powerful Build',
        description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.'
    },
    'Natural Armor': {
        name: 'Natural Armor',
        description: 'While you aren\'t wearing armor, your AC equals 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield\'s benefits apply as normal while you use your natural armor.'
    },
    'Claws': {
        name: 'Claws',
        description: 'Your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    'Horns': {
        name: 'Horns',
        description: 'You have horns that you can use to make unarmed strikes. If you hit with them, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    'Bite': {
        name: 'Bite',
        description: 'Your fanged maw is a natural weapon, which you can use to make unarmed strikes. If you hit with it, you deal piercing damage equal to 1d6 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    'Cat\'s Claws': {
        name: 'Cat\'s Claws',
        description: 'You have a climbing speed of 20 feet. In addition, your claws are natural weapons, which you can use to make unarmed strikes. If you hit with them, you deal slashing damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    'Hooves': {
        name: 'Hooves',
        description: 'Your hooves are natural melee weapons, which you can use to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    'Ram': {
        name: 'Ram',
        description: 'You can use your head and horns to make unarmed strikes. If you hit with them, you deal bludgeoning damage equal to 1d4 + your Strength modifier, instead of the bludgeoning damage normal for an unarmed strike.'
    },
    // Special Abilities
    'Healing Hands': {
        name: 'Healing Hands',
        description: 'As an action, you can touch a creature and cause it to regain a number of hit points equal to your level. Once you use this trait, you can\'t use it again until you finish a long rest.'
    },
    'Light Bearer': {
        name: 'Light Bearer',
        description: 'You know the light cantrip. Charisma is your spellcasting ability for it.'
    },
    'Shapechanger': {
        name: 'Shapechanger',
        description: 'As an action, you can change your appearance and your voice. You determine the specifics of the changes, including your coloration, hair length, and sex. You can also adjust your height and weight, but not so much that your size changes. You can make yourself appear as a member of another race, though none of your game statistics change. You can\'t duplicate the appearance of a creature you\'ve never seen, and you must adopt a form that has the same basic arrangement of limbs that you have. Your clothing and equipment aren\'t changed by this trait. You stay in the new form until you use an action to revert to your true form or until you die.'
    },
    'Divergent Persona': {
        name: 'Divergent Persona',
        description: 'You gain proficiency with one of the following skills of your choice: Deception, Insight, Intimidation, or Persuasion.'
    },
    'Stone Camouflage': {
        name: 'Stone Camouflage',
        description: 'You have advantage on Dexterity (Stealth) checks made to hide in rocky terrain.'
    },
    'Unending Breath': {
        name: 'Unending Breath',
        description: 'You can hold your breath indefinitely while you\'re not incapacitated.'
    },
    'Mingle with the Wind': {
        name: 'Mingle with the Wind',
        description: 'You can cast the levitate spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.'
    },
    'Earth Walk': {
        name: 'Earth Walk',
        description: 'You can move across difficult terrain made of earth or stone without spending extra movement.'
    },
    'Merge with Stone': {
        name: 'Merge with Stone',
        description: 'You can cast the pass without trace spell once with this trait, requiring no material components, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.'
    },
    'Reach to the Blaze': {
        name: 'Reach to the Blaze',
        description: 'You can cast the produce flame spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for this spell.'
    },
    'Amphibious': {
        name: 'Amphibious',
        description: 'You can breathe air and water.'
    },
    'Swim': {
        name: 'Swim',
        description: 'You have a swimming speed of 30 feet.'
    },
    'Call to the Wave': {
        name: 'Call to the Wave',
        description: 'You know the acid splash cantrip. When you reach 3rd level, you can cast the create or destroy water spell as a 2nd-level spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. When you reach 5th level, you can cast the water walk spell once with this trait, and you regain the ability to cast it this way when you finish a long rest. Constitution is your spellcasting ability for these spells.'
    },
    'Decadent Mastery': {
        name: 'Decadent Mastery',
        description: 'You learn one language of your choice, and you are proficient with one skill or tool of your choice.'
    },
    'Martial Prodigy': {
        name: 'Martial Prodigy',
        description: 'You are proficient with light armor and with one type of one-handed melee weapon of your choice.'
    },
    'Mental Discipline': {
        name: 'Mental Discipline',
        description: 'You have advantage on saving throws against the charmed and frightened conditions.'
    },
    'Natural Athlete': {
        name: 'Natural Athlete',
        description: 'You have proficiency in the Athletics skill.'
    },
    'Stone\'s Endurance': {
        name: 'Stone\'s Endurance',
        description: 'You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can\'t use it again until you finish a short or long rest.'
    },
    'Mountain Born': {
        name: 'Mountain Born',
        description: 'You have resistance to cold damage. You\'re also acclimated to high altitude, including elevations above 20,000 feet.'
    },
    'Expert Forgery': {
        name: 'Expert Forgery',
        description: 'You can duplicate other creatures\' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects.'
    },
    'Kenku Training': {
        name: 'Kenku Training',
        description: 'You are proficient in your choice of two of the following skills: Acrobatics, Deception, Stealth, and Sleight of Hand.'
    },
    'Mimicry': {
        name: 'Mimicry',
        description: 'You can mimic sounds you have heard, including voices. A creature that hears the sounds you make can tell they are imitations with a successful Wisdom (Insight) check contested by your Charisma (Deception) check.'
    },
    'Leviathan Will': {
        name: 'Leviathan Will',
        description: 'You have advantage on saving throws against being charmed or frightened.'
    },
    'Observant': {
        name: 'Observant',
        description: 'You can see up to 60 feet away in dim light as if it were bright light, and in darkness as if it were dim light.'
    },
    'Reveler': {
        name: 'Reveler',
        description: 'You have proficiency in the Performance and Persuasion skills.'
    },
    'Fey': {
        name: 'Fey',
        description: 'Your creature type is fey, rather than humanoid.'
    },
    'Child of the Sea': {
        name: 'Child of the Sea',
        description: 'You have a swimming speed of 30 feet, and you can breathe air and water.'
    },
    'Friend of the Sea': {
        name: 'Friend of the Sea',
        description: 'Using gestures and sounds, you can communicate simple ideas with any beast that has an innate swimming speed.'
    },
    'Blessing of the Raven Queen': {
        name: 'Blessing of the Raven Queen',
        description: 'As a bonus action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, and you regain all expended uses when you finish a long rest. Starting at 3rd level, you also gain resistance to necrotic damage.'
    },
    'Cat\'s Talent': {
        name: 'Cat\'s Talent',
        description: 'You have proficiency in the Perception and Stealth skills.'
    },
    'Hold Breath': {
        name: 'Hold Breath',
        description: 'You can hold your breath for up to 1 hour at a time.'
    },
    'Shell Defense': {
        name: 'Shell Defense',
        description: 'As an action, you can withdraw into your shell, gaining a +4 bonus to AC and advantage on Strength and Constitution saving throws. While in your shell, you are prone, your speed is 0 and can\'t be increased, you have disadvantage on Dexterity saving throws, you can\'t take reactions, and the only action you can take is a bonus action to emerge from your shell.'
    },
    'Survival Instinct': {
        name: 'Survival Instinct',
        description: 'You gain proficiency in the Survival skill. Tortles have finely honed survival instincts.'
    },
    'Control Air and Water': {
        name: 'Control Air and Water',
        description: 'You can cast fog cloud with this trait. Starting at 3rd level, you can cast gust of wind with it, and starting at 5th level, you can also cast wall of water with it. Once you cast a spell with this trait, you can\'t cast that spell with it again until you finish a long rest. You can also cast these spells using spell slots you have of the appropriate level. Charisma is your spellcasting ability for these spells when you cast them with this trait.'
    },
    'Emissary of the Sea': {
        name: 'Emissary of the Sea',
        description: 'Aquatic creatures have an extraordinary affinity with your people. You can communicate simple ideas with beasts that can breathe water. They can understand the meaning of your words, though you have no special ability to understand them in return.'
    },
    'Guardians of the Depths': {
        name: 'Guardians of the Depths',
        description: 'Adapted to even the most extreme ocean depths, you have resistance to cold damage, and you ignore any of the drawbacks caused by a deep, underwater environment.'
    },
    'Black Blood Healing': {
        name: 'Black Blood Healing',
        description: 'When you take a short rest, you regain 1 additional hit point per level you have.'
    },
    'Limited Telepathy': {
        name: 'Limited Telepathy',
        description: 'You can telepathically speak to any creature you can see within 30 feet of you. You don\'t need to share a language with the creature for it to understand your telepathic messages, but the creature must be able to understand at least one language.'
    },
    'Persuasive': {
        name: 'Persuasive',
        description: 'You have proficiency in the Deception and Persuasion skills.'
    },
    'Verdan Weapon Training': {
        name: 'Verdan Weapon Training',
        description: 'You are proficient with rapiers, shortswords, and hand crossbows.'
    },
    'Long-Limbed': {
        name: 'Long-Limbed',
        description: 'When you make a melee attack on your turn, your reach for it is 5 feet greater than normal.'
    },
    'Sneaky': {
        name: 'Sneaky',
        description: 'You are proficient in the Stealth skill.'
    },
    'Surprise Attack': {
        name: 'Surprise Attack',
        description: 'If you surprise a creature and hit it with an attack on your first turn in combat, the attack deals an extra 2d6 damage to it. You can use this trait only once per combat.'
    },
    'Charge': {
        name: 'Charge',
        description: 'If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a bonus action, making one attack against the target with your hooves.'
    },
    'Equine Build': {
        name: 'Equine Build',
        description: 'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.'
    },
    'Natural Affinity': {
        name: 'Natural Affinity',
        description: 'The fey magic that animates you allows you to cast the druidcraft cantrip.'
    },
    'Fury of the Small': {
        name: 'Fury of the Small',
        description: 'When you damage a creature with an attack or a spell and the creature\'s size is larger than yours, you can cause the attack or spell to deal extra damage to the creature. The extra damage equals your level. Once you use this trait, you can\'t use it again until you finish a short or long rest.'
    },
    'Nimble Escape': {
        name: 'Nimble Escape',
        description: 'You can take the Disengage or Hide action as a bonus action on each of your turns.'
    },
    'Poisonous Skin': {
        name: 'Poisonous Skin',
        description: 'Any creature that grapples you or otherwise comes into direct contact with your skin must succeed on a Constitution saving throw or become poisoned for 1 minute. A poisoned creature no longer in direct contact with you can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. You can also apply this poison to any piercing weapon as part of an attack with that weapon, though when you hit the attack deals its normal damage and not the poison damage. This poison\'s save DC equals 8 + your Constitution modifier + your proficiency bonus.'
    },
    'Standing Leap': {
        name: 'Standing Leap',
        description: 'Your long jump is up to 25 feet and your high jump is up to 15 feet, with or without a running start.'
    },
    'Water Dependency': {
        name: 'Water Dependency',
        description: 'If you fail to immerse yourself in water for at least 1 hour during a day, you suffer 1 level of exhaustion at the end of that day. You can recover from this exhaustion only through magic or by immersing yourself in water for at least 1 hour.'
    },
    'Martial Training': {
        name: 'Martial Training',
        description: 'You are proficient with two martial weapons of your choice and with light armor.'
    },
    'Saving Face': {
        name: 'Saving Face',
        description: 'Hobgoblins are careful not to show weakness in front of their allies, for fear of losing status. If you miss with an attack roll or fail an ability check or saving throw, you can gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +5). Once you use this trait, you can\'t use it again until you finish a short or long rest.'
    },
    'Grovel, Cower, and Beg': {
        name: 'Grovel, Cower, and Beg',
        description: 'As an action on your turn, you can cower pathetically to distract nearby foes. Until the end of your next turn, your allies gain advantage on attack rolls against enemies within 10 feet of you that can see you. Once you use this trait, you can\'t use it again until you finish a short or long rest.'
    },
    'Pack Tactics': {
        name: 'Pack Tactics',
        description: 'You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn\'t incapacitated.'
    },
    'Cunning Artisan': {
        name: 'Cunning Artisan',
        description: 'As part of a short rest, you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature of size Small or larger to create one of the following items: a shield, a club, a javelin, or 1d4 darts or blowgun needles. To use this trait, you need a blade, such as a dagger, or appropriate artisan\'s tools, such as leatherworker\'s tools.'
    },
    'Hunter\'s Lore': {
        name: 'Hunter\'s Lore',
        description: 'You gain proficiency with two of the following skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival.'
    },
    'Hungry Jaws': {
        name: 'Hungry Jaws',
        description: 'In battle, you can throw yourself into a vicious feeding frenzy. As a bonus action, you can make a special attack with your Bite. If the attack hits, it deals its normal damage, and you gain temporary hit points (minimum of 1) equal to your Constitution modifier, and you can\'t use this trait again until you finish a short or long rest.'
    },
    'Goring Rush': {
        name: 'Goring Rush',
        description: 'When you take the Dash action on your turn, you can make one melee attack with your horns as a bonus action.'
    },
    'Hammering Horns': {
        name: 'Hammering Horns',
        description: 'Immediately after you hit a creature with a melee attack as part of the Attack action on your turn, you can use a bonus action to attempt to shove that target with your horns. The target must be no more than one size larger than you and within 5 feet of you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your proficiency bonus + your Strength modifier, you push it up to 10 feet away from you.'
    },
    'Imposing Presence': {
        name: 'Imposing Presence',
        description: 'You have proficiency in one of the following skills of your choice: Intimidation or Persuasion.'
    },
    'Labyrinthine Recall': {
        name: 'Labyrinthine Recall',
        description: 'You can perfectly recall any path you have traveled.'
    },
    'Aggressive': {
        name: 'Aggressive',
        description: 'As a bonus action, you can move up to your speed toward a hostile creature that you can see.'
    },
    'Shifting': {
        name: 'Shifting',
        description: 'As a bonus action, you can assume a more bestial appearance. This transformation lasts for 1 minute, until you die, or until you revert to your normal appearance as a bonus action. When you shift, you gain temporary hit points equal to 1d6 + your level (minimum of 1). While shifted, you have advantage on Strength-based ability checks and saving throws, and you can\'t speak. Once you shift, you can\'t do so again until you finish a short or long rest.'
    }
};
