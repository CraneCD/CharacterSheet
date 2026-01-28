export interface FightingStyle {
    id: string;
    name: string;
    description: string;
}

export const fightingStyles: FightingStyle[] = [
    {
        id: 'archery',
        name: 'Archery',
        description: 'You gain a +2 bonus to attack rolls you make with ranged weapons.'
    },
    {
        id: 'defense',
        name: 'Defense',
        description: 'While you are wearing armor, you gain a +1 bonus to AC.'
    },
    {
        id: 'dueling',
        name: 'Dueling',
        description: 'When you are wielding a melee weapon in one hand and no other weapons, you gain a +2 bonus to damage rolls with that weapon.'
    },
    {
        id: 'great-weapon-fighting',
        name: 'Great Weapon Fighting',
        description: 'When you roll a 1 or 2 on a damage die for an attack you make with a melee weapon that you are wielding with two hands, you can reroll the die and must use the new roll. The weapon must have the two-handed or versatile property for you to gain this benefit.'
    },
    {
        id: 'protection',
        name: 'Protection',
        description: 'When a creature you can see attacks a target other than you that is within 5 feet of you, you can use your reaction to impose disadvantage on the attack roll. You must be wielding a shield.'
    },
    {
        id: 'two-weapon-fighting',
        name: 'Two-Weapon Fighting',
        description: 'When you engage in two-weapon fighting, you can add your ability modifier to the damage of the second attack.'
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
    { subclassId: 'champion', level: 10 }, // Additional Fighting Style – all options
    { subclassId: 'soulknife', level: 3, options: ['dueling', 'two-weapon-fighting'] }
];
