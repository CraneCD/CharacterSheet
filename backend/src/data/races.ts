// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

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
    /** A choice made at creation (Elven Lineage, Draconic Ancestry, ...). Adds the trait "<trait> (<option name>)". */
    lineageOptions?: {
        trait: string;
        label: string;
        options: LineageOption[];
    };
    source?: string;
    legacy?: boolean;
}

export const races: Race[] = [
    {
        "id": "aasimar",
        "name": "Aasimar",
        "source": "PHB 2024",
        "description": "Aasimar are mortals who carry a spark of the Upper Planes within their souls, which they can fan into a blaze of light.",
        "size": "Medium or Small",
        "speed": 30,
        "traits": [
            "Celestial Resistance",
            "Darkvision",
            "Healing Hands",
            "Light Bearer",
            "Celestial Revelation"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "dragonborn",
        "name": "Dragonborn",
        "source": "PHB 2024",
        "description": "The ancestors of dragonborn hatched from the eggs of chromatic and metallic dragons, and their draconic heritage shows in their scales and breath.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Draconic Ancestry",
            "Breath Weapon",
            "Damage Resistance",
            "Darkvision",
            "Draconic Flight"
        ],
        "lineageOptions": {
            "trait": "Draconic Ancestry",
            "label": "Draconic Ancestry",
            "options": [
                {
                    "id": "black",
                    "name": "Black",
                    "description": "Acid damage."
                },
                {
                    "id": "blue",
                    "name": "Blue",
                    "description": "Lightning damage."
                },
                {
                    "id": "brass",
                    "name": "Brass",
                    "description": "Fire damage."
                },
                {
                    "id": "bronze",
                    "name": "Bronze",
                    "description": "Lightning damage."
                },
                {
                    "id": "copper",
                    "name": "Copper",
                    "description": "Acid damage."
                },
                {
                    "id": "gold",
                    "name": "Gold",
                    "description": "Fire damage."
                },
                {
                    "id": "green",
                    "name": "Green",
                    "description": "Poison damage."
                },
                {
                    "id": "red",
                    "name": "Red",
                    "description": "Fire damage."
                },
                {
                    "id": "silver",
                    "name": "Silver",
                    "description": "Cold damage."
                },
                {
                    "id": "white",
                    "name": "White",
                    "description": "Cold damage."
                }
            ]
        },
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "dwarf",
        "name": "Dwarf",
        "source": "PHB 2024",
        "description": "Dwarves were raised from the earth by a deity of the forge. They are bold and hardy, known as skilled warriors, miners and workers of stone and metal.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Darkvision (120 ft.)",
            "Dwarven Resilience",
            "Dwarven Toughness",
            "Stonecunning"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "elf",
        "name": "Elf",
        "source": "PHB 2024",
        "description": "Created by the god Corellon, the first elves could change their forms at will. Elves have pointed ears, lack facial and body hair, and live for centuries.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Darkvision",
            "Elven Lineage",
            "Fey Ancestry",
            "Keen Senses",
            "Trance"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "lineageOptions": {
            "trait": "Elven Lineage",
            "label": "Elven Lineage",
            "options": [
                {
                    "id": "drow",
                    "name": "Drow",
                    "description": "Darkvision 120 ft; Dancing Lights, then Faerie Fire (level 3) and Darkness (level 5)."
                },
                {
                    "id": "high_elf",
                    "name": "High Elf",
                    "description": "Prestidigitation (swappable Wizard cantrip), then Detect Magic (level 3) and Misty Step (level 5)."
                },
                {
                    "id": "wood_elf",
                    "name": "Wood Elf",
                    "description": "Speed 35 ft; Druidcraft, then Longstrider (level 3) and Pass without Trace (level 5)."
                }
            ]
        }
    },
    {
        "id": "gnome",
        "name": "Gnome",
        "source": "PHB 2024",
        "description": "Gnomes are magical folk created by gods of invention, illusions and life underground; they are curious, playful and endlessly inventive.",
        "size": "Small",
        "speed": 30,
        "traits": [
            "Darkvision",
            "Gnomish Cunning",
            "Gnomish Lineage"
        ],
        "lineageOptions": {
            "trait": "Gnomish Lineage",
            "label": "Gnomish Lineage",
            "options": [
                {
                    "id": "forest_gnome",
                    "name": "Forest Gnome",
                    "description": "You know the Minor Illusion cantrip and always have Speak with Animals prepared."
                },
                {
                    "id": "rock_gnome",
                    "name": "Rock Gnome",
                    "description": "You know the Mending and Prestidigitation cantrips and can build tiny clockwork devices."
                }
            ]
        },
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "goliath",
        "name": "Goliath",
        "source": "PHB 2024",
        "description": "Goliaths are distant descendants of giants. They bear the physical and supernatural echoes of their ancestors and tower over most other folk.",
        "size": "Medium",
        "speed": 35,
        "traits": [
            "Giant Ancestry",
            "Large Form",
            "Powerful Build"
        ],
        "lineageOptions": {
            "trait": "Giant Ancestry",
            "label": "Giant Ancestry",
            "options": [
                {
                    "id": "cloud",
                    "name": "Cloud's Jaunt",
                    "description": "Bonus Action teleport up to 30 feet."
                },
                {
                    "id": "fire",
                    "name": "Fire's Burn",
                    "description": "Deal an extra 1d10 Fire damage on a hit."
                },
                {
                    "id": "frost",
                    "name": "Frost's Chill",
                    "description": "Deal an extra 1d6 Cold damage and reduce Speed by 10 feet."
                },
                {
                    "id": "hill",
                    "name": "Hill's Tumble",
                    "description": "Knock a Large or smaller creature Prone on a hit."
                },
                {
                    "id": "stone",
                    "name": "Stone's Endurance",
                    "description": "Reaction to reduce damage by 1d12 + Constitution modifier."
                },
                {
                    "id": "storm",
                    "name": "Storm's Thunder",
                    "description": "Reaction to deal 1d8 Thunder damage to a creature that damages you."
                }
            ]
        },
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "halfling",
        "name": "Halfling",
        "source": "PHB 2024",
        "description": "Cherished and guided by gods who value life, home and hearth, halflings gravitate toward bucolic havens and have a knack for avoiding danger.",
        "size": "Small",
        "speed": 30,
        "traits": [
            "Brave",
            "Halfling Nimbleness",
            "Luck",
            "Naturally Stealthy"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "human",
        "name": "Human",
        "source": "PHB 2024",
        "description": "Found throughout the multiverse, humans are as varied as they are numerous and endeavor to achieve as much as they can in their brief lives.",
        "size": "Medium or Small",
        "speed": 30,
        "traits": [
            "Resourceful",
            "Skillful",
            "Versatile"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "orc",
        "name": "Orc",
        "source": "PHB 2024",
        "description": "Orcs trace their creation to Gruumsh, who gave them gifts to help them wander great plains, vast caverns and churning seas and to face the monsters there.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Adrenaline Rush",
            "Darkvision (120 ft.)",
            "Relentless Endurance"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "tiefling",
        "name": "Tiefling",
        "source": "PHB 2024",
        "description": "Tieflings are either born in the Lower Planes or have fiendish ancestors who originated there; a fiendish legacy links them to one of those realms.",
        "size": "Medium or Small",
        "speed": 30,
        "traits": [
            "Darkvision",
            "Fiendish Legacy",
            "Otherworldly Presence"
        ],
        "lineageOptions": {
            "trait": "Fiendish Legacy",
            "label": "Fiendish Legacy",
            "options": [
                {
                    "id": "abyssal",
                    "name": "Abyssal",
                    "description": "Poison resistance; Poison Spray, then Ray of Sickness (level 3) and Hold Person (level 5)."
                },
                {
                    "id": "chthonic",
                    "name": "Chthonic",
                    "description": "Necrotic resistance; Chill Touch, then False Life (level 3) and Ray of Enfeeblement (level 5)."
                },
                {
                    "id": "infernal",
                    "name": "Infernal",
                    "description": "Fire resistance; Fire Bolt, then Hellish Rebuke (level 3) and Darkness (level 5)."
                }
            ]
        },
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ]
    },
    {
        "id": "aarakocra",
        "name": "Aarakocra",
        "size": "Medium",
        "speed": 30,
        "description": "Aarakocra are bird-like humanoids from the Elemental Plane of Air who soar on feathered wings.",
        "traits": [
            "Flight",
            "Talons",
            "Wind Caller"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "bugbear",
        "name": "Bugbear",
        "size": "Medium",
        "speed": 30,
        "description": "Bugbears are long-limbed goblinoids with a fey heritage and a talent for ambush.",
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Long-Limbed",
            "Powerful Build",
            "Sneaky",
            "Surprise Attack"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "centaur",
        "name": "Centaur",
        "size": "Medium",
        "speed": 40,
        "description": "Centaurs gallop across the planes with the upper body of a humanoid and the lower body of a horse. Your creature type is Fey.",
        "traits": [
            "Charge",
            "Equine Build",
            "Hooves",
            "Natural Affinity"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "changeling",
        "name": "Changeling",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Changelings are fey-touched shapeshifters who can alter their appearance at will.",
        "traits": [
            "Changeling Instincts",
            "Shapechanger"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "deep-gnome",
        "name": "Deep Gnome (Svirfneblin)",
        "size": "Small",
        "speed": 30,
        "description": "Deep gnomes are gnomes infused with the magic of the Underdark, naturally stealthy and resistant to magic.",
        "traits": [
            "Superior Darkvision",
            "Gift of the Svirfneblin",
            "Gnomish Magic Resistance",
            "Svirfneblin Camouflage"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "duergar",
        "name": "Duergar",
        "size": "Medium",
        "speed": 30,
        "description": "Duergar are dwarves whose ancestors were changed by centuries of captivity by mind flayers in the Underdark.",
        "traits": [
            "Superior Darkvision",
            "Duergar Magic",
            "Dwarven Resilience",
            "Psionic Fortitude"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "eladrin",
        "name": "Eladrin",
        "size": "Medium",
        "speed": 30,
        "description": "Eladrin are elves of the Feywild whose moods and magic shift with the seasons.",
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Fey Step",
            "Keen Senses (Perception)",
            "Trance"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "fairy",
        "name": "Fairy",
        "size": "Small",
        "speed": 30,
        "description": "Fairies are tiny winged fey of the Feywild. Your creature type is Fey.",
        "traits": [
            "Fairy Magic",
            "Flight"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "firbolg",
        "name": "Firbolg",
        "size": "Medium",
        "speed": 30,
        "description": "Firbolgs are reclusive forest folk with a gentle manner and a quiet magic tied to the natural world.",
        "traits": [
            "Firbolg Magic",
            "Hidden Step",
            "Powerful Build",
            "Speech of Beast and Leaf"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "genasi-air",
        "name": "Genasi (Air)",
        "size": "Medium or Small",
        "speed": 35,
        "description": "Genasi carry the power of the elemental planes in their bodies. Air genasi have the speed and freedom of the wind.",
        "traits": [
            "Darkvision",
            "Lightning Resistance",
            "Mingle with the Wind",
            "Unending Breath"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "genasi-earth",
        "name": "Genasi (Earth)",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Genasi carry the power of the elemental planes in their bodies. Earth genasi share the steadfastness of stone.",
        "traits": [
            "Darkvision",
            "Earth Walk",
            "Merge with Stone"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "genasi-fire",
        "name": "Genasi (Fire)",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Genasi carry the power of the elemental planes in their bodies. Fire genasi burn with an inner flame.",
        "traits": [
            "Darkvision",
            "Fire Resistance",
            "Reach to the Blaze"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "genasi-water",
        "name": "Genasi (Water)",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Genasi carry the power of the elemental planes in their bodies. Water genasi are at home in the sea. You also have a Swim Speed equal to your Speed.",
        "traits": [
            "Acid Resistance",
            "Amphibious",
            "Darkvision",
            "Swim",
            "Call to the Wave"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "githyanki",
        "name": "Githyanki",
        "size": "Medium",
        "speed": 30,
        "description": "Githyanki are Astral Plane raiders, descendants of a people who threw off mind flayer enslavement.",
        "traits": [
            "Astral Knowledge",
            "Githyanki Psionics",
            "Psychic Resilience"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "githzerai",
        "name": "Githzerai",
        "size": "Medium",
        "speed": 30,
        "description": "Githzerai are ascetics of Limbo, descendants of a people who threw off mind flayer enslavement, who hone their minds through discipline.",
        "traits": [
            "Githzerai Psionics",
            "Mental Discipline",
            "Psychic Resilience"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "goblin",
        "name": "Goblin",
        "size": "Small",
        "speed": 30,
        "description": "Goblins are small goblinoids with a fey heritage and a knack for escaping danger.",
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Fury of the Small",
            "Nimble Escape"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "harengon",
        "name": "Harengon",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Harengons are rabbitfolk from the Feywild with springy legs and quick reflexes.",
        "traits": [
            "Hare-Trigger",
            "Leporine Senses",
            "Lucky Footwork",
            "Rabbit Hop"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "hobgoblin",
        "name": "Hobgoblin",
        "size": "Medium",
        "speed": 30,
        "description": "Hobgoblins are goblinoids whose fey heritage shows in their gift for aiding their companions.",
        "traits": [
            "Darkvision",
            "Fey Gift",
            "Fortune from the Many"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "kenku",
        "name": "Kenku",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Kenku are feathered folk with a remarkable memory and a talent for mimicry.",
        "traits": [
            "Expert Duplication",
            "Kenku Recall",
            "Mimicry"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "kobold",
        "name": "Kobold",
        "size": "Small",
        "speed": 30,
        "description": "Kobolds are small reptilian folk with a draconic legacy.",
        "traits": [
            "Darkvision",
            "Draconic Cry",
            "Kobold Legacy"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "lizardfolk",
        "name": "Lizardfolk",
        "size": "Medium",
        "speed": 30,
        "description": "Lizardfolk are reptilian people with a keen understanding of the natural world. You also have a Swim Speed equal to your Speed.",
        "traits": [
            "Bite",
            "Hold Breath",
            "Hungry Jaws",
            "Natural Armor",
            "Nature's Intuition"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "minotaur",
        "name": "Minotaur",
        "size": "Medium",
        "speed": 30,
        "description": "Minotaurs are powerful, horned folk with an unerring sense of direction.",
        "traits": [
            "Horns",
            "Goring Rush",
            "Hammering Horns",
            "Labyrinthine Recall"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "owlin",
        "name": "Owlin",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Owlin are owlfolk touched by the magic of the Feywild, with silent wings and keen night vision.",
        "traits": [
            "Superior Darkvision",
            "Flight",
            "Silent Feathers"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "satyr",
        "name": "Satyr",
        "size": "Medium",
        "speed": 35,
        "description": "Satyrs are revelers of the Feywild with the legs and horns of a goat. Your creature type is Fey.",
        "traits": [
            "Fey",
            "Ram",
            "Magic Resistance",
            "Mirthful Leaps",
            "Reveler"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "sea-elf",
        "name": "Sea Elf",
        "size": "Medium",
        "speed": 30,
        "description": "Sea elves are elves who long ago adapted to life in the ocean depths.",
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Keen Senses (Perception)",
            "Trance",
            "Child of the Sea",
            "Friend of the Sea"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "shadar-kai",
        "name": "Shadar-Kai",
        "size": "Medium",
        "speed": 30,
        "description": "Shadar-kai are elves of the Shadowfell, bound to the Raven Queen.",
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Keen Senses (Perception)",
            "Trance",
            "Necrotic Resistance",
            "Blessing of the Raven Queen"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "shifter",
        "name": "Shifter",
        "size": "Medium",
        "speed": 30,
        "description": "Shifters have a bestial aspect they can briefly call upon.",
        "traits": [
            "Bestial Instincts",
            "Darkvision",
            "Shifting"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "tabaxi",
        "name": "Tabaxi",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Tabaxi are catfolk with boundless curiosity. You also have a Climb Speed equal to your Speed.",
        "traits": [
            "Darkvision",
            "Feline Agility",
            "Cat's Claws",
            "Cat's Talent"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "tortle",
        "name": "Tortle",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Tortles are turtle folk who carry their shell-homes on their backs.",
        "traits": [
            "Claws",
            "Hold Breath (1 hour)",
            "Natural Armor (Shell)",
            "Nature's Intuition",
            "Shell Defense"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "triton",
        "name": "Triton",
        "size": "Medium",
        "speed": 30,
        "description": "Tritons are guardians of the ocean depths with ties to the Elemental Plane of Water. You also have a Swim Speed equal to your Speed.",
        "traits": [
            "Amphibious",
            "Control Air and Water",
            "Darkvision",
            "Emissary of the Sea",
            "Guardians of the Depths"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "yuan-ti",
        "name": "Yuan-Ti",
        "size": "Medium or Small",
        "speed": 30,
        "description": "Yuan-ti are serpentine humanoids transformed by ancient rituals.",
        "traits": [
            "Darkvision",
            "Magic Resistance",
            "Poison Resilience",
            "Serpentine Spellcasting"
        ],
        "languages": [
            "Common",
            "Two standard languages of your choice"
        ],
        "source": "Monsters of the Multiverse"
    },
    {
        "id": "half-elf",
        "name": "Half-Elf",
        "description": "Walking in two worlds but truly belonging to neither, half-elves combine what some say are the best qualities of both races.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Darkvision",
            "Fey Ancestry",
            "Skill Versatility"
        ],
        "languages": [
            "Common",
            "Elvish",
            "One extra language"
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "half-orc",
        "name": "Half-Orc",
        "description": "Half-orcs' grayish pigmentation, sloping foreheads, jutting jaws, prominent teeth, and towering builds make their orcish heritage plain for all to see.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Darkvision",
            "Menacing",
            "Relentless Endurance",
            "Savage Attacks"
        ],
        "languages": [
            "Common",
            "Orc"
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "locathah",
        "name": "Locathah",
        "description": "Locathah are fish-like humanoids who live in the depths of the ocean.",
        "size": "Medium",
        "speed": 30,
        "traits": [
            "Amphibious",
            "Leviathan Will",
            "Natural Armor",
            "Observant"
        ],
        "languages": [
            "Common",
            "Aquan"
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "verdan",
        "name": "Verdan",
        "description": "Verdan are a race of goblinoid humanoids who have been transformed by chaos magic.",
        "size": "Small or Medium",
        "speed": 30,
        "traits": [
            "Black Blood Healing",
            "Limited Telepathy",
            "Persuasive",
            "Verdan Weapon Training"
        ],
        "languages": [
            "Common",
            "One language of your choice"
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "grung",
        "name": "Grung",
        "description": "Grungs are small, froglike humanoids native to tropical forests and jungles.",
        "size": "Small",
        "speed": 25,
        "traits": [
            "Amphibious",
            "Poison Immunity",
            "Poisonous Skin",
            "Standing Leap",
            "Water Dependency"
        ],
        "languages": [
            "Common",
            "Grung"
        ],
        "legacy": true,
        "source": "Legacy (pre-2024)"
    }
];
