import { useId } from 'react';
import { PassiveScores } from '@/lib/senses';
import CoreCard from './CoreCard';

interface SensesCardProps {
    passives: PassiveScores;
    /** Darkvision range in feet (0 = none) */
    darkvision: number;
    resistances: { type: string; source: string }[];
    collapsed: boolean;
    autoCollapsed?: boolean;
    onToggle: () => void;
}

/** Passive Perception, Investigation and Insight, Darkvision and damage resistances. */
export default function SensesCard({ passives, darkvision, resistances, collapsed, autoCollapsed, onToggle }: SensesCardProps) {
    const passiveId = useId();
    const summary = (
        <>
            <span>Passive Perception <strong>{passives.perception}</strong></span>
            <span>Insight <strong>{passives.insight}</strong></span>
            {darkvision > 0 && <span>Darkvision {darkvision} ft.</span>}
        </>
    );
    return (
        <CoreCard cardId="senses" title="Senses" summary={summary} collapsed={collapsed} autoCollapsed={autoCollapsed} onToggle={onToggle}>
            <h4 className="core-subtitle" id={passiveId}>Passive</h4>
            <div className="passive-scores" role="group" aria-labelledby={passiveId}>
                <div className="passive-score"><strong>{passives.perception}</strong><span>Perception</span></div>
                <div className="passive-score"><strong>{passives.investigation}</strong><span>Investigation</span></div>
                <div className="passive-score"><strong>{passives.insight}</strong><span>Insight</span></div>
            </div>
            <dl className="core-facts">
                <div>
                    <dt>Darkvision</dt>
                    <dd>{darkvision > 0 ? `${darkvision} ft.` : 'None'}</dd>
                </div>
                {resistances.length > 0 && (
                    <div>
                        <dt>Resistance</dt>
                        <dd>
                            {resistances.map((r, i) => (
                                <span key={r.type}>
                                    {i > 0 && ', '}
                                    {r.type} <span className="core-fact-source">({r.source})</span>
                                </span>
                            ))}
                        </dd>
                    </div>
                )}
            </dl>
        </CoreCard>
    );
}
