'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { formatJoinCode } from '@/lib/campaigns';
import { Button, ConfirmDialog, describeError, SectionHeader, useToast } from '@/app/components/ui';

interface InviteCardProps {
    campaignId: string;
    joinCode: string;
    onCodeChange: (code: string) => void;
}

/** The DM's join code: copy it for players, or replace it so the old one stops working. */
export default function InviteCard({ campaignId, joinCode, onCodeChange }: InviteCardProps) {
    const [confirming, setConfirming] = useState(false);
    const [busy, setBusy] = useState(false);
    const toast = useToast();

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(joinCode);
            toast.success('Join code copied.');
        } catch {
            toast.info(`Join code: ${joinCode}`);
        }
    };

    const regenerate = async () => {
        setBusy(true);
        try {
            const { joinCode: next } = await api.post(`/campaigns/${campaignId}/join-code`, {});
            onCodeChange(next);
            setConfirming(false);
            toast.success('New join code ready. The old one no longer works.');
        } catch (err) {
            toast.error(describeError("Couldn't make a new code", err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="card invite-card" aria-labelledby="invite-title">
            <SectionHeader title="Invite players" id="invite-title" as="h2" />
            <p className="invite-code" aria-label={`Join code ${joinCode.split('').join(' ')}`}>{formatJoinCode(joinCode)}</p>
            <p className="field-hint" style={{ marginTop: 0 }}>Players enter this under Campaigns → Join with a code.</p>
            <div className="invite-actions">
                <Button size="sm" onClick={copy}>Copy code</Button>
                <Button size="sm" variant="ghost" onClick={() => setConfirming(true)}>New code…</Button>
            </div>
            {confirming && (
                <ConfirmDialog
                    title="Make a new join code?"
                    confirmLabel="New code"
                    busy={busy}
                    onConfirm={regenerate}
                    onCancel={() => setConfirming(false)}
                >
                    The current code stops working. Players already in the campaign stay in it.
                </ConfirmDialog>
            )}
        </section>
    );
}
