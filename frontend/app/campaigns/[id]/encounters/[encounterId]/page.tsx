'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { CampaignDetail, isDmPartyMember, PartyMemberDm, partyStats } from '@/lib/campaigns';
import { partyBudget, xpPerCharacter } from '@/lib/encounterDifficulty';
import {
    addCombatants, Combatant, currentCombatant, customCombatant, damageCombatant, EncounterState, encounterXp,
    EncounterStatus, healCombatant, monsterCombatant, newCombatantId, nextCombatantName, nextTurn, normalizeEncounter,
    partyCombatant, previousTurn, removeCombatant, rollInitiatives, setInitiative, startCombat, updateCombatant,
} from '@/lib/initiative';
import { Monster } from '@/lib/monsters';
import { Button, buttonClass, ConfirmDialog, describeError, Menu, Skeleton, useToast } from '@/app/components/ui';
import { DiceProvider } from '@/app/components/dice/DiceTray';
import { usePolling } from '../../../usePolling';
import { useMonsters } from '../../../useMonsters';
import { useEncounterSave } from './useEncounterSave';
import CombatantRow from './components/CombatantRow';
import CombatantDetails from './components/CombatantDetails';
import DifficultyMeter from './components/DifficultyMeter';
import AddMonstersDialog from './components/AddMonstersDialog';
import AddCustomDialog from './components/AddCustomDialog';

interface EncounterRecord {
    id: string;
    name: string;
    status: EncounterStatus;
    data: unknown;
}

const STATUS_LABELS: Record<EncounterStatus, string> = { planned: 'Planning', active: 'Running', completed: 'Finished' };
const SAVE_LABELS = { saved: 'Saved', saving: 'Saving…', error: 'Not saved' } as const;
const PARTY_POLL_MS = 10_000;

export default function EncounterPage() {
    const { id: campaignId, encounterId } = useParams<{ id: string; encounterId: string }>();
    const toast = useToast();
    const monsters = useMonsters();
    const { save, status: saveStatus, retry } = useEncounterSave(campaignId, encounterId);
    const [encounter, setEncounter] = useState<EncounterRecord | null>(null);
    const [state, setState] = useState<EncounterState | null>(null);
    const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
    const [loadError, setLoadError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [dialog, setDialog] = useState<'monsters' | 'custom' | 'end' | null>(null);
    const [nameDraft, setNameDraft] = useState('');

    const loadCampaign = useCallback(() => {
        api.get(`/campaigns/${campaignId}`).then(setCampaign).catch(() => undefined);
    }, [campaignId]);

    useEffect(() => {
        Promise.all([api.get(`/campaigns/${campaignId}/encounters/${encounterId}`), api.get(`/campaigns/${campaignId}`)])
            .then(([enc, camp]: [EncounterRecord, CampaignDetail]) => {
                setEncounter(enc);
                setNameDraft(enc.name);
                setState(normalizeEncounter(enc.data));
                setCampaign(camp);
            })
            .catch((err) => {
                if (err instanceof ApiError && (err.status === 404 || err.status === 403)) setNotFound(true);
                else setLoadError(describeError("Couldn't load this encounter", err));
            });
    }, [campaignId, encounterId]);

    // Party members' HP and conditions come from their sheets
    usePolling(loadCampaign, PARTY_POLL_MS, !!campaign && encounter?.status !== 'completed');

    const partyById = useMemo(() => {
        const map = new Map<string, PartyMemberDm>();
        for (const m of campaign?.party ?? []) if (isDmPartyMember(m)) map.set(m.id, m);
        return map;
    }, [campaign]);

    /** Apply a change locally; the effect below saves the result. */
    const dirty = useRef(false);
    const change = useCallback((update: (s: EncounterState) => EncounterState) => {
        dirty.current = true;
        setState((prev) => (prev ? update(prev) : prev));
    }, []);
    useEffect(() => {
        if (dirty.current && state) {
            dirty.current = false;
            save({ data: state });
        }
    }, [state, save]);

    const setStatus = (status: EncounterStatus, data?: EncounterState) => {
        setEncounter((e) => (e ? { ...e, status } : e));
        save(data ? { status, data } : { status });
    };

    const onInitiative = useCallback((id: string, value: number | null) => change((s) => setInitiative(s, id, value)), [change]);
    const onChangeCombatant = useCallback((id: string, patch: Partial<Combatant>) => change((s) => updateCombatant(s, id, patch)), [change]);
    const onDamage = useCallback((id: string, amount: number) => change((s) => ({ ...s, combatants: s.combatants.map((c) => (c.id === id ? damageCombatant(c, amount) : c)) })), [change]);
    const onHeal = useCallback((id: string, amount: number) => change((s) => ({ ...s, combatants: s.combatants.map((c) => (c.id === id ? healCombatant(c, amount) : c)) })), [change]);
    const onRemove = useCallback((id: string) => change((s) => removeCombatant(s, id)), [change]);
    const onDuplicate = useCallback((id: string) => change((s) => {
        const source = s.combatants.find((c) => c.id === id);
        if (!source) return s;
        const base = source.name.replace(/ \d+$/, '');
        const copy: Combatant = {
            ...source,
            id: newCombatantId(),
            name: nextCombatantName(base, s.combatants),
            initiative: null,
            hp: source.hp ? { current: source.hp.max, max: source.hp.max, temp: 0 } : undefined,
            conditions: [],
            defeated: false,
        };
        return addCombatants(s, [copy]);
    }), [change]);
    const onSelect = useCallback((id: string) => setSelectedId(id), []);

    if (notFound) {
        return (
            <div className="card" role="alert" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ marginTop: 0 }}>This encounter doesn&apos;t exist, or it isn&apos;t yours to run.</p>
                <Link href={`/campaigns/${campaignId}`} className={buttonClass({ variant: 'secondary' })}>Back to the campaign</Link>
            </div>
        );
    }
    if (!encounter || !state || !campaign) {
        return loadError ? (
            <div className="card" role="alert" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ margin: 0 }}>{loadError}</p>
            </div>
        ) : (
            <div className="stack" aria-busy="true" aria-label="Loading encounter"><Skeleton width="40%" height="2rem" /><Skeleton height="12rem" /></div>
        );
    }

    const started = state.round > 0;
    const current = currentCombatant(state);
    const selected = state.combatants.find((c) => c.id === selectedId) ?? current ?? state.combatants.find((c) => c.kind !== 'pc') ?? state.combatants[0];
    const pcs = state.combatants.filter((c) => c.kind === 'pc');
    const levels = pcs.map((c) => partyById.get(c.characterId ?? '')?.level).filter((l): l is number => typeof l === 'number');
    const xp = encounterXp(state.combatants);
    const missingParty = campaign.party.filter((p) => !pcs.some((c) => c.characterId === p.id));
    const needsInitiative = state.combatants.some((c) => c.initiative === null);

    const addMonsters = (monster: Monster, count: number, rollHp: boolean) => change((s) => {
        const added: Combatant[] = [];
        for (let i = 0; i < count; i++) added.push(monsterCombatant(monster, [...s.combatants, ...added], { rollHp }));
        return addCombatants(s, added);
    });

    const addParty = (members: typeof campaign.party) => change((s) => addCombatants(s, members.map((m) => partyCombatant(m, isDmPartyMember(m) ? partyStats(m).initiative : 0))));

    const start = () => {
        const next = startCombat(rollInitiatives(state));
        setState(next);
        setSelectedId(null);
        setStatus('active', next);
    };

    const end = () => {
        setDialog(null);
        setStatus('completed');
        toast.success(`${encounter.name} is over. ${xp.toLocaleString()} XP (${xpPerCharacter(xp, pcs.length).toLocaleString()} each).`);
    };

    const rename = () => {
        const name = nameDraft.trim();
        if (!name || name === encounter.name) {
            setNameDraft(encounter.name);
            return;
        }
        setEncounter({ ...encounter, name });
        save({ name });
    };

    return (
        <DiceProvider>
        <div className="encounter-page">
            <div className="page-header">
                <div style={{ minWidth: 0, flex: 1 }}>
                    <Link href={`/campaigns/${campaignId}#encounters`} className="back-link">&larr; {campaign.name}</Link>
                    <div className="encounter-title-row">
                        <label className="visually-hidden" htmlFor="encounter-name">Encounter name</label>
                        <input
                            id="encounter-name"
                            className="encounter-name-input heading"
                            value={nameDraft}
                            maxLength={100}
                            onChange={(e) => setNameDraft(e.target.value)}
                            onBlur={rename}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') e.currentTarget.blur();
                                if (e.key === 'Escape') {
                                    setNameDraft(encounter.name);
                                    e.currentTarget.blur();
                                }
                            }}
                        />
                        <span className={`status-badge status-${encounter.status}`}>{STATUS_LABELS[encounter.status]}</span>
                        <span className={`save-status save-${saveStatus}`} aria-live="polite">
                            {SAVE_LABELS[saveStatus]}
                            {saveStatus === 'error' && <Button variant="ghost" size="sm" onClick={retry}>Retry</Button>}
                        </span>
                    </div>
                </div>
            </div>

            <div className="tracker-bar card">
                {encounter.status === 'completed' ? (
                    <>
                        <span className="tracker-round">Finished after {state.round} {state.round === 1 ? 'round' : 'rounds'}</span>
                        <span>{xp.toLocaleString()} XP · {xpPerCharacter(xp, pcs.length).toLocaleString()} per character</span>
                        <Button variant="secondary" onClick={() => setStatus('active')}>Reopen</Button>
                    </>
                ) : started ? (
                    <>
                        <span className="tracker-round" aria-live="polite">Round {state.round}{current ? ` · ${current.name}'s turn` : ''}</span>
                        <div className="tracker-actions">
                            <Button variant="secondary" onClick={() => change(previousTurn)} aria-label="Previous turn">◀ Back</Button>
                            <Button onClick={() => change(nextTurn)}>Next turn ▶</Button>
                            {needsInitiative && <Button variant="secondary" onClick={() => change((s) => rollInitiatives(s))}>Roll missing initiative</Button>}
                            <Button variant="danger" onClick={() => setDialog('end')}>End encounter</Button>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="tracker-round">Planning</span>
                        <p className="field-hint" style={{ margin: 0, flex: '1 1 16rem' }}>
                            Enter the party&apos;s initiative rolls (click the —). Start rolls for any monster without one.
                        </p>
                        <div className="tracker-actions">
                            <Button variant="secondary" onClick={() => change((s) => rollInitiatives(s, { onlyMissing: false }))} disabled={!state.combatants.some((c) => c.kind !== 'pc')}>
                                Roll monster initiative
                            </Button>
                            <Button onClick={start} disabled={state.combatants.length === 0}>Start combat</Button>
                        </div>
                    </>
                )}
            </div>

            <div className="encounter-layout">
                <div className="stack">
                    <section className="card" aria-labelledby="order-title">
                        <div className="section-header">
                            <h2 className="section-title" id="order-title">{started ? 'Turn order' : 'Combatants'}</h2>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                                <Button size="sm" onClick={() => setDialog('monsters')}>+ Monsters</Button>
                                <Menu
                                    label="+ More"
                                    ariaLabel="Add more combatants"
                                    items={[
                                        ...(missingParty.length > 1 ? [{ label: 'Whole party', onSelect: () => addParty(missingParty) }] : []),
                                        ...missingParty.map((p) => ({ label: p.name, onSelect: () => addParty([p]) })),
                                        { label: 'Custom NPC or enemy…', onSelect: () => setDialog('custom'), separatorBefore: missingParty.length > 0 },
                                    ]}
                                />
                            </div>
                        </div>
                        {state.combatants.length === 0 ? (
                            <p className="empty-note">Nobody here yet. Add the party and some monsters.</p>
                        ) : (
                            <ol className="combatant-list">
                                {state.combatants.map((c, index) => (
                                    <CombatantRow
                                        key={c.id}
                                        combatant={c}
                                        pc={c.characterId ? partyById.get(c.characterId) : undefined}
                                        isCurrent={started && index === state.turn}
                                        isSelected={selected?.id === c.id}
                                        onSelect={onSelect}
                                        onInitiative={onInitiative}
                                        onChange={onChangeCombatant}
                                        onDamage={onDamage}
                                        onHeal={onHeal}
                                        onDuplicate={onDuplicate}
                                        onRemove={onRemove}
                                    />
                                ))}
                            </ol>
                        )}
                        <p className="field-hint">Type an amount, then − to damage or + to heal (Enter damages, Shift+Enter heals). Hidden combatants don&apos;t show in the players&apos; turn order.</p>
                    </section>
                    <DifficultyMeter xp={xp} budget={partyBudget(levels)} partySize={levels.length} />
                </div>
                <div className="encounter-side">
                    {selected && (
                        <CombatantDetails
                            combatant={selected}
                            monster={monsters.find(selected.monsterId, selected.monsterSource)}
                            pc={selected.characterId ? partyById.get(selected.characterId) : undefined}
                            onNotesChange={(notes) => onChangeCombatant(selected.id, { notes })}
                        />
                    )}
                </div>
            </div>

            {dialog === 'monsters' && (
                <AddMonstersDialog monsters={monsters.all} loading={monsters.loading} onAdd={addMonsters} onClose={() => setDialog(null)} />
            )}
            {dialog === 'custom' && (
                <AddCustomDialog
                    onClose={() => setDialog(null)}
                    onAdd={(input) => {
                        change((s) => addCombatants(s, [customCombatant({ ...input, name: nextCombatantName(input.name, s.combatants) })]));
                        setDialog(null);
                    }}
                />
            )}
            {dialog === 'end' && (
                <ConfirmDialog title={`End ${encounter.name}?`} confirmLabel="End encounter" onConfirm={end} onCancel={() => setDialog(null)}>
                    <p style={{ marginTop: 0 }}>
                        The monsters are worth <strong>{xp.toLocaleString()} XP</strong>
                        {pcs.length > 0 && <>: <strong>{xpPerCharacter(xp, pcs.length).toLocaleString()} XP</strong> for each of the {pcs.length} characters</>}.
                    </p>
                    <p style={{ marginBottom: 0 }}>Players stop seeing the turn order. You can reopen it later.</p>
                </ConfirmDialog>
            )}
        </div>
        </DiceProvider>
    );
}
