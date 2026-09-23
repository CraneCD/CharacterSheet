'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export type ToastKind = 'info' | 'success' | 'error';

interface ToastItem {
    id: number;
    kind: ToastKind;
    message: string;
}

export interface ToastApi {
    show: (message: string, kind?: ToastKind) => number;
    info: (message: string) => number;
    success: (message: string) => number;
    error: (message: string) => number;
    dismiss: (id: number) => void;
}

const DURATION_MS: Record<ToastKind, number> = { info: 4000, success: 4000, error: 7000 };
const MAX_VISIBLE = 4;

const ToastContext = createContext<ToastApi | null>(null);

/** Fallback so components still work (logging only) when rendered outside the provider, e.g. in unit tests. */
const consoleToast: ToastApi = {
    show: (message, kind = 'info') => {
        (kind === 'error' ? console.error : console.info)(message);
        return 0;
    },
    info: (message) => consoleToast.show(message, 'info'),
    success: (message) => consoleToast.show(message, 'success'),
    error: (message) => consoleToast.show(message, 'error'),
    dismiss: () => {},
};

export function useToast(): ToastApi {
    return useContext(ToastContext) ?? consoleToast;
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: (id: number) => void }) {
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const timer = setTimeout(() => onDismiss(item.id), DURATION_MS[item.kind]);
        return () => clearTimeout(timer);
    }, [item.id, item.kind, paused, onDismiss]);

    return (
        <div
            className={`toast toast-${item.kind}`}
            role={item.kind === 'error' ? 'alert' : 'status'}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <div className="toast-message">{item.message}</div>
            <button type="button" className="toast-close" aria-label="Dismiss notification" onClick={() => onDismiss(item.id)}>
                &times;
            </button>
        </div>
    );
}

/** Provides useToast() and renders the notification stack (bottom-right; full width on phones). */
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const nextId = useRef(1);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback((message: string, kind: ToastKind = 'info') => {
        const id = nextId.current++;
        setToasts((prev) => {
            // Collapse repeats of the same message (e.g. several failed saves in a row).
            const withoutDuplicate = prev.filter((t) => !(t.message === message && t.kind === kind));
            return [...withoutDuplicate, { id, kind, message }].slice(-MAX_VISIBLE);
        });
        return id;
    }, []);

    const api = useMemo<ToastApi>(() => ({
        show,
        info: (message) => show(message, 'info'),
        success: (message) => show(message, 'success'),
        error: (message) => show(message, 'error'),
        dismiss,
    }), [show, dismiss]);

    return (
        <ToastContext.Provider value={api}>
            {children}
            <div className="toast-region" aria-label="Notifications">
                {toasts.map((t) => <Toast key={t.id} item={t} onDismiss={dismiss} />)}
            </div>
        </ToastContext.Provider>
    );
}
