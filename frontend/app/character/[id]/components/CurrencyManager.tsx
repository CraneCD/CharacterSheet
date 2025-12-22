'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Currency } from '@/lib/types';

interface CurrencyManagerProps {
    characterId: string;
    initialCurrency?: Currency;
    onUpdate: (currency: Currency) => void;
}

export default function CurrencyManager({ characterId, initialCurrency, onUpdate }: CurrencyManagerProps) {
    const [currency, setCurrency] = useState<{ [key: string]: number | string }>(
        initialCurrency ? { ...initialCurrency } : { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 }
    );
    const [editing, setEditing] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        setCurrency(initialCurrency ? { ...initialCurrency } : { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 });
    }, [initialCurrency]);

    const currencyTypes = [
        { key: 'pp', label: 'Platinum', short: 'pp', color: '#E5E4E2' },
        { key: 'gp', label: 'Gold', short: 'gp', color: '#FFD700' },
        { key: 'ep', label: 'Electrum', short: 'ep', color: '#C9B037' },
        { key: 'sp', label: 'Silver', short: 'sp', color: '#C0C0C0' },
        { key: 'cp', label: 'Copper', short: 'cp', color: '#B87333' }
    ];

    const handleCurrencyChange = async (type: keyof Currency, value: number) => {
        const numValue = Math.max(0, Math.floor(value));
        const newCurrency = { ...currency, [type]: numValue };
        setCurrency(newCurrency);
        
        // Convert to proper Currency type (all numbers)
        const currencyForUpdate: Currency = {
            cp: typeof newCurrency.cp === 'number' ? newCurrency.cp : (newCurrency.cp === '' ? 0 : parseInt(newCurrency.cp as string) || 0),
            sp: typeof newCurrency.sp === 'number' ? newCurrency.sp : (newCurrency.sp === '' ? 0 : parseInt(newCurrency.sp as string) || 0),
            ep: typeof newCurrency.ep === 'number' ? newCurrency.ep : (newCurrency.ep === '' ? 0 : parseInt(newCurrency.ep as string) || 0),
            gp: typeof newCurrency.gp === 'number' ? newCurrency.gp : (newCurrency.gp === '' ? 0 : parseInt(newCurrency.gp as string) || 0),
            pp: typeof newCurrency.pp === 'number' ? newCurrency.pp : (newCurrency.pp === '' ? 0 : parseInt(newCurrency.pp as string) || 0),
        };
        
        try {
            // Get current character data first
            const character = await api.get(`/characters/${characterId}`);
            await api.put(`/characters/${characterId}`, {
                ...character,
                data: { ...character.data, currency: currencyForUpdate }
            });
            onUpdate(currencyForUpdate);
        } catch (err) {
            console.error('Failed to update currency', err);
            // Revert on error
            setCurrency(currency);
        }
    };

    const startEditing = (type: string) => {
        setEditing({ ...editing, [type]: true });
    };

    const stopEditing = (type: string) => {
        setEditing({ ...editing, [type]: false });
    };

    const convertToGold = (): number => {
        const getNumValue = (val: number | string | undefined): number => {
            if (val === undefined || val === '') return 0;
            return typeof val === 'number' ? val : parseInt(val) || 0;
        };
        const cpValue = getNumValue(currency.cp) / 100;
        const spValue = getNumValue(currency.sp) / 10;
        const epValue = getNumValue(currency.ep) / 2;
        const gpValue = getNumValue(currency.gp);
        const ppValue = getNumValue(currency.pp) * 10;
        return cpValue + spValue + epValue + gpValue + ppValue;
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>
                Currency
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '0.75rem' }}>
                {currencyTypes.map(({ key, label, short, color }) => {
                    const value = typeof currency[key] === 'number' ? currency[key] : (currency[key] || 0);
                    const isEditing = editing[key];
                    
                    return (
                        <div key={key} style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            padding: '0.5rem',
                            backgroundColor: 'var(--surface)',
                            borderRadius: '4px',
                            border: '1px solid var(--border)'
                        }}>
                            <div style={{ 
                                fontSize: '0.75rem', 
                                color: 'var(--text-muted)', 
                                marginBottom: '0.25rem',
                                textAlign: 'center'
                            }}>
                                {label}
                            </div>
                            {isEditing ? (
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={value === 0 ? '' : value}
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        if (val === '' || /^\d+$/.test(val)) {
                                            const newValue = val === '' ? '' : parseInt(val);
                                            setCurrency({ ...currency, [key]: newValue });
                                        }
                                    }}
                                    onBlur={() => {
                                        const finalValue = currency[key];
                                        const numValue = typeof finalValue === 'number' ? finalValue : (finalValue === '' ? 0 : parseInt(finalValue as string) || 0);
                                        handleCurrencyChange(key as keyof Currency, numValue);
                                        stopEditing(key);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const finalValue = currency[key];
                                            const numValue = typeof finalValue === 'number' ? finalValue : (finalValue === '' ? 0 : parseInt(finalValue as string) || 0);
                                            handleCurrencyChange(key as keyof Currency, numValue);
                                            stopEditing(key);
                                        } else if (e.key === 'Escape') {
                                            setCurrency(initialCurrency ? { ...initialCurrency } : { cp: 0, sp: 0, ep: 0, gp: 0, pp: 0 });
                                            stopEditing(key);
                                        }
                                    }}
                                    style={{
                                        width: '100%',
                                        textAlign: 'center',
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        border: '1px solid var(--primary)',
                                        borderRadius: '4px',
                                        padding: '0.25rem',
                                        backgroundColor: 'var(--surface)',
                                        color: 'var(--text)'
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <div
                                    onClick={() => startEditing(key)}
                                    style={{
                                        fontSize: '1rem',
                                        fontWeight: 'bold',
                                        cursor: 'pointer',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        transition: 'background-color 0.2s',
                                        width: '100%',
                                        textAlign: 'center',
                                        color: color
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    title="Click to edit"
                                >
                                    {typeof value === 'number' ? value.toLocaleString() : (value === '' ? '0' : value)}
                                </div>
                            )}
                            <div style={{ fontSize: '0.625rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                {short}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ 
                marginTop: '0.75rem', 
                paddingTop: '0.75rem', 
                borderTop: '1px solid var(--border)',
                textAlign: 'center',
                fontSize: '0.875rem',
                color: 'var(--text-muted)'
            }}>
                Total: {convertToGold().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} gp
            </div>
        </div>
    );
}
