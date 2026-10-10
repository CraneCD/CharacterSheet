'use client';

import { useId } from 'react';

interface CoreCardProps {
    /** Stable id used by the column fitting ("senses", "proficiencies", ...) */
    cardId: string;
    title: string;
    /** One line shown while collapsed */
    summary: React.ReactNode;
    collapsed: boolean;
    /** True when the sheet collapsed it to fit the other columns (not the player) */
    autoCollapsed?: boolean;
    onToggle: () => void;
    /** Buttons beside the title (e.g. "Clear all") */
    actions?: React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

/**
 * A left-column sheet card that can collapse to a one-line summary: the player can open or close
 * it, and the sheet collapses it when the left column would run longer than the others.
 */
export default function CoreCard({ cardId, title, summary, collapsed, autoCollapsed, onToggle, actions, className, children }: CoreCardProps) {
    const id = useId();
    const headingId = `${id}-title`;
    const bodyId = `${id}-body`;
    return (
        <section
            className={['card core-card', collapsed && 'is-collapsed', className].filter(Boolean).join(' ')}
            aria-labelledby={headingId}
            data-core-card={cardId}
        >
            <div className="section-header">
                <h3 className="section-title" id={headingId}>
                    <button type="button" className="core-card-toggle" aria-expanded={!collapsed} aria-controls={bodyId} onClick={onToggle}>
                        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3l5 5-5 5" /></svg>
                        {title}
                    </button>
                </h3>
                {actions && <div className="core-card-actions">{actions}</div>}
            </div>
            {/* Always rendered (hidden while open) so the column fitting can measure both states */}
            <p className="core-card-summary" hidden={!collapsed}>
                {autoCollapsed && <span className="core-card-auto">collapsed to fit</span>}
                {summary}
            </p>
            <div id={bodyId} className="core-card-body" hidden={collapsed}>
                {children}
            </div>
        </section>
    );
}
