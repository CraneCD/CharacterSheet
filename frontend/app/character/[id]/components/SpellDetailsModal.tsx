'use client';

import { Spell } from '@/lib/types';

// Spell Details Modal Component
const SpellDetailsModal = ({ spell, isOpen, onClose }: { spell: Spell | null, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen || !spell) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--primary)' }}>{spell.name}</h3>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            Level {spell.level} {spell.school}
                        </div>
                    </div>
                    <button
                        className="button plain"
                        onClick={onClose}
                        style={{ fontSize: '1.5rem', lineHeight: 1, padding: '0.25rem 0.5rem', color: 'var(--text-muted)' }}
                    >
                        &times;
                    </button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Casting Time</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.castingTime}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Range</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.range}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Components</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.components}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Duration</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.duration}</div>
                    </div>
                    {spell.ritual && (
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Ritual</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Yes</div>
                        </div>
                    )}
                </div>

                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    lineHeight: '1.6',
                    paddingRight: '0.5rem'
                }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Description</div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{spell.description}</div>
                </div>

                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <button className="button primary" onClick={onClose} style={{ width: '100%' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SpellDetailsModal;
