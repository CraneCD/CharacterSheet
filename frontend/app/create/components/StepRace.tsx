'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Race } from '@/lib/types';
import { RACE_TRAITS } from '@/lib/wizardReference';

interface StepRaceProps {
    selectedRaceId?: string;
    onSelect: (race: Race) => void;
}

/** Display order for species groups; anything else falls under "Other". */
const SOURCE_ORDER = ['PHB 2024', 'Monsters of the Multiverse'];

export default function StepRace({ selectedRaceId, onSelect }: StepRaceProps) {
    const [races, setRaces] = useState<Race[]>([]);
    const [loading, setLoading] = useState(true);
    const [showLegacy, setShowLegacy] = useState(false);

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

    if (loading) return <div>Loading species...</div>;

    const selectedIsLegacy = races.some(r => r.id === selectedRaceId && r.legacy);
    const visible = races.filter(r => !r.legacy || showLegacy || r.id === selectedRaceId);
    const groups = new Map<string, Race[]>();
    for (const race of visible) {
        const key = race.legacy ? 'Legacy (pre-2024)' : (SOURCE_ORDER.includes(race.source || '') ? race.source! : 'Other');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key)!.push(race);
    }
    const groupOrder = [...SOURCE_ORDER, 'Other', 'Legacy (pre-2024)'].filter(g => groups.has(g));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
                <h2 className="heading" style={{ margin: 0 }}>Choose a Species</h2>
                <label style={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <input
                        type="checkbox"
                        checked={showLegacy || selectedIsLegacy}
                        onChange={e => setShowLegacy(e.target.checked)}
                    />
                    Show legacy (pre-2024) species
                </label>
            </div>
            {groupOrder.map(group => (
                <div key={group} style={{ marginBottom: '1.5rem' }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                        {group === 'PHB 2024' ? "Player's Handbook (2024)" : group}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                        {groups.get(group)!.map(race => {
                            const isSelected = selectedRaceId === race.id;
                            const traits = race.traits && race.traits.length > 0 ? race.traits : (RACE_TRAITS[race.id] || []);
                            return (
                                <div
                                    key={race.id}
                                    data-testid={`race-${race.id}`}
                                    className={`card ${isSelected ? 'highlight' : ''}`}
                                    style={{
                                        cursor: 'pointer',
                                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                                        backgroundColor: isSelected ? 'var(--surface-highlight)' : 'var(--surface)'
                                    }}
                                    onClick={() => onSelect(race)}
                                >
                                    <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>{race.name}</h3>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>{race.description}</p>
                                    <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                        <strong>Size:</strong> {race.size} · <strong>Speed:</strong> {race.speed} ft.
                                    </div>
                                    <div style={{ fontSize: '0.875rem' }}>
                                        <strong>Traits:</strong> {traits.join(', ')}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
