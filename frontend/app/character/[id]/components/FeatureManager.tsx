'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CharacterFeature } from '@/lib/types';

interface StaticFeature {
    name: string;
    source: string;
    description: string;
}

interface FeatureManagerProps {
    characterId: string;
    initialFeatures: CharacterFeature[];
    staticFeatures?: StaticFeature[];
    onUpdate: (newFeatures: CharacterFeature[]) => void;
}

export default function FeatureManager({ characterId, initialFeatures, staticFeatures = [], onUpdate }: FeatureManagerProps) {
    const [features, setFeatures] = useState<CharacterFeature[]>(initialFeatures || []);
    const [isAdding, setIsAdding] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newItem, setNewItem] = useState<Partial<CharacterFeature>>({
        name: '',
        source: '',
        description: ''
    });

    // Update features when initialFeatures prop changes (e.g., after level up)
    useEffect(() => {
        setFeatures(initialFeatures || []);
    }, [initialFeatures]);

    const handleAdd = async () => {
        if (!newItem.name?.trim() || !newItem.description?.trim()) return;

        try {
            const featureToAdd: CharacterFeature = {
                name: newItem.name.trim(),
                source: newItem.source?.trim() || 'Custom',
                description: newItem.description.trim(),
            };

            await api.post(`/characters/${characterId}/features`, {
                feature: featureToAdd
            });

            const newFeatures = [...features, featureToAdd];
            setFeatures(newFeatures);
            onUpdate(newFeatures);

            setNewItem({ name: '', source: '', description: '' });
            setIsAdding(false);
        } catch (err) {
            console.error('Failed to add feature', err);
            alert('Failed to add feature');
        }
    };

    const handleRemove = async (index: number) => {
        try {
            await api.delete(`/characters/${characterId}/features`, {
                data: { index }
            });
            const newFeatures = [...features];
            newFeatures.splice(index, 1);
            setFeatures(newFeatures);
            onUpdate(newFeatures);
        } catch (err) {
            console.error('Failed to remove feature', err);
            alert('Failed to remove feature');
        }
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                Features & Traits
                <button
                    className="button primary"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    onClick={() => setIsAdding(true)}
                >
                    + Add Trait
                </button>
            </h3>

            {isAdding && (
                <div style={{ marginBottom: '1rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '4px', flexShrink: 0 }}>
                    <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <input
                            type="text"
                            className="input"
                            placeholder="Feature Name"
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            autoFocus
                        />
                        <input
                            type="text"
                            className="input"
                            placeholder="Source (e.g. Racial, Feat)"
                            value={newItem.source}
                            onChange={e => setNewItem({ ...newItem, source: e.target.value })}
                        />
                        <textarea
                            className="input"
                            placeholder="Description"
                            rows={3}
                            value={newItem.description}
                            onChange={e => setNewItem({ ...newItem, description: e.target.value })}
                            style={{ resize: 'vertical' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="button primary" onClick={handleAdd}>Add Feature</button>
                        <button className="button secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div 
                    style={{ 
                        flex: 1,
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '0.75rem',
                        minHeight: 0,
                        overflowY: isExpanded ? 'visible' : 'auto',
                        paddingRight: isExpanded ? '0' : '0.5rem',
                        marginRight: isExpanded ? '0' : '-0.5rem'
                    }}
                >
                    {/* Static (Read-Only) Features */}
                    {staticFeatures.map((feature, i) => (
                        <div key={`static-${i}`} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexShrink: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{feature.name}</span>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{feature.source}</span>
                            </div>
                            <div style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                                {feature.description}
                            </div>
                        </div>
                    ))}

                    {/* Dynamic Features */}
                    {features.map((feature, i) => (
                        <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexShrink: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{feature.name}</span>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{feature.source}</span>
                                    <button
                                        className="button plain"
                                        style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: '0 0.25rem' }}
                                        onClick={() => handleRemove(i)}
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                            <div style={{ fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                                {feature.description}
                            </div>
                        </div>
                    ))}

                    {features.length === 0 && staticFeatures.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No features recorded</div>
                    )}
                </div>

                {/* Expand/Collapse Button - pinned to bottom of card */}
                {(staticFeatures.length > 0 || features.length > 0) && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: 'auto',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border)',
                        flexShrink: 0
                    }}>
                        <button
                            className="button secondary"
                            onClick={() => setIsExpanded(!isExpanded)}
                            style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                        >
                            {isExpanded ? '▲ Collapse' : '▼ Expand'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
