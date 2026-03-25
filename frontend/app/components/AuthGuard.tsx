'use client';

import { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthStorage, isStoredTokenValid } from '@/lib/auth';

const PROTECTED_PREFIXES = ['/dashboard', '/create', '/character', '/campaigns'];
const AUTH_PAGES = ['/login', '/register'];

function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'));
}

function isAuthPage(pathname: string): boolean {
    return AUTH_PAGES.includes(pathname);
}

function needsClientAuthGate(pathname: string): boolean {
    return isProtectedPath(pathname) || isAuthPage(pathname);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    /** `pathname` value for which the gate has finished (allowed or redirected). */
    const [clearedPath, setClearedPath] = useState<string | null>(null);

    useLayoutEffect(() => {
        if (typeof window === 'undefined') return;

        const needsGate = needsClientAuthGate(pathname);
        if (!needsGate) {
            setClearedPath(pathname);
            return;
        }

        setClearedPath(null);

        const raw = localStorage.getItem('token');
        const valid = isStoredTokenValid(raw);

        if (isProtectedPath(pathname) && !valid) {
            if (raw) clearAuthStorage();
            router.replace('/login');
            setClearedPath(pathname);
            return;
        }

        if (isAuthPage(pathname) && valid) {
            router.replace('/dashboard');
            setClearedPath(pathname);
            return;
        }

        setClearedPath(pathname);
    }, [pathname, router]);

    const needsGate = needsClientAuthGate(pathname);
    const blocked = needsGate && clearedPath !== pathname;

    if (blocked) {
        return (
            <div
                style={{ minHeight: '40vh' }}
                aria-busy="true"
                aria-label="Loading"
            />
        );
    }

    return <>{children}</>;
}
