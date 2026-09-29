/**
 * Campaign loot linked to the item list (/reference/base-items): the DM finds an entry, and the loot
 * item carries the sheet item it becomes (`CampaignItemEntry.item`), magic weapons and armor already
 * made from their base item. Handing it out puts that item on the sheet with its stats
 * (backend/src/lib/lootDelivery.ts), so a magic sword attacks and magic armor counts toward AC.
 */
import type { CharacterItem } from './types';
import { baseCandidates, composeMagicItem, isMagicGear, needsBase } from './itemComposition';
import { RARITIES } from './campaignPrep';

/** Catalogue entries matching `term`, names starting with it first; hidden (legacy) entries left out. */
export function searchCatalogue(catalogue: CharacterItem[], term: string, limit = 8): CharacterItem[] {
    const t = term.trim().toLowerCase();
    if (!t) return [];
    const words = t.split(/\s+/);
    const matches = catalogue.filter((i) => !i.legacy && words.every((w) => i.name.toLowerCase().includes(w)));
    const rank = (i: CharacterItem) => {
        const name = i.name.toLowerCase();
        return name === t ? 0 : name.startsWith(t) ? 1 : 2;
    };
    return matches
        .sort((a, b) => rank(a) - rank(b) || a.name.length - b.name.length || a.name.localeCompare(b.name))
        .slice(0, limit);
}

/**
 * The sheet item a catalogue entry becomes as loot: made from `base` when it's magic gear (or left
 * for the player to choose on their sheet when there's no base yet), linked to the entry by id.
 */
export function sheetItemFor(entry: CharacterItem, catalogue: CharacterItem[], base?: CharacterItem | null): CharacterItem {
    const candidates = needsBase(entry) ? baseCandidates(entry, catalogue) : [];
    const made = candidates.length === 1
        ? composeMagicItem(entry, candidates[0], true)
        : base && candidates.some((c) => c.name === base.name)
            ? composeMagicItem(entry, base, false)
            : { ...entry };
    const { id: _id, legacy: _legacy, equipped: _equipped, quantity: _quantity, ...item } = made as CharacterItem & { cost?: string };
    return { ...item, ...(entry.id ? { baseItemId: entry.id } : {}) };
}

/** Base items the DM can choose for a magic weapon or armor (none when there's nothing to choose). */
export function baseChoices(entry: CharacterItem, catalogue: CharacterItem[]): CharacterItem[] {
    if (!needsBase(entry)) return [];
    const candidates = baseCandidates(entry, catalogue);
    return candidates.length > 1 ? candidates : [];
}

/** The loot's rarity from the entry's ("Very Rare" → "very rare"; "Rarity Varies" → none). */
export function lootRarity(entry: Pick<CharacterItem, 'rarity'>): string {
    const r = (entry.rarity ?? '').trim().toLowerCase();
    return RARITIES.includes(r) ? r : '';
}

/** The loot form's fields for a catalogue entry (and the base it's made from). */
export function lootFieldsFor(entry: CharacterItem, catalogue: CharacterItem[], base?: CharacterItem | null) {
    const item = sheetItemFor(entry, catalogue, base);
    return {
        name: item.name,
        description: entry.description ?? '',
        rarity: lootRarity(entry),
        value: (entry as CharacterItem & { cost?: string }).cost ?? '',
        item,
    };
}

const signed = (n: number) => (n >= 0 ? `+${n}` : String(n));

/** "1d8 slashing, +1", "AC 14", "AC +2 (shield)": what a linked item does, for loot rows. */
export function lootStats(item: CharacterItem | null | undefined): string {
    if (!item) return '';
    const parts: string[] = [];
    const bonus = typeof item.magicBonus === 'number' && item.magicBonus > 0 ? item.magicBonus : 0;
    const kind = item.type ?? item.category;
    if (item.damage) parts.push(`${item.damage}${item.damageType ? ` ${item.damageType}` : ''}`);
    else if (kind === 'shield' || item.armorMethod === 'shield') parts.push(`AC ${signed((item.baseAC ?? 2) + bonus)}`);
    else if (kind === 'armor' && item.baseAC != null) parts.push(`AC ${item.baseAC + bonus}`);
    else if (isMagicGear(item) && !item.baseName && item.appliesTo) parts.push(`${item.appliesTo.kind}: player's choice`);
    if (bonus && item.damage) parts.push(signed(bonus));
    if (item.attunement) parts.push('attunement');
    return parts.join(', ');
}
