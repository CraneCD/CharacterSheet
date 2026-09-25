'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { isDmPartyMember, PartyMemberBasic, partyStats } from '@/lib/campaigns';
import { encounterXp, EncounterStatus, normalizeEncounter, partyCombatant } from '@/lib/initiative';
import { partyBudget, RATING_LABELS, rateEncounter } from '@/lib/encounterDifficulty';
import { formatRelativeTime } from '@/lib/relativeTime';
import { Button, ConfirmDialog, describeError, Menu, SectionHeader, Skeleton, useToast } from '@/app/components/ui';

interface EncounterRow {
    id: string;
    name: string;
    status: EncounterStatus;
    data: unknown;
    updatedAt: string;
}

interface EncountersPanelProps {
    campaignId: string;
    party: PartyMemberBasic[];
}

const STATUS_LABELS: Record<EncounterStatus, string> = { planned: 'Planned', active: 'Running', completed: 'Finished' };
const STATUS_ORDER: Record<EncounterStatus, number> = { active: 0, planned: 1, completed: 2 };

/** The DM's encounters: plan them ahead, run one at a time, keep finished ones for the XP. */
export default function EncountersPanel({ campaignId, party }: EncountersPanelProps) {
    const [encounters, setEncounters] = useState<EncounterRow[] | null>(null);
    const [loadError, setLoadError] = useState('');
    const [creating, setCreating] = useState(false);
    const [deleting, setDeleting] = useState<EncounterRow | null>(null);
    const [busy, setBusy] = useState(false);
    const router = useRouter();
    const toast = useToast();

    const load = () => {
        setLoadError('');
        api.get(`/campaigns/${campaignId}/encounters`)
            .then(setEncounters)
            .catch((err) => setLoadError(describeError("Couldn't load encounters", err)));
    };
    useEffect(load, [campaignId]);

    const create = async () => {
        setCreating(true);
        try {
            // Start with the whole party in it; the DM adds monsters in the builder
            const combatants = party.map((c) => partyCombatant(c, isDmPartyMember(c) ? partyStats(c).initiative : 0));
            const created = await api.post(`/campaigns/${campaignId}/encounters`, {
                name: `Encounter ${(encounters?.length ?? 0) + 1}`,
                data: { combatants, round: 0, turn: 0 },
            });
            router.push(`/campaigns/${campaignId}/encounters/${created.id}`);
        } catch (err) {
            toast.error(describeError("Couldn't create the encounter", err));
            setCreating(false);
        }
    };

    const remove = async () => {
        if (!deleting) return;
        setBusy(true);
        try {
            await api.delete(`/campaigns/${campaignId}/encounters/${deleting.id}`);
            setEncounters((list) => (list ?? []).filter((e) => e.id !== deleting.id));
            setDeleting(null);
        } catch (err) {
            toast.error(describeError("Couldn't delete the encounter", err));
        } finally {
            setBusy(false);
        }
    };

    const sorted = [...(encounters ?? [])].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || b.updatedAt.localeCompare(a.updatedAt));

    return (
        <section className="card" aria-labelledby="encounters-title">
            <SectionHeader title="Encounters" id="encounters-title" as="h2" actions={<Button size="sm" onClick={create} loading={creating}>+ New encounter</Button>} />
            {loadError && <div className="form-error" role="alert">{loadError} <Button variant="secondary" size="sm" onClick={load}>Try again</Button></div>}
            {encounters === null && !loadError ? (
                <div className="stack" aria-busy="true" aria-label="Loading encounters"><Skeleton height="3rem" /><Skeleton height="3rem" /></div>
            ) : sorted.length === 0 ? (
                <p className="empty-note">No encounters yet. Build one ahead of the session: pick monsters and see how tough the fight will be.</p>
            ) : (
                <ul className="encounter-list">
                    {sorted.map((e) => {
                        const state = normalizeEncounter(e.data);
                        const monsters = state.combatants.filter((c) => c.kind !== 'pc');
                        const levels = state.combatants.filter((c) => c.kind === 'pc')
                            .map((c) => party.find((p) => p.id === c.characterId)?.level)
                            .filter((l): l is number => typeof l === 'number');
                        const xp = encounterXp(state.combatants);
                        const rating = levels.length > 0 ? rateEncounter(xp, partyBudget(levels)) : 'none';
                        return (
                            <li key={e.id} className={`encounter-row status-${e.status}`}>
                                <Link href={`/campaigns/${campaignId}/encounters/${e.id}`} className="encounter-row-main">
                                    <span className="encounter-row-name">{e.name}</span>
                                    <span className="encounter-row-meta">
                                        <span className={`status-badge status-${e.status}`}>{STATUS_LABELS[e.status]}{e.status === 'active' && state.round > 0 ? ` · round ${state.round}` : ''}</span>
                                        {monsters.length === 1 ? '1 monster' : `${monsters.length} monsters`} · {xp.toLocaleString()} XP
                                        {rating !== 'none' && <> · <span className={`difficulty-text difficulty-${rating}`}>{RATING_LABELS[rating]}</span></>}
                                        {' · '}{formatRelativeTime(e.updatedAt)}
                                    </span>
                                </Link>
                                <Menu
                                    label="⋯"
                                    ariaLabel={`More for ${e.name}`}
                                    variant="ghost"
                                    items={[{ label: 'Delete…', onSelect: () => setDeleting(e), danger: true }]}
                                />
                            </li>
                        );
                    })}
                </ul>
            )}
            {deleting && (
                <ConfirmDialog title={`Delete "${deleting.name}"?`} confirmLabel="Delete" danger busy={busy} onConfirm={remove} onCancel={() => setDeleting(null)}>
                    Its monsters, HP and turn order will be gone for good.
                </ConfirmDialog>
            )}
        </section>
    );
}
