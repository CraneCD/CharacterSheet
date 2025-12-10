'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { HP } from '@/lib/types';

interface HPManagerProps {
    characterId: string;
    initialHP: HP;
    onUpdate: (newHP: HP) => void;
}

export default function HPManager({ characterId, initialHP, onUpdate }: HPManagerProps) {
    const [hp, setHp] = useState<HP>(initialHP || { current: 0, max: 0, temp: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [editValues, setEditValues] = useState<HP>(hp);

    useEffect(() => {
        if (initialHP) {
            setHp(initialHP);
            setEditValues(initialHP);
        }
    }, [initialHP]);

    const handleSave = async () => {
        try {
            const updated = await api.patch(`/characters/${characterId}/hp`, {
                current: Number(editValues.current),
                max: Number(editValues.max),
                temp: Number(editValues.temp || 0)
            });
            setHp(editValues);
            onUpdate(editValues);
            setIsEditing(false);
        } catch (err) {
            console.error('Failed to update HP', err);
            alert('Failed to update HP');
        }
    };

    const handleQuickChange = async (amount: number) => {
        const newCurrent = Math.min(Math.max(0, hp.current + amount), hp.max);
        if (newCurrent === hp.current) return;

        try {
            await api.patch(`/characters/${characterId}/hp`, {
                current: newCurrent
            });
            const newHP = { ...hp, current: newCurrent };
            setHp(newHP);
            onUpdate(newHP);
        } catch (err) {
            console.error('Failed to update HP', err);
        }
    };

    if (isEditing) {
        return (
            <div className="card" style={{ padding: '1rem', border: '1px solid var(--primary)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div>
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Current</label>
                        <input
                            type="number"
                            className="input"
                            value={editValues.current}
                            onChange={e => setEditValues({ ...editValues, current: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Max</label>
                        <input
                            type="number"
                            className="input"
                            value={editValues.max}
                            onChange={e => setEditValues({ ...editValues, max: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Temp</label>
                        <input
                            type="number"
                            className="input"
                            value={editValues.temp}
                            onChange={e => setEditValues({ ...editValues, temp: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button className="button secondary" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="button primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        );
    }

    return (
        <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="health-box" style={{ cursor: 'pointer', flex: '1 1 auto', minWidth: 0 }} onClick={() => { setEditValues(hp); setIsEditing(true); }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase' }}>Current HP</div>
                <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: 'var(--success)', wordBreak: 'break-word' }}>
                    {hp.current} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {hp.max}</span>
                </div>
                {hp.temp > 0 && (
                    <div style={{ color: 'var(--act)', fontSize: '0.875rem', fontWeight: 'bold' }}>+{hp.temp} Temp HP</div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: '0 0 auto' }}>
                <button
                    className="button"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                    onClick={() => handleQuickChange(1)}
                >
                    +1
                </button>
                <button
                    className="button"
                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}
                    onClick={() => handleQuickChange(-1)}
                >
                    -1
                </button>
            </div>
        </div>
    );
}
