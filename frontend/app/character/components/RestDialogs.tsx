'use client';

import { useState } from 'react';
import { CharacterData } from '@/lib/types';
import { hitDieHealing, planLongRest, planShortRest, RestContext, rollHitDie } from '@/lib/rest';
import { Button, Modal } from '@/app/components/ui';

interface SummaryListProps {
    items: string[];
    empty: string;
}

function SummaryList({ items, empty }: SummaryListProps) {
    if (items.length === 0) return <p className="rest-empty">{empty}</p>;
    return (
        <ul className="rest-summary">
            {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
    );
}

interface LongRestDialogProps {
    data: Partial<CharacterData>;
    context: RestContext;
    busy: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

/** Preview of everything a Long Rest restores, then one confirm. */
export function LongRestDialog({ data, context, busy, onConfirm, onCancel }: LongRestDialogProps) {
    const plan = planLongRest(data, context);
    return (
        <Modal
            title="Long Rest"
            size="sm"
            onClose={onCancel}
            dismissible={!busy}
            footer={
                <>
                    <Button variant="secondary" onClick={onCancel} disabled={busy}>Cancel</Button>
                    <Button onClick={onConfirm} loading={busy}>Take Long Rest</Button>
                </>
            }
        >
            <p className="rest-intro">At least 8 hours of sleep or light activity. You&apos;ll recover:</p>
            <SummaryList items={plan.summary} empty="Nothing to recover: you're already fully rested." />
        </Modal>
    );
}

interface ShortRestDialogProps {
    data: Partial<CharacterData>;
    context: RestContext;
    conModifier: number;
    busy: boolean;
    onConfirm: (hitDiceRolls: number[]) => void;
    onCancel: () => void;
}

function formatMod(n: number): string {
    return n >= 0 ? `+${n}` : `${n}`;
}

/**
 * Short Rest: spend Hit Dice one at a time (rolled for you, or type in your own roll),
 * see the healing add up, and preview the other things that come back.
 */
export function ShortRestDialog({ data, context, conModifier, busy, onConfirm, onCancel }: ShortRestDialogProps) {
    const hitDice = data.hitDice;
    const dieType = hitDice?.dieType ?? 8;
    const available = hitDice ? Math.max(0, hitDice.total - hitDice.spent) : 0;
    const [rolls, setRolls] = useState<string[]>([]);

    const numericRolls = rolls.map((r) => Math.min(dieType, Math.max(1, parseInt(r, 10) || 1)));
    const plan = planShortRest(data, context, numericRolls, conModifier);
    const hp = data.hp ?? { current: 0, max: 0, temp: 0 };
    const hpAfter = plan.updates.hp?.current ?? hp.current;
    const otherRecovery = plan.summary.filter((line) => !line.startsWith('Spent '));

    return (
        <Modal
            title="Short Rest"
            onClose={onCancel}
            dismissible={!busy}
            footer={
                <>
                    <Button variant="secondary" onClick={onCancel} disabled={busy}>Cancel</Button>
                    <Button onClick={() => onConfirm(numericRolls)} loading={busy}>Finish Short Rest</Button>
                </>
            }
        >
            <p className="rest-intro">1 hour of rest. Spend Hit Dice to heal: each die heals its roll {formatMod(conModifier)} (CON), minimum 1.</p>

            <div className="rest-hit-dice">
                <div>
                    <strong>{available - rolls.length}</strong> of {hitDice?.total ?? 0} Hit Dice left (d{dieType})
                </div>
                <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setRolls([...rolls, String(rollHitDie(dieType))])}
                    disabled={rolls.length >= available || busy}
                >
                    Roll a d{dieType}
                </Button>
            </div>

            {rolls.length > 0 && (
                <ul className="rest-rolls">
                    {rolls.map((roll, i) => (
                        <li key={i}>
                            <label htmlFor={`hit-die-${i}`}>Die {i + 1}</label>
                            <input
                                id={`hit-die-${i}`}
                                className="input"
                                inputMode="numeric"
                                value={roll}
                                aria-describedby={`hit-die-${i}-heal`}
                                onChange={(e) => {
                                    if (e.target.value === '' || /^\d+$/.test(e.target.value)) {
                                        setRolls(rolls.map((r, j) => (j === i ? e.target.value : r)));
                                    }
                                }}
                            />
                            <span id={`hit-die-${i}-heal`} className="rest-roll-heal">+{hitDieHealing(numericRolls[i], conModifier)} HP</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label={`Remove die ${i + 1}`}
                                onClick={() => setRolls(rolls.filter((_, j) => j !== i))}
                            >
                                &times;
                            </Button>
                        </li>
                    ))}
                </ul>
            )}

            <p className="rest-hp-preview">
                HP {hp.current} → <strong>{hpAfter}</strong> / {hp.max}
            </p>

            {otherRecovery.length > 0 && (
                <>
                    <p className="rest-intro" style={{ marginBottom: 0 }}>You&apos;ll also recover:</p>
                    <SummaryList items={otherRecovery} empty="" />
                </>
            )}
        </Modal>
    );
}
