'use client';
import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

export interface ModalProps {
    onClose: () => void;
    /** Shown in the header and used as the dialog's accessible name. */
    title?: React.ReactNode;
    /** Accessible name when there is no visible title. */
    ariaLabel?: string;
    children?: React.ReactNode;
    /** Action row at the bottom (right-aligned). */
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
    /** When false, Escape, the overlay and the close button do nothing (e.g. while saving). */
    dismissible?: boolean;
    /** Element to focus when the modal opens. Defaults to the dialog itself. */
    initialFocusRef?: React.RefObject<HTMLElement | null>;
    role?: 'dialog' | 'alertdialog';
    className?: string;
    contentStyle?: React.CSSProperties;
}

const FOCUSABLE = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
].join(',');

/** Open modals. Only the top one (deepest nesting, then latest opened) reacts to Escape and traps Tab. */
interface StackEntry { depth: number; order: number }
const modalStack: StackEntry[] = [];
let openCounter = 0;

function isTopModal(entry: StackEntry): boolean {
    return modalStack.every((other) => other === entry
        || other.depth < entry.depth
        || (other.depth === entry.depth && other.order < entry.order));
}

/** Nesting depth, so a modal rendered inside another is on top even when both mount together. */
const ModalDepthContext = createContext(0);
let scrollLocks = 0;
let savedBodyOverflow = '';

function lockScroll() {
    if (scrollLocks++ === 0) {
        savedBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }
}

function unlockScroll() {
    if (--scrollLocks === 0) {
        document.body.style.overflow = savedBodyOverflow;
    }
}

/**
 * Accessible modal dialog: rendered in a portal, labelled by its title, traps focus,
 * closes on Escape / overlay click, locks page scroll and restores focus on close.
 * Render it conditionally (`{open && <Modal …/>}`).
 */
export default function Modal({
    onClose,
    title,
    ariaLabel,
    children,
    footer,
    size = 'md',
    dismissible = true,
    initialFocusRef,
    role = 'dialog',
    className,
    contentStyle,
}: ModalProps) {
    const depth = useContext(ModalDepthContext) + 1;
    const titleId = useId();
    const contentRef = useRef<HTMLDivElement>(null);
    const pressStartedOnOverlay = useRef(false);
    const onCloseRef = useRef(onClose);
    const dismissibleRef = useRef(dismissible);
    // Where focus was before opening, read on first render: a child's autoFocus moves it before effects run
    const [previouslyFocused] = useState(() => (typeof document === 'undefined' ? null : document.activeElement as HTMLElement | null));
    onCloseRef.current = onClose;
    dismissibleRef.current = dismissible;

    useEffect(() => {
        const token: StackEntry = { depth, order: openCounter++ };
        modalStack.push(token);
        lockScroll();

        const content = contentRef.current;
        // Respect a child's autoFocus; otherwise focus the requested element or the dialog.
        if (content && !content.contains(document.activeElement)) {
            (initialFocusRef?.current ?? content).focus();
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isTopModal(token) || !contentRef.current) return;
            if (e.key === 'Escape') {
                if (dismissibleRef.current) {
                    e.stopPropagation();
                    onCloseRef.current();
                }
                return;
            }
            if (e.key !== 'Tab') return;
            const focusables = Array.from(contentRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
            if (focusables.length === 0) {
                e.preventDefault();
                contentRef.current.focus();
                return;
            }
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            const active = document.activeElement;
            if (e.shiftKey && (active === first || active === contentRef.current)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            } else if (!contentRef.current.contains(active)) {
                e.preventDefault();
                first.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            const index = modalStack.indexOf(token);
            if (index >= 0) modalStack.splice(index, 1);
            unlockScroll();
            if (previouslyFocused && document.contains(previouslyFocused)) {
                previouslyFocused.focus();
            }
        };
        // Mount/unmount only: focus handling must not re-run on every render.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof document === 'undefined') return null;

    const sizeClass = size === 'md' ? '' : ` modal-${size}`;

    return createPortal(
        <div
            className="modal-overlay"
            onMouseDown={(e) => { pressStartedOnOverlay.current = e.target === e.currentTarget; }}
            onClick={(e) => {
                if (dismissible && pressStartedOnOverlay.current && e.target === e.currentTarget) onClose();
                pressStartedOnOverlay.current = false;
            }}
        >
            <div
                ref={contentRef}
                role={role}
                aria-modal="true"
                aria-labelledby={title ? titleId : undefined}
                aria-label={title ? undefined : ariaLabel}
                tabIndex={-1}
                className={`modal-content${sizeClass}${className ? ` ${className}` : ''}`}
                style={contentStyle}
            >
                {title && (
                    <div className="modal-header">
                        <h2 className="modal-title" id={titleId}>{title}</h2>
                        {dismissible && (
                            <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
                                &times;
                            </button>
                        )}
                    </div>
                )}
                <ModalDepthContext.Provider value={depth}>
                    {children}
                    {footer && <div className="modal-footer">{footer}</div>}
                </ModalDepthContext.Provider>
            </div>
        </div>,
        document.body
    );
}
