/**
 * Offline edits: sheet saves made without a connection wait here (localStorage) and are
 * sent in order once the server can be reached. Each save only carries what it changed
 * (a field of `data`, HP, one resource, one item, a coin change), and the server applies
 * it to the character as it is then, so edits made elsewhere meanwhile (loot from the DM,
 * another device) are kept: the merge is automatic, field by field, latest edit wins.
 *
 * Only in-play saves opt in (`api.patch(..., { offline: true })`); creation, level up,
 * rests, campaigns and encounters still need a connection.
 */

export type QueuedMethod = 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export interface QueuedWrite {
    id: string;
    method: QueuedMethod;
    endpoint: string;
    body?: unknown;
    queuedAt: number;
}

/** What a queued save resolves to instead of the server's response. */
export const QUEUED = Object.freeze({ queued: true as const });
export type Queued = typeof QUEUED;

export function isQueued(value: unknown): value is Queued {
    return !!value && typeof value === 'object' && (value as { queued?: unknown }).queued === true;
}

const STORAGE_KEY = 'grulla:offline-queue';
/** Fired on window when the queue changes (detail: number pending). */
export const QUEUE_CHANGED = 'grulla:queue-changed';
/** Fired on window after a flush sent something (detail: FlushResult). */
export const QUEUE_FLUSHED = 'grulla:queue-flushed';

export interface FlushResult {
    sent: number;
    /** Saves the server refused (4xx); they're dropped, with the reason. */
    failed: { write: QueuedWrite; message: string }[];
    /** Characters whose saves were sent, so open sheets can reload. */
    characterIds: string[];
    /** True when the queue still holds saves (still offline, or the server errored). */
    remaining: number;
}

function read(): QueuedWrite[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function write(queue: QueuedWrite[]): void {
    if (typeof window === 'undefined') return;
    if (queue.length === 0) localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
    window.dispatchEvent(new CustomEvent(QUEUE_CHANGED, { detail: queue.length }));
}

export function pendingWrites(): QueuedWrite[] {
    return read();
}

export function enqueueWrite(method: QueuedMethod, endpoint: string, body?: unknown, now = Date.now()): QueuedWrite {
    const entry: QueuedWrite = { id: `${now}-${Math.random().toString(36).slice(2, 8)}`, method, endpoint, body, queuedAt: now };
    write([...read(), entry]);
    return entry;
}

export function clearQueue(): void {
    write([]);
}

/** The character a save belongs to: "/characters/<id>/..." */
export function characterIdOf(endpoint: string): string | null {
    const match = /^\/characters\/([^/?]+)/.exec(endpoint);
    return match ? decodeURIComponent(match[1]) : null;
}

/** The server's answer to one queued save, as `send` reports it. */
export type SendOutcome =
    | { ok: true }
    /** Unreachable, a server error or signed out: stop and try again later. */
    | { ok: false; retry: true }
    /** Refused (bad request, gone): drop it and say why. */
    | { ok: false; retry: false; message: string };

let flushing: Promise<FlushResult> | null = null;

/**
 * Send queued saves oldest first, stopping at the first that can't be sent yet.
 * Concurrent calls share one run.
 */
export function flushQueue(send: (write: QueuedWrite) => Promise<SendOutcome>): Promise<FlushResult> {
    if (flushing) return flushing;
    flushing = (async () => {
        const result: FlushResult = { sent: 0, failed: [], characterIds: [], remaining: 0 };
        const touched = new Set<string>();
        for (;;) {
            const next = read()[0];
            if (!next) break;
            let outcome: SendOutcome;
            try {
                outcome = await send(next);
            } catch {
                outcome = { ok: false, retry: true };
            }
            if (!outcome.ok && outcome.retry) break;
            // Sent or refused: either way it leaves the queue (re-read: saves may have been added meanwhile)
            write(read().filter((w) => w.id !== next.id));
            const characterId = characterIdOf(next.endpoint);
            if (characterId) touched.add(characterId);
            if (outcome.ok) result.sent++;
            else result.failed.push({ write: next, message: outcome.message });
        }
        result.characterIds = [...touched];
        result.remaining = read().length;
        if (typeof window !== 'undefined' && (result.sent > 0 || result.failed.length > 0)) {
            window.dispatchEvent(new CustomEvent(QUEUE_FLUSHED, { detail: result }));
        }
        return result;
    })().finally(() => {
        flushing = null;
    });
    return flushing;
}
