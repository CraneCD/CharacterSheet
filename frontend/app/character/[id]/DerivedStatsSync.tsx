'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { DerivedStats, derivedStatsChanged } from '@/lib/campaigns';

interface DerivedStatsSyncProps {
    characterId: string;
    /** What the sheet just worked out */
    stats: DerivedStats;
    /** What's saved on the character (`data.derivedStats`) */
    saved: unknown;
    onSaved: (stats: DerivedStats) => void;
}

/**
 * Keeps `data.derivedStats` in step with the sheet so the DM's party view shows
 * the real AC and passives. Renders nothing; only writes when a number changed.
 * A failed write isn't worth a toast (nothing the player did failed): the next
 * change retries it.
 */
export default function DerivedStatsSync({ characterId, stats, saved, onSaved }: DerivedStatsSyncProps) {
    const changed = derivedStatsChanged(saved, stats);
    const key = JSON.stringify(stats);
    useEffect(() => {
        if (!changed) return;
        const next = JSON.parse(key) as DerivedStats;
        const timer = setTimeout(() => {
            api.patch(`/characters/${characterId}/data`, { derivedStats: next })
                .then(() => onSaved(next))
                .catch((err) => console.warn('Could not save derived stats', err));
        }, 1500);
        return () => clearTimeout(timer);
    }, [changed, key, characterId, onSaved]);
    return null;
}
