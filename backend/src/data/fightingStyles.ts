// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export interface FightingStyle {
    id: string;
    name: string;
    description: string;
}

export const fightingStyles: FightingStyle[] = [
    {
        "id": "archery",
        "name": "Archery",
        "description": "You gain a +2 bonus to attack rolls you make with Ranged weapons."
    },
    {
        "id": "defense",
        "name": "Defense",
        "description": "While you're wearing Light, Medium, or Heavy armor, you gain a +1 bonus to Armor Class."
    },
    {
        "id": "dueling",
        "name": "Dueling",
        "description": "When you're holding a Melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon."
    },
    {
        "id": "great-weapon-fighting",
        "name": "Great Weapon Fighting",
        "description": "When you roll damage for an attack you make with a Melee weapon that you are holding with two hands, you can treat any 1 or 2 on a damage die as a 3. The weapon must have the Two-Handed or Versatile property to gain this benefit."
    },
    {
        "id": "protection",
        "name": "Protection",
        "description": "When a creature you can see attacks a target other than you that is within 5 feet of you, you can take a Reaction to interpose your Shield if you're holding one. You impose Disadvantage on the triggering attack roll and all other attack rolls against the target until the start of your next turn if you remain within 5 feet of the target."
    },
    {
        "id": "two-weapon-fighting",
        "name": "Two Weapon Fighting",
        "description": "When you make an extra attack as a result of using a weapon that has the Light property, you can add your ability modifier to the damage of that attack if you aren't already adding it to the damage."
    },
    {
        "id": "blind-fighting",
        "name": "Blind Fighting",
        "description": "You have Blindsight with a range of 10 feet."
    },
    {
        "id": "interception",
        "name": "Interception",
        "description": "When a creature you can see hits another creature within 5 feet of you with an attack roll, you can take a Reaction to reduce the damage dealt to the target by 1d10 plus your Proficiency Bonus. You must be holding a Shield or a Simple or Martial weapon to use this Reaction."
    },
    {
        "id": "thrown-weapon-fighting",
        "name": "Thrown Weapon Fighting",
        "description": "When you hit with a ranged attack roll using a weapon that has the Thrown property, you gain a +2 bonus to the damage roll."
    },
    {
        "id": "unarmed-fighting",
        "name": "Unarmed Fighting",
        "description": "When you hit with your Unarmed Strike and deal damage, you can deal Bludgeoning damage equal to 1d6 plus your Strength modifier instead of the normal damage of an Unarmed Strike. If you aren't holding any weapons or a Shield when you make the attack roll, the d6 becomes a d8. At the start of each of your turns, you can deal 1d4 Bludgeoning damage to one creature Grappled by you."
    }
];

/** Classes that get Fighting Style at level 1 (create wizard). */
export const FIGHTING_STYLE_LEVEL_1_CLASSES = ['fighter'];

/** Class feature "Fighting Style" by class and level. */
export const FIGHTING_STYLE_CLASS_LEVELS: { classId: string; level: number }[] = [
    { classId: 'fighter', level: 1 },
    { classId: 'ranger', level: 2 },
    { classId: 'paladin', level: 2 }
];

/** Subclass features that grant Fighting Style: { subclassId, level, options? }. options = restricted ids; omit = all. */
export const FIGHTING_STYLE_SUBCLASS_LEVELS: { subclassId: string; level: number; options?: string[] }[] = [
    { subclassId: 'champion', level: 7 }, // Additional Fighting Style (2024) – all options
    { subclassId: 'swords', level: 3, options: ['dueling', 'two-weapon-fighting'] } // College of Swords (legacy)
];
