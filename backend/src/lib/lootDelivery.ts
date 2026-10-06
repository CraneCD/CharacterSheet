import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from './prisma';
import { coinsSchema } from './itemSchema';
import { getReferenceRows } from './referenceCache';
import { lootValue } from './lootValues';

// Giving campaign loot to characters: a player claims (or takes a share of)
// something the party found, or the DM hands it out or splits it. What's
// given lands on the character's sheet (equipment, or currency for coins) in
// the same transaction that updates the loot list, so the two can't disagree.
// Loot linked to the item list (CampaignItem.item) arrives with its stats, so
// a magic sword attacks and magic armor counts toward AC; unlinked loot whose
// name is in the item list is matched when it's handed out.

export const DENOMINATIONS = ['pp', 'gp', 'ep', 'sp', 'cp'] as const;
export type Denomination = typeof DENOMINATIONS[number];
export type Coins = Partial<Record<Denomination, number>>;

export const distributeSchema = z.object({
    shares: z.array(z.object({
        characterId: z.string().min(1).max(64),
        /** How many of the item (items only; defaults to 1) */
        quantity: z.number().int().min(1).max(9999).optional(),
        /** Which coins (currency only) */
        coins: coinsSchema.optional(),
    })).min(1).max(20),
});

export type Share = z.infer<typeof distributeSchema>['shares'][number];

/** Keep positive whole amounts only; null when nothing is left. */
export function normalizeCoins(value: unknown): Coins | null {
    if (!value || typeof value !== 'object') return null;
    const out: Coins = {};
    for (const d of DENOMINATIONS) {
        const n = Math.floor(Number((value as Record<string, unknown>)[d]) || 0);
        if (n > 0) out[d] = n;
    }
    return Object.keys(out).length ? out : null;
}

/** A sheet's currency plus (or minus) some coins; never below zero. */
export function addCoins(currency: unknown, change: Coins): Record<Denomination, number> {
    const base = (currency && typeof currency === 'object' ? currency : {}) as Record<string, unknown>;
    const out = {} as Record<Denomination, number>;
    for (const d of DENOMINATIONS) {
        out[d] = Math.max(0, Math.floor(Number(base[d]) || 0) + Math.floor(Number(change[d]) || 0));
    }
    return out;
}

export interface LootItem {
    id: string;
    name: string;
    description: string;
    rarity: string;
    quantity: number;
    value: string;
    heldBy: string | null;
    coins: unknown;
    /** The linked sheet item (catalogue entry), if any */
    item?: unknown;
}

export type DistributionPlan =
    | { error: string }
    | {
        currency: boolean;
        shares: { characterId: string; quantity: number; coins: Coins | null }[];
        /** What stays in the party's pool; null when everything was given */
        remaining: { quantity: number; coins: Coins | null } | null;
    };

/** Check the shares against what's in the pile, and work out what's left. */
export function planDistribution(item: LootItem, shares: Share[]): DistributionPlan {
    if (item.heldBy) return { error: 'Someone already has this' };
    const ids = shares.map((s) => s.characterId);
    if (new Set(ids).size !== ids.length) return { error: 'List each character once' };

    const pile = normalizeCoins(item.coins);
    if (pile) {
        const given: Coins = {};
        const planned = [];
        for (const s of shares) {
            const coins = normalizeCoins(s.coins);
            if (!coins) return { error: 'Give each character some coins' };
            for (const d of DENOMINATIONS) given[d] = (given[d] ?? 0) + (coins[d] ?? 0);
            planned.push({ characterId: s.characterId, quantity: 1, coins });
        }
        const left: Coins = {};
        for (const d of DENOMINATIONS) {
            const rest = (pile[d] ?? 0) - (given[d] ?? 0);
            if (rest < 0) return { error: `There ${pile[d] === 1 ? 'is' : 'are'} only ${pile[d] ?? 0} ${d} to give` };
            left[d] = rest;
        }
        const remaining = normalizeCoins(left);
        return { currency: true, shares: planned, remaining: remaining ? { quantity: 1, coins: remaining } : null };
    }

    const planned = shares.map((s) => ({ characterId: s.characterId, quantity: s.quantity ?? 1, coins: null }));
    const total = planned.reduce((n, s) => n + s.quantity, 0);
    if (total > item.quantity) return { error: `There ${item.quantity === 1 ? 'is' : 'are'} only ${item.quantity} to give` };
    const rest = item.quantity - total;
    return { currency: false, shares: planned, remaining: rest > 0 ? { quantity: rest, coins: null } : null };
}

const MAGIC_RARITIES = ['common', 'uncommon', 'rare', 'very rare', 'legendary', 'artifact'];

function itemCategory(item: LootItem): string {
    if (/^potion\b/i.test(item.name)) return 'potion';
    if (/^(spell )?scroll\b/i.test(item.name)) return 'scroll';
    if (MAGIC_RARITIES.includes(item.rarity.toLowerCase())) return 'magic-item';
    return 'miscellaneous';
}

const entryName = (entry: unknown) =>
    (typeof entry === 'string' ? entry : (entry as { name?: unknown } | null)?.name ?? '').toString().trim().toLowerCase();

const asObject = (value: unknown): Record<string, unknown> | null =>
    (value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : null);

const normalName = (name: string) => name.trim().toLowerCase();

/**
 * The item-list entry an unlinked loot item is ("Potion of Healing", "+1 Longsword" as
 * "Longsword, +1"), in the sheet's shape; null for coins and names that aren't in the list.
 */
export async function catalogueMatch(item: LootItem): Promise<Record<string, unknown> | null> {
    if (normalizeCoins(item.coins) || asObject(item.item)) return null;
    const plus = /^\+([1-3])\s+(.+)$/.exec(item.name.trim());
    const names = [normalName(item.name), ...(plus ? [normalName(`${plus[2]}, +${plus[1]}`)] : [])];
    const rows = await getReferenceRows('baseItem');
    const row = rows.find((r) => !r.data?.legacy && typeof r.data?.name === 'string' && names.includes(normalName(r.data.name)));
    if (!row) return null;
    const { id: _id, ...data } = row.data as Record<string, unknown>;
    return { ...data, baseItemId: row.key };
}

/** The sheet entry for loot: the linked item's stats (attacks, AC, bonus) under the loot's name and text, and its value. */
function newEntry(item: LootItem, quantity: number, campaignName: string): Record<string, unknown> {
    const rarity = item.rarity && item.rarity !== 'mundane' ? item.rarity[0].toUpperCase() + item.rarity.slice(1) : '';
    const value = lootValue(item);
    const notes = [`Loot from ${campaignName}`, rarity, value && `Worth ${value}`].filter(Boolean).join(' · ');
    const linked = asObject(item.item);
    if (!linked) {
        return {
            name: item.name,
            quantity,
            ...(item.description ? { description: item.description } : {}),
            category: itemCategory(item),
            ...(value ? { value } : {}),
            notes,
        };
    }
    const { id: _id, equipped: _e, quantity: _q, notes: _n, ...stats } = linked;
    const entry: Record<string, unknown> = { ...stats, name: item.name, quantity, equipped: false, ...(value ? { value } : {}), notes };
    if (item.description) entry.description = item.description;
    if (!entry.category) entry.category = itemCategory(item);
    // The sheet shows the item list's current name and text for linked entries: not for ones the DM renamed or reworded
    if (item.name !== linked.name || (item.description && item.description !== linked.description)) delete entry.baseItemId;
    return entry;
}

/**
 * A character's sheet data with loot added: coins go into currency; items
 * stack onto an entry with the same name or are added to the equipment list
 * (with the linked item's stats, if any).
 */
export function addLootToSheet(data: unknown, item: LootItem, share: { quantity: number; coins: Coins | null }, campaignName: string) {
    const sheet = { ...((data && typeof data === 'object' ? data : {}) as Record<string, unknown>) };
    if (share.coins) {
        sheet.currency = addCoins(sheet.currency, share.coins);
        return sheet;
    }
    const equipment = Array.isArray(sheet.equipment) ? [...sheet.equipment] : [];
    const at = equipment.findIndex((e) => entryName(e) === item.name.trim().toLowerCase());
    if (at >= 0) {
        const existing = equipment[at];
        const obj: { name?: unknown; quantity?: number; value?: unknown } = typeof existing === 'string' ? { name: existing } : { ...(existing as object) };
        obj.quantity = (Number(obj.quantity) || 1) + share.quantity;
        // A stack the sheet had no value for takes the loot's
        const value = lootValue(item);
        if (value && obj.value === undefined) obj.value = value;
        equipment[at] = obj;
    } else {
        equipment.push(newEntry(item, share.quantity, campaignName));
    }
    sheet.equipment = equipment;
    return sheet;
}

export class LootError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

/** Something changed underneath us (another claim, a sheet save); the caller retries. */
class Conflict extends Error {}

const jsonCoins = (coins: Coins | null) => (coins ? (coins as Prisma.InputJsonValue) : Prisma.DbNull);
const jsonItem = (item: unknown) => (asObject(item) ? (item as Prisma.InputJsonValue) : Prisma.DbNull);

/**
 * Give an item (or shares of it) to characters in the campaign: each sheet
 * gets its part, the recipients' parts are listed as held by them, and
 * whatever's left stays in the pool. All or nothing; retried if the item or
 * a sheet changes meanwhile.
 */
export async function distributeItem(options: {
    campaign: { id: string; name: string };
    itemId: string;
    shares: Share[];
    /** Players may only take found (revealed) loot for their own characters */
    player?: { userId: string };
}) {
    for (let attempt = 0; ; attempt++) {
        try {
            return await prisma.$transaction(async (tx) => {
                const item = await tx.campaignItem.findUnique({ where: { id: options.itemId } });
                if (!item || item.campaignId !== options.campaign.id) throw new LootError(404, 'Item not found');
                if (options.player && !item.revealed) throw new LootError(404, 'Item not found');

                const plan = planDistribution(item, options.shares);
                if ('error' in plan) throw new LootError(400, plan.error);

                const ids = plan.shares.map((s) => s.characterId);
                const characters = await tx.character.findMany({ where: { id: { in: ids } } });
                for (const id of ids) {
                    const c = characters.find((x) => x.id === id);
                    if (!c || c.campaignId !== options.campaign.id) throw new LootError(400, "That character isn't in this campaign");
                    if (options.player && c.userId !== options.player.userId) throw new LootError(403, 'You can only take loot for your own character');
                }

                // The pile first, so two people can't take the same thing
                const unchanged = { id: item.id, updatedAt: item.updatedAt };
                const wholeToOne = plan.shares.length === 1 && !plan.remaining;
                if (wholeToOne) {
                    const { count } = await tx.campaignItem.updateMany({ where: unchanged, data: { heldBy: ids[0], revealed: true } });
                    if (count === 0) throw new Conflict();
                } else {
                    const { count } = plan.remaining
                        ? await tx.campaignItem.updateMany({ where: unchanged, data: { quantity: plan.remaining.quantity, coins: jsonCoins(plan.remaining.coins) } })
                        : await tx.campaignItem.deleteMany({ where: unchanged });
                    if (count === 0) throw new Conflict();
                    await tx.campaignItem.createMany({
                        data: plan.shares.map((s) => ({
                            campaignId: item.campaignId,
                            name: item.name,
                            description: item.description,
                            rarity: item.rarity,
                            value: item.value,
                            dmNotes: item.dmNotes,
                            quantity: s.quantity,
                            coins: jsonCoins(s.coins),
                            item: jsonItem(item.item),
                            heldBy: s.characterId,
                            revealed: true,
                        })),
                    });
                }

                const loot: LootItem = { ...item, item: item.item ?? (await catalogueMatch(item)) };
                for (const share of plan.shares) {
                    const c = characters.find((x) => x.id === share.characterId)!;
                    const { count } = await tx.character.updateMany({
                        where: { id: c.id, updatedAt: c.updatedAt },
                        data: { data: addLootToSheet(c.data, loot, share, options.campaign.name) as Prisma.InputJsonValue },
                    });
                    if (count === 0) throw new Conflict();
                }

                return { given: plan.shares.map((s) => ({ characterId: s.characterId, name: characters.find((c) => c.id === s.characterId)!.name })) };
            });
        } catch (err) {
            if (err instanceof Conflict && attempt < 2) continue;
            if (err instanceof Conflict) throw new LootError(409, 'Someone else changed this loot just now. Try again.');
            throw err;
        }
    }
}
