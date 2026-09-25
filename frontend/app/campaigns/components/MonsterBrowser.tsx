'use client';

import { useId, useMemo, useState } from 'react';
import { CR_OPTIONS, crValue, filterMonsters, Monster, monsterTypes, monsterXp } from '@/lib/monsters';

interface MonsterBrowserProps {
    monsters: Monster[];
    /** Row buttons, e.g. View / Add */
    renderActions: (monster: Monster) => React.ReactNode;
    /** Accessible name for the list */
    label: string;
}

const MAX_SHOWN = 80;

/** Search the SRD and custom monsters by name or type, within a CR range. */
export default function MonsterBrowser({ monsters, renderActions, label }: MonsterBrowserProps) {
    const [query, setQuery] = useState('');
    const [type, setType] = useState('');
    const [minCr, setMinCr] = useState('');
    const [maxCr, setMaxCr] = useState('');
    const [source, setSource] = useState<'all' | 'srd' | 'custom'>('all');
    const id = useId();

    const types = useMemo(() => monsterTypes(monsters), [monsters]);
    const results = useMemo(() => filterMonsters(
        monsters.filter((m) => source === 'all' || (source === 'custom' ? m.source === 'custom' : m.source !== 'custom')),
        { query, type, minCr: minCr ? crValue(minCr) : undefined, maxCr: maxCr ? crValue(maxCr) : undefined },
    ), [monsters, query, type, minCr, maxCr, source]);

    return (
        <div className="monster-browser">
            <div className="monster-filters">
                <label className="visually-hidden" htmlFor={`${id}-q`}>Search monsters</label>
                <input id={`${id}-q`} type="search" className="input" placeholder="Search by name or type" value={query} onChange={(e) => setQuery(e.target.value)} />
                <label className="monster-filter">
                    <span>Type</span>
                    <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="">Any</option>
                        {types.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                </label>
                <label className="monster-filter">
                    <span>CR from</span>
                    <select className="input" value={minCr} onChange={(e) => setMinCr(e.target.value)}>
                        <option value="">Any</option>
                        {CR_OPTIONS.map((cr) => <option key={cr} value={cr}>{cr}</option>)}
                    </select>
                </label>
                <label className="monster-filter">
                    <span>to</span>
                    <select className="input" value={maxCr} onChange={(e) => setMaxCr(e.target.value)}>
                        <option value="">Any</option>
                        {CR_OPTIONS.map((cr) => <option key={cr} value={cr}>{cr}</option>)}
                    </select>
                </label>
                <label className="monster-filter">
                    <span>From</span>
                    <select className="input" value={source} onChange={(e) => setSource(e.target.value as typeof source)}>
                        <option value="all">All</option>
                        <option value="srd">SRD</option>
                        <option value="custom">My monsters</option>
                    </select>
                </label>
            </div>
            <p className="field-hint" aria-live="polite">{results.length === 1 ? '1 monster' : `${results.length} monsters`}{results.length > MAX_SHOWN ? `, showing the first ${MAX_SHOWN}` : ''}</p>
            <ul className="monster-list" aria-label={label}>
                {results.slice(0, MAX_SHOWN).map((m) => (
                    <li key={`${m.source ?? 'srd'}-${m.id}`} className="monster-row">
                        <span className="monster-row-main">
                            <span className="monster-row-name">
                                {m.name}
                                {m.source === 'custom' && <span className="custom-badge">Custom</span>}
                            </span>
                            <span className="monster-row-meta">CR {m.cr} · {monsterXp(m).toLocaleString()} XP · {m.size} {m.type} · AC {m.ac} · HP {m.hp}</span>
                        </span>
                        <span className="monster-row-actions">{renderActions(m)}</span>
                    </li>
                ))}
                {results.length === 0 && <li className="empty-note">No monsters match.</li>}
            </ul>
        </div>
    );
}
