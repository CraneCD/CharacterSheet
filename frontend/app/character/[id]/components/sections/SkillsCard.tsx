'use client';

import { SectionHeader } from '@/app/components/ui';
import { RollButton } from '@/app/components/dice/DiceTray';
import { formatMod } from './format';
import { useSheetReadOnly } from '../../SheetReadOnly';

export interface SkillRow {
    name: string;
    stat: string;
    total: number;
    isProficient: boolean;
    hasExpertise: boolean;
    /** Gear giving Disadvantage on this skill (armor on Stealth) */
    disadvantage?: string[];
}

interface SkillsCardProps {
    skills: SkillRow[];
    onToggleProficiency: (skillName: string) => void;
}

export default function SkillsCard({ skills, onToggleProficiency }: SkillsCardProps) {
    const readOnly = useSheetReadOnly();
    return (
        <div className="card">
            <SectionHeader title="Skills" />
            <ul className="stat-list skills-grid">
                {skills.map((skill) => (
                    <li key={skill.name} className="skill-row">
                        <span className="stat-list-name">
                            <button
                                type="button"
                                className={skill.isProficient ? 'proficient-dot proficient-toggle is-proficient' : 'proficient-dot proficient-toggle'}
                                aria-pressed={skill.isProficient}
                                aria-label={`${skill.name} proficiency`}
                                title={readOnly ? (skill.isProficient ? 'Proficient' : undefined) : skill.isProficient ? 'Remove proficiency' : 'Add proficiency'}
                                disabled={readOnly}
                                onClick={() => onToggleProficiency(skill.name)}
                            />
                            {skill.hasExpertise && (
                                <span className="expertise-badge" title="Expertise (double proficiency bonus)">
                                    E<span className="visually-hidden">xpertise</span>
                                </span>
                            )}
                            {skill.name}
                            <span className="skill-stat">({skill.stat.toUpperCase()})</span>
                            {skill.disadvantage && skill.disadvantage.length > 0 && (
                                <span className="disadvantage-badge" title={`Disadvantage from ${skill.disadvantage.join(', ')}`}>
                                    D<span className="visually-hidden">isadvantage from {skill.disadvantage.join(', ')}</span>
                                </span>
                            )}
                        </span>
                        <RollButton label={skill.name} modifier={skill.total} kind="check" ability={skill.stat} disadvantage={skill.disadvantage} className="stat-list-total">
                            {formatMod(skill.total)}
                        </RollButton>
                    </li>
                ))}
            </ul>
        </div>
    );
}
