'use client';
import { useCallback } from 'react';
import { useToast } from './Toast';

export interface OptimisticSaveOptions<T> {
    /** Update local state right away. */
    apply: () => void;
    /** Undo `apply` if the request fails. */
    rollback: () => void;
    /** The request that persists the change. */
    request: () => Promise<T>;
    /** Shown in an error toast when the request fails. */
    errorMessage: string;
    /** Optional toast on success (most saves should stay quiet). */
    successMessage?: string;
}

/**
 * Apply a change locally, persist it, and roll back with an error toast if persisting fails.
 * Resolves to the request's result, or `undefined` when it failed.
 */
export function useOptimisticSave() {
    const toast = useToast();
    return useCallback(async <T,>({ apply, rollback, request, errorMessage, successMessage }: OptimisticSaveOptions<T>): Promise<T | undefined> => {
        apply();
        try {
            const result = await request();
            if (successMessage) toast.success(successMessage);
            return result;
        } catch (err) {
            console.error(errorMessage, err);
            rollback();
            toast.error(describeError(errorMessage, err));
            return undefined;
        }
    }, [toast]);
}

/** "Couldn't save AC: Network error" — adds the server's message when there is one. */
export function describeError(message: string, err: unknown): string {
    // fetch() rejects with a TypeError when the server can't be reached at all.
    const detail = err instanceof TypeError ? "couldn't reach the server"
        : err instanceof Error ? err.message
        : typeof err === 'string' ? err : '';
    if (!detail || detail === message) return message;
    return `${message}: ${detail}`;
}
