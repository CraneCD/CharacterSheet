'use client';
import { useEffect, useId, useRef, useState } from 'react';
import { buttonClass, ButtonSize, ButtonVariant } from './Button';

export interface MenuItem {
    label: string;
    onSelect: () => void;
    /** Destructive action: shown in the error color. */
    danger?: boolean;
    disabled?: boolean;
    /** Draw a divider above this item. */
    separatorBefore?: boolean;
}

interface MenuProps {
    /** Visible trigger content, e.g. "⋯" or "More". */
    label: React.ReactNode;
    /** Accessible name for the trigger when `label` is an icon. */
    ariaLabel?: string;
    items: MenuItem[];
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Which edge of the trigger the menu lines up with. */
    align?: 'start' | 'end';
}

/**
 * Menu button (WAI-ARIA menu pattern): Enter/Space/ArrowDown opens it and focuses the first
 * item, arrow keys / Home / End move, Escape closes and returns focus, clicking outside closes.
 */
export default function Menu({ label, ariaLabel, items, variant = 'secondary', size = 'sm', align = 'end' }: MenuProps) {
    const [open, setOpen] = useState(false);
    const menuId = useId();
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const enabledItems = () =>
        Array.from(menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not(:disabled)') ?? []);

    const close = (returnFocus: boolean) => {
        setOpen(false);
        if (returnFocus) triggerRef.current?.focus();
    };

    useEffect(() => {
        if (!open) return;
        enabledItems()[0]?.focus();
        const onPointerDown = (e: MouseEvent) => {
            if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener('mousedown', onPointerDown);
        return () => document.removeEventListener('mousedown', onPointerDown);
    }, [open]);

    const onMenuKeyDown = (e: React.KeyboardEvent) => {
        const list = enabledItems();
        const index = list.indexOf(document.activeElement as HTMLButtonElement);
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                list[(index + 1) % list.length]?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                list[(index - 1 + list.length) % list.length]?.focus();
                break;
            case 'Home':
                e.preventDefault();
                list[0]?.focus();
                break;
            case 'End':
                e.preventDefault();
                list[list.length - 1]?.focus();
                break;
            case 'Escape':
                e.preventDefault();
                e.stopPropagation();
                close(true);
                break;
            case 'Tab':
                setOpen(false);
                break;
        }
    };

    return (
        <div className="menu" ref={containerRef}>
            <button
                ref={triggerRef}
                type="button"
                className={buttonClass({ variant, size })}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                aria-label={ariaLabel}
                onClick={() => setOpen((o) => !o)}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' && !open) {
                        e.preventDefault();
                        setOpen(true);
                    }
                }}
            >
                {label}
            </button>
            {open && (
                <div
                    ref={menuRef}
                    id={menuId}
                    role="menu"
                    aria-label={ariaLabel}
                    className={`menu-list menu-align-${align}`}
                    onKeyDown={onMenuKeyDown}
                >
                    {items.map((item) => (
                        <div key={item.label} role="none">
                            {item.separatorBefore && <div className="menu-separator" role="separator" />}
                            <button
                                type="button"
                                role="menuitem"
                                tabIndex={-1}
                                className={item.danger ? 'menu-item menu-item-danger' : 'menu-item'}
                                disabled={item.disabled}
                                onClick={() => {
                                    close(true);
                                    item.onSelect();
                                }}
                            >
                                {item.label}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
