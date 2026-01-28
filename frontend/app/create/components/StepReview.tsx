'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { hasSkillful, hasVersatile } from '@/lib/racialTraitBonuses';
import { ORIGIN_FEAT_IDS, SKILLS_FOR_SKILLFUL } from '@/lib/wizardReference';

interface StepReviewProps {
    data: any;
    onUpdate?: (updates: any) => void;
    raceName?: string;
    className?: string;
    backgroundName?: string;
    fightingStyleId?: string;
    raceTraits?: string[];
}

function fightingStyleDisplayName(id: string): string {
    return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function StepReview({ data, onUpdate, raceName, className, backgroundName, fightingStyleId, raceTraits = [] }: StepReviewProps) {
    const [feats, setFeats] = useState<{ id: string; name: string }[]>([]);
    const [featsLoading, setFeatsLoading] = useState(false);
    const needsSkillful = hasSkillful(raceTraits);
    const needsVersatile = hasVersatile(raceTraits);

    useEffect(() => {
        if (!needsVersatile) return;
        setFeatsLoading(true);
        api.get('/reference/feats')
            .then((list: any[]) => {
                const ids = new Set(ORIGIN_FEAT_IDS.map((id: string) => id.toLowerCase()));
                const filtered = list
                    .filter((f: any) => ids.has((f.id || '').toLowerCase()))
                    .map((f: any) => ({ id: f.id, name: f.name }));
                setFeats(filtered);
            })
            .catch(() => setFeats([]))
            .finally(() => setFeatsLoading(false));
    }, [needsVersatile]);

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Review Character</h2>

            {(needsSkillful || needsVersatile) && onUpdate && (
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Trait choices</h3>
                    {needsSkillful && (
                        <div style={{ marginBottom: needsVersatile ? '1rem' : 0 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                                Skillful — choose one skill
                            </label>
                            <select
                                className="input"
                                value={data.skillfulChoice || ''}
                                onChange={(e) => onUpdate({ skillfulChoice: e.target.value })}
                            >
                                <option value="">Select a skill</option>
                                {SKILLS_FOR_SKILLFUL.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {needsVersatile && (
                        <div>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                                Versatile — choose an Origin feat
                            </label>
                            {featsLoading ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading feats…</div>
                            ) : (
                                <select
                                    className="input"
                                    value={data.versatileFeatId || ''}
                                    onChange={(e) => onUpdate({ versatileFeatId: e.target.value })}
                                >
                                    <option value="">Select a feat</option>
                                    {feats.map((f) => (
                                        <option key={f.id} value={f.id}>{f.name}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Name</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>{data.name}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Race</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{raceName}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Class</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{className}</div>

                        {data.classId === 'fighter' && fightingStyleId && (
                            <>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Fighting Style</div>
                                <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{fightingStyleDisplayName(fightingStyleId)}</div>
                            </>
                        )}

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Background</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{backgroundName}</div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Ability Scores</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {Object.entries(data.abilityScores || {}).map(([stat, val]) => (
                                <div key={stat} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{stat}</span>
                                    <span>{String(val)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
