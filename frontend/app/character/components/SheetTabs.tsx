'use client';

import { useRef } from 'react';

export type SheetTabId = 'core' | 'combat' | 'spells' | 'gear' | 'features';

interface SheetTabsProps {
    tabs: { id: SheetTabId; label: string }[];
    active: SheetTabId;
    onChange: (tab: SheetTabId) => void;
}

/**
 * Bottom tab bar for phones: the sheet shows one group of sections at a time
 * (CSS hides the others via data-active-tab). Hidden on wider screens.
 * Arrow keys move between tabs, following the ARIA tabs pattern.
 */
export default function SheetTabs({ tabs, active, onChange }: SheetTabsProps) {
    const listRef = useRef<HTMLDivElement>(null);

    const focusTab = (index: number) => {
        const next = tabs[(index + tabs.length) % tabs.length];
        onChange(next.id);
        listRef.current?.querySelector<HTMLButtonElement>(`[data-tab-id="${next.id}"]`)?.focus();
    };

    return (
        <div className="sheet-tabs no-print" role="tablist" aria-label="Sheet sections" ref={listRef}>
            {tabs.map((tab, index) => {
                const selected = tab.id === active;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        data-tab-id={tab.id}
                        aria-selected={selected}
                        tabIndex={selected ? 0 : -1}
                        className="sheet-tab"
                        onClick={() => onChange(tab.id)}
                        onKeyDown={(e) => {
                            if (e.key === 'ArrowRight') { e.preventDefault(); focusTab(index + 1); }
                            if (e.key === 'ArrowLeft') { e.preventDefault(); focusTab(index - 1); }
                            if (e.key === 'Home') { e.preventDefault(); focusTab(0); }
                            if (e.key === 'End') { e.preventDefault(); focusTab(tabs.length - 1); }
                        }}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
}
