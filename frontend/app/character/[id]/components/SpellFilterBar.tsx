'use client';

import { useId } from 'react';
import { EMPTY_SPELL_FILTERS, hasActiveSpellFilters, SpellFilters } from '@/lib/spellFilters';

interface SpellFilterBarProps {
    filters: SpellFilters;
    onChange: (filters: SpellFilters) => void;
    /** Levels present in the list (0 = cantrips). */
    levels: number[];
    schools: string[];
    /** Offer the "Prepared" toggle (not useful in the learn picker). */
    showPrepared?: boolean;
    shown: number;
    total: number;
    searchPlaceholder?: string;
    autoFocus?: boolean;
}

function levelLabel(level: number): string {
    return level === 0 ? 'Cantrips' : `Level ${level}`;
}

export default function SpellFilterBar({
    filters, onChange, levels, schools, showPrepared = true, shown, total, searchPlaceholder = 'Search spells', autoFocus = false,
}: SpellFilterBarProps) {
    const id = useId();
    const set = (patch: Partial<SpellFilters>) => onChange({ ...filters, ...patch });
    const toggles: { key: 'preparedOnly' | 'concentration' | 'ritual'; label: string }[] = [
        ...(showPrepared ? [{ key: 'preparedOnly' as const, label: 'Prepared' }] : []),
        { key: 'concentration', label: 'Concentration' },
        { key: 'ritual', label: 'Ritual' },
    ];
    const active = hasActiveSpellFilters(filters);

    return (
        <div className="spell-filters" role="search" aria-label="Filter spells">
            <div className="spell-filters-row">
                <label className="visually-hidden" htmlFor={`${id}-q`}>Search spells</label>
                <input
                    id={`${id}-q`}
                    type="search"
                    className="input"
                    placeholder={searchPlaceholder}
                    value={filters.query}
                    onChange={(e) => set({ query: e.target.value })}
                    autoFocus={autoFocus}
                />
                <label className="visually-hidden" htmlFor={`${id}-level`}>Spell level</label>
                <select
                    id={`${id}-level`}
                    className="input"
                    value={String(filters.level)}
                    onChange={(e) => set({ level: e.target.value === 'all' ? 'all' : Number(e.target.value) })}
                >
                    <option value="all">All levels</option>
                    {levels.map((l) => <option key={l} value={l}>{levelLabel(l)}</option>)}
                </select>
                <label className="visually-hidden" htmlFor={`${id}-school`}>School</label>
                <select
                    id={`${id}-school`}
                    className="input"
                    value={filters.school}
                    onChange={(e) => set({ school: e.target.value })}
                >
                    <option value="all">All schools</option>
                    {schools.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
            <div className="spell-filters-row">
                {toggles.map(({ key, label }) => (
                    <button
                        key={key}
                        type="button"
                        className="filter-chip"
                        aria-pressed={filters[key]}
                        onClick={() => set({ [key]: !filters[key] } as Partial<SpellFilters>)}
                    >
                        {label}
                    </button>
                ))}
                <span className="spell-filters-count" aria-live="polite">
                    {active ? `${shown} of ${total} spells` : `${total} spells`}
                </span>
                {active && (
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => onChange(EMPTY_SPELL_FILTERS)}>
                        Clear filters
                    </button>
                )}
            </div>
        </div>
    );
}
