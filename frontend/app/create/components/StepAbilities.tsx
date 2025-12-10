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

interface StepAbilitiesProps {
    initialScores?: AbilityScores;
    onUpdate: (scores: AbilityScores) => void;
}

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];
const POINT_BUY_COSTS: { [key: number]: number } = {
    8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9
};

export default function StepAbilities({ initialScores, onUpdate }: StepAbilitiesProps) {
    const [method, setMethod] = useState<'standard' | 'pointBuy' | 'manual'>('standard');
    const [scores, setScores] = useState<AbilityScores>(initialScores || { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });

    // Standard Array State
    const [assignedStandard, setAssignedStandard] = useState<{ [key: string]: number | null }>({
        str: null, dex: null, con: null, int: null, wis: null, cha: null
    });

    // Point Buy State
    const [pointsRemaining, setPointsRemaining] = useState(27);

    // Initialize point buy if needed
    useEffect(() => {
        if (method === 'pointBuy') {
            // Reset to base 8s
            const baseScores = { str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8 };
            setScores(baseScores);
            setPointsRemaining(27);
            onUpdate(baseScores);
        } else if (method === 'standard') {
            // Reset standard array
            setAssignedStandard({ str: null, dex: null, con: null, int: null, wis: null, cha: null });
            const zeroScores = { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 };
            setScores(zeroScores);
            onUpdate(zeroScores);
        }
    }, [method]);

    const handleStandardAssign = (ability: string, value: string) => {
        const val = parseInt(value);
        if (isNaN(val)) return;

        const newAssigned = { ...assignedStandard, [ability]: val };
        setAssignedStandard(newAssigned);

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

        setPointsRemaining(pointsRemaining - costDiff);
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
                    className={`button ${method === 'standard' ? 'primary' : 'plain'}`}
                    onClick={() => setMethod('standard')}
                >
                    Standard Array
                </button>
                <button
                    className={`button ${method === 'pointBuy' ? 'primary' : 'plain'}`}
                    onClick={() => setMethod('pointBuy')}
                >
                    Point Buy
                </button>
                <button
                    className={`button ${method === 'manual' ? 'primary' : 'plain'}`}
                    onClick={() => setMethod('manual')}
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
                                    <label style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</label>
                                    <select
                                        className="input"
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
                                    <label style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <button
                                            className="button secondary"
                                            onClick={() => handlePointBuy(ability, -1)}
                                            disabled={scores[ability] <= 8}
                                        >-</button>
                                        <span style={{ width: '2rem', textAlign: 'center', fontWeight: 'bold' }}>{scores[ability]}</span>
                                        <button
                                            className="button secondary"
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
                                    <label style={{ fontWeight: 'bold', width: '3rem', textTransform: 'uppercase' }}>{ability}</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={scores[ability]}
                                        onChange={(e) => handleManualChange(ability, parseInt(e.target.value) || 0)}
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
