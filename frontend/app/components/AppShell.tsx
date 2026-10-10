'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { clearAuthStorage, isStoredUserAdmin } from '@/lib/auth';
import { isAdminPath, isProtectedPath } from './AuthGuard';
import ThemeToggle from './ui/ThemeToggle';
import D20Icon from './ui/D20Icon';
import OfflineSupport from './OfflineSupport';
import { listenForBackButton } from '@/lib/nativeApp';

/** Character pages (list, creation, sheets) all live under "My Characters". */
function isCharactersPath(pathname: string): boolean {
    return pathname === '/dashboard' || pathname === '/create' || pathname.startsWith('/character/');
}

/** Campaign list, hubs and encounters. */
function isCampaignsPath(pathname: string): boolean {
    return pathname === '/campaigns' || pathname.startsWith('/campaigns/');
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
    return (
        <Link href={href} className="nav-link" aria-current={active ? 'page' : undefined}>
            {children}
        </Link>
    );
}

function MenuIcon({ open }: { open: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
    );
}

/** Top navigation for signed-in pages. */
export function AppNav() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    // Phones show the links behind a Menu button; wider screens always show them
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setIsAdmin(isStoredUserAdmin());
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <nav className="nav" aria-label="Main" data-open={open || undefined}>
            <Link href="/dashboard" className="nav-brand"><D20Icon className="nav-brand-icon" />D&amp;D 5.5e</Link>
            <button
                type="button"
                className="btn btn-ghost nav-toggle"
                aria-expanded={open}
                aria-controls="main-nav-links"
                onClick={() => setOpen((o) => !o)}
            >
                <MenuIcon open={open} />
                Menu
            </button>
            <div className="nav-links" id="main-nav-links">
                <NavLink href="/dashboard" active={isCharactersPath(pathname)}>My Characters</NavLink>
                <NavLink href="/campaigns" active={isCampaignsPath(pathname)}>Campaigns</NavLink>
                {isAdmin && <NavLink href="/admin" active={isAdminPath(pathname)}>Admin</NavLink>}
                <NavLink href="/account" active={pathname === '/account' || pathname.startsWith('/account/')}>Account</NavLink>
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

    // Android's back button closes dialogs first, then goes back (the app only)
    useEffect(() => listenForBackButton(), []);

    return (
        <main className="container">
            <OfflineSupport />
            {showNav && <AppNav />}
            {children}
        </main>
    );
}
