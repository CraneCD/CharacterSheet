import type { CharacterItem } from './types';

/**
 * What items are worth. An item's `value` is per item and free text ("50 gp", "1,200 GP",
 * "2.5 gp", "5 sp"), set in the Gear tab or carried over from campaign loot. The item list's
 * `cost` is only a hint: it's often for a bundle (Arrows: 1 GP for 20), so it isn't totalled.
 */

const COPPER: Record<string, number> = { pp: 1000, gp: 100, ep: 50, sp: 10, cp: 1 };
const UNIT: Record<string, string> = {
    pp: 'pp', platinum: 'pp', ep: 'ep', electrum: 'ep', gp: 'gp', gold: 'gp', sp: 'sp', silver: 'sp', cp: 'cp', copper: 'cp',
};

/** "1,200 gp" -> 120000 (copper pieces); several parts add up ("1 gp 5 sp"); null when it isn't a value. */
export function parseValue(text: string | null | undefined): number | null {
    const parts = Array.from(String(text ?? '').matchAll(/(\d[\d,]*(?:\.\d+)?)\s*(pp|ep|gp|sp|cp|platinum|electrum|gold|silver|copper)\b/gi));
    if (parts.length === 0) return null;
    return Math.round(parts.reduce((sum, m) => sum + Number(m[1].replace(/,/g, '')) * COPPER[UNIT[m[2].toLowerCase()]], 0));
}

/** 120000 -> "1,200 gp"; 1250 -> "12 gp 5 sp" */
export function formatValue(copper: number): string {
    const cp = Math.max(0, Math.round(copper));
    const gp = Math.floor(cp / 100);
    const sp = Math.floor((cp % 100) / 10);
    const rest = cp % 10;
    const parts = [gp && `${gp.toLocaleString('en-US')} gp`, sp && `${sp} sp`, rest && `${rest} cp`].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : '0 gp';
}

/** The item's own value (per item), or undefined; an empty value counts as none. */
export function itemValue(item: Pick<CharacterItem, 'value'>): string | undefined {
    const v = typeof item.value === 'string' ? item.value.trim() : '';
    return v || undefined;
}

/** Everything with a value, times how many you have: copper total and how many items counted. */
export function gearValue(equipment: (string | CharacterItem)[]): { copper: number; counted: number } {
    let copper = 0;
    let counted = 0;
    for (const raw of Array.isArray(equipment) ? equipment : []) {
        if (!raw || typeof raw !== 'object') continue;
        const each = parseValue(itemValue(raw));
        if (each === null) continue;
        const quantity = typeof raw.quantity === 'number' ? Math.max(0, raw.quantity) : 1;
        copper += each * quantity;
        counted++;
    }
    return { copper, counted };
}
