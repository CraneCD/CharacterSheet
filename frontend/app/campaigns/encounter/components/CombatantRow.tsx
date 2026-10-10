'use client';

import { memo, useId, useState } from 'react';
import { CONDITION_NAMES } from '@/lib/conditions';
import { Combatant } from '@/lib/initiative';
import { PartyMemberDm, partyStats } from '@/lib/campaigns';
import { getHpStatus } from '@/lib/hp';
import { formatModifier } from '@/lib/monsters';
import { Button, EditableNumber, Menu } from '@/app/components/ui';

interface CombatantRowProps {
    combatant: Combatant;
    /** Live sheet data for party members */
    pc?: PartyMemberDm;
    isCurrent: boolean;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onInitiative: (id: string, value: number | null) => void;
    onChange: (id: string, patch: Partial<Combatant>) => void;
    onDamage: (id: string, amount: number) => void;
    onHeal: (id: string, amount: number) => void;
    onDuplicate: (id: string) => void;
    onRemove: (id: string) => void;
}

const KIND_LABELS = { pc: 'Party', monster: 'Enemy', npc: 'NPC' } as const;

function CombatantRow({ combatant: c, pc, isCurrent, isSelected, onSelect, onInitiative, onChange, onDamage, onHeal, onDuplicate, onRemove }: CombatantRowProps) {
    const [amount, setAmount] = useState('');
    const amountId = useId();
    const hp = c.kind === 'pc' ? pc?.hp : c.hp;
    const status = hp ? getHpStatus({ ...hp, deathSaves: c.kind === 'pc' ? pc?.hp.deathSaves : undefined }) : 'healthy';
    const percent = hp && hp.max > 0 ? Math.round((Math.max(0, hp.current) / hp.max) * 100) : 0;
    const ac = c.kind === 'pc' ? (pc ? partyStats(pc).ac : undefined) : c.ac;
    const conditions = c.kind === 'pc' ? [...(pc?.conditions ?? []), ...(pc && pc.exhaustion > 0 ? [`Exhaustion ${pc.exhaustion}`] : [])] : (c.conditions ?? []);
    const value = Number(amount);

    const apply = (kind: 'damage' | 'heal') => {
        if (!(value > 0)) return;
        if (kind === 'damage') onDamage(c.id, value);
        else onHeal(c.id, value);
        setAmount('');
    };

    const toggleCondition = (name: string) => {
        const list = c.conditions ?? [];
        onChange(c.id, { conditions: list.includes(name) ? list.filter((x) => x !== name) : [...list, name] });
    };

    return (
        <li
            className={['combatant-row', `kind-${c.kind}`, `hp-${status}`, isCurrent && 'is-current', isSelected && 'is-selected', c.defeated && 'is-defeated'].filter(Boolean).join(' ')}
            aria-current={isCurrent ? 'step' : undefined}
        >
            <div className="combatant-init">
                <EditableNumber
                    label={`${c.name} initiative`}
                    value={c.initiative ?? 0}
                    display={c.initiative ?? '—'}
                    min={-20}
                    max={99}
                    className="combatant-init-value"
                    onSave={(v) => onInitiative(c.id, v)}
                />
                <span className="combatant-init-bonus" title="Initiative bonus">{formatModifier(c.initiativeBonus)}</span>
            </div>

            <button type="button" className="combatant-name" onClick={() => onSelect(c.id)} aria-pressed={isSelected}>
                <span className="combatant-name-text">{c.name}</span>
                <span className="combatant-tags">
                    <span className={`kind-badge kind-${c.kind}`}>{KIND_LABELS[c.kind]}</span>
                    {c.hidden && <span className="kind-badge">Hidden</span>}
                    {isCurrent && <span className="turn-tag">Turn</span>}
                </span>
            </button>

            <div className="combatant-ac" title="Armor Class">
                <span className="visually-hidden">AC </span>{ac ?? '—'}
            </div>

            <div className="combatant-hp">
                {hp ? (
                    <>
                        <div className="hp-bar" aria-hidden="true"><div className="hp-bar-fill" style={{ width: `${percent}%` }} /></div>
                        <span className="combatant-hp-text">{hp.current}/{hp.max}{hp.temp > 0 ? ` +${hp.temp}` : ''}</span>
                    </>
                ) : (
                    <span className="combatant-hp-text">—</span>
                )}
                {c.kind !== 'pc' && c.hp && (
                    <span className="combatant-hp-controls">
                        <label className="visually-hidden" htmlFor={amountId}>Damage or healing for {c.name}</label>
                        <input
                            id={amountId}
                            className="input hp-amount"
                            inputMode="numeric"
                            placeholder="±"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/g, ''))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    apply(e.shiftKey ? 'heal' : 'damage');
                                }
                            }}
                        />
                        <Button size="sm" variant="danger" onClick={() => apply('damage')} disabled={!(value > 0)} aria-label={`Damage ${c.name}`}>−</Button>
                        <Button size="sm" variant="secondary" onClick={() => apply('heal')} disabled={!(value > 0)} aria-label={`Heal ${c.name}`}>+</Button>
                    </span>
                )}
                {c.kind === 'pc' && <span className="combatant-hp-note">from their sheet</span>}
            </div>

            <div className="combatant-conditions">
                {conditions.map((name) => (
                    c.kind === 'pc'
                        ? <span key={name} className="condition-badge">{name}</span>
                        : (
                            <button key={name} type="button" className="condition-badge condition-badge-button" onClick={() => toggleCondition(name)} aria-label={`Remove ${name} from ${c.name}`} title="Remove">
                                {name} ×
                            </button>
                        )
                ))}
            </div>

            <div className="combatant-menu">
                <Menu
                    label="⋯"
                    ariaLabel={`Actions for ${c.name}`}
                    variant="ghost"
                    items={[
                        ...(c.kind !== 'pc' ? CONDITION_NAMES.map((name) => ({
                            label: `${(c.conditions ?? []).includes(name) ? '✓ ' : ''}${name}`,
                            onSelect: () => toggleCondition(name),
                        })) : []),
                        { label: c.hidden ? 'Show to players' : 'Hide from players', onSelect: () => onChange(c.id, { hidden: !c.hidden }), separatorBefore: c.kind !== 'pc' },
                        ...(c.kind !== 'pc' ? [{ label: c.defeated ? 'Back in the fight' : 'Mark defeated', onSelect: () => onChange(c.id, { defeated: !c.defeated }) }] : []),
                        ...(c.kind !== 'pc' ? [{ label: 'Duplicate', onSelect: () => onDuplicate(c.id) }] : []),
                        { label: 'Remove from encounter', onSelect: () => onRemove(c.id), danger: true, separatorBefore: true },
                    ]}
                />
            </div>
        </li>
    );
}

export default memo(CombatantRow);
