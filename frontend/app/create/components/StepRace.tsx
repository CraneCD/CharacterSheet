'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Race } from '@/lib/types';

interface StepRaceProps {
    selectedRaceId?: string;
    onSelect: (race: Race) => void;
}

export default function StepRace({ selectedRaceId, onSelect }: StepRaceProps) {
    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/reference/races')
            .then(data => {
                setRaces(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load races', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading races...</div>;

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Choose a Race</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {races.map(race => {
                    const isSelected = selectedRaceId === race.id;
                    return (
                        <div
                            key={race.id}
                            className={`card ${isSelected ? 'highlight' : ''}`}
                            style={{
                                cursor: 'pointer',
                                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                backgroundColor: isSelected ? 'var(--surface-highlight)' : 'var(--surface)'
                            }}
                            onClick={() => onSelect(race)}
                        >
                            <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{race.name}</h3>
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>{race.description}</p>

                            <div style={{ fontSize: '0.875rem' }}>
                                <strong>Traits:</strong> {race.traits.join(', ')}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
