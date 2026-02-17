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
    const [editValues, setEditValues] = useState<{ current: number | string; max: number | string; temp: number | string }>({
        current: hp.current,
        max: hp.max,
        temp: hp.temp
    });

    useEffect(() => {
        if (initialHP) {
            setHp(initialHP);
            setEditValues({
                current: initialHP.current,
                max: initialHP.max,
                temp: initialHP.temp
            });
        }
    }, [initialHP?.current, initialHP?.max, initialHP?.temp]);

    const handleSave = async () => {
        try {
            // Validate and ensure no empty values - convert to proper HP type (all numbers)
            const validatedValues: HP = {
                current: typeof editValues.current === 'number' ? editValues.current : (editValues.current === '' ? 0 : Number(editValues.current) || 0),
                max: typeof editValues.max === 'number' ? editValues.max : (editValues.max === '' ? 0 : Number(editValues.max) || 0),
                temp: typeof editValues.temp === 'number' ? editValues.temp : (editValues.temp === '' ? 0 : Number(editValues.temp) || 0)
            };
            const updated = await api.patch(`/characters/${characterId}/hp`, {
                current: validatedValues.current,
                max: validatedValues.max,
                temp: validatedValues.temp
            });
            setHp(validatedValues);
            onUpdate(validatedValues);
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
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="input"
                            value={typeof editValues.current === 'string' ? editValues.current : (editValues.current === 0 ? '' : editValues.current.toString())}
                            onChange={e => {
                                const val = e.target.value;
                                if (val === '' || /^\d+$/.test(val)) {
                                    setEditValues({ ...editValues, current: val === '' ? '' : Number(val) });
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    setEditValues({ ...editValues, current: 0 });
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Max</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="input"
                            value={typeof editValues.max === 'string' ? editValues.max : (editValues.max === 0 ? '' : editValues.max.toString())}
                            onChange={e => {
                                const val = e.target.value;
                                if (val === '' || /^\d+$/.test(val)) {
                                    setEditValues({ ...editValues, max: val === '' ? '' : Number(val) });
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    setEditValues({ ...editValues, max: 0 });
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Temp</label>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="input"
                            value={typeof editValues.temp === 'string' ? editValues.temp : (editValues.temp === 0 ? '' : editValues.temp.toString())}
                            onChange={e => {
                                const val = e.target.value;
                                if (val === '' || /^\d+$/.test(val)) {
                                    setEditValues({ ...editValues, temp: val === '' ? '' : Number(val) });
                                }
                            }}
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    setEditValues({ ...editValues, temp: 0 });
                                }
                            }}
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
            <div className="health-box" style={{ cursor: 'pointer', flex: '1 1 auto', minWidth: 0 }} onClick={() => { 
                setEditValues({ current: hp.current, max: hp.max, temp: hp.temp }); 
                setIsEditing(true); 
            }}>
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
