'use client';

import { PlayerEncounterView } from '@/lib/campaigns';
import { SectionHeader } from '@/app/components/ui';

const HEALTH_LABELS = { healthy: 'Unhurt', hurt: 'Hurt', bloodied: 'Bloodied', down: 'Down' } as const;

/** The running fight as players see it: turn order and round, updated while the page is open. */
export default function PlayerEncounterCard({ encounter }: { encounter: PlayerEncounterView }) {
    const current = encounter.combatants.find((c) => c.isCurrent);
    return (
        <section className="card encounter-live" aria-labelledby="live-encounter-title">
            <SectionHeader
                title={<><span className="live-dot" aria-hidden="true" />In combat: {encounter.name}</>}
                id="live-encounter-title"
                as="h2"
                actions={encounter.round > 0 ? <span className="round-badge">Round {encounter.round}</span> : <span className="round-badge">Rolling initiative</span>}
            />
            <p className="visually-hidden" aria-live="polite">{current ? `${current.name}'s turn` : ''}</p>
            <ol className="turn-order">
                {encounter.combatants.map((c) => (
                    <li key={c.id} className={['turn-order-item', `kind-${c.kind}`, c.isCurrent && 'is-current', c.health === 'down' && 'is-down'].filter(Boolean).join(' ')} aria-current={c.isCurrent ? 'step' : undefined}>
                        <span className="turn-order-init">{c.initiative ?? '—'}</span>
                        <span className="turn-order-name">{c.name}</span>
                        {c.health && <span className={`health-tag health-${c.health}`}>{HEALTH_LABELS[c.health]}</span>}
                        {c.isCurrent && <span className="turn-tag">Their turn</span>}
                    </li>
                ))}
            </ol>
        </section>
    );
}
