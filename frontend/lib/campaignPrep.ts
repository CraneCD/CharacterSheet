/**
 * Campaign prep files: a campaign's DM notes, planned sessions, encounters,
 * custom monsters and loot as JSON, for reuse or sharing (backend/src/lib/campaignPrep.ts
 * is the source of truth and validates on import). This reads a file in the
 * browser to preview it and catch obvious mistakes before uploading.
 */

export const PREP_FORMAT = 'dnd55e-campaign-prep';
export const PREP_VERSION = 1;

export interface PrepSummary {
    name: string;
    description: string;
    hasNotes: boolean;
    sessions: number;
    encounters: number;
    monsters: number;
    items: number;
}

export type PrepParseResult =
    | { ok: true; prep: Record<string, unknown>; summary: PrepSummary }
    | { ok: false; error: string };

const count = (value: unknown) => (Array.isArray(value) ? value.length : 0);

/** Read a prep file's text. Checks it is one, and summarizes what it will add. */
export function parsePrepFile(text: string): PrepParseResult {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        return { ok: false, error: "This file isn't valid JSON." };
    }
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        return { ok: false, error: "This isn't a campaign prep file." };
    }
    const prep = data as Record<string, unknown>;
    if (prep.format !== PREP_FORMAT) {
        // A character export is the likeliest mix-up
        const looksLikeCharacter = 'race' in prep && 'class' in prep;
        return {
            ok: false,
            error: looksLikeCharacter
                ? 'This is a character file. Import it from My Characters instead.'
                : "This isn't a campaign prep file. Export one from a campaign's menu (⋯ → Export prep).",
        };
    }
    if (typeof prep.version !== 'number' || prep.version > PREP_VERSION) {
        return { ok: false, error: 'This prep file is from a newer version of the app.' };
    }
    const campaign = (prep.campaign && typeof prep.campaign === 'object' ? prep.campaign : {}) as { name?: unknown; description?: unknown };
    const name = typeof campaign.name === 'string' ? campaign.name.trim() : '';
    if (!name) return { ok: false, error: 'The prep file needs a campaign name.' };

    return {
        ok: true,
        prep,
        summary: {
            name,
            description: typeof campaign.description === 'string' ? campaign.description : '',
            hasNotes: typeof prep.notes === 'string' && prep.notes.trim() !== '',
            sessions: count(prep.sessions),
            encounters: count(prep.encounters),
            monsters: count(prep.monsters),
            items: count(prep.items),
        },
    };
}

/** "3 encounters, 2 custom monsters and 5 items" — what a file contains, for previews and toasts. */
export function describePrepCounts(c: Pick<PrepSummary, 'sessions' | 'encounters' | 'monsters' | 'items'>): string {
    const parts = [
        [c.sessions, 'session', 'sessions'],
        [c.encounters, 'encounter', 'encounters'],
        [c.monsters, 'custom monster', 'custom monsters'],
        [c.items, 'item', 'items'],
    ]
        .filter(([n]) => (n as number) > 0)
        .map(([n, one, many]) => `${n} ${n === 1 ? one : many}`);
    if (parts.length === 0) return 'no sessions, encounters or items';
    return parts.length === 1 ? parts[0] : `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`;
}

/** "shattered_obelisk.prep.json" */
export function prepFileName(name: string): string {
    const base = name.trim().replace(/\s+/g, '_').replace(/[^\w.-]/g, '').toLowerCase();
    return `${base || 'campaign'}.prep.json`;
}

export function downloadPrep(prep: { campaign?: { name?: string } }): void {
    const blob = new Blob([JSON.stringify(prep, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = prepFileName(prep.campaign?.name ?? 'campaign');
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

/** Loot rarities offered in the item form (free text is allowed too). */
export const RARITIES = ['mundane', 'common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'];
