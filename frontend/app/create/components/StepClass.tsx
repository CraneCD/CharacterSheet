'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { ClassInfo, Subclass } from '@/lib/types';

export interface FightingStyleOption {
    id: string;
    name: string;
    description: string;
}

interface StepClassProps {
    selectedClassId?: string;
    onSelect: (cls: ClassInfo) => void;
    selectedSubclassId?: string;
    onSelectSubclass: (sub: Subclass | null) => void;
    selectedFightingStyleId?: string;
    onSelectFightingStyle: (id: string | null) => void;
}

export default function StepClass({ selectedClassId, onSelect, selectedSubclassId, onSelectSubclass, selectedFightingStyleId, onSelectFightingStyle }: StepClassProps) {
    const [classes, setClasses] = useState<ClassInfo[]>([]);
    const [subclasses, setSubclasses] = useState<Subclass[]>([]);
    const [fightingStyles, setFightingStyles] = useState<FightingStyleOption[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            api.get('/reference/classes'),
            api.get('/reference/subclasses'),
            api.get('/reference/fighting-styles')
        ]).then(([clsData, subData, fsData]) => {
            setClasses(clsData);
            setSubclasses(subData);
            setFightingStyles(fsData || []);
            setLoading(false);
        }).catch(err => {
            console.error('Failed to load data', err);
            setLoading(false);
        });
    }, []);

    const selectedClass = classes.find(c => c.id === selectedClassId);
    const availableSubclasses = selectedClass
        ? subclasses.filter(s => s.classId === selectedClass.id)
        : [];

    // Check if this class needs a subclass at level 1
    const needsSubclass = selectedClass?.subclassLevel === 1;

    if (loading) return <div>Loading classes...</div>;

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Choose a Class</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {classes.map(cls => {
                    const isSelected = selectedClassId === cls.id;
                    return (
                        <div
                            key={cls.id}
                            className={`card ${isSelected ? 'highlight' : ''}`}
                            style={{
                                cursor: 'pointer',
                                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                backgroundColor: isSelected ? 'var(--surface-highlight)' : 'var(--surface)'
                            }}
                            onClick={() => {
                                onSelect(cls);
                                if (selectedClassId !== cls.id) {
                                    onSelectSubclass(null);
                                    onSelectFightingStyle(null);
                                }
                            }}
                        >
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{cls.name}</h3>
                            {cls.description && (
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{cls.description}</p>
                            )}

                            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <strong>Hit Die:</strong> d{cls.hitDie}
                            </div>
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                                <strong>Primary Ability:</strong> {cls.primaryAbility.join(', ').toUpperCase()}
                            </div>
                            <div style={{ fontSize: '0.875rem' }}>
                                <strong>Saves:</strong> {cls.savingThrows.join(', ').toUpperCase()}
                            </div>
                        </div>
                    );
                })}
            </div>

            {needsSubclass && (
                <div className="card" style={{ border: '1px solid var(--primary)', padding: '1.5rem', marginTop: '1rem' }}>
                    <h3 className="heading" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                        Select {selectedClass.name} Subclass
                    </h3>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        As a {selectedClass.name}, you choose your subclass at 1st Level.
                    </p>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {availableSubclasses.map(sub => (
                            <div
                                key={sub.id}
                                onClick={() => onSelectSubclass(sub)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: selectedSubclassId === sub.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    backgroundColor: selectedSubclassId === sub.id ? 'var(--surface-highlight)' : 'var(--surface)'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{sub.name}</div>
                                <div style={{ fontSize: '0.875rem' }}>{sub.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedClassId === 'fighter' && (
                <div className="card" style={{ border: '1px solid var(--primary)', padding: '1.5rem', marginTop: '1rem' }}>
                    <h3 className="heading" style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                        Fighting Style
                    </h3>
                    <p style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
                        Fighters choose a Fighting Style at 1st level.
                    </p>
                    <div style={{ display: 'grid', gap: '0.75rem' }}>
                        {fightingStyles.map(fs => (
                            <div
                                key={fs.id}
                                onClick={() => onSelectFightingStyle(selectedFightingStyleId === fs.id ? null : fs.id)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '1rem',
                                    borderRadius: '8px',
                                    border: selectedFightingStyleId === fs.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                                    backgroundColor: selectedFightingStyleId === fs.id ? 'var(--surface-highlight)' : 'var(--surface)'
                                }}
                            >
                                <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{fs.name}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{fs.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
