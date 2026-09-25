'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { CampaignSummary } from '@/lib/campaigns';
import { Button, D20Icon, describeError, Skeleton, useToast } from '@/app/components/ui';
import CreateCampaignDialog from './components/CreateCampaignDialog';
import JoinCampaignDialog from './components/JoinCampaignDialog';

function CampaignCard({ campaign }: { campaign: CampaignSummary }) {
    const players = campaign.memberCount === 1 ? '1 player' : `${campaign.memberCount} players`;
    return (
        <Link href={`/campaigns/${campaign.id}`} className="card campaign-card">
            <div className="campaign-card-top">
                <span className={`role-badge role-${campaign.role}`}>{campaign.role === 'dm' ? 'Dungeon Master' : 'Player'}</span>
                {campaign.activeEncounter && <span className="live-badge">In combat</span>}
            </div>
            <h2 className="campaign-card-name">{campaign.name}</h2>
            {campaign.description && <p className="campaign-card-description">{campaign.description}</p>}
            <p className="campaign-card-meta">
                {campaign.role === 'dm' ? players : `DM: ${campaign.dmName}`}
                {campaign.role === 'player' && campaign.myCharacters.length > 0 && (
                    <> · Playing {campaign.myCharacters.map((c) => c.name).join(', ')}</>
                )}
                {campaign.role === 'player' && campaign.myCharacters.length === 0 && <> · No character yet</>}
            </p>
        </Link>
    );
}

export default function CampaignsPage() {
    const [campaigns, setCampaigns] = useState<CampaignSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState('');
    const [dialog, setDialog] = useState<'create' | 'join' | null>(null);
    const router = useRouter();
    const toast = useToast();

    const load = () => {
        setLoading(true);
        setLoadError('');
        api.get('/campaigns')
            .then(setCampaigns)
            .catch((err) => setLoadError(describeError("Couldn't load your campaigns", err)))
            .finally(() => setLoading(false));
    };
    useEffect(load, []);

    const running = campaigns.filter((c) => c.role === 'dm');
    const playing = campaigns.filter((c) => c.role === 'player');

    return (
        <div>
            <div className="page-header">
                <h1 className="heading" style={{ marginBottom: 0 }}>Campaigns</h1>
                <div className="page-header-actions">
                    <Button variant="secondary" onClick={() => setDialog('join')}>Join with a code</Button>
                    <Button onClick={() => setDialog('create')}>New campaign</Button>
                </div>
            </div>

            {loadError && !loading && (
                <div className="form-error" role="alert" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                    <span>{loadError}</span>
                    <Button variant="secondary" size="sm" onClick={load}>Try again</Button>
                </div>
            )}

            {loading ? (
                <div className="campaign-grid" aria-busy="true" aria-label="Loading campaigns">
                    {[0, 1].map((i) => (
                        <div key={i} className="card" style={{ display: 'grid', gap: 'var(--space-2)' }}>
                            <Skeleton width="30%" />
                            <Skeleton width="60%" height="1.5rem" />
                            <Skeleton width="80%" />
                        </div>
                    ))}
                </div>
            ) : loadError ? null : campaigns.length === 0 ? (
                <div className="dashboard-empty">
                    <D20Icon className="dashboard-empty-die" strokeWidth={3} />
                    <h2 className="dashboard-empty-title">Gather your party</h2>
                    <p className="dashboard-empty-text">Start a campaign as its Dungeon Master, or join one with the code your DM gave you.</p>
                    <div style={{ display: 'flex', gap: 'var(--space-2)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button onClick={() => setDialog('create')}>Start a campaign</Button>
                        <Button variant="secondary" onClick={() => setDialog('join')}>Join with a code</Button>
                    </div>
                </div>
            ) : (
                <>
                    {running.length > 0 && (
                        <section aria-labelledby="campaigns-running">
                            <h2 className="section-title campaign-section-title" id="campaigns-running">Campaigns you run</h2>
                            <div className="campaign-grid">
                                {running.map((c) => <CampaignCard key={c.id} campaign={c} />)}
                            </div>
                        </section>
                    )}
                    {playing.length > 0 && (
                        <section aria-labelledby="campaigns-playing">
                            <h2 className="section-title campaign-section-title" id="campaigns-playing">Campaigns you play in</h2>
                            <div className="campaign-grid">
                                {playing.map((c) => <CampaignCard key={c.id} campaign={c} />)}
                            </div>
                        </section>
                    )}
                </>
            )}

            {dialog === 'create' && (
                <CreateCampaignDialog
                    onClose={() => setDialog(null)}
                    onCreated={(campaign) => {
                        toast.success(`Created "${campaign.name}". Share the join code with your players.`);
                        router.push(`/campaigns/${campaign.id}`);
                    }}
                />
            )}
            {dialog === 'join' && (
                <JoinCampaignDialog
                    onClose={() => setDialog(null)}
                    onJoined={(campaign) => {
                        toast.success(`Joined "${campaign.name}".`);
                        router.push(`/campaigns/${campaign.id}`);
                    }}
                />
            )}
        </div>
    );
}
