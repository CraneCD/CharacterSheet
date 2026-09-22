'use client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { REFERENCE_TYPES, TYPE_LABELS, ReferenceType } from '@/lib/adminReference';
import ReferenceForm from '../ReferenceForm';

function isValidType(type: string): type is ReferenceType {
    return (REFERENCE_TYPES as readonly string[]).includes(type);
}

export default function NewReferenceItem() {
    const params = useParams();
    const router = useRouter();
    const type = params.type as string;

    if (!isValidType(type)) {
        return <div style={{ color: 'var(--error)' }}>Unknown reference type: {type}</div>;
    }

    const handleSubmit = async (key: string | undefined, data: any) => {
        await api.post(`/admin/reference/${type}`, { key, data });
        router.push(`/admin/${type}`);
    };

    return (
        <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link href={`/admin/${type}`}>&larr; {TYPE_LABELS[type]}</Link>
            </div>
            <h1 className="heading">New {TYPE_LABELS[type].replace(/s$/, '')}</h1>
            <div className="card">
                <ReferenceForm type={type} onSubmit={handleSubmit} onCancel={() => router.push(`/admin/${type}`)} />
            </div>
        </div>
    );
}
