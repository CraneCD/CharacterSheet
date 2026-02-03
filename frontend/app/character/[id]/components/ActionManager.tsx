'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CharacterAction, CharacterData } from '@/lib/types';

interface ActionManagerProps {
    characterId: string;
    initialActions: CharacterAction[];
    onUpdate: (data: Partial<CharacterData>) => void;
    /** Read-only actions from class features (e.g. Psi Warrior Psionic Power). */
    featureActions?: CharacterAction[];
}

export default function ActionManager({ characterId, initialActions, onUpdate, featureActions = [] }: ActionManagerProps) {
    const safeActions = Array.isArray(initialActions) ? initialActions : [];
    const safeFeatureActions = Array.isArray(featureActions) ? featureActions : [];
    const [actions, setActions] = useState<CharacterAction[]>(safeActions);

    useEffect(() => {
        setActions(Array.isArray(initialActions) ? initialActions : []);
    }, [initialActions]);

    // Weapon attacks live only in the Attacks section (CombatManager). Never show them here.
    const filteredActions = (actions || []).filter(action => !action.name?.endsWith?.(' Attack'));
    const [isAdding, setIsAdding] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [newItem, setNewItem] = useState<Partial<CharacterAction>>({
        name: '',
        type: 'action',
        description: ''
    });

    const handleAdd = async () => {
        if (!newItem.name?.trim() || !newItem.description?.trim()) return;

        try {
            const actionToAdd: CharacterAction = {
                name: newItem.name.trim(),
                type: newItem.type as any,
                description: newItem.description.trim(),
            };

            await api.post(`/characters/${characterId}/actions`, {
                action: actionToAdd
            });

            const newActions = [...actions, actionToAdd];
            setActions(newActions);
            onUpdate({ actions: newActions });

            setNewItem({ name: '', type: 'action', description: '' });
            setIsAdding(false);
        } catch (err) {
            console.error('Failed to add action', err);
            alert('Failed to add action');
        }
    };

    const handleRemove = async (index: number) => {
        try {
            await api.delete(`/characters/${characterId}/actions`, {
                data: { index }
            });
            const newActions = [...actions];
            newActions.splice(index, 1);
            setActions(newActions);
            onUpdate({ actions: newActions });
        } catch (err) {
            console.error('Failed to remove action', err);
            alert('Failed to remove action');
        }
    };

    const actionsList = filteredActions;
    // Group custom actions by type
    const mainActions = actionsList.filter(a => a.type === 'action');
    const bonusActions = actionsList.filter(a => a.type === 'bonus');
    const reactions = actionsList.filter(a => a.type === 'reaction');
    const otherActions = actionsList.filter(a => a.type === 'other');
    // Group feature actions by type
    const featureByType = (t: string) => safeFeatureActions.filter(a => a.type === t);

    const renderActionGroup = (title: string, featureItems: CharacterAction[], customItems: CharacterAction[]) => {
        if (featureItems.length === 0 && customItems.length === 0) return null;
        const allItems = [...featureItems, ...customItems];
        return (
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>{title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {allItems.map((action, i) => {
                        const isFeature = i < featureItems.length;
                        const originalIndex = !isFeature ? actions.findIndex(a => a.name === action.name && a.description === action.description) : -1;
                        return (
                            <div key={i} style={{ backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{action.name}</div>
                                    {!isFeature && originalIndex >= 0 && (
                                        <button
                                            className="button plain"
                                            style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: '0 0.25rem' }}
                                            onClick={() => handleRemove(originalIndex)}
                                            title="Remove"
                                        >
                                            &times;
                                        </button>
                                    )}
                                </div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', whiteSpace: 'pre-wrap' }}>
                                    {action.description}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                Actions & Bonus Actions
                <button
                    className="button primary"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    onClick={() => setIsAdding(true)}
                >
                    + Add Action
                </button>
            </h3>

            {isAdding && (
                <div style={{ marginBottom: '1rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '4px', flexShrink: 0 }}>
                    <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <select
                            className="input"
                            value={newItem.type}
                            onChange={e => setNewItem({ ...newItem, type: e.target.value as any })}
                        >
                            <option value="action">Action</option>
                            <option value="bonus">Bonus Action</option>
                            <option value="reaction">Reaction</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="text"
                            className="input"
                            placeholder="Action Name"
                            value={newItem.name}
                            onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                            autoFocus
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
                        <button className="button primary" onClick={handleAdd}>Add</button>
                        <button className="button secondary" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <div 
                    style={{ 
                        flex: isExpanded ? 1 : '0 1 auto',
                        minHeight: 0,
                        maxHeight: isExpanded ? 'none' : '520px',
                        overflowY: isExpanded ? 'visible' : 'auto',
                        paddingRight: isExpanded ? '0' : '0.5rem',
                        marginRight: isExpanded ? '0' : '-0.5rem'
                    }}
                >
                    {actionsList.length === 0 && safeFeatureActions.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No custom actions recorded.</div>
                    )}

                    {renderActionGroup('Actions', featureByType('action'), mainActions)}
                    {renderActionGroup('Bonus Actions', featureByType('bonus'), bonusActions)}
                    {renderActionGroup('Reactions', featureByType('reaction'), reactions)}
                    {renderActionGroup('Other', featureByType('other'), otherActions)}
                </div>

                {/* Expand/Collapse Button - pinned to bottom of card */}
                {(actionsList.length > 0 || safeFeatureActions.length > 0) && (
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
