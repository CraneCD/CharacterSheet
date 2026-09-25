'use client';

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Monster } from '@/lib/monsters';
import { describeError } from '@/app/components/ui';

/** SRD monsters plus the DM's custom ones, with helpers to keep the custom list current after edits. */
export function useMonsters() {
    const [srd, setSrd] = useState<Monster[]>([]);
    const [custom, setCustom] = useState<Monster[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const load = useCallback(() => {
        setLoading(true);
        setError('');
        Promise.all([api.get('/reference/monsters'), api.get('/monsters')])
            .then(([reference, mine]) => {
                setSrd(Array.isArray(reference) ? reference : []);
                setCustom(Array.isArray(mine) ? mine : []);
            })
            .catch((err) => setError(describeError("Couldn't load monsters", err)))
            .finally(() => setLoading(false));
    }, []);

    useEffect(load, [load]);

    const upsertCustom = useCallback((monster: Monster) => {
        setCustom((list) => [...list.filter((m) => m.id !== monster.id), monster].sort((a, b) => a.name.localeCompare(b.name)));
    }, []);
    const removeCustom = useCallback((id: string) => setCustom((list) => list.filter((m) => m.id !== id)), []);

    /** Find the stat block behind an encounter combatant. */
    const find = useCallback((id: string | undefined, source: 'srd' | 'custom' | undefined) => {
        if (!id) return undefined;
        return (source === 'custom' ? custom : srd).find((m) => m.id === id);
    }, [custom, srd]);

    return { srd, custom, all: [...custom, ...srd], loading, error, reload: load, upsertCustom, removeCustom, find };
}
