export type ThemePreference = 'system' | 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';
export const THEME_PREFERENCES: ThemePreference[] = ['system', 'light', 'dark'];

function isThemePreference(value: unknown): value is ThemePreference {
    return value === 'system' || value === 'light' || value === 'dark';
}

/** The saved preference, or 'system' when none is saved or storage is unavailable. */
export function getStoredTheme(): ThemePreference {
    try {
        const value = localStorage.getItem(THEME_STORAGE_KEY);
        return isThemePreference(value) ? value : 'system';
    } catch {
        return 'system';
    }
}

/** Save the preference and apply it: `data-theme` on <html>, or no attribute to follow the OS. */
export function setTheme(theme: ThemePreference): void {
    try {
        if (theme === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
        else localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // Storage blocked: the theme still applies for this page view
    }
    applyTheme(theme);
}

export function applyTheme(theme: ThemePreference): void {
    const root = document.documentElement;
    if (theme === 'system') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme);
}

/**
 * Inline <head> script that applies the saved theme before first paint (no flash of
 * the wrong theme). Kept tiny and dependency-free; mirrors getStoredTheme/applyTheme.
 */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;
