'use client';

import { ClassChoice, ChoiceContext, isOptionAvailable } from '@/lib/classChoices';
import { MASTERY_WEAPON_NAMES } from '@/lib/weaponMastery';

export interface ChoiceSpell {
    id: string;
    name: string;
    level: number;
    classes?: string[];
    castingTime?: string;
    legacy?: boolean;
}

interface Props {
    choices: ClassChoice[];
    /** Picks so far, by choice key. */
    value: Record<string, string[]>;
    onChange: (value: Record<string, string[]>) => void;
    ctx: ChoiceContext;
    /** Skills the character is proficient in (for Expertise). */
    proficientSkills: string[];
    /** Skills that already have Expertise. */
    expertiseSkills: string[];
    /** Languages the character already knows. */
    knownLanguages: string[];
    languageOptions: string[];
    spells: ChoiceSpell[];
    spellbook: string[];
    testIdPrefix?: string;
}

const ALL_SKILLS = [
    'Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation',
    'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival',
];

const isActionCast = (castingTime?: string) => {
    const t = (castingTime || '').toLowerCase();
    return t.includes('action') && !t.includes('bonus') && !t.includes('reaction');
};

/** The selectable values for one choice (ids for options/spells, names for skills/languages/weapons). */
export function getChoiceCandidates(choice: ClassChoice, props: Omit<Props, 'choices' | 'onChange' | 'testIdPrefix'>, pickedNow: string[] = []): { value: string; label: string }[] {
    const { ctx, proficientSkills, expertiseSkills, knownLanguages, languageOptions, spells, spellbook } = props;
    switch (choice.kind) {
        case 'expertise':
            return proficientSkills.filter(s => !expertiseSkills.includes(s)).map(s => ({ value: s, label: s }));
        case 'skill':
            return (choice.skillList || ALL_SKILLS).filter(s => !proficientSkills.includes(s)).map(s => ({ value: s, label: s }));
        case 'language':
            return languageOptions.filter(l => !knownLanguages.includes(l)).map(l => ({ value: l, label: l }));
        case 'weaponMastery': {
            const known = ctx.existing[choice.key] || [];
            return MASTERY_WEAPON_NAMES.filter(w => !known.includes(w)).map(w => ({ value: w, label: w }));
        }
        case 'option':
            return (choice.options || [])
                .filter(o => isOptionAvailable(choice, o, ctx, pickedNow.filter(Boolean)))
                .map(o => ({ value: o.id, label: o.name + (o.prerequisite?.cantrip ? ' (needs a damaging Warlock cantrip)' : '') }));
        case 'spell': {
            const s = choice.spell!;
            return spells
                .filter(sp => sp.level === s.level && !sp.legacy)
                .filter(sp => !s.list || (sp.classes || []).some(c => c.toLowerCase() === s.list))
                .filter(sp => !s.fromSpellbook || spellbook.includes(sp.id))
                .filter(sp => !s.actionOnly || isActionCast(sp.castingTime))
                .filter(sp => !(ctx.existing[choice.key] || []).includes(sp.id))
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(sp => ({ value: sp.id, label: sp.name }));
        }
    }
}

/** How many picks a choice needs (fewer when there aren't enough candidates, e.g. few skills to give Expertise). */
export function requiredPicks(choice: ClassChoice, props: Omit<Props, 'choices' | 'onChange' | 'testIdPrefix'>): number {
    return Math.min(choice.count, getChoiceCandidates(choice, props).length);
}

/** True when every choice has all its picks. */
export function choicesComplete(choices: ClassChoice[], value: Record<string, string[]>, props: Omit<Props, 'choices' | 'onChange' | 'testIdPrefix' | 'value'>): boolean {
    return choices.every(c => (value[c.key] || []).filter(Boolean).length >= requiredPicks(c, { ...props, value }));
}

export default function ClassChoicesPicker(props: Props) {
    const { choices, value, onChange, testIdPrefix = 'choice' } = props;
    if (choices.length === 0) return null;

    const setPick = (key: string, index: number, pick: string) => {
        const picks = [...(value[key] || [])];
        picks[index] = pick;
        onChange({ ...value, [key]: picks });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {choices.map(choice => {
                const picks = value[choice.key] || [];
                const needed = requiredPicks(choice, props);
                return (
                    <div key={choice.key} data-testid={`${testIdPrefix}-${choice.key}`}>
                        <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                            {choice.title}{choice.count > 1 ? ` — choose ${choice.count}` : ''}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{choice.description}</div>
                        {needed === 0 && (
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Nothing available to choose.</div>
                        )}
                        {Array.from({ length: needed }).map((_, i) => {
                            // Each dropdown offers what's still available, plus its own current pick
                            const others = picks.filter((_, j) => j !== i);
                            const candidates = getChoiceCandidates(choice, props, others)
                                .filter(c => !others.includes(c.value) || (choice.options || []).find(o => o.id === c.value)?.repeatable);
                            const selectedOption = choice.options?.find(o => o.id === picks[i]);
                            return (
                                <div key={i} style={{ marginBottom: '0.5rem' }}>
                                    <select
                                        className="input"
                                        data-testid={`${testIdPrefix}-${choice.key}-${i}`}
                                        value={picks[i] || ''}
                                        onChange={e => setPick(choice.key, i, e.target.value)}
                                        style={{ width: '100%' }}
                                    >
                                        <option value="">Choose…</option>
                                        {candidates.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                    </select>
                                    {selectedOption && (
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{selectedOption.description}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}
