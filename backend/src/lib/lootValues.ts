import { Prisma, PrismaClient } from '@prisma/client';

// What a piece of loot is worth, per item ("50 gp"): the loot's Value, else a
// value its description gives ("worth 250 gp", "Value: 25 gp"). Loot handed
// out carries it to the sheet as the item's `value`; backfillLootValues gives
// it to items characters already hold.

const UNIT: Record<string, string> = {
    pp: 'pp', platinum: 'pp', ep: 'ep', electrum: 'ep', gp: 'gp', gold: 'gp', sp: 'sp', silver: 'sp', cp: 'cp', copper: 'cp',
};

/** "worth 1,200 gold pieces", "Value: 25 gp", "sells for 5 sp each" -> "1,200 gp" / "25 gp" / "5 sp" */
const DESCRIPTION_VALUE = /\b(?:worth|valued? at|value[ds]?\s*(?:is|of|:)?|sells? for|price[ds]?\s*(?:at|of|:)?)\s*(?:about |around |roughly |approximately |~)?([\d][\d,]*(?:\.\d+)?)\s*(pp|ep|gp|sp|cp|platinum|electrum|gold|silver|copper)\b/i;

export function valueFromDescription(description: string): string | null {
    const m = DESCRIPTION_VALUE.exec(String(description || ''));
    return m ? `${m[1]} ${UNIT[m[2].toLowerCase()]}` : null;
}

/** The value a loot item gives each of its items, or null (coin piles have none: they're coins). */
export function lootValue(loot: { value?: string | null; description?: string | null; coins?: unknown }): string | null {
    if (loot.coins && typeof loot.coins === 'object') return null;
    const own = String(loot.value ?? '').trim();
    return own || valueFromDescription(String(loot.description ?? ''));
}

const sameName = (entry: unknown, name: string) =>
    (typeof entry === 'string' ? entry : String((entry as { name?: unknown } | null)?.name ?? '')).trim().toLowerCase() === name.trim().toLowerCase();

/**
 * A sheet's equipment with loot values filled in: entries named like the loot that have no
 * `value` yet. An empty value ('') was cleared by the player and stays cleared.
 */
export function withLootValues(equipment: unknown, loot: { name: string; value: string }[]): { equipment: unknown[]; filled: string[] } {
    const filled: string[] = [];
    const list = Array.isArray(equipment) ? equipment : [];
    const next = list.map((entry) => {
        const match = loot.find((l) => sameName(entry, l.name));
        if (!match) return entry;
        const obj = typeof entry === 'string' ? { name: entry } : (entry as Record<string, unknown> | null);
        if (!obj || typeof obj !== 'object' || obj.value !== undefined) return entry;
        filled.push(String(obj.name));
        return { ...obj, value: match.value };
    });
    return { equipment: next, filled };
}

export interface BackfillReport {
    charactersChecked: number;
    charactersUpdated: number;
    items: { characterId: string; characterName: string; item: string; value: string }[];
}

/**
 * Give items characters got from campaign loot the loot's value. Only fills entries with no
 * value yet, so it's safe to run again (it runs on every Render deploy). With `apply: false`
 * it reports what it would change.
 */
export async function backfillLootValues(prisma: PrismaClient, { apply }: { apply: boolean }): Promise<BackfillReport> {
    const held = await prisma.campaignItem.findMany({
        where: { heldBy: { not: null } },
        select: { name: true, value: true, description: true, coins: true, heldBy: true },
    });
    const byCharacter = new Map<string, { name: string; value: string }[]>();
    for (const item of held) {
        const value = lootValue(item);
        if (!value || !item.heldBy) continue;
        byCharacter.set(item.heldBy, [...(byCharacter.get(item.heldBy) ?? []), { name: item.name, value }]);
    }

    const report: BackfillReport = { charactersChecked: 0, charactersUpdated: 0, items: [] };
    const ids = Array.from(byCharacter.keys());
    for (let i = 0; i < ids.length; i += 100) {
        const characters = await prisma.character.findMany({ where: { id: { in: ids.slice(i, i + 100) } } });
        for (const c of characters) {
            report.charactersChecked++;
            const data = (c.data && typeof c.data === 'object' ? c.data : {}) as Record<string, unknown>;
            const { equipment, filled } = withLootValues(data.equipment, byCharacter.get(c.id) ?? []);
            if (filled.length === 0) continue;
            for (const item of filled) {
                report.items.push({ characterId: c.id, characterName: c.name, item, value: (equipment.find((e) => sameName(e, item)) as { value: string }).value });
            }
            report.charactersUpdated++;
            if (apply) {
                // Skip a sheet saved meanwhile; the next run picks it up
                await prisma.character.updateMany({
                    where: { id: c.id, updatedAt: c.updatedAt },
                    data: { data: { ...data, equipment } as Prisma.InputJsonValue },
                });
            }
        }
    }
    return report;
}
