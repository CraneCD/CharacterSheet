// Magic weapons, armor and shields as a layer on top of a base item: what each
// one can be made from (`appliesTo`, read from its SRD "Weapon (Any Melee
// Weapon)" / "Armor (Scale Mail)" line), its bonus, and +1/+2/+3 versions of
// every mundane weapon, armor and shield. The sheet copies the chosen base
// item's stats onto the owned magic item, so it attacks and gives AC like one.
import type { AppliesTo, BaseItem } from './baseItems';

const normalize = (name: string) => name.toLowerCase().replace(/\s+armor$/, '').trim();

/** Mundane weapons, armor and shields: the items magic items are made from. */
export function mundaneBases(items: BaseItem[]): BaseItem[] {
    return items.filter((i) => ['weapon', 'armor', 'shield'].includes(i.category) && !i.legacy);
}

/** Base item names in a list like "Glaive, Greatsword, or Longsword" ("Plate Armor" matches "Plate Armor"; "Half Plate Armor" matches "Half Plate"). */
function matchNames(list: string, bases: BaseItem[]): string[] {
    const wanted = list.split(/\s*,\s*(?:or\s+)?|\s+or\s+/i).map((s) => normalize(s)).filter(Boolean);
    return bases.filter((b) => wanted.includes(normalize(b.name))).map((b) => b.name);
}

/** What a magic weapon, armor or shield can be made from, from the first line of its description. */
export function parseAppliesTo(item: BaseItem, bases: BaseItem[]): AppliesTo | undefined {
    if (item.category !== 'magic-item' || !item.type || !['weapon', 'armor', 'shield'].includes(item.type)) return undefined;
    const kind = item.type as AppliesTo['kind'];
    const firstLine = String(item.description || '').split('\n')[0];
    const m = /^(Weapon|Armor)\s*\(([^)]+)\)/i.exec(firstLine);
    // Ammunition and items without a base line (summarized non-SRD items) fit any item of their kind
    if (/^ammunition/i.test(item.name)) return undefined;
    if (kind === 'shield') return { kind, names: ['Shield'] };
    if (!m) return { kind };
    const text = m[2].trim();
    if (kind === 'weapon') {
        if (/^any (simple or martial|weapon)/i.test(text)) return { kind };
        if (/^any melee/i.test(text)) return { kind, melee: true };
        if (/^any ranged/i.test(text)) return { kind, ranged: true };
        const names = matchNames(text, bases.filter((b) => b.category === 'weapon'));
        return names.length > 0 ? { kind, names } : { kind };
    }
    const armorBases = bases.filter((b) => b.category === 'armor');
    const any = /^any (.+?)(?:,\s*except (.+))?$/i.exec(text);
    if (any) {
        const armorMethods = (['light', 'medium', 'heavy'] as const).filter((w) => new RegExp(`\\b${w}\\b`, 'i').test(any[1]));
        const except = any[2] ? matchNames(any[2], armorBases) : [];
        return { kind, ...(armorMethods.length > 0 && armorMethods.length < 3 ? { armorMethods } : {}), ...(except.length ? { except } : {}) };
    }
    const names = matchNames(text, armorBases);
    return names.length > 0 ? { kind, names } : { kind };
}

/**
 * A magic item's own bonus: "+N bonus to attack rolls and damage rolls" for weapons, "+N bonus to
 * AC / Armor Class" for armor and shields. Conditional ones (a Bonus Action, "until", "against ranged
 * attacks") don't count.
 */
export function parseMagicBonus(item: BaseItem): number | undefined {
    const pattern = item.type === 'weapon'
        ? /\+([1-3]) bonus to attack rolls and damage rolls made with this (?:magic )?weapon/i
        : item.type === 'armor' || item.type === 'shield'
            ? /\+([1-3]) bonus to (?:your )?(?:AC|Armor Class)/i
            : undefined;
    if (!pattern) return undefined;
    const text = String(item.description || '');
    const re = new RegExp(pattern.source, 'gi');
    for (let m = re.exec(text); m; m = re.exec(text)) {
        // Only the clause around the bonus counts: "use a Bonus Action to gain a +2 bonus to AC until ..." is not constant
        const before = text.slice(0, m.index).split(/[.,;\n]/).pop() || '';
        const after = text.slice(m.index + m[0].length).split(/[.,;\n]/)[0] || '';
        if (!/\b(bonus action|reaction|when)\b/i.test(before) && !/^\s*(until|against|when|if)\b/i.test(after)) return Number(m[1]);
    }
    return undefined;
}

/** Base-item fields some magic armor changes (Mithral: no Stealth Disadvantage, no Strength requirement). */
const OVERRIDES: Record<string, BaseItem['overrides']> = {
    'Mithral Armor': { stealthDisadvantage: false, strengthRequirement: null },
};

/** "Weapon, +1, +2, or +3" and friends: replaced by the +1/+2/+3 version of each item, so hidden from pickers. */
const GENERIC_BONUS = /^(Weapon|Armor|Shield), \+1, \+2,? (?:or )?\+3$/;

const RARITY: Record<string, string[]> = {
    weapon: ['Uncommon', 'Rare', 'Very Rare'],
    armor: ['Rare', 'Very Rare', 'Legendary'],
    shield: ['Uncommon', 'Rare', 'Very Rare'],
};

/** "Longsword, +1" ... "Plate Armor, +3" ... "Shield, +2": every mundane weapon, armor and shield at +1 to +3. */
export function bonusVariants(bases: BaseItem[]): BaseItem[] {
    const out: BaseItem[] = [];
    for (const base of bases) {
        const kind = base.category as 'weapon' | 'armor' | 'shield';
        for (const bonus of [1, 2, 3]) {
            const rules = kind === 'weapon'
                ? `Weapon (${base.name})\nYou have a +${bonus} bonus to attack rolls and damage rolls made with this magic weapon.`
                : kind === 'armor'
                    ? `Armor (${base.name})\nYou have a +${bonus} bonus to Armor Class while wearing this armor.`
                    : `Armor (Shield)\nWhile holding this Shield, you have a +${bonus} bonus to Armor Class. This bonus is in addition to the Shield's normal bonus to AC.`;
            out.push({
                ...base,
                name: `${base.name}, +${bonus}`,
                category: 'magic-item',
                type: base.type,
                description: base.description ? `${rules}\n${base.description}` : rules,
                rarity: RARITY[kind][bonus - 1],
                attunement: false,
                magicBonus: bonus,
                baseName: base.name,
                appliesTo: { kind, names: [base.name] },
                cost: undefined,
                equipped: false,
                isBaseItem: true,
                source: 'SRD 5.2',
            });
        }
    }
    return out.map((i) => JSON.parse(JSON.stringify(i)));
}

/**
 * The catalogue as served: magic weapons/armor/shields get `appliesTo`, their bonus and overrides;
 * repeated entries and the generic "+1, +2, or +3" items are hidden (`legacy`, kept for characters
 * that own them); +1/+2/+3 versions of every mundane weapon, armor and shield are appended.
 */
export function finishCatalogue(items: BaseItem[]): BaseItem[] {
    const bases = mundaneBases(items);
    const seen = new Set<string>();
    const enriched = items.map((item) => {
        const out: BaseItem = { ...item };
        const dupKey = `${item.name}|${item.type}|${item.description ?? ''}`;
        if (seen.has(dupKey) || GENERIC_BONUS.test(item.name)) out.legacy = true;
        seen.add(dupKey);
        const appliesTo = parseAppliesTo(item, bases);
        if (appliesTo) out.appliesTo = appliesTo;
        const bonus = parseMagicBonus(item);
        if (bonus && out.magicBonus === undefined) out.magicBonus = bonus;
        if (OVERRIDES[item.name]) out.overrides = OVERRIDES[item.name];
        return out;
    });
    return [...enriched, ...bonusVariants(bases)];
}
