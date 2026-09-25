/** Campaign API shapes (backend/src/routes/campaigns.ts) and the party numbers the DM sees. */
import type { HP } from './types';

export type CampaignRole = 'dm' | 'player';

export interface CampaignSummary {
    id: string;
    name: string;
    description: string | null;
    role: CampaignRole;
    dmName: string;
    memberCount: number;
    characterCount: number;
    myCharacters: { id: string; name: string }[];
    activeEncounter: { id: string; name: string } | null;
    updatedAt: string;
}

/**
 * Stats the owner's sheet works out (AC from armor and features, passives from
 * skills, ...) and saves on the character so the DM's party view can show
 * them without re-running the sheet's rules. See `buildDerivedStats`.
 */
export interface DerivedStats {
    ac: number;
    speed: number;
    initiative: number;
    passivePerception: number;
    passiveInsight: number;
    passiveInvestigation: number;
    spellSaveDc?: number;
}

export interface PartyMemberBasic {
    id: string;
    userId: string;
    name: string;
    race: string;
    class: string;
    level: number;
    portrait?: string;
    isMine?: boolean;
}

export interface PartyMemberDm extends PartyMemberBasic {
    updatedAt?: string;
    hp: HP;
    conditions: string[];
    exhaustion: number;
    derivedStats?: DerivedStats;
    abilityScores?: Record<string, number>;
    acOverride?: number;
    speedOverride?: number;
    languages: string[];
}

export type MonsterHealth = 'healthy' | 'hurt' | 'bloodied' | 'down';

export interface PlayerEncounterView {
    id: string;
    name: string;
    round: number;
    combatants: {
        id: string;
        name: string;
        kind: 'pc' | 'monster' | 'npc';
        characterId?: string;
        initiative: number | null;
        isCurrent: boolean;
        health?: MonsterHealth;
    }[];
}

export interface CampaignDetail {
    id: string;
    name: string;
    description: string | null;
    role: CampaignRole;
    dm: { id: string; name: string } | null;
    joinCode?: string;
    notes?: string;
    members: { userId: string; name: string; joinedAt: string }[];
    party: (PartyMemberBasic | PartyMemberDm)[];
    /** The DM gets only the id and name (they run it from the tracker). */
    activeEncounter: PlayerEncounterView | { id: string; name: string } | null;
    createdAt: string;
    updatedAt: string;
}

export interface CampaignSessionEntry {
    id: string;
    campaignId: string;
    title: string;
    playedOn: string | null;
    recap: string;
    dmNotes?: string;
    createdAt: string;
    updatedAt: string;
}

export function isDmPartyMember(member: PartyMemberBasic | PartyMemberDm): member is PartyMemberDm {
    return 'hp' in member && !!member.hp;
}

export function isPlayerEncounterView(view: CampaignDetail['activeEncounter']): view is PlayerEncounterView {
    return !!view && 'combatants' in view;
}

const mod = (score: unknown) => Math.floor(((typeof score === 'number' ? score : 10) - 10) / 2);

export interface PartyStats extends DerivedStats {
    /** True when the sheet hasn't saved its numbers yet and these are rough (10 + Dex, 10 + Wis, ...). */
    estimated: boolean;
}

/** The DM's numbers for a party member: what the sheet saved, else a rough estimate from ability scores. */
export function partyStats(member: PartyMemberDm): PartyStats {
    const d = member.derivedStats;
    if (d && typeof d.ac === 'number') {
        return { ...d, ac: member.acOverride ?? d.ac, estimated: false };
    }
    const scores = member.abilityScores || {};
    const dex = mod(scores.dex);
    const wis = mod(scores.wis);
    return {
        ac: member.acOverride ?? 10 + dex,
        speed: member.speedOverride ?? 30,
        initiative: dex,
        passivePerception: 10 + wis,
        passiveInsight: 10 + wis,
        passiveInvestigation: 10 + mod(scores.int),
        estimated: true,
    };
}

/** What the sheet saves as `data.derivedStats`. */
export function buildDerivedStats(input: {
    ac: number;
    speed: number;
    initiative: number;
    passives: { perception: number; insight: number; investigation: number };
    spellSaveDc?: number | null;
}): DerivedStats {
    const stats: DerivedStats = {
        ac: input.ac,
        speed: input.speed,
        initiative: input.initiative,
        passivePerception: input.passives.perception,
        passiveInsight: input.passives.insight,
        passiveInvestigation: input.passives.investigation,
    };
    if (typeof input.spellSaveDc === 'number') stats.spellSaveDc = input.spellSaveDc;
    return stats;
}

/** Only save when something changed, so opening a sheet doesn't write every time. */
export function derivedStatsChanged(saved: unknown, next: DerivedStats): boolean {
    if (!saved || typeof saved !== 'object') return true;
    const s = saved as Record<string, unknown>;
    const keys = new Set([...Object.keys(s), ...Object.keys(next)]);
    for (const key of keys) {
        if (s[key] !== (next as unknown as Record<string, unknown>)[key]) return true;
    }
    return false;
}

/** Join codes are shown in two halves ("ABC-234") so they're easier to read aloud. */
export function formatJoinCode(code: string): string {
    return code.length === 6 ? `${code.slice(0, 3)}-${code.slice(3)}` : code;
}

/** "2026-09-25" for <input type="date"> from a stored ISO date. */
export function toDateInput(iso: string | null | undefined): string {
    return iso ? iso.slice(0, 10) : '';
}

/** "Sep 25, 2026" for a stored date-only value (kept in UTC so it doesn't shift a day). */
export function formatSessionDate(iso: string | null | undefined): string {
    if (!iso) return '';
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
}
