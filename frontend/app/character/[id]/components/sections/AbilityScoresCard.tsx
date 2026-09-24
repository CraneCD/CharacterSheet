'use client';

import { EditableNumber, SectionHeader } from '@/app/components/ui';
import { ABILITIES, ABILITY_NAMES, formatMod } from './format';

interface AbilityScoresCardProps {
    /** Stored (base) scores; these are what you edit. */
    scores: Record<string, number>;
    /** Modifiers from the effective scores (base + feature increases). */
    modifiers: Record<string, number>;
    onChange: (ability: string, value: number) => void;
}

export default function AbilityScoresCard({ scores, modifiers, onChange }: AbilityScoresCardProps) {
    return (
        <div className="card">
            <SectionHeader title="Ability Scores" />
            {ABILITIES.map((ability) => (
                <div key={ability} className="ability-row">
                    <div className="ability-score-cell">
                        <div className="ability-abbr" aria-hidden="true">{ability}</div>
                        <EditableNumber
                            label={`${ABILITY_NAMES[ability]} score`}
                            value={scores[ability]}
                            min={1}
                            max={30}
                            className="ability-score"
                            onSave={(value) => onChange(ability, value)}
                        />
                    </div>
                    <div className="ability-mod" aria-label={`${ABILITY_NAMES[ability]} modifier ${formatMod(modifiers[ability])}`}>
                        {formatMod(modifiers[ability])}
                    </div>
                </div>
            ))}
        </div>
    );
}
