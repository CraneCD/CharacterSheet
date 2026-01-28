export interface Race {
    id: string;
    name: string;
    description: string;
    size: string;
    speed: number;
    traits: string[];
    languages: string[];
}

export const races: Race[] = [
    {
        id: 'human',
        name: 'Human',
        description: 'Humans are the most adaptable and ambitious people among the common races. Found throughout the multiverse, they are as varied as they are numerous.',
        size: 'Medium',
        speed: 30,
        traits: ['Resourceful', 'Skillful', 'Versatile'],
        languages: ['Common', 'One extra language of your choice']
    },
    {
        id: 'elf',
        name: 'Elf',
        description: 'Elves are a magical people of otherworldly grace, living in the world but not entirely part of it. Their curiosity led many to explore other planes.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Elven Lineage', 'Fey Ancestry', 'Keen Senses', 'Trance'],
        languages: ['Common', 'Elvish']
    },
    {
        id: 'dwarf',
        name: 'Dwarf',
        description: 'Bold and hardy, dwarves are known as skilled warriors, miners, and workers of stone and metal. They were raised from the earth by a deity of the forge.',
        size: 'Medium',
        speed: 25,
        traits: ['Darkvision', 'Dwarven Resilience', 'Dwarven Toughness', 'Stonecunning'],
        languages: ['Common', 'Dwarvish']
    },
    {
        id: 'halfling',
        name: 'Halfling',
        description: 'Halflings possess a brave and adventurous spirit that leads them on journeys of discovery. They survive in a world of larger creatures by avoiding notice or avoiding offense.',
        size: 'Small',
        speed: 25,
        traits: ['Brave', 'Halfling Nimbleness', 'Luck', 'Naturally Stealthy'],
        languages: ['Common', 'Halfling']
    },
    {
        id: 'dragonborn',
        name: 'Dragonborn',
        description: 'Born of dragons, as their name proclaims, dragonborn walk proudly through a world that greets them with fearful incomprehension. Their ancestors hatched from the eggs of chromatic and metallic dragons.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Draconic Ancestry', 'Breath Weapon', 'Damage Resistance', 'Draconic Flight'],
        languages: ['Common', 'Draconic']
    },
    {
        id: 'gnome',
        name: 'Gnome',
        description: 'Gnomes are magical folk created by gods of invention, illusions, and life underground. Their energy and enthusiasm shine through every inch of their tiny bodies.',
        size: 'Small',
        speed: 25,
        traits: ['Darkvision', 'Gnomish Cunning', 'Gnomish Lineage'],
        languages: ['Common', 'Gnomish']
    },
    {
        id: 'half-elf',
        name: 'Half-Elf',
        description: 'Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of both races.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fey Ancestry', 'Skill Versatility'],
        languages: ['Common', 'Elvish', 'One extra language']
    },
    {
        id: 'half-orc',
        name: 'Half-Orc',
        description: 'Half-orcs\' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Menacing', 'Relentless Endurance', 'Savage Attacks'],
        languages: ['Common', 'Orc']
    },
    {
        id: 'tiefling',
        name: 'Tiefling',
        description: 'Tieflings are either born in the Lower Planes or have fiendish ancestors who originated there. To be greeted with stares and whispers is the lot of many tieflings.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fiendish Legacy', 'Hellish Resistance', 'Otherworldly Presence'],
        languages: ['Common', 'Infernal']
    },
    {
        id: 'orc',
        name: 'Orc',
        description: 'Orcs are equipped with gifts to help them wander great plains, vast caverns, and churning seas. Gruumsh\'s blessings make them tireless guardians and mighty allies.',
        size: 'Medium',
        speed: 30,
        traits: ['Adrenaline Rush', 'Darkvision', 'Relentless Endurance'],
        languages: ['Common', 'Orc']
    },
    {
        id: 'aarakocra',
        name: 'Aarakocra',
        description: 'Aarakocra are bird-like humanoids with wings and talons.',
        size: 'Medium',
        speed: 25,
        traits: ['Flight (50 ft.)', 'Talons'],
        languages: ['Common', 'Aarakocra', 'Auran']
    },
    {
        id: 'aasimar',
        name: 'Aasimar',
        description: 'Aasimar are mortals who carry a spark of the Upper Planes within their souls, either by birth or through a divine event.',
        size: 'Medium',
        speed: 30,
        traits: ['Celestial Resistance', 'Celestial Revelation', 'Darkvision', 'Healing Hands', 'Light Bearer'],
        languages: ['Common', 'Celestial']
    },
    {
        id: 'changeling',
        name: 'Changeling',
        description: 'Changelings are shapeshifters capable of disguising their appearance.',
        size: 'Medium',
        speed: 30,
        traits: ['Shapechanger', 'Divergent Persona'],
        languages: ['Common', 'Two languages of your choice']
    },
    {
        id: 'deep-gnome',
        name: 'Deep Gnome (Svirfneblin)',
        description: 'Deep gnomes, or svirfneblin, are gnomes who live in the Underdark.',
        size: 'Small',
        speed: 25,
        traits: ['Superior Darkvision', 'Stone Camouflage', 'Gnome Cunning'],
        languages: ['Common', 'Gnomish', 'Undercommon']
    },
    {
        id: 'duergar',
        name: 'Duergar',
        description: 'Duergar are dwarves who were corrupted by mind flayers and now dwell in the Underdark.',
        size: 'Medium',
        speed: 25,
        traits: ['Superior Darkvision', 'Duergar Resilience', 'Duergar Magic', 'Sunlight Sensitivity'],
        languages: ['Common', 'Dwarvish', 'Undercommon']
    },
    {
        id: 'eladrin',
        name: 'Eladrin',
        description: 'Eladrin are elves closely tied to the Feywild, embodying the seasons.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Fey Step'],
        languages: ['Common', 'Elvish']
    },
    {
        id: 'fairy',
        name: 'Fairy',
        description: 'Fairies are small fey creatures with an otherworldly beauty.',
        size: 'Small',
        speed: 30,
        traits: ['Flight', 'Fairy Magic'],
        languages: ['Common', 'Sylvan']
    },
    {
        id: 'firbolg',
        name: 'Firbolg',
        description: 'Firbolgs are reclusive forest-dwelling giants with a strong connection to nature.',
        size: 'Medium',
        speed: 30,
        traits: ['Firbolg Magic', 'Hidden Step', 'Powerful Build', 'Speech of Beast and Leaf'],
        languages: ['Common', 'Elvish', 'Giant']
    },
    {
        id: 'genasi-air',
        name: 'Genasi (Air)',
        description: 'Genasi are planetouched beings with elemental ancestry. Air genasi have the power of wind and sky.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Unending Breath', 'Mingle with the Wind'],
        languages: ['Common', 'Primordial']
    },
    {
        id: 'genasi-earth',
        name: 'Genasi (Earth)',
        description: 'Genasi are planetouched beings with elemental ancestry. Earth genasi have the power of stone and earth.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Earth Walk', 'Merge with Stone'],
        languages: ['Common', 'Primordial']
    },
    {
        id: 'genasi-fire',
        name: 'Genasi (Fire)',
        description: 'Genasi are planetouched beings with elemental ancestry. Fire genasi have the power of flame.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fire Resistance', 'Reach to the Blaze'],
        languages: ['Common', 'Primordial']
    },
    {
        id: 'genasi-water',
        name: 'Genasi (Water)',
        description: 'Genasi are planetouched beings with elemental ancestry. Water genasi have the power of water and sea.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Amphibious', 'Swim', 'Call to the Wave'],
        languages: ['Common', 'Primordial']
    },
    {
        id: 'githyanki',
        name: 'Githyanki',
        description: 'Githyanki are a race of tall, gaunt humanoids with psionic powers, sworn enemies of mind flayers.',
        size: 'Medium',
        speed: 30,
        traits: ['Decadent Mastery', 'Githyanki Psionics', 'Martial Prodigy'],
        languages: ['Common', 'Gith']
    },
    {
        id: 'githzerai',
        name: 'Githzerai',
        description: 'Githzerai are a race of tall, gaunt humanoids with psionic powers, focused on discipline and order.',
        size: 'Medium',
        speed: 30,
        traits: ['Mental Discipline', 'Githzerai Psionics'],
        languages: ['Common', 'Gith']
    },
    {
        id: 'goliath',
        name: 'Goliath',
        description: 'Goliaths are distant descendants of giants and seek heights above those reached by their ancestors. They are strong, competitive, and mountain-dwelling.',
        size: 'Medium',
        speed: 30,
        traits: ['Giant Ancestry', 'Large Form', 'Powerful Build'],
        languages: ['Common', 'Giant']
    },
    {
        id: 'harengon',
        name: 'Harengon',
        description: 'Harengon are rabbit-like humanoids with a strong connection to the Feywild.',
        size: 'Small or Medium',
        speed: 30,
        traits: ['Lucky Footwork', 'Rabbit Hop', 'Hare-Trigger'],
        languages: ['Common', 'One language of your choice']
    },
    {
        id: 'kenku',
        name: 'Kenku',
        description: 'Kenku are a race of crow-like humanoids cursed to only mimic sounds they have heard.',
        size: 'Medium',
        speed: 30,
        traits: ['Expert Forgery', 'Kenku Training', 'Mimicry'],
        languages: ['Common', 'Auran']
    },
    {
        id: 'locathah',
        name: 'Locathah',
        description: 'Locathah are fish-like humanoids who live in the depths of the ocean.',
        size: 'Medium',
        speed: 30,
        traits: ['Amphibious', 'Leviathan Will', 'Natural Armor', 'Observant'],
        languages: ['Common', 'Aquan']
    },
    {
        id: 'owlin',
        name: 'Owlin',
        description: 'Owlin are owl-like humanoids with the ability to fly.',
        size: 'Small or Medium',
        speed: 30,
        traits: ['Darkvision', 'Flight', 'Silent Feathers'],
        languages: ['Common', 'One language of your choice']
    },
    {
        id: 'satyr',
        name: 'Satyr',
        description: 'Satyrs are fey creatures with the upper body of a human and the lower body of a goat.',
        size: 'Medium',
        speed: 35,
        traits: ['Fey', 'Ram', 'Reveler', 'Mirthful Leaps'],
        languages: ['Common', 'Sylvan']
    },
    {
        id: 'sea-elf',
        name: 'Sea Elf',
        description: 'Sea elves are elves who have adapted to life in the ocean depths.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Child of the Sea', 'Friend of the Sea'],
        languages: ['Common', 'Elvish', 'Aquan']
    },
    {
        id: 'shadar-kai',
        name: 'Shadar-Kai',
        description: 'Shadar-kai are elves touched by the Shadowfell, serving the Raven Queen.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fey Ancestry', 'Keen Senses', 'Trance', 'Necrotic Resistance', 'Blessing of the Raven Queen'],
        languages: ['Common', 'Elvish']
    },
    {
        id: 'tabaxi',
        name: 'Tabaxi',
        description: 'Tabaxi are a race of cat-like humanoids with a curiosity for collecting interesting objects.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Feline Agility', 'Cat\'s Claws', 'Cat\'s Talent'],
        languages: ['Common', 'One language of your choice']
    },
    {
        id: 'tortle',
        name: 'Tortle',
        description: 'Tortles are a race of humanoid turtles with natural armor.',
        size: 'Medium',
        speed: 30,
        traits: ['Claws', 'Hold Breath', 'Natural Armor', 'Shell Defense', 'Survival Instinct'],
        languages: ['Common', 'Aquan']
    },
    {
        id: 'triton',
        name: 'Triton',
        description: 'Tritons are a race of aquatic humanoids from the Elemental Plane of Water.',
        size: 'Medium',
        speed: 30,
        traits: ['Amphibious', 'Control Air and Water', 'Emissary of the Sea', 'Guardians of the Depths'],
        languages: ['Common', 'Primordial']
    },
    {
        id: 'verdan',
        name: 'Verdan',
        description: 'Verdan are a race of goblinoid humanoids who have been transformed by chaos magic.',
        size: 'Small or Medium',
        speed: 30,
        traits: ['Black Blood Healing', 'Limited Telepathy', 'Persuasive', 'Verdan Weapon Training'],
        languages: ['Common', 'One language of your choice']
    },
    {
        id: 'bugbear',
        name: 'Bugbear',
        description: 'Bugbears are large, hairy goblinoids with a talent for stealth and ambush.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Long-Limbed', 'Powerful Build', 'Sneaky', 'Surprise Attack'],
        languages: ['Common', 'Goblin']
    },
    {
        id: 'centaur',
        name: 'Centaur',
        description: 'Centaurs are humanoid creatures with the upper body of a human and the lower body of a horse.',
        size: 'Medium',
        speed: 40,
        traits: ['Charge', 'Equine Build', 'Hooves', 'Natural Affinity'],
        languages: ['Common', 'Elvish', 'Sylvan']
    },
    {
        id: 'goblin',
        name: 'Goblin',
        description: 'Goblins are small, black-hearted humanoids that lair in despoiled dungeons and other dismal settings.',
        size: 'Small',
        speed: 30,
        traits: ['Darkvision', 'Fury of the Small', 'Nimble Escape'],
        languages: ['Common', 'Goblin']
    },
    {
        id: 'grung',
        name: 'Grung',
        description: 'Grungs are small, froglike humanoids native to tropical forests and jungles.',
        size: 'Small',
        speed: 25,
        traits: ['Amphibious', 'Poison Immunity', 'Poisonous Skin', 'Standing Leap', 'Water Dependency'],
        languages: ['Common', 'Grung']
    },
    {
        id: 'hobgoblin',
        name: 'Hobgoblin',
        description: 'Hobgoblins are militaristic humanoids known for their discipline and tactical prowess.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Fey Ancestry', 'Martial Training', 'Saving Face'],
        languages: ['Common', 'Goblin']
    },
    {
        id: 'kobold',
        name: 'Kobold',
        description: 'Kobolds are small, reptilian humanoids known for their cowardice and cunning traps.',
        size: 'Small',
        speed: 30,
        traits: ['Darkvision', 'Grovel, Cower, and Beg', 'Pack Tactics', 'Sunlight Sensitivity'],
        languages: ['Common', 'Draconic']
    },
    {
        id: 'lizardfolk',
        name: 'Lizardfolk',
        description: 'Lizardfolk are primitive reptilian humanoids that lurk in swamps and jungles.',
        size: 'Medium',
        speed: 30,
        traits: ['Bite', 'Cunning Artisan', 'Hold Breath', 'Hunter\'s Lore', 'Natural Armor', 'Hungry Jaws'],
        languages: ['Common', 'Draconic']
    },
    {
        id: 'minotaur',
        name: 'Minotaur',
        description: 'Minotaurs are powerful humanoids with the head and horns of a bull.',
        size: 'Medium',
        speed: 30,
        traits: ['Horns', 'Goring Rush', 'Hammering Horns', 'Imposing Presence', 'Labyrinthine Recall'],
        languages: ['Common', 'Minotaur']
    },
    {
        id: 'shifter',
        name: 'Shifter',
        description: 'Shifters are humanoids with a bestial aspect, able to briefly call upon their animalistic nature.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Keen Senses', 'Shifting'],
        languages: ['Common', 'One language of your choice']
    },
    {
        id: 'yuan-ti',
        name: 'Yuan-Ti',
        description: 'Yuan-ti are serpentine humanoids with a connection to dark magic and snake gods.',
        size: 'Medium',
        speed: 30,
        traits: ['Darkvision', 'Magic Resistance', 'Poison Immunity', 'Serpentine Spellcasting'],
        languages: ['Common', 'Abyssal', 'Draconic']
    }
];
