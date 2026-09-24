'use client';

import { useState, useEffect, memo, useId, useRef } from 'react';
import { api } from '@/lib/api';
import { HP } from '@/lib/types';
import { applyDamage, applyHealing, applyTempHp, getHpStatus, HpStatus } from '@/lib/hp';
import { Button, SectionHeader, TextField, useOptimisticSave, useToast } from '@/app/components/ui';

interface HPManagerProps {
    characterId: string;
    initialHP: HP;
    onUpdate: (newHP: HP) => void;
}

const STATUS_LABELS: Partial<Record<HpStatus, string>> = {
    bloodied: 'Bloodied',
    critical: 'Critical',
    down: 'Unconscious',
    dead: 'Dead',
};

function toNumber(value: string): number {
    const n = parseInt(value, 10);
    return Number.isFinite(n) ? Math.max(0, n) : 0;
}

function HPManager({ characterId, initialHP, onUpdate }: HPManagerProps) {
    const toast = useToast();
    const save = useOptimisticSave();
    const amountId = useId();
    const [hp, setHp] = useState<HP>(initialHP || { current: 0, max: 0, temp: 0 });
    const [amount, setAmount] = useState('');
    const [critical, setCritical] = useState(false);
    const [lastChange, setLastChange] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState({ current: '', max: '', temp: '' });

    const hpRef = useRef(hp);
    hpRef.current = hp;

    useEffect(() => {
        if (!initialHP) return;
        const local = hpRef.current;
        // Changed elsewhere (a rest, level up, reload): the last-change note no longer applies
        if (local.current !== initialHP.current || local.max !== initialHP.max || local.temp !== initialHP.temp) {
            setLastChange('');
        }
        setHp(initialHP);
        // Sync when the stored values change (rests, level-ups, reloads)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialHP?.current, initialHP?.max, initialHP?.temp, initialHP?.deathSaves?.successes, initialHP?.deathSaves?.failures]);

    /** Show the new HP right away, save it, and put the old HP back if saving fails. */
    const commit = (next: HP, message: string) => {
        const previous = hp;
        setLastChange(message);
        return save({
            apply: () => {
                setHp(next);
                onUpdate(next);
            },
            rollback: () => {
                setHp(previous);
                onUpdate(previous);
                setLastChange('');
            },
            request: () => api.patch(`/characters/${characterId}/hp`, {
                current: next.current,
                max: next.max,
                temp: next.temp,
                deathSaves: next.deathSaves ?? { successes: 0, failures: 0 },
            }),
            errorMessage: "Couldn't update HP",
        });
    };

    const value = toNumber(amount);
    const status = getHpStatus(hp);
    const isDown = hp.current <= 0;
    const deathSaves = hp.deathSaves ?? { successes: 0, failures: 0 };
    const stable = isDown && deathSaves.successes >= 3;
    const percent = hp.max > 0 ? Math.round((Math.max(0, hp.current) / hp.max) * 100) : 0;
    // Temporary HP shows as a striped segment after current HP, within the bar
    const tempPercent = hp.max > 0 ? Math.min(100 - percent, Math.round((Math.max(0, hp.temp) / hp.max) * 100)) : 0;

    const handleDamage = () => {
        if (value <= 0) return;
        const result = applyDamage(hp, value, { critical: isDown && critical });
        const parts = [`Took ${value} damage`];
        if (result.absorbedByTemp > 0) parts.push(`${result.absorbedByTemp} absorbed by temp HP`);
        if (result.deathSaveFailuresAdded > 0) {
            parts.push(`${result.deathSaveFailuresAdded} death save ${result.deathSaveFailuresAdded === 1 ? 'failure' : 'failures'}`);
        }
        commit(result.hp, parts.join(' · '));
        if (result.instantDeath) {
            toast.error('Massive damage: the damage left after dropping to 0 HP equals or exceeds max HP, so the character dies outright.');
        }
        setAmount('');
        setCritical(false);
    };

    const handleHeal = () => {
        if (value <= 0) return;
        const result = applyHealing(hp, value);
        if (result.healed === 0) {
            setLastChange('Already at full HP');
            return;
        }
        commit(result.hp, `Healed ${result.healed} HP`);
        setAmount('');
    };

    const handleTempHp = () => {
        if (value <= 0) return;
        const result = applyTempHp(hp, value);
        if (!result.gained) {
            setLastChange(`Kept ${hp.temp} temp HP (temporary HP doesn't stack)`);
            return;
        }
        commit(result.hp, `Temp HP set to ${value}`);
        setAmount('');
    };

    const handleDeathSave = (type: 'successes' | 'failures', index: number) => {
        const currentCount = deathSaves[type];
        const nextCount = Math.max(0, Math.min(3, currentCount === index ? index - 1 : index));
        const next = { ...hp, deathSaves: { ...deathSaves, [type]: nextCount } };
        commit(next, `Death save ${type === 'successes' ? 'successes' : 'failures'}: ${nextCount}`);
    };

    const startEditing = () => {
        setEditValues({ current: String(hp.current), max: String(hp.max), temp: String(hp.temp || 0) });
        setIsEditing(true);
    };

    const saveEdit = async () => {
        const max = toNumber(editValues.max);
        const next: HP = {
            ...hp,
            max,
            current: Math.min(toNumber(editValues.current), max),
            temp: toNumber(editValues.temp),
        };
        setIsEditing(false);
        await commit(next, 'HP updated');
    };

    const numericOnly = (value: string) => value === '' || /^\d+$/.test(value);

    if (isEditing) {
        return (
            <div className="card">
                <SectionHeader title="Edit Hit Points" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveEdit();
                    }}
                >
                    <div className="hp-edit-grid">
                        {(['current', 'max', 'temp'] as const).map((field) => (
                            <TextField
                                key={field}
                                label={field === 'current' ? 'Current' : field === 'max' ? 'Max' : 'Temp'}
                                inputMode="numeric"
                                value={editValues[field]}
                                onChange={(e) => {
                                    if (numericOnly(e.target.value)) setEditValues({ ...editValues, [field]: e.target.value });
                                }}
                                autoFocus={field === 'current'}
                            />
                        ))}
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'flex-end' }}>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className={`card hp-card hp-${status}`}>
            <SectionHeader
                title="Hit Points"
                actions={
                    <Button variant="ghost" size="sm" onClick={startEditing} aria-label="Edit hit points">
                        ✎ Edit
                    </Button>
                }
            />

            <div className="hp-summary">
                <div className="hp-numbers">
                    <span className="hp-current">{hp.current}</span>
                    <span className="hp-max">/ {hp.max}</span>
                    {hp.temp > 0 && <span className="hp-temp">+{hp.temp} temp</span>}
                </div>
                {STATUS_LABELS[status] && (
                    <span className={`hp-status hp-status-${status}`}>{stable ? 'Stable' : STATUS_LABELS[status]}</span>
                )}
            </div>

            <div
                className="hp-bar"
                role="progressbar"
                aria-label="Hit points"
                aria-valuemin={0}
                aria-valuemax={hp.max}
                aria-valuenow={Math.max(0, hp.current)}
                aria-valuetext={`${hp.current} of ${hp.max} hit points${hp.temp > 0 ? `, plus ${hp.temp} temporary` : ''}`}
            >
                <div className="hp-bar-fill" style={{ width: `${percent}%` }} />
                {tempPercent > 0 && <div className="hp-bar-temp" style={{ width: `${tempPercent}%` }} />}
            </div>

            <div className="hp-controls no-print">
                <label className="visually-hidden" htmlFor={amountId}>Amount</label>
                <input
                    id={amountId}
                    className="input hp-amount"
                    type="text"
                    inputMode="numeric"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => {
                        if (numericOnly(e.target.value)) setAmount(e.target.value);
                    }}
                />
                <Button variant="danger" onClick={handleDamage} disabled={value <= 0}>Damage</Button>
                <Button variant="secondary" onClick={handleHeal} disabled={value <= 0}>Heal</Button>
                <Button variant="ghost" onClick={handleTempHp} disabled={value <= 0} title="Set temporary hit points">
                    Temp HP
                </Button>
            </div>
            {isDown && (
                <label className="hp-critical-toggle no-print">
                    <input type="checkbox" checked={critical} onChange={(e) => setCritical(e.target.checked)} />
                    Critical hit (2 death save failures)
                </label>
            )}

            <div className="hp-last-change" aria-live="polite">{lastChange}</div>

            {(isDown || deathSaves.successes > 0 || deathSaves.failures > 0) && (
                <div className="death-saves" role="group" aria-label="Death saves">
                    <div className="section-title" style={{ fontSize: 'var(--font-size-xs)' }}>Death Saves</div>
                    {(['successes', 'failures'] as const).map((type) => (
                        <div key={type} className="death-save-row">
                            <span className="death-save-label">{type === 'successes' ? 'Successes' : 'Failures'}</span>
                            {[1, 2, 3].map((k) => (
                                <button
                                    key={k}
                                    type="button"
                                    className={`death-save-box death-save-${type}`}
                                    aria-pressed={deathSaves[type] >= k}
                                    aria-label={`${type === 'successes' ? 'Success' : 'Failure'} ${k}`}
                                    onClick={() => handleDeathSave(type, k)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(HPManager);
