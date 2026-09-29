'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { CharacterItem } from '@/lib/types';
import { baseChoices, lootFieldsFor, lootStats, searchCatalogue } from '@/lib/lootCatalogue';
import { Button, Field } from '@/app/components/ui';

let cached: Promise<CharacterItem[]> | null = null;

/** The item list (/reference/base-items), fetched once per page load. */
export function useItemCatalogue(): { catalogue: CharacterItem[] | null; failed: boolean } {
    const [catalogue, setCatalogue] = useState<CharacterItem[] | null>(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
        let live = true;
        cached ??= api.get('/reference/base-items').then((data) => {
            const items: CharacterItem[] = Array.isArray(data) ? data : [];
            // Nothing came back: ask again next time
            if (items.length === 0) cached = null;
            return items;
        });
        cached.then((items) => live && setCatalogue(items)).catch(() => {
            cached = null;
            if (live) setFailed(true);
        });
        return () => {
            live = false;
        };
    }, []);
    return { catalogue, failed };
}

export type LootLink = ReturnType<typeof lootFieldsFor>;

const kindLabel = (item: CharacterItem) =>
    (item.category === 'magic-item' ? 'Magic item' : (item.category ?? 'item').replace('-', ' ')).replace(/^./, (c) => c.toUpperCase());

/**
 * Links a loot item to the item list: search, pick, and (for magic weapons and armor that could be
 * several things) choose what it's made from. Linked loot lands on sheets with its stats.
 */
export default function LootCatalogueField({ catalogue, failed, linked, autoFocus, onLink, onRebase, onUnlink }: {
    catalogue: CharacterItem[] | null;
    failed: boolean;
    linked: CharacterItem | null | undefined;
    autoFocus?: boolean;
    onLink: (link: LootLink) => void;
    onRebase: (link: LootLink) => void;
    onUnlink: () => void;
}) {
    const [search, setSearch] = useState('');

    if (linked) {
        const entry = catalogue?.find((i) => i.id === linked.baseItemId);
        const bases = entry && catalogue ? baseChoices(entry, catalogue) : [];
        const stats = lootStats(linked);
        return (
            <div className="loot-link">
                <div className="loot-link-head">
                    <span>
                        From the item list: <strong>{entry?.name ?? linked.name}</strong>
                        {stats && <span className="loot-link-stats"> · {stats}</span>}
                    </span>
                    <Button size="sm" variant="ghost" onClick={onUnlink}>Unlink</Button>
                </div>
                {entry && catalogue && bases.length > 0 && (
                    <Field label="Made from" hint="Leave it to the player to pick on their sheet, or choose it now.">
                        {(p) => (
                            <select
                                {...p}
                                className="input"
                                value={linked.baseName ?? ''}
                                onChange={(e) => onRebase(lootFieldsFor(entry, catalogue, bases.find((b) => b.name === e.target.value) ?? null))}
                            >
                                <option value="">The player chooses</option>
                                {bases.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
                            </select>
                        )}
                    </Field>
                )}
            </div>
        );
    }

    const results = catalogue ? searchCatalogue(catalogue, search) : [];
    return (
        <div className="loot-link">
            <Field label="Find in the item list" hint="Fills in the details. On a sheet it works like the real thing: attacks, AC, bonuses.">
                {(p) => (
                    <input
                        {...p}
                        type="search"
                        className="input"
                        placeholder={catalogue ? 'Longsword, +1 · Potion of Healing · Flame Tongue' : failed ? '' : 'Loading the item list…'}
                        disabled={!catalogue}
                        value={search}
                        autoFocus={autoFocus}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                )}
            </Field>
            {failed && <p className="field-hint">Couldn&apos;t load the item list. You can still describe the item yourself.</p>}
            {results.length > 0 && (
            <ul className="loot-link-results" aria-label="Matching items">
                {results.map((item) => {
                    const stats = lootStats(item);
                    const meta = [kindLabel(item), item.rarity, stats].filter(Boolean).join(' · ');
                    return (
                        <li key={item.id ?? item.name}>
                            <button
                                type="button"
                                className="choose-base-option"
                                onClick={() => {
                                    setSearch('');
                                    onLink(lootFieldsFor(item, catalogue!));
                                }}
                            >
                                <span className="choose-base-name">{item.name}</span>
                                <span className="choose-base-stats">{meta}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
            )}
            {search.trim() && catalogue && results.length === 0 && <p className="field-hint">Nothing called that. Describe it yourself below.</p>}
        </div>
    );
}
