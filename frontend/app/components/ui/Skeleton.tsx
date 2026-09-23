interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: string;
    style?: React.CSSProperties;
    className?: string;
}

/** Placeholder block shown while content loads. Hidden from assistive tech; wrap groups in an aria-busy region. */
export default function Skeleton({ width = '100%', height = '1rem', radius, style, className }: SkeletonProps) {
    return (
        <span
            aria-hidden="true"
            className={className ? `skeleton ${className}` : 'skeleton'}
            style={{ width, height, borderRadius: radius, ...style }}
        />
    );
}

/** A few lines of text-shaped placeholders. */
export function SkeletonText({ lines = 3 }: { lines?: number }) {
    return (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {Array.from({ length: lines }, (_, i) => (
                <Skeleton key={i} width={i === lines - 1 ? '60%' : '100%'} />
            ))}
        </span>
    );
}
