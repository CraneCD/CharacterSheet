'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { CharacterAction, CharacterData, CharacterItem } from '@/lib/types';

interface ActionManagerProps {
    characterId: string;
    initialActions: CharacterAction[];
    onUpdate: (data: Partial<CharacterData>) => void;
    equippedWeapons?: (string | CharacterItem)[]; // To filter out redundant weapon actions
}

export default function ActionManager({ characterId, initialActions, onUpdate, equippedWeapons = [] }: ActionManagerProps) {
    const [actions, setActions] = useState<CharacterAction[]>(initialActions || []);

    useEffect(() => {
        setActions(initialActions || []);
    }, [initialActions]);

    // Filter out weapon actions that are redundant with equipped weapons
    const equippedWeaponNames = equippedWeapons
        .map(item => (typeof item === 'string' ? item : item.name))
        .filter(name => name);
    
    const weaponActionNames = new Set(
        equippedWeaponNames.map(name => `${name} Attack`)
    );

    // Filter out actions that match weapon attack patterns
    const filteredActions = actions.filter(action => {
        // Don't filter out if it's not a weapon attack action
        if (!action.name.endsWith(' Attack')) return true;
        
        // Check if this action corresponds to an equipped weapon
        return !weaponActionNames.has(action.name);
    });
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
    // Group by type
    const mainActions = actionsList.filter(a => a.type === 'action');
    const bonusActions = actionsList.filter(a => a.type === 'bonus');
    const reactions = actionsList.filter(a => a.type === 'reaction'); // If we want to support reactions too

    const renderActionGroup = (title: string, items: CharacterAction[]) => {
        if (items.length === 0) return null;
        return (
            <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>{title}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {items.map((action, i) => {
                        // Find the index in the original actions array (not filtered)
                        const originalIndex = actions.findIndex(a => a.name === action.name && a.description === action.description);
                        return (
                            <div key={i} style={{ backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: '4px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                    <div style={{ fontWeight: 'bold' }}>{action.name}</div>
                                    <button
                                        className="button plain"
                                        style={{ color: 'var(--text-muted)', fontSize: '1.25rem', lineHeight: 1, padding: '0 0.25rem' }}
                                        onClick={() => handleRemove(originalIndex)}
                                        title="Remove"
                                    >
                                        &times;
                                    </button>
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
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                <div style={{ marginBottom: '1rem', backgroundColor: 'var(--surface)', padding: '0.75rem', borderRadius: '4px' }}>
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

            <div style={{ position: 'relative' }}>
                <div 
                    style={{ 
                        maxHeight: isExpanded ? 'none' : '400px',
                        overflowY: isExpanded ? 'visible' : 'auto',
                        paddingRight: isExpanded ? '0' : '0.5rem',
                        marginRight: isExpanded ? '0' : '-0.5rem'
                    }}
                >
                    {actionsList.length === 0 && (
                        <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No custom actions recorded.</div>
                    )}

                    {renderActionGroup('Actions', mainActions)}
                    {renderActionGroup('Bonus Actions', bonusActions)}
                    {renderActionGroup('Reactions', reactions)}
                    {renderActionGroup('Other', actionsList.filter(a => a.type === 'other'))}
                </div>

                {/* Expand/Collapse Button - only show if there are actions */}
                {actionsList.length > 0 && (
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        marginTop: '0.75rem',
                        paddingTop: '0.75rem',
                        borderTop: isExpanded ? '1px solid var(--border)' : 'none'
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
