// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface Trait {
    name: string;
    description: string;
}

export const traits: { [key: string]: Trait } = {
    "Darkvision": {
        "name": "Darkvision",
        "description": "You have Darkvision with a range of 60 feet."
    },
    "Superior Darkvision": {
        "name": "Superior Darkvision",
        "description": "You have Darkvision with a range of 120 feet."
    },
    "Keen Senses": {
        "name": "Keen Senses",
        "description": "You have proficiency in the Insight, Perception, or Survival skill. (choose one when you create your character)"
    },
    "Elven Lineage": {
        "name": "Elven Lineage",
        "description": "You are part of a lineage that grants you supernatural abilities. Choose a lineage from the Elven Lineages table. You gain the level 1 benefit of that lineage.\nWhen you reach character levels 3 and 5, you learn a higher-level spell, as shown on the table.\nYou always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have of the appropriate level.\nElven Lineages\nDrow\nLevel 1. The range of your Darkvision increases to 120 feet. You also know the Dancing Lights cantrip.\nLevel 3. Faerie Fire\nLevel 5. Darkness\nHigh Elf\nLevel 1. You know the Prestidigitation cantrip. Whenever you finish a Long Rest, you can replace that cantrip with a different cantrip from the Wizard spell list.\nLevel 3. Detect Magic\nLevel 5. Misty Step\nWood Elf\nLevel 1. Your Speed increases to 35 feet. You also know the Druidcraft cantrip.\nLevel 3. Longstrider\nLevel 5. Pass without Trace\nIntelligence, Wisdom, or Charisma is your spellcasting ability for the spells you cast with this trait (choose the ability when you select the lineage)."
    },
    "Elven Lineage (Drow)": {
        "name": "Elven Lineage (Drow)",
        "description": "Drow are shaped by the Underdark. The range of your Darkvision increases to 120 feet. You know the Dancing Lights cantrip. At 3rd level you learn Faerie Fire; at 5th level you learn Darkness. Intelligence, Wisdom, or Charisma is your spellcasting ability (choose when you select this lineage)."
    },
    "Elven Lineage (High Elf)": {
        "name": "Elven Lineage (High Elf)",
        "description": "High elves have been infused with magic from crossings between the Feywild and the Material Plane. You know the Prestidigitation cantrip. Whenever you finish a Long Rest, you can replace that cantrip with a different cantrip from the Wizard spell list. At 3rd level you learn Detect Magic; at 5th level you learn Misty Step."
    },
    "Elven Lineage (Wood Elf)": {
        "name": "Elven Lineage (Wood Elf)",
        "description": "Wood elves carry the magic of primeval forests. Your Speed increases to 35 feet. You know the Druidcraft cantrip. At 3rd level you learn Longstrider; at 5th level you learn Pass without Trace."
    },
    "Dancing Lights": {
        "name": "Dancing Lights",
        "description": "You know the Dancing Lights cantrip. You can cast it at will, without expending a spell slot."
    },
    "Cantrip (Prestidigitation)": {
        "name": "Cantrip (Prestidigitation)",
        "description": "You know the Prestidigitation cantrip. Whenever you finish a Long Rest, you can replace it with a different cantrip from the Wizard spell list."
    },
    "Fleet of Foot": {
        "name": "Fleet of Foot",
        "description": "Your base walking speed increases to 35 feet."
    },
    "Druidcraft": {
        "name": "Druidcraft",
        "description": "You know the Druidcraft cantrip. You can cast it at will, without expending a spell slot."
    },
    "Fey Ancestry": {
        "name": "Fey Ancestry",
        "description": "You have Advantage on saving throws you make to avoid or end the Charmed condition."
    },
    "Trance": {
        "name": "Trance",
        "description": "You don't need to sleep, and magic can't put you to sleep. You can finish a Long Rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness."
    },
    "Versatile": {
        "name": "Versatile",
        "description": "You gain an Origin feat of your choice (see \"Feats\"). Skilled is recommended."
    },
    "Resourceful": {
        "name": "Resourceful",
        "description": "You gain Heroic Inspiration whenever you finish a Long Rest."
    },
    "Skillful": {
        "name": "Skillful",
        "description": "You gain proficiency in one skill of your choice."
    },
    "Lucky": {
        "name": "Lucky",
        "description": "When you roll a 1 on the d20 for an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll."
    },
    "Luck": {
        "name": "Luck",
        "description": "When you roll a 1 on the d20 of a D20 Test, you can reroll the die, and you must use the new roll."
    },
    "Naturally Stealthy": {
        "name": "Naturally Stealthy",
        "description": "You can take the Hide action even when you are obscured only by a creature that is at least one size larger than you."
    },
    "Brave": {
        "name": "Brave",
        "description": "You have Advantage on saving throws you make to avoid or end the Frightened condition."
    },
    "Halfling Nimbleness": {
        "name": "Halfling Nimbleness",
        "description": "You can move through the space of any creature that is a size larger than you, but you can't stop in the same space."
    },
    "Dwarven Resilience": {
        "name": "Dwarven Resilience",
        "description": "You have Resistance to Poison damage. You also have Advantage on saving throws you make to avoid or end the Poisoned condition."
    },
    "Dwarven Combat Training": {
        "name": "Dwarven Combat Training",
        "description": "You have proficiency with the battleaxe, handaxe, light hammer, and warhammer."
    },
    "Dwarven Toughness": {
        "name": "Dwarven Toughness",
        "description": "Your Hit Point maximum increases by 1, and it increases by 1 again whenever you gain a level."
    },
    "Stonecunning": {
        "name": "Stonecunning",
        "description": "As a Bonus Action, you gain Tremorsense with a range of 60 feet for 10 minutes. You must be on a stone surface or touching a stone surface to use this Tremorsense. The stone can be natural or worked.\nYou can use this Bonus Action a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Draconic Ancestry": {
        "name": "Draconic Ancestry",
        "description": "Your lineage stems from a dragon progenitor. Choose the kind of dragon from the Draconic Ancestors table. Your choice affects your Breath Weapon and Damage Resistance traits as well as your appearance.\nDraconic Ancestors\nDragon / Damage Type\nBlack / Acid\nBlue / Lightning\nBrass / Fire\nBronze / Lightning\nCopper / Acid\nGreen / Poison\nGold / Fire\nRed / Fire\nSilver / Cold\nWhite / Cold"
    },
    "Draconic Flight": {
        "name": "Draconic Flight",
        "description": "When you reach character level 5, you can channel draconic magic to give yourself temporary flight. As a Bonus Action, you sprout spectral wings on your back that last for 10 minutes or until you retract the wings (no action required) or have the Incapacitated condition. During that time, you have a Fly Speed equal to your Speed. Your wings appear to be made of the same energy as your Breath Weapon. Once you use this trait, you can't use it again until you finish a Long Rest."
    },
    "Breath Weapon": {
        "name": "Breath Weapon",
        "description": "When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of magical energy in either a 15-foot Cone or a 30-foot Line that is 5 feet wide (choose the shape each time). Each creature in that area must make a Dexterity saving throw (DC 8 plus your Constitution modifier and Proficiency Bonus). On a failed save, a creature takes 1d10 damage of the type determined by your Draconic Ancestry. On a successful save, a creature takes half as much damage. This damage increases by 1d10 when you reach character levels 5 (2d10), 11 (3d10), and 17 (4d10).\nYou can use this Breath Weapon a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Damage Resistance": {
        "name": "Damage Resistance",
        "description": "You have Resistance to the damage type determined by your Draconic Ancestry trait."
    },
    "Gnome Cunning": {
        "name": "Gnome Cunning",
        "description": "You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic."
    },
    "Gnomish Cunning": {
        "name": "Gnomish Cunning",
        "description": "You have Advantage on Intelligence, Wisdom, and Charisma saving throws."
    },
    "Gnomish Lineage": {
        "name": "Gnomish Lineage",
        "description": "You are part of a lineage that grants you supernatural abilities. Choose one of the following options; whichever one you choose, Intelligence, Wisdom, or Charisma is your spellcasting ability for the spells you cast with this trait (choose the ability when you select the lineage):\nForest Gnome. You know the Minor Illusion cantrip. You also always have the Speak with Animals spell prepared. You can cast it without a spell slot a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest. You can also use any spell slots you have to cast the spell.\nRock Gnome. You know the Mending and Prestidigitation cantrips. In addition, you can spend 10 minutes casting Prestidigitation to create a Tiny clockwork device (AC 5, 1 HP), such as a toy, fire starter, or music box. When you create the device, you determine its function by choosing one effect from Prestidigitation; the device produces that effect whenever you or another creature takes a Bonus Action to activate it with a touch. If the chosen effect has options within it, you choose one of those options for the device when you create it.\nFor example, if you choose the spell's ignite-extinguish effect, you determine whether the device ignites or extinguishes fire; the device doesn't do both. You can have three such devices in existence at a time, and each falls apart 8 hours after its creation or when you dismantle it with a touch as a Utilize action."
    },
    "Skill Versatility": {
        "name": "Skill Versatility",
        "description": "You gain proficiency in two skills of your choice."
    },
    "Menacing": {
        "name": "Menacing",
        "description": "You gain proficiency in the Intimidation skill."
    },
    "Relentless Endurance": {
        "name": "Relentless Endurance",
        "description": "When you are reduced to 0 Hit Points but not killed outright, you can drop to 1 Hit Point instead. Once you use this trait, you can't do so again until you finish a Long Rest."
    },
    "Savage Attacks": {
        "name": "Savage Attacks",
        "description": "When you score a critical hit with a melee weapon attack, you can roll one of the weapon's damage dice one additional time and add it to the extra damage of the critical hit."
    },
    "Hellish Resistance": {
        "name": "Hellish Resistance",
        "description": "You have resistance to fire damage."
    },
    "Infernal Legacy": {
        "name": "Infernal Legacy",
        "description": "You know the thaumaturgy cantrip. When you reach 3rd level, you can cast the hellish rebuke spell as a 2nd-level spell once with this trait and regain the ability to do so when you finish a long rest. When you reach 5th level, you can cast the darkness spell once with this trait and regain the ability to do so when you finish a long rest. Charisma is your spellcasting ability for these spells."
    },
    "Fiendish Legacy": {
        "name": "Fiendish Legacy",
        "description": "You are the recipient of a legacy that grants you supernatural abilities. Choose a legacy from the Fiendish Legacies table. You gain the level 1 benefit of the chosen legacy.\nWhen you reach character levels 3 and 5, you learn a higher-level spell, as shown on the table.\nYou always have that spell prepared. You can cast it once without a spell slot, and you regain the ability to cast it in that way when you finish a Long Rest. You can also cast the spell using any spell slots you have of the appropriate level.\nIntelligence, Wisdom, or Charisma is your spell-casting ability for the spells you cast with this trait (choose the ability when you select the legacy).\nFiendish Legacies\nAbyssal.\nLevel 1. You have Resistance to Poison damage. You also know the Poison Spray cantrip.\nLevel 3. Ray of Sickness\nLevel 5. Hold Person\nChthonic.\nLevel 1. You have Resistance to Necrotic damage. You also know the Chill Touch cantrip.\nLevel 3. False Life\nLevel 5. Ray of Enfeeblement\nInfernal.\nLevel 1. You have Resistance to Fire damage. You also know the Fire Bolt cantrip.\nLevel 3. Hellish Rebuke\nLevel 5. Darkness"
    },
    "Otherworldly Presence": {
        "name": "Otherworldly Presence",
        "description": "You know the Thaumaturgy cantrip. When you cast it with this trait, the spell uses the same spellcasting ability you use for your Fiendish Legacy trait."
    },
    "Flight": {
        "name": "Flight",
        "description": "You have a Fly Speed equal to your walking speed. (Aarakocra and owlin can't use it while wearing Medium or Heavy armor.)"
    },
    "Flight (50 ft.)": {
        "name": "Flight (50 ft.)",
        "description": "You have a flying speed of 50 feet."
    },
    "Talons": {
        "name": "Talons",
        "description": "You have talons that you can use to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Slashing damage instead of the normal Bludgeoning damage."
    },
    "Rabbit Hop": {
        "name": "Rabbit Hop",
        "description": "As a Bonus Action, you can jump a number of feet equal to five times your Proficiency Bonus without provoking Opportunity Attacks. You can use this trait only if your Speed is greater than 0. You can use it a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Lucky Footwork": {
        "name": "Lucky Footwork",
        "description": "When you fail a Dexterity saving throw, you can use your Reaction to roll a d4 and add it to the save, potentially turning the failure into a success. You can't use this Reaction if you're Prone or your Speed is 0."
    },
    "Hare-Trigger": {
        "name": "Hare-Trigger",
        "description": "You can add your Proficiency Bonus to your Initiative rolls."
    },
    "Feline Agility": {
        "name": "Feline Agility",
        "description": "When you move on your turn in combat, you can double your speed until the end of the turn. Once you use this trait, you can't use it again until you move 0 feet on one of your turns."
    },
    "Silent Feathers": {
        "name": "Silent Feathers",
        "description": "You have proficiency in the Stealth skill."
    },
    "Mirthful Leaps": {
        "name": "Mirthful Leaps",
        "description": "Whenever you make a long or high jump, you can roll a d8 and add the number rolled to the number of feet you cover, even when making a standing jump. This extra distance costs movement as normal."
    },
    "Fairy Magic": {
        "name": "Fairy Magic",
        "description": "You know the Druidcraft cantrip. Starting at 3rd level, you can cast Faerie Fire with this trait. Starting at 5th level, you can also cast Enlarge/Reduce with it. Once you cast Faerie Fire or Enlarge/Reduce with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for them (choose when you select this species)."
    },
    "Firbolg Magic": {
        "name": "Firbolg Magic",
        "description": "You can cast Detect Magic and Disguise Self with this trait. When you use this version of Disguise Self, you can seem up to 3 feet shorter or taller. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast these spells using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for them (choose when you select this species)."
    },
    "Githyanki Psionics": {
        "name": "Githyanki Psionics",
        "description": "You know the Mage Hand cantrip, and the hand is invisible when you cast it with this trait. Starting at 3rd level, you can cast Jump with this trait. Starting at 5th level, you can also cast Misty Step with it. Once you cast Jump or Misty Step with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species). None of these spells require components when you cast them with this trait."
    },
    "Githzerai Psionics": {
        "name": "Githzerai Psionics",
        "description": "You know the Mage Hand cantrip, and the hand is invisible when you cast it with this trait. Starting at 3rd level, you can cast Shield with this trait. Starting at 5th level, you can also cast Detect Thoughts with it. Once you cast Shield or Detect Thoughts with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species). None of these spells require components when you cast them with this trait."
    },
    "Duergar Magic": {
        "name": "Duergar Magic",
        "description": "Starting at 3rd level, you can cast Enlarge/Reduce on yourself with this trait, without a material component. Starting at 5th level, you can also cast Invisibility on yourself with it, without a material component. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast these spells using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for them (choose when you select this species)."
    },
    "Fey Step": {
        "name": "Fey Step",
        "description": "As a Bonus Action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest. Starting at 3rd level, your Fey Step gains an additional effect based on your season (Autumn, Winter, Spring, or Summer); if it requires a saving throw, the DC equals 8 + your Proficiency Bonus + your Intelligence, Wisdom, or Charisma modifier."
    },
    "Serpentine Spellcasting": {
        "name": "Serpentine Spellcasting",
        "description": "You know the Poison Spray cantrip. You can cast Animal Friendship an unlimited number of times with this trait, but you can target only snakes with it. Starting at 3rd level, you can also cast Suggestion with this trait. Once you cast it, you can't do so again until you finish a Long Rest. You can also cast it using any spell slots you have of 2nd level or higher. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Celestial Resistance": {
        "name": "Celestial Resistance",
        "description": "You have Resistance to Necrotic damage and Radiant damage."
    },
    "Poison Immunity": {
        "name": "Poison Immunity",
        "description": "You are immune to poison damage and the poisoned condition."
    },
    "Magic Resistance": {
        "name": "Magic Resistance",
        "description": "You have Advantage on saving throws against spells."
    },
    "Necrotic Resistance": {
        "name": "Necrotic Resistance",
        "description": "You have Resistance to Necrotic damage."
    },
    "Fire Resistance": {
        "name": "Fire Resistance",
        "description": "You have Resistance to Fire damage."
    },
    "Sunlight Sensitivity": {
        "name": "Sunlight Sensitivity",
        "description": "You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight."
    },
    "Powerful Build": {
        "name": "Powerful Build",
        "description": "You have Advantage on any ability check you make to end the Grappled condition. You also count as one size larger when determining your carrying capacity."
    },
    "Natural Armor": {
        "name": "Natural Armor",
        "description": "You have tough, scaly skin. When you aren't wearing armor, your base AC is 13 + your Dexterity modifier. You can use your natural armor to determine your AC if the armor you wear would leave you with a lower AC. A shield's benefits apply as normal while you use your natural armor."
    },
    "Claws": {
        "name": "Claws",
        "description": "You have claws that you can use to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Slashing damage instead of the normal damage."
    },
    "Horns": {
        "name": "Horns",
        "description": "You have horns that you can use to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Piercing damage instead of the normal damage."
    },
    "Bite": {
        "name": "Bite",
        "description": "You have a fanged maw that you can use to make unarmed strikes. When you hit with it, the strike deals 1d6 + your Strength modifier Piercing damage instead of the normal damage."
    },
    "Cat's Claws": {
        "name": "Cat's Claws",
        "description": "You can use your claws to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Slashing damage instead of the normal damage. You also have a Climb Speed equal to your walking speed."
    },
    "Hooves": {
        "name": "Hooves",
        "description": "You have hooves that you can use to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Bludgeoning damage instead of the normal damage."
    },
    "Ram": {
        "name": "Ram",
        "description": "You can use your head and horns to make unarmed strikes. When you hit with them, the strike deals 1d6 + your Strength modifier Bludgeoning damage instead of the normal damage."
    },
    "Healing Hands": {
        "name": "Healing Hands",
        "description": "As a Magic action, you touch a creature and roll a number of d4s equal to your Proficiency Bonus. The creature regains a number of Hit Points equal to the total rolled. Once you use this trait, you can't use it again until you finish a Long Rest."
    },
    "Light Bearer": {
        "name": "Light Bearer",
        "description": "You know the Light cantrip. Charisma is your spellcasting ability for it."
    },
    "Celestial Revelation": {
        "name": "Celestial Revelation",
        "description": "When you reach character level 3, you can transform as a Bonus Action using one of the options below (choose each time). The transformation lasts 1 minute or until you end it (no action required). Once you transform, you can't do so again until you finish a Long Rest. Once on each of your turns during the transformation, you can deal extra damage equal to your Proficiency Bonus to one target when you deal damage to it with an attack or a spell; the extra damage is Necrotic for Necrotic Shroud and Radiant for the others.\n- Heavenly Wings. Two spectral wings sprout from your back, giving you a Fly Speed equal to your Speed.\n- Inner Radiance. You shed Bright Light in a 10-foot radius and Dim Light for an additional 10 feet, and at the end of each of your turns each creature within 10 feet of you takes Radiant damage equal to your Proficiency Bonus.\n- Necrotic Shroud. Your eyes turn to pools of darkness. Creatures other than your allies within 10 feet of you must succeed on a Charisma saving throw (DC 8 plus your Charisma modifier and Proficiency Bonus) or have the Frightened condition until the end of your next turn."
    },
    "Adrenaline Rush": {
        "name": "Adrenaline Rush",
        "description": "You can take the Dash action as a Bonus Action. When you do so, you gain a number of Temporary Hit Points equal to your Proficiency Bonus.\nYou can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Short or Long Rest."
    },
    "Giant Ancestry": {
        "name": "Giant Ancestry",
        "description": "You are descended from Giants. Choose one of the following benefits-a supernatural boon from your ancestry; you can use the chosen benefit a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest:\nCloud's Jaunt (Cloud Giant). As a Bonus Action, you magically teleport up to 30 feet to an unoccupied space you can see.\nFire's Burn (Fire Giant). When you hit a target with an attack roll and deal damage to it, you can also deal 1d10 Fire damage to that target.\nFrost's Chill (Frost Giant). When you hit a target with an attack roll and deal damage to it, you can also deal 1d6 Cold damage to that target and reduce its Speed by 10 feet until the start of your next turn.\nHill's Tumble (Hill Giant). When you hit a Large or smaller creature with an attack roll and deal damage to it, you can give that target the Prone condition.\nStone's Endurance (Stone Giant). When you take damage, you can take a Reaction to roll 1d12. Add your Constitution modifier to the number rolled and reduce the damage by that total.\n- Storm's Thunder (Storm Giant). When you take damage from a creature within 60 feet of you, you can take a Reaction to deal 1d8 Thunder damage to that creature."
    },
    "Large Form": {
        "name": "Large Form",
        "description": "Starting at character level 5, you can change your size to Large as a Bonus Action if you're in a big enough space. This transformation lasts for 10 minutes or until you end it (no action required). For that duration, you have Advantage on Strength checks, and your Speed increases by 10 feet. Once you use this trait, you can't use it again until you finish a Long Rest."
    },
    "Shapechanger": {
        "name": "Shapechanger",
        "description": "As an action, you can change your appearance and your voice, including coloration, hair, height and apparent sex, and whether you appear Medium or Small. You can appear as a member of another species, though none of your game statistics change. You stay in the new form until you use an action to revert or you die."
    },
    "Divergent Persona": {
        "name": "Divergent Persona",
        "description": "You gain proficiency with one of the following skills of your choice: Deception, Insight, Intimidation, or Persuasion."
    },
    "Stone Camouflage": {
        "name": "Stone Camouflage",
        "description": "You have advantage on Dexterity (Stealth) checks made to hide in rocky terrain."
    },
    "Unending Breath": {
        "name": "Unending Breath",
        "description": "You can hold your breath indefinitely while you're not Incapacitated."
    },
    "Mingle with the Wind": {
        "name": "Mingle with the Wind",
        "description": "You know the Shocking Grasp cantrip. Starting at 3rd level, you can cast Feather Fall with this trait, without a material component. Starting at 5th level, you can also cast Levitate with this trait, without a material component. Once you cast Feather Fall or Levitate with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Earth Walk": {
        "name": "Earth Walk",
        "description": "You can move across Difficult Terrain without expending extra movement if you are using your walking speed on the ground or a floor."
    },
    "Merge with Stone": {
        "name": "Merge with Stone",
        "description": "You know the Blade Ward cantrip. You can cast it as a Bonus Action a number of times equal to your Proficiency Bonus, regaining all expended uses when you finish a Long Rest. Starting at 5th level, you can cast Pass without Trace with this trait, without a material component, once per Long Rest; you can also cast it using spell slots of 2nd level or higher. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Reach to the Blaze": {
        "name": "Reach to the Blaze",
        "description": "You know the Produce Flame cantrip. Starting at 3rd level, you can cast Burning Hands with this trait. Starting at 5th level, you can also cast Flame Blade with this trait, without a material component. Once you cast Burning Hands or Flame Blade with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Amphibious": {
        "name": "Amphibious",
        "description": "You can breathe air and water."
    },
    "Swim": {
        "name": "Swim",
        "description": "You have a Swim Speed equal to your walking speed."
    },
    "Call to the Wave": {
        "name": "Call to the Wave",
        "description": "You know the Acid Splash cantrip. Starting at 3rd level, you can cast Create or Destroy Water with this trait. Starting at 5th level, you can also cast Water Walk with this trait, without a material component. Once you cast Create or Destroy Water or Water Walk with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast either spell using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Decadent Mastery": {
        "name": "Decadent Mastery",
        "description": "You learn one language of your choice, and you are proficient with one skill or tool of your choice."
    },
    "Martial Prodigy": {
        "name": "Martial Prodigy",
        "description": "You are proficient with light armor and with one type of one-handed melee weapon of your choice."
    },
    "Mental Discipline": {
        "name": "Mental Discipline",
        "description": "You have Advantage on saving throws you make to avoid or end the Charmed or Frightened condition on yourself."
    },
    "Natural Athlete": {
        "name": "Natural Athlete",
        "description": "You have proficiency in the Athletics skill."
    },
    "Stone's Endurance": {
        "name": "Stone's Endurance",
        "description": "You can focus yourself to occasionally shrug off injury. When you take damage, you can use your reaction to roll a d12. Add your Constitution modifier to the number rolled, and reduce the damage by that total. After you use this trait, you can't use it again until you finish a short or long rest."
    },
    "Mountain Born": {
        "name": "Mountain Born",
        "description": "You have resistance to cold damage. You're also acclimated to high altitude, including elevations above 20,000 feet."
    },
    "Expert Forgery": {
        "name": "Expert Forgery",
        "description": "You can duplicate other creatures' handwriting and craftwork. You have advantage on all checks made to produce forgeries or duplicates of existing objects."
    },
    "Kenku Training": {
        "name": "Kenku Training",
        "description": "You are proficient in your choice of two of the following skills: Acrobatics, Deception, Stealth, and Sleight of Hand."
    },
    "Mimicry": {
        "name": "Mimicry",
        "description": "You can accurately mimic sounds you have heard, including voices. A creature that hears the sounds you make can tell they are imitations only with a successful Wisdom (Insight) check against a DC of 8 + your Proficiency Bonus + your Charisma modifier."
    },
    "Leviathan Will": {
        "name": "Leviathan Will",
        "description": "You have advantage on saving throws against being charmed or frightened."
    },
    "Observant": {
        "name": "Observant",
        "description": "You can see up to 60 feet away in dim light as if it were bright light, and in darkness as if it were dim light."
    },
    "Reveler": {
        "name": "Reveler",
        "description": "You have proficiency in the Performance and Persuasion skills, and you have proficiency with one musical instrument of your choice."
    },
    "Fey": {
        "name": "Fey",
        "description": "Your creature type is Fey, rather than Humanoid."
    },
    "Child of the Sea": {
        "name": "Child of the Sea",
        "description": "You have a Swim Speed equal to your walking speed, and you can breathe air and water."
    },
    "Friend of the Sea": {
        "name": "Friend of the Sea",
        "description": "Aquatic animals have an extraordinary affinity with your people. You can communicate simple ideas to any Beast that has a Swim Speed. It can understand your words, though you have no special ability to understand it in return."
    },
    "Blessing of the Raven Queen": {
        "name": "Blessing of the Raven Queen",
        "description": "As a Bonus Action, you can magically teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest. Starting at 3rd level, after you use this trait you also gain Resistance to all damage until the start of your next turn."
    },
    "Cat's Talent": {
        "name": "Cat's Talent",
        "description": "You have proficiency in the Perception and Stealth skills."
    },
    "Hold Breath": {
        "name": "Hold Breath",
        "description": "You can hold your breath for up to 15 minutes at a time."
    },
    "Shell Defense": {
        "name": "Shell Defense",
        "description": "You can withdraw into your shell as an action. Until you emerge, you gain a +4 bonus to your AC, and you have Advantage on Strength and Constitution saving throws. While in your shell, you are Prone, your Speed is 0 and can't increase, you have Disadvantage on Dexterity saving throws, you can't take Reactions, and the only action you can take is a Bonus Action to emerge from your shell."
    },
    "Survival Instinct": {
        "name": "Survival Instinct",
        "description": "You gain proficiency in the Survival skill. Tortles have finely honed survival instincts."
    },
    "Control Air and Water": {
        "name": "Control Air and Water",
        "description": "You can cast Fog Cloud with this trait. Starting at 3rd level, you can cast Gust of Wind with it, and starting at 5th level, you can also cast Water Walk with it. Once you cast any of these spells with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast these spells using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for these spells (choose when you select this species)."
    },
    "Emissary of the Sea": {
        "name": "Emissary of the Sea",
        "description": "You can communicate simple ideas to any Beast, Elemental, or Monstrosity that has a Swim Speed. It can understand your words, though you have no special ability to understand it in return."
    },
    "Guardians of the Depths": {
        "name": "Guardians of the Depths",
        "description": "Adapted to the frigid ocean depths, you have Resistance to Cold damage."
    },
    "Black Blood Healing": {
        "name": "Black Blood Healing",
        "description": "When you take a short rest, you regain 1 additional hit point per level you have."
    },
    "Limited Telepathy": {
        "name": "Limited Telepathy",
        "description": "You can telepathically speak to any creature you can see within 30 feet of you. You don't need to share a language with the creature for it to understand your telepathic messages, but the creature must be able to understand at least one language."
    },
    "Persuasive": {
        "name": "Persuasive",
        "description": "You have proficiency in the Deception and Persuasion skills."
    },
    "Verdan Weapon Training": {
        "name": "Verdan Weapon Training",
        "description": "You are proficient with rapiers, shortswords, and hand crossbows."
    },
    "Long-Limbed": {
        "name": "Long-Limbed",
        "description": "When you make a melee attack on your turn, your reach for it is 5 feet greater than normal."
    },
    "Sneaky": {
        "name": "Sneaky",
        "description": "You are proficient in the Stealth skill. In addition, without squeezing, you can move through and stay in a space large enough for a Small creature."
    },
    "Surprise Attack": {
        "name": "Surprise Attack",
        "description": "If you hit a creature with an attack roll, the creature takes an extra 2d6 damage if it hasn't taken a turn yet in the current combat."
    },
    "Charge": {
        "name": "Charge",
        "description": "If you move at least 30 feet straight toward a target and then hit it with a melee weapon attack on the same turn, you can immediately follow that attack with a Bonus Action, making one attack against the target with your hooves."
    },
    "Equine Build": {
        "name": "Equine Build",
        "description": "You count as one size larger when determining your carrying capacity and the weight you can push or drag. In addition, any climb that requires hands and feet is especially difficult for you because of your equine legs: each foot of movement costs you 4 extra feet instead of 1 extra foot."
    },
    "Natural Affinity": {
        "name": "Natural Affinity",
        "description": "Your fey connection to beasts and nature gives you proficiency in one of the following skills of your choice: Animal Handling, Medicine, Nature, or Survival."
    },
    "Fury of the Small": {
        "name": "Fury of the Small",
        "description": "When you damage a creature with an attack or a spell and the creature's size is larger than yours, you can cause the attack or spell to deal extra damage to the creature equal to your Proficiency Bonus. You can use this trait a number of times equal to your Proficiency Bonus, regaining all expended uses when you finish a Long Rest, and you can use it no more than once per turn."
    },
    "Nimble Escape": {
        "name": "Nimble Escape",
        "description": "You can take the Disengage or Hide action as a Bonus Action on each of your turns."
    },
    "Poisonous Skin": {
        "name": "Poisonous Skin",
        "description": "Any creature that grapples you or otherwise comes into direct contact with your skin must succeed on a Constitution saving throw or become poisoned for 1 minute. A poisoned creature no longer in direct contact with you can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. You can also apply this poison to any piercing weapon as part of an attack with that weapon, though when you hit the attack deals its normal damage and not the poison damage. This poison's save DC equals 8 + your Constitution modifier + your proficiency bonus."
    },
    "Standing Leap": {
        "name": "Standing Leap",
        "description": "Your long jump is up to 25 feet and your high jump is up to 15 feet, with or without a running start."
    },
    "Water Dependency": {
        "name": "Water Dependency",
        "description": "If you fail to immerse yourself in water for at least 1 hour during a day, you suffer 1 level of exhaustion at the end of that day. You can recover from this exhaustion only through magic or by immersing yourself in water for at least 1 hour."
    },
    "Martial Training": {
        "name": "Martial Training",
        "description": "You are proficient with two martial weapons of your choice and with light armor."
    },
    "Saving Face": {
        "name": "Saving Face",
        "description": "Hobgoblins are careful not to show weakness in front of their allies, for fear of losing status. If you miss with an attack roll or fail an ability check or saving throw, you can gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +5). Once you use this trait, you can't use it again until you finish a short or long rest."
    },
    "Grovel, Cower, and Beg": {
        "name": "Grovel, Cower, and Beg",
        "description": "As an action on your turn, you can cower pathetically to distract nearby foes. Until the end of your next turn, your allies gain advantage on attack rolls against enemies within 10 feet of you that can see you. Once you use this trait, you can't use it again until you finish a short or long rest."
    },
    "Pack Tactics": {
        "name": "Pack Tactics",
        "description": "You have advantage on an attack roll against a creature if at least one of your allies is within 5 feet of the creature and the ally isn't incapacitated."
    },
    "Cunning Artisan": {
        "name": "Cunning Artisan",
        "description": "As part of a short rest, you can harvest bone and hide from a slain beast, construct, dragon, monstrosity, or plant creature of size Small or larger to create one of the following items: a shield, a club, a javelin, or 1d4 darts or blowgun needles. To use this trait, you need a blade, such as a dagger, or appropriate artisan's tools, such as leatherworker's tools."
    },
    "Hunter's Lore": {
        "name": "Hunter's Lore",
        "description": "You gain proficiency with two of the following skills of your choice: Animal Handling, Nature, Perception, Stealth, and Survival."
    },
    "Hungry Jaws": {
        "name": "Hungry Jaws",
        "description": "You can make a special attack with your Bite as a Bonus Action. If the attack hits, it deals its normal damage, and you gain Temporary Hit Points equal to your Proficiency Bonus. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Goring Rush": {
        "name": "Goring Rush",
        "description": "Immediately after you use the Dash action on your turn and move at least 20 feet, you can make one melee attack with your Horns as a Bonus Action."
    },
    "Hammering Horns": {
        "name": "Hammering Horns",
        "description": "Immediately after you hit a creature with a melee attack as part of the Attack action on your turn, you can use a Bonus Action to attempt to push that target with your horns. The target must be within 5 feet of you and no more than one size larger than you. Unless it succeeds on a Strength saving throw against a DC equal to 8 + your Proficiency Bonus + your Strength modifier, you push it up to 10 feet away from you."
    },
    "Imposing Presence": {
        "name": "Imposing Presence",
        "description": "You have proficiency in one of the following skills of your choice: Intimidation or Persuasion."
    },
    "Labyrinthine Recall": {
        "name": "Labyrinthine Recall",
        "description": "You always know which direction is north, and you have Advantage on any Wisdom (Survival) check you make to navigate or track."
    },
    "Aggressive": {
        "name": "Aggressive",
        "description": "As a bonus action, you can move up to your speed toward a hostile creature that you can see."
    },
    "Shifting": {
        "name": "Shifting",
        "description": "As a Bonus Action, you can assume a more bestial appearance for 1 minute, until you die, or until you revert as a Bonus Action. When you shift, you gain Temporary Hit Points equal to 2 × your Proficiency Bonus, and you gain a benefit based on your chosen shifter type: Beasthide (+1d6 extra temporary HP and +1 AC), Longtooth (Bonus Action fang attack, 1d6 + Str Piercing), Swiftstride (+10 feet of Speed and a Reaction to move 10 feet when an enemy ends its turn within 5 feet of you), or Wildhunt (Advantage on Wisdom checks, and no attack roll against you has Advantage unless you are Incapacitated). You can shift a number of times equal to your Proficiency Bonus, regaining all expended uses when you finish a Long Rest."
    },
    "Darkvision (120 ft.)": {
        "name": "Darkvision (120 ft.)",
        "description": "You have Darkvision with a range of 120 feet."
    },
    "Keen Senses (Perception)": {
        "name": "Keen Senses (Perception)",
        "description": "You have proficiency in the Perception skill."
    },
    "Draconic Ancestry (Black)": {
        "name": "Draconic Ancestry (Black)",
        "description": "Your draconic ancestor is a black dragon. Your Breath Weapon and Damage Resistance use Acid damage."
    },
    "Draconic Ancestry (Blue)": {
        "name": "Draconic Ancestry (Blue)",
        "description": "Your draconic ancestor is a blue dragon. Your Breath Weapon and Damage Resistance use Lightning damage."
    },
    "Draconic Ancestry (Brass)": {
        "name": "Draconic Ancestry (Brass)",
        "description": "Your draconic ancestor is a brass dragon. Your Breath Weapon and Damage Resistance use Fire damage."
    },
    "Draconic Ancestry (Bronze)": {
        "name": "Draconic Ancestry (Bronze)",
        "description": "Your draconic ancestor is a bronze dragon. Your Breath Weapon and Damage Resistance use Lightning damage."
    },
    "Draconic Ancestry (Copper)": {
        "name": "Draconic Ancestry (Copper)",
        "description": "Your draconic ancestor is a copper dragon. Your Breath Weapon and Damage Resistance use Acid damage."
    },
    "Draconic Ancestry (Gold)": {
        "name": "Draconic Ancestry (Gold)",
        "description": "Your draconic ancestor is a gold dragon. Your Breath Weapon and Damage Resistance use Fire damage."
    },
    "Draconic Ancestry (Green)": {
        "name": "Draconic Ancestry (Green)",
        "description": "Your draconic ancestor is a green dragon. Your Breath Weapon and Damage Resistance use Poison damage."
    },
    "Draconic Ancestry (Red)": {
        "name": "Draconic Ancestry (Red)",
        "description": "Your draconic ancestor is a red dragon. Your Breath Weapon and Damage Resistance use Fire damage."
    },
    "Draconic Ancestry (Silver)": {
        "name": "Draconic Ancestry (Silver)",
        "description": "Your draconic ancestor is a silver dragon. Your Breath Weapon and Damage Resistance use Cold damage."
    },
    "Draconic Ancestry (White)": {
        "name": "Draconic Ancestry (White)",
        "description": "Your draconic ancestor is a white dragon. Your Breath Weapon and Damage Resistance use Cold damage."
    },
    "Wind Caller": {
        "name": "Wind Caller",
        "description": "Starting at 3rd level, you can cast Gust of Wind with this trait without a spell slot once per Long Rest. You can also cast it using spell slots you have of 2nd level or higher. Intelligence, Wisdom, or Charisma is your spellcasting ability for it (choose when you select this species)."
    },
    "Changeling Instincts": {
        "name": "Changeling Instincts",
        "description": "You gain proficiency with two of the following skills of your choice: Deception, Insight, Intimidation, Performance, or Persuasion."
    },
    "Gift of the Svirfneblin": {
        "name": "Gift of the Svirfneblin",
        "description": "Starting at 3rd level, you can cast Disguise Self with this trait. Starting at 5th level, you can also cast Nondetection on yourself with it, without a material component. Once you cast either spell with this trait, you can't cast that spell with it again until you finish a Long Rest. You can also cast these spells using spell slots of the appropriate level. Intelligence, Wisdom, or Charisma is your spellcasting ability for them (choose when you select this species)."
    },
    "Gnomish Magic Resistance": {
        "name": "Gnomish Magic Resistance",
        "description": "You have Advantage on Intelligence, Wisdom, and Charisma saving throws against spells."
    },
    "Svirfneblin Camouflage": {
        "name": "Svirfneblin Camouflage",
        "description": "When you make a Dexterity (Stealth) check, you can make it with Advantage. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Psionic Fortitude": {
        "name": "Psionic Fortitude",
        "description": "You have Advantage on saving throws you make to avoid or end the Charmed or Stunned condition on yourself."
    },
    "Hidden Step": {
        "name": "Hidden Step",
        "description": "As a Bonus Action, you can magically turn Invisible until the start of your next turn or until you attack, make a damage roll, or force someone to make a saving throw. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Speech of Beast and Leaf": {
        "name": "Speech of Beast and Leaf",
        "description": "You can communicate in a limited manner with Beasts, Plants, and vegetation. They can understand the meaning of your words, though you have no special ability to understand them in return. You have Advantage on all Charisma checks you make to influence them."
    },
    "Lightning Resistance": {
        "name": "Lightning Resistance",
        "description": "You have Resistance to Lightning damage."
    },
    "Acid Resistance": {
        "name": "Acid Resistance",
        "description": "You have Resistance to Acid damage."
    },
    "Astral Knowledge": {
        "name": "Astral Knowledge",
        "description": "Whenever you finish a Long Rest, you gain proficiency in one skill of your choice and with one weapon or tool of your choice, selected from the Player's Handbook, until you finish your next Long Rest."
    },
    "Psychic Resilience": {
        "name": "Psychic Resilience",
        "description": "You have Resistance to Psychic damage."
    },
    "Leporine Senses": {
        "name": "Leporine Senses",
        "description": "You have proficiency in the Perception skill."
    },
    "Fey Gift": {
        "name": "Fey Gift",
        "description": "You can take the Help action as a Bonus Action a number of times equal to your Proficiency Bonus, regaining all expended uses when you finish a Long Rest. Starting at 3rd level, when you Help this way you can also choose one extra effect: Hospitality (you and the helped creature gain 1d6 + Proficiency Bonus Temporary Hit Points), Passage (you and the helped creature gain 10 feet of Speed until the start of your next turn), or Spite (the target of the Help has Disadvantage on its next attack roll within 1 minute)."
    },
    "Fortune from the Many": {
        "name": "Fortune from the Many",
        "description": "If you miss with an attack roll or fail an ability check or a saving throw, you can draw on your bonds of reciprocity to gain a bonus to the roll equal to the number of allies you can see within 30 feet of you (maximum bonus of +3). You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Expert Duplication": {
        "name": "Expert Duplication",
        "description": "When you copy writing or craftwork produced by yourself or someone else, you have Advantage on any ability checks you make to produce an exact duplicate."
    },
    "Kenku Recall": {
        "name": "Kenku Recall",
        "description": "You gain proficiency in two skills of your choice. When you make an ability check that uses any skill in which you have proficiency, you can give yourself Advantage on the check before rolling the d20. You can give yourself Advantage in this way a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Draconic Cry": {
        "name": "Draconic Cry",
        "description": "As a Bonus Action, you let out a cry at your enemies within 10 feet of you. Until the start of your next turn, you and your allies have Advantage on attack rolls against any of those enemies who could hear you. You can use this trait a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest."
    },
    "Kobold Legacy": {
        "name": "Kobold Legacy",
        "description": "Choose one: Craftiness (proficiency in one of Arcana, Investigation, Medicine, Sleight of Hand, or Survival), Draconic Defiance (Advantage on saving throws to avoid or end the Frightened condition), or Draconic Sorcery (you know one cantrip of your choice from the Sorcerer spell list; Intelligence, Wisdom, or Charisma is your spellcasting ability for it)."
    },
    "Hold Breath (1 hour)": {
        "name": "Hold Breath (1 hour)",
        "description": "You can hold your breath for up to 1 hour."
    },
    "Natural Armor (Shell)": {
        "name": "Natural Armor (Shell)",
        "description": "Your shell provides you a base AC of 17 (your Dexterity modifier doesn't affect this number). You can't wear light, medium, or heavy armor, but if you are using a shield, you can apply the shield's bonus as normal."
    },
    "Nature's Intuition": {
        "name": "Nature's Intuition",
        "description": "You gain proficiency with one of the following skills of your choice (two for lizardfolk): Animal Handling, Medicine, Nature, Perception, Stealth, or Survival."
    },
    "Bestial Instincts": {
        "name": "Bestial Instincts",
        "description": "You have proficiency in one of the following skills of your choice: Acrobatics, Athletics, Intimidation, or Survival."
    },
    "Poison Resilience": {
        "name": "Poison Resilience",
        "description": "You have Advantage on saving throws you make to avoid or end the Poisoned condition on yourself. You also have Resistance to Poison damage."
    },
    "Gnomish Lineage (Forest Gnome)": {
        "name": "Gnomish Lineage (Forest Gnome)",
        "description": "You know the Minor Illusion cantrip. You also always have the Speak with Animals spell prepared. You can cast it without a spell slot a number of times equal to your Proficiency Bonus, and you regain all expended uses when you finish a Long Rest. You can also use any spell slots you have to cast the spell."
    },
    "Gnomish Lineage (Rock Gnome)": {
        "name": "Gnomish Lineage (Rock Gnome)",
        "description": "You know the Mending and Prestidigitation cantrips. In addition, you can spend 10 minutes casting Prestidigitation to create a Tiny clockwork device (AC 5, 1 HP), such as a toy, fire starter, or music box, whose function is one effect of Prestidigitation that it produces when activated with a touch as a Bonus Action. You can have three such devices at a time; each falls apart after 8 hours or when you dismantle it."
    },
    "Giant Ancestry (Cloud's Jaunt)": {
        "name": "Giant Ancestry (Cloud's Jaunt)",
        "description": "As a Bonus Action, you magically teleport up to 30 feet to an unoccupied space you can see."
    },
    "Giant Ancestry (Fire's Burn)": {
        "name": "Giant Ancestry (Fire's Burn)",
        "description": "When you hit a target with an attack roll and deal damage to it, you can also deal 1d10 Fire damage to that target."
    },
    "Giant Ancestry (Frost's Chill)": {
        "name": "Giant Ancestry (Frost's Chill)",
        "description": "When you hit a target with an attack roll and deal damage to it, you can also deal 1d6 Cold damage to that target and reduce its Speed by 10 feet until the start of your next turn."
    },
    "Giant Ancestry (Hill's Tumble)": {
        "name": "Giant Ancestry (Hill's Tumble)",
        "description": "When you hit a Large or smaller creature with an attack roll and deal damage to it, you can give that target the Prone condition."
    },
    "Giant Ancestry (Stone's Endurance)": {
        "name": "Giant Ancestry (Stone's Endurance)",
        "description": "When you take damage, you can take a Reaction to roll 1d12. Add your Constitution modifier to the number rolled and reduce the damage by that total."
    },
    "Giant Ancestry (Storm's Thunder)": {
        "name": "Giant Ancestry (Storm's Thunder)",
        "description": "When you take damage from a creature within 60 feet of you, you can take a Reaction to deal 1d8 Thunder damage to that creature."
    },
    "Fiendish Legacy (Abyssal)": {
        "name": "Fiendish Legacy (Abyssal)",
        "description": "You have Resistance to Poison damage and know the Poison Spray cantrip. At character level 3 you always have Ray of Sickness prepared, and at level 5 Hold Person; you can cast each once without a spell slot per Long Rest, or with spell slots."
    },
    "Fiendish Legacy (Chthonic)": {
        "name": "Fiendish Legacy (Chthonic)",
        "description": "You have Resistance to Necrotic damage and know the Chill Touch cantrip. At character level 3 you always have False Life prepared, and at level 5 Ray of Enfeeblement; you can cast each once without a spell slot per Long Rest, or with spell slots."
    },
    "Fiendish Legacy (Infernal)": {
        "name": "Fiendish Legacy (Infernal)",
        "description": "You have Resistance to Fire damage and know the Fire Bolt cantrip. At character level 3 you always have Hellish Rebuke prepared, and at level 5 Darkness; you can cast each once without a spell slot per Long Rest, or with spell slots."
    }
};
