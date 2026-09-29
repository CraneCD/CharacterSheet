'use client';

import { useState } from 'react';
import { Button, EditableNumber, SectionHeader } from '@/app/components/ui';
import type { ClassResource, ResourceSource } from '@/lib/types';
import { useSheetLimitedUses } from './sections/ClassResourcesSection';
import UsesTracker, { resetLabel } from './UsesTracker';
import { useSheetReadOnly } from '../SheetReadOnly';

/** Psi Warrior ability that expends 1 Psionic Energy die */
const PSI_WARRIOR_ABILITIES = [
    { id: 'protective_field', name: 'Protective Field', desc: 'Reaction: when you or ally within 30 ft takes damage, expend 1 die to reduce damage by roll + INT mod (min 1).' },
    { id: 'psionic_strike', name: 'Psionic Strike', desc: 'Once per turn, after hitting with a weapon within 30 ft, expend 1 die to deal force damage = roll + INT mod.' },
    { id: 'telekinetic_movement', name: 'Telekinetic Movement', desc: 'Action: move Large or smaller object or willing creature up to 30 ft. Expend 1 die per use.' },
];

/** Counters from species traits and Heroic Inspiration saved before they were tagged */
const LEGACY_SPECIES = ['Heroic Inspiration', 'Blessing of the Raven Queen'];

const GROUPS: { source: ResourceSource; label: string }[] = [
    { source: 'class', label: 'Class' },
    { source: 'subclass', label: 'Subclass' },
    { source: 'species', label: 'Species' },
    { source: 'feat', label: 'Feats' },
    { source: 'custom', label: 'Custom' },
];

export function resourceSource(resource: ClassResource): ResourceSource {
    if (resource.source) return resource.source;
    return LEGACY_SPECIES.includes(resource.name) ? 'species' : 'class';
}

/** Every limited-use counter on the sheet (class resources, species traits, feats, subclass and custom features). */
export default function LimitedUsesCard() {
    const uses = useSheetLimitedUses();
    const readOnly = useSheetReadOnly();
    const [showDetails, setShowDetails] = useState(false);
    const entries = Object.entries(uses.resources).filter(([name]) => !(uses.psiWarrior && name === 'Telekinetic Movement'));
    if (entries.length === 0) return null;

    const groups = GROUPS
        .map((g) => ({ ...g, entries: entries.filter(([, res]) => resourceSource(res) === g.source) }))
        .filter((g) => g.entries.length > 0);

    return (
        <div className="card limited-uses">
            <SectionHeader
                title="Limited Uses"
                actions={
                    <Button variant="ghost" size="sm" className="no-print" aria-pressed={showDetails} onClick={() => setShowDetails((v) => !v)}>
                        {showDetails ? 'Hide details' : 'Show details'}
                    </Button>
                }
            />
            {groups.map((group) => (
                <section key={group.source} className="limited-uses-group" aria-label={groups.length > 1 ? group.label : undefined}>
                    {groups.length > 1 && <h4 className="limited-uses-group-title">{group.label}</h4>}
                    <ul className="limited-uses-list">
                        {group.entries.map(([name, resource]) => (
                            <li key={name} className="limited-use">
                                <div className="limited-use-head">
                                    <span className="limited-use-name">{resource.name}</span>
                                    {resource.feature && resource.feature !== resource.name && (
                                        <span className="limited-use-feature">{resource.feature}</span>
                                    )}
                                    <span className="reset-tag">{resetLabel(resource)}</span>
                                </div>
                                <div className="limited-use-body">
                                    <UsesTracker resource={resource} onChange={(current) => uses.setCurrent(name, current)} />
                                    {!readOnly && (
                                        <span className="limited-use-max no-print">
                                            <span className="limited-use-label">Max</span>
                                            <EditableNumber
                                                label={`${resource.name} maximum uses`}
                                                value={resource.max}
                                                min={0}
                                                max={999}
                                                onSave={(max) => uses.setMax(name, max)}
                                            />
                                            {uses.defaultMax[name] !== undefined && resource.max !== uses.defaultMax[name] && (
                                                <button
                                                    type="button"
                                                    className="btn btn-ghost btn-sm"
                                                    onClick={() => uses.setMax(name, uses.defaultMax[name], true)}
                                                    aria-label={`Reset ${resource.name} maximum to ${uses.defaultMax[name]}`}
                                                    title={`Differs from the calculated maximum. Reset to ${uses.defaultMax[name]}`}
                                                >
                                                    ↺ Reset
                                                </button>
                                            )}
                                        </span>
                                    )}
                                </div>
                                {showDetails && resource.description && <p className="limited-use-description">{resource.description}</p>}

                                {/* Psi Warrior: nested use buttons that each expend 1 Psionic Energy die */}
                                {uses.psiWarrior && name === 'Psionic Energy Dice' && !readOnly && (
                                    <div className="limited-use-options">
                                        <span className="limited-use-label">Use (expends 1 die):</span>
                                        {PSI_WARRIOR_ABILITIES.map(({ id, name: abilityName, desc }) => (
                                            <Button
                                                key={id}
                                                variant="secondary"
                                                size="sm"
                                                onClick={() => uses.setCurrent(name, resource.current - 1)}
                                                disabled={resource.current <= 0}
                                                title={desc}
                                            >
                                                {abilityName}
                                            </Button>
                                        ))}
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}
