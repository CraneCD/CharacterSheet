'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { ClassResources, ClassResource } from '@/lib/types';

interface ClassResourcesManagerProps {
    characterId: string;
    initialResources: ClassResources | undefined;
    onUpdate: (newResources: ClassResources) => void;
    onShortRest?: () => void;
    onLongRest?: () => void;
}

export default function ClassResourcesManager({ 
    characterId, 
    initialResources, 
    onUpdate,
    onShortRest,
    onLongRest 
}: ClassResourcesManagerProps) {
    const [resources, setResources] = useState<ClassResources>(initialResources || {});

    useEffect(() => {
        if (initialResources) {
            setResources(initialResources);
        }
    }, [initialResources]);

    const handleResourceChange = async (resourceName: string, newCurrent: number) => {
        const updated = { ...resources };
        if (updated[resourceName]) {
            updated[resourceName] = {
                ...updated[resourceName],
                current: Math.max(0, Math.min(newCurrent, updated[resourceName].max))
            };

            try {
                await api.patch(`/characters/${characterId}/class-resources`, {
                    resourceName,
                    current: updated[resourceName].current
                });
                setResources(updated);
                onUpdate(updated);
            } catch (err) {
                console.error('Failed to update class resource', err);
                alert('Failed to update class resource');
            }
        }
    };

    const handleShortRest = async () => {
        const updated = { ...resources };
        let changed = false;

        for (const [name, resource] of Object.entries(updated)) {
            if (resource.resetType === 'short') {
                updated[name] = {
                    ...resource,
                    current: resource.max
                };
                changed = true;
            }
        }

        if (changed) {
            try {
                await api.patch(`/characters/${characterId}/class-resources`, {
                    resetType: 'short'
                });
                setResources(updated);
                onUpdate(updated);
                if (onShortRest) onShortRest();
            } catch (err) {
                console.error('Failed to reset resources on short rest', err);
                alert('Failed to reset resources');
            }
        } else {
            if (onShortRest) onShortRest();
        }
    };

    const handleLongRest = async () => {
        const updated = { ...resources };
        let changed = false;

        for (const [name, resource] of Object.entries(updated)) {
            if (resource.resetType === 'long' || resource.resetType === 'short') {
                updated[name] = {
                    ...resource,
                    current: resource.max
                };
                changed = true;
            }
        }

        if (changed) {
            try {
                await api.patch(`/characters/${characterId}/class-resources`, {
                    resetType: 'long'
                });
                setResources(updated);
                onUpdate(updated);
                if (onLongRest) onLongRest();
            } catch (err) {
                console.error('Failed to reset resources on long rest', err);
                alert('Failed to reset resources');
            }
        } else {
            if (onLongRest) onLongRest();
        }
    };

    const resourceEntries = Object.entries(resources);

    if (resourceEntries.length === 0) {
        return null; // Don't show anything if no resources
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', margin: 0 }}>
                    Class Resources
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        className="button secondary"
                        onClick={handleShortRest}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        title="Reset resources that recover on short rest"
                    >
                        Short Rest
                    </button>
                    <button
                        className="button secondary"
                        onClick={handleLongRest}
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        title="Reset all resources"
                    >
                        Long Rest
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {resourceEntries.map(([name, resource]) => (
                    <div key={name} style={{ 
                        padding: '0.75rem', 
                        backgroundColor: 'var(--surface)', 
                        borderRadius: '0.25rem',
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <div>
                                <div style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{resource.name}</div>
                                {resource.description && (
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                        {resource.description}
                                    </div>
                                )}
                            </div>
                            <div style={{ 
                                fontSize: '1.25rem', 
                                fontWeight: 'bold',
                                color: resource.current === 0 ? 'var(--text-muted)' : 'var(--primary)'
                            }}>
                                {resource.current} / {resource.max}
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <button
                                className="button"
                                onClick={() => handleResourceChange(name, resource.current - 1)}
                                disabled={resource.current <= 0}
                                style={{ 
                                    padding: '0.25rem 0.5rem', 
                                    fontSize: '0.875rem',
                                    opacity: resource.current <= 0 ? 0.5 : 1
                                }}
                            >
                                -1
                            </button>
                            <button
                                className="button"
                                onClick={() => handleResourceChange(name, resource.current + 1)}
                                disabled={resource.current >= resource.max}
                                style={{ 
                                    padding: '0.25rem 0.5rem', 
                                    fontSize: '0.875rem',
                                    opacity: resource.current >= resource.max ? 0.5 : 1
                                }}
                            >
                                +1
                            </button>
                            <input
                                type="number"
                                min="0"
                                max={resource.max}
                                value={resource.current}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value) || 0;
                                    handleResourceChange(name, value);
                                }}
                                style={{
                                    width: '4rem',
                                    padding: '0.25rem',
                                    textAlign: 'center',
                                    border: '1px solid var(--border)',
                                    borderRadius: '0.25rem',
                                    backgroundColor: 'var(--background)',
                                    color: 'var(--text)',
                                    fontSize: '0.875rem'
                                }}
                            />
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                Resets: {resource.resetType === 'short' ? 'Short Rest' : resource.resetType === 'long' ? 'Long Rest' : 'Never'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

