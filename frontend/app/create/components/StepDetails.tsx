'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Background } from '@/lib/types';
import { getBackgroundAsi, getBackgroundSkills } from '@/lib/wizardReference';

interface StepDetailsProps {
    data: {
        name: string;
        backgroundId: string;
        alignment: string;
    };
    onUpdate: (data: any) => void;
}

const ALIGNMENTS = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

export default function StepDetails({ data, onUpdate }: StepDetailsProps) {
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/reference/backgrounds')
            .then(data => {
                setBackgrounds(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load backgrounds', err);
                setLoading(false);
            });
    }, []);

    const handleChange = (field: string, value: string) => {
        onUpdate({ ...data, [field]: value });
    };

    if (loading) return <div>Loading backgrounds...</div>;

    const bgId = (data.backgroundId || '').toLowerCase();
    const selectedBackground = backgrounds.find((b: Background) => (b.id || '').toLowerCase() === bgId);

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Final Details</h2>

            <div className="card">
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Character Name</label>
                    <input
                        type="text"
                        className="input"
                        value={data.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter name..."
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Alignment</label>
                    <select
                        className="input"
                        value={data.alignment}
                        onChange={(e) => handleChange('alignment', e.target.value)}
                    >
                        <option value="">Select Alignment</option>
                        {ALIGNMENTS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Background</label>
                    <select
                        className="input"
                        value={data.backgroundId}
                        onChange={(e) => handleChange('backgroundId', e.target.value)}
                    >
                        <option value="">Select Background</option>
                        {backgrounds.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                </div>

                {selectedBackground && (
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{selectedBackground.name}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{selectedBackground.description}</p>
                        {(() => {
                            const asi = getBackgroundAsi(data.backgroundId) || selectedBackground.abilityScoreIncrease;
                            const skills = getBackgroundSkills(data.backgroundId) || selectedBackground.skillProficiencies || [];
                            return (
                                <>
                                    {asi && Object.keys(asi).length > 0 && (
                                        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <strong>Ability Score Increase:</strong>{' '}
                                            {Object.entries(asi).map(([s, v]) => `${s.toUpperCase()} +${v}`).join(', ')}
                                        </div>
                                    )}
                                    {skills.length > 0 && (
                                        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                            <strong>Skill Proficiencies:</strong> {skills.join(', ')}
                                        </div>
                                    )}
                                </>
                            );
                        })()}
                        <div style={{ fontSize: '0.875rem' }}>
                            <strong>Initial Equipment:</strong> {selectedBackground.equipment?.join(', ') || 'None'}
                        </div>
                        <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>
                            <strong>Feature:</strong> {selectedBackground.feature.name}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
