'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { REFERENCE_TYPES, TYPE_LABELS, ReferenceType } from '@/lib/adminReference';
import ReferenceForm from '../ReferenceForm';

function isValidType(type: string): type is ReferenceType {
    return (REFERENCE_TYPES as readonly string[]).includes(type);
}

export default function EditReferenceItem() {
    const params = useParams();
    const router = useRouter();
    const type = params.type as string;
    const key = decodeURIComponent(params.key as string);

    const [data, setData] = useState<any>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!isValidType(type)) return;
        api.get(`/admin/reference/${type}/${encodeURIComponent(key)}`)
            .then(row => setData(row.data))
            .catch(() => setError('Failed to load entry.'))
            .finally(() => setLoading(false));
    }, [type, key]);

    if (!isValidType(type)) {
        return <div style={{ color: 'var(--error)' }}>Unknown reference type: {type}</div>;
    }

    const handleSubmit = async (_key: string | undefined, newData: any) => {
        await api.put(`/admin/reference/${type}/${encodeURIComponent(key)}`, { data: newData });
        router.push(`/admin/${type}`);
    };

    return (
        <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link href={`/admin/${type}`}>&larr; {TYPE_LABELS[type]}</Link>
            </div>
            <h1 className="heading">Edit {key}</h1>

            {error && <div style={{ color: 'var(--error)', marginBottom: '1rem' }}>{error}</div>}

            {loading ? (
                <p>Loading...</p>
            ) : data !== undefined ? (
                <div className="card">
                    <ReferenceForm
                        type={type}
                        initialKey={key}
                        initialData={data}
                        onSubmit={handleSubmit}
                        onCancel={() => router.push(`/admin/${type}`)}
                    />
                </div>
            ) : null}
        </div>
    );
}
