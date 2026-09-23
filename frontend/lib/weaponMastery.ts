/**
 * D&D 2024 Weapon Mastery: weapon → mastery mapping and mastery descriptions.
 * Used to add mastery actions when equipping weapons (for characters with Weapon Mastery).
 */

export interface MasteryInfo {
    id: string;
    name: string;
    description: string;
    type: 'action' | 'bonus' | 'other';
}

/** Mastery id → info */
export const MASTERY_INFO: Record<string, MasteryInfo> = {
    cleave: {
        id: 'cleave',
        name: 'Cleave',
        description: 'When you hit a creature with a melee attack, you can make another melee attack roll against a second creature within 5 feet of the first that\'s also within your reach. On a hit, the second target takes the weapon\'s damage, but don\'t add your ability modifier unless it\'s negative. You can make this extra attack only once per turn.',
        type: 'other',
    },
    graze: {
        id: 'graze',
        name: 'Graze',
        description: 'If your attack misses, you still deal damage equal to the ability modifier you used for the attack roll.',
        type: 'other',
    },
    nick: {
        id: 'nick',
        name: 'Nick',
        description: 'When you make an extra attack with a light weapon (two-weapon fighting), you can make it as part of the Attack action instead of using a bonus action. You can do so only once per turn.',
        type: 'bonus',
    },
    push: {
        id: 'push',
        name: 'Push',
        description: 'When you hit a creature, you can push it up to 10 feet straight away from you if it is Large or smaller.',
        type: 'other',
    },
    sap: {
        id: 'sap',
        name: 'Sap',
        description: 'When you hit a creature, that creature has disadvantage on its next attack roll before the start of your next turn.',
        type: 'other',
    },
    slow: {
        id: 'slow',
        name: 'Slow',
        description: 'When you hit a creature and deal damage, you can reduce its speed by 10 feet until the start of your next turn. The reduction doesn\'t stack.',
        type: 'other',
    },
    topple: {
        id: 'topple',
        name: 'Topple',
        description: 'When you hit a creature, you can force it to make a Constitution saving throw (DC 8 + your ability modifier + your proficiency bonus). On a failure, it is knocked prone.',
        type: 'other',
    },
    vex: {
        id: 'vex',
        name: 'Vex',
        description: 'When you hit a creature and deal damage, you have advantage on your next attack roll against that creature before the end of your next turn.',
        type: 'other',
    },
};

/** Weapon name (exact, as in base items) → mastery id. PHB 2024 (plus legacy firearms). */
const WEAPON_MASTERY: Record<string, string> = {
    'bad news': 'graze',
    'battleaxe': 'topple',
    'blowgun': 'vex',
    'blunderbuss': 'push',
    'club': 'slow',
    'crossbow, heavy': 'push',
    'crossbow, light': 'slow',
    'dagger': 'nick',
    'dart': 'vex',
    'flail': 'sap',
    'glaive': 'graze',
    'greataxe': 'cleave',
    'greatclub': 'push',
    'greatsword': 'graze',
    'halberd': 'cleave',
    'hand crossbow': 'vex',
    'hand mortar': 'push',
    'handaxe': 'vex',
    'javelin': 'slow',
    'lance': 'topple',
    'light hammer': 'nick',
    'longbow': 'slow',
    'longsword': 'sap',
    'mace': 'sap',
    'maul': 'topple',
    'morningstar': 'sap',
    'musket': 'slow',
    'palm pistol': 'nick',
    'pepperbox': 'vex',
    'pike': 'push',
    'pistol': 'vex',
    'quarterstaff': 'topple',
    'rapier': 'vex',
    'scimitar': 'nick',
    'shortbow': 'vex',
    'shortsword': 'vex',
    'sickle': 'nick',
    'sling': 'slow',
    'spear': 'sap',
    'trident': 'topple',
    'war pick': 'sap',
    'warhammer': 'push',
    'whip': 'slow',
};

/** Weapons that have a mastery property (display names), for Weapon Mastery choices. */
export const MASTERY_WEAPON_NAMES: string[] = Object.keys(WEAPON_MASTERY)
    .map(w => w.replace(/\b\w/g, c => c.toUpperCase()))
    .sort();

function normalizeWeaponName(name: string): string {
    return name.trim().toLowerCase();
}

/**
 * Get the mastery id for a weapon, if any.
 */
export function getMasteryForWeapon(weaponName: string, itemMastery?: string): string | undefined {
    if (itemMastery && MASTERY_INFO[itemMastery.toLowerCase()]) return itemMastery.toLowerCase();
    const key = normalizeWeaponName(weaponName);
    return WEAPON_MASTERY[key];
}

/**
 * Get mastery actions to create when equipping this weapon (for characters with Weapon Mastery).
 */
export function getMasteryActionsForWeapon(weaponName: string): { name: string; description: string; type: 'action' | 'bonus' | 'other' }[] {
    const masteryId = getMasteryForWeapon(weaponName);
    if (!masteryId) return [];
    const info = MASTERY_INFO[masteryId];
    if (!info) return [];
    return [{
        name: `${weaponName} (${info.name})`,
        description: info.description,
        type: info.type,
    }];
}

/**
 * Check if an action name is a mastery action for the given weapon (e.g. "Longsword (Sap)").
 */
export function isMasteryActionForWeapon(actionName: string, weaponName: string): boolean {
    const w = weaponName.trim();
    if (!w) return false;
    const prefix = w + ' (';
    return actionName.startsWith(prefix) && actionName.endsWith(')');
}
