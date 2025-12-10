'use client';

interface StepReviewProps {
    data: any;
    raceName?: string;
    className?: string;
    backgroundName?: string;
}

export default function StepReview({ data, raceName, className, backgroundName }: StepReviewProps) {
    return (
        <div>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Review Character</h2>

            <div className="card">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Name</div>
                        <div style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '1rem' }}>{data.name}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Race</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{raceName}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Class</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{className}</div>

                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Background</div>
                        <div style={{ fontWeight: 'bold', marginBottom: '1rem' }}>{backgroundName}</div>
                    </div>

                    <div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Ability Scores</div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                            {Object.entries(data.abilityScores).map(([stat, val]) => (
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
