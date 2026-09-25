'use client';

import Link from 'next/link';
import { Combatant } from '@/lib/initiative';
import { PartyMemberDm, partyStats } from '@/lib/campaigns';
import { Monster, formatModifier } from '@/lib/monsters';
import { Field, SectionHeader } from '@/app/components/ui';
import StatBlock from '../../../../components/StatBlock';

interface CombatantDetailsProps {
    combatant: Combatant;
    monster?: Monster;
    pc?: PartyMemberDm;
    onNotesChange: (notes: string) => void;
}

/** Beside the turn order: the stat block for monsters, the numbers that matter for party members. */
export default function CombatantDetails({ combatant, monster, pc, onNotesChange }: CombatantDetailsProps) {
    return (
        <section className="card combatant-details" aria-label={`${combatant.name} details`}>
            {combatant.kind === 'pc' ? (
                pc ? (
                    <>
                        <SectionHeader title={combatant.name} as="h2" actions={<Link href={`/character/${pc.id}`} className="btn btn-secondary btn-sm">Open sheet</Link>} />
                        {(() => {
                            const s = partyStats(pc);
                            return (
                                <dl className="party-stats party-stats-lg">
                                    <div><dt>HP</dt><dd>{pc.hp.current}/{pc.hp.max}{pc.hp.temp > 0 ? ` +${pc.hp.temp}` : ''}</dd></div>
                                    <div><dt>AC</dt><dd>{s.ac}</dd></div>
                                    <div><dt>Speed</dt><dd>{s.speed} ft.</dd></div>
                                    <div><dt>Initiative</dt><dd>{formatModifier(s.initiative)}</dd></div>
                                    <div><dt>Passive Perception</dt><dd>{s.passivePerception}</dd></div>
                                    <div><dt>Passive Insight</dt><dd>{s.passiveInsight}</dd></div>
                                    {s.spellSaveDc !== undefined && <div><dt>Spell save DC</dt><dd>{s.spellSaveDc}</dd></div>}
                                </dl>
                            );
                        })()}
                        {pc.hp.current <= 0 && pc.hp.deathSaves && (
                            <p>Death saves: {pc.hp.deathSaves.successes} successes, {pc.hp.deathSaves.failures} failures</p>
                        )}
                        <p className="field-hint">HP and conditions come from {pc.name}&apos;s sheet: their player tracks them.</p>
                    </>
                ) : (
                    <p className="empty-note">This character isn&apos;t in the campaign any more.</p>
                )
            ) : monster ? (
                <StatBlock monster={monster} headingLevel={2} />
            ) : (
                <SectionHeader title={combatant.name} as="h2" />
            )}
            {combatant.kind !== 'pc' && (
                <Field label="Notes" hint="Only you see these.">
                    {(p) => (
                        <textarea
                            {...p}
                            className="input"
                            rows={3}
                            maxLength={1000}
                            value={combatant.notes ?? ''}
                            placeholder="Tactics, who it's grappling, concentration…"
                            onChange={(e) => onNotesChange(e.target.value)}
                        />
                    )}
                </Field>
            )}
        </section>
    );
}
