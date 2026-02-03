'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { hasSkillful, hasVersatile } from '@/lib/racialTraitBonuses';
import { ORIGIN_FEAT_IDS, SKILLS_FOR_SKILLFUL, STANDARD_LANGUAGES, ELVEN_LINEAGES, getRaceLanguages, getRaceLanguageChoices, getBackgroundLanguageChoices } from '@/lib/wizardReference';

interface StepReviewProps {
    data: any;
    onUpdate?: (updates: any) => void;
    raceName?: string;
    className?: string;
    backgroundName?: string;
    fightingStyleId?: string;
    raceTraits?: string[];
    proficientSkills?: string[];
    raceId?: string;
    backgroundId?: string;
}

function fightingStyleDisplayName(id: string): string {
    return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function StepReview({ data, onUpdate, raceName, className, backgroundName, fightingStyleId, raceTraits = [], proficientSkills = [], raceId, backgroundId }: StepReviewProps) {
    const [feats, setFeats] = useState<{ id: string; name: string }[]>([]);
    const [featsLoading, setFeatsLoading] = useState(false);
    const needsSkillful = hasSkillful(raceTraits);
    const needsVersatile = hasVersatile(raceTraits);
    const needsElvenLineage = raceId === 'elf';
    
    // Level 1 expertise: Rogue gets 2 skills
    const needsExpertise = data.classId === 'rogue';
    const expertiseCount: number = needsExpertise ? 2 : 0;
    const expertiseChoices = (data.expertiseChoices || []) as string[];
    
    // Language choices
    const raceLangChoices = getRaceLanguageChoices(raceId || '');
    const bgLangChoices = getBackgroundLanguageChoices(backgroundId || '');
    const totalLangChoices = raceLangChoices + bgLangChoices;
    const languageChoices = (data.languageChoices || []) as string[];
    const needsLanguageSelection = totalLangChoices > 0;

    useEffect(() => {
        if (!needsVersatile) return;
        setFeatsLoading(true);
        api.get('/reference/feats')
            .then((list: any[]) => {
                const byId = new Map(
                    (list || []).map((f: any) => [(f.id || '').toLowerCase(), { id: f.id, name: f.name }])
                );
                const filtered = ORIGIN_FEAT_IDS
                    .map((id) => byId.get(id.toLowerCase()))
                    .filter((f): f is { id: string; name: string } => Boolean(f));
                setFeats(filtered);
            })
            .catch(() => setFeats([]))
            .finally(() => setFeatsLoading(false));
    }, [needsVersatile]);

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Review Character</h2>

            {(needsSkillful || needsVersatile || needsExpertise || needsElvenLineage || needsLanguageSelection) && onUpdate && (
                <div className="card" style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem' }}>Trait, class, and language choices</h3>
                    {needsElvenLineage && (
                        <div style={{ marginBottom: (needsSkillful || needsVersatile || needsExpertise || needsLanguageSelection) ? '1rem' : 0 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
                                Elven Lineage — choose your lineage
                            </label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Your choice determines additional traits: Drow (Superior Darkvision, Dancing Lights), High Elf (Prestidigitation), Wood Elf (Speed 35 ft, Druidcraft).
                            </p>
                            <select
                                className="input"
                                value={data.elvenLineageChoice || ''}
                                onChange={(e) => onUpdate({ elvenLineageChoice: e.target.value })}
                            >
                                <option value="">Select a lineage...</option>
                                {ELVEN_LINEAGES.map((l) => (
                                    <option key={l.id} value={l.id}>{l.name}</option>
                                ))}
                            </select>
                        </div>
                    )}
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
                    {needsExpertise && (
                        <div style={{ marginTop: needsSkillful || needsVersatile ? '1rem' : 0 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Expertise — choose {expertiseCount} skill{expertiseCount === 1 ? '' : 's'} (double proficiency bonus)
                            </label>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Select from skills you're proficient in: {proficientSkills.length > 0 ? proficientSkills.join(', ') : 'None available'}
                            </p>
                            {proficientSkills.length === 0 ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                                    No proficient skills available. You need skill proficiencies to gain expertise.
                                </div>
                            ) : (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {Array.from({ length: expertiseCount }).map((_, idx) => (
                                        <select
                                            key={idx}
                                            className="input"
                                            value={expertiseChoices[idx] || ''}
                                            onChange={(e) => {
                                                const updated = [...expertiseChoices];
                                                updated[idx] = e.target.value;
                                                // Remove duplicates
                                                const unique = Array.from(new Set(updated.filter(Boolean)));
                                                while (unique.length < expertiseCount) unique.push('');
                                                onUpdate({ expertiseChoices: unique.slice(0, expertiseCount) });
                                            }}
                                        >
                                            <option value="">Select a skill...</option>
                                            {proficientSkills
                                                .filter(skill => !expertiseChoices.includes(skill) || expertiseChoices[idx] === skill)
                                                .map((skill) => (
                                                    <option key={skill} value={skill}>{skill}</option>
                                                ))}
                                        </select>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {needsLanguageSelection && (
                        <div style={{ marginTop: (needsSkillful || needsVersatile || needsExpertise) ? '1rem' : 0 }}>
                            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                                Languages — choose {totalLangChoices} language{totalLangChoices === 1 ? '' : 's'}
                            </label>
                            {raceLangChoices > 0 && (
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                                    From race: {raceLangChoices} language{raceLangChoices === 1 ? '' : 's'}
                                </p>
                            )}
                            {bgLangChoices > 0 && (
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                    From background: {bgLangChoices} language{bgLangChoices === 1 ? '' : 's'}
                                </p>
                            )}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {Array.from({ length: totalLangChoices }).map((_, idx) => (
                                    <select
                                        key={idx}
                                        className="input"
                                        value={languageChoices[idx] || ''}
                                        onChange={(e) => {
                                            const updated = [...languageChoices];
                                            updated[idx] = e.target.value;
                                            // Remove duplicates
                                            const unique = Array.from(new Set(updated.filter(Boolean)));
                                            while (unique.length < totalLangChoices) unique.push('');
                                            onUpdate({ languageChoices: unique.slice(0, totalLangChoices) });
                                        }}
                                    >
                                        <option value="">Select a language...</option>
                                        {STANDARD_LANGUAGES
                                            .filter(lang => !languageChoices.includes(lang) || languageChoices[idx] === lang)
                                            .map((lang) => (
                                                <option key={lang} value={lang}>{lang}</option>
                                            ))}
                                    </select>
                                ))}
                            </div>
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
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            {raceName}
                            {data.raceId === 'elf' && data.elvenLineageChoice && (
                                <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>
                                    ({ELVEN_LINEAGES.find(l => l.id === data.elvenLineageChoice)?.name || data.elvenLineageChoice})
                                </span>
                            )}
                        </div>

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
