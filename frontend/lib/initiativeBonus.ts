/**
 * Initiative on the sheet: Dexterity plus the feats, species traits and features that add to it
 * (Alert, Dread Ambusher, ...) and the ones that give Advantage on the roll (Feral Instinct, ...).
 */

type AbilityKey = 'dex' | 'int' | 'wis' | 'cha';

/** Where a bonus comes from: the Proficiency Bonus or an ability modifier. */
type BonusSource = 'pb' | AbilityKey;

/** Features, feats and traits that add a number to Initiative rolls. */
const INITIATIVE_BONUSES: Record<string, BonusSource> = {
    'Alert': 'pb',                 // Origin feat (2024)
    'Hare-Trigger': 'pb',          // Harengon
    'Aura of the Sentinel': 'pb',  // Oath of the Watchers
    'Dread Ambusher': 'wis',       // Gloom Stalker
    'Rakish Audacity': 'cha',      // Swashbuckler
    'Temporal Awareness': 'int',   // Chronurgy
    'Tactical Wit': 'int',         // War Magic
};

/** Features that give Advantage on Initiative rolls. */
const INITIATIVE_ADVANTAGE = [
    'Feral Instinct',      // Barbarian 7
    'Remarkable Athlete',  // Champion (2024)
    'Assassinate',         // Assassin (2024)
    'Ambush Master',       // Scout
];

export interface InitiativeInput {
    /** Stored features and feats plus the class/subclass features for the current level */
    features: Array<{ name?: string; featId?: string }>;
    racialTraits?: string[];
    /** A background's feature, e.g. "Origin Feat: Alert" on characters whose feat isn't stored */
    backgroundFeatureName?: string;
    modifiers: Record<AbilityKey, number>;
    proficiencyBonus: number;
}

export interface InitiativeResult {
    total: number;
    /** Bonuses on top of Dexterity, e.g. [{ name: 'Alert', value: 2 }] */
    bonuses: { name: string; value: number }[];
    /** Features that give Advantage on the roll */
    advantage: string[];
}

/** "Origin Feat: Alert" → "Alert", "Hare-Trigger (Harengon)" → "Hare-Trigger" */
function baseName(name: string): string {
    return name.replace(/^Origin Feat:\s*/i, '').split('(')[0].trim().toLowerCase();
}

export function getInitiative(input: InitiativeInput): InitiativeResult {
    const names = new Set<string>();
    for (const f of input.features) {
        if (f?.name) names.add(baseName(f.name));
        if (f?.featId) names.add(baseName(f.featId));
    }
    for (const trait of input.racialTraits || []) names.add(baseName(trait));
    if (input.backgroundFeatureName) names.add(baseName(input.backgroundFeatureName));

    const bonuses: InitiativeResult['bonuses'] = [];
    for (const [name, source] of Object.entries(INITIATIVE_BONUSES)) {
        if (!names.has(name.toLowerCase())) continue;
        const value = source === 'pb' ? input.proficiencyBonus : input.modifiers[source];
        // These are all optional ("you can add"), so a negative modifier is never applied
        if (value > 0) bonuses.push({ name, value });
    }

    const advantage = INITIATIVE_ADVANTAGE.filter((name) => names.has(name.toLowerCase()));
    const total = input.modifiers.dex + bonuses.reduce((sum, b) => sum + b.value, 0);
    return { total, bonuses, advantage };
}

/** "Dex +2, Alert +3, Dread Ambusher +1" for the Initiative tooltip. */
export function describeInitiative(result: InitiativeResult, dex: number): string {
    const fmt = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
    const parts = [`Dex ${fmt(dex)}`, ...result.bonuses.map((b) => `${b.name} ${fmt(b.value)}`)];
    const text = `${parts.join(', ')} = ${fmt(result.total)}`;
    return result.advantage.length ? `${text}. Advantage (${result.advantage.join(', ')})` : text;
}
