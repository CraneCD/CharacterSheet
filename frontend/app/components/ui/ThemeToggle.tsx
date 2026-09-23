'use client';
import { useEffect, useState } from 'react';
import { getStoredTheme, setTheme, THEME_PREFERENCES, ThemePreference } from '@/lib/theme';

const LABELS: Record<ThemePreference, string> = { system: 'System', light: 'Light', dark: 'Dark' };

function ThemeIcon({ theme }: { theme: ThemePreference }) {
    const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true };
    if (theme === 'light') {
        return (
            <svg {...common}>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
        );
    }
    if (theme === 'dark') {
        return (
            <svg {...common}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
        );
    }
    return (
        <svg {...common}>
            <rect x="2" y="4" width="20" height="13" rx="2" />
            <path d="M8 21h8M12 17v4" />
        </svg>
    );
}

/** Cycles System → Light → Dark. The saved choice is applied before paint by THEME_INIT_SCRIPT. */
export default function ThemeToggle() {
    const [theme, setThemeState] = useState<ThemePreference>('system');

    useEffect(() => {
        setThemeState(getStoredTheme());
    }, []);

    const next = THEME_PREFERENCES[(THEME_PREFERENCES.indexOf(theme) + 1) % THEME_PREFERENCES.length];

    return (
        <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
                setTheme(next);
                setThemeState(next);
            }}
            aria-label={`Theme: ${LABELS[theme]}. Switch to ${LABELS[next]}`}
            title={`Theme: ${LABELS[theme]}`}
        >
            <ThemeIcon theme={theme} />
            <span>{LABELS[theme]}</span>
        </button>
    );
}
