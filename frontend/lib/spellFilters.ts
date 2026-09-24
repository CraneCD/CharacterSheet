/** Filters for the sheet's spell list and the learn/prepare picker. */

export interface SpellFilters {
    query: string;
    level: number | 'all';
    school: string | 'all';
    preparedOnly: boolean;
    concentration: boolean;
    ritual: boolean;
}

export const EMPTY_SPELL_FILTERS: SpellFilters = {
    query: '',
    level: 'all',
    school: 'all',
    preparedOnly: false,
    concentration: false,
    ritual: false,
};

/** The reference fields filters can look at (all optional: stored copies may lack them). */
export interface SpellDetails {
    name?: string;
    school?: string;
    description?: string;
    castingTime?: string;
    range?: string;
    components?: string;
    duration?: string;
    ritual?: boolean;
}

export function isConcentration(spell?: SpellDetails): boolean {
    return /concentration/i.test(spell?.duration || '');
}

export function hasActiveSpellFilters(f: SpellFilters): boolean {
    return f.query.trim() !== '' || f.level !== 'all' || f.school !== 'all' || f.preparedOnly || f.concentration || f.ritual;
}

/**
 * Whether a spell passes the filters. `entry` is what the list shows (name, level, school,
 * prepared); `details` is the full reference spell, used for text search, concentration and ritual.
 */
export function spellMatches(
    entry: { name: string; level: number; school?: string; prepared?: boolean },
    details: SpellDetails | undefined,
    f: SpellFilters
): boolean {
    if (f.level !== 'all' && entry.level !== f.level) return false;
    if (f.school !== 'all' && (entry.school || details?.school || '').toLowerCase() !== f.school.toLowerCase()) return false;
    if (f.preparedOnly && !entry.prepared) return false;
    if (f.concentration && !isConcentration(details)) return false;
    if (f.ritual && !details?.ritual) return false;
    const q = f.query.trim().toLowerCase();
    if (!q) return true;
    return [entry.name, entry.school, details?.description, details?.castingTime, details?.range, details?.components, details?.duration]
        .some((text) => (text || '').toLowerCase().includes(q));
}

/** Distinct schools, sorted, for the school filter. */
export function schoolsOf(spells: { school?: string }[]): string[] {
    return Array.from(new Set(spells.map((s) => s.school).filter((s): s is string => !!s))).sort((a, b) => a.localeCompare(b));
}
