'use client';

import { useEffect, useId, useState } from 'react';
import { api } from '@/lib/api';
import type { CharacterData } from '@/lib/types';
import { KOBOLD_SORCERY, SPECIES_SPELL_ABILITIES, SpeciesSpellEntry, SpellAbility } from '@/lib/wizardReference';
import { useSheetReadOnly } from '../../SheetReadOnly';
import { formatMod } from './format';

interface SpeciesSpellSettingsProps {
    speciesSpells: SpeciesSpellEntry[];
    ability: SpellAbility;
    /** Kobold Legacy (Draconic Sorcery): offer the Sorcerer cantrip picker */
    choosesCantrip: boolean;
    cantrip?: string | null;
    proficiencyBonus: number;
    modifiers: Record<string, number>;
    persistData: (updates: Partial<CharacterData>, errorMessage: string) => Promise<unknown>;
}

/** Species spells: the ability they use (Intelligence, Wisdom or Charisma) and the Kobold's cantrip. */
export default function SpeciesSpellSettings({ speciesSpells, ability, choosesCantrip, cantrip, proficiencyBonus, modifiers, persistData }: SpeciesSpellSettingsProps) {
    const readOnly = useSheetReadOnly();
    const abilityId = useId();
    const cantripId = useId();
    const [cantrips, setCantrips] = useState<{ id: string; name: string }[] | null>(null);

    useEffect(() => {
        if (!choosesCantrip) return;
        api.get('/reference/spells/summary')
            .then((list: { id: string; name: string; level: number; classes?: string[]; legacy?: boolean }[]) => setCantrips(
                (Array.isArray(list) ? list : [])
                    .filter((s) => s.level === 0 && !s.legacy && (s.classes || []).some((c) => c.toLowerCase() === 'sorcerer'))
                    .sort((a, b) => a.name.localeCompare(b.name)),
            ))
            .catch(() => setCantrips([]));
    }, [choosesCantrip]);

    const traits = Array.from(new Set(speciesSpells.map((e) => e.trait)));
    const mod = modifiers[ability] ?? 0;
    const abilityName = SPECIES_SPELL_ABILITIES.find((a) => a.id === ability)?.name ?? ability;
    const cantripName = cantrip ? (cantrips?.find((c) => c.id === cantrip)?.name ?? cantrip) : undefined;

    return (
        <section className="species-spell-settings" aria-label="Species spellcasting">
            <div className="species-spell-settings-title">
                <span className="section-title">Species spellcasting</span>
                {traits.length > 0 && <span className="species-spell-traits">{traits.join(', ')}</span>}
            </div>
            <div className="species-spell-settings-row">
                {readOnly ? (
                    <span>Ability: <strong>{abilityName}</strong></span>
                ) : (
                    <span className="species-spell-field">
                        <label htmlFor={abilityId}>Ability</label>
                        <select
                            id={abilityId}
                            className="input"
                            value={ability}
                            onChange={(e) => persistData({ speciesSpellAbility: e.target.value as SpellAbility }, "Couldn't change your species spellcasting ability")}
                        >
                            {SPECIES_SPELL_ABILITIES.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
                        </select>
                    </span>
                )}
                <span className="species-spell-numbers">
                    Save DC <strong>{8 + proficiencyBonus + mod}</strong> · Attack <strong>{formatMod(proficiencyBonus + mod)}</strong>
                </span>
            </div>
            {choosesCantrip && (
                <div className="species-spell-settings-row">
                    {readOnly ? (
                        <span>Draconic Sorcery cantrip: <strong>{cantripName ?? 'not chosen'}</strong></span>
                    ) : (
                        <span className="species-spell-field">
                            <label htmlFor={cantripId}>Draconic Sorcery cantrip</label>
                            <select
                                id={cantripId}
                                className="input"
                                value={cantrip ?? ''}
                                disabled={cantrips === null}
                                onChange={(e) => persistData(
                                    // Choosing a cantrip is choosing the Draconic Sorcery legacy
                                    e.target.value
                                        ? { speciesCantrip: e.target.value, speciesLineage: KOBOLD_SORCERY }
                                        : { speciesCantrip: null },
                                    "Couldn't save your Draconic Sorcery cantrip",
                                )}
                            >
                                <option value="">{cantrips === null ? 'Loading cantrips…' : 'Choose a Sorcerer cantrip'}</option>
                                {(cantrips ?? []).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </span>
                    )}
                </div>
            )}
        </section>
    );
}
