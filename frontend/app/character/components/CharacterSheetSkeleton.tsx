import Skeleton, { SkeletonText } from '@/app/components/ui/Skeleton';

/** Placeholder shaped like the sheet (header, stat row, three columns) while it loads. */
export default function CharacterSheetSkeleton() {
    return (
        <div aria-busy="true" aria-label="Loading character sheet" style={{ marginBottom: '2rem' }}>
            <div className="sheet-header">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flex: '1 1 auto' }}>
                    <Skeleton width={80} height={107} />
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                        <Skeleton width={110} height="0.875rem" />
                        <Skeleton width="45%" height="2rem" />
                        <Skeleton width="35%" height="0.875rem" />
                    </div>
                </div>
                <div className="sheet-stats-row" style={{ marginTop: '1rem' }}>
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="stat-box">
                            <Skeleton width="60%" height="0.75rem" style={{ margin: '0 auto var(--space-2)' }} />
                            <Skeleton width="40%" height="1.5rem" style={{ margin: '0 auto' }} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="sheet-grid">
                {[0, 1, 2].map(col => (
                    <div key={col} className="sheet-column">
                        {[0, 1].map(card => (
                            <div key={card} className="card">
                                <Skeleton width="40%" height="0.875rem" style={{ marginBottom: 'var(--space-4)' }} />
                                <SkeletonText lines={col === 0 ? 6 : 4} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
