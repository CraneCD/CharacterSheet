// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface Background {
    id: string;
    name: string;
    description: string;
    /** 2024: the three abilities this background can raise (+2/+1 or +1/+1/+1, player's choice). */
    abilityScores: string[];
    /** Origin feat granted by the background (feat id). */
    originFeat: string;
    /** e.g. "Cleric" for Magic Initiate (Cleric). */
    originFeatNote?: string;
    skillProficiencies: string[];
    toolProficiencies: string[];
    /** 2024 backgrounds grant no languages (every character knows Common + 2). Kept for older data. */
    languages: number;
    /** Same format as class starting equipment: "items... or 50 GP". */
    startingEquipment: string[];
    /** Pre-2024 narrative feature, kept as flavor on legacy backgrounds. */
    feature?: {
        name: string;
        description: string;
    };
    source?: string;
    legacy?: boolean;
}

export const backgrounds: Background[] = [
    {
        "id": "acolyte",
        "name": "Acolyte",
        "description": "You devoted yourself to service in a temple, performing sacred rites and learning the lore of your faith.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "magic-initiate",
        "originFeatNote": "Cleric",
        "skillProficiencies": [
            "Insight",
            "Religion"
        ],
        "toolProficiencies": [
            "Calligrapher's Supplies"
        ],
        "startingEquipment": [
            "Calligrapher's Supplies, Book (prayers), Holy Symbol, Parchment (10 sheets), Robe, 8 GP or 50 GP"
        ],
        "languages": 0,
        "source": "SRD 5.2",
        "feature": {
            "name": "Origin Feat: Magic Initiate (Cleric)",
            "description": "You gain the following benefits.\nTwo Cantrips. You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability for this feat's spells (choose when you select this feat).\nLevel 1 Spell. Choose a level 1 spell from the same list you selected for this feat's cantrips. You always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have.\nSpell Change. Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the chosen spell list."
        }
    },
    {
        "id": "artisan",
        "name": "Artisan",
        "description": "You began as an apprentice scrubbing floors in a workshop and learned to craft goods and to deal with demanding customers.",
        "abilityScores": [
            "str",
            "dex",
            "int"
        ],
        "originFeat": "crafter",
        "skillProficiencies": [
            "Investigation",
            "Persuasion"
        ],
        "toolProficiencies": [
            "Artisan's Tools (one of your choice)"
        ],
        "startingEquipment": [
            "Artisan's Tools, 2 Pouches, Traveler's Clothes, 32 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Crafter",
            "description": "You gain the following benefits.\n- Tool Proficiency. You gain proficiency with three different Artisan's Tools of your choice.\n- Discount. Whenever you buy a nonmagical item, you receive a 20 percent discount on it.\n- Fast Crafting. When you finish a Long Rest, you can craft one piece of gear (such as a ladder, torch, rope or pouch) using a set of Artisan's Tools you are proficient with. The item lasts until you finish another Long Rest."
        }
    },
    {
        "id": "charlatan",
        "name": "Charlatan",
        "description": "Once you were old enough to order ale, you had a favorite stool in every tavern and sharpened your talent for swindling.",
        "abilityScores": [
            "dex",
            "con",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Deception",
            "Sleight of Hand"
        ],
        "toolProficiencies": [
            "Forgery Kit"
        ],
        "startingEquipment": [
            "Forgery Kit, Costume, Fine Clothes, 15 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Skilled",
            "description": "You gain proficiency in any combination of three skills or tools of your choice."
        }
    },
    {
        "id": "criminal",
        "name": "Criminal",
        "description": "You eked out a living in dark alleyways, cutting purses and burgling shops as part of a small gang of lawbreakers.",
        "abilityScores": [
            "dex",
            "con",
            "int"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Sleight of Hand",
            "Stealth"
        ],
        "toolProficiencies": [
            "Thieves' Tools"
        ],
        "startingEquipment": [
            "2 Daggers, Thieves' Tools, Crowbar, 2 Pouches, Traveler's Clothes, 16 GP or 50 GP"
        ],
        "languages": 0,
        "source": "SRD 5.2",
        "feature": {
            "name": "Origin Feat: Alert",
            "description": "You gain the following benefits.\nInitiative Proficiency. When you roll Initiative, you can add your Proficiency Bonus to the roll.\nInitiative Swap. Immediately after you roll Initiative, you can swap your Initiative with the Initiative of one willing ally in the same combat. You can't make this swap if you or the ally has the Incapacitated condition."
        }
    },
    {
        "id": "entertainer",
        "name": "Entertainer",
        "description": "You spent much of your youth following traveling fairs and carnivals, learning to perform for a crowd.",
        "abilityScores": [
            "str",
            "dex",
            "cha"
        ],
        "originFeat": "musician",
        "skillProficiencies": [
            "Acrobatics",
            "Performance"
        ],
        "toolProficiencies": [
            "Musical Instrument (one of your choice)"
        ],
        "startingEquipment": [
            "Musical Instrument, 2 Costumes, Mirror, Perfume, Traveler's Clothes, 11 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Musician",
            "description": "You gain the following benefits.\n- Instrument Training. You gain proficiency with three Musical Instruments of your choice.\n- Encouraging Song. As you finish a Short or Long Rest, you can play a song on a Musical Instrument you are proficient with and give Heroic Inspiration to allies who hear the song. The number of allies you can affect equals your Proficiency Bonus."
        }
    },
    {
        "id": "farmer",
        "name": "Farmer",
        "description": "You grew up close to the land, tending animals and cultivating fields, which gave you patience and good health.",
        "abilityScores": [
            "str",
            "con",
            "wis"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Animal Handling",
            "Nature"
        ],
        "toolProficiencies": [
            "Carpenter's Tools"
        ],
        "startingEquipment": [
            "Sickle, Carpenter's Tools, Healer's Kit, Iron Pot, Shovel, Traveler's Clothes, 30 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Tough",
            "description": "Your Hit Point maximum increases by an amount equal to twice your character level when you gain this feat. Whenever you gain a character level thereafter, your Hit Point maximum increases by an additional 2 Hit Points."
        }
    },
    {
        "id": "guard",
        "name": "Guard",
        "description": "Your feet ache from countless hours at your post, keeping one eye on threats outside the walls and one on troublemakers within.",
        "abilityScores": [
            "str",
            "int",
            "wis"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Athletics",
            "Perception"
        ],
        "toolProficiencies": [
            "Gaming Set (one of your choice)"
        ],
        "startingEquipment": [
            "Spear, Light Crossbow, 20 Bolts, Gaming Set, Hooded Lantern, Manacles, Quiver, Traveler's Clothes, 12 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Alert",
            "description": "You gain the following benefits.\nInitiative Proficiency. When you roll Initiative, you can add your Proficiency Bonus to the roll.\nInitiative Swap. Immediately after you roll Initiative, you can swap your Initiative with the Initiative of one willing ally in the same combat. You can't make this swap if you or the ally has the Incapacitated condition."
        }
    },
    {
        "id": "guide",
        "name": "Guide",
        "description": "You came of age outdoors, far from settled lands, and learned to lead others through the wilds while calling on nature magic.",
        "abilityScores": [
            "dex",
            "con",
            "wis"
        ],
        "originFeat": "magic-initiate",
        "originFeatNote": "Druid",
        "skillProficiencies": [
            "Stealth",
            "Survival"
        ],
        "toolProficiencies": [
            "Cartographer's Tools"
        ],
        "startingEquipment": [
            "Shortbow, 20 Arrows, Cartographer's Tools, Bedroll, Quiver, Tent, Traveler's Clothes, 3 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Magic Initiate (Druid)",
            "description": "You gain the following benefits.\nTwo Cantrips. You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability for this feat's spells (choose when you select this feat).\nLevel 1 Spell. Choose a level 1 spell from the same list you selected for this feat's cantrips. You always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have.\nSpell Change. Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the chosen spell list."
        }
    },
    {
        "id": "hermit",
        "name": "Hermit",
        "description": "You spent your early years secluded in a hut or monastery far beyond the nearest settlement, pondering the mysteries of creation.",
        "abilityScores": [
            "con",
            "wis",
            "cha"
        ],
        "originFeat": "healer",
        "skillProficiencies": [
            "Medicine",
            "Religion"
        ],
        "toolProficiencies": [
            "Herbalism Kit"
        ],
        "startingEquipment": [
            "Quarterstaff, Herbalism Kit, Bedroll, Book (philosophy), Lamp, Oil (3 flasks), Traveler's Clothes, 16 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Healer",
            "description": "You gain the following benefits.\n- Battle Medic. If you have a Healer's Kit, you can expend one use of it and tend to a creature within 5 feet of yourself as a Utilize action. That creature can expend one of its Hit Point Dice, and you then roll that die. The creature regains Hit Points equal to the roll plus your Proficiency Bonus.\n- Healing Rerolls. Whenever you roll a die to determine the Hit Points you restore with a spell or with this feat's Battle Medic benefit, you can reroll the die if it rolls a 1, and you must use the new roll."
        }
    },
    {
        "id": "merchant",
        "name": "Merchant",
        "description": "You were apprenticed to a trader, caravan master or shopkeeper, learning the fundamentals of commerce and travel.",
        "abilityScores": [
            "con",
            "int",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Animal Handling",
            "Persuasion"
        ],
        "toolProficiencies": [
            "Navigator's Tools"
        ],
        "startingEquipment": [
            "Navigator's Tools, 2 Pouches, Traveler's Clothes, 22 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Lucky",
            "description": "You gain the following benefits.\n- Luck Points. You have a number of Luck Points equal to your Proficiency Bonus and regain all of them when you finish a Long Rest.\n- Advantage. When you roll a d20 for a D20 Test, you can spend 1 Luck Point to give yourself Advantage on the roll.\n- Disadvantage. When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to impose Disadvantage on that roll."
        }
    },
    {
        "id": "noble",
        "name": "Noble",
        "description": "You were raised in a castle among wealth, power and privilege, and learned leadership from the finest tutors.",
        "abilityScores": [
            "str",
            "int",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "History",
            "Persuasion"
        ],
        "toolProficiencies": [
            "Gaming Set (one of your choice)"
        ],
        "startingEquipment": [
            "Gaming Set, Fine Clothes, Perfume, 29 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Skilled",
            "description": "You gain proficiency in any combination of three skills or tools of your choice."
        }
    },
    {
        "id": "sage",
        "name": "Sage",
        "description": "You spent your formative years traveling between manors and monasteries, performing odd jobs in exchange for access to their libraries.",
        "abilityScores": [
            "con",
            "int",
            "wis"
        ],
        "originFeat": "magic-initiate",
        "originFeatNote": "Wizard",
        "skillProficiencies": [
            "Arcana",
            "History"
        ],
        "toolProficiencies": [
            "Calligrapher's Supplies"
        ],
        "startingEquipment": [
            "Quarterstaff, Calligrapher's Supplies, Book (history), Parchment (8 sheets), Robe, 8 GP or 50 GP"
        ],
        "languages": 0,
        "source": "SRD 5.2",
        "feature": {
            "name": "Origin Feat: Magic Initiate (Wizard)",
            "description": "You gain the following benefits.\nTwo Cantrips. You learn two cantrips of your choice from the Cleric, Druid, or Wizard spell list. Intelligence, Wisdom, or Charisma is your spellcasting ability for this feat's spells (choose when you select this feat).\nLevel 1 Spell. Choose a level 1 spell from the same list you selected for this feat's cantrips. You always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have.\nSpell Change. Whenever you gain a new level, you can replace one of the spells you chose for this feat with a different spell of the same level from the chosen spell list."
        }
    },
    {
        "id": "sailor",
        "name": "Sailor",
        "description": "You lived as a seafarer, wind at your back and decks swaying beneath your feet, and weathered many a storm and tavern brawl.",
        "abilityScores": [
            "str",
            "dex",
            "wis"
        ],
        "originFeat": "tavern-brawler",
        "skillProficiencies": [
            "Acrobatics",
            "Perception"
        ],
        "toolProficiencies": [
            "Navigator's Tools"
        ],
        "startingEquipment": [
            "Dagger, Navigator's Tools, Rope, Traveler's Clothes, 20 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Tavern Brawler",
            "description": "You gain the following benefits.\n- Enhanced Unarmed Strike. When you hit with your Unarmed Strike and deal damage, you can deal Bludgeoning damage equal to 1d4 plus your Strength modifier instead of the normal damage.\n- Damage Rerolls. Whenever you roll a damage die for your Unarmed Strike, you can reroll it if it rolls a 1, and you must use the new roll.\n- Improvised Weaponry. You have proficiency with improvised weapons.\n- Push. When you hit a creature with an Unarmed Strike as part of the Attack action on your turn, you can deal damage and also push the target 5 feet away from you. You can use this benefit only once per turn."
        }
    },
    {
        "id": "scribe",
        "name": "Scribe",
        "description": "You spent formative years in a scriptorium or government agency, learning to write clearly and to notice small details.",
        "abilityScores": [
            "dex",
            "int",
            "wis"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Investigation",
            "Perception"
        ],
        "toolProficiencies": [
            "Calligrapher's Supplies"
        ],
        "startingEquipment": [
            "Calligrapher's Supplies, Fine Clothes, Lamp, Oil (3 flasks), Parchment (12 sheets), 23 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Skilled",
            "description": "You gain proficiency in any combination of three skills or tools of your choice."
        }
    },
    {
        "id": "soldier",
        "name": "Soldier",
        "description": "You began training for war as soon as you reached adulthood and learned the techniques needed to survive on the battlefield.",
        "abilityScores": [
            "str",
            "dex",
            "con"
        ],
        "originFeat": "savage-attacker",
        "skillProficiencies": [
            "Athletics",
            "Intimidation"
        ],
        "toolProficiencies": [
            "Gaming Set (one of your choice)"
        ],
        "startingEquipment": [
            "Spear, Shortbow, 20 Arrows, Gaming Set, Healer's Kit, Quiver, Traveler's Clothes, 14 GP or 50 GP"
        ],
        "languages": 0,
        "source": "SRD 5.2",
        "feature": {
            "name": "Origin Feat: Savage Attacker",
            "description": "You've trained to deal particularly damaging strikes. Once per turn when you hit a target with a weapon, you can roll the weapon's damage dice twice and use either roll against the target."
        }
    },
    {
        "id": "wayfarer",
        "name": "Wayfarer",
        "description": "You grew up on the streets surrounded by similarly ill-fated castoffs, relying on luck and quick wits to survive.",
        "abilityScores": [
            "dex",
            "wis",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Insight",
            "Stealth"
        ],
        "toolProficiencies": [
            "Thieves' Tools"
        ],
        "startingEquipment": [
            "2 Daggers, Thieves' Tools, Gaming Set, Bedroll, 2 Pouches, Traveler's Clothes, 16 GP or 50 GP"
        ],
        "languages": 0,
        "source": "PHB 2024",
        "feature": {
            "name": "Origin Feat: Lucky",
            "description": "You gain the following benefits.\n- Luck Points. You have a number of Luck Points equal to your Proficiency Bonus and regain all of them when you finish a Long Rest.\n- Advantage. When you roll a d20 for a D20 Test, you can spend 1 Luck Point to give yourself Advantage on the roll.\n- Disadvantage. When a creature rolls a d20 for an attack roll against you, you can spend 1 Luck Point to impose Disadvantage on that roll."
        }
    },
    {
        "id": "folk-hero",
        "name": "Folk Hero",
        "description": "You come from a humble social rank, but you are destined for so much more.",
        "abilityScores": [
            "str",
            "con",
            "wis"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Animal Handling",
            "Survival"
        ],
        "toolProficiencies": [
            "One type of artisan's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Artisan's tools, Shovel, Iron pot, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Rustic Hospitality",
            "description": "Common folk will shelter and hide you from the law or anyone searching for you."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "anthropologist",
        "name": "Anthropologist",
        "description": "You have always been fascinated by other cultures, from the most ancient and fallen to the most modern and thriving.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Insight",
            "Religion"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Leather-bound diary, Small knife, Trinket from a lost culture, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Adept Linguist",
            "description": "You can communicate with humanoids who don't speak any common language. You must observe the humanoids interacting with one another for at least 1 day, after which you learn a handful of important words, expressions, and gestures—enough to communicate on a rudimentary level."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "archaeologist",
        "name": "Archaeologist",
        "description": "An archaeologist learns about the long-lost and fallen cultures of the past by studying their remains—their bones, their ruins, their surviving masterworks, and their tombs.",
        "abilityScores": [
            "str",
            "int",
            "wis"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "History",
            "Survival"
        ],
        "toolProficiencies": [
            "Cartographer's tools/navigator's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Wooden case containing a map to a ruin/dungeon, Bullseye lantern, Miner's pick, Scholar's pack, Antique weapon, Traveler's clothes, Belt pouch, 25 GP or 50 GP"
        ],
        "feature": {
            "name": "Historical Knowledge",
            "description": "When you enter a ruin or dungeon, you can correctly ascertain its original purpose and determine its builders, whether those were dwarves, elves, humans, yuan-ti, or some other known race. In addition, you can determine the monetary value of art objects more than a century old."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "athlete",
        "name": "Athlete",
        "description": "You have pursued a life of physical fitness, mental focus, and perhaps competitive glory.",
        "abilityScores": [
            "str",
            "dex",
            "con"
        ],
        "originFeat": "tavern-brawler",
        "skillProficiencies": [
            "Athletics",
            "Acrobatics"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Prize from an athletic competition, Sports outfit, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Echoes of Victory",
            "description": "You can find a place to perform, train, or compete in any settlement that has a fighting pit, gladiator arena, or similar venue. You and your companions can stay there for free, as long as you spend at least 4 hours each day engaged in public training, demonstrations, or matches."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "city-watch",
        "name": "City Watch",
        "description": "You have served the community where you grew up, standing as its first line of defense against crime.",
        "abilityScores": [
            "str",
            "int",
            "wis"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Athletics",
            "Insight"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Uniform, Horn, Manacles, Pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Watcher's Eye",
            "description": "Your experience in enforcing the law, and dealing with lawbreakers, gives you a feel for local laws and criminals. You can easily find the local outpost of the watch or a similar organization, and just as easily pick out the dens of criminal activity in a community, although you're more likely to be welcome in the former locations rather than the latter."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "clan-crafter",
        "name": "Clan Crafter",
        "description": "You are a member of a clan of skilled artisans, merchants, miners, or smiths with strong ties to a mountain clan or a settlement in or near mountains.",
        "abilityScores": [
            "str",
            "con",
            "int"
        ],
        "originFeat": "crafter",
        "skillProficiencies": [
            "History",
            "Insight"
        ],
        "toolProficiencies": [
            "Smith's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Smith's tools/mason's tools, Maker's mark chisel, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Respect of the Stout Folk",
            "description": "As well respected as you are among your clan, you can rely on certain benefits. Your clan will provide food and lodging for you and your companions, or help you find a safe place to stay. In addition, your clan's artisans will create nonmagical items for you, provided you can supply the materials and pay a fair price for the labor."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "cloistered-scholar",
        "name": "Cloistered Scholar",
        "description": "You have been sequestered away from the rest of the world in a place where the accumulated knowledge of the world is carefully collected, preserved, and catalogued.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "magic-initiate",
        "skillProficiencies": [
            "History",
            "Investigation"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Scholar's pack, Writing kit, Borrowed book on the subject of your current study, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Library Access",
            "description": "Though others must often endure extensive interviews and significant fees to gain access to even the most common archives in your library, you have free and easy access to the majority of the library's resources."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "originFeatNote": "Wizard"
    },
    {
        "id": "courtier",
        "name": "Courtier",
        "description": "In your earlier days, you were a person of some importance in a noble court or a bureaucratic organization.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Insight",
            "Persuasion"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Signet ring, Scroll of pedigree, Belt pouch, 5 GP or 50 GP"
        ],
        "feature": {
            "name": "Court Functionary",
            "description": "Your knowledge of how bureaucracies function lets you gain access to the records and inner workings of any noble court or government you encounter. You know who the movers and shakers are, whom to go to for the favors you seek, and what the current intrigues of the court are."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "faceless",
        "name": "Faceless",
        "description": "You are a member of a secretive organization that trades in information and secrets.",
        "abilityScores": [
            "dex",
            "int",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Deception",
            "Intimidation"
        ],
        "toolProficiencies": [
            "Disguise kit"
        ],
        "languages": 0,
        "startingEquipment": [
            "Disguise kit, Forgery kit, Common clothes, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Eyes Everywhere",
            "description": "Your organization has safe houses and informants in many cities. You know the secret signs and code words that allow you to identify safe houses and make contact with other members of your organization."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "faction-agent",
        "name": "Faction Agent",
        "description": "You are an active member of a faction that has given you benefits that help you pursue your goals.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Insight",
            "Investigation"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Badge/emblem, Copy of a seminal faction text, Common clothes, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Safe Haven",
            "description": "As a faction agent, you have access to a secret network of supporters and operatives who can provide assistance on your adventures. You know a set of secret signs and passwords you can use to identify such operatives, who will provide you with lodging, food, and supplies."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "far-traveler",
        "name": "Far Traveler",
        "description": "You are from a distant place, one so remote that few of the common folk in the current region know of it.",
        "abilityScores": [
            "dex",
            "wis",
            "cha"
        ],
        "originFeat": "musician",
        "skillProficiencies": [
            "Insight",
            "Perception"
        ],
        "toolProficiencies": [
            "One musical instrument/gaming set"
        ],
        "languages": 0,
        "startingEquipment": [
            "Musical instrument/gaming set, Poorly wrought maps from your homeland, Small piece of jewelry worth 10 gp, Traveler's clothes, Belt pouch, 5 GP or 50 GP"
        ],
        "feature": {
            "name": "All Eyes on You",
            "description": "Your accent, mannerisms, figures of speech, and perhaps even your appearance all mark you as foreign. Curious glances are directed your way wherever you go, which can be a nuisance, but you also gain the friendly interest of scholars and others intrigued by far-off lands, to say nothing of everyday folk who are eager to hear stories of your homeland."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "feylost",
        "name": "Feylost",
        "description": "You were lost in the Feywild as a child, but you found your way back to the Material Plane.",
        "abilityScores": [
            "dex",
            "wis",
            "cha"
        ],
        "originFeat": "magic-initiate",
        "skillProficiencies": [
            "Deception",
            "Survival"
        ],
        "toolProficiencies": [
            "One type of musical instrument"
        ],
        "languages": 0,
        "startingEquipment": [
            "Musical instrument, Trinket from the Feywild, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Feywild Connection",
            "description": "Your time in the Feywild has left you with a connection to that plane. You can find safe passage through the Feywild, and you know the secret ways and hidden paths of that realm."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)",
        "originFeatNote": "Druid"
    },
    {
        "id": "fisher",
        "name": "Fisher",
        "description": "You grew up on the water, learning to fish, sail, and navigate the treacherous waters of the world.",
        "abilityScores": [
            "str",
            "con",
            "wis"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "History",
            "Survival"
        ],
        "toolProficiencies": [
            "Navigator's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Fishing tackle, Net, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Fisher's Lore",
            "description": "You know how to find food and fresh water for yourself and up to five other people each day, provided that the bodies of water you have access to contain fish or other life."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "giant-foundling",
        "name": "Giant Foundling",
        "description": "You were raised by giants or found yourself in their care, and you learned their ways.",
        "abilityScores": [
            "str",
            "con",
            "wis"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Athletics",
            "Intimidation"
        ],
        "toolProficiencies": [
            "One type of artisan's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Artisan's tools, Giant-sized trinket, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Giant's Legacy",
            "description": "You have inherited a measure of the might of giants. You can speak, read, and write Giant. In addition, you can always find a place to perform physical labor or hear stories of giants, usually in a settlement that has a history of trade or conflict with giants."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "gladiator",
        "name": "Gladiator",
        "description": "You are a gladiator who fought in arenas for the entertainment of others.",
        "abilityScores": [
            "str",
            "dex",
            "cha"
        ],
        "originFeat": "savage-attacker",
        "skillProficiencies": [
            "Athletics",
            "Performance"
        ],
        "toolProficiencies": [
            "One type of gaming set"
        ],
        "languages": 0,
        "startingEquipment": [
            "Unusual weapon, Costume, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "By Popular Demand",
            "description": "You can always find a place to perform in any settlement that features an arena or fighting pit. You receive free lodging and food of a modest or comfortable standard (as long as you perform each night). In addition, your performance makes you something of a local figure. When strangers recognize you in a town where you have performed, they typically take a liking to you."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "guild-artisan",
        "name": "Guild Artisan",
        "description": "You are a member of an artisan's guild, skilled in a particular field and closely associated with other artisans.",
        "abilityScores": [
            "dex",
            "int",
            "cha"
        ],
        "originFeat": "crafter",
        "skillProficiencies": [
            "Insight",
            "Persuasion"
        ],
        "toolProficiencies": [
            "One type of artisan's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Artisan's tools, Letter of introduction from your guild, Traveler's clothes, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Guild Membership",
            "description": "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "guild-merchant",
        "name": "Guild Merchant",
        "description": "You are a member of a guild of traders, caravan masters, and shopkeepers.",
        "abilityScores": [
            "con",
            "wis",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Insight",
            "Persuasion"
        ],
        "toolProficiencies": [
            "Navigator's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Signet ring, Letter of introduction from your guild, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Guild Membership",
            "description": "As an established and respected member of a guild, you can rely on certain benefits that membership provides. Your fellow guild members will provide you with lodging and food if necessary, and pay for your funeral if needed. In some cities and towns, a guildhall offers a central place to meet other members of your profession, which can be a good place to meet potential patrons, allies, or hirelings."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "haunted-one",
        "name": "Haunted One",
        "description": "You are haunted by something so terrible that you dare not speak of it.",
        "abilityScores": [
            "con",
            "int",
            "wis"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Investigation",
            "Religion"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Monster hunter's pack, Trophy from a slain monster, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Heart of Darkness",
            "description": "Those who look into your eyes can see that you have faced unimaginable horror and that you are no stranger to darkness. Though they might fear you, commoners will extend you every courtesy and do their utmost to help you. Unless you have shown yourself to be a danger to them, they will even take up arms to fight alongside you should you find yourself facing an enemy alone."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "house-agent",
        "name": "House Agent",
        "description": "You are a member of a powerful merchant house or trading company.",
        "abilityScores": [
            "dex",
            "int",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "Investigation",
            "Persuasion"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Signet ring, Letter of introduction, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "House Connections",
            "description": "Your house has connections in many cities. You can find safe houses, trading posts, and other facilities run by your house in any settlement of significant size."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "inheritor",
        "name": "Inheritor",
        "description": "You are the heir to something of great value—not mere coin or wealth, but an object that has been entrusted to you and you alone.",
        "abilityScores": [
            "con",
            "wis",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Survival",
            "Investigation"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Your inheritance, Traveler's clothes, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Inheritance",
            "description": "You have inherited something from a relative or mentor. This inheritance might be a physical object, a piece of knowledge, or even a responsibility. Work with your DM to determine the nature of your inheritance and how it might affect your adventures."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "investigator-scag",
        "name": "Investigator (SCAG)",
        "description": "You are a private investigator, solving mysteries and uncovering secrets for clients.",
        "abilityScores": [
            "dex",
            "int",
            "wis"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Investigation",
            "Insight"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Magnifying glass, Notebook, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Eye for Detail",
            "description": "You have an eye for detail and can pick out clues that others might miss. You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to inspect, search, or study objects and locations."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "investigator-vrgr",
        "name": "Investigator (VRGR)",
        "description": "You are a private investigator, solving mysteries and uncovering secrets for clients.",
        "abilityScores": [
            "dex",
            "int",
            "wis"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Investigation",
            "Insight"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Magnifying glass, Notebook, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Eye for Detail",
            "description": "You have an eye for detail and can pick out clues that others might miss. You have advantage on Wisdom (Perception) and Intelligence (Investigation) checks made to inspect, search, or study objects and locations."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "knight",
        "name": "Knight",
        "description": "You understand wealth, power, and privilege. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.",
        "abilityScores": [
            "str",
            "int",
            "cha"
        ],
        "originFeat": "skilled",
        "skillProficiencies": [
            "History",
            "Persuasion"
        ],
        "toolProficiencies": [
            "One type of gaming set"
        ],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Signet ring, Scroll of pedigree, Purse, 25 GP or 50 GP"
        ],
        "feature": {
            "name": "Retainers",
            "description": "You have the service of three retainers loyal to your family. These retainers can be attendants or messengers, and one might be a majordomo. Your retainers are commoners who can perform mundane tasks for you, but they do not fight for you, will not follow you into obviously dangerous areas (such as dungeons), and will leave if they are frequently endangered or abused."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "knight-of-the-order",
        "name": "Knight of the Order",
        "description": "You belong to an order of knights who have sworn oaths to achieve a certain goal.",
        "abilityScores": [
            "str",
            "wis",
            "cha"
        ],
        "originFeat": "savage-attacker",
        "skillProficiencies": [
            "Persuasion",
            "History"
        ],
        "toolProficiencies": [
            "One type of gaming set"
        ],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Signet ring, Scroll of pedigree, Purse, 25 GP or 50 GP"
        ],
        "feature": {
            "name": "Knightly Regard",
            "description": "You receive shelter and succor from members of your knightly order and those who are sympathetic to its aims. If your order is a religious one, you can gain aid from temples and other religious communities of your deity. If you are pursuing a mission for your order, you can usually obtain horses, equipment, and funds for yourself and your companions."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "marine",
        "name": "Marine",
        "description": "You are a member of a military force trained to fight on ships and in coastal regions.",
        "abilityScores": [
            "str",
            "dex",
            "con"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Athletics",
            "Survival"
        ],
        "toolProficiencies": [
            "Navigator's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Uniform, Insignia of rank, Dagger, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Ship's Passage",
            "description": "When you need to, you can secure free passage on a sailing ship for yourself and your companions. You might sail on the ship you served on, or another ship you have good relations with, and you are able to secure passage in exchange for your service."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "mercenary-veteran",
        "name": "Mercenary Veteran",
        "description": "You have spent years fighting as a soldier for hire, and you have made a name for yourself in the process.",
        "abilityScores": [
            "str",
            "dex",
            "cha"
        ],
        "originFeat": "savage-attacker",
        "skillProficiencies": [
            "Athletics",
            "Persuasion"
        ],
        "toolProficiencies": [
            "One type of gaming set"
        ],
        "languages": 0,
        "startingEquipment": [
            "Uniform, Insignia of rank, Trophy from a fallen enemy, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Mercenary Life",
            "description": "You know the mercenary life as only someone who has experienced it can. You are able to identify mercenary companies and their symbols, and you know mercenaries' tactics and organization. You can find the taverns and other places where mercenaries abide in any settlement, and you have contacts that can help you connect with other mercenaries."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "outlander",
        "name": "Outlander",
        "description": "You grew up in the wilds, far from civilization and the comforts of town and technology.",
        "abilityScores": [
            "str",
            "con",
            "wis"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Athletics",
            "Survival"
        ],
        "toolProficiencies": [
            "One type of musical instrument"
        ],
        "languages": 0,
        "startingEquipment": [
            "Staff, Hunting trap, Trophy from an animal you killed, Traveler's clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Wanderer",
            "description": "You have an excellent memory for maps and geography, and you can always recall the general layout of terrain, settlements, and other features around you. In addition, you can find food and fresh water for yourself and up to five other people each day, provided that the land offers berries, small game, water, and so forth."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "pirate",
        "name": "Pirate",
        "description": "You spent your youth under the sway of a dread pirate, a ruthless cutthroat who taught you how to survive in a world of sharks and savages.",
        "abilityScores": [
            "str",
            "dex",
            "wis"
        ],
        "originFeat": "tavern-brawler",
        "skillProficiencies": [
            "Athletics",
            "Perception"
        ],
        "toolProficiencies": [
            "Navigator's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Belaying pin (club), 50 feet of silk rope, Lucky charm, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Bad Reputation",
            "description": "No matter where you go, people are afraid of you due to your reputation. When you are in a civilized settlement, you can get away with minor criminal offenses, such as refusing to pay for food at a tavern or breaking down doors at a local shop, since most people will not report your activity to the authorities."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "rewarded",
        "name": "Rewarded",
        "description": "You have been rewarded for a great service you performed, and this reward has shaped your life.",
        "abilityScores": [
            "int",
            "wis",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Investigation",
            "Persuasion"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Fine clothes, Reward token/certificate, Belt pouch, 25 GP or 50 GP"
        ],
        "feature": {
            "name": "Reward",
            "description": "You have been granted a reward for your service. This might be a title, land, wealth, or some other benefit. Work with your DM to determine the nature of your reward and how it might affect your adventures."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "ruined",
        "name": "Ruined",
        "description": "You were once wealthy and powerful, but you have lost everything.",
        "abilityScores": [
            "con",
            "wis",
            "cha"
        ],
        "originFeat": "tough",
        "skillProficiencies": [
            "Deception",
            "Survival"
        ],
        "toolProficiencies": [],
        "languages": 0,
        "startingEquipment": [
            "Rags, Memento of your former life, Belt pouch, 1 GP or 50 GP"
        ],
        "feature": {
            "name": "Ruined",
            "description": "You have lost everything—your wealth, your status, your home. But you have gained something as well: the knowledge of what it means to have nothing, and the determination to never be in that position again."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "rune-carver",
        "name": "Rune Carver",
        "description": "You have learned the ancient art of rune carving, a skill passed down through generations.",
        "abilityScores": [
            "str",
            "int",
            "wis"
        ],
        "originFeat": "crafter",
        "skillProficiencies": [
            "Arcana",
            "History"
        ],
        "toolProficiencies": [
            "Calligrapher's supplies"
        ],
        "languages": 0,
        "startingEquipment": [
            "Calligrapher's supplies, Set of runes, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Rune Lore",
            "description": "You can read and understand runic inscriptions. In addition, you know the history and meaning of many runes, and you can identify magical runes and their effects."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "shipwright",
        "name": "Shipwright",
        "description": "You are a skilled shipwright, capable of building and repairing ships.",
        "abilityScores": [
            "str",
            "con",
            "int"
        ],
        "originFeat": "crafter",
        "skillProficiencies": [
            "History",
            "Investigation"
        ],
        "toolProficiencies": [
            "Carpenter's tools"
        ],
        "languages": 0,
        "startingEquipment": [
            "Carpenter's tools, Ship's log, Common clothes, Belt pouch, 10 GP or 50 GP"
        ],
        "feature": {
            "name": "Shipwright's Knowledge",
            "description": "You know how to build, repair, and maintain ships. You can identify the type and quality of a ship, and you know how to make repairs to keep a ship seaworthy."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "smuggler",
        "name": "Smuggler",
        "description": "You are a smuggler, skilled at moving contraband past watchful eyes.",
        "abilityScores": [
            "dex",
            "con",
            "cha"
        ],
        "originFeat": "lucky",
        "skillProficiencies": [
            "Deception",
            "Stealth"
        ],
        "toolProficiencies": [
            "Forgery kit"
        ],
        "languages": 0,
        "startingEquipment": [
            "Crowbar, Dark common clothes with hood, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Criminal Contact",
            "description": "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    },
    {
        "id": "spy",
        "name": "Spy",
        "description": "You are a spy, skilled at gathering information and operating in the shadows.",
        "abilityScores": [
            "dex",
            "int",
            "cha"
        ],
        "originFeat": "alert",
        "skillProficiencies": [
            "Deception",
            "Stealth"
        ],
        "toolProficiencies": [
            "Disguise kit"
        ],
        "languages": 0,
        "startingEquipment": [
            "Crowbar, Dark common clothes with hood, Belt pouch, 15 GP or 50 GP"
        ],
        "feature": {
            "name": "Criminal Contact",
            "description": "You have a reliable and trustworthy contact who acts as your liaison to a network of other criminals. You know how to get messages to and from your contact, even over great distances; specifically, you know the local messengers, corrupt caravan masters, and seedy sailors who can deliver messages for you."
        },
        "legacy": true,
        "source": "Legacy (pre-2024)"
    }
];
