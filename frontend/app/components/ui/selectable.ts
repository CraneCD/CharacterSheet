import type { KeyboardEvent } from 'react';

/**
 * Props that make a clickable card behave like a toggle button: focusable, announced
 * as pressed/not pressed, and activated with Enter or Space as well as a click.
 */
export function selectableProps(selected: boolean, onSelect: () => void) {
    return {
        role: 'button' as const,
        tabIndex: 0,
        'aria-pressed': selected,
        onClick: onSelect,
        onKeyDown: (e: KeyboardEvent) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect();
            }
        },
    };
}
