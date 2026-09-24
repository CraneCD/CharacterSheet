'use client';

import { api } from '@/lib/api';
import { CharacterData } from '@/lib/types';
import { getBonusCantrips, getChoiceSpellIds } from '@/lib/classChoices';
import { SpellcastingSetup } from '@/lib/spellcastingSetup';
import { describeError, useToast } from '@/app/components/ui';
import SpellManager from '../SpellManager';
import { formatMod } from './format';

interface SpellcastingSectionProps {
    character: any;
    setup: SpellcastingSetup;
    level: number;
    proficiencyBonus: number;
    modifiers: Record<string, number>;
    abilityScores: Record<string, number>;
    gameClasses: any[];
    speciesSpells: any[];
    hasMagicInitiateFeat: boolean;
    setCharacter: (updater: any) => void;
    onUpdate: (updates: Partial<CharacterData>) => void;
}

/** Keep the client's slot usage when a server response for an unrelated change comes back. */
function keepSlotsUsed(updatedChar: any) {
    return (prev: any) => ({
        ...updatedChar,
        data: {
            ...updatedChar.data,
            spellSlotsUsed: prev?.data?.spellSlotsUsed ?? updatedChar.data?.spellSlotsUsed ?? {},
        },
    });
}

export default function SpellcastingSection({
    character, setup, level, proficiencyBonus, modifiers, abilityScores, gameClasses,
    speciesSpells, hasMagicInitiateFeat, setCharacter, onUpdate,
}: SpellcastingSectionProps) {
    const toast = useToast();
    const data: Partial<CharacterData> & Record<string, any> = character.data || {};
    const { primary, ability, spellcastingClasses, subclassSpellcasting, grantedSubclassSpells } = setup;
    const abilityMod = modifiers[ability] ?? 0;
    const otherAbilities = spellcastingClasses
        .map((sc) => sc.classInfo?.spellcastingAbility?.toUpperCase())
        .filter((v, i, all): v is string => !!v && all.indexOf(v) === i);
    const magicInitiateSpell = hasMagicInitiateFeat && !!data.magicInitiate?.spell1;

    return (
        <div className="card">
            <div className="spellcasting-header">
                <h2 className="heading" style={{ margin: 0, fontSize: 'var(--font-size-2xl)' }}>Spellcasting</h2>
                <dl className="spellcasting-stats">
                    <div>
                        <dt className="stat-label">Ability</dt>
                        <dd className="spellcasting-ability">
                            {ability.toUpperCase()}
                            {spellcastingClasses.length > 1 && <span className="skill-stat">({otherAbilities.join('/')})</span>}
                        </dd>
                    </div>
                    <div>
                        <dt className="stat-label">Save DC</dt>
                        <dd className="stat-value">{8 + proficiencyBonus + abilityMod}</dd>
                    </div>
                    <div>
                        <dt className="stat-label">Attack Mod</dt>
                        <dd className="stat-value">{formatMod(proficiencyBonus + abilityMod)}</dd>
                    </div>
                </dl>
            </div>

            <SpellManager
                characterId={character.id}
                classId={character.classId || primary.id}
                level={level}
                subclassSpellcasting={subclassSpellcasting}
                elvenLineage={(character.race || '').toLowerCase() === 'elf' ? data.elvenLineage : undefined}
                speciesSpells={speciesSpells}
                subclassSpells={grantedSubclassSpells}
                classFeatureSpells={getChoiceSpellIds(data.classChoices)}
                bonusCantrips={getBonusCantrips(data.classChoices, primary.id)}
                subclassClassLevel={level}
                magicInitiate={hasMagicInitiateFeat ? data.magicInitiate : undefined}
                onMagicInitiateUpdate={(magicInitiate) => {
                    onUpdate({ magicInitiate });
                    api.patch(`/characters/${character.id}/data`, { magicInitiate })
                        .catch((err) => {
                            console.error('Failed to persist Magic Initiate', err);
                            toast.error(describeError("Couldn't save Magic Initiate choices", err));
                        });
                }}
                magicInitiateSpell1Used={magicInitiateSpell ? (data.magicInitiateSpell1Used ?? 1) : 1}
                onMagicInitiateSlotChange={magicInitiateSpell ? async (used: number) => {
                    try {
                        setCharacter(await api.patch(`/characters/${character.id}/magic-initiate-spell-used`, { used }));
                    } catch (err) {
                        console.error('Failed to update Magic Initiate spell slot', err);
                        toast.error(describeError("Couldn't update your Magic Initiate spell", err));
                    }
                } : undefined}
                initialSpells={Array.isArray(data.spells) ? data.spells : []}
                initialSlotsUsed={data.spellSlotsUsed || {}}
                initialPactSlotsUsed={Number(data.pactSlotsUsed) || 0}
                spellcastingAbility={ability}
                preparedCaster={primary.classInfo?.preparedCaster || false}
                spellbook={
                    primary.id.toLowerCase() === 'wizard'
                        ? (data.spellbook ?? (Array.isArray(data.spells) ? data.spells : []).filter((s: any) => s.level > 0).map((s: any) => s.id))
                        : undefined
                }
                abilityScores={abilityScores}
                classes={data.classes}
                allClasses={gameClasses}
                onUpdate={(updates) => {
                    onUpdate(updates);
                    // Spells are saved by their own endpoints; slot usage is saved here so it survives a reload.
                    const slotUpdates: Partial<CharacterData> = {};
                    if (updates.spellSlotsUsed !== undefined) slotUpdates.spellSlotsUsed = updates.spellSlotsUsed;
                    if (updates.pactSlotsUsed !== undefined) slotUpdates.pactSlotsUsed = updates.pactSlotsUsed;
                    if (Object.keys(slotUpdates).length > 0) {
                        api.patch(`/characters/${character.id}/data`, slotUpdates)
                            .catch((err) => {
                                console.error('Failed to save spell slots', err);
                                toast.error(describeError("Couldn't save spell slot usage", err));
                            });
                    }
                }}
                existingActions={Array.isArray(data.actions) ? data.actions : []}
                onCreateAction={async (action) => {
                    try {
                        setCharacter(keepSlotsUsed(await api.post(`/characters/${character.id}/actions`, { action })));
                    } catch (err) {
                        console.error('Failed to create action', err);
                        throw err;
                    }
                }}
                onDeleteAction={async (index, name) => {
                    try {
                        setCharacter(keepSlotsUsed(await api.delete(`/characters/${character.id}/actions`, { data: { index, name } })));
                    } catch (err) {
                        console.error('Failed to delete action', err);
                        throw err;
                    }
                }}
            />
        </div>
    );
}
