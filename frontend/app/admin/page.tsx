'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { REFERENCE_TYPES, TYPE_LABELS, ReferenceType } from '@/lib/adminReference';

export default function AdminHome() {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        api.get('/admin/reference')
            .then((rows: { type: ReferenceType; count: number }[]) => {
                const map: Record<string, number> = {};
                for (const row of rows) map[row.type] = row.count;
                setCounts(map);
            })
            .catch(() => setError('Failed to load reference data. You may not have admin access.'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="heading" style={{ marginBottom: '0.25rem' }}>Admin</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                Edit game reference data. Changes apply immediately to every character sheet that references them.
            </p>

            {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
                    {REFERENCE_TYPES.map(type => (
                        <Link key={type} href={`/admin/${type}`} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}>
                            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{TYPE_LABELS[type]}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{counts[type] ?? 0} entries</div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
