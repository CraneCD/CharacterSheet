'use client';

import { useState, useEffect, useRef, memo } from 'react';
import { api } from '@/lib/api';
import { CharacterFeature } from '@/lib/types';
import { describeError, useToast } from '@/app/components/ui';

/** Collapsed list height when the card has no extra room (a taller column elsewhere lets it grow). */
const COLLAPSED_HEIGHT = 520;

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

function FeatureManager({ characterId, initialFeatures, staticFeatures = [], onUpdate }: FeatureManagerProps) {
    const toast = useToast();
    const [features, setFeatures] = useState<CharacterFeature[]>(initialFeatures || []);
    const [isAdding, setIsAdding] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    // The collapsed list fills the card (which stretches to the tallest column) but is at least
    // min(COLLAPSED_HEIGHT, content) tall; Expand only shows while something is scrolled out of view.
    const listRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState<number | null>(null);
    const [overflowing, setOverflowing] = useState(false);
    const [newItem, setNewItem] = useState<Partial<CharacterFeature>>({
        name: '',
        source: '',
        description: ''
    });
    // Feats fetched from the reference list, keyed by id — used only to
    // overlay live name/description onto features added from a feat pick
    // (see mergeLiveFeat below), so admin edits to a feat's text show up on
    // characters that already have it.
    const [featsById, setFeatsById] = useState<Record<string, { name: string; description: string }>>({});

    useEffect(() => {
        const list = listRef.current;
        if (!list) return;
        const measure = () => {
            setContentHeight(list.scrollHeight);
            setOverflowing(list.scrollHeight > list.clientHeight + 1);
        };
        measure();
        if (typeof ResizeObserver === 'undefined') return;
        // Re-measure when the card is resized (another column grows) or an entry changes size
        const observer = new ResizeObserver(measure);
        observer.observe(list);
        Array.from(list.children).forEach((child) => observer.observe(child));
        return () => observer.disconnect();
    }, [features.length, staticFeatures.length, isExpanded]);

    // Update features when initialFeatures prop changes (e.g., after level up)
    useEffect(() => {
        setFeatures(initialFeatures || []);
    }, [initialFeatures]);

    useEffect(() => {
        api.get('/reference/feats').then((data: { id: string; name: string; description: string }[]) => {
            const byId: Record<string, { name: string; description: string }> = {};
            for (const feat of Array.isArray(data) ? data : []) {
                byId[feat.id] = feat;
            }
            setFeatsById(byId);
        }).catch(err => console.error('Failed to fetch feats', err));
    }, []);

    const mergeLiveFeat = (feature: CharacterFeature): CharacterFeature => {
        const live = feature.featId ? featsById[feature.featId] : undefined;
        if (!live) return feature;
        return { ...feature, name: live.name, description: live.description };
    };

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
            toast.error(describeError("Couldn't add feature", err));
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
            toast.error(describeError("Couldn't remove feature", err));
        }
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                Features & Traits
                <button
                    className="btn"
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
                        <button className="btn" onClick={handleAdd}>Add Feature</button>
                        <button className="btn btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div
                    ref={listRef}
                    className="collapsible-list"
                    style={{
                        // Collapsed: grow into the card's free space from a zero basis, never shorter than
                        // min(COLLAPSED_HEIGHT, content), and scroll anything beyond that
                        flex: isExpanded ? '1 1 auto' : '1 1 0px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                        minHeight: isExpanded ? 0 : Math.min(COLLAPSED_HEIGHT, contentHeight ?? COLLAPSED_HEIGHT),
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
                    {features.map((raw, i) => {
                        const feature = mergeLiveFeat(raw);
                        return (
                        <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem', flexShrink: 0 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.25rem' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>{feature.name}</span>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>{feature.source}</span>
                                    <button
                                        className="btn btn-ghost"
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
                        );
                    })}

                    {features.length === 0 && staticFeatures.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No features recorded</div>
                    )}
                </div>

                {/* Expand/Collapse, pinned to the bottom of the card; only when something is out of view */}
                {(isExpanded || overflowing) && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: 'auto',
                        paddingTop: '0.75rem',
                        borderTop: '1px solid var(--border)',
                        flexShrink: 0
                    }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setIsExpanded(!isExpanded)}
                            aria-expanded={isExpanded}
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

export default memo(FeatureManager);
