'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { HitDice } from '@/lib/types';

interface HitDiceManagerProps {
    characterId: string;
    initialHitDice: HitDice | undefined;
    onUpdate: (newHitDice: HitDice) => void;
    conModifier: number; // Constitution modifier for healing calculation
}

export default function HitDiceManager({ characterId, initialHitDice, onUpdate, conModifier }: HitDiceManagerProps) {
    const [hitDice, setHitDice] = useState<HitDice>(initialHitDice || { total: 1, spent: 0, dieType: 8 });
    const [isRolling, setIsRolling] = useState(false);
    const [lastRoll, setLastRoll] = useState<number | null>(null);
    const [lastHealing, setLastHealing] = useState<number | null>(null);

    useEffect(() => {
        if (initialHitDice) {
            setHitDice(initialHitDice);
        }
    }, [initialHitDice]);

    const available = hitDice.total - hitDice.spent;

    const handleSpendHitDie = async (heal: boolean = false) => {
        if (available <= 0) {
            alert('No hit dice available to spend');
            return;
        }

        setIsRolling(true);
        try {
            // Roll the hit die
            const roll = Math.floor(Math.random() * hitDice.dieType) + 1;
            const healing = Math.max(1, roll + conModifier);
            
            setLastRoll(roll);
            setLastHealing(healing);

            // Update hit dice (increment spent)
            const newHitDice = { ...hitDice, spent: hitDice.spent + 1 };
            
            await api.patch(`/characters/${characterId}/hit-dice`, {
                spent: newHitDice.spent
            });

            setHitDice(newHitDice);
            onUpdate(newHitDice);

            // If healing, also update HP
            if (heal) {
                try {
                    const currentChar = await api.get(`/characters/${characterId}`);
                    const currentHP = currentChar.data.hp || { current: 0, max: 0, temp: 0 };
                    const newCurrent = Math.min(currentHP.current + healing, currentHP.max);
                    
                    await api.patch(`/characters/${characterId}/hp`, {
                        current: newCurrent
                    });
                } catch (err) {
                    console.error('Failed to update HP after healing', err);
                }
            }
        } catch (err) {
            console.error('Failed to spend hit die', err);
            alert('Failed to spend hit die');
        } finally {
            setIsRolling(false);
        }
    };

    const handleShortRest = async () => {
        // Reset spent hit dice (they recover on a long rest, but for short rest we just track spending)
        // Actually, in D&D 5e, hit dice are spent on short rest and recovered on long rest
        // For now, we'll just allow spending them. Long rest recovery can be added later.
        if (available <= 0) {
            alert('No hit dice available');
            return;
        }
        // Just show message - actual spending happens when user clicks "Spend & Heal"
        alert('Spend hit dice to heal during a short rest. Click "Spend & Heal" to use a hit die.');
    };

    const handleLongRest = async () => {
        // Recover all spent hit dice
        try {
            const newHitDice = { ...hitDice, spent: 0 };
            await api.patch(`/characters/${characterId}/hit-dice`, {
                spent: 0
            });
            setHitDice(newHitDice);
            onUpdate(newHitDice);
            setLastRoll(null);
            setLastHealing(null);
        } catch (err) {
            console.error('Failed to recover hit dice', err);
            alert('Failed to recover hit dice');
        }
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Hit Dice
            </h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 auto', minWidth: '120px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        Available
                    </div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        {available} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 'normal' }}>/ {hitDice.total}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        d{hitDice.dieType}
                    </div>
                </div>

                {lastRoll !== null && lastHealing !== null && (
                    <div style={{ 
                        padding: '0.5rem', 
                        backgroundColor: 'var(--surface)', 
                        borderRadius: '0.25rem',
                        fontSize: '0.875rem'
                    }}>
                        <div style={{ color: 'var(--text-muted)' }}>Last Roll:</div>
                        <div style={{ fontWeight: 'bold' }}>
                            {lastRoll} + {conModifier >= 0 ? `+${conModifier}` : conModifier} = <span style={{ color: 'var(--success)' }}>{lastHealing} HP</span>
                        </div>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                    className="button primary"
                    onClick={() => handleSpendHitDie(true)}
                    disabled={available <= 0 || isRolling}
                    style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                    {isRolling ? 'Rolling...' : 'Spend & Heal'}
                </button>
                <button
                    className="button secondary"
                    onClick={() => handleSpendHitDie(false)}
                    disabled={available <= 0 || isRolling}
                    style={{ flex: '1 1 auto', minWidth: '120px' }}
                >
                    {isRolling ? 'Rolling...' : 'Spend (No Heal)'}
                </button>
                <button
                    className="button secondary"
                    onClick={handleLongRest}
                    style={{ flex: '1 1 auto', minWidth: '100px', fontSize: '0.875rem' }}
                >
                    Long Rest
                </button>
            </div>

            {hitDice.spent > 0 && (
                <div style={{ 
                    marginTop: '0.75rem', 
                    padding: '0.5rem', 
                    backgroundColor: 'var(--surface)', 
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)'
                }}>
                    {hitDice.spent} hit {hitDice.spent === 1 ? 'die' : 'dice'} spent. Recover on long rest.
                </div>
            )}
        </div>
    );
}

