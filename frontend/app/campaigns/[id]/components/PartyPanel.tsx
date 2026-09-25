'use client';

import Link from 'next/link';
import { CampaignDetail, isDmPartyMember, PartyMemberBasic, PartyMemberDm, partyStats } from '@/lib/campaigns';
import { classColorStyle } from '@/lib/classColors';
import { displayName } from '@/lib/characterTransfer';
import { getHpStatus } from '@/lib/hp';
import { formatModifier } from '@/lib/monsters';
import { Button, CharacterToken, SectionHeader } from '@/app/components/ui';

interface PartyPanelProps {
    campaign: CampaignDetail;
    currentUserId: string | null;
    onBringCharacter: () => void;
    onRemoveMember: (member: { userId: string; name: string }) => void;
}

const HP_STATUS_LABEL: Record<string, string> = { bloodied: 'Bloodied', critical: 'Critical', down: 'Down', dead: 'Dead' };

/** What the DM sees for each character: HP, AC, passives and conditions at a glance. */
function DmPartyCard({ member }: { member: PartyMemberDm }) {
    const stats = partyStats(member);
    const status = getHpStatus(member.hp);
    const percent = member.hp.max > 0 ? Math.round((Math.max(0, member.hp.current) / member.hp.max) * 100) : 0;
    const conditions = [...member.conditions, ...(member.exhaustion > 0 ? [`Exhaustion ${member.exhaustion}`] : [])];
    return (
        <article className={`card party-card hp-${status}`} style={classColorStyle(member.class)}>
            <Link href={`/character/${member.id}`} className="party-card-head" aria-label={`Open ${member.name}'s sheet (read-only)`}>
                <CharacterToken name={member.name} portrait={member.portrait} classId={member.class} level={member.level} size="sm" />
                <span>
                    <span className="party-card-name">{member.name}</span>
                    <span className="party-card-meta">Level {member.level} {displayName(member.race)} {displayName(member.class)}</span>
                </span>
            </Link>
            <div className="party-card-hp">
                <div
                    className="hp-bar"
                    role="progressbar"
                    aria-label={`${member.name}'s hit points`}
                    aria-valuemin={0}
                    aria-valuemax={member.hp.max}
                    aria-valuenow={Math.max(0, member.hp.current)}
                >
                    <div className="hp-bar-fill" style={{ width: `${percent}%` }} />
                </div>
                <span>
                    {member.hp.current}/{member.hp.max} HP{member.hp.temp > 0 ? ` (+${member.hp.temp})` : ''}
                    {HP_STATUS_LABEL[status] && <strong className={`hp-status hp-status-${status}`}>{HP_STATUS_LABEL[status]}</strong>}
                </span>
            </div>
            <dl className="party-stats">
                <div><dt>AC</dt><dd>{stats.ac}</dd></div>
                <div><dt>Init</dt><dd>{formatModifier(stats.initiative)}</dd></div>
                <div><dt title="Passive Perception">Perc</dt><dd>{stats.passivePerception}</dd></div>
                <div><dt title="Passive Insight">Ins</dt><dd>{stats.passiveInsight}</dd></div>
                <div><dt title="Passive Investigation">Inv</dt><dd>{stats.passiveInvestigation}</dd></div>
                {stats.spellSaveDc !== undefined && <div><dt title="Spell save DC">DC</dt><dd>{stats.spellSaveDc}</dd></div>}
            </dl>
            {stats.estimated && <p className="party-card-note">Estimated. Updates when {member.name}&apos;s player next opens the sheet.</p>}
            {conditions.length > 0 && (
                <div className="hp-conditions" role="group" aria-label={`${member.name}'s conditions`}>
                    {conditions.map((c) => <span key={c} className="condition-badge">{c}</span>)}
                </div>
            )}
        </article>
    );
}

/** What players see: who's in the party. Only your own character links to its sheet. */
function PlayerPartyCard({ member }: { member: PartyMemberBasic }) {
    const body = (
        <>
            <CharacterToken name={member.name} portrait={member.portrait} classId={member.class} level={member.level} size="sm" />
            <span>
                <span className="party-card-name">{member.name}{member.isMine && <span className="you-badge">You</span>}</span>
                <span className="party-card-meta">Level {member.level} {displayName(member.race)} {displayName(member.class)}</span>
            </span>
        </>
    );
    return (
        <article className="card party-card" style={classColorStyle(member.class)}>
            {member.isMine
                ? <Link href={`/character/${member.id}`} className="party-card-head">{body}</Link>
                : <div className="party-card-head">{body}</div>}
        </article>
    );
}

export default function PartyPanel({ campaign, currentUserId, onBringCharacter, onRemoveMember }: PartyPanelProps) {
    const isDm = campaign.role === 'dm';
    const hasOwnCharacter = campaign.party.some((m) => m.userId === currentUserId);
    const charactersByUser = new Map<string, string[]>();
    for (const m of campaign.party) charactersByUser.set(m.userId, [...(charactersByUser.get(m.userId) ?? []), m.name]);

    return (
        <div className="stack">
            <section className="card" aria-labelledby="party-title">
                <SectionHeader
                    title="Party"
                    id="party-title"
                    as="h2"
                    actions={!isDm ? (
                        <Button size="sm" variant={hasOwnCharacter ? 'secondary' : 'primary'} onClick={onBringCharacter}>
                            {hasOwnCharacter ? 'Change character' : 'Bring a character'}
                        </Button>
                    ) : undefined}
                />
                {campaign.party.length === 0 ? (
                    <p className="empty-note">
                        {isDm ? 'No characters yet. Players add theirs when they join, or from their sheet.' : 'No characters yet. Bring yours along!'}
                    </p>
                ) : (
                    <div className="party-grid">
                        {campaign.party.map((m) => (isDmPartyMember(m) ? <DmPartyCard key={m.id} member={m} /> : <PlayerPartyCard key={m.id} member={m} />))}
                    </div>
                )}
                {isDm && campaign.party.length > 0 && <p className="field-hint">Refreshes on its own while this page is open. Open a character for their full sheet (read-only).</p>}
            </section>

            <section className="card" aria-labelledby="members-title">
                <SectionHeader title="Players" id="members-title" as="h2" />
                <ul className="member-list">
                    {campaign.dm && (
                        <li className="member-row">
                            <span><strong>{campaign.dm.name}</strong> <span className="role-badge role-dm">DM</span></span>
                        </li>
                    )}
                    {campaign.members.map((m) => (
                        <li key={m.userId} className="member-row">
                            <span>
                                <strong>{m.name}</strong>{m.userId === currentUserId && <span className="you-badge">You</span>}
                                <span className="member-characters">{(charactersByUser.get(m.userId) ?? []).join(', ') || 'No character yet'}</span>
                            </span>
                            {isDm && (
                                <Button variant="ghost" size="sm" onClick={() => onRemoveMember(m)} aria-label={`Remove ${m.name} from the campaign`}>Remove</Button>
                            )}
                        </li>
                    ))}
                    {campaign.members.length === 0 && <li className="empty-note">No players yet. Share the join code to invite them.</li>}
                </ul>
            </section>
        </div>
    );
}
