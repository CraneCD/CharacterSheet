'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';
import { CharacterData, ClassResources } from '@/lib/types';
import { mergeBlessingOfTheRavenQueen, mergeHeroicInspiration, reconcileClassResources, RESOURCE_RULES_VERSION } from '@/lib/classResources';
import { calculateAllClassResources } from '@/lib/subclasses';
import { getChoiceResources } from '@/lib/classChoices';
import { hasBlessingOfTheRavenQueen, hasResourceful } from '@/lib/racialTraitBonuses';
import ClassResourcesManager from '../ClassResourcesManager';

interface ResolveInput {
    /** Sheet data (typed loosely: older characters carry fields the CharacterData type doesn't list). */
    data: Partial<CharacterData> & Record<string, any>;
    classLevels: Record<string, number>;
    subclassMap: Record<string, string>;
    abilityScores: Record<string, number>;
    racialTraits: string[];
    level: number;
    /** Names of class-choice spells (Mystic Arcanum, Signature Spells); null while loading. */
    choiceSpellNames: Record<string, string> | null;
    hasChoiceSpells: boolean;
}

/**
 * The resources to show, plus whether the stored ones need updating: first use, a
 * 2014-rules migration, species extras (Heroic Inspiration, Blessing of the Raven Queen),
 * class-choice resources, and Psi Warrior's Telekinetic Movement (shown under Psionic Energy).
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

    const needHeroic = hasResourceful(racialTraits);
    if (needHeroic && !resources?.['Heroic Inspiration']) changed = true;
    resources = mergeHeroicInspiration(resources || {}, needHeroic);

    const needBlessing = hasBlessingOfTheRavenQueen(racialTraits);
    if (needBlessing && !resources?.['Blessing of the Raven Queen']) changed = true;
    resources = mergeBlessingOfTheRavenQueen(resources || {}, needBlessing, level);

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

interface ClassResourcesSectionProps extends ResolveInput {
    characterId: string;
    onUpdate: (updates: Partial<CharacterData>) => void;
}

export default function ClassResourcesSection({ characterId, onUpdate, ...input }: ClassResourcesSectionProps) {
    const { resources, psiWarrior, needsSave } = resolveClassResources(input);
    const saveKey = needsSave ? JSON.stringify(resources) : '';

    useEffect(() => {
        if (!saveKey) return;
        const toSave = JSON.parse(saveKey) as ClassResources;
        onUpdate({ classResources: toSave, classResourcesRules: RESOURCE_RULES_VERSION });
        api.patch(`/characters/${characterId}/data`, { classResources: toSave, classResourcesRules: RESOURCE_RULES_VERSION })
            .catch((err) => console.error('Failed to persist class resources', err));
        // Save once per distinct change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveKey, characterId]);

    return (
        <ClassResourcesManager
            characterId={characterId}
            initialResources={resources}
            psiWarrior={psiWarrior}
            onUpdate={(newResources) => onUpdate({ classResources: newResources })}
        />
    );
}
