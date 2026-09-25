'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api, ApiError } from '@/lib/api';
import { getStoredUserId } from '@/lib/auth';
import { CampaignDetail, isPlayerEncounterView } from '@/lib/campaigns';
import { buttonClass, ConfirmDialog, describeError, Menu, Skeleton, TabItem, Tabs, tabPanelProps, useToast } from '@/app/components/ui';
import { usePolling } from '../usePolling';
import PartyPanel from './components/PartyPanel';
import InviteCard from './components/InviteCard';
import SessionsPanel from './components/SessionsPanel';
import NotesPanel from './components/NotesPanel';
import EncountersPanel from './components/EncountersPanel';
import BestiaryPanel from './components/BestiaryPanel';
import PlayerEncounterCard from './components/PlayerEncounterCard';
import BringCharacterDialog from './components/BringCharacterDialog';
import EditCampaignDialog from './components/EditCampaignDialog';

type TabId = 'party' | 'sessions' | 'encounters' | 'bestiary' | 'notes';
const DM_TABS: TabId[] = ['party', 'sessions', 'encounters', 'bestiary', 'notes'];
const TAB_LABELS: Record<TabId, string> = { party: 'Party', sessions: 'Sessions', encounters: 'Encounters', bestiary: 'Bestiary', notes: 'Notes' };

/** Party HP and turn order refresh on their own: quickly while a fight is on. */
const POLL_MS = 30_000;
const POLL_IN_COMBAT_MS = 5_000;

export default function CampaignPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const toast = useToast();
    const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
    const [loadError, setLoadError] = useState('');
    const [notFound, setNotFound] = useState(false);
    const [tab, setTab] = useState<TabId>('party');
    const [dialog, setDialog] = useState<'edit' | 'delete' | 'leave' | 'bring' | null>(null);
    const [removing, setRemoving] = useState<{ userId: string; name: string } | null>(null);
    const [busy, setBusy] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const refresh = useCallback(() => {
        api.get(`/campaigns/${id}`)
            .then((c: CampaignDetail) => {
                setCampaign(c);
                setLoadError('');
            })
            .catch((err) => {
                if (err instanceof ApiError && err.status === 404) setNotFound(true);
                else setLoadError(describeError("Couldn't load this campaign", err));
            });
    }, [id]);

    useEffect(() => {
        setUserId(getStoredUserId());
        // Deep links such as /campaigns/x#encounters open that tab
        const fromHash = window.location.hash.slice(1) as TabId;
        if (DM_TABS.includes(fromHash)) setTab(fromHash);
        refresh();
    }, [refresh]);

    usePolling(refresh, campaign?.activeEncounter ? POLL_IN_COMBAT_MS : POLL_MS, !!campaign);

    const selectTab = (next: TabId) => {
        setTab(next);
        window.history.replaceState(null, '', `#${next}`);
    };

    if (notFound) {
        return (
            <div className="card" role="alert" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ marginTop: 0 }}>This campaign doesn&apos;t exist, or you&apos;re not in it.</p>
                <Link href="/campaigns" className={buttonClass({ variant: 'secondary' })}>Back to Campaigns</Link>
            </div>
        );
    }
    if (!campaign) {
        return loadError ? (
            <div className="card" role="alert" style={{ maxWidth: '480px', margin: '3rem auto', textAlign: 'center' }}>
                <p style={{ marginTop: 0 }}>{loadError}</p>
                <button type="button" className="btn" onClick={refresh}>Try again</button>
            </div>
        ) : (
            <div aria-busy="true" aria-label="Loading campaign" className="stack">
                <Skeleton width="40%" height="2rem" />
                <Skeleton height="8rem" />
                <Skeleton height="8rem" />
            </div>
        );
    }

    const isDm = campaign.role === 'dm';
    const tabs: TabItem<TabId>[] = (isDm ? DM_TABS : (['party', 'sessions'] as TabId[])).map((t) => ({ id: t, label: TAB_LABELS[t] }));
    const activeTab = tabs.some((t) => t.id === tab) ? tab : 'party';

    const deleteCampaign = async () => {
        setBusy(true);
        try {
            await api.delete(`/campaigns/${campaign.id}`);
            toast.success(`Deleted "${campaign.name}".`);
            router.push('/campaigns');
        } catch (err) {
            toast.error(describeError("Couldn't delete the campaign", err));
            setBusy(false);
        }
    };

    const removeMember = async (member: { userId: string; name: string }, leaving: boolean) => {
        setBusy(true);
        try {
            await api.delete(`/campaigns/${campaign.id}/members/${member.userId}`);
            if (leaving) {
                toast.success(`You left "${campaign.name}".`);
                router.push('/campaigns');
                return;
            }
            toast.success(`Removed ${member.name}.`);
            setRemoving(null);
            refresh();
        } catch (err) {
            toast.error(describeError(leaving ? "Couldn't leave the campaign" : `Couldn't remove ${member.name}`, err));
        } finally {
            setBusy(false);
        }
    };

    const active = campaign.activeEncounter;

    return (
        <div className="campaign-page">
            <div className="page-header">
                <div style={{ minWidth: 0 }}>
                    <Link href="/campaigns" className="back-link">&larr; Campaigns</Link>
                    <h1 className="heading" style={{ marginBottom: 'var(--space-1)' }}>{campaign.name}</h1>
                    <p className="campaign-subtitle">
                        <span className={`role-badge role-${campaign.role}`}>{isDm ? 'You are the DM' : 'Player'}</span>
                        {!isDm && campaign.dm && <span>DM: {campaign.dm.name}</span>}
                        <span>{campaign.members.length === 1 ? '1 player' : `${campaign.members.length} players`}</span>
                    </p>
                    {campaign.description && <p className="campaign-description">{campaign.description}</p>}
                </div>
                <div className="page-header-actions">
                    {isDm && active && (
                        <Link href={`/campaigns/${campaign.id}/encounters/${active.id}`} className={buttonClass()}>
                            Back to {active.name}
                        </Link>
                    )}
                    <Menu
                        label="⋯"
                        ariaLabel="Campaign actions"
                        items={isDm
                            ? [
                                { label: 'Edit details…', onSelect: () => setDialog('edit') },
                                { label: 'Delete campaign…', onSelect: () => setDialog('delete'), danger: true, separatorBefore: true },
                            ]
                            : [
                                { label: 'Change my character…', onSelect: () => setDialog('bring') },
                                { label: 'Leave campaign…', onSelect: () => setDialog('leave'), danger: true, separatorBefore: true },
                            ]}
                    />
                </div>
            </div>

            {isPlayerEncounterView(active) && <PlayerEncounterCard encounter={active} />}

            <Tabs tabs={tabs} active={activeTab} onChange={selectTab} label="Campaign sections" idPrefix="campaign" />

            <div {...tabPanelProps('campaign', activeTab)} className="campaign-panel">
                {activeTab === 'party' && (
                    <div className={isDm && campaign.joinCode ? 'campaign-party-layout' : undefined}>
                        <PartyPanel
                            campaign={campaign}
                            currentUserId={userId}
                            onBringCharacter={() => setDialog('bring')}
                            onRemoveMember={setRemoving}
                        />
                        {isDm && campaign.joinCode && (
                            <InviteCard
                                campaignId={campaign.id}
                                joinCode={campaign.joinCode}
                                onCodeChange={(joinCode) => setCampaign((c) => (c ? { ...c, joinCode } : c))}
                            />
                        )}
                    </div>
                )}
                {activeTab === 'sessions' && <SessionsPanel campaignId={campaign.id} isDm={isDm} />}
                {activeTab === 'encounters' && isDm && <EncountersPanel campaignId={campaign.id} party={campaign.party} />}
                {activeTab === 'bestiary' && isDm && <BestiaryPanel />}
                {activeTab === 'notes' && isDm && (
                    <NotesPanel
                        campaignId={campaign.id}
                        initialNotes={campaign.notes ?? ''}
                        onSaved={(notes) => setCampaign((c) => (c ? { ...c, notes } : c))}
                    />
                )}
            </div>

            {dialog === 'edit' && (
                <EditCampaignDialog
                    campaignId={campaign.id}
                    name={campaign.name}
                    description={campaign.description}
                    onClose={() => setDialog(null)}
                    onSaved={(update) => {
                        setCampaign((c) => (c ? { ...c, ...update } : c));
                        setDialog(null);
                    }}
                />
            )}
            {dialog === 'delete' && (
                <ConfirmDialog title={`Delete "${campaign.name}"?`} confirmLabel="Delete campaign" danger busy={busy} onConfirm={deleteCampaign} onCancel={() => setDialog(null)}>
                    Sessions, encounters and your notes are deleted for good. Players keep their characters; they just won&apos;t be in a campaign.
                </ConfirmDialog>
            )}
            {dialog === 'leave' && userId && (
                <ConfirmDialog title={`Leave "${campaign.name}"?`} confirmLabel="Leave" danger busy={busy} onConfirm={() => removeMember({ userId, name: '' }, true)} onCancel={() => setDialog(null)}>
                    Your characters leave with you. You can rejoin later with the join code.
                </ConfirmDialog>
            )}
            {dialog === 'bring' && (
                <BringCharacterDialog
                    campaignId={campaign.id}
                    campaignName={campaign.name}
                    onClose={() => setDialog(null)}
                    onSaved={() => {
                        setDialog(null);
                        toast.success('Your character is updated.');
                        refresh();
                    }}
                />
            )}
            {removing && (
                <ConfirmDialog title={`Remove ${removing.name}?`} confirmLabel="Remove" danger busy={busy} onConfirm={() => removeMember(removing, false)} onCancel={() => setRemoving(null)}>
                    Their characters leave the campaign with them. They can rejoin with the join code unless you make a new one.
                </ConfirmDialog>
            )}
        </div>
    );
}
