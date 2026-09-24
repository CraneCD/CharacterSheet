'use client';

import { useId } from 'react';
import { Button } from '@/app/components/ui';
import { ActiveConditions, CONDITIONS, exhaustionSummary, hasActiveConditions, MAX_EXHAUSTION } from '@/lib/conditions';
import CoreCard from './CoreCard';

interface ConditionsCardProps {
    active: ActiveConditions;
    onChange: (next: ActiveConditions) => void;
    collapsed: boolean;
    autoCollapsed?: boolean;
    onToggle: () => void;
}

/** Condition toggles and the Exhaustion track. Active ones change rolls in the dice tray. */
export default function ConditionsCard({ active, onChange, collapsed, autoCollapsed, onToggle }: ConditionsCardProps) {
    const exhaustionId = useId();
    const on = CONDITIONS.filter((c) => active.conditions.includes(c.name));
    const any = hasActiveConditions(active);

    const toggle = (name: string) => {
        const conditions = active.conditions.includes(name)
            ? active.conditions.filter((c) => c !== name)
            : CONDITIONS.map((c) => c.name).filter((n) => n === name || active.conditions.includes(n));
        onChange({ ...active, conditions });
    };
    // Tapping the current top level lowers it by one, so the track can be cleared one step at a time
    const setExhaustion = (level: number) => onChange({ ...active, exhaustion: active.exhaustion === level ? level - 1 : level });

    const badges = (
        <>
            {on.map((c) => <span key={c.name} className="condition-badge">{c.name}</span>)}
            {active.exhaustion > 0 && <span className="condition-badge">Exhaustion {active.exhaustion}</span>}
        </>
    );

    return (
        <CoreCard
            cardId="conditions"
            title="Conditions"
            summary={any ? badges : <span>None</span>}
            collapsed={collapsed}
            autoCollapsed={autoCollapsed}
            onToggle={onToggle}
            actions={any ? (
                <Button variant="ghost" size="sm" onClick={() => onChange({ conditions: [], exhaustion: 0 })}>Clear all</Button>
            ) : undefined}
        >
            <div className="condition-chips" role="group" aria-label="Conditions">
                {CONDITIONS.map((c) => (
                    <button
                        key={c.name}
                        type="button"
                        className="condition-chip"
                        aria-pressed={active.conditions.includes(c.name)}
                        title={c.summary}
                        onClick={() => toggle(c.name)}
                    >
                        {c.name}
                    </button>
                ))}
            </div>
            <div className="exhaustion-track">
                <span className="exhaustion-label" id={exhaustionId}>Exhaustion</span>
                <span className="exhaustion-pips" role="group" aria-labelledby={exhaustionId}>
                    {Array.from({ length: MAX_EXHAUSTION }, (_, i) => i + 1).map((level) => (
                        <button
                            key={level}
                            type="button"
                            className="exhaustion-pip"
                            aria-pressed={level <= active.exhaustion}
                            aria-label={`Exhaustion level ${level}`}
                            onClick={() => setExhaustion(level)}
                        />
                    ))}
                </span>
                <span className="exhaustion-note">{exhaustionSummary(active.exhaustion)}</span>
            </div>
            {any && (
                <ul className="condition-effects">
                    {on.map((c) => <li key={c.name}><strong>{c.name}:</strong> {c.summary}</li>)}
                    {active.exhaustion > 0 && (
                        <li><strong>Exhaustion {active.exhaustion}:</strong> {exhaustionSummary(active.exhaustion)}.</li>
                    )}
                </ul>
            )}
        </CoreCard>
    );
}
