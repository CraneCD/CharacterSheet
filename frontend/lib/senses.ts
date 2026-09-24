/** Senses shown on the sheet: passive scores, Darkvision range and damage resistances from species traits. */

export interface TraitText {
    name: string;
    description?: string;
}

export interface PassiveScores {
    perception: number;
    investigation: number;
    insight: number;
}

/** Passive score = 10 + the skill's total. */
export function passiveScores(skills: { name: string; total: number }[]): PassiveScores {
    const total = (name: string) => skills.find((s) => s.name === name)?.total ?? 0;
    return {
        perception: 10 + total('Perception'),
        investigation: 10 + total('Investigation'),
        insight: 10 + total('Insight'),
    };
}

const feetIn = (text: string) => {
    const m = /(\d+)\s*(?:feet|ft)/i.exec(text);
    return m ? Number(m[1]) : undefined;
};

/**
 * Darkvision range in feet, or 0. Uses traits named for Darkvision ("Darkvision", "Superior
 * Darkvision", "Darkvision (120 ft.)") and lineage-specific traits ("Elven Lineage (Drow)");
 * generic lineage tables that list every option's range are ignored.
 */
export function darkvisionRange(traits: TraitText[]): number {
    let best = 0;
    for (const t of traits) {
        const name = t.name || '';
        const description = t.description || '';
        let range: number | undefined;
        if (/darkvision/i.test(name)) {
            range = feetIn(name) ?? feetIn(description) ?? 60;
        } else if (/\(.+\)/.test(name) && /darkvision/i.test(description)) {
            const sentence = /[^.]*darkvision[^.]*/i.exec(description)?.[0] ?? '';
            range = feetIn(sentence);
        }
        if (range && range > best) best = range;
    }
    return best;
}

const DAMAGE_TYPES = ['Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder'];

/**
 * Damage resistances from species traits, with the trait that grants each. A trait whose text
 * names several resistance types (a lineage table like Fiendish Legacy) is skipped; the chosen
 * lineage's own trait ("Fiendish Legacy (Abyssal)") supplies it instead.
 */
export function traitResistances(traits: TraitText[]): { type: string; source: string }[] {
    const out: { type: string; source: string }[] = [];
    for (const t of traits) {
        const found = new Set<string>();
        for (const m of (t.description || '').matchAll(/Resistance to ([A-Z][a-z]+)(?: and ([A-Z][a-z]+))? damage/g)) {
            [m[1], m[2]].forEach((type) => { if (type && DAMAGE_TYPES.includes(type)) found.add(type); });
        }
        const types = Array.from(found);
        // One type, or a pair granted together ("Resistance to Acid and Poison damage")
        const together = /Resistance to [A-Z][a-z]+ and [A-Z][a-z]+ damage/.test(t.description || '') && types.length === 2;
        if (types.length === 1 || together) {
            for (const type of types) {
                if (!out.some((r) => r.type === type)) out.push({ type, source: t.name });
            }
        }
    }
    return out;
}
