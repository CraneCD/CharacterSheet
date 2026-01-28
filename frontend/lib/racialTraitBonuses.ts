/**
 * Racial trait bonuses (skills, etc.) for 5e / 5.5e.
 * Used to derive skill proficiencies and other effects from race traits.
 */

/** Trait name → fixed skill proficiencies granted. */
const TRAIT_SKILLS: Record<string, string[]> = {
    'Keen Senses': ['Perception'],
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
export function getSkillProficienciesFromTraits(traitNames: string[]): string[] {
    const out: string[] = [];
    const seen = new Set<string>();
    for (const t of traitNames) {
        const key = t.split('(')[0].trim();
        const skills = TRAIT_SKILLS[key];
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
