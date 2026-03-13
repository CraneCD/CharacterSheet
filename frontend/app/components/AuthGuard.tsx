'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PROTECTED_PREFIXES = ['/dashboard', '/create', '/character', '/campaigns'];
const AUTH_PAGES = ['/login', '/register'];

function isProtectedPath(pathname: string): boolean {
    return PROTECTED_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(prefix + '/'));
}

function isAuthPage(pathname: string): boolean {
    return AUTH_PAGES.includes(pathname);
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('token');

        if (isProtectedPath(pathname) && !token) {
            router.replace('/login');
            return;
        }

        if (isAuthPage(pathname) && token) {
            router.replace('/dashboard');
        }
    }, [pathname, router]);

    return <>{children}</>;
}
