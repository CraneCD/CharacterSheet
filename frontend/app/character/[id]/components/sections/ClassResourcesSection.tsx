'use client';

import { createContext, useCallback, useContext, useEffect, useRef } from 'react';
import { api } from '@/lib/api';
import { CharacterData, ClassResource, ClassResources } from '@/lib/types';
import { reconcileClassResources, RESOURCE_RULES_VERSION } from '@/lib/classResources';
import { calculateAllClassResources } from '@/lib/subclasses';
import { getChoiceResources } from '@/lib/classChoices';
import { computeFeatureUses, computeMagicInitiateUses, computeSpeciesSpellUses, MAGIC_INITIATE, mergeFeatureUses } from '@/lib/featureUses';
import type { SpeciesSpellEntry } from '@/lib/wizardReference';
import { useOptimisticSave } from '@/app/components/ui';

interface ResolveInput {
    /** Sheet data (typed loosely: older characters carry fields the CharacterData type doesn't list). */
    data: Partial<CharacterData> & Record<string, any>;
    classLevels: Record<string, number>;
    subclassMap: Record<string, string>;
    abilityScores: Record<string, number>;
    racialTraits: string[];
    level: number;
    /** Spell names by id, for class-choice spells (Mystic Arcanum, Signature Spells) and species free casts; null while loading. */
    choiceSpellNames: Record<string, string> | null;
    hasChoiceSpells: boolean;
    /** Stored features plus the current class/subclass features, for trait, feat and subclass uses */
    features?: Array<{ name?: string }>;
    /** Ability modifiers after feature increases (defaults to the raw scores') */
    modifiers?: Record<string, number>;
    /** Spells from the species (free casts once per Long Rest, ...) */
    speciesSpells?: SpeciesSpellEntry[];
    /** Magic Initiate's level 1 spell (one free cast per Long Rest) */
    magicInitiateSpell?: string | null;
}

const abilityMod = (score: number | undefined) => Math.floor(((score ?? 10) - 10) / 2);

/**
 * The counters to show, plus whether the stored ones need updating: first use, a 2014-rules
 * migration, uses of species traits, feats and subclass features (Breath Weapon, Luck Points,
 * Portent, ...), class-choice resources, and Psi Warrior's Telekinetic Movement (shown under
 * Psionic Energy).
 */
export function resolveClassResources(input: ResolveInput): { resources: ClassResources; psiWarrior: boolean; needsSave: boolean } {
    const { data, classLevels, subclassMap, abilityScores, racialTraits, level, choiceSpellNames, hasChoiceSpells } = input;
    let resources = data.classResources as ClassResources | undefined;
    let changed = false;

    if (!resources || Object.keys(resources).length === 0) {
        resources = calculateAllClassResources(classLevels, subclassMap, abilityScores);
        if (Object.keys(resources).length > 0) changed = true;
    } else if (data.classResourcesRules !== RESOURCE_RULES_VERSION) {
        // One-time migration of resources stored under the 2014 rules (e.g. unlimited Rage at 20, Ki Points)
        resources = reconcileClassResources(resources, calculateAllClassResources(classLevels, subclassMap, abilityScores));
        changed = true;
    }

    // Species traits (Heroic Inspiration, Breath Weapon, ...), feats and subclass features
    const modifiers = input.modifiers ?? Object.fromEntries(Object.entries(abilityScores).map(([k, v]) => [k, abilityMod(v)]));
    const proficiencyBonus = Math.ceil(level / 4) + 1;
    const featureUses = computeFeatureUses({
        features: input.features ?? [],
        racialTraits,
        level,
        proficiencyBonus,
        modifiers,
    });
    // Free casts (species spells, Magic Initiate) are named after the spell: until the names load, keep what's stored
    const spellUses: ClassResources = {};
    if ((input.speciesSpells ?? []).some((e) => e.free) || input.magicInitiateSpell) {
        if (choiceSpellNames) {
            Object.assign(
                spellUses,
                computeSpeciesSpellUses(input.speciesSpells ?? [], level, proficiencyBonus, choiceSpellNames),
                computeMagicInitiateUses(input.magicInitiateSpell, choiceSpellNames, data.magicInitiateSpell1Used),
            );
        } else {
            for (const [name, res] of Object.entries(resources || {})) if (res?.spellId) spellUses[name] = res;
        }
    }
    const merged = mergeFeatureUses(resources || {}, { ...featureUses, ...spellUses });
    resources = merged.resources;
    if (merged.changed) changed = true;

    // Mystic Arcanum / Signature Spells uses, once the spell names are known
    if (choiceSpellNames || !hasChoiceSpells) {
        const fromChoices = getChoiceResources(data.classChoices, choiceSpellNames || {});
        const next: ClassResources = {};
        for (const [name, res] of Object.entries(resources || {})) {
            const fromChoice = name.startsWith('Mystic Arcanum: ') || name.startsWith('Signature Spell: ');
            if (!fromChoice || fromChoices[name]) next[name] = res; else changed = true;
        }
        for (const [name, res] of Object.entries(fromChoices)) {
            if (!next[name]) { next[name] = res; changed = true; }
        }
        resources = next;
    }

    const psiWarrior = ['psi_warrior', 'psi warrior'].includes(subclassMap.fighter || '') && (classLevels.fighter ?? 0) >= 3;
    if (psiWarrior && resources['Telekinetic Movement']) {
        const { 'Telekinetic Movement': _removed, ...rest } = resources;
        resources = rest;
        changed = true;
    }

    return { resources, psiWarrior, needsSave: changed && Object.keys(resources).length > 0 };
}

/** The calculated maximum uses of each resource, ignoring any maximums edited by hand. */
export function defaultResourceMaximums(input: ResolveInput): Record<string, number> {
    const { resources } = resolveClassResources({ ...input, data: { ...input.data, classResources: undefined } });
    return Object.fromEntries(Object.entries(resources).map(([name, res]) => [name, res.max]));
}

/** A counter in the shape the server accepts (older stored ones can miss a reset type or be fractional). */
function storable(res: ClassResource): ClassResource {
    const max = Math.max(0, Math.min(999, Math.round(Number(res.max) || 0)));
    return {
        ...res,
        max,
        current: Math.max(0, Math.min(max, Math.round(Number(res.current) || 0))),
        resetType: res.resetType === 'short' || res.resetType === 'none' ? res.resetType : 'long',
        ...(res.description !== undefined && { description: String(res.description).slice(0, 5000) }),
    };
}

export interface LimitedUses {
    resources: ClassResources;
    psiWarrior: boolean;
    /** Calculated maximum per counter, for "Reset" after a hand edit */
    defaultMax: Record<string, number>;
    /** Spend or regain uses (clamped to 0..max) */
    setCurrent: (name: string, current: number) => void;
    /** Change the maximum by hand, or back to the calculated one with `reset` */
    setMax: (name: string, max: number, reset?: boolean) => void;
    /** Add or replace one counter (custom feature uses) */
    upsert: (resource: ClassResource) => Promise<unknown>;
    remove: (name: string) => Promise<unknown>;
}

interface UseLimitedUsesInput extends ResolveInput {
    characterId: string;
    /** The DM's view: show the counters, never save them */
    readOnly?: boolean;
    /** Updates local sheet data (no request) */
    onUpdate: (updates: Partial<CharacterData>) => void;
}

/**
 * Every limited-use counter on the sheet (class resources and feature uses), shared by the Limited
 * Uses and Features & Traits cards. Changes show at once and roll back with a toast if saving fails.
 */
export function useLimitedUses({ characterId, onUpdate, readOnly = false, ...input }: UseLimitedUsesInput): LimitedUses {
    const optimisticSave = useOptimisticSave();
    const { resources, psiWarrior, needsSave } = resolveClassResources(input);
    // Magic Initiate's old used/unused flag is folded into its counter; clear it once the counter exists
    const clearLegacyMagicInitiate = input.data.magicInitiateSpell1Used != null
        && Object.values(resources).some((r) => r.feature === MAGIC_INITIATE);
    const saveKey = (needsSave || clearLegacyMagicInitiate) && !readOnly ? JSON.stringify(resources) : '';
    // Latest counters for the callbacks (they run after renders that may have changed them)
    const latest = useRef(resources);
    latest.current = resources;

    useEffect(() => {
        if (!saveKey) return;
        const toSave = JSON.parse(saveKey) as ClassResources;
        const updates: Partial<CharacterData> = { classResources: toSave, classResourcesRules: RESOURCE_RULES_VERSION };
        if (clearLegacyMagicInitiate) updates.magicInitiateSpell1Used = null;
        onUpdate(updates);
        api.patch(`/characters/${characterId}/data`, updates)
            .catch((err) => console.error('Failed to persist class resources', err));
        // Save once per distinct change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveKey, characterId]);

    const change = useCallback((next: ClassResources, request: () => Promise<unknown>, errorMessage: string) => {
        const previous = latest.current;
        return optimisticSave({
            // Update the ref too, so a second change right after this one builds on it
            apply: () => { latest.current = next; onUpdate({ classResources: next }); },
            rollback: () => { latest.current = previous; onUpdate({ classResources: previous }); },
            request,
            errorMessage,
        });
    }, [optimisticSave, onUpdate]);

    const setCurrent = useCallback((name: string, current: number) => {
        const res = latest.current[name];
        if (!res) return;
        const value = Math.max(0, Math.min(res.max, Math.round(current)));
        if (value === res.current) return;
        const next = { ...latest.current, [name]: { ...res, current: value } };
        change(next, () => api.patch(`/characters/${characterId}/class-resources`, { resourceName: name, current: value }),
            `Couldn't update ${res.name}`);
    }, [change, characterId]);

    const setMax = useCallback((name: string, max: number, reset = false) => {
        const res = latest.current[name];
        if (!res) return;
        const value = Math.max(0, Math.min(999, Math.round(max)));
        const updated: ClassResource = { ...res, max: value, current: Math.min(res.current, value) };
        if (reset) delete updated.maxEdited; else updated.maxEdited = true;
        const next = { ...latest.current, [name]: updated };
        change(next, () => api.patch(`/characters/${characterId}/class-resources`, { resourceName: name, resource: storable(updated) }),
            reset ? "Couldn't reset maximum uses" : "Couldn't update maximum uses");
    }, [change, characterId]);

    const upsert = useCallback((resource: ClassResource) => {
        const next = { ...latest.current, [resource.name]: resource };
        return change(next, () => api.patch(`/characters/${characterId}/class-resources`, { resourceName: resource.name, resource: storable(resource) }),
            `Couldn't save uses for ${resource.name}`);
    }, [change, characterId]);

    const remove = useCallback((name: string) => {
        if (!latest.current[name]) return Promise.resolve(undefined);
        const { [name]: _removed, ...next } = latest.current;
        return change(next, () => api.patch(`/characters/${characterId}/class-resources`, { resourceName: name, remove: true }),
            `Couldn't remove uses for ${name}`);
    }, [change, characterId]);

    return { resources, psiWarrior, defaultMax: defaultResourceMaximums(input), setCurrent, setMax, upsert, remove };
}

const LimitedUsesContext = createContext<LimitedUses | null>(null);

/** Shares the sheet's counters with the Limited Uses, Features & Traits and Actions cards. */
export function LimitedUsesProvider({ children, ...input }: UseLimitedUsesInput & { children: React.ReactNode }) {
    const uses = useLimitedUses(input);
    return <LimitedUsesContext.Provider value={uses}>{children}</LimitedUsesContext.Provider>;
}

export function useSheetLimitedUses(): LimitedUses {
    const uses = useContext(LimitedUsesContext);
    if (!uses) throw new Error('useSheetLimitedUses must be used inside LimitedUsesProvider');
    return uses;
}

/** The sheet's counters, or null outside the sheet (e.g. component tests) */
export function useOptionalSheetLimitedUses(): LimitedUses | null {
    return useContext(LimitedUsesContext);
}
