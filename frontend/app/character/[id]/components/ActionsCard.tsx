'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { CharacterAction, CharacterData, ClassResources } from '@/lib/types';
import { WeaponAttack } from '@/lib/attacks';
import { formatBonus } from '@/lib/dice';
import {
    ACTION_TIMINGS, ActionRow, ActionTiming, BASIC_ACTIONS, buildActionRows, CastableSummary, SpellcastingNumbers, SpellSource,
} from '@/lib/actionRows';
import { Button, describeError, Field, SectionHeader, TextField, useToast } from '@/app/components/ui';
import { EffectRollButton, RollButton } from '@/app/components/dice/DiceTray';
import { useSheetReadOnly } from '../SheetReadOnly';

interface ActionsCardProps {
    characterId: string;
    attacks: WeaponAttack[];
    hasWeaponMastery: boolean;
    masteryWeapons: string[] | null;
    /** Spells you can cast and slots left, from the spell list (null until it has loaded, or without spellcasting) */
    castable: CastableSummary | null;
    spellcasting: SpellcastingNumbers | null;
    characterLevel: number;
    resources?: ClassResources;
    primaryClass: string;
    storedActions: CharacterAction[];
    /** Extra attacks from Extra Attack (1), Two Extra Attacks (2), ... */
    extraAttacks: number;
    onUpdate: (updates: Partial<CharacterData>) => void;
}

const TIMING_NOUN: Record<ActionTiming, string> = { action: 'action', bonus: 'Bonus Action', reaction: 'Reaction', other: 'other options' };

/** Stored spell text uses **bold** labels; show it as plain paragraphs. */
const paragraphs = (text: string) => text.replace(/\*\*/g, '').split(/\n+/).map((p) => p.trim()).filter(Boolean);

function SlotPipsReadOnly({ row, castable }: { row: ActionRow; castable: CastableSummary | null }) {
    if (!castable || !row.spellLevel) return null;
    let total = castable.maxSlots[row.spellLevel - 1] || 0;
    let used = castable.slotsUsed[row.spellLevel] || 0;
    let label = `Level ${row.spellLevel} slots`;
    if (total === 0 && castable.pact && row.spellLevel <= castable.pact.slotLevel) {
        total = castable.pact.count;
        used = castable.pact.used;
        label = 'Pact Magic slots';
    }
    if (total === 0) return null;
    const left = Math.max(0, total - used);
    return (
        <span className="action-pips" role="img" aria-label={`${label}: ${left} of ${total} left`}>
            {Array.from({ length: total }, (_, i) => <i key={i} className={i < used ? 'action-pip is-used' : 'action-pip'} />)}
        </span>
    );
}

function ActionRowItem({ row, castable, open, onToggle, onRemove }: {
    row: ActionRow;
    castable: CastableSummary | null;
    open: boolean;
    onToggle: () => void;
    onRemove?: () => void;
}) {
    const detailId = useId();
    const effect = row.effect;
    return (
        <li className="action-row">
            <div className="action-row-main">
                <div className="action-row-name">
                    <span className="action-row-title">{row.name}</span>
                    <span className="action-tags">
                        <span className={`action-tag source-${row.source}`}>{row.source === 'basic' ? `Basic · ${row.sourceLabel}` : row.sourceLabel}</span>
                        {row.mastery && (
                            <button type="button" className="action-tag source-weapon is-mastery" onClick={onToggle} aria-expanded={open} aria-controls={detailId} title={`Weapon mastery: ${row.mastery.name}`}>
                                {row.mastery.name}
                            </button>
                        )}
                        {row.concentration && <span className="action-tag is-concentration">Concentration</span>}
                        <SlotPipsReadOnly row={row} castable={castable} />
                        {row.uses && <span className="action-uses">{row.uses}</span>}
                    </span>
                    {row.note && <span className="action-row-note">{row.note}</span>}
                </div>
                <span className="action-row-nums">
                    {row.toHit !== undefined && (
                        <RollButton
                            label={`${row.name} attack`}
                            modifier={row.toHit}
                            kind="attack"
                            damage={effect?.kind === 'damage' ? { expression: effect.dice, modifier: effect.modifier } : undefined}
                            className="action-hit"
                        >
                            {row.toHit >= 0 ? `+${row.toHit}` : `−${Math.abs(row.toHit)}`} <small>hit</small>
                        </RollButton>
                    )}
                    {row.save && <span className="action-save">DC {row.save.dc} <small>{row.save.ability}</small></span>}
                    {effect && (
                        <EffectRollButton
                            label={`${row.name} ${effect.kind === 'healing' ? 'healing' : 'damage'}`}
                            expression={effect.dice}
                            modifier={effect.modifier}
                            className="action-effect"
                        >
                            {effect.dice}{formatBonus(effect.modifier)} <small>{effect.kind === 'healing' ? 'heal' : effect.type ?? ''}</small>
                        </EffectRollButton>
                    )}
                </span>
                <button
                    type="button"
                    className="action-row-toggle"
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={detailId}
                    aria-label={`${open ? 'Hide' : 'Show'} details for ${row.name}`}
                >
                    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3l5 5-5 5" /></svg>
                </button>
            </div>
            <div className="action-row-detail" id={detailId} hidden={!open}>
                {paragraphs(row.description).map((p, i) => <p key={i}>{p}</p>)}
                {row.mastery && <p><strong className="action-mastery-name">{row.mastery.name} (mastery).</strong> {row.mastery.description}</p>}
                {row.facts && row.facts.length > 0 && (
                    <dl className="action-facts">
                        {row.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                    </dl>
                )}
                {onRemove && <Button variant="ghost" size="sm" className="action-remove" onClick={onRemove}>Remove {row.name}</Button>}
            </div>
        </li>
    );
}

/**
 * One card for everything you can do on your turn, in tabs by timing: weapons (with mastery),
 * prepared spells, class features, items and your own actions. Rows start collapsed.
 */
export default function ActionsCard({
    characterId, attacks, hasWeaponMastery, masteryWeapons, castable, spellcasting, characterLevel,
    resources, primaryClass, storedActions, extraAttacks, onUpdate,
}: ActionsCardProps) {
    const toast = useToast();
    const [tab, setTab] = useState<ActionTiming>('action');
    const [open, setOpen] = useState<Record<string, boolean>>({});
    const [basicOpen, setBasicOpen] = useState<number | null>(null);
    const readOnly = useSheetReadOnly();
    const [adding, setAdding] = useState(false);
    const [draft, setDraft] = useState<{ name: string; type: ActionTiming; description: string }>({ name: '', type: 'action', description: '' });
    const [saving, setSaving] = useState(false);
    const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const panelId = useId();

    // Spell text comes from the reference list (cached by the api client)
    const [spells, setSpells] = useState<SpellSource[]>([]);
    useEffect(() => {
        api.get('/reference/spells')
            .then((list: SpellSource[]) => setSpells(Array.isArray(list) ? list : []))
            .catch(() => setSpells([]));
    }, []);

    const actions = useMemo(() => (Array.isArray(storedActions) ? storedActions : []), [storedActions]);
    const rows = useMemo(() => buildActionRows({
        attacks, hasWeaponMastery, masteryWeapons,
        castable: castable?.spells ?? [],
        spells, spellcasting, characterLevel, resources, primaryClass,
        storedActions: actions,
    }), [attacks, hasWeaponMastery, masteryWeapons, castable, spells, spellcasting, characterLevel, resources, primaryClass, actions]);

    const byTiming = (t: ActionTiming) => rows.filter((r) => r.timing === t);

    const selectTab = (t: ActionTiming, focus = false) => {
        setTab(t);
        if (focus) tabRefs.current[t]?.focus();
    };

    const onTabKey = (e: React.KeyboardEvent) => {
        const ids = ACTION_TIMINGS.map((t) => t.id);
        const i = ids.indexOf(tab);
        const next = e.key === 'ArrowRight' ? ids[(i + 1) % ids.length]
            : e.key === 'ArrowLeft' ? ids[(i - 1 + ids.length) % ids.length]
            : e.key === 'Home' ? ids[0] : e.key === 'End' ? ids[ids.length - 1] : null;
        if (next) {
            e.preventDefault();
            selectTab(next, true);
        }
    };

    const addAction = async (e: React.FormEvent) => {
        e.preventDefault();
        const name = draft.name.trim();
        const description = draft.description.trim();
        if (!name || !description) return;
        if (actions.some((a) => (a.name || '').trim().toLowerCase() === name.toLowerCase())) {
            toast.error(`You already have an action named "${name}".`);
            return;
        }
        const action: CharacterAction = { name, type: draft.type, description };
        setSaving(true);
        try {
            await api.post(`/characters/${characterId}/actions`, { action });
            onUpdate({ actions: [...actions, action] });
            setDraft({ name: '', type: 'action', description: '' });
            setAdding(false);
            setTab(action.type);
            toast.success(`Added "${name}".`);
        } catch (err) {
            console.error('Failed to add action', err);
            toast.error(describeError("Couldn't add action", err));
        } finally {
            setSaving(false);
        }
    };

    const removeAction = async (index: number) => {
        const target = actions[index];
        if (!target) return;
        try {
            await api.delete(`/characters/${characterId}/actions`, { data: { index, name: target.name } });
            onUpdate({ actions: actions.filter((_, i) => i !== index) });
        } catch (err) {
            console.error('Failed to remove action', err);
            toast.error(describeError(`Couldn't remove "${target.name}"`, err));
        }
    };

    return (
        <div className="card actions-card">
            <SectionHeader
                title="Actions"
                actions={readOnly ? undefined : (
                    <Button variant="secondary" size="sm" onClick={() => setAdding((a) => !a)} aria-expanded={adding}>
                        + Custom
                    </Button>
                )}
            />

            {adding && (
                <form className="actions-custom-form" onSubmit={addAction}>
                    <div className="actions-custom-row">
                        <TextField label="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} autoFocus required />
                        <Field label="When">
                            {(p) => (
                                <select {...p} className="input" value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value as ActionTiming })}>
                                    <option value="action">Action</option>
                                    <option value="bonus">Bonus Action</option>
                                    <option value="reaction">Reaction</option>
                                    <option value="other">Other</option>
                                </select>
                            )}
                        </Field>
                    </div>
                    <Field label="Description">
                        {(p) => (
                            <textarea {...p} className="input" rows={3} value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required />
                        )}
                    </Field>
                    <div className="actions-custom-buttons">
                        <Button type="submit" size="sm" loading={saving}>Add action</Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => setAdding(false)}>Cancel</Button>
                    </div>
                </form>
            )}

            <div className="actions-tabs" role="tablist" aria-label="When you use it" onKeyDown={onTabKey}>
                {ACTION_TIMINGS.map((t) => {
                    const count = byTiming(t.id).length;
                    const selected = tab === t.id;
                    return (
                        <button
                            key={t.id}
                            ref={(el) => { tabRefs.current[t.id] = el; }}
                            type="button"
                            role="tab"
                            id={`${panelId}-tab-${t.id}`}
                            className="actions-tab"
                            aria-selected={selected}
                            aria-controls={`${panelId}-${t.id}`}
                            tabIndex={selected ? 0 : -1}
                            onClick={() => selectTab(t.id)}
                        >
                            {t.label} <span className="actions-tab-count">{count}</span>
                        </button>
                    );
                })}
            </div>

            {/* Every timing is rendered: on screen only the selected one shows, on paper they all print */}
            {ACTION_TIMINGS.map((t) => {
                const list = byTiming(t.id);
                return (
                    <div
                        key={t.id}
                        role="tabpanel"
                        id={`${panelId}-${t.id}`}
                        aria-labelledby={`${panelId}-tab-${t.id}`}
                        className="actions-panel"
                        hidden={t.id !== tab}
                    >
                        <h3 className="actions-print-title">{t.title}</h3>
                        {t.id === 'action' && extraAttacks > 0 && (
                            <p className="actions-turn-note"><strong>Extra Attack:</strong> the Attack action lets you make {extraAttacks + 1} attacks.</p>
                        )}
                        {list.length > 0 ? (
                            <ul className="action-rows">
                                {list.map((row) => (
                                    <ActionRowItem
                                        key={row.key}
                                        row={row}
                                        castable={castable}
                                        open={!!open[row.key]}
                                        onToggle={() => setOpen((o) => ({ ...o, [row.key]: !o[row.key] }))}
                                        onRemove={row.storedIndex !== undefined && !readOnly ? () => removeAction(row.storedIndex!) : undefined}
                                    />
                                ))}
                            </ul>
                        ) : (
                            <p className="empty-note">Nothing uses your {TIMING_NOUN[t.id]} yet.</p>
                        )}

                        {t.id === 'action' && (
                            <div className="actions-basic">
                                <span className="actions-basic-title">Any character can</span>
                                <div className="actions-basic-chips">
                                    {BASIC_ACTIONS.map((b, i) => (
                                        <button
                                            key={b.name}
                                            type="button"
                                            className="actions-basic-chip"
                                            aria-expanded={basicOpen === i}
                                            onClick={() => setBasicOpen((o) => (o === i ? null : i))}
                                        >
                                            {b.name}
                                        </button>
                                    ))}
                                </div>
                                {basicOpen !== null && (
                                    <p className="actions-basic-detail"><strong>{BASIC_ACTIONS[basicOpen].name}:</strong> {BASIC_ACTIONS[basicOpen].description}</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
