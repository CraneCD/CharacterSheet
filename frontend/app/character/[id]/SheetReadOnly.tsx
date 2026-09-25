'use client';

import { createContext, useContext } from 'react';

/**
 * True when someone other than the owner is viewing the sheet (the DM of the
 * character's campaign). Managers hide their edit controls; the backend only
 * accepts writes from the owner either way.
 */
const SheetReadOnlyContext = createContext(false);

export const SheetReadOnlyProvider = SheetReadOnlyContext.Provider;

export function useSheetReadOnly(): boolean {
    return useContext(SheetReadOnlyContext);
}

/** Display-only widgets (resource pips, coins) on a read-only sheet: shown, but not clickable or focusable. */
export function ReadOnlyRegion({ children }: { children: React.ReactNode }) {
    const readOnly = useSheetReadOnly();
    if (!readOnly) return <>{children}</>;
    // `inert` isn't in React 18's attribute types; an empty string sets it
    return <div className="sheet-readonly-region" {...({ inert: '' } as Record<string, string>)}>{children}</div>;
}
