/**
 * Racial trait bonuses (skills, etc.) for 5e / 5.5e.
 * Used to derive skill proficiencies and other effects from race traits.
 */

/** Trait name → fixed skill proficiencies granted. */
const TRAIT_SKILLS: Record<string, string[]> = {
    // 2024 Elf "Keen Senses" is a choice (Insight, Perception, or Survival) stored in the
    // character's skills; the Monsters of the Multiverse elves keep a fixed Perception.
    'Keen Senses (Perception)': ['Perception'],
    'Leporine Senses': ['Perception'],
    'Silent Feathers': ['Stealth'],
    'Sneaky': ['Stealth'],
    'Menacing': ['Intimidation'],
    'Natural Athlete': ['Athletics'],
    'Reveler': ['Performance', 'Persuasion'],
    "Cat's Talent": ['Perception', 'Stealth'],
    'Skill Versatility': [], // two of choice — caller must resolve
    'Versatile': [],         // feat/skill of choice
    'Skillful': [],         // one skill + one tool of choice
};

/**
 * Return skill proficiencies granted by these trait names (fixed only).
 * Does not include "choose one" / "choose two" traits.
 */
export function getSkillProficienciesFromTraits(traitNames: string[], opts?: { legacyKeenSenses?: boolean }): string[] {
    const out: string[] = [];
    const seen = new Set<string>();
    for (const t of traitNames) {
        // Characters created before the 2024 update got Perception from Keen Senses automatically.
        if (t === 'Keen Senses' && opts?.legacyKeenSenses) {
            if (!seen.has('Perception')) { seen.add('Perception'); out.push('Perception'); }
            continue;
        }
        const skills = TRAIT_SKILLS[t.trim()] ?? TRAIT_SKILLS[t.split('(')[0].trim()];
        if (skills) {
            for (const s of skills) {
                if (!seen.has(s)) {
                    seen.add(s);
                    out.push(s);
                }
            }
        }
    }
    return out;
}

/**
 * Whether the race has Dwarven Toughness (+1 HP per level).
 */
export function hasDwarvenToughness(traitNames: string[]): boolean {
    return traitNames.some(t => t.split('(')[0].trim() === 'Dwarven Toughness');
}

export function hasResourceful(traitNames: string[]): boolean {
    return traitNames.some(t => t.split('(')[0].trim() === 'Resourceful');
}

/** Shadar-Kai: Blessing of the Raven Queen (teleport uses = PB, long rest). */
export function hasBlessingOfTheRavenQueen(traitNames: string[]): boolean {
    return traitNames.some(t => t.split('(')[0].trim() === 'Blessing of the Raven Queen');
}

export function hasSkillful(traitNames: string[]): boolean {
    return traitNames.some(t => t.split('(')[0].trim() === 'Skillful');
}

export function hasVersatile(traitNames: string[]): boolean {
    return traitNames.some(t => t.split('(')[0].trim() === 'Versatile');
}

/** 2024 Elf Keen Senses: proficiency in Insight, Perception, or Survival (player's choice). */
export function hasKeenSensesChoice(traitNames: string[]): boolean {
    return traitNames.some(t => t.trim() === 'Keen Senses');
}
