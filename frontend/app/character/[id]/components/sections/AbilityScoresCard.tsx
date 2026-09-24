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

/** Ability scores as cut gems: the modifier large (it's what you add to rolls), the score small and editable. */
export default function AbilityScoresCard({ scores, modifiers, onChange }: AbilityScoresCardProps) {
    // The best modifier glows in the class colour
    const best = ABILITIES.reduce((top, a) => (modifiers[a] > modifiers[top] ? a : top), ABILITIES[0]);
    return (
        <div className="card">
            <SectionHeader title="Ability Scores" />
            <div className="ability-gems">
                {ABILITIES.map((ability) => (
                    <div key={ability} className={ability === best ? 'ability-gem is-best' : 'ability-gem'}>
                        <div className="ability-abbr" aria-hidden="true">{ability}</div>
                        <div className="ability-mod" aria-label={`${ABILITY_NAMES[ability]} modifier ${formatMod(modifiers[ability])}`}>
                            {formatMod(modifiers[ability])}
                        </div>
                        <EditableNumber
                            label={`${ABILITY_NAMES[ability]} score`}
                            value={scores[ability]}
                            min={1}
                            max={30}
                            className="ability-score"
                            onSave={(value) => onChange(ability, value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
