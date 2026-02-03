'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Character sheet error:', error);
    }, [error]);

    return (
        <div className="container" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2 className="heading" style={{ marginBottom: '1rem' }}>Something went wrong</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                An error occurred while loading the character sheet. Check the browser console for details.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="button primary" onClick={() => reset()}>
                    Try again
                </button>
                <Link href="/dashboard" className="button secondary" style={{ textDecoration: 'none' }}>
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
}
