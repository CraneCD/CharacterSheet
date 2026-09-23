'use client';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { REFERENCE_TYPES, TYPE_LABELS, ReferenceType } from '@/lib/adminReference';
import { ConfirmDialog, describeError, useToast } from '@/app/components/ui';

interface Row {
    key: string;
    data: any;
    updatedAt: string;
}

function isValidType(type: string): type is ReferenceType {
    return (REFERENCE_TYPES as readonly string[]).includes(type);
}

function rowLabel(type: ReferenceType, row: Row): string {
    if (type === 'classFeature') {
        const count = Array.isArray(row.data) ? row.data.length : 0;
        return `${row.key} (${count} feature${count === 1 ? '' : 's'})`;
    }
    return row.data?.name || row.key;
}

export default function ReferenceTypeList() {
    const params = useParams();
    const type = params.type as string;
    const [rows, setRows] = useState<Row[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [rowToDelete, setRowToDelete] = useState<Row | null>(null);
    const [deleting, setDeleting] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (!isValidType(type)) return;
        setLoading(true);
        api.get(`/admin/reference/${type}`)
            .then(setRows)
            .catch(() => setError('Failed to load. You may not have admin access.'))
            .finally(() => setLoading(false));
    }, [type]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return rows;
        return rows.filter(r => r.key.toLowerCase().includes(q) || (r.data?.name || '').toLowerCase().includes(q));
    }, [rows, search]);

    const handleDelete = async () => {
        if (!rowToDelete || !isValidType(type)) return;
        setDeleting(true);
        try {
            await api.delete(`/admin/reference/${type}/${encodeURIComponent(rowToDelete.key)}`);
            setRows(rows.filter(r => r.key !== rowToDelete.key));
            toast.success(`Deleted ${rowLabel(type, rowToDelete)}.`);
            setRowToDelete(null);
        } catch (err) {
            console.error('Failed to delete', err);
            toast.error(describeError(`Couldn't delete ${rowLabel(type, rowToDelete)}`, err));
        } finally {
            setDeleting(false);
        }
    };

    if (!isValidType(type)) {
        return <div style={{ color: 'var(--error)' }}>Unknown reference type: {type}</div>;
    }

    return (
        <div>
            <div style={{ marginBottom: '1rem' }}>
                <Link href="/admin">&larr; Admin</Link>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="heading" style={{ marginBottom: 0 }}>{TYPE_LABELS[type]}</h1>
                <Link href={`/admin/${type}/new`} className="btn">+ New</Link>
            </div>

            <input
                type="text"
                className="input"
                placeholder={`Search ${TYPE_LABELS[type].toLowerCase()}...`}
                aria-label={`Search ${TYPE_LABELS[type].toLowerCase()}`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', marginBottom: '1rem' }}
            />

            {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        {filtered.length} of {rows.length}
                    </div>
                    <div className="card" style={{ padding: 0 }}>
                        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                            {filtered.map(row => (
                                <li key={row.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid var(--border)' }}>
                                    <Link href={`/admin/${type}/${encodeURIComponent(row.key)}`} style={{ flex: 1 }}>
                                        {rowLabel(type, row)}
                                    </Link>
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
                                        style={{ color: 'var(--error)' }}
                                        onClick={() => setRowToDelete(row)}
                                        title="Delete"
                                        aria-label={`Delete ${rowLabel(type, row)}`}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                            {filtered.length === 0 && (
                                <li style={{ padding: '1rem', color: 'var(--text-muted)' }}>No entries found.</li>
                            )}
                        </ul>
                    </div>
                </>
            )}

            {rowToDelete && (
                <ConfirmDialog
                    title={`Delete ${rowLabel(type, rowToDelete)}?`}
                    confirmLabel="Delete"
                    danger
                    busy={deleting}
                    onConfirm={handleDelete}
                    onCancel={() => setRowToDelete(null)}
                >
                    Characters that already reference this entry keep their stored copy; only future lookups and edits are affected.
                </ConfirmDialog>
            )}
        </div>
    );
}
