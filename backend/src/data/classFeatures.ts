export interface ClassFeature {
    level: number;
    name: string;
    description: string;
}

export interface ClassFeaturesData {
    [classId: string]: ClassFeature[];
}

export const classFeatures: ClassFeaturesData = {
    fighter: [
        { level: 1, name: 'Fighting Style', description: 'You adopt a particular style of fighting as your specialty. Choose one of the fighting style options.' },
        { level: 1, name: 'Second Wind', description: 'You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.' },
        { level: 2, name: 'Action Surge', description: 'You can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.' },
        { level: 2, name: 'Action Surge (2 uses)', description: 'Starting at 17th level, you can use Action Surge twice before a rest, but only once on the same turn.' },
        { level: 3, name: 'Martial Archetype', description: 'You choose an archetype that you strive to emulate in your combat styles and techniques.' },
        { level: 5, name: 'Extra Attack', description: 'You can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { level: 5, name: 'Extra Attack (2)', description: 'Starting at 11th level, you can attack three times whenever you take the Attack action on your turn.' },
        { level: 5, name: 'Extra Attack (3)', description: 'Starting at 20th level, you can attack four times whenever you take the Attack action on your turn.' },
        { level: 9, name: 'Indomitable', description: 'You can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can\'t use this feature again until you finish a long rest.' },
        { level: 9, name: 'Indomitable (2 uses)', description: 'Starting at 13th level, you can use Indomitable twice between long rests.' },
        { level: 9, name: 'Indomitable (3 uses)', description: 'Starting at 17th level, you can use Indomitable three times between long rests.' },
        { level: 13, name: 'Indomitable (2 uses)', description: 'You can use Indomitable twice between long rests.' },
        { level: 17, name: 'Action Surge (2 uses)', description: 'You can use Action Surge twice before a rest, but only once on the same turn.' },
        { level: 17, name: 'Indomitable (3 uses)', description: 'You can use Indomitable three times between long rests.' },
        { level: 20, name: 'Extra Attack (3)', description: 'You can attack four times whenever you take the Attack action on your turn.' }
    ],
    wizard: [
        { level: 1, name: 'Spellcasting', description: 'As a student of arcane magic, you have a spellbook containing spells that show the first glimmerings of your true power.' },
        { level: 1, name: 'Arcane Recovery', description: 'You have learned to regain some of your magical energy by studying your spellbook. Once per day when you finish a short rest, you can choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your wizard level (rounded up), and none of the slots can be 6th level or higher.' },
        { level: 2, name: 'Arcane Tradition', description: 'You choose an arcane tradition, shaping your practice of magic through one of eight schools.' },
        { level: 18, name: 'Spell Mastery', description: 'You have achieved such mastery over certain spells that you can cast them at will. Choose a 1st-level wizard spell and a 2nd-level wizard spell that are in your spellbook. You can cast those spells at their lowest level without expending a spell slot when you have them prepared.' },
        { level: 20, name: 'Signature Spells', description: 'You gain mastery over two powerful spells and can cast them with little effort. Choose two 3rd-level wizard spells in your spellbook as your signature spells. You always have these spells prepared, they don\'t count against the number of spells you have prepared, and you can cast each of them once at 3rd level without expending a spell slot. When you do so, you can\'t do so again until you finish a short or long rest.' }
    ],
    rogue: [
        { level: 1, name: 'Expertise', description: 'At 1st level, choose two of your skill proficiencies, or one of your skill proficiencies and your proficiency with thieves\' tools. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.' },
        { level: 1, name: 'Sneak Attack', description: 'Beginning at 1st level, you know how to strike subtly and exploit a foe\'s distraction. Once per turn, you can deal an extra 1d6 damage to one creature you hit with an attack if you have advantage on the attack roll. The attack must use a finesse or a ranged weapon. You don\'t need advantage on the attack roll if another enemy of the target is within 5 feet of it, that enemy isn\'t incapacitated, and you don\'t have disadvantage on the attack roll.' },
        { level: 1, name: 'Thieves\' Cant', description: 'During your rogue training you learned thieves\' cant, a secret mix of dialect, jargon, and code that allows you to hide messages in seemingly normal conversation.' },
        { level: 2, name: 'Cunning Action', description: 'Starting at 2nd level, your quick thinking and agility allow you to move and act quickly. You can take a bonus action on each of your turns in combat. This action can be used only to take the Dash, Disengage, or Hide action.' },
        { level: 3, name: 'Roguish Archetype', description: 'You choose an archetype that you emulate in the exercise of your rogue abilities.' },
        { level: 5, name: 'Uncanny Dodge', description: 'Starting at 5th level, when an attacker that you can see hits you with an attack, you can use your reaction to halve the attack\'s damage against you.' },
        { level: 6, name: 'Expertise', description: 'At 6th level, you can choose two more of your proficiencies (in skills or with thieves\' tools) to gain this benefit.' },
        { level: 7, name: 'Evasion', description: 'At 7th level, you can nimbly dodge out of the way of certain area effects, such as a red dragon\'s fiery breath or an ice storm spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.' },
        { level: 11, name: 'Reliable Talent', description: 'By 11th level, you have refined your chosen skills until they approach perfection. Whenever you make an ability check that lets you add your proficiency bonus, you can treat a d20 roll of 9 or lower as a 10.' },
        { level: 14, name: 'Blindsense', description: 'Starting at 14th level, if you are able to hear, you are aware of the location of any hidden or invisible creature within 10 feet of you.' },
        { level: 15, name: 'Slippery Mind', description: 'By 15th level, you have acquired greater mental strength. You gain proficiency in Wisdom saving throws.' },
        { level: 18, name: 'Elusive', description: 'Beginning at 18th level, you are so evasive that attackers rarely gain the upper hand against you. No attack roll has advantage against you while you aren\'t incapacitated.' },
        { level: 20, name: 'Stroke of Luck', description: 'At 20th level, you have an uncanny knack for succeeding when you need to. If your attack misses a target within range, you can turn the miss into a hit. If you fail an ability check, you can treat the d20 roll as a 20. Once you use this feature, you can\'t use it again until you finish a short or long rest.' }
    ],
    cleric: [
        { level: 1, name: 'Spellcasting', description: 'As a conduit for divine power, you can cast cleric spells.' },
        { level: 1, name: 'Divine Domain', description: 'Choose one domain related to your deity. Your choice grants you domain spells and other features when you choose it at 1st level.' },
        { level: 2, name: 'Channel Divinity', description: 'At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects: Turn Undead and an effect determined by your domain.' },
        { level: 5, name: 'Destroy Undead', description: 'Starting at 5th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold.' },
        { level: 8, name: 'Divine Strike', description: 'At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack to deal extra radiant damage to the target.' },
        { level: 10, name: 'Divine Intervention', description: 'Beginning at 10th level, you can call on your deity to intervene on your behalf when your need is great.' },
        { level: 14, name: 'Destroy Undead (Improved)', description: 'Starting at 14th level, when an undead fails its saving throw against your Turn Undead feature, the creature is instantly destroyed if its challenge rating is at or below a certain threshold.' },
        { level: 18, name: 'Channel Divinity (3 uses)', description: 'Starting at 18th level, you can use your Channel Divinity three times between rests.' },
        { level: 20, name: 'Divine Intervention (Improved)', description: 'At 20th level, your call for intervention succeeds automatically, no roll required.' }
    ],
    ranger: [
        { level: 1, name: 'Favored Enemy', description: 'Beginning at 1st level, you have significant experience studying, tracking, hunting, and even talking to a certain type of enemy.' },
        { level: 1, name: 'Natural Explorer', description: 'You are particularly familiar with one type of natural environment and are adept at traveling and surviving in such regions.' },
        { level: 2, name: 'Fighting Style', description: 'You adopt a particular style of fighting as your specialty. Choose one of the fighting style options.' },
        { level: 2, name: 'Spellcasting', description: 'By the time you reach 2nd level, you have learned to use the magical essence of nature to cast spells, much as a druid does.' },
        { level: 3, name: 'Ranger Archetype', description: 'You choose an archetype that you strive to emulate in your combat styles and techniques.' },
        { level: 3, name: 'Primeval Awareness', description: 'Beginning at 3rd level, your mastery of ranger lore allows you to establish a link with beasts and plants.' },
        { level: 5, name: 'Extra Attack', description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { level: 6, name: 'Favored Enemy (Improved)', description: 'At 6th level, you add one additional favored enemy, as well as an associated language.' },
        { level: 6, name: 'Natural Explorer (Improved)', description: 'At 6th level, you add one additional favored terrain type.' },
        { level: 8, name: 'Land\'s Stride', description: 'Starting at 8th level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.' },
        { level: 10, name: 'Hide in Plain Sight', description: 'Starting at 10th level, you can spend 1 minute creating camouflage for yourself. You must have access to fresh mud, dirt, plants, soot, and other naturally occurring materials with which to create your camouflage.' },
        { level: 14, name: 'Favored Enemy (Master)', description: 'At 14th level, you add one additional favored enemy, as well as an associated language.' },
        { level: 14, name: 'Vanish', description: 'Starting at 14th level, you can use the Hide action as a bonus action on your turn. Also, you can\'t be tracked by nonmagical means, unless you choose to leave a trail.' },
        { level: 18, name: 'Feral Senses', description: 'At 18th level, you gain preternatural senses that help you fight creatures you can\'t see. When you attack a creature you can\'t see, your inability to see it doesn\'t impose disadvantage on your attack rolls against it.' },
        { level: 20, name: 'Foe Slayer', description: 'At 20th level, you become an unparalleled hunter of your enemies. Once on each of your turns, you can add your Wisdom modifier to the attack roll or the damage roll of an attack you make against one of your favored enemies.' }
    ],
    barbarian: [
        { level: 1, name: 'Rage', description: 'In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren\'t wearing heavy armor: You have advantage on Strength checks and Strength saving throws. When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian. You have resistance to bludgeoning, piercing, and slashing damage.' },
        { level: 1, name: 'Unarmored Defense', description: 'While you are not wearing any armor, your Armor Class equals 10 + your Dexterity modifier + your Constitution modifier. You can use a shield and still gain this benefit.' },
        { level: 2, name: 'Reckless Attack', description: 'Starting at 2nd level, you can throw aside all concern for defense to attack with fierce desperation. When you make your first attack on your turn, you can decide to attack recklessly. Doing so gives you advantage on melee weapon attack rolls using Strength during this turn, but attack rolls against you have advantage until your next turn.' },
        { level: 2, name: 'Danger Sense', description: 'At 2nd level, you gain an uncanny sense of when things nearby aren\'t as they should be, giving you an edge when you dodge away from danger. You have advantage on Dexterity saving throws against effects that you can see, such as traps and spells. To gain this benefit, you can\'t be blinded, deafened, or incapacitated.' },
        { level: 3, name: 'Primal Path', description: 'At 3rd level, you choose a path that shapes the nature of your rage.' },
        { level: 5, name: 'Extra Attack', description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { level: 5, name: 'Fast Movement', description: 'Starting at 5th level, your speed increases by 10 feet while you aren\'t wearing heavy armor.' },
        { level: 7, name: 'Feral Instinct', description: 'By 7th level, your instincts are so honed that you have advantage on initiative rolls. Additionally, if you are surprised at the beginning of combat and aren\'t incapacitated, you can act normally on your first turn, but only if you enter your rage before doing anything else on that turn.' },
        { level: 9, name: 'Brutal Critical', description: 'Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.' },
        { level: 9, name: 'Brutal Critical (2 dice)', description: 'This increases to two additional dice at 13th level.' },
        { level: 9, name: 'Brutal Critical (3 dice)', description: 'And three additional dice at 17th level.' },
        { level: 11, name: 'Relentless Rage', description: 'Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you\'re raging and don\'t die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.' },
        { level: 13, name: 'Brutal Critical (2 dice)', description: 'You can roll two additional weapon damage dice when determining the extra damage for a critical hit with a melee attack.' },
        { level: 15, name: 'Persistent Rage', description: 'Beginning at 15th level, your rage is so fierce that it ends early only if you fall unconscious or if you choose to end it.' },
        { level: 17, name: 'Brutal Critical (3 dice)', description: 'You can roll three additional weapon damage dice when determining the extra damage for a critical hit with a melee attack.' },
        { level: 18, name: 'Indomitable Might', description: 'Beginning at 18th level, if your total for a Strength check is less than your Strength score, you can use that score in place of the total.' },
        { level: 20, name: 'Primal Champion', description: 'At 20th level, you embody the power of the wilds. Your Strength and Constitution scores increase by 4. Your maximum for those scores is now 24.' }
    ],
    bard: [
        { level: 1, name: 'Spellcasting', description: 'You have learned to untangle and reshape the fabric of reality in harmony with your wishes and music. Your spells are part of your vast repertoire, magic that you can tune to different situations.' },
        { level: 1, name: 'Bardic Inspiration', description: 'You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.' },
        { level: 2, name: 'Jack of All Trades', description: 'Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn\'t already include your proficiency bonus.' },
        { level: 2, name: 'Song of Rest', description: 'Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest.' },
        { level: 3, name: 'Bard College', description: 'At 3rd level, you delve into the advanced techniques of a bard college of your choice.' },
        { level: 3, name: 'Expertise', description: 'At 3rd level, choose two of your skill proficiencies. Your proficiency bonus is doubled for any ability check you make that uses either of the chosen proficiencies.' },
        { level: 5, name: 'Font of Inspiration', description: 'Beginning at 5th level, you regain all of your expended uses of Bardic Inspiration when you finish a short or long rest.' },
        { level: 5, name: 'Bardic Inspiration (d8)', description: 'Your Bardic Inspiration die changes to a d8 at 5th level.' },
        { level: 6, name: 'Countercharm', description: 'At 6th level, you gain the ability to use musical notes or words of power to disrupt mind-influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creatures within 30 feet of you have advantage on saving throws against being frightened or charmed.' },
        { level: 10, name: 'Bardic Inspiration (d10)', description: 'Your Bardic Inspiration die changes to a d10 at 10th level.' },
        { level: 10, name: 'Magical Secrets', description: 'By 10th level, you have plundered magical knowledge from a wide spectrum of disciplines. Choose two spells from any class, including this one. A spell you choose must be of a level you can cast, as shown on the Bard table, or a cantrip.' },
        { level: 14, name: 'Bardic Inspiration (d12)', description: 'Your Bardic Inspiration die changes to a d12 at 14th level.' },
        { level: 15, name: 'Magical Secrets', description: 'At 15th level, you learn two more spells from any class.' },
        { level: 18, name: 'Magical Secrets', description: 'At 18th level, you learn two more spells from any class.' },
        { level: 20, name: 'Superior Inspiration', description: 'At 20th level, when you roll initiative and have no uses of Bardic Inspiration left, you regain one use.' }
    ],
    druid: [
        { level: 1, name: 'Spellcasting', description: 'Drawing on the divine essence of nature itself, you can cast spells to shape that essence to your will.' },
        { level: 1, name: 'Druidic', description: 'You know Druidic, the secret language of druids. You can speak the language and use it to leave hidden messages. You and others who know this language automatically spot such a message. Others spot the message\'s presence with a successful DC 15 Wisdom (Perception) check but can\'t decipher it without magic.' },
        { level: 2, name: 'Wild Shape', description: 'Starting at 2nd level, you can use your action to magically assume the shape of a beast that you have seen before. You can use this feature twice. You regain expended uses when you finish a short or long rest.' },
        { level: 2, name: 'Druid Circle', description: 'At 2nd level, you choose to identify with a circle of druids.' },
        { level: 18, name: 'Beast Spells', description: 'Beginning at 18th level, you can cast many of your druid spells in any shape you assume using Wild Shape. You can perform the somatic and verbal components of a druid spell while in a beast shape, but you aren\'t able to provide material components.' },
        { level: 20, name: 'Archdruid', description: 'At 20th level, you can use Wild Shape an unlimited number of times. Additionally, you can ignore the verbal and somatic components of your druid spells, as well as any material components that lack a cost and aren\'t consumed by a spell. You gain this benefit in both your normal shape and your beast shape from Wild Shape.' }
    ],
    monk: [
        { level: 1, name: 'Unarmored Defense', description: 'Beginning at 1st level, while you are wearing no armor and not wielding a shield, your AC equals 10 + your Dexterity modifier + your Wisdom modifier.' },
        { level: 1, name: 'Martial Arts', description: 'At 1st level, your practice of martial arts gives you mastery of combat styles that use unarmed strikes and monk weapons, which are shortswords and any simple melee weapons that don\'t have the two-handed or heavy property.' },
        { level: 2, name: 'Ki', description: 'Starting at 2nd level, your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points. Your monk level determines the number of points you have.' },
        { level: 2, name: 'Unarmored Movement', description: 'Starting at 2nd level, your speed increases by 10 feet while you are not wearing armor or wielding a shield. This bonus increases when you reach certain monk levels.' },
        { level: 3, name: 'Monastic Tradition', description: 'When you reach 3rd level, you commit yourself to a monastic tradition.' },
        { level: 3, name: 'Deflect Missiles', description: 'Starting at 3rd level, you can use your reaction to deflect or catch the missile when you are hit by a ranged weapon attack. When you do so, the damage you take from the attack is reduced by 1d10 + your Dexterity modifier + your monk level.' },
        { level: 4, name: 'Slow Fall', description: 'Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.' },
        { level: 5, name: 'Extra Attack', description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { level: 5, name: 'Stunning Strike', description: 'Starting at 5th level, you can interfere with the flow of ki in an opponent\'s body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike.' },
        { level: 6, name: 'Ki-Empowered Strikes', description: 'Starting at 6th level, your unarmed strikes count as magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.' },
        { level: 7, name: 'Evasion', description: 'At 7th level, your instinctive agility lets you dodge out of the way of certain area effects, such as a blue dragon\'s lightning breath or a fireball spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.' },
        { level: 7, name: 'Stillness of Mind', description: 'Starting at 7th level, you can use your action to end one effect on yourself that is causing you to be charmed or frightened.' },
        { level: 9, name: 'Unarmored Movement Improvement', description: 'At 9th level, you gain the ability to move along vertical surfaces and across water on your turn without falling during the move.' },
        { level: 10, name: 'Purity of Body', description: 'At 10th level, your mastery of the ki flowing through you makes you immune to disease and poison.' },
        { level: 13, name: 'Tongue of the Sun and Moon', description: 'Starting at 13th level, you learn to touch the ki of other minds so that you understand all spoken languages. Moreover, any creature that can understand a language can understand what you say.' },
        { level: 14, name: 'Diamond Soul', description: 'Beginning at 14th level, your mastery of ki grants you proficiency in all saving throws. Additionally, whenever you make a saving throw and fail, you can spend 1 ki point to reroll it and take the second result.' },
        { level: 15, name: 'Timeless Body', description: 'At 15th level, your ki sustains you so that you suffer none of the frailty of old age, and you can\'t be aged magically. You can still die of old age, however. In addition, you no longer need food or water.' },
        { level: 18, name: 'Empty Body', description: 'Beginning at 18th level, you can use your action to spend 4 ki points to become invisible for 1 minute. During that time, you also have resistance to all damage except force damage. Additionally, you can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can\'t take any other actions until you end the spell.' },
        { level: 20, name: 'Perfect Self', description: 'At 20th level, when you roll for initiative and have no ki points remaining, you regain 4 ki points.' }
    ],
    paladin: [
        { level: 1, name: 'Divine Sense', description: 'The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces.' },
        { level: 1, name: 'Lay on Hands', description: 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level × 5.' },
        { level: 2, name: 'Fighting Style', description: 'You adopt a particular style of fighting as your specialty. Choose one of the fighting style options.' },
        { level: 2, name: 'Spellcasting', description: 'By 2nd level, you have learned to draw on divine magic through meditation and prayer to cast spells as a cleric does.' },
        { level: 2, name: 'Divine Smite', description: 'Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon\'s damage.' },
        { level: 3, name: 'Divine Health', description: 'The divine magic flowing through you makes you immune to disease.' },
        { level: 3, name: 'Sacred Oath', description: 'When you reach 3rd level, you swear the oath that binds you as a paladin forever.' },
        { level: 5, name: 'Extra Attack', description: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.' },
        { level: 6, name: 'Aura of Protection', description: 'Starting at 6th level, whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1).' },
        { level: 10, name: 'Aura of Courage', description: 'Starting at 10th level, you and friendly creatures within 10 feet of you can\'t be frightened while you are conscious.' },
        { level: 11, name: 'Improved Divine Smite', description: 'By 11th level, you are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage.' },
        { level: 14, name: 'Cleansing Touch', description: 'Beginning at 14th level, you can use your action to end one spell on yourself or on one willing creature that you touch.' },
        { level: 18, name: 'Aura Improvements', description: 'At 18th level, the range of your auras increases to 30 feet.' },
        { level: 20, name: 'Sacred Oath Feature', description: 'At 20th level, you gain a feature determined by your Sacred Oath.' }
    ],
    sorcerer: [
        { level: 1, name: 'Spellcasting', description: 'An event in your past, or in the life of a parent or ancestor, left an indelible mark on you, infusing you with arcane magic. This font of magic, whatever its origin, fuels your spells.' },
        { level: 1, name: 'Sorcerous Origin', description: 'Choose a sorcerous origin, which describes the source of your innate magical power.' },
        { level: 2, name: 'Font of Magic', description: 'At 2nd level, you tap into a deep wellspring of magic within yourself. This wellspring is represented by sorcery points, which allow you to create a variety of magical effects.' },
        { level: 3, name: 'Metamagic', description: 'At 3rd level, you gain the ability to twist your spells to suit your needs. You gain two Metamagic options of your choice.' },
        { level: 6, name: 'Metamagic', description: 'At 6th level, you can learn one additional Metamagic option.' },
        { level: 10, name: 'Metamagic', description: 'At 10th level, you can learn one additional Metamagic option.' },
        { level: 17, name: 'Metamagic', description: 'At 17th level, you can learn one additional Metamagic option.' },
        { level: 20, name: 'Sorcerous Restoration', description: 'At 20th level, you regain 4 expended sorcery points whenever you finish a short rest.' }
    ],
    warlock: [
        { level: 1, name: 'Otherworldly Patron', description: 'At 1st level, you have struck a bargain with an otherworldly being of your choice.' },
        { level: 1, name: 'Pact Magic', description: 'Your arcane research and the magic bestowed on you by your patron have given you facility with spells.' },
        { level: 2, name: 'Eldritch Invocations', description: 'In your study of occult lore, you have unearthed eldritch invocations, fragments of forbidden knowledge that imbue you with an abiding magical ability. At 2nd level, you gain two eldritch invocations of your choice.' },
        { level: 3, name: 'Pact Boon', description: 'At 3rd level, your otherworldly patron bestows a gift upon you for your loyal service. You gain one of the following features of your choice.' },
        { level: 11, name: 'Mystic Arcanum (6th level)', description: 'At 11th level, your patron bestows upon you a magical secret called an arcanum. Choose one 6th-level spell from the warlock spell list as this arcanum.' },
        { level: 13, name: 'Mystic Arcanum (7th level)', description: 'At 13th level, you learn a 7th-level warlock spell of your choice.' },
        { level: 15, name: 'Mystic Arcanum (8th level)', description: 'At 15th level, you learn an 8th-level warlock spell of your choice.' },
        { level: 17, name: 'Mystic Arcanum (9th level)', description: 'At 17th level, you learn a 9th-level warlock spell of your choice.' },
        { level: 20, name: 'Eldritch Master', description: 'At 20th level, you can draw on your inner reserve of mystical power while entreating your patron to regain expended spell slots. You can spend 1 minute entreating your patron for aid to regain all your expended spell slots from your Pact Magic feature.' }
    ]
};
