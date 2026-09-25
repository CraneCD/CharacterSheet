'use client';

import { useEffect, useId, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { CampaignSummary } from '@/lib/campaigns';
import { Button, describeError, Modal, Skeleton } from '@/app/components/ui';

interface CampaignPickerDialogProps {
    characterName: string;
    characterId: string;
    currentCampaignId: string | null;
    onSaved: (campaign: { id: string; name: string } | null) => void;
    onClose: () => void;
}

/** Move a character into one of your campaigns (a character is in one at a time), or out of its campaign. */
export default function CampaignPickerDialog({ characterName, characterId, currentCampaignId, onSaved, onClose }: CampaignPickerDialogProps) {
    const [campaigns, setCampaigns] = useState<CampaignSummary[] | null>(null);
    const [choice, setChoice] = useState<string>(currentCampaignId ?? '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const groupId = useId();

    useEffect(() => {
        api.get('/campaigns')
            .then((list: CampaignSummary[]) => setCampaigns(list.filter((c) => c.role === 'player')))
            .catch((err) => {
                setCampaigns([]);
                setError(describeError("Couldn't load your campaigns", err));
            });
    }, []);

    const save = async () => {
        setSaving(true);
        setError('');
        try {
            const result = await api.put('/campaigns/assign-character', { characterId, campaignId: choice || null });
            onSaved(result.campaign ?? null);
        } catch (err) {
            setError(describeError("Couldn't change the campaign", err));
            setSaving(false);
        }
    };

    return (
        <Modal
            title="Campaign"
            size="sm"
            onClose={onClose}
            dismissible={!saving}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button onClick={save} loading={saving} disabled={campaigns === null || choice === (currentCampaignId ?? '')}>Save</Button>
                </>
            }
        >
            <p id={groupId} style={{ marginTop: 0 }}>Which campaign is {characterName} playing in?</p>
            {campaigns === null ? (
                <Skeleton height="4rem" />
            ) : (
                <div className="radio-list" role="radiogroup" aria-labelledby={groupId}>
                    {campaigns.map((c) => (
                        <label key={c.id} className="radio-row">
                            <input type="radio" name="campaign" value={c.id} checked={choice === c.id} onChange={() => setChoice(c.id)} />
                            <span>{c.name} <small>DM: {c.dmName}</small></span>
                        </label>
                    ))}
                    <label className="radio-row">
                        <input type="radio" name="campaign" value="" checked={choice === ''} onChange={() => setChoice('')} />
                        <span>No campaign</span>
                    </label>
                </div>
            )}
            {campaigns !== null && campaigns.length === 0 && !error && (
                <p className="field-hint">You haven&apos;t joined any campaigns yet. <Link href="/campaigns">Join one with a code</Link> from your DM.</p>
            )}
            {error && <div className="form-error" role="alert">{error}</div>}
        </Modal>
    );
}
