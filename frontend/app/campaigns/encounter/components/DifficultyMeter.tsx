'use client';

import { PartyBudget, RATING_HINTS, RATING_LABELS, rateEncounter, xpPerCharacter } from '@/lib/encounterDifficulty';

interface DifficultyMeterProps {
    xp: number;
    budget: PartyBudget;
    partySize: number;
}

/** How the monsters' XP compares with the party's Low / Moderate / High budgets (2024 rules). */
export default function DifficultyMeter({ xp, budget, partySize }: DifficultyMeterProps) {
    const rating = partySize > 0 ? rateEncounter(xp, budget) : 'none';
    // The bar runs to a bit past High so "Beyond High" still has room
    const scale = Math.max(budget.high * 1.25, xp, 1);
    const pct = (n: number) => `${Math.min(100, (n / scale) * 100)}%`;
    return (
        <section className="card difficulty-card" aria-labelledby="difficulty-title">
            <div className="difficulty-head">
                <h2 className="section-title" id="difficulty-title">Difficulty</h2>
                <strong className={`difficulty-text difficulty-${rating}`}>{partySize > 0 ? RATING_LABELS[rating] : 'Add the party'}</strong>
            </div>
            <div
                className="difficulty-bar"
                role="meter"
                aria-label="Encounter XP against the party's budget"
                aria-valuemin={0}
                aria-valuemax={Math.round(scale)}
                aria-valuenow={xp}
                aria-valuetext={`${xp} XP: ${RATING_LABELS[rating]}`}
            >
                <div className={`difficulty-fill difficulty-${rating}`} style={{ width: pct(xp) }} />
                {partySize > 0 && (['low', 'moderate', 'high'] as const).map((d) => (
                    <span key={d} className="difficulty-mark" style={{ left: pct(budget[d]) }} title={`${RATING_LABELS[d]}: ${budget[d].toLocaleString()} XP`} />
                ))}
            </div>
            <dl className="difficulty-numbers">
                <div><dt>Monster XP</dt><dd>{xp.toLocaleString()}</dd></div>
                {partySize > 0 && (
                    <>
                        <div><dt>Low</dt><dd>{budget.low.toLocaleString()}</dd></div>
                        <div><dt>Moderate</dt><dd>{budget.moderate.toLocaleString()}</dd></div>
                        <div><dt>High</dt><dd>{budget.high.toLocaleString()}</dd></div>
                        <div><dt>XP each</dt><dd>{xpPerCharacter(xp, partySize).toLocaleString()}</dd></div>
                    </>
                )}
            </dl>
            <p className="field-hint" style={{ margin: 0 }}>{partySize > 0 ? RATING_HINTS[rating] : 'Add party members to size the fight to them.'}</p>
        </section>
    );
}
