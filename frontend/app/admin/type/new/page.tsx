'use client';
import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { REFERENCE_TYPES, TYPE_LABELS, ReferenceType } from '@/lib/adminReference';
import ReferenceForm from '../ReferenceForm';
import { adminTypeHref, useQueryParam } from '@/lib/routes';

function isValidType(type: string): type is ReferenceType {
    return (REFERENCE_TYPES as readonly string[]).includes(type);
}

function NewReferenceItem() {
    const router = useRouter();
    const type = useQueryParam('type');

    if (!isValidType(type)) {
        return <div style={{ color: 'var(--error)' }}>Unknown reference type: {type}</div>;
    }

    const handleSubmit = async (key: string | undefined, data: any) => {
        await api.post(`/admin/reference/${type}`, { key, data });
        router.push(adminTypeHref(type));
    };

    return (
        <div style={{ maxWidth: '700px' }}>
            <div style={{ marginBottom: '1rem' }}>
                <Link href={adminTypeHref(type)}>&larr; {TYPE_LABELS[type]}</Link>
            </div>
            <h1 className="heading">New {TYPE_LABELS[type].replace(/s$/, '')}</h1>
            <div className="card">
                <ReferenceForm type={type} onSubmit={handleSubmit} onCancel={() => router.push(adminTypeHref(type))} />
            </div>
        </div>
    );
}

/** Reads the query string, which a static page only knows in the browser. */
export default function NewReferenceItemPage() {
    return (
        <Suspense fallback={null}>
            <NewReferenceItem />
        </Suspense>
    );
}
