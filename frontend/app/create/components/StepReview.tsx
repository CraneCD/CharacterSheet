'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Race, Background } from '@/lib/types';
import { hasSkillful, hasVersatile, hasKeenSensesChoice } from '@/lib/racialTraitBonuses';
import { ORIGIN_FEAT_IDS, SKILLS_FOR_SKILLFUL, STANDARD_LANGUAGES_2024, ELVEN_LINEAGES, KEEN_SENSES_SKILLS, getRaceLanguageChoices } from '@/lib/wizardReference';

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
    /** Number of skills the class lets you choose (e.g. Rogue 4). */
    classSkillChoicesCount?: number;
    /** Skill options for that class (e.g. Rogue list). */
    classSkillOptions?: string[];
    race?: Race | null;
    background?: Background | null;
    /** Final ability scores after background increases, for the summary. */
    finalScores?: Record<string, number>;
    /** Skills already granted by the background (not offered again as choices). */
    backgroundSkills?: string[];
}

function fightingStyleDisplayName(id: string): string {
    return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const labelStyle = { display: 'block', fontWeight: 'bold', marginBottom: '0.35rem', fontSize: '0.875rem' } as const;

/** `count` selects that can't repeat a value, labelled as a group by `labelledBy`. */
function UniqueSelects({ count, options, values, onChange, testId, placeholder, labelledBy, itemLabel }: { count: number; options: string[]; values: string[]; onChange: (v: string[]) => void; testId: string; placeholder: string; labelledBy: string; itemLabel: string }) {
    return (
        <div role="group" aria-labelledby={labelledBy} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Array.from({ length: count }).map((_, idx) => (
                <select
                    key={idx}
                    className="input"
                    aria-label={`${itemLabel} ${idx + 1} of ${count}`}
                    data-testid={`${testId}-${idx}`}
                    value={values[idx] || ''}
                    onChange={(e) => {
                        const updated = [...values];
                        updated[idx] = e.target.value;
                        const unique = Array.from(new Set(updated.filter(Boolean)));
                        while (unique.length < count) unique.push('');
                        onChange(unique.slice(0, count));
                    }}
                >
                    <option value="">{placeholder}</option>
                    {options
                        .filter(o => !values.includes(o) || values[idx] === o)
                        .map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            ))}
        </div>
    );
}

export default function StepReview({ data, onUpdate, raceName, className, backgroundName, fightingStyleId, raceTraits = [], proficientSkills = [], raceId, classSkillChoicesCount = 0, classSkillOptions = [], race, background, finalScores, backgroundSkills = [] }: StepReviewProps) {
    const [feats, setFeats] = useState<{ id: string; name: string; category?: string; repeatable?: boolean }[]>([]);
    const [featsLoading, setFeatsLoading] = useState(false);
    const needsSkillful = hasSkillful(raceTraits);
    const needsVersatile = hasVersatile(raceTraits);
    const needsKeenSenses = hasKeenSensesChoice(raceTraits);
    const lineage = race?.lineageOptions;
    const isElf = raceId === 'elf';
    const needsSize = (race?.size || '').toLowerCase().includes(' or ');
    const needsClassSkills = classSkillChoicesCount > 0 && classSkillOptions.length > 0;
    const classSkillChoices = (data.classSkillChoices || []) as string[];
    // Don't offer skills the character already has; a duplicate would waste the choice.
    const availableClassSkills = classSkillOptions.filter(s => !backgroundSkills.includes(s) && s !== data.skillfulChoice && s !== data.keenSensesChoice);
    const takenBy = (except: string) => new Set(
        [...backgroundSkills, ...classSkillChoices, data.skillfulChoice, data.keenSensesChoice].filter(s => s && s !== except)
    );

    // Level 1 expertise: Rogue gets 2 skills
    const needsExpertise = data.classId === 'rogue';
    const expertiseCount: number = needsExpertise ? 2 : 0;
    const expertiseChoices = (data.expertiseChoices || []) as string[];

    const totalLangChoices = getRaceLanguageChoices(raceId || '');
    const languageChoices = (data.languageChoices || []) as string[];

    useEffect(() => {
        if (!needsVersatile) return;
        setFeatsLoading(true);
        api.get('/reference/feats')
            .then((list: any[]) => {
                const all = (list || []).filter((f: any) => !f.legacy);
                const origin = all.some((f: any) => f.category)
                    ? all.filter((f: any) => f.category === 'origin')
                    : all.filter((f: any) => ORIGIN_FEAT_IDS.includes((f.id || '').toLowerCase()));
                setFeats(origin.map((f: any) => ({ id: f.id, name: f.name, category: f.category, repeatable: f.repeatable })));
            })
            .catch(() => setFeats([]))
            .finally(() => setFeatsLoading(false));
    }, [needsVersatile]);

    // The background already grants its origin feat; only repeatable feats can be taken twice.
    const versatileOptions = feats.filter(f => f.id !== background?.originFeat || f.repeatable);

    const hasChoices = needsSkillful || needsVersatile || needsKeenSenses || !!lineage || needsSize || needsClassSkills || needsExpertise || totalLangChoices > 0;

    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Review Character</h2>

            {hasChoices && onUpdate && (
                <div className="card" style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', margin: 0 }}>Species, class, and language choices</h3>

                    {lineage && (
                        <div>
                            <label htmlFor="field-lineage" style={labelStyle}>{lineage.label} — choose one</label>
                            <select id="field-lineage"
                                className="input"
                                data-testid="lineage"
                                value={(isElf ? data.elvenLineageChoice : data.speciesLineageChoice) || ''}
                                onChange={(e) => onUpdate(isElf ? { elvenLineageChoice: e.target.value } : { speciesLineageChoice: e.target.value })}
                            >
                                <option value="">Select...</option>
                                {lineage.options.map(o => (
                                    <option key={o.id} value={o.id}>{o.name} — {o.description}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    {!lineage && isElf && (
                        <div>
                            <label htmlFor="field-lineage" style={labelStyle}>Elven Lineage — choose your lineage</label>
                            <select id="field-lineage" className="input" data-testid="lineage" value={data.elvenLineageChoice || ''} onChange={(e) => onUpdate({ elvenLineageChoice: e.target.value })}>
                                <option value="">Select a lineage...</option>
                                {ELVEN_LINEAGES.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                        </div>
                    )}

                    {needsSize && (
                        <div>
                            <label htmlFor="field-size" style={labelStyle}>Size</label>
                            <select id="field-size" className="input" data-testid="size" value={data.sizeChoice || ''} onChange={(e) => onUpdate({ sizeChoice: e.target.value })}>
                                <option value="">Select a size...</option>
                                <option value="Medium">Medium</option>
                                <option value="Small">Small</option>
                            </select>
                        </div>
                    )}

                    {needsKeenSenses && (
                        <div>
                            <label htmlFor="field-keen-senses" style={labelStyle}>Keen Senses — choose one skill</label>
                            <select id="field-keen-senses" className="input" data-testid="keen-senses" value={data.keenSensesChoice || ''} onChange={(e) => onUpdate({ keenSensesChoice: e.target.value })}>
                                <option value="">Select a skill</option>
                                {KEEN_SENSES_SKILLS.filter(s => !takenBy(data.keenSensesChoice).has(s)).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}

                    {needsClassSkills && (
                        <div>
                            <div id="group-class-skills" style={labelStyle}>
                                {className} — choose {classSkillChoicesCount} skill{classSkillChoicesCount === 1 ? '' : 's'} (class proficiencies)
                            </div>
                            <UniqueSelects
                                count={classSkillChoicesCount}
                                options={availableClassSkills}
                                values={classSkillChoices}
                                onChange={(v) => onUpdate({ classSkillChoices: v })}
                                testId="class-skill"
                                labelledBy="group-class-skills"
                                itemLabel="Skill"
                                placeholder="Select a skill..."
                            />
                        </div>
                    )}

                    {needsSkillful && (
                        <div>
                            <label htmlFor="field-skillful" style={labelStyle}>Skillful — choose one skill</label>
                            <select id="field-skillful" className="input" data-testid="skillful" value={data.skillfulChoice || ''} onChange={(e) => onUpdate({ skillfulChoice: e.target.value })}>
                                <option value="">Select a skill</option>
                                {SKILLS_FOR_SKILLFUL.filter(s => !takenBy(data.skillfulChoice).has(s)).map((s) => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    )}

                    {needsVersatile && (
                        <div>
                            <label htmlFor="field-versatile" style={labelStyle}>Versatile — choose an Origin feat</label>
                            {featsLoading ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loading feats…</div>
                            ) : (
                                <select id="field-versatile" className="input" data-testid="versatile" value={data.versatileFeatId || ''} onChange={(e) => onUpdate({ versatileFeatId: e.target.value })}>
                                    <option value="">Select a feat</option>
                                    {versatileOptions.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
                                </select>
                            )}
                        </div>
                    )}

                    {needsExpertise && (
                        <div>
                            <div id="group-expertise" style={labelStyle}>
                                Expertise — choose {expertiseCount} skills (double proficiency bonus)
                            </div>
                            {proficientSkills.length === 0 ? (
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                                    Pick your skill proficiencies first.
                                </div>
                            ) : (
                                <UniqueSelects
                                    count={expertiseCount}
                                    options={proficientSkills}
                                    values={expertiseChoices}
                                    onChange={(v) => onUpdate({ expertiseChoices: v })}
                                    testId="expertise"
                                    labelledBy="group-expertise"
                                    itemLabel="Expertise skill"
                                    placeholder="Select a skill..."
                                />
                            )}
                        </div>
                    )}

                    {totalLangChoices > 0 && (
                        <div>
                            <div id="group-languages" style={labelStyle}>
                                Languages — you know Common; choose {totalLangChoices} more
                            </div>
                            <UniqueSelects
                                count={totalLangChoices}
                                options={STANDARD_LANGUAGES_2024}
                                values={languageChoices}
                                onChange={(v) => onUpdate({ languageChoices: v })}
                                testId="language"
                                labelledBy="group-languages"
                                itemLabel="Language"
                                placeholder="Select a language..."
                            />
                        </div>
                    )}
                </div>
            )}

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Name</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>{data.name}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Species</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                            {raceName}
                            {(() => {
                                const optId = isElf ? data.elvenLineageChoice : data.speciesLineageChoice;
                                const opt = lineage?.options.find(o => o.id === optId) || ELVEN_LINEAGES.find(l => l.id === optId);
                                return opt ? <span style={{ fontWeight: 'normal', color: 'var(--text-muted)', marginLeft: '0.25rem' }}>({opt.name})</span> : null;
                            })()}
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
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{background?.name ?? backgroundName}</div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Ability Scores (with background increases)</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {Object.entries(finalScores || data.abilityScores || {}).map(([stat, val]) => (
                                <div key={stat} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)' }}>
                                    <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{stat}</span>
                                    <span data-testid={`final-${stat}`}>{String(val)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
