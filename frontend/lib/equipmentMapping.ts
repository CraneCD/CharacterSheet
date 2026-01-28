import { CharacterItem, ItemCategory } from './types';

/** Alias map for starting-equipment names -> base-item names (case-insensitive key). */
const NAME_ALIASES: Record<string, string> = {
    'light crossbow': 'Crossbow, Light',
    'heavy crossbow': 'Crossbow, Heavy',
    'crossbow, light': 'Crossbow, Light',
    'crossbow, heavy': 'Crossbow, Heavy',
};

export interface BaseItemLike {
    name: string;
    category: string;
    type?: string;
    armorMethod?: string;
    baseAC?: number;
    damage?: string;
    damageType?: string;
    properties?: string[];
    description?: string;
}

/**
 * Split a choice string like "Leather armor, explorer's pack, druidic focus"
 * or "Shield and martial weapon" into individual item names.
 */
export function splitEquipmentChoice(choice: string): string[] {
    const parts = choice
        .split(/\s*,\s*|\s+and\s+/i)
        .map((s) => s.trim())
        .filter(Boolean);
    return parts;
}

function normalizeForLookup(name: string): string {
    return name.toLowerCase().trim();
}

/**
 * Resolve an item name to a CharacterItem using base-items lookup (with aliases)
 * then heuristics. Ensures category/type/armorMethod for equipable items.
 * Supports "10 darts" / "20 bolts" style quantity prefix.
 */
export function itemNameToCharacterItem(
    itemName: string,
    baseItems: BaseItemLike[]
): CharacterItem {
    let quantity = 1;
    let name = itemName.trim();
    const qtyMatch = name.match(/^(\d+)\s+(.+)$/);
    if (qtyMatch) {
        quantity = Math.max(1, parseInt(qtyMatch[1], 10));
        name = qtyMatch[2].trim();
    }
    const norm = normalizeForLookup(name);
    const resolvedName = NAME_ALIASES[norm] ?? name;
    const base = baseItems.find(
        (b) => normalizeForLookup(b.name) === normalizeForLookup(resolvedName)
    );
    if (base) {
        return {
            name: base.name,
            category: base.category as ItemCategory,
            type: (base.type as CharacterItem['type']) ?? 'other',
            armorMethod: base.armorMethod as CharacterItem['armorMethod'],
            baseAC: base.baseAC,
            damage: base.damage,
            damageType: base.damageType,
            properties: base.properties,
            description: base.description,
            quantity,
            equipped: false,
            isBaseItem: true,
        };
    }

    const nameLower = name.toLowerCase();
    let category: ItemCategory = 'miscellaneous';
    let type: 'armor' | 'weapon' | 'shield' | 'other' = 'other';
    let armorMethod: CharacterItem['armorMethod'];
    let baseAC: number | undefined;
    let damage: string | undefined;
    let damageType: string | undefined;

    if (/\d+\s*(gp|sp|cp|ep|pp)/i.test(name)) {
        category = 'miscellaneous';
        type = 'other';
    } else if (
        /\b(sword|dagger|axe|mace|hammer|spear|bow|crossbow|staff|wand|club|flail|whip|rapier|scimitar|sickle|trident|lance|pike|halberd|glaive|warhammer|greataxe|greatsword|maul|longbow|shortbow|handaxe|javelin|dart|sling|blowgun)\b/i.test(
            nameLower
        )
    ) {
        category = 'weapon';
        type = 'weapon';
        if (/\b(javelin|dart)\b/i.test(nameLower)) {
            damage = '1d6';
            damageType = 'piercing';
        } else if (/\bhandaxe\b/i.test(nameLower)) {
            damage = '1d6';
            damageType = 'slashing';
        } else if (/\b(light hammer|mace)\b/i.test(nameLower)) {
            damage = '1d6';
            damageType = 'bludgeoning';
        } else if (/\bscimitar\b/i.test(nameLower)) {
            damage = '1d6';
            damageType = 'slashing';
        }
    } else if (
        /\b(armor|mail|plate|leather|chain|scale|hide|breastplate|padded|studded|ring|splint|half|full)\b/i.test(
            nameLower
        )
    ) {
        category = 'armor';
        type = 'armor';
        if (/\b(chain\s*mail|chain mail)\b/i.test(nameLower)) {
            armorMethod = 'heavy';
            baseAC = 16;
        } else if (/\b(leather\s*armor|leather armor)\b/i.test(nameLower)) {
            armorMethod = 'light';
            baseAC = 11;
        } else if (/\b(scale\s*mail|scale mail)\b/i.test(nameLower)) {
            armorMethod = 'medium';
            baseAC = 14;
        } else if (/\b(hide\s*armor|hide armor)\b/i.test(nameLower)) {
            armorMethod = 'medium';
            baseAC = 12;
        } else if (/\b(studded\s*leather|studded leather)\b/i.test(nameLower)) {
            armorMethod = 'light';
            baseAC = 12;
        } else if (/\b(breastplate|half\s*plate|half plate)\b/i.test(nameLower)) {
            armorMethod = 'medium';
            baseAC = /\bhalf\s*plate|half plate\b/i.test(nameLower) ? 15 : 14;
        } else if (/\b(splint|plate)\b/i.test(nameLower)) {
            armorMethod = 'heavy';
            baseAC = /\bplate\b/i.test(nameLower) ? 18 : 17;
        } else {
            armorMethod = 'medium';
        }
    } else if (/\b(shield|buckler)\b/i.test(nameLower)) {
        category = 'shield';
        type = 'shield';
        armorMethod = 'shield';
        baseAC = 2;
    } else if (
        /\b(amulet|ring|cloak|boots|gloves|gauntlets|helm|hat|crown|wand|staff|rod|orb|gem|stone|crystal|tome|book|manual|deck|figurine|horn|instrument|lyre|harp|flute|drum|whistle|bag|pouch|bottle|vial|flask|lantern|torch|candle|rope|chain|key|lock|trap|tool|kit|pack|focus|symbol)\b/i.test(
            nameLower
        )
    ) {
        category = 'miscellaneous';
        type = 'other';
    }

    return {
        name,
        category,
        type,
        armorMethod,
        baseAC,
        damage,
        damageType,
        quantity,
        equipped: false,
        isBaseItem: false,
    };
}
