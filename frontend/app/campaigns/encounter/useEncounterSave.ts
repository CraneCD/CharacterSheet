'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import { EncounterState, EncounterStatus } from '@/lib/initiative';
import { describeError, useToast } from '@/app/components/ui';

export interface EncounterPatch {
    name?: string;
    status?: EncounterStatus;
    data?: EncounterState;
}

export type SaveStatus = 'saved' | 'saving' | 'error';

/**
 * Saves tracker changes in the background. The tracker updates instantly;
 * rapid changes (clicking through turns) are merged and sent one request at a
 * time, always with the newest state. A failed save keeps the local state,
 * says so, and is retried by the next change or the Retry button.
 */
export function useEncounterSave(campaignId: string, encounterId: string) {
    const [status, setStatus] = useState<SaveStatus>('saved');
    const pending = useRef<EncounterPatch | null>(null);
    const inFlight = useRef(false);
    const failedOnce = useRef(false);
    const toast = useToast();

    const flush = useCallback(async () => {
        if (inFlight.current) return;
        inFlight.current = true;
        // Send the newest state until nothing is left; changes made meanwhile queue up in `pending`
        while (pending.current) {
            const patch = pending.current;
            pending.current = null;
            setStatus('saving');
            try {
                await api.put(`/campaigns/${campaignId}/encounters/${encounterId}`, patch);
                failedOnce.current = false;
            } catch (err) {
                // Keep what failed so the next change or Retry sends it again
                pending.current = { ...patch, ...(pending.current ?? {}) };
                inFlight.current = false;
                setStatus('error');
                if (!failedOnce.current) toast.error(describeError("Couldn't save the encounter", err));
                failedOnce.current = true;
                return;
            }
        }
        inFlight.current = false;
        setStatus('saved');
    }, [campaignId, encounterId, toast]);

    const save = useCallback((patch: EncounterPatch) => {
        pending.current = { ...pending.current, ...patch };
        void flush();
    }, [flush]);

    const retry = useCallback(() => void flush(), [flush]);

    // Don't lose the last change when leaving the page
    useEffect(() => () => {
        if (pending.current) {
            api.put(`/campaigns/${campaignId}/encounters/${encounterId}`, pending.current).catch(() => undefined);
        }
    }, [campaignId, encounterId]);

    return { save, status, retry };
}
