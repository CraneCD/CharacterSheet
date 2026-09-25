import { randomUUID } from 'crypto';
import { z } from 'zod';
import { prisma } from './prisma';
import { monsterSchema } from './monsterSchema';
import { withUniqueJoinCode } from './campaignAccess';
import { itemFields } from './itemSchema';
import { normalizeCoins } from './lootDelivery';

// A campaign's prep as a file: DM notes, planned sessions, encounters (with
// the custom monsters they use) and loot. DMs export a campaign to reuse or
// share their prep, and import a file to start a campaign from it or add to
// one. Nothing tied to a particular group travels: no players, characters,
// join code, initiative rolls or who holds which item.

export const PREP_FORMAT = 'dnd55e-campaign-prep';
export const PREP_VERSION = 1;

const ref = z.string().trim().min(1).max(100);

const prepSessionSchema = z.object({
    title: z.string().trim().min(1).max(150),
    recap: z.string().max(20000).optional(),
    dmNotes: z.string().max(20000).optional(),
    /** Imported sessions stay hidden from players unless this says otherwise */
    shared: z.boolean().optional(),
});

const prepCombatantSchema = z.object({
    kind: z.enum(['monster', 'npc']),
    name: z.string().trim().min(1).max(100),
    /** An SRD monster key (reference data) */
    monsterId: z.string().max(100).optional(),
    /** A monster from this file's `monsters`, by its `ref` */
    monsterRef: ref.optional(),
    initiativeBonus: z.number().int().min(-20).max(30).default(0),
    ac: z.number().int().min(0).max(50).optional(),
    maxHp: z.number().int().min(1).max(9999).optional(),
    xp: z.number().int().min(0).max(200000).optional(),
    hidden: z.boolean().optional(),
    notes: z.string().max(1000).optional(),
});

const prepEncounterSchema = z.object({
    name: z.string().trim().min(1).max(100),
    combatants: z.array(prepCombatantSchema).max(80),
});

const prepItemSchema = z.object(itemFields);

export const prepSchema = z.object({
    format: z.literal(PREP_FORMAT, { errorMap: () => ({ message: "This isn't a campaign prep file" }) }),
    version: z.number().int().min(1).max(PREP_VERSION, { message: 'This prep file is from a newer version of the app' }),
    campaign: z.object({
        name: z.string().trim().min(1, 'The prep file needs a campaign name').max(100),
        description: z.string().max(2000).nullable().optional(),
    }),
    notes: z.string().max(50000).optional(),
    sessions: z.array(prepSessionSchema).max(200).default([]),
    monsters: z.array(monsterSchema.and(z.object({ ref }))).max(200).default([]),
    encounters: z.array(prepEncounterSchema).max(200).default([]),
    items: z.array(prepItemSchema).max(500).default([]),
}).superRefine((prep, ctx) => {
    const refs = new Set<string>();
    prep.monsters.forEach((m, i) => {
        if (refs.has(m.ref)) ctx.addIssue({ code: 'custom', path: ['monsters', i, 'ref'], message: `Two monsters share the ref "${m.ref}"` });
        refs.add(m.ref);
    });
    prep.encounters.forEach((e, i) => e.combatants.forEach((c, j) => {
        if (c.monsterRef && !refs.has(c.monsterRef)) {
            ctx.addIssue({ code: 'custom', path: ['encounters', i, 'combatants', j, 'monsterRef'], message: `"${e.name}" uses a monster that isn't in the file (${c.monsterRef})` });
        }
    }));
});

export type CampaignPrep = z.infer<typeof prepSchema>;

export interface PrepCounts {
    sessions: number;
    encounters: number;
    monsters: number;
    items: number;
}

/** The campaign's prep, ready to download. DM only (the caller checks). */
export async function exportPrep(campaignId: string) {
    const [campaign, sessions, encounters, items] = await Promise.all([
        prisma.campaign.findUniqueOrThrow({ where: { id: campaignId } }),
        prisma.campaignSession.findMany({ where: { campaignId }, orderBy: [{ playedOn: { sort: 'asc', nulls: 'last' } }, { createdAt: 'asc' }] }),
        prisma.encounter.findMany({ where: { campaignId }, orderBy: { createdAt: 'asc' } }),
        prisma.campaignItem.findMany({ where: { campaignId }, orderBy: { createdAt: 'asc' } }),
    ]);

    type StoredCombatant = { kind?: string; name?: string; monsterId?: string; monsterSource?: string; initiativeBonus?: number; ac?: number; hp?: { max?: number }; xp?: number; hidden?: boolean; notes?: string };
    const combatantsOf = (data: unknown): StoredCombatant[] => {
        const list = (data as { combatants?: unknown })?.combatants;
        return Array.isArray(list) ? list.filter((c): c is StoredCombatant => !!c && typeof c === 'object') : [];
    };

    // Custom monsters the encounters use travel with the file
    const customIds = new Set<string>();
    for (const e of encounters) for (const c of combatantsOf(e.data)) {
        if (c.monsterSource === 'custom' && typeof c.monsterId === 'string') customIds.add(c.monsterId);
    }
    const monsters = customIds.size > 0 ? await prisma.monster.findMany({ where: { id: { in: [...customIds] } } }) : [];
    const exported = new Set(monsters.map((m) => m.id));

    return {
        format: PREP_FORMAT,
        version: PREP_VERSION,
        exportedAt: new Date().toISOString(),
        campaign: { name: campaign.name, description: campaign.description },
        notes: campaign.notes ?? '',
        sessions: sessions.map((s) => ({ title: s.title, recap: s.recap, dmNotes: s.dmNotes, shared: false })),
        monsters: monsters.map((m) => ({ ...(m.data as object), name: m.name, ref: m.id })),
        encounters: encounters.map((e) => ({
            name: e.name,
            combatants: combatantsOf(e.data)
                .filter((c) => c.kind === 'monster' || c.kind === 'npc')
                .map((c) => {
                    const custom = c.monsterSource === 'custom' && typeof c.monsterId === 'string';
                    return {
                        kind: c.kind as 'monster' | 'npc',
                        name: String(c.name ?? 'Combatant'),
                        ...(custom && exported.has(c.monsterId!) ? { monsterRef: c.monsterId } : {}),
                        ...(!custom && c.monsterId ? { monsterId: c.monsterId } : {}),
                        initiativeBonus: typeof c.initiativeBonus === 'number' ? c.initiativeBonus : 0,
                        ...(typeof c.ac === 'number' ? { ac: c.ac } : {}),
                        ...(typeof c.hp?.max === 'number' && c.hp.max > 0 ? { maxHp: c.hp.max } : {}),
                        ...(typeof c.xp === 'number' ? { xp: c.xp } : {}),
                        ...(c.hidden ? { hidden: true } : {}),
                        ...(c.notes ? { notes: c.notes } : {}),
                    };
                }),
        })),
        items: items.map((i) => ({
            name: i.name,
            description: i.description,
            rarity: i.rarity,
            quantity: i.quantity,
            value: i.value,
            dmNotes: i.dmNotes,
            ...(normalizeCoins(i.coins) ? { coins: normalizeCoins(i.coins)! } : {}),
            revealed: false,
        })),
    };
}

/**
 * Rows to create for a prep file, with fresh ids and custom monsters owned by `dmId`.
 * Rows are stamped a millisecond apart in file order: inserted together they'd
 * otherwise share one timestamp, and lists sorted by it would come out shuffled.
 */
export function planImport(prep: CampaignPrep, campaignId: string, dmId: string, now = new Date()) {
    const stamp = (i: number) => {
        const at = new Date(now.getTime() + i);
        return { createdAt: at, updatedAt: at };
    };

    const monsterIds = new Map<string, string>();
    const monsters = prep.monsters.map(({ ref: monsterRef, ...m }, i) => {
        const id = randomUUID();
        monsterIds.set(monsterRef, id);
        const { id: _id, source: _source, ...data } = m as Record<string, unknown>;
        return { id, ownerId: dmId, name: m.name, data: data as object, ...stamp(i) };
    });

    const encounters = prep.encounters.map((e, i) => ({
        campaignId,
        ...stamp(i),
        name: e.name,
        status: 'planned',
        data: {
            round: 0,
            turn: 0,
            combatants: e.combatants.map((c) => {
                const custom = c.monsterRef ? monsterIds.get(c.monsterRef) : undefined;
                return {
                    id: `c${randomUUID().replace(/-/g, '').slice(0, 12)}`,
                    kind: c.kind,
                    name: c.name,
                    ...(custom ? { monsterId: custom, monsterSource: 'custom' } : c.monsterId ? { monsterId: c.monsterId, monsterSource: 'srd' } : {}),
                    initiative: null,
                    initiativeBonus: c.initiativeBonus,
                    ...(c.ac !== undefined ? { ac: c.ac } : {}),
                    ...(c.maxHp !== undefined ? { hp: { current: c.maxHp, max: c.maxHp, temp: 0 } } : {}),
                    conditions: [],
                    ...(c.xp !== undefined ? { xp: c.xp } : {}),
                    ...(c.hidden ? { hidden: true } : {}),
                    ...(c.notes ? { notes: c.notes } : {}),
                };
            }),
        },
    }));

    const sessions = prep.sessions.map((s, i) => ({
        campaignId,
        ...stamp(i),
        title: s.title,
        recap: s.recap ?? '',
        dmNotes: s.dmNotes ?? '',
        shared: s.shared ?? false,
    }));

    const items = prep.items.map(({ coins, ...item }, i) => {
        const pile = normalizeCoins(coins);
        return { ...item, ...(pile ? { coins: pile } : {}), campaignId, name: item.name, revealed: item.revealed ?? false, ...stamp(i) };
    });

    return { monsters, encounters, sessions, items };
}

type Tx = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];

async function writeImport(tx: Tx, plan: ReturnType<typeof planImport>): Promise<PrepCounts> {
    if (plan.monsters.length) await tx.monster.createMany({ data: plan.monsters });
    if (plan.encounters.length) await tx.encounter.createMany({ data: plan.encounters });
    if (plan.sessions.length) await tx.campaignSession.createMany({ data: plan.sessions });
    if (plan.items.length) await tx.campaignItem.createMany({ data: plan.items });
    return { sessions: plan.sessions.length, encounters: plan.encounters.length, monsters: plan.monsters.length, items: plan.items.length };
}

const TX_OPTIONS = { timeout: 20_000 };

/** A new campaign (you're its DM) with everything in the prep file, all or nothing. */
export async function importAsNewCampaign(prep: CampaignPrep, dmId: string) {
    return withUniqueJoinCode((joinCode) => prisma.$transaction(async (tx) => {
        const campaign = await tx.campaign.create({
            data: { dmId, joinCode, name: prep.campaign.name, description: prep.campaign.description || null, notes: prep.notes || null },
        });
        const counts = await writeImport(tx, planImport(prep, campaign.id, dmId));
        return { campaign: { id: campaign.id, name: campaign.name }, counts };
    }, TX_OPTIONS));
}

/** Add a prep file's content to an existing campaign; its notes go after the current ones. */
export async function importIntoCampaign(prep: CampaignPrep, campaign: { id: string; notes: string | null }, dmId: string) {
    return prisma.$transaction(async (tx) => {
        if (prep.notes?.trim()) {
            const notes = campaign.notes?.trim() ? `${campaign.notes.replace(/\s+$/, '')}\n\n---\n\n${prep.notes}` : prep.notes;
            await tx.campaign.update({ where: { id: campaign.id }, data: { notes } });
        }
        return { counts: await writeImport(tx, planImport(prep, campaign.id, dmId)) };
    }, TX_OPTIONS);
}
