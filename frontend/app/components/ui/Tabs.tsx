'use client';

export interface TabItem<T extends string> {
    id: T;
    label: React.ReactNode;
    /** Small count or status after the label */
    badge?: React.ReactNode;
}

interface TabsProps<T extends string> {
    tabs: TabItem<T>[];
    active: T;
    onChange: (id: T) => void;
    /** Accessible name for the tab list */
    label: string;
    /** Prefix for tab/panel ids: the panel for tab `x` should have id `${idPrefix}-panel-${x}` */
    idPrefix: string;
}

/**
 * WAI-ARIA tabs: arrow keys, Home and End move between tabs (and select them).
 * Render the panel yourself with `tabPanelProps(idPrefix, id)`.
 */
export default function Tabs<T extends string>({ tabs, active, onChange, label, idPrefix }: TabsProps<T>) {
    const focusTab = (index: number) => {
        const next = tabs[(index + tabs.length) % tabs.length];
        onChange(next.id);
        document.getElementById(`${idPrefix}-tab-${next.id}`)?.focus();
    };

    const onKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === 'ArrowRight') focusTab(index + 1);
        else if (e.key === 'ArrowLeft') focusTab(index - 1);
        else if (e.key === 'Home') focusTab(0);
        else if (e.key === 'End') focusTab(tabs.length - 1);
        else return;
        e.preventDefault();
    };

    return (
        <div className="tabs" role="tablist" aria-label={label}>
            {tabs.map((tab, index) => {
                const selected = tab.id === active;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`${idPrefix}-tab-${tab.id}`}
                        className="tab"
                        aria-selected={selected}
                        aria-controls={`${idPrefix}-panel-${tab.id}`}
                        tabIndex={selected ? 0 : -1}
                        onClick={() => onChange(tab.id)}
                        onKeyDown={(e) => onKeyDown(e, index)}
                    >
                        {tab.label}
                        {tab.badge !== undefined && tab.badge !== null && <span className="tab-badge">{tab.badge}</span>}
                    </button>
                );
            })}
        </div>
    );
}

/** Props for the panel that belongs to tab `id`. */
export function tabPanelProps(idPrefix: string, id: string) {
    return {
        role: 'tabpanel' as const,
        id: `${idPrefix}-panel-${id}`,
        'aria-labelledby': `${idPrefix}-tab-${id}`,
        tabIndex: 0,
    };
}
