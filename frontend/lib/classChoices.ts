/**
 * Choices the 2024 class features ask for when a class reaches a level
 * (Expertise, Metamagic, Eldritch Invocations, Weapon Mastery, ...).
 *
 * Invocation and Metamagic text is from SRD 5.2 (CC-BY-4.0, see README);
 * Battle Master maneuvers and Hunter options are summarized.
 */

export type ChoiceKind = 'expertise' | 'skill' | 'language' | 'option' | 'spell' | 'weaponMastery';

export interface ChoiceOption {
    id: string;
    name: string;
    description: string;
    /** Invocation prerequisites: Warlock level, another invocation, a damaging Warlock cantrip. */
    prerequisite?: { warlockLevel?: number; invocation?: string; cantrip?: 'damage' | 'attack' };
    /** Can be chosen more than once (Agonizing Blast, ...). */
    repeatable?: boolean;
}

export interface ClassChoice {
    /** Where the picks are stored in data.classChoices (e.g. "warlock:invocations"). */
    key: string;
    classId: string;
    title: string;
    description: string;
    kind: ChoiceKind;
    /** How many to pick at this level. */
    count: number;
    options?: ChoiceOption[];
    /** 'skill' choices: the skills to choose from. */
    skillList?: string[];
    /** 'spell' choices. */
    spell?: { level: number; list?: string; fromSpellbook?: boolean; actionOnly?: boolean };
    /** Name prefix for the feature added to the sheet for each pick ("Eldritch Invocation: Agonizing Blast"). */
    featureLabel?: string;
}

// ---------------------------------------------------------------------------
// Option lists
// ---------------------------------------------------------------------------

export const ELDRITCH_INVOCATIONS: ChoiceOption[] = [
    { id: 'agonizing-blast', name: 'Agonizing Blast', prerequisite: { warlockLevel: 2, cantrip: 'damage' }, repeatable: true,
        description: "Choose one of your known Warlock cantrips that deals damage. You can add your Charisma modifier to that spell's damage rolls. Repeatable: choose a different eligible cantrip each time." },
    { id: 'armor-of-shadows', name: 'Armor of Shadows',
        description: 'You can cast Mage Armor on yourself without expending a spell slot.' },
    { id: 'ascendant-step', name: 'Ascendant Step', prerequisite: { warlockLevel: 5 },
        description: 'You can cast Levitate on yourself without expending a spell slot.' },
    { id: 'devils-sight', name: "Devil's Sight", prerequisite: { warlockLevel: 2 },
        description: 'You can see normally in Dim Light and Darkness, both magical and nonmagical, within 120 feet of yourself.' },
    { id: 'devouring-blade', name: 'Devouring Blade', prerequisite: { warlockLevel: 12, invocation: 'thirsting-blade' },
        description: 'The Extra Attack of your Thirsting Blade invocation confers two extra attacks rather than one.' },
    { id: 'eldritch-mind', name: 'Eldritch Mind',
        description: 'You have Advantage on Constitution saving throws that you make to maintain Concentration.' },
    { id: 'eldritch-smite', name: 'Eldritch Smite', prerequisite: { warlockLevel: 5, invocation: 'pact-of-the-blade' },
        description: 'Once per turn when you hit a creature with your pact weapon, you can expend a Pact Magic spell slot to deal an extra 1d8 Force damage to the target, plus another 1d8 per level of the spell slot, and you can give the target the Prone condition if it is Huge or smaller.' },
    { id: 'eldritch-spear', name: 'Eldritch Spear', prerequisite: { warlockLevel: 2, cantrip: 'damage' }, repeatable: true,
        description: 'Choose one of your known Warlock cantrips that deals damage and has a range of 10+ feet. When you cast that spell, its range increases by a number of feet equal to 30 times your Warlock level. Repeatable: choose a different eligible cantrip each time.' },
    { id: 'fiendish-vigor', name: 'Fiendish Vigor', prerequisite: { warlockLevel: 2 },
        description: "You can cast False Life on yourself without expending a spell slot. When you cast the spell with this feature, you don't roll the die for the Temporary Hit Points; you automatically get the highest number on the die." },
    { id: 'gaze-of-two-minds', name: 'Gaze of Two Minds', prerequisite: { warlockLevel: 5 },
        description: "You can use a Bonus Action to touch a willing creature and perceive through its senses until the end of your next turn, maintaining the connection with a Bonus Action on later turns while you're on the same plane. While perceiving through its senses, you benefit from its special senses, and you can cast spells as if you were in your space or its space if you are within 60 feet of each other." },
    { id: 'gift-of-the-depths', name: 'Gift of the Depths', prerequisite: { warlockLevel: 5 },
        description: 'You can breathe underwater, and you gain a Swim Speed equal to your Speed. You can also cast Water Breathing once without expending a spell slot, regaining the ability to do so when you finish a Long Rest.' },
    { id: 'gift-of-the-protectors', name: 'Gift of the Protectors', prerequisite: { warlockLevel: 9, invocation: 'pact-of-the-tome' },
        description: 'A new page appears in your Book of Shadows. A number of creatures up to your Charisma modifier (minimum one) can write their names on it. When a named creature is reduced to 0 Hit Points but not killed outright, it drops to 1 Hit Point instead; this can then not happen again until you finish a Long Rest. As a Magic action, you can erase a name by touching it.' },
    { id: 'investment-of-the-chain-master', name: 'Investment of the Chain Master', prerequisite: { warlockLevel: 5, invocation: 'pact-of-the-chain' },
        description: 'Your Find Familiar familiar gains a 40-foot Fly or Swim Speed, can take the Attack action when you command it as a Bonus Action, can deal Necrotic or Radiant damage instead of Bludgeoning, Piercing, or Slashing, uses your spell save DC, and you can take a Reaction to give it Resistance against damage it takes.' },
    { id: 'lessons-of-the-first-ones', name: 'Lessons of the First Ones', prerequisite: { warlockLevel: 2 }, repeatable: true,
        description: 'You gain one Origin feat of your choice (add it on the Features list). Repeatable: choose a different Origin feat each time.' },
    { id: 'lifedrinker', name: 'Lifedrinker', prerequisite: { warlockLevel: 9, invocation: 'pact-of-the-blade' },
        description: 'Once per turn when you hit a creature with your pact weapon, you can deal an extra 1d6 Necrotic, Psychic, or Radiant damage (your choice), and you can expend one of your Hit Point Dice to roll it and regain Hit Points equal to the roll plus your Constitution modifier (minimum 1).' },
    { id: 'mask-of-many-faces', name: 'Mask of Many Faces', prerequisite: { warlockLevel: 2 },
        description: 'You can cast Disguise Self without expending a spell slot.' },
    { id: 'master-of-myriad-forms', name: 'Master of Myriad Forms', prerequisite: { warlockLevel: 5 },
        description: 'You can cast Alter Self without expending a spell slot.' },
    { id: 'misty-visions', name: 'Misty Visions', prerequisite: { warlockLevel: 2 },
        description: 'You can cast Silent Image without expending a spell slot.' },
    { id: 'one-with-shadows', name: 'One with Shadows', prerequisite: { warlockLevel: 5 },
        description: "While you're in an area of Dim Light or Darkness, you can cast Invisibility on yourself without expending a spell slot." },
    { id: 'otherworldly-leap', name: 'Otherworldly Leap', prerequisite: { warlockLevel: 2 },
        description: 'You can cast Jump on yourself without expending a spell slot.' },
    { id: 'pact-of-the-blade', name: 'Pact of the Blade',
        description: 'As a Bonus Action, you can conjure a pact weapon in your hand (a Simple or Martial Melee weapon of your choice) or bond with a magic weapon you touch. You have proficiency with it, can use it as a Spellcasting Focus, can use Charisma for its attack and damage rolls, and can make it deal Necrotic, Psychic, or Radiant damage or its normal type.' },
    { id: 'pact-of-the-chain', name: 'Pact of the Chain',
        description: 'You learn Find Familiar and can cast it as a Magic action without expending a spell slot, choosing a normal form or a special form (Imp, Pseudodragon, Quasit, Skeleton, Sphinx of Wonder, Sprite, or Venomous Snake). When you take the Attack action, you can forgo one of your attacks to let your familiar make one attack with its Reaction.' },
    { id: 'pact-of-the-tome', name: 'Pact of the Tome',
        description: 'At the end of a Short or Long Rest you conjure a Book of Shadows. While it is on your person you have three cantrips and two level 1 Ritual spells of your choice (from any class list) prepared as Warlock spells, and you can use the book as a Spellcasting Focus.' },
    { id: 'repelling-blast', name: 'Repelling Blast', prerequisite: { warlockLevel: 2, cantrip: 'attack' }, repeatable: true,
        description: 'Choose one of your known Warlock cantrips that requires an attack roll. When you hit a Large or smaller creature with that cantrip, you can push it up to 10 feet straight away from you. Repeatable: choose a different eligible cantrip each time.' },
    { id: 'thirsting-blade', name: 'Thirsting Blade', prerequisite: { warlockLevel: 5, invocation: 'pact-of-the-blade' },
        description: 'You gain the Extra Attack feature for your pact weapon only: you can attack twice with it instead of once when you take the Attack action on your turn.' },
    { id: 'visions-of-distant-realms', name: 'Visions of Distant Realms', prerequisite: { warlockLevel: 9 },
        description: 'You can cast Arcane Eye without expending a spell slot.' },
    { id: 'whispers-of-the-grave', name: 'Whispers of the Grave', prerequisite: { warlockLevel: 7 },
        description: 'You can cast Speak with Dead without expending a spell slot.' },
    { id: 'witch-sight', name: 'Witch Sight', prerequisite: { warlockLevel: 15 },
        description: 'You have Truesight with a range of 30 feet.' },
];

export const METAMAGIC_OPTIONS: ChoiceOption[] = [
    { id: 'careful-spell', name: 'Careful Spell', description: "Cost: 1 Sorcery Point. When you cast a spell that forces other creatures to make a saving throw, choose up to your Charisma modifier of them (minimum one). They automatically succeed on the save and take no damage if they would normally take half damage on a success." },
    { id: 'distant-spell', name: 'Distant Spell', description: "Cost: 1 Sorcery Point. Double the range of a spell with a range of at least 5 feet, or make a Touch spell's range 30 feet." },
    { id: 'empowered-spell', name: 'Empowered Spell', description: "Cost: 1 Sorcery Point. When you roll damage for a spell, reroll up to your Charisma modifier of the damage dice (minimum one) and use the new rolls. Can be combined with another Metamagic option." },
    { id: 'extended-spell', name: 'Extended Spell', description: 'Cost: 1 Sorcery Point. Double the duration of a spell with a duration of 1 minute or longer (maximum 24 hours). If it requires Concentration, you have Advantage on saves to maintain it.' },
    { id: 'heightened-spell', name: 'Heightened Spell', description: 'Cost: 2 Sorcery Points. When you cast a spell that forces a creature to make a saving throw, give one target Disadvantage on saves against the spell.' },
    { id: 'quickened-spell', name: 'Quickened Spell', description: "Cost: 2 Sorcery Points. Change a spell's casting time from an action to a Bonus Action. You can't do this if you've already cast a level 1+ spell this turn, nor cast one this turn afterward." },
    { id: 'seeking-spell', name: 'Seeking Spell', description: 'Cost: 1 Sorcery Point. If you miss with a spell attack roll, reroll the d20 and use the new roll. Can be combined with another Metamagic option.' },
    { id: 'subtle-spell', name: 'Subtle Spell', description: 'Cost: 1 Sorcery Point. Cast a spell without Verbal, Somatic, or Material components, except Material components that are consumed or have a cost.' },
    { id: 'transmuted-spell', name: 'Transmuted Spell', description: "Cost: 1 Sorcery Point. Change a spell's Acid, Cold, Fire, Lightning, Poison, or Thunder damage to another type from that list." },
    { id: 'twinned-spell', name: 'Twinned Spell', description: "Cost: 1 Sorcery Point. When you cast a spell that can target an additional creature when cast with a higher-level slot (such as Charm Person), increase the spell's effective level by 1." },
];

export const BATTLE_MASTER_MANEUVERS: ChoiceOption[] = [
    { id: 'ambush', name: 'Ambush', description: 'When you make a Dexterity (Stealth) check or an Initiative roll, you can expend a Superiority Die and add it to the roll (unless you have the Incapacitated condition).' },
    { id: 'bait-and-switch', name: 'Bait and Switch', description: "When you're within 5 feet of a willing creature on your turn, expend a Superiority Die to swap places with it (costing at least 5 feet of movement, no Opportunity Attacks). Roll the die; you or the creature adds it to AC until the start of your next turn." },
    { id: 'commanders-strike', name: "Commander's Strike", description: 'When you take the Attack action, replace one attack to direct an ally who can see or hear you; it can use its Reaction to make one attack, adding your expended Superiority Die to the damage.' },
    { id: 'commanding-presence', name: 'Commanding Presence', description: 'When you make a Charisma (Intimidation, Performance, or Persuasion) check, you can expend a Superiority Die and add it to the roll.' },
    { id: 'disarming-attack', name: 'Disarming Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; the target must succeed on a Strength save or drop one object it is holding.' },
    { id: 'distracting-strike', name: 'Distracting Strike', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; the next attack roll against the target by someone other than you has Advantage if made before the start of your next turn.' },
    { id: 'evasive-footwork', name: 'Evasive Footwork', description: 'As a Bonus Action, expend a Superiority Die and take the Disengage action; roll the die and add it to your AC until the start of your next turn.' },
    { id: 'feinting-attack', name: 'Feinting Attack', description: 'As a Bonus Action, expend a Superiority Die to feint against a creature within 5 feet: you have Advantage on your next attack roll against it this turn and add the die to that attack\'s damage if it hits.' },
    { id: 'goading-attack', name: 'Goading Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; the target must succeed on a Wisdom save or have Disadvantage on attack rolls against targets other than you until the end of your next turn.' },
    { id: 'lunging-attack', name: 'Lunging Attack', description: 'As a Bonus Action, expend a Superiority Die and take the Dash action; if you then hit with a melee attack this turn after moving at least 5 feet in a straight line, add the die to the damage.' },
    { id: 'maneuvering-attack', name: 'Maneuvering Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage and choose an ally who can see or hear you; it can use its Reaction to move up to half its Speed without provoking Opportunity Attacks from the target.' },
    { id: 'menacing-attack', name: 'Menacing Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; the target must succeed on a Wisdom save or have the Frightened condition until the end of your next turn.' },
    { id: 'parry', name: 'Parry', description: 'When another creature damages you with a melee attack roll, use your Reaction and expend a Superiority Die to reduce the damage by the roll plus your Strength or Dexterity modifier.' },
    { id: 'precision-attack', name: 'Precision Attack', description: 'When you miss with an attack roll, expend a Superiority Die and add it to the roll, possibly turning the miss into a hit.' },
    { id: 'pushing-attack', name: 'Pushing Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; a Large or smaller target must succeed on a Strength save or be pushed up to 15 feet away from you.' },
    { id: 'rally', name: 'Rally', description: 'As a Bonus Action, expend a Superiority Die to bolster an ally who can see or hear you: it gains Temporary Hit Points equal to the roll plus half your Fighter level (round down).' },
    { id: 'riposte', name: 'Riposte', description: 'When a creature misses you with a melee attack roll, use your Reaction and expend a Superiority Die to make a melee attack against it; on a hit, add the die to the damage.' },
    { id: 'sweeping-attack', name: 'Sweeping Attack', description: 'When you hit a creature with a melee attack roll, expend a Superiority Die to attack another creature within 5 feet of the first and within your reach; if the original roll would hit it, it takes damage equal to the die roll (same type as the original attack).' },
    { id: 'tactical-assessment', name: 'Tactical Assessment', description: 'When you make an Intelligence (History or Investigation) or Wisdom (Insight) check, you can expend a Superiority Die and add it to the roll.' },
    { id: 'trip-attack', name: 'Trip Attack', description: 'When you hit with an attack roll, expend a Superiority Die to add it to the damage; a Large or smaller target must succeed on a Strength save or have the Prone condition.' },
];

const DIVINE_ORDER: ChoiceOption[] = [
    { id: 'protector', name: 'Protector', description: 'Trained for battle, you gain proficiency with Martial weapons and training with Heavy armor.' },
    { id: 'thaumaturge', name: 'Thaumaturge', description: 'You know one extra cantrip from the Cleric spell list, and you gain a bonus to Intelligence (Arcana or Religion) checks equal to your Wisdom modifier (minimum +1).' },
];
const PRIMAL_ORDER: ChoiceOption[] = [
    { id: 'magician', name: 'Magician', description: 'You know one extra cantrip from the Druid spell list, and you gain a bonus to Intelligence (Arcana or Nature) checks equal to your Wisdom modifier (minimum +1).' },
    { id: 'warden', name: 'Warden', description: 'Trained for battle, you gain proficiency with Martial weapons and training with Medium armor.' },
];
const BLESSED_STRIKES: ChoiceOption[] = [
    { id: 'divine-strike', name: 'Divine Strike', description: 'Once on each of your turns when you hit a creature with an attack roll using a weapon, you can cause the target to take an extra 1d8 Necrotic or Radiant damage (your choice). Improves to 2d8 at Cleric level 14.' },
    { id: 'potent-spellcasting', name: 'Potent Spellcasting', description: 'Add your Wisdom modifier to the damage you deal with any Cleric cantrip. At Cleric level 14, damaging a creature with a Cleric cantrip lets you grant yourself or a creature within 60 feet Temporary Hit Points equal to twice your Wisdom modifier.' },
];
const ELEMENTAL_FURY: ChoiceOption[] = [
    { id: 'potent-spellcasting', name: 'Potent Spellcasting', description: 'Add your Wisdom modifier to the damage you deal with any Druid cantrip. At Druid level 15, Druid cantrips with a range of 10 feet or greater gain 300 feet of range.' },
    { id: 'primal-strike', name: 'Primal Strike', description: "Once on each of your turns when you hit a creature with an attack roll using a weapon or a Beast form's attack in Wild Shape, you can deal an extra 1d8 Cold, Fire, Lightning, or Thunder damage (choose when you hit). Improves to 2d8 at Druid level 15." },
];
const HUNTERS_PREY: ChoiceOption[] = [
    { id: 'colossus-slayer', name: 'Colossus Slayer', description: "Once per turn when you hit a creature that is missing any of its Hit Points with a weapon, it takes an extra 1d8 damage. You can switch this option when you finish a Short or Long Rest." },
    { id: 'horde-breaker', name: 'Horde Breaker', description: "Once on each of your turns when you attack with a weapon, you can make another attack with the same weapon against a different creature within 5 feet of the original target and within the weapon's range. You can switch this option when you finish a Short or Long Rest." },
];
const DEFENSIVE_TACTICS: ChoiceOption[] = [
    { id: 'escape-the-horde', name: 'Escape the Horde', description: 'Opportunity Attacks have Disadvantage against you. You can switch this option when you finish a Short or Long Rest.' },
    { id: 'multiattack-defense', name: 'Multiattack Defense', description: 'When a creature hits you with an attack roll, that creature has Disadvantage on all other attack rolls against you this turn. You can switch this option when you finish a Short or Long Rest.' },
];

const BARBARIAN_SKILLS = ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'];

// ---------------------------------------------------------------------------
// Schedules
// ---------------------------------------------------------------------------

/** Total Eldritch Invocations known at each Warlock level (2024 Warlock table). */
export const INVOCATIONS_BY_LEVEL = [1, 3, 3, 3, 5, 5, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10, 10, 10];
/** Weapon Mastery weapons by class level (classes without an entry have none). */
export const WEAPON_MASTERY_BY_LEVEL: Record<string, number[]> = {
    barbarian: [2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    fighter: [3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6],
    paladin: Array(20).fill(2),
    ranger: Array(20).fill(2),
    rogue: Array(20).fill(2),
};
const atLevel = (table: number[], level: number) => (level >= 1 ? table[Math.min(level, 20) - 1] ?? 0 : 0);
const gained = (table: number[], level: number) => atLevel(table, level) - atLevel(table, level - 1);

const MYSTIC_ARCANUM_LEVELS: Record<number, number> = { 11: 6, 13: 7, 15: 8, 17: 9 };
const METAMAGIC_LEVELS: Record<number, number> = { 2: 2, 10: 2, 17: 2 };
const MANEUVER_LEVELS: Record<number, number> = { 3: 3, 7: 2, 10: 2, 15: 2 };

/**
 * The choices a class asks for when it reaches `classLevel` (with this subclass,
 * if it has one). Level 1 choices apply when creating a character or multiclassing.
 */
export function getClassChoices(classId: string, classLevel: number, subclassId?: string): ClassChoice[] {
    const cid = classId.toLowerCase();
    const sub = (subclassId || '').toLowerCase();
    const out: ClassChoice[] = [];

    const mastery = WEAPON_MASTERY_BY_LEVEL[cid];
    if (mastery && gained(mastery, classLevel) > 0) {
        out.push({
            key: `${cid}:weapon-mastery`, classId: cid, kind: 'weaponMastery', count: gained(mastery, classLevel),
            title: 'Weapon Mastery',
            description: 'Choose kinds of weapons whose mastery properties you can use. You can change one choice when you finish a Long Rest.',
        });
    }

    const expertise = (count: number, description: string) => out.push({
        key: `${cid}:expertise`, classId: cid, kind: 'expertise', count, title: 'Expertise', description,
    });

    switch (cid) {
        case 'barbarian':
            if (classLevel === 3) out.push({
                key: 'barbarian:primal-knowledge', classId: cid, kind: 'skill', count: 1, skillList: BARBARIAN_SKILLS,
                title: 'Primal Knowledge', description: 'Gain proficiency in another skill from the Barbarian skill list.',
            });
            break;
        case 'bard':
            if (classLevel === 2 || classLevel === 9) expertise(2, 'Gain Expertise in two of your skill proficiencies.');
            break;
        case 'cleric':
            if (classLevel === 1) out.push({ key: 'cleric:divine-order', classId: cid, kind: 'option', count: 1, options: DIVINE_ORDER, title: 'Divine Order', featureLabel: 'Divine Order', description: 'Dedicate yourself to one of these sacred roles.' });
            if (classLevel === 7) out.push({ key: 'cleric:blessed-strikes', classId: cid, kind: 'option', count: 1, options: BLESSED_STRIKES, title: 'Blessed Strikes', featureLabel: 'Blessed Strikes', description: 'Divine power infuses you in battle. Choose one option.' });
            break;
        case 'druid':
            if (classLevel === 1) out.push({ key: 'druid:primal-order', classId: cid, kind: 'option', count: 1, options: PRIMAL_ORDER, title: 'Primal Order', featureLabel: 'Primal Order', description: 'Dedicate yourself to one of these sacred roles.' });
            if (classLevel === 7) out.push({ key: 'druid:elemental-fury', classId: cid, kind: 'option', count: 1, options: ELEMENTAL_FURY, title: 'Elemental Fury', featureLabel: 'Elemental Fury', description: 'The might of the elements flows through you. Choose one option.' });
            break;
        case 'fighter':
            if (sub === 'battle_master' && MANEUVER_LEVELS[classLevel]) out.push({
                key: 'fighter:maneuvers', classId: cid, kind: 'option', count: MANEUVER_LEVELS[classLevel], options: BATTLE_MASTER_MANEUVERS,
                title: 'Maneuvers', featureLabel: 'Maneuver', description: 'Learn Battle Master maneuvers, fueled by your Superiority Dice.',
            });
            break;
        case 'ranger':
            if (classLevel === 2) {
                expertise(1, 'Deft Explorer: gain Expertise in one of your skill proficiencies.');
                out.push({ key: 'ranger:languages', classId: cid, kind: 'language', count: 2, title: 'Deft Explorer: Languages', description: 'You learn two languages of your choice.' });
            }
            if (classLevel === 9) expertise(2, 'Gain Expertise in two of your skill proficiencies.');
            if (sub === 'hunter' && classLevel === 3) out.push({ key: 'ranger:hunters-prey', classId: cid, kind: 'option', count: 1, options: HUNTERS_PREY, title: "Hunter's Prey", featureLabel: "Hunter's Prey", description: 'Choose how you hunt your quarry.' });
            if (sub === 'hunter' && classLevel === 7) out.push({ key: 'ranger:defensive-tactics', classId: cid, kind: 'option', count: 1, options: DEFENSIVE_TACTICS, title: 'Defensive Tactics', featureLabel: 'Defensive Tactics', description: 'Choose a defensive technique.' });
            break;
        case 'rogue':
            if (classLevel === 1 || classLevel === 6) expertise(2, 'Gain Expertise in two of your skill proficiencies.');
            break;
        case 'sorcerer':
            if (METAMAGIC_LEVELS[classLevel]) out.push({
                key: 'sorcerer:metamagic', classId: cid, kind: 'option', count: METAMAGIC_LEVELS[classLevel], options: METAMAGIC_OPTIONS,
                title: 'Metamagic', featureLabel: 'Metamagic', description: 'Learn Metamagic options, fueled by your Sorcery Points.',
            });
            break;
        case 'warlock': {
            const newInvocations = gained(INVOCATIONS_BY_LEVEL, classLevel);
            if (newInvocations > 0) out.push({
                key: 'warlock:invocations', classId: cid, kind: 'option', count: newInvocations, options: ELDRITCH_INVOCATIONS,
                title: 'Eldritch Invocations', featureLabel: 'Eldritch Invocation', description: 'Learn Eldritch Invocations you meet the prerequisites for.',
            });
            const arcanum = MYSTIC_ARCANUM_LEVELS[classLevel];
            if (arcanum) out.push({
                key: `warlock:mystic-arcanum-${arcanum}`, classId: cid, kind: 'spell', count: 1, spell: { level: arcanum, list: 'warlock' },
                title: `Mystic Arcanum (level ${arcanum})`, featureLabel: `Mystic Arcanum (level ${arcanum})`,
                description: `Choose a level ${arcanum} Warlock spell. You can cast it once without a spell slot and regain the use when you finish a Long Rest.`,
            });
            break;
        }
        case 'wizard':
            if (classLevel === 18) {
                for (const lvl of [1, 2]) out.push({
                    key: `wizard:spell-mastery-${lvl}`, classId: cid, kind: 'spell', count: 1, spell: { level: lvl, fromSpellbook: true, actionOnly: true },
                    title: `Spell Mastery (level ${lvl})`, featureLabel: 'Spell Mastery',
                    description: `Choose a level ${lvl} spell in your spellbook with a casting time of an action. You always have it prepared and can cast it at its lowest level without a spell slot.`,
                });
            }
            if (classLevel === 20) out.push({
                key: 'wizard:signature-spells', classId: cid, kind: 'spell', count: 2, spell: { level: 3, fromSpellbook: true },
                title: 'Signature Spells', featureLabel: 'Signature Spell',
                description: 'Choose two level 3 spells in your spellbook. You always have them prepared and can cast each once at level 3 without a spell slot, regaining the uses on a Short or Long Rest.',
            });
            break;
    }
    return out;
}

/** Everything the character has picked so far (data.classChoices). */
export type ClassChoiceData = Record<string, string[]>;

export interface ChoiceContext {
    /** Warlock level after this level-up (for invocation prerequisites). */
    warlockLevel: number;
    /** Choices already made (data.classChoices). */
    existing: ClassChoiceData;
}

/** Whether an option can be picked now: prerequisites met and not already known (unless repeatable). */
export function isOptionAvailable(choice: ClassChoice, option: ChoiceOption, ctx: ChoiceContext, pickedNow: string[] = []): boolean {
    const known = [...(ctx.existing[choice.key] || []), ...pickedNow];
    if (!option.repeatable && known.includes(option.id)) return false;
    const pre = option.prerequisite;
    if (pre?.warlockLevel && ctx.warlockLevel < pre.warlockLevel) return false;
    if (pre?.invocation && !known.includes(pre.invocation)) return false;
    return true;
}

/** Weapons picked for Weapon Mastery across all classes (lowercase names), or null if never chosen. */
export function getWeaponMasteries(choices: ClassChoiceData | undefined): string[] | null {
    if (!choices) return null;
    const keys = Object.keys(choices).filter(k => k.endsWith(':weapon-mastery'));
    if (keys.length === 0) return null;
    return Array.from(new Set(keys.flatMap(k => choices[k] || []).map(w => w.toLowerCase())));
}

/** Extra cantrips known from Divine Order (Thaumaturge) / Primal Order (Magician). */
export function getBonusCantrips(choices: ClassChoiceData | undefined, classId: string): number {
    if (!choices) return 0;
    if (classId === 'cleric' && (choices['cleric:divine-order'] || []).includes('thaumaturge')) return 1;
    if (classId === 'druid' && (choices['druid:primal-order'] || []).includes('magician')) return 1;
    return 0;
}

/** Skill check bonuses (added to the total) from Thaumaturge / Magician: Wisdom modifier, minimum +1. */
export function getChoiceSkillBonuses(choices: ClassChoiceData | undefined, wisMod: number): Record<string, number> {
    const bonus = Math.max(1, wisMod);
    const out: Record<string, number> = {};
    if ((choices?.['cleric:divine-order'] || []).includes('thaumaturge')) { out.Arcana = bonus; out.Religion = bonus; }
    if ((choices?.['druid:primal-order'] || []).includes('magician')) { out.Arcana = Math.max(out.Arcana ?? 0, bonus); out.Nature = bonus; }
    return out;
}

export interface ChoicePayload {
    expertise: string[];
    skills: string[];
    languages: string[];
    /** Picks stored in data.classChoices, by choice key. */
    classChoices: ClassChoiceData;
    /** Features to add for option / spell picks. */
    features: { name: string; description: string; source: string; level: number }[];
}

/** Turn the picks for these choices into what the level-up (or creation) saves on the character. */
export function buildChoicePayload(
    choices: ClassChoice[],
    picks: Record<string, string[]>,
    spellNames: Record<string, string>,
    characterLevel: number
): ChoicePayload {
    const out: ChoicePayload = { expertise: [], skills: [], languages: [], classChoices: {}, features: [] };
    for (const choice of choices) {
        const selected = (picks[choice.key] || []).filter(Boolean);
        if (selected.length === 0) continue;
        const source = `Class: ${choice.classId.charAt(0).toUpperCase()}${choice.classId.slice(1)}`;
        switch (choice.kind) {
            case 'expertise': out.expertise.push(...selected); break;
            case 'skill': out.skills.push(...selected); break;
            case 'language': out.languages.push(...selected); break;
            case 'weaponMastery':
            case 'option':
            case 'spell':
                out.classChoices[choice.key] = [...(out.classChoices[choice.key] || []), ...selected];
                if (choice.kind === 'option') {
                    for (const id of selected) {
                        const opt = choice.options?.find(o => o.id === id);
                        if (opt) out.features.push({ name: `${choice.featureLabel}: ${opt.name}`, description: opt.description, source, level: characterLevel });
                    }
                } else if (choice.kind === 'spell') {
                    for (const id of selected) {
                        out.features.push({ name: `${choice.featureLabel}: ${spellNames[id] || id}`, description: choice.description, source, level: characterLevel });
                    }
                }
                break;
        }
    }
    return out;
}

/** Always-prepared spells granted by class choices (Mystic Arcanum, Spell Mastery, Signature Spells). */
export function getChoiceSpellIds(choices: ClassChoiceData | undefined): string[] {
    if (!choices) return [];
    return Object.entries(choices)
        .filter(([k]) => k.startsWith('warlock:mystic-arcanum-') || k.startsWith('wizard:spell-mastery-') || k === 'wizard:signature-spells')
        .flatMap(([, ids]) => ids);
}

/** Limited-use resources granted by class choices (Mystic Arcanum 1/Long Rest each, Signature Spells 1/Short Rest each). */
export function getChoiceResources(choices: ClassChoiceData | undefined, spellNames: Record<string, string>) {
    const out: Record<string, { name: string; current: number; max: number; resetType: 'short' | 'long'; description: string }> = {};
    for (const [key, ids] of Object.entries(choices || {})) {
        const arcanum = key.match(/^warlock:mystic-arcanum-(\d)$/);
        for (const id of ids) {
            const spell = spellNames[id] || id;
            if (arcanum) {
                const name = `Mystic Arcanum: ${spell}`;
                out[name] = { name, current: 1, max: 1, resetType: 'long', description: `Cast ${spell} (level ${arcanum[1]}) once without a spell slot. Regain on a Long Rest.` };
            } else if (key === 'wizard:signature-spells') {
                const name = `Signature Spell: ${spell}`;
                out[name] = { name, current: 1, max: 1, resetType: 'short', description: `Cast ${spell} once at level 3 without a spell slot. Regain on a Short or Long Rest.` };
            }
        }
    }
    return out;
}
