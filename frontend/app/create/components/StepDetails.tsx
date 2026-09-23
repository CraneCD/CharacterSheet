'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Background } from '@/lib/types';
import { getBackgroundAbilityOptions, getBackgroundSkills, isValidBackgroundAsi } from '@/lib/wizardReference';

interface StepDetailsProps {
    data: {
        name: string;
        backgroundId: string;
        alignment: string;
        backgroundAsi?: Record<string, number>;
    };
    onUpdate: (data: any) => void;
    /** Called with the full background record whenever the selection changes. */
    onBackgroundLoaded?: (bg: Background | null) => void;
}

const ALIGNMENTS = [
    'Lawful Good', 'Neutral Good', 'Chaotic Good',
    'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
    'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

const ABILITY_NAMES: Record<string, string> = {
    str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma'
};

export default function StepDetails({ data, onUpdate, onBackgroundLoaded }: StepDetailsProps) {
    const [backgrounds, setBackgrounds] = useState<Background[]>([]);
    const [featNames, setFeatNames] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(true);
    const [showLegacy, setShowLegacy] = useState(false);

    useEffect(() => {
        Promise.all([
            api.get('/reference/backgrounds'),
            api.get('/reference/feats').catch(() => [])
        ])
            .then(([bgs, feats]) => {
                setBackgrounds(bgs);
                setFeatNames(Object.fromEntries((feats || []).map((f: any) => [f.id, f.name])));
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load backgrounds', err);
                setLoading(false);
            });
    }, []);

    const bgId = (data.backgroundId || '').toLowerCase();
    const selectedBackground = backgrounds.find((b: Background) => (b.id || '').toLowerCase() === bgId) || null;

    useEffect(() => {
        if (onBackgroundLoaded) onBackgroundLoaded(selectedBackground);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBackground?.id, loading]);

    const handleChange = (field: string, value: string) => {
        const next: any = { ...data, [field]: value };
        if (field === 'backgroundId' && value !== data.backgroundId) next.backgroundAsi = {};
        onUpdate(next);
    };

    if (loading) return <div>Loading backgrounds...</div>;

    const abilityOptions = getBackgroundAbilityOptions(data.backgroundId, selectedBackground);
    const asi = data.backgroundAsi || {};
    const mode: 'two' | 'three' = Object.values(asi).filter(v => v > 0).length === 3 ? 'three' : 'two';
    const plusTwo = Object.entries(asi).find(([, v]) => v === 2)?.[0] || '';
    const plusOne = mode === 'two' ? (Object.entries(asi).find(([, v]) => v === 1)?.[0] || '') : '';
    const setTwoOne = (two: string, one: string) => {
        const next: Record<string, number> = {};
        if (two) next[two] = 2;
        if (one && one !== two) next[one] = 1;
        onUpdate({ ...data, backgroundAsi: next });
    };
    const setAllThree = () => onUpdate({ ...data, backgroundAsi: Object.fromEntries(abilityOptions.map(a => [a, 1])) });

    const visibleBackgrounds = backgrounds.filter(b => !b.legacy || showLegacy || b.id === data.backgroundId);

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Background &amp; Details</h2>

            <div className="card">
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Character Name</label>
                    <input
                        type="text"
                        className="input"
                        data-testid="character-name"
                        value={data.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        placeholder="Enter name..."
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem' }}>Alignment</label>
                    <select
                        className="input"
                        data-testid="alignment"
                        value={data.alignment}
                        onChange={(e) => handleChange('alignment', e.target.value)}
                    >
                        <option value="">Select Alignment</option>
                        {ALIGNMENTS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <label style={{ fontWeight: 'bold' }}>Background</label>
                        <label style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                            <input type="checkbox" checked={showLegacy} onChange={e => setShowLegacy(e.target.checked)} />
                            Show legacy (pre-2024) backgrounds
                        </label>
                    </div>
                    <select
                        className="input"
                        data-testid="background"
                        value={data.backgroundId}
                        onChange={(e) => handleChange('backgroundId', e.target.value)}
                    >
                        <option value="">Select Background</option>
                        {visibleBackgrounds.map(b => <option key={b.id} value={b.id}>{b.name}{b.legacy ? ' (legacy)' : ''}</option>)}
                    </select>
                </div>

                {selectedBackground && (
                    <div style={{ padding: '0.75rem', backgroundColor: 'var(--surface)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{selectedBackground.name}</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{selectedBackground.description}</p>
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                            <strong>Skill Proficiencies:</strong> {getBackgroundSkills(data.backgroundId, selectedBackground).join(', ')}
                        </div>
                        {(selectedBackground.toolProficiencies || []).length > 0 && (
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                <strong>Tool Proficiency:</strong> {(selectedBackground.toolProficiencies || []).join(', ')}
                            </div>
                        )}
                        {selectedBackground.originFeat && (
                            <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                                <strong>Origin Feat:</strong> {featNames[selectedBackground.originFeat] || selectedBackground.originFeat}
                                {selectedBackground.originFeatNote ? ` (${selectedBackground.originFeatNote})` : ''}
                            </div>
                        )}
                        <div style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                            <strong>Starting Equipment:</strong> {(selectedBackground.startingEquipment || []).join('; ') || 'None'}
                        </div>
                        {selectedBackground.feature && (
                            <div style={{ fontSize: '0.875rem', marginTop: '0.25rem', color: 'var(--text-muted)' }}>
                                <strong>Legacy feature:</strong> {selectedBackground.feature.name}
                            </div>
                        )}

                        {abilityOptions.length === 3 && (
                            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
                                <div style={{ fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                    Ability Score Increases ({abilityOptions.map(a => a.toUpperCase()).join(', ')})
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.875rem', flexWrap: 'wrap' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <input type="radio" name="bg-asi-mode" data-testid="bg-asi-mode-two" checked={mode === 'two'} onChange={() => setTwoOne('', '')} />
                                        +2 to one and +1 to another
                                    </label>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                        <input type="radio" name="bg-asi-mode" data-testid="bg-asi-mode-three" checked={mode === 'three'} onChange={setAllThree} />
                                        +1 to all three
                                    </label>
                                </div>
                                {mode === 'two' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                        <select className="input" data-testid="bg-asi-plus2" value={plusTwo} onChange={e => setTwoOne(e.target.value, plusOne === e.target.value ? '' : plusOne)}>
                                            <option value="">+2 to...</option>
                                            {abilityOptions.map(a => <option key={a} value={a}>{ABILITY_NAMES[a]}</option>)}
                                        </select>
                                        <select className="input" data-testid="bg-asi-plus1" value={plusOne} onChange={e => setTwoOne(plusTwo, e.target.value)}>
                                            <option value="">+1 to...</option>
                                            {abilityOptions.filter(a => a !== plusTwo).map(a => <option key={a} value={a}>{ABILITY_NAMES[a]}</option>)}
                                        </select>
                                    </div>
                                )}
                                {!isValidBackgroundAsi(asi, abilityOptions) && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
                                        Choose how to apply your background&apos;s ability score increases (no score can go above 20).
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
