'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthStorage, isStoredUserAdmin } from '@/lib/auth';
import { isAdminPath, isProtectedPath } from './AuthGuard';
import ThemeToggle from './ui/ThemeToggle';

/** Character pages (list, creation, sheets) all live under "My Characters". */
function isCharactersPath(pathname: string): boolean {
    return pathname === '/dashboard' || pathname === '/create' || pathname.startsWith('/character/');
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link href={href} className="nav-link" aria-current={active ? 'page' : undefined}>
            {children}
        </Link>
    );
}

/** Top navigation for signed-in pages. */
export function AppNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(isStoredUserAdmin());
    }, []);

    return (
        <nav className="nav" aria-label="Main">
            <Link href="/dashboard" className="nav-brand">D&amp;D 5.5e</Link>
            <div className="nav-links">
                <NavLink href="/dashboard" active={isCharactersPath(pathname)}>My Characters</NavLink>
                {isAdmin && <NavLink href="/admin" active={isAdminPath(pathname)}>Admin</NavLink>}
                <span className="nav-divider" aria-hidden="true" />
                <ThemeToggle />
                <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                        clearAuthStorage();
                        router.replace('/login');
                    }}
                >
                    Log out
                </button>
            </div>
        </nav>
    );
}

/** Page frame: the main nav on signed-in pages, then the page content. */
export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const showNav = isProtectedPath(pathname);

    return (
        <main className="container">
            {showNav && <AppNav />}
            {children}
        </main>
    );
}
