'use client';

import { useState, useEffect } from 'react';

interface AbilityScores {
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}

export type AbilityMethod = 'standard' | 'pointBuy' | 'manual';

interface StepAbilitiesProps {
    initialScores?: AbilityScores;
    /** The method chosen on an earlier visit; omit on the first visit to start fresh. */
    method?: AbilityMethod;
    onUpdate: (scores: AbilityScores) => void;
    onMethodChange?: (method: AbilityMethod) => void;
}

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_COSTS: { [key: number]: number } = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};
const POINT_BUY_BUDGET = 27;

/** Starting scores when switching to a method (manual keeps whatever is there). */
function startingScores(method: AbilityMethod, current: AbilityScores): AbilityScores {
    if (method === 'pointBuy') return { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
    if (method === 'standard') return { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
    return current;
}

export default function StepAbilities({ initialScores, method: savedMethod, onUpdate, onMethodChange }: StepAbilitiesProps) {
    const defaults = initialScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 };
    const [method, setMethod] = useState<AbilityMethod>(savedMethod ?? 'standard');
    // Coming back to this step (or resuming a draft) keeps the scores; a first visit starts the default method fresh
    const [scores, setScores] = useState<AbilityScores>(() => savedMethod ? defaults : startingScores('standard', defaults));

    // Manual input editing state
    const [editingScores, setEditingScores] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (!savedMethod) {
            onUpdate(scores);
            onMethodChange?.(method);
        }
        // First visit only: publish the fresh starting scores and method
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeMethod = (next: AbilityMethod) => {
        if (next === method) return;
        const nextScores = startingScores(next, scores);
        setMethod(next);
        setEditingScores({});
        setScores(nextScores);
        onUpdate(nextScores);
        onMethodChange?.(next);
    };

    // Derived from the scores, so they survive leaving and returning to the step
    const assignedStandard: { [key: string]: number | null } = Object.fromEntries(
        ABILITIES.map(a => [a, method === 'standard' && STANDARD_ARRAY.includes(scores[a]) ? scores[a] : null])
    );
    const pointsRemaining = POINT_BUY_BUDGET - ABILITIES.reduce((sum, a) => sum + (POINT_BUY_COSTS[scores[a]] ?? 0), 0);

    const handleStandardAssign = (ability: string, value: string) => {
        const val = value === '' ? 0 : parseInt(value);
        if (isNaN(val)) return;
        const newScores = { ...scores, [ability]: val };
        setScores(newScores);
        onUpdate(newScores);
    };

    const handlePointBuy = (ability: keyof AbilityScores, change: number) => {
        const currentScore = scores[ability];
        const newScore = currentScore + change;

        if (newScore < 8 || newScore > 15) return;

        const currentCost = POINT_BUY_COSTS[currentScore];
        const newCost = POINT_BUY_COSTS[newScore];
        const costDiff = newCost - currentCost;

        if (pointsRemaining - costDiff < 0) return;

        const newScores = { ...scores, [ability]: newScore };
        setScores(newScores);
        onUpdate(newScores);
    };

    const handleManualChange = (ability: keyof AbilityScores, value: number) => {
        const newScores = { ...scores, [ability]: value };
        setScores(newScores);
        onUpdate(newScores);
    };

    const getAvailableStandardValues = (currentAbility: string) => {
        const usedValues = Object.entries(assignedStandard)
            .filter(([key, val]) => key !== currentAbility && val !== null)
            .map(([_, val]) => val);
        return STANDARD_ARRAY.filter(val => !usedValues.includes(val));
    };

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Assign Ability Scores</h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                <button
                    className={`btn ${method === 'standard' ? '' : 'btn-ghost'}`}
                    onClick={() => changeMethod('standard')}
                    aria-pressed={method === 'standard'}
                >
                    Standard Array
                </button>
                <button
                    className={`btn ${method === 'pointBuy' ? '' : 'btn-ghost'}`}
                    onClick={() => changeMethod('pointBuy')}
                    aria-pressed={method === 'pointBuy'}
                >
                    Point Buy
                </button>
                <button
                    data-testid="method-manual"
                    className={`btn ${method === 'manual' ? '' : 'btn-ghost'}`}
                    onClick={() => changeMethod('manual')}
                    aria-pressed={method === 'manual'}
                >
                    Manual / Rolled
                </button>
            </div>

            <div className="card">
                {method === 'standard' && (
                    <div>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            Assign each value from the standard array [15, 14, 13, 12, 10, 8] to an ability score.
                        </p>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {ABILITIES.map(ability => (
                                <div key={ability} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label htmlFor={`field-standard-${ability}`} style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</label>
                                    <select id={`field-standard-${ability}`}
                                        className="input"
                                        data-testid={`standard-${ability}`}
                                        value={assignedStandard[ability] || ''}
                                        onChange={(e) => handleStandardAssign(ability, e.target.value)}
                                        style={{ width: '100px' }}
                                    >
                                        <option value="">-</option>
                                        {(assignedStandard[ability] ? [assignedStandard[ability]] : []).concat(getAvailableStandardValues(ability) as any).map((val: any) => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {method === 'pointBuy' && (
                    <div>
                        <div style={{ marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.25rem', textAlign: 'center' }}>
                            Points Remaining: <span style={{ color: pointsRemaining < 0 ? 'var(--error)' : 'var(--primary)' }}>{pointsRemaining}</span> / 27
                        </div>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {ABILITIES.map(ability => (
                                <div key={ability} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span id={`pointbuy-${ability}`} style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</span>
                                    <div role="group" aria-labelledby={`pointbuy-${ability}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            className="btn btn-secondary"
                                            aria-label={`Decrease ${ability.toUpperCase()}`}
                                            onClick={() => handlePointBuy(ability, -1)}
                                            disabled={scores[ability] <= 8}
                                        >-</button>
                                        <span aria-live="polite" style={{ width: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{scores[ability]}</span>
                                        <button
                                            className="btn btn-secondary"
                                            aria-label={`Increase ${ability.toUpperCase()}`}
                                            onClick={() => handlePointBuy(ability, 1)}
                                            disabled={scores[ability] >= 15 || pointsRemaining < (POINT_BUY_COSTS[scores[ability] + 1] - POINT_BUY_COSTS[scores[ability]])}
                                        >+</button>
                                    </div>
                                    <div style={{ width: '4rem', textAlign: 'right', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        Cost: {POINT_BUY_COSTS[scores[ability]]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {method === 'manual' && (
                    <div>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                            Enter your rolled scores manually.
                        </p>
                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                            {ABILITIES.map(ability => (
                                <div key={ability} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <label htmlFor={`field-manual-${ability}`} style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</label>
                                    <input id={`field-manual-${ability}`}
                                        type="text"
                                        data-testid={`manual-${ability}`}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="input"
                                        value={editingScores[ability] !== undefined 
                                            ? editingScores[ability] 
                                            : (scores[ability] === 0 ? '' : scores[ability].toString())}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '' || /^\d+$/.test(val)) {
                                                setEditingScores({ ...editingScores, [ability]: val });
                                            }
                                        }}
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            const numValue = val === '' ? 0 : (parseInt(val) || 0);
                                            handleManualChange(ability, numValue);
                                            const newEditing = { ...editingScores };
                                            delete newEditing[ability];
                                            setEditingScores(newEditing);
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.currentTarget.blur();
                                            } else if (e.key === 'Escape') {
                                                const newEditing = { ...editingScores };
                                                delete newEditing[ability];
                                                setEditingScores(newEditing);
                                                e.currentTarget.blur();
                                            }
                                        }}
                                        style={{ width: '100px' }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
