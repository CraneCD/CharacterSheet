// Includes material from the System Reference Document 5.2 ("SRD 5.2") by
// Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd and
// licensed under the Creative Commons Attribution 4.0 International License
// (https://creativecommons.org/licenses/by/4.0/legalcode). Content outside
// SRD 5.2 is summarized in our own words. `legacy: true` marks pre-2024
// content kept for existing characters; pickers hide it by default.

export type ItemCategory = 'armor' | 'weapon' | 'shield' | 'tool' | 'magic-item' | 'potion' | 'scroll' | 'miscellaneous';

export interface BaseItem {
    name: string;
    quantity?: number;
    description?: string;
    equipped?: boolean;
    category: ItemCategory;
    type?: 'armor' | 'weapon' | 'shield' | 'other';
    armorMethod?: 'light' | 'medium' | 'heavy' | 'shield' | 'none';
    baseAC?: number;
    strengthRequirement?: number;
    stealthDisadvantage?: boolean;
    damage?: string;
    damageType?: string;
    /** Lowercase weapon properties, e.g. "finesse", "thrown (range 20/60)", "versatile (1d10)". */
    properties?: string[];
    /** 2024 weapon mastery property id (e.g. "sap", "vex"). */
    mastery?: string;
    weaponCategory?: 'simple' | 'martial';
    cost?: string;
    weight?: number;
    rarity?: string;
    attunement?: boolean;
    notes?: string;
    isBaseItem?: boolean;
    source?: string;
    legacy?: boolean;
}

export const baseItems: BaseItem[] = [
    {
        "name": "Padded Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "light",
        "baseAC": 11,
        "stealthDisadvantage": true,
        "cost": "5 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Light armor made of quilted layers of cloth and batting."
    },
    {
        "name": "Leather Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "light",
        "baseAC": 11,
        "cost": "10 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil."
    },
    {
        "name": "Studded Leather Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "light",
        "baseAC": 12,
        "cost": "45 GP",
        "weight": 13,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes."
    },
    {
        "name": "Hide Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "light",
        "baseAC": 12,
        "cost": "10 GP",
        "weight": 12,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This crude armor consists of thick furs and pelts."
    },
    {
        "name": "Chain Shirt",
        "category": "armor",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 13,
        "cost": "50 GP",
        "weight": 14,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather."
    },
    {
        "name": "Scale Mail",
        "category": "armor",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 14,
        "stealthDisadvantage": true,
        "cost": "50 GP",
        "weight": 45,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish."
    },
    {
        "name": "Breastplate",
        "category": "armor",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 14,
        "cost": "400 GP",
        "weight": 20,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This armor consists of a fitted metal chest piece worn with supple leather."
    },
    {
        "name": "Half Plate",
        "category": "armor",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 15,
        "stealthDisadvantage": true,
        "cost": "750 GP",
        "weight": 40,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Half plate consists of shaped metal plates that cover most of the wearer's body."
    },
    {
        "name": "Ring Mail",
        "category": "armor",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 14,
        "stealthDisadvantage": true,
        "cost": "30 GP",
        "weight": 40,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This armor is leather armor with heavy rings sewn into it."
    },
    {
        "name": "Chain Mail",
        "category": "armor",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 16,
        "strengthRequirement": 13,
        "stealthDisadvantage": true,
        "cost": "75 GP",
        "weight": 55,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows."
    },
    {
        "name": "Splint Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 17,
        "strengthRequirement": 15,
        "stealthDisadvantage": true,
        "cost": "200 GP",
        "weight": 60,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding."
    },
    {
        "name": "Plate Armor",
        "category": "armor",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 18,
        "strengthRequirement": 15,
        "stealthDisadvantage": true,
        "cost": "1500 GP",
        "weight": 65,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Plate consists of shaped, interlocking metal plates to cover the entire body."
    },
    {
        "name": "Dagger",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "piercing",
        "properties": [
            "finesse",
            "light",
            "thrown (range 20/60)"
        ],
        "mastery": "nick",
        "weaponCategory": "simple",
        "cost": "2 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Nick."
    },
    {
        "name": "Shortsword",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "finesse",
            "light"
        ],
        "mastery": "vex",
        "weaponCategory": "martial",
        "cost": "10 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Vex."
    },
    {
        "name": "Rapier",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "finesse"
        ],
        "mastery": "vex",
        "weaponCategory": "martial",
        "cost": "25 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Vex."
    },
    {
        "name": "Longsword",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile (1d10)"
        ],
        "mastery": "sap",
        "weaponCategory": "martial",
        "cost": "15 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Sap."
    },
    {
        "name": "Greatsword",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d6",
        "damageType": "slashing",
        "properties": [
            "heavy",
            "two-handed"
        ],
        "mastery": "graze",
        "weaponCategory": "martial",
        "cost": "50 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Graze."
    },
    {
        "name": "Warhammer",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "bludgeoning",
        "properties": [
            "versatile (1d10)"
        ],
        "mastery": "push",
        "weaponCategory": "martial",
        "cost": "15 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Push."
    },
    {
        "name": "Battleaxe",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile (1d10)"
        ],
        "mastery": "topple",
        "weaponCategory": "martial",
        "cost": "10 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Topple."
    },
    {
        "name": "Shortbow",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 80/320)",
            "two-handed"
        ],
        "mastery": "vex",
        "weaponCategory": "simple",
        "cost": "25 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple ranged weapon. Mastery: Vex."
    },
    {
        "name": "Longbow",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 150/600)",
            "heavy",
            "two-handed"
        ],
        "mastery": "slow",
        "weaponCategory": "martial",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Slow."
    },
    {
        "name": "Crossbow, Light",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 80/320)",
            "loading",
            "two-handed"
        ],
        "mastery": "slow",
        "weaponCategory": "simple",
        "cost": "25 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple ranged weapon. Mastery: Slow."
    },
    {
        "name": "Crossbow, Heavy",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 100/400)",
            "heavy",
            "loading",
            "two-handed"
        ],
        "mastery": "push",
        "weaponCategory": "martial",
        "cost": "50 GP",
        "weight": 18,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Push."
    },
    {
        "name": "Sling",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 30/120)"
        ],
        "mastery": "slow",
        "weaponCategory": "simple",
        "cost": "1 SP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple ranged weapon. Mastery: Slow."
    },
    {
        "name": "Palm Pistol",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 20/80)",
            "light",
            "reload 1",
            "misfire d5"
        ],
        "description": "Cost 20 gp, ammo 2 gp (20), weight 1 lb. A tiny concealable firearm with a short range and a tendency to misfire.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pistol",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 30/90)",
            "loading"
        ],
        "mastery": "vex",
        "weaponCategory": "martial",
        "cost": "250 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Vex."
    },
    {
        "name": "Revolver",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d8",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 40/120)",
            "light",
            "reload 6",
            "misfire d4"
        ],
        "description": "Cost 150 gp, ammo 4 gp (20), weight 3 lbs. A one-handed firearm with a revolving cylinder holding six rounds. Deals more damage per shot than a standard pistol.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pepperbox",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 70/140)",
            "reload 6",
            "misfire d4"
        ],
        "description": "Cost 70 gp, ammo 4 gp (20), weight 4 lbs. A multi-barreled firearm that can be fired several times before it must be reloaded.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Musket",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d12",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 40/120)",
            "loading",
            "two-handed"
        ],
        "mastery": "slow",
        "weaponCategory": "martial",
        "cost": "500 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Slow."
    },
    {
        "name": "Blunderbuss",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d8",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 15/60)",
            "reload 1",
            "two-handed",
            "misfire d3"
        ],
        "description": "Cost 100 gp, ammo 5 gp (5), weight 10 lbs. A short, wide-mouthed firearm that fires scattering shot in a brutal close-range blast.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hand Mortar",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d8",
        "damageType": "fire",
        "properties": [
            "ammunition (range 30/60)",
            "reload 1",
            "explosive",
            "misfire d2"
        ],
        "description": "Cost 200 gp, ammo 10 gp (1), weight 10 lbs. A heavy handheld launcher that fires explosive shells, dealing fire damage in a small area.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bad News",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d12",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 200/400)",
            "reload 1",
            "two-handed",
            "misfire d2"
        ],
        "description": "Cost 400 gp, ammo 10 gp (5), weight 20 lbs. A massive, experimental rifle that delivers devastating shots at extreme range, but is prone to catastrophic failure.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Quarterstaff",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile (1d8)"
        ],
        "mastery": "topple",
        "weaponCategory": "simple",
        "cost": "2 SP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Topple."
    },
    {
        "name": "Shield",
        "category": "shield",
        "type": "shield",
        "armorMethod": "shield",
        "baseAC": 2,
        "cost": "10 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2."
    },
    {
        "name": "Alchemist's supplies",
        "category": "tool",
        "type": "other",
        "cost": "50 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Brewer's supplies",
        "category": "tool",
        "type": "other",
        "cost": "20 GP",
        "weight": 9,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Calligrapher's supplies",
        "category": "tool",
        "type": "other",
        "cost": "10 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Carpenter's tools",
        "category": "tool",
        "type": "other",
        "cost": "8 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Cartographer's tools",
        "category": "tool",
        "type": "other",
        "cost": "15 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Cobbler's tools",
        "category": "tool",
        "type": "other",
        "cost": "5 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Cook's utensils",
        "category": "tool",
        "type": "other",
        "cost": "1 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Glassblower's tools",
        "category": "tool",
        "type": "other",
        "cost": "30 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Jeweler's tools",
        "category": "tool",
        "type": "other",
        "cost": "25 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Leatherworker's tools",
        "category": "tool",
        "type": "other",
        "cost": "5 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Mason's tools",
        "category": "tool",
        "type": "other",
        "cost": "10 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Painter's supplies",
        "category": "tool",
        "type": "other",
        "cost": "10 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Potter's tools",
        "category": "tool",
        "type": "other",
        "cost": "10 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Smith's tools",
        "category": "tool",
        "type": "other",
        "cost": "20 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Tinker's tools",
        "category": "tool",
        "type": "other",
        "cost": "50 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Weaver's tools",
        "category": "tool",
        "type": "other",
        "cost": "1 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Woodcarver's tools",
        "category": "tool",
        "type": "other",
        "cost": "1 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "These special tools include the items needed to pursue a craft or trade. Proficiency with a set of artisan's tools lets you add your proficiency bonus to any ability checks you make using the tools."
    },
    {
        "name": "Dice set",
        "category": "tool",
        "type": "other",
        "cost": "1 SP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This item encompasses a wide range of game pieces, including dice and decks of cards. Proficiency with a gaming set lets you add your proficiency bonus to ability checks you make to play a game with that set."
    },
    {
        "name": "Playing card set",
        "category": "tool",
        "type": "other",
        "cost": "5 SP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This item encompasses a wide range of game pieces, including dice and decks of cards. Proficiency with a gaming set lets you add your proficiency bonus to ability checks you make to play a game with that set."
    },
    {
        "name": "Dragonchess set",
        "category": "tool",
        "type": "other",
        "cost": "1 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This item encompasses a wide range of game pieces. Proficiency with a gaming set lets you add your proficiency bonus to ability checks you make to play a game with that set."
    },
    {
        "name": "Three-Dragon Ante set",
        "category": "tool",
        "type": "other",
        "cost": "1 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This item encompasses a wide range of game pieces. Proficiency with a gaming set lets you add your proficiency bonus to ability checks you make to play a game with that set."
    },
    {
        "name": "Bagpipes",
        "category": "tool",
        "type": "other",
        "cost": "30 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Drum",
        "category": "tool",
        "type": "other",
        "cost": "6 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Dulcimer",
        "category": "tool",
        "type": "other",
        "cost": "25 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Flute",
        "category": "tool",
        "type": "other",
        "cost": "2 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Lute",
        "category": "tool",
        "type": "other",
        "cost": "35 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Lyre",
        "category": "tool",
        "type": "other",
        "cost": "30 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Horn",
        "category": "tool",
        "type": "other",
        "cost": "3 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Pan flute",
        "category": "tool",
        "type": "other",
        "cost": "12 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Shawm",
        "category": "tool",
        "type": "other",
        "cost": "2 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Viol",
        "category": "tool",
        "type": "other",
        "cost": "30 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Proficiency with a musical instrument lets you add your proficiency bonus to any ability checks you make to play music with the instrument."
    },
    {
        "name": "Disguise kit",
        "category": "miscellaneous",
        "type": "other",
        "cost": "25 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This pouch of cosmetics, hair dye, and small props lets you create disguises that change your physical appearance. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a visual disguise."
    },
    {
        "name": "Forgery kit",
        "category": "tool",
        "type": "other",
        "cost": "15 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This small box contains a variety of papers and parchments, pens and inks, seals and sealing wax, gold and silver leaf, and other supplies necessary to create convincing forgeries of physical documents. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to create a physical forgery of a document."
    },
    {
        "name": "Herbalism kit",
        "category": "tool",
        "type": "other",
        "cost": "5 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This kit contains a variety of instruments such as clippers, mortar and pestle, and pouches and vials used by herbalists to create remedies and potions. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to identify or use herbs."
    },
    {
        "name": "Navigator's tools",
        "category": "tool",
        "type": "other",
        "cost": "25 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This set of instruments is used for navigation at sea. Proficiency with navigator's tools lets you add your proficiency bonus to any ability check you make to avoid getting lost at sea."
    },
    {
        "name": "Poisoner's kit",
        "category": "tool",
        "type": "other",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "A poisoner's kit includes the vials, chemicals, and other equipment necessary for the creation of poisons. Proficiency with this kit lets you add your proficiency bonus to any ability checks you make to craft or use poisons."
    },
    {
        "name": "Thieves' tools",
        "category": "tool",
        "type": "other",
        "cost": "25 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "This set of tools includes a small file, a set of lock picks, a small mirror mounted on a metal handle, a set of narrow-bladed scissors, and a pair of pliers. Proficiency with these tools lets you add your proficiency bonus to any ability checks you make to disarm traps or open locks."
    },
    {
        "name": "Armblade",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "finesse",
            "light"
        ],
        "description": "This prosthetic arm ends in a weapon. As a bonus action, you can extend or retract the weapon. The weapon can be a dagger, shortsword, or any simple weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor of Gleaming",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 13,
        "description": "This armor never gets dirty. While wearing it, you gain advantage on Charisma (Persuasion) checks made to interact with nobles or royalty.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Band of Loyalty",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you have advantage on saving throws against being charmed or frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bead of Nourishment",
        "category": "magic-item",
        "type": "other",
        "description": "This small, smooth bead provides enough nourishment to sustain a creature for one day. The bead dissolves after use.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bead of Refreshment",
        "category": "magic-item",
        "type": "other",
        "description": "This bead can be crushed to create enough fresh water to sustain one Medium creature for one day.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Boots of False Tracks",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these boots, you can choose to have them leave tracks that appear to have been made by a creature one size larger than you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bottle of Boundless Coffee",
        "category": "magic-item",
        "type": "other",
        "description": "This bottle magically refills with hot coffee each dawn. Drinking the coffee grants you advantage on Constitution saving throws against exhaustion for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Breathing Bubble",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this bubble, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Candle of the Deep",
        "category": "magic-item",
        "type": "other",
        "description": "This candle burns underwater and provides bright light in a 5-foot radius and dim light for an additional 5 feet. It burns for 4 hours.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cast-Off Armor",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 13,
        "description": "You can doff this armor as an action. When you doff it, the armor magically removes itself and appears in a space within 5 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Charlatan's Die",
        "category": "magic-item",
        "type": "other",
        "description": "Whenever you roll this six-sided die, you can choose which number it shows. The die then becomes nonmagical.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Chest of Preserving",
        "category": "magic-item",
        "type": "other",
        "description": "Any organic material placed inside this chest is preserved indefinitely and doesn't decay.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cleansing Stone",
        "category": "magic-item",
        "type": "other",
        "description": "This smooth stone can be used to clean any object. When rubbed against a surface, it removes dirt, grime, and stains.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Billowing",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you can use a bonus action to make it billow dramatically.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Many Fashions",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you can use a bonus action to change its style, color, and apparent quality. The cloak provides no benefit other than its appearance.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Clockwork Amulet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you can forgo rolling a d20 to take a 10 on any d20 roll. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Clothes of Mending",
        "category": "magic-item",
        "type": "other",
        "description": "These clothes magically repair themselves. If you wear these clothes for 1 minute, they become clean and any tears or holes in them are mended.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Coin of Delving",
        "category": "magic-item",
        "type": "other",
        "description": "This coin can be used to detect nearby secret doors. When you flip it, it lands on edge if a secret door is within 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cuddly Strixhaven Mascot",
        "category": "magic-item",
        "type": "other",
        "description": "This plush toy serves as a spellcasting focus. While holding it, you gain a +1 bonus to spell attack rolls.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dark Shard Amulet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you can use your Charisma modifier in place of your Intelligence modifier when making Intelligence (Arcana) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dread Helm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you can use a bonus action to cause your eyes to glow red and emit dim light in a 5-foot radius.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ear Horn of Hearing",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this horn to your ear, you can use a bonus action to gain advantage on Wisdom (Perception) checks that rely on hearing for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Earring of Message",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this earring, you can cast the message cantrip at will, targeting only creatures wearing the other earring of the pair.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Enduring Spellbook",
        "category": "magic-item",
        "type": "other",
        "description": "This spellbook is immune to fire and water damage. It doesn't deteriorate with age.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ersatz Eye",
        "category": "magic-item",
        "type": "other",
        "description": "This artificial eye replaces a real one that was lost or removed. While the ersatz eye is embedded in your eye socket, it can't be removed by anyone other than you, and you can see through it normally.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Everbright Lantern",
        "category": "magic-item",
        "type": "other",
        "description": "This lantern never runs out of oil and sheds bright light in a 30-foot radius and dim light for an additional 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Feather Token",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis object looks like a feather. Different types of feather tokens exist, each with a different single-use effect. The GM chooses the kind of token or determines it randomly by rolling on the Feather Tokens table. The type of token determines its rarity.\nAnchor (Uncommon). You can take a Magic action to touch the token to a boat or ship. For the next24 hours, the vessel can't be moved by any means. Touching the token to the vessel again ends the effect. When the effect ends, the token disappears.\nBird (Rare). You can take a Magic action to toss the token 5 feet into the air. The token disappears and an enormous, multicolored bird takes its place. The bird has the statistics of a Roc, but it can't attack. It obeys your simple commands and can carry up to 500 pounds while flying at its maximum speed (16 miles per hour for a maximum of 144 miles per day, with a 1-hour rest for every 3 hours of flying) or 1,000 pounds at half that speed. The bird disappears after flying its maximum distance for a day or if it drops to 0 Hit Points. You can dismiss the bird as a Magic action.\nFan (Uncommon). If you are on a boat or ship, you can take a Magic action to toss the token up to 10 feet in the air. The token disappears, and a giant flapping fan takes its place. The fan floats and cre-ates a strong wind. This wind can fill the sails of one ship, increasing its speed by 5 miles per hour for 8 hours. You can dismiss the fan as a Magic action.\nSwan Boat (Rare). You can take a Magic action to touch the token to a body of water at least 60 feet in diameter. The token disappears, and a 50-footlong, 20-foot-wide boat shaped like a swan takes its place. The boat is self-propelled and moves across water at a speed of 6 miles per hour. You can takea Magic action while on the boat to command it to move or to turn up to 90 degrees. The boat remains for 24 hours and then disappears. You can dismiss the boat as a Magic action.\nTree (Uncommon). You must be outdoors to use this token. You can take a Magic action to touch it to an unoccupied space on the ground. The token disappears, and in its place a nonmagical oak tree springs into existence. The tree is 60 feet tall and has a 5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius.\nWhip (Rare). You can take a Magic action to throw the token to a point within 10 feet of yourself. The token disappears, and a floating whip takes its place. You can then take a Bonus Action to make a melee spell attack against a creature within 10 feet of the whip, with an attack bonus of +9. On a hit, the target takes 1d6 + 5 Force damage.\nAs a Bonus Action, you can direct the whip to fly up to 20 feet and repeat the attack against a creature within 10 feet of the whip. The whip dis-appears after 1 hour, when you take a Magic action to dismiss it, or when you die or have the Incapacitated condition.Feather Tokens1d100TokenRarity01-20AnchorUncommon21-35BirdRare36-50FanUncommon51-65Swan boatRare66-90TreeUncommon91-00WhipRare",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rarity Varies",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Glamerweave",
        "category": "magic-item",
        "type": "other",
        "description": "This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hat of Vermin",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this hat, you can use an action to pull a small beast from it. The beast acts on your turn and disappears at the end of your turn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hat of Wizardry",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this hat, you can use it as a spellcasting focus for your wizard spells. In addition, you can attempt to cast a cantrip you don't know.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Heward's Handy Spice Pouch",
        "category": "magic-item",
        "type": "other",
        "description": "This pouch produces an endless supply of salt, pepper, and various spices. You can use an action to pull out any spice you desire.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Silent Alarm",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this horn, only creatures you choose within 600 feet can hear it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Illuminator's Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo glows with dim light in a 5-foot radius. You can use a bonus action to cause it to shed bright light in a 20-foot radius and dim light for an additional 20 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Imbued Wood Focus",
        "category": "magic-item",
        "type": "other",
        "description": "This wooden focus is imbued with druidic magic. While holding it, you gain a +1 bonus to spell attack rolls and the saving throw DCs of your druid spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of Illusions",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this musical instrument, you can create harmless, illusory visual effects within a 5-foot-radius sphere centered on the instrument.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of Scribing",
        "category": "magic-item",
        "type": "other",
        "description": "This instrument can magically inscribe words onto any surface. You can use it to write at a rate of 250 words per minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Keycharm",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this charm, you can use an action to touch a lock and cause it to unlock. The charm can be used three times and then becomes nonmagical.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lantern of Tracking",
        "category": "magic-item",
        "type": "other",
        "description": "While this lantern is lit, you can use an action to name a creature you have seen before. The lantern then sheds bright light in a 30-foot radius, but only you can see the light.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lock of Trickery",
        "category": "magic-item",
        "type": "other",
        "description": "This lock appears to be a normal lock, but it can be opened with any key or even a hairpin. However, it can only be opened by someone who knows its secret.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Masque Charm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this charm, you can use an action to cast the disguise self spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Masquerade Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo allows you to cast the disguise self spell at will, targeting only yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of Muscle",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you have advantage on Strength (Athletics) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of the Conch",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you can breathe underwater and have a swimming speed equal to your walking speed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of the Horizonback",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, your carrying capacity is doubled.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of the Maze",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you have advantage on Intelligence checks made to navigate.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of the Meat Pie",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you require half the normal amount of food and water.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of the Wetlands",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you have advantage on saving throws against being poisoned and against disease.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medal of Wit",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this medal, you have advantage on Intelligence checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Careful)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal, choose up to three creatures; they automatically succeed on saves. Single use; becomes nonmagical gem worth 50 gp. Uncommon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Distant)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal: range 5+ ft becomes +100 ft; touch becomes 30 ft. Single use; becomes nonmagical gem worth 50 gp. Uncommon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Empowered)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal, reroll up to three damage dice and use the new rolls. Single use; becomes nonmagical gem worth 50 gp. Uncommon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Extended)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action, duration 1 min+) while holding this crystal, double the duration (max 24 hours). Single use; becomes nonmagical gem worth 50 gp. Uncommon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Heightened)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal, choose one creature; it has disadvantage on the first save against the spell. Single use; becomes nonmagical gem worth 50 gp. Rare.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Quickened)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal, the casting time becomes 1 bonus action for this casting. Single use; becomes nonmagical gem worth 50 gp. Rare.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal (Subtle)",
        "category": "magic-item",
        "type": "other",
        "description": "When you cast a spell (1 action) while holding this crystal, you cast it without somatic or verbal components. Single use; becomes nonmagical gem worth 50 gp. Common.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moodmark Paint",
        "category": "magic-item",
        "type": "other",
        "description": "This paint changes color based on the emotional state of the creature it's applied to.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moon-Touched Sword",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile"
        ],
        "description": "In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mystery Key",
        "category": "magic-item",
        "type": "other",
        "description": "This key can open any nonmagical lock. Once used, it becomes a normal key.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of Direction",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this orb, you always know which way is north.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of Gonging",
        "category": "magic-item",
        "type": "other",
        "description": "When you strike this orb, it produces a loud gong sound that can be heard up to 600 feet away.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of Shielding",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this orb, you gain a +1 bonus to AC.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of Time",
        "category": "magic-item",
        "type": "other",
        "description": "This orb shows the current time of day. While holding it, you always know what time it is.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Perfume of Bewitching",
        "category": "magic-item",
        "type": "other",
        "description": "This perfume has 3 charges. While you wear it, you can use an action to expend 1 charge and cast the charm person spell (save DC 13).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pipe of Remembrance",
        "category": "magic-item",
        "type": "other",
        "description": "While smoking this pipe, you can perfectly recall any memory from your past.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pipe of Smoke Monsters",
        "category": "magic-item",
        "type": "other",
        "description": "While smoking this pipe, you can use a bonus action to exhale a puff of smoke that takes the form of a Tiny beast or a Tiny dragon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pole of Angling",
        "category": "magic-item",
        "type": "other",
        "description": "This 10-foot pole can extend to 50 feet long. While extended, it can be used as a fishing pole.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pole of Collapsing",
        "category": "magic-item",
        "type": "other",
        "description": "This 10-foot pole can shrink to a 1-foot-long rod that weighs 1 pound. You can use an action to extend or collapse it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pot of Awakening",
        "category": "magic-item",
        "type": "other",
        "description": "After 30 days, a plant placed in this pot becomes awakened and gains the ability to move and communicate.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Climbing",
        "category": "magic-item",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain a Climb Speed equal to your Speed for 1 hour. During this time, you have Advantage on Strength (Athletics) checks to climb.\nThis potion is separated into brown, silver, and gray layers resembling bands of stone. Shaking the bottle fails to mix the colors.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Common",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Healing",
        "category": "magic-item",
        "type": "other",
        "description": "A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Watchful Rest",
        "category": "magic-item",
        "type": "other",
        "description": "When you drink this potion, you don't need to sleep and can rest while remaining alert. You gain the benefits of a long rest in 4 hours.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Psionic Fortitude",
        "category": "magic-item",
        "type": "other",
        "description": "When you drink this potion, you have advantage for 1 hour on saving throws you make to avoid or end the charmed or stunned condition on yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pressure Capsule",
        "category": "magic-item",
        "type": "other",
        "description": "This capsule can be thrown to create a 10-foot-radius sphere of fresh air that lasts for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Prosthetic Limb",
        "category": "magic-item",
        "type": "other",
        "description": "This prosthetic replaces a lost limb. It functions identically to the part it replaces.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rope of Mending",
        "category": "magic-item",
        "type": "other",
        "description": "This rope repairs itself. If cut, the rope magically reconnects after 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruby of the War Mage",
        "category": "magic-item",
        "type": "other",
        "description": "This ruby can be attached to a weapon. While attached, the weapon can be used as a spellcasting focus.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scribe's Pen",
        "category": "magic-item",
        "type": "other",
        "description": "This pen never runs out of ink and can write on any surface. It writes at a rate of 250 words per minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sekolahian Worshipping Statuette",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this statuette, you can use an action to cast the water walk spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of Expression",
        "category": "magic-item",
        "type": "shield",
        "baseAC": 2,
        "description": "This shield can be commanded to display different facial expressions. It provides no mechanical benefit.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shiftweave",
        "category": "magic-item",
        "type": "other",
        "description": "This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Smoldering Armor",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 16,
        "description": "This armor is always warm to the touch and sheds dim light in a 5-foot radius. While wearing it, you have resistance to cold damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Scroll",
        "category": "magic-item",
        "type": "other",
        "description": "A spell scroll contains a single spell that can be cast by a spellcaster who can read it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spellshard",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal shard can store spells like a spellbook. A wizard can use it to prepare spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spellwrought Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Adornment",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "This staff can be used as a spellcasting focus. While holding it, you can use a bonus action to cause it to shed bright light in a 20-foot radius.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Birdcalls",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "This staff can mimic the calls of birds. You can use an action to cause it to produce the sound of any bird you have heard.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Flowers",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "This staff can be used to create flowers. You can use an action to cause fresh flowers to bloom from the staff.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Strixhaven Pennant",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this pennant, you can use a bonus action to cause it to flutter dramatically, even in still air.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Talking Doll",
        "category": "magic-item",
        "type": "other",
        "description": "This doll can repeat the last sentence it heard. You can use an action to cause it to speak.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Talon",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile"
        ],
        "description": "+1 longsword. You gain a +1 bonus to attack and damage rolls made with this magic weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tankard of Plenty",
        "category": "magic-item",
        "type": "other",
        "description": "This tankard can be used to create any nonmagical beverage. You can use an action to fill it with the beverage of your choice.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tankard of Sobriety",
        "category": "magic-item",
        "type": "other",
        "description": "Any alcoholic beverage poured into this tankard becomes nonalcoholic. The beverage retains its original taste.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Thermal Cube",
        "category": "magic-item",
        "type": "other",
        "description": "This cube maintains a constant temperature. You can use an action to set it to any temperature between freezing and boiling.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Unbreakable Arrow",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "ammunition",
            "range (80/320)"
        ],
        "description": "This arrow cannot be broken. If it would be destroyed, it instead returns to your quiver at the start of your next turn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Veteran's Cane",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "This cane can be used as a quarterstaff. While holding it, you have advantage on Wisdom (Insight) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Vox Seeker",
        "category": "magic-item",
        "type": "other",
        "description": "This small device can be activated to seek out a specific voice. It points in the direction of the nearest source of that voice.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Walloping Ammunition",
        "category": "magic-item",
        "type": "weapon",
        "description": "When you hit a target with this piece of ammunition, the target must succeed on a DC 10 Strength saving throw or be knocked prone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Conducting",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you can use it to conduct an invisible orchestra. You can use a bonus action to cause music to play.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Pyrotechnics",
        "category": "magic-item",
        "type": "other",
        "description": "This wand can create harmless fireworks. You can use an action to cause a burst of colorful sparks to appear.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Scowls",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you can use an action to cause a creature you can see to scowl for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Smiles",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you can use an action to cause a creature you can see to smile for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand Sheath",
        "category": "magic-item",
        "type": "other",
        "description": "This sheath can hold a wand. While a wand is sheathed, you can draw or stow it as part of the action used to cast a spell from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Adamantine Armor",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 16,
        "description": "Armor (Any Medium or Heavy, Except Hide Armor)\nThis suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you're wearing it, any Critical Hit against you becomes a normal hit.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Alchemy Jug",
        "category": "magic-item",
        "type": "other",
        "description": "This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Alchemy Jug (Blue)",
        "category": "magic-item",
        "type": "other",
        "description": "A blue variant of the alchemy jug that produces different liquids.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Alchemy Jug (Orange)",
        "category": "magic-item",
        "type": "other",
        "description": "An orange variant of the alchemy jug that produces different liquids.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "All-Purpose Tool",
        "category": "magic-item",
        "type": "other",
        "description": "This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan's tool of your choice.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ammunition, +1, +2, or +3",
        "category": "magic-item",
        "type": "weapon",
        "description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of Proof Against Detection and Location",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this amulet, you can't be targeted by Divination spells or perceived through magical scrying sensors unless you allow it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Amulet of the Devout",
        "category": "magic-item",
        "type": "other",
        "description": "This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of the Drunkard",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you have advantage on saving throws against being poisoned and against disease.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arcane Grimoire",
        "category": "magic-item",
        "type": "other",
        "description": "While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor Of Fungal Spores",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 14,
        "description": "While wearing this armor, you can use a bonus action to cause spores to burst from the armor. Each creature of your choice within 5 feet of you must succeed on a Constitution saving throw or be poisoned for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor Of The Fallen",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 16,
        "description": "This armor is imbued with the essence of fallen warriors. While wearing it, you have advantage on death saving throws.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor Of Weightlessness",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "heavy",
        "baseAC": 16,
        "description": "This armor weighs only 1 pound regardless of its type. While wearing it, you have a climbing speed equal to your walking speed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bag Of Bounty",
        "category": "magic-item",
        "type": "other",
        "description": "This bag can produce a variety of food and drink. You can use an action to pull from the bag enough food to feed up to 5 people for one day.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bag of Holding",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis bag has an interior space considerably larger than its outside dimensions-roughly 2 feet square and 4 feet deep on the inside. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet. The bag weighs 5 pounds, regardless of its contents. Retrieving an item from the bag requires a Utilize action.\nIf the bag is overloaded, pierced, or torn, it is destroyed, and its contents are scattered in the Astral Plane. If the bag is turned inside out, its contents spill forth unharmed, but the bag must be put right before it can be used again. The bag holds enough air for 10 minutes of breathing, divided by the number of breathing creatures inside.\nPlacing a Bag of Holding inside an extradimensional space created by a Handy Haversack, Portable Hole, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within a 10-foot-radius Sphere centered on the gate is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way and can't be reopened.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Bag of Tricks",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis bag made from gray, rust, or tan cloth appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.\nYou can take a Magic action to pull the fuzzy object from the bag and throw it up to 20 feet. When the object lands, it transforms into a creature you determine by rolling on the table that corresponds to the bag's color. See \"Monsters\" for the creature's stat block. The creature vanishes at the next dawn or when it is reduced to 0 Hit Points.\nThe creature is Friendly to you and your allies, and it acts immediately after you on your Initiative count. You can take a Bonus Action to command how the creature moves and what action it takes on its next turn, such as attacking an enemy. In the absence of such orders, the creature acts in a fashion appropriate to its nature.\nOnce three fuzzy objects have been pulled from the bag, the bag can't be used again until the next dawn.\nGray Bag of Tricks\n1d8\nCreature\n1d8\nCreature\n1\nWeasel\n5\nPanther\n2\nGiant Rat\n6\nGiant Badger\n3\nBadger\n7\nDire Wolf\n4\nBoar\n8\nGiant Elk\nRust Bag of Tricks\n1d8\nCreature\n1d8\nCreature\n1\nRat\n5\nGiant Goat\n2\nOwl\n6\nGiant Boar\n3\nMastiff\n7\nLion\n4\nGoat\n8\nBrown Bear\nTan Bag of Tricks\n1d8\nCreature\n1d8\nCreature\n1\nJackal\n5\nBlack Bear\n2\nApe\n6\nGiant Weasel\n3\nBaboon\n7\nGiant Hyena\n4\nAxe Beak\n8\nTiger",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Balance of Harmony",
        "category": "magic-item",
        "type": "other",
        "description": "This scale can measure the balance between good and evil. While holding it, you can use an action to determine the alignment of a creature you can see.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Balloon Pack",
        "category": "magic-item",
        "type": "other",
        "description": "This backpack has a balloon attached that can be inflated. While inflated, you have a flying speed of 10 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Barrier Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blasted Goggles",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these goggles, you can see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blood of the Lycanthrope Antidote",
        "category": "magic-item",
        "type": "other",
        "description": "A character who drinks this vial is cured of lycanthropy if they are currently transformed or infected.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blood Spear",
        "category": "magic-item",
        "type": "weapon",
        "description": "This spear is stained with blood that never dries. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodrage Greataxe",
        "category": "magic-item",
        "type": "weapon",
        "description": "This greataxe grows more powerful as you take damage. When you are below half your hit point maximum, you gain a bonus to attack and damage rolls made with this weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodwell Vial",
        "category": "magic-item",
        "type": "other",
        "description": "This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Boomerang Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "This shield can be thrown and returns to you. When you make a ranged attack with it, it returns to your hand immediately after the attack.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Boots of Elvenkind",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have Advantage on Dexterity (Stealth) checks.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Boots of Striding and Springing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear these boots, your Speed becomes 30 feet unless your Speed is higher, and your Speed isn't reduced by you carrying weight in excess of your carrying capacity or wearing Heavy Armor.\nOnce on each of your turns, you can jump up to 30 feet by spending only 10 feet of movement.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Boots of the Winterlands",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese furred boots are snug and feel warm. Whilewearing them, you gain the following benefits.\nCold Resistance. You have Resistance to Cold damage and can tolerate temperatures of 0 degrees Fahrenheit or lower without any additional protection.\nWinter Strider. You ignore Difficult Terrain created by ice or snow.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bottled Breath",
        "category": "magic-item",
        "type": "other",
        "description": "This bottle contains a single breath of air. When opened, it releases enough air for one creature to breathe for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bracers of Archery",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing these bracers, you have proficiency with the Longbow and Shortbow, and you gain a +2 bonus to damage rolls made with such weapons.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Brooch of Living Essence",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this brooch, you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Brooch of Shielding",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this brooch, you have Resistance to Force damage, and you have Immunity to damage from the Magic Missile spell.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Broom of Flying",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis wooden broom functions like a mundane broom until you stand astride it and take a Magic action to make it hover beneath you, at which time it can be ridden in the air. It has a Fly Speed of 50 feet. It can carry up to 400 pounds, but its Fly Speed becomes 30 feet while carrying over 200 pounds.The broom stops hovering when you land or when you're no longer riding it.\nAs a Magic action, you can send the broom to travel alone to a destination within 1 mile of you if you name the location and are familiar with it. The broom comes back to you when you take a Magic action and use a command word if the broom is still within 1 mile of you.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Cap of Water Breathing",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cap underwater, you can breathe normally. You can also speak normally underwater.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Card Sharp's Deck",
        "category": "magic-item",
        "type": "other",
        "description": "This deck of cards is always perfectly shuffled. While holding it, you have advantage on ability checks made to play card games.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Circlet of Blasting",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this circlet, you can cast Scorching Ray with it (+5 to hit). The circlet can't cast this spell again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Circlet of Human Perfection",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this circlet, you can use an action to cast the alter self spell with it. This version of the spell lasts until you use an action to end it or remove the circlet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Elvenkind",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear this cloak, Wisdom (Perception) checks made to perceive you have Disadvantage, and you have Advantage on Dexterity (Stealth) checks.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Cloak of Protection",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYou gain a +1 bonus to Armor Class and saving throws while you wear this cloak.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Cloak of the Manta Ray",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this cloak, you can breathe underwater, and you have a Swim Speed of 60 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Coiling Grasp Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo writhes on your skin. When a creature you can see moves within 5 feet of you, you can use your reaction to cause spectral tentacles to sprout from the tattoo and grapple the creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cracked Driftglobe",
        "category": "magic-item",
        "type": "other",
        "description": "This driftglobe is damaged and functions imperfectly. It sheds dim light in a 10-foot radius instead of bright light.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cursed Luckstone",
        "category": "magic-item",
        "type": "other",
        "description": "While you carry this stone, you have disadvantage on ability checks and saving throws. You cannot willingly part with the stone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Decanter of Endless Water",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis stoppered flask sloshes when shaken, as if itcontains water. The decanter weighs 2 pounds.\nYou can take a Magic action to remove the stopper and issue one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask. The water stops pouring out at the start of your next turn. Choose from the following command words:Splash. The decanter produces 1 gallon of water.Fountain. The decanter produces 5 gallons of water. Geyser. The decanter produces 30 gallons of water that gushes forth in a Line 30 feet long and 1 foot wide. If you're holding the decanter, you can aim the geyser in one direction (no action required).One creature of your choice in the Line must succeed on a DC 13 Strength saving throw or take 1d4 Bludgeoning damage and have the Prone condition. Instead of a creature, you can target one object in the Line that isn't being worn or carried and that weighs no more than 200 pounds. The object is knocked over by the geyser.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Deck of Illusions",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis box contains a set of cards. A full deck has 34 cards: 32 depicting specific creatures and two with a mirrored surface. A deck found as treasure is usually missing 1d20 1 cards.\nThe magic of the deck functions only if its cards are drawn at random. You can take a Magic action to draw a card at random from the deck and throw it to the ground at a point within 30 feet of yourself. An illusion of a creature, determined by rolling on the Deck of Illusions table, forms over the thrown card and remains until dispelled. The illusory creature created by the card looks and behaves like a real creature of its kind, except that it can do no harm. While you are within 120 feet of the illusory creature and can see it, you can take a Magic action to move it anywhere within 30 feet of its card.\nAny physical interaction with the illusory creature reveals it to be false, because objects pass through it. A creature that takes a Study action to visually inspect the illusory creature identifies it as an illusion with a successful DC 15 Intelligence (Investigation) check. The illusion lasts until its card is moved or the illusion is dispelled (using a DispelMagic spell or a similar effect). When the illusion ends, the image on its card disappears, and that card can't be used again.Deck of Illusions1d100  Illusion*04-06  Archmage10-12  Bandit Captain16-18  Berserker22-24  Cloud Giant28-30  Erinyes34-36  Fire Giant40-42  Gnoll Warrior46-48  Guardian Naga52-54  Hobgoblin Warrior58-60  Iron Golem64-66  Kobold Warrior70-72  Medusa76-78  Ogre82-84  Priest88-90  Troll94-96  Wyvern*Stat blocks for these creatures (except the card drawer) appear in \"Monsters.\"",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Deck Of Miscellany",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that produce various minor magical effects when drawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Deck Of Wonder",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that produce wondrous effects when drawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Vessel",
        "category": "magic-item",
        "type": "other",
        "description": "This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragonhide Belt",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon's Wrath Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon-Touched Focus",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dried Leech",
        "category": "magic-item",
        "type": "other",
        "description": "This dried leech can be used to cure diseases. When applied to a diseased creature, it removes one disease.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Driftglobe",
        "category": "magic-item",
        "type": "other",
        "description": "This small sphere of crystal sheds bright light in a 20-foot radius and dim light for an additional 20 feet. When you use an action to speak the command word, the globe hovers 5 feet off the ground and moves in any direction you choose.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dust of Corrosion",
        "category": "magic-item",
        "type": "other",
        "description": "This dust can corrode metal. When sprinkled on a metal object, it causes the object to rust and deteriorate over time.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dust of Deliciousness",
        "category": "magic-item",
        "type": "other",
        "description": "This dust can make any food or drink taste delicious. When sprinkled on food or drink, it enhances the flavor.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dust of Disappearance",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis powder resembles fine sand. There is enough of it for one use. When you take a Utilize action to throw the dust into the air, you and each creature and object within a 10-foot Emanation originating from you have the Invisible condition for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its magic takes effect. Immediately after an affected creature makes an attack roll, deals damage, or casts a spell, the Invisible condition ends for that creature.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Dust of Dryness",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis small packet contains 1d6 + 4 pinches of dust. As a Utilize action, you can sprinkle a pinch of the dust over water, turning up to a 15-foot Cube of water into one marble-sized pellet, which floatsor rests near where the dust was sprinkled. The pellet's weight is negligible. A creature can take a Utilize action to smash the pellet against a hardsurface, causing the pellet to shatter and release the water the dust absorbed. Doing so destroys the pellet and ends its magic.\nAs a Utilize action, you can sprinkle a pinch of the dust on an Elemental within 5 feet of yourself that is composed mostly of water (such as a Water Elemental). Such a creature exposed to a pinch of the dust makes a DC 13 Constitution saving throw, taking 10d6 Necrotic damage on a failed save or half as much damage on a successful one.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Dust of Sneezing and Choking",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nFound in a small container, this powder resembles Dust of Disappearance, and Identify reveals it to be such. There is enough of it for one use.\nAs a Utilize action, you can throw the dust into the air, forcing yourself and every creature in a 30-footEmanation originating from you to make a DC 15 Constitution saving throw. Constructs, Elementals, Oozes, Plants, and Undead succeed on the save automatically.\nOn a failed save, a creature begins sneezing uncontrollably; it has the Incapacitated condition and is suffocating. The creature repeats the save at the end of each of its turns, ending the effect on itself on a success. The effect also ends on any creature targeted by a Lesser Restoration spell.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Earworm",
        "category": "magic-item",
        "type": "other",
        "description": "This small creature burrows into your ear. While it lives there, you have advantage on Wisdom (Perception) checks that rely on hearing.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Eldritch Claw Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo covers your hand and fingers. While the tattoo is on your skin, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Elemental Gem",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis gem contains a mote of elemental energy. When you take a Utilize action to break the gem, an elemental is summoned (see \"Monsters\" for its stat block), and the gem ceases to be magical. The elemental appears in an unoccupied space as close to the broken gem as possible, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The type of gem determines the elemental, as shown in the following table. Gem Summoned Elemental Emerald Water Elemental Red corundum Fire Elemental Yellow diamond Earth Elemental",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Emerald Pen",
        "category": "magic-item",
        "type": "other",
        "description": "This pen never runs out of ink and can write on any surface. It writes at a rate of 250 words per minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Eversmoking Bottle",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nAs a Magic action, you can open or close this bottle. Opening the bottle causes thick smoke to billow out, forming a cloud that fills a 60-foot Emanationoriginating from the bottle. The area within the smoke is Heavily Obscured.\nEach minute the bottle remains open, the size of the Emanation increases by 10 feet until it reaches its maximum size of 120 feet.\nClosing the bottle causes the cloud to become fixed in place until it disperses after 10 minutes. A strong wind (such as that created by the Gust of Wind spell) disperses the cloud after 1 minute.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Eyes of Charming",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese crystal lenses fit over the eyes. They have 3 charges. While wearing them, you can expend 1 or more charges to cast Charm Person (save DC13). For 1 charge, you cast the level 1 version of the spell. You increase the spell's level by one for each additional charge you expend. The lenses regain all expended charges daily at dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Eyes of Minute Seeing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese crystal lenses fit over the eyes. While wearing them, your vision improves significantly out to a range of 1 foot, granting you Darkvision within that range and Advantage on Intelligence (Investigation) checks made to examine something within that range.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Eyes of the Eagle",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese crystal lenses fit over the eyes. While wearing them, you have Advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Fabulist Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem can store a lie. When you tell a lie while holding it, the gem records it. You can later use an action to cause the gem to repeat the lie.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Feywild Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard of the Feywild can be used to enhance spells. While holding it, you can choose to have one of your spells deal additional damage or have an additional effect.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Figurine of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Finder's Goggles",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these goggles, you can use an action to cast the locate object spell from them. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gauntlets of Ogre Power",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYour Strength is 19 while you wear these gauntlets. They have no effect on you if your Strength is 19 or higher without them.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Gem of Brightness",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis prism has 50 charges. While you are holding it, you can take a Magic action and use one of three command words to cause one of the following effects:First Command Word. The gem sheds Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. This effect doesn't expend a charge. It lasts until you take a Bonus Action to repeat the command word or until you use another function of the gem.Second Command Word. You expend 1 charge and cause the gem to fire a brilliant beam of light at one creature you can see within 60 feet of yourself. The creature must succeed on a DC 15 Constitution saving throw or have the Blinded condition for 1 minute. The creature repeats the save at the end of each of its turns, ending the effect on itself on a success.Third Command Word. You expend 5 charges and cause the gem to flare with intense light in a 30foot Cone. Each creature in the Cone makes a saving throw as if struck by the beam created with the second command word.When all of the gem's charges are expended, the gem becomes a nonmagical jewel worth 50 GP.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Glamerweave",
        "category": "magic-item",
        "type": "other",
        "description": "This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gloves of Missile Snaring",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nIf you're hit by an attack roll made with a Ranged or Thrown weapon while wearing these gloves, you can take a Reaction to reduce the damage by 1d10plus your Dexterity modifier if you have a free hand. If you reduce the damage to 0, you can catch the ammunition or weapon if it is small enough for you to hold in that hand.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Gloves of Swimming and Climbing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing these gloves, you have a Climb Speed and a Swim Speed equal to your Speed, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Gloves of Thievery",
        "category": "magic-item",
        "type": "other",
        "description": "These gloves are invisible while worn. While wearing them, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and Dexterity checks made to pick locks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Goggles of Night",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing these dark lenses, you have Darkvision out to 60 feet. If you already have Darkvision, wearing the goggles increases its range by 60 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Goggles of Object Reading",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these goggles, you can use an action to touch an object and learn its history. You learn significant events involving the object over the past 24 hours.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Guardian Emblem",
        "category": "magic-item",
        "type": "other",
        "description": "This emblem can be attached to a shield. While attached, the shield grants you a bonus to AC.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Guild Keyrune",
        "category": "magic-item",
        "type": "other",
        "description": "This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Guild Signet",
        "category": "magic-item",
        "type": "other",
        "description": "This signet ring represents a guild. While wearing it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Harkon's Bite",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a vampire. When you hit a creature with it, you can choose to deal extra necrotic damage and regain hit points equal to half the damage dealt.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hat of Disguise",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this hat, you can cast the Disguise Self spell. The spell ends if the hat is removed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Headband of Intellect",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYour Intelligence is 19 while you wear this headband. It has no effect on you if your Intelligence is 19 or higher without it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Hellfire Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with hellfire. When you hit a creature with it, you can choose to deal extra fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Helm of Comprehending Languages",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this helm, you can cast Comprehend Languages from it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Helm of Telepathy",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this helm, you have telepathy with a range of 30 feet, and you can cast Detect Thoughts or Suggestion (save DC 13) from the helm. Once either spell is cast from the helm, that spell can't be cast from it again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Helm of Underwater Action",
        "category": "magic-item",
        "type": "other",
        "description": "This helm is made of metal and has a glass faceplate. While wearing it, you can breathe underwater, and you have a swimming speed of 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "House Of Cards",
        "category": "magic-item",
        "type": "other",
        "description": "This deck of cards can be used to create a small structure. When you use an action to play the cards, they form a 10-foot cube structure.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Immovable Rod",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nThis iron rod has a button on one end. You can take a Utilize action to press the button, which causes the rod to become magically fixed in place. Until you or another creature takes a Utilize action to push the button again, the rod doesn't move, even if it defies gravity. The rod can hold up to 8,000 pounds of weight. More weight causes the rod to deactivate and fall. A creature can take a Utilize action to make a DC 30 Strength (Athletics) check, moving the fixed rod up to 10 feet on a successful check.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Infernal Puzzle Box",
        "category": "magic-item",
        "type": "other",
        "description": "This puzzle box can only be opened by solving a complex puzzle. Once opened, it reveals its contents.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Inquisitive's Goggles",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these goggles, you have advantage on Wisdom (Investigation) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Insignia of Claws",
        "category": "magic-item",
        "type": "other",
        "description": "The jewels in this insignia of the Cult of the Dragon flare with purple light when you enter combat, empowering your natural weapons or unarmed strikes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of the Bards",
        "category": "magic-item",
        "type": "other",
        "description": "An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Javelin of Lightning",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Javelin)\nEach time you make an attack roll with this magic weapon and hit, you can have it deal Lightning damage instead of Piercing damage.\nLightning Bolt. When you throw this weapon at a target no farther than 120 feet from you, you can forgo making a ranged attack roll and instead turn the weapon into a bolt of lightning. This bolt forms a 5-foot-wide Line between you and the target. The target and each other creature in the Line (exclud-ing you) makes a DC 13 Dexterity saving throw, tak-ing 4d6 Lightning damage on a failed save or half as much damage on a successful one. Immediately after dealing this damage, the weapon reappears in your hand. This property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Keoghtom's Ointment",
        "category": "magic-item",
        "type": "other",
        "description": "This glass jar, 3 inches in diameter, contains 1d4 + 1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh 1/2 pound.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lantern of Revealing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's Bright Light. You can take a Utilize action to lower the hood, reducing the lantern's light to Dim Light in a 5-foot radius.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Living Gloves",
        "category": "magic-item",
        "type": "other",
        "description": "These gloves are made of living material. While wearing them, you have advantage on Dexterity (Sleight of Hand) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lorehold Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge from Lorehold College. While holding it, you have advantage on Intelligence (History) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mariner's Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, you regain 1 hit point.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mask of the Beast",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mask, you can use an action to cast the speak with animals spell from it. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Medallion of Thoughts",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThe medallion has 5 charges. While wearing it, you can expend 1 charge to cast Detect Thoughts (save DC 13) from it. The medallion regains 1d4 expended charges daily at dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mind Carapace Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the carapace of a mind flayer. While wearing it, you have advantage on saving throws against being charmed or frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mithral Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Any Medium or Heavy, Except Hide Armor)\nMithral is a light, flexible metal. Armor made of this substance can be worn under normal clothes. If the armor normally imposes Disadvantage on Dexterity (Stealth) checks or has a Strength requirement, the mithral version of the armor doesn't.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Mizzium Apparatus",
        "category": "magic-item",
        "type": "other",
        "description": "This apparatus can be used to cast spells you don't know. While holding it, you can attempt to cast any spell of a level you can cast.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moon Sickle",
        "category": "magic-item",
        "type": "weapon",
        "description": "This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mummy Rot Antidote",
        "category": "magic-item",
        "type": "other",
        "description": "A character who drinks this vial is cured of mummy rot if they are currently infected.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nature's Mantle",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mantle, you can use an action to cast the pass without trace spell from it. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Necklace of Adaptation",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this necklace, you can breathe normally in any environment, and you have Advantage on saving throws made to avoid or end the Poisoned condition.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Night Caller",
        "category": "magic-item",
        "type": "other",
        "description": "This whistle can summon undead. When you blow it, you can use an action to cast the animate dead spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Oil of Slipperiness",
        "category": "magic-item",
        "type": "other",
        "description": "Potion\nOne vial of this oil can cover one Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Freedom of Movement spell for 8 hours.\nAlternatively, the oil can be poured on the ground as a Magic action, where it covers a 10-foot square, duplicating the effect of the Grease spell in that area for 8 hours.This sticky, black unguent is thick and heavy, butit flows quickly when poured.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Paper Bird",
        "category": "magic-item",
        "type": "other",
        "description": "This paper bird can be folded into a message. When you fold it, it becomes a bird that can deliver the message to a creature you know.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pearl of Power",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile this pearl is on your person, you can take a Magic action to regain one expended spell slot of level 3 or lower. Once you use the pearl, it can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Periapt of Health",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this pendant, you can take a Magic action to regain 2d4 + 2 Hit Points. Once used, this property can't be used again until the next dawn.\nIn addition, you have Advantage on saving throws to avoid or end the Poisoned condition while you wear this pendant.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Periapt of Wound Closure",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this pendant, you gain the followingbenefits.\nLife Preservation. Whenever you make a Death Saving Throw, you can change a roll of 9 or lower to a 10, turning a failed save into a successful one.\nNatural Healing Boost. Whenever you roll a Hit Point Die to regain Hit Points, double the number of Hit Points it restores.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Philter of Love",
        "category": "magic-item",
        "type": "other",
        "description": "Potion\nThe next time you see a creature within 10 minutes after drinking this philter, you are charmed by that creature and have the Charmed condition for 1 hour.\nThis rose-hued, effervescent liquid contains one easy-to-miss bubble shaped like a heart.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Pipes of Haunting",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese pipes have 3 charges and regain 1d3 expended charges daily at dawn. You can take a Magic action to play them and expend 1 charge to create an eerie, spellbinding tune. Each creature of your choice within 30 feet of you must succeed on a DC 15 Wisdom saving throw or have the Frightened condition for 1 minute. A creature that fails the save repeats it at the end of each of its turns, ending the effect on itself on a success. A creature that succeeds on its save is immune to the effect of these pipes for 24 hours.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Pipes of the Sewers",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile these pipes are on your person, ordinary rats and giant rats are Indifferent toward you and won't attack you unless you threaten or harm them.\nThe pipes have 3 charges and regain 1d3 expended charges daily at dawn. If you play the pipes as a Magic action, you can take a Bonus Action to expend 1 to 3 charges, calling forth one Swarmof Rats with each expended charge if enough rats are within half a mile of you to be called in this fashion (as determined by the GM). If there aren't enough rats to form a swarm, the charge is wasted. Called swarms move toward the music by the shortest available route but aren't under your control otherwise.\nWhenever a Swarm of Rats that isn't under another creature's control comes within 30 feet of you while you are playing the pipes, the swarm makesa DC 15 Wisdom saving throw. On a successful save, the swarm behaves as it normally would and can't be swayed by the pipes' music for the next 24 hours. On a failed save, the swarm is swayed by the pipes' music and becomes Friendly to you and your allies for as long as you continue to play the pipes each round as a Magic action. A Friendly swarm obeys your commands. If you issue no commands to a Friendly swarm, it defends itself but otherwise takes no actions. If a Friendly swarm starts its turn more than 30 feet away from you, your control over that swarm ends, and the swarm behaves as it normally would and can't be swayed by the pipes' music for the next 24 hours.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Piwafwi",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In addition, you can use an action to cast the invisibility spell on yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pixie Dust",
        "category": "magic-item",
        "type": "other",
        "description": "This dust can be used to cast the fly spell. When sprinkled on a creature, it grants that creature a flying speed of 60 feet for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Plate Of Knight's Fellowship",
        "category": "magic-item",
        "type": "other",
        "description": "This plate represents a knightly order. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that order.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Prehistoric Figurines of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Prismari Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge from Prismari College. While holding it, you have advantage on Charisma (Performance) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Propeller Helm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you can use a bonus action to cause a propeller to extend from the top. While the propeller is active, you have a flying speed of 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Psi Crystal",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal enhances psionic abilities. While holding it, you gain a bonus to psionic attack rolls and the saving throw DCs of your psionic powers.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pyroconverger",
        "category": "magic-item",
        "type": "other",
        "description": "This device can convert heat into energy. While holding it, you can use an action to cast the fireball spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Quandrix Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge from Quandrix College. While holding it, you have advantage on Intelligence (Investigation) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Quiver of Ehlonna",
        "category": "magic-item",
        "type": "other",
        "description": "Each of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds, regardless of its contents.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rhythm Maker's Drum",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Jumping",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can cast Jump from it, but can target only yourself when you do so.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Mind Shielding",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type. Creatures can telepathically communicate with you only if you allow it.\nYou can take a Magic action to cause the ring to become imperceptible until you take another Magic action to make it perceptible, until you remove the ring, or until you die.\nIf you die while wearing the ring, your soul enters it, unless it already houses a soul. You can remain in the ring or depart for the afterlife. As long as your soul is in the ring, you can telepathically communicate with any creature wearing it. A wearer can't prevent this telepathic communication.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Obscuring",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you can use an action to cast the fog cloud spell from it. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring Of Puzzler's Wit",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you have advantage on Intelligence checks made to solve puzzles.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Swimming",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nYou have a Swim Speed of 40 feet while wearing this ring.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of the Orator",
        "category": "magic-item",
        "type": "other",
        "description": "6 charges. Expend 1 to project your voice clearly to all creatures within 1 mile for 1 minute. Creatures can understand you regardless of language. Regains 1d6 charges at dawn. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Truth Telling",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you can use an action to cast the zone of truth spell from it. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Warmth",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nIf you take Cold damage while wearing this ring, the ring reduces the damage you take by 2d8.\nIn addition, while wearing this ring, you and everything you wear and carry are unharmed by temperatures of 0 degrees Fahrenheit or lower.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Water Walking",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you cast Water Walk from it, targeting only yourself.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Rings of Shared Suffering",
        "category": "magic-item",
        "type": "other",
        "description": "These rings come in pairs. When you take damage while wearing one ring, the wearer of the other ring takes half that damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Robe of Serpents",
        "category": "magic-item",
        "type": "other",
        "description": "This robe is covered in embroidered serpents. While wearing it, you can use an action to cast the animal friendship spell (save DC 15) on a snake within 30 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Robe of Useful Items",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis robe has cloth patches of various shapes and colors covering it. While wearing the robe, you can take a Magic action to detach one of the patches, causing it to become the object or creature it represents. Once the last patch is removed, the robe becomes an ordinary garment.The robe has two of each of the following patches:• Bullseye Lantern (filled and lit)• Dagger• Mirror• Pole• Rope (coiled)• SackIn addition, the robe has 4d4 other patches. The GM chooses the patches or determines them randomly by rolling on the following table.1d100  Patch 01-08 Bag of 100 GP   09-15 Silver coffer (1 foot long, 6 inches wide anddeep) worth 500 GP23-30  10 gems worth 100 GP each 31-44 Wooden ladder (24 feet long)   45-51 Riding Horse with a Riding Saddle60-68  4 Potions of Healing 69-75 Rowboat (12 feet long)   76-83 Spell Scroll containing one spell of level 1, 2, or3 (your choice) 84-90  2 Mastiffs  91-96 Window (2 feet by 4 feet, up to 2 feet deep), which you can place on a vertical surface you can reach 97-00  Portable Ram",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of Retribution",
        "category": "magic-item",
        "type": "other",
        "description": "This rod can store spells. When you cast a spell while holding it, you can choose to store the spell in the rod. You can later use an action to cast the stored spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rod of the Pact Keeper, +1, +2, +3",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rope of Climbing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis 60-foot length of rope can hold up to 3,000 pounds. While holding one end of the rope, you can take a Magic action to command the other end of the rope to animate and move toward a destination you choose, up to the rope's length away from you. That end moves 10 feet on your turn when you first command it and 10 feet at the start of each of your subsequent turns until reaching its destination or until you tell it to stop. You can also tell the rope to fasten itself securely to an object or to unfasten itself, to knot or unknot itself, or to coil itself for carrying.\nIf you tell the rope to knot, large knots appear at 1-foot intervals along the rope. While knotted, therope shortens to a 50-foot length and grants Advantage on ability checks made to climb using the rope. The rope has AC 20, HP 20, and Immunity to Poison and Psychic damage. It regains 1 Hit Point every5 minutes as long as it has at least 1 Hit Point. If the rope drops to 0 Hit Points, it is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Saddle of the Cavalier",
        "category": "magic-item",
        "type": "other",
        "description": "While in this saddle on a mount, you can't be dismounted against your will. In addition, the mount's AC can't be less than 13 while you're riding it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scaled Ornament",
        "category": "magic-item",
        "type": "other",
        "description": "This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Seeker Dart",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "piercing",
        "properties": [
            "finesse",
            "thrown",
            "range (20/60)"
        ],
        "description": "When you throw this dart, it magically seeks out a target you can see within 120 feet. The dart has a +3 bonus to attack and damage rolls.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sending Stones",
        "category": "magic-item",
        "type": "other",
        "description": "Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is obvious. While you touch one stone, you can use an action to cast the sending spell from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sensory Stone",
        "category": "magic-item",
        "type": "other",
        "description": "This stone can store sensory experiences. When you touch it, you can experience the sensations stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sentinel Shield",
        "category": "magic-item",
        "type": "shield",
        "baseAC": 2,
        "description": "While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Serpent Scale Armor",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 14,
        "description": "This armor is made from the scales of a serpent. While wearing it, you have resistance to poison damage and advantage on saving throws against being poisoned.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shatterspike",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "versatile"
        ],
        "description": "When you hit an object with this weapon, the attack deals maximum damage to the object.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield, +1, +2, +3",
        "category": "magic-item",
        "type": "shield",
        "baseAC": 3,
        "description": "While holding this shield, you have a bonus to AC. The bonus is determined by the shield's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield Of The Tortoise",
        "category": "magic-item",
        "type": "shield",
        "baseAC": 2,
        "description": "While holding this shield, you can use a bonus action to gain a +2 bonus to AC until the start of your next turn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Silverquill Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge from Silverquill College. While holding it, you have advantage on Charisma (Persuasion) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Skyblinder Staff",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "This staff can be used as a spellcasting focus. While holding it, you can use an action to cast the blindness/deafness spell from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sling Of Giant Felling",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "bludgeoning",
        "properties": [
            "ammunition",
            "range (30/120)"
        ],
        "description": "When you hit a giant with this sling, the giant must succeed on a Strength saving throw or be knocked prone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Slippers of Spider Climbing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear these light shoes, you can move up, down, and across vertical surfaces and along ceilings, while leaving your hands free. You have aClimb Speed equal to your Speed. However, the slippers don't allow you to move this way on a slippery surface, such as one covered by ice or oil.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Smokepowder",
        "category": "magic-item",
        "type": "other",
        "description": "This black powder can be used as ammunition for firearms. When ignited, it creates a loud explosion.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Soul Coin",
        "category": "magic-item",
        "type": "other",
        "description": "This coin contains a trapped soul. While holding it, you can use an action to release the soul, which then serves you for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Scroll",
        "category": "magic-item",
        "type": "other",
        "description": "A spell scroll contains a single spell that can be cast by a spellcaster who can read it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spellwrought Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spies' Murmur",
        "category": "magic-item",
        "type": "other",
        "description": "This item allows you to communicate silently. While holding it, you can use an action to send a telepathic message to a creature you can see within 60 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of the Adder",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "You can use a bonus action to speak this staff's command word and cause the head of the staff to transform into that of an animate serpent for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of the Python",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "Staff\nAs a Magic action, you can throw this staff so that it lands in an unoccupied space within 10 feet of you, causing the staff to become a Giant Constrictor Snake in that space. The snake is under your control and shares your Initiative count, taking its turn immediately after yours.\nOn your turn, you can mentally command the snake (no action required) if it is within 60 feet of you and you don't have the Incapacitated condition. You decide what action the snake takes and where it moves during its turn, or you can issue it a general command, such as to attack your enemies or guard a location. Absent commands from you, the snake defends itself.\nAs a Bonus Action, you can command the snake to revert to staff form in its current space, and you can't use the staff's property again for 1 hour. If the snake is reduced to 0 Hit Points, it dies and reverts to its staff form; the staff then shatters and is destroyed. If the snake reverts to staff form before losing all its Hit Points, it regains all of them.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Stone of Good Luck (Luckstone)",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Stone of Ill Luck",
        "category": "magic-item",
        "type": "other",
        "description": "While this stone is on your person, you have disadvantage on ability checks and saving throws. You cannot willingly part with the stone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Storm Boomerang",
        "category": "magic-item",
        "type": "weapon",
        "description": "This boomerang can be thrown and returns to you. When you hit a creature with it, you can choose to deal extra lightning damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sword of Vengeance",
        "category": "magic-item",
        "type": "weapon",
        "description": "You gain a +1 bonus to attack and damage rolls made with this magic weapon. When a creature damages you, the sword becomes attuned to that creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Thessaltoxin Antidote",
        "category": "magic-item",
        "type": "other",
        "description": "A character who drinks this vial is cured of thessaltoxin poisoning if they are currently poisoned.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Trident of Fish Command",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Trident)\nThis magic weapon has 3 charges, and it regains 1d3 expended charges daily at dawn. While you carry it, you can expend 1 charge to cast Dominate Beast (save DC 15) from it on a Beast that has a Swim Speed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Entangle",
        "category": "magic-item",
        "type": "other",
        "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the entangle spell (save DC 15) from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Magic Detection",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 3 charges. While holding it, you can expend 1 charge to cast Detect Magic from it. The wand regains 1d3 expended charges daily at dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Magic Missiles",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can expend no more than 3 charges to cast Magic Missile from it. For 1 charge, you cast the level 1 version of the spell. You can increase the spell's level by 1 for each additional charge you expend.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expend the wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Secrets",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 3 charges and regains 1d3 expended charges daily at dawn. While holding it, you can take a Magic action to expend 1 charge, and if a secret door or trap is within 60 feet of you, the wand pulses and points at the one nearest to you.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of the War Mage",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Web",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can expend 1 charge to cast Web (save DC 13) from it.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Weapon, +1, +2, or +3",
        "category": "magic-item",
        "type": "weapon",
        "description": "You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Weapon of Warning",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile"
        ],
        "description": "Weapon (Any Simple or Martial)\nAs long as this weapon is within your reach and you are attuned to it, you and allies within 30 feet of you gain the following benefits.\nAlarm. The weapon magically awakens each subject who is sleeping naturally when combat begins. This benefit doesn't wake a subject from magically induced sleep.\nSupernatural Readiness. Each subject has Advantage on its Initiative rolls.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wheel of Wind and Water",
        "category": "magic-item",
        "type": "other",
        "description": "This wheel can control wind and water. While holding it, you can use an action to cast the control water or control winds spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wildspace Orrery",
        "category": "magic-item",
        "type": "other",
        "description": "This orrery shows the positions of celestial bodies. While holding it, you always know your position relative to major stars and planets.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wind Fan",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile holding this fan, you can cast Gust of Wind (save DC 13) from it. Each subsequent time the fan is used before the next dawn, it has a cumulative 20 percent chance of not working; if the fan fails to work, it tears into useless, nonmagical tatters.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Winged Ammunition",
        "category": "magic-item",
        "type": "weapon",
        "description": "This piece of ammunition has small wings. When you fire it, it can change direction once to hit a target you can see.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Winged Boots",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese boots have 4 charges and regain 1d4 expended charges daily at dawn. While wearing the boots, you can take a Magic action to expend 1 charge, gaining a Fly Speed of 30 feet for 1 hour. If you are flying when the duration expires, you descend at a rate of 30 feet per round until you land.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Uncommon",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wingwear",
        "category": "magic-item",
        "type": "other",
        "description": "This clothing has wings attached. While wearing it, you have a flying speed equal to your walking speed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Witherbloom Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge from Witherbloom College. While holding it, you have advantage on Wisdom (Nature) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wraps Of Unarmed Prowess",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Acheron Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This blade is forged from metal found in the River of Blood. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Alchemical Compendium",
        "category": "magic-item",
        "type": "other",
        "description": "This book contains formulas for creating alchemical items. While holding it, you have advantage on Intelligence checks made to create alchemical items.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "All-Purpose Tool",
        "category": "magic-item",
        "type": "other",
        "description": "This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan's tool of your choice.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ammunition, +1, +2, or +3",
        "category": "magic-item",
        "type": "weapon",
        "description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of Health",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYour Constitution is 19 while you wear this amulet. It has no effect on you if your Constitution is 19 or higher without it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Amulet of Protection from Turning",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you are immune to being turned by clerics or paladins.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of the Devout",
        "category": "magic-item",
        "type": "other",
        "description": "This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arcane Grimoire",
        "category": "magic-item",
        "type": "other",
        "description": "While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor, +1, +2, or +3",
        "category": "magic-item",
        "type": "armor",
        "description": "You have a bonus to AC while wearing this armor. The bonus is determined by the armor's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor of Resistance",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Any Light, Medium, or Heavy)\nYou have Resistance to one type of damage while you wear this armor. The GM chooses the type or determines it randomly by rolling on the following table.1d10Damage Type1d10Damage Type1Acid6Necrotic2Cold7Poison3Fire8Psychic4Force9Radiant5Lightning10Thunder",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Armor of Vulnerability",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Any Light, Medium, or Heavy)\nWhile wearing this armor, you have Resistance to one of the following damage types: Bludgeoning, Piercing, or Slashing. The GM chooses the type or determines it randomly.\nCurse. This armor is cursed, a fact that is revealed only when the Identify spell is cast on the armor or you attune to it. Attuning to the armor curses you until you are targeted by a Remove Curse spell or similar magic; removing the armor fails to end the curse. While cursed, you have Vulnerability to two of the three damage types associated with the armor (not the one to which it grants Resistance).",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Arrow-Catching Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "Armor (Shield)\nYou gain a +2 bonus to Armor Class against ranged attack rolls while you wield this Shield. This bonus is in addition to the Shield's normal bonus to AC.\nWhenever an attacker makes a ranged attack roll against a target within 5 feet of you, you can take a Reaction to become the target of the attack instead.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Astral Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains astral energy. While holding it, you can use an action to cast the misty step spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Astromancy Archive",
        "category": "magic-item",
        "type": "other",
        "description": "This archive contains knowledge of the stars and planets. While holding it, you have advantage on Intelligence (Astronomy) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Atlas of Endless Horizons",
        "category": "magic-item",
        "type": "other",
        "description": "This atlas can show you any location in the multiverse. While holding it, you can use an action to view a location you have seen before.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Badge of the Watch",
        "category": "magic-item",
        "type": "other",
        "description": "This badge represents a watch organization. While wearing it, you have advantage on Charisma (Persuasion) checks made to interact with members of that organization.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bag of Beans",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis heavy cloth bag contains 3d4 dry beans when found. The bag weighs half a pound regardless of how many beans it contains and becomes a non-magical item when it no longer contains any beans.\nIf you dump one or more beans out of the bag, they explode in a 10-foot-radius Sphere centered on them. All the dumped beans are destroyed in the explosion, and each creature in the Sphere, including you, makes a DC 15 Dexterity saving throw, taking 5d4 Force damage on a failed save or half as much damage on a successful one.\nIf you remove a bean from the bag, plant it in dirt or sand, and then water it, the bean disappears as it produces an effect 1 minute later from the ground where it was planted. The GM can choose an effect from the following table or determine it randomly. 1d100 Effect 1d100 Effect 21-30 An animate but immobile stone statue in your likeness rises and makes verbal threats against you. If you leave it and others come near, it describes you as the most heinous of villains and directs the newcomers to find and attack you. If you are on the same plane of existence as the statue, it knows whereyou are. The statue becomes inanimate after 24 hours.41-50  Three Shrieker Fungi sprout.61-70  A hungry Bulette burrows up and attacks.81-90  A nest of 1d4 + 3 rainbow-colored eggs springs up. Any creature that eats an egg makes a DC 20 Constitution saving throw. On a successful save, a creature permanently increases its lowest ability score by 1, randomly choosing among equally low scores.On a failed save, the creature takes 10d6 Force damage from an internal explosion.96-00  A giant beanstalk sprouts, growing to a height of the GM's choice. The top leads where the GM chooses, such as to a great view, a cloud giant's castle, or another plane of existence.02-10  A geyser erupts and spouts water, beer, mayonnaise, tea, vinegar, wine, or oil (GM's choice) 30 feet into the air for 1d4 minutes.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Banner of the Krig Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This banner bears the Krig rune. While holding it, you can use an action to cast the bless spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Barrier Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Battering Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you can use a bonus action to shove a creature within 5 feet of you. If you succeed, the creature is pushed 5 feet away from you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bead of Force",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis small black sphere measures 3/4 of an inch in diameter and weighs an ounce. Typically, 1d4 + 4 Beads of Force are found together.\nYou can take a Magic action to throw the bead up to 60 feet. The bead explodes in a 10-foot-radius Sphere on impact and is destroyed. Each creature in the Sphere must succeed on a DC 15 Dexterity saving throw or take 5d4 Force damage. A sphere of transparent force then encloses the area for 1 minute. Any creature that failed the save and is completely within the area is trapped inside this sphere. Creatures that succeeded on the save or are partially within the area are pushed away from the center of the sphere until they are no longer insideit. Only breathable air can pass through the sphere's wall. No attack or other effect can pass through.\nAn enclosed creature can take a Utilize action to push against the sphere's wall, moving the sphere up to half the creature's Speed. The sphere can be picked up, and its magic causes it to weigh only 1 pound, regardless of the weight of creatures inside.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Bell Branch",
        "category": "magic-item",
        "type": "other",
        "description": "This branch has small bells attached. When you shake it, you can cast the calm emotions spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Belt of Dwarvenkind",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this belt, you gain the followingbenefits:Dwarvish. You know Dwarvish.Friend of Dwarvenkind. You have Advantage on Charisma (Persuasion) checks made to interact with dwarves and duergar.Toughness. Your Constitution increases by 2, to a maximum of 20.In addition, while attuned to the belt, you have a 50 percent chance each day at dawn of growing a full beard if you can grow one, or a thicker beard if you already have one.If you aren't a dwarf or duergar, you gain the following additional benefits while wearing the belt:Darkvision. You have Darkvision with a range of 60 feet.Resilience. You have Resistance to Poison damage. You also have Advantage on saving throws you make to avoid or end the Poisoned condition.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Belt of Giant Strength",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Berserker Axe",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Battleaxe, Greataxe, or Halberd)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your Hit Point maximum increases by 1 for each level you have attained.\nCurse. This weapon is cursed, and becoming attuned to it extends the curse to you. As long as you remain cursed, you are unwilling to part with the weapon, keeping it within reach at all times. You also have Disadvantage on attack rolls with weapons other than this one.\nWhenever another creature damages you while the weapon is in your possession, you must succeed on a DC 15 Wisdom saving throw or go berserk. This berserk state ends when you start your turn and there are no creatures within 60 feet of you that you can see or hear.\nWhile berserk, you regard the creature nearest to you that you can see or hear as your enemy. If there are multiple possible creatures, choose one at random. On each of your turns, you must move asclose to the creature as possible and take the Attack action, targeting the creature. If you're unable to get close enough to the creature to attack it with the weapon, your turn ends after you've used up all your available movement. If the creature dies or can no longer be seen or heard by you, the next nearest creature that you can see or hear becomes your new target.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Blod Stone",
        "category": "magic-item",
        "type": "other",
        "description": "This stone is stained with blood. While holding it, you can use an action to cast the blood curse spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodwell Vial",
        "category": "magic-item",
        "type": "other",
        "description": "This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bonecounter",
        "category": "magic-item",
        "type": "other",
        "description": "This item can count bones. While holding it, you can use an action to determine the number of bones within 30 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Boots of Levitation",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear these boots, you can cast Levitate on yourself.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Boots of Speed",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear these boots, you can take a Bonus Action to click the boots' heels together. If you do, the boots double your Speed, and any creature that makes an Opportunity Attack against you has Disadvantage on the attack roll. If you click your heels together again, you end the effect.\nWhen you've used the boots' property for a total of 10 minutes, the magic ceases to function for you until you finish a Long Rest.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bow Of Conflagration",
        "category": "magic-item",
        "type": "weapon",
        "description": "When you hit a creature with this bow, you can choose to deal extra fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bowl of Commanding Water Elementals",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile this bowl is filled with water and you are within 5 feet of it, you can take a Magic action to summon a Water Elemental. The elemental appears in an unoccupied space as close to the bowl as possible, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The bowl can't be used this way again until the next dawn.\nThe bowl is about 1 foot in diameter and half as deep. It holds about 3 gallons.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Bracer of Flying Daggers",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this bracer, you can use a bonus action to cause a dagger to fly from it and attack a target within 30 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bracers of Celerity",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these lightweight bronze bracers, all your speeds increase by 10 feet, and you have advantage on saving throws you make to avoid or end the paralyzed or restrained condition on yourself. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bracers of Defense",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing these bracers, you gain a +2 bonus to Armor Class if you are wearing no armor and using no Shield.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Brazier of Commanding Fire Elementals",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you are within 5 feet of this brazier, you can take a Magic action to summon a Fire Elemental. The elemental appears in an unoccupied space as close to the brazier as possible, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The brazier can't be used this way again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Breastplate Of Balance",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have advantage on saving throws against being knocked prone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bridle of Capturing",
        "category": "magic-item",
        "type": "other",
        "description": "This bridle can be used to capture and control a mount. When placed on a willing beast, the beast becomes your mount and follows your commands.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Butcher's Bib",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this bib, you have advantage on attack rolls against creatures that are bleeding.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cape of the Mountebank",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis cape smells faintly of brimstone. While wearing it, you can use it to cast Dimension Door as a Magic action. This property can't be used again until the next dawn.\nWhen you teleport with that spell, you leave behind a cloud of smoke. The space you left is Lightly Obscured by that smoke until the end of yournext turn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Cauldron of Plenty",
        "category": "magic-item",
        "type": "other",
        "description": "This cauldron can produce food. You can use an action to cause it to create enough food to feed up to 10 people for one day.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Censer of Controlling Air Elementals",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile gently swinging this censer, you can take a Magic action to summon an Air Elemental. The elemental appears in an unoccupied space as close to the censer as possible, understands your languages, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The censer can't be used this way again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Charm of Plant Command",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this charm, you can use an action to cast the speak with plants spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Chime of Opening",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis hollow metal tube measures about 1 foot long and weighs 1 pound. As a Magic action, you can strike the chime to cast Knock. The spell's customary knocking sound is replaced by the clear, ringing tone of the chime, which is audible out to 300 feet.\nThe chime can be used 10 times. After the tenth time, it cracks and becomes useless.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Chromatic Rose",
        "category": "magic-item",
        "type": "other",
        "description": "This rose changes color based on the emotions of nearby creatures. While holding it, you can use an action to determine the emotional state of creatures within 30 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Claw of the Wyrm Rune",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a wyrm. When you hit a creature with it, you can choose to deal extra damage of a type determined by the wyrm's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Claws of the Umber Hulk",
        "category": "magic-item",
        "type": "weapon",
        "description": "These claws are taken from an umber hulk. While wearing them, you can use an action to make a melee attack with them.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Displacement",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile you wear this cloak, it magically projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have Disadvantage on attack rolls against you. If you take damage, the property ceases to function until the start of your next turn. This property is suppressed while your Speed is 0.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Cloak of the Bat",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this cloak, you have Advantage on Dexterity (Stealth) checks. In an area of Dim Light or Darkness, you can grip the edges of the cloak and use it to gain a Fly Speed of 40 feet. If you ever fail to grip the cloak's edges while flying in this way, or if you are no longer in Dim Light or Darkness, you lose this Fly Speed.\nWhile wearing the cloak in an area of Dim Light or Darkness, you can cast Polymorph on yourself, shape-shifting into a Bat. While in that form, you retain your Intelligence, Wisdom, and Charisma scores. The cloak can't be used this way again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Corpse Slayer",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon deals extra damage to undead creatures. When you hit an undead creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crown of the Wrath Bringer",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this crown, you have advantage on Charisma (Intimidation) checks. In addition, you can use an action to cast the fear spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crystal Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This blade is made of crystal. When you hit a creature with it, you can choose to deal extra force damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cube of Force",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis cube is about an inch across. Each face has a distinct marking on it. You can press one of those faces, expend the number of charges required for it, and thereby cast the spell associated with it (save DC 17), as shown in the Cube of Force Faces table.\nThe cube starts with 10 charges, and it regains 1d6 expended charges daily at dawn.Cube of Force FacesSpellCharge CostMage Armor1Shield1Tiny Hut3Private Sanctum4Resilient Sphere4Wall of Force5",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Daern's Instant Fortress",
        "category": "magic-item",
        "type": "other",
        "description": "You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dagger of Blindsight",
        "category": "magic-item",
        "type": "weapon",
        "description": "While holding this dagger, you have blindsight out to a range of 10 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dagger of Venom",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Dagger)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.\nYou can take a Bonus Action to magically coat the blade with poison. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 Poison damage and have the Poisoned condition for 1 minute. The weapon can't be used this way again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Deck Of Oracles",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that can answer questions about the future. When you draw a card, you can ask it a question and receive an answer.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Delver's Claws",
        "category": "magic-item",
        "type": "weapon",
        "description": "These claws are designed for digging. While wearing them, you have a burrowing speed of 10 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Demon Skin",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the skin of a demon. While wearing it, you have resistance to fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Devotee's Censer",
        "category": "magic-item",
        "type": "other",
        "description": "This censer can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your cleric spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dimensional Shackles",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYou can take a Utilize action to place these shackles on a creature that has the Incapacitated condition. The shackles adjust to fit a creature of Small to Large size. The shackles prevent a creature bound by them from using any method of extradimensional movement, including teleportation or travel to a different plane of existence. They don't prevent the creature from passing through an interdimensional portal.\nYou and any creature you designate when you use the shackles can take a Utilize action to remove them. Once every 30 days, the bound creature can make a DC 30 Strength (Athletics) check. On a suc-cessful check, the creature breaks free and destroys the shackles.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Docent",
        "category": "magic-item",
        "type": "other",
        "description": "This item can provide guidance and instruction. While holding it, you have advantage on Intelligence checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dodecahedron of Doom",
        "category": "magic-item",
        "type": "other",
        "description": "This 12-sided die is cursed. When you roll it, you must make a saving throw or suffer a random effect.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Donjon's Sundering Sphere",
        "category": "magic-item",
        "type": "other",
        "description": "This sphere can be used to destroy objects. When you throw it at an object, the object takes maximum damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Slayer",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Simple or Martial)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.\nThe weapon deals an extra 3d6 damage of the weapon's type if the target is a Dragon.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Dragonguard",
        "category": "magic-item",
        "type": "armor",
        "armorMethod": "medium",
        "baseAC": 16,
        "description": "+1 breastplate. You gain a +1 bonus to AC while wearing this armor.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Vessel",
        "category": "magic-item",
        "type": "other",
        "description": "This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Wing Bow",
        "category": "magic-item",
        "type": "weapon",
        "description": "This bow is made from the wing of a dragon. When you hit a creature with it, you can choose to deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragonhide Belt",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon's Wrath Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragontooth Dagger",
        "category": "magic-item",
        "type": "weapon",
        "description": "This dagger is made from a dragon's tooth. When you hit a creature with it, you can choose to deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon-Touched Focus",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Duplicitous Manuscript",
        "category": "magic-item",
        "type": "other",
        "description": "This manuscript can change its contents. While holding it, you can use an action to cause it to display different text.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Eagle Whistle",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this whistle, you can summon an eagle. The eagle serves you for 1 hour or until it is reduced to 0 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Elemental Essence Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains the essence of an element. While holding it, you can use an action to cast a spell related to that element.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Elixir of Health",
        "category": "magic-item",
        "type": "other",
        "description": "When you drink this elixir, it cures any disease afflicting you. The clear red liquid has tiny bubbles of light in it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Elven Chain",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Chain Mail or Chain Shirt)\nYou gain a +1 bonus to Armor Class while you wear this armor. You are considered trained with this armor even if you lack training with Medium or Heavy armor.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Far Realm Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains energy from the Far Realm. While holding it, you can use an action to cast a spell that deals psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fate Dealer's Deck",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Feather of Diatryma Summoning",
        "category": "magic-item",
        "type": "other",
        "description": "When you use an action to throw this feather, it summons a diatryma. The bird serves you for 1 hour or until it is reduced to 0 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Feywrought Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made in the Feywild. While wearing it, you have advantage on saving throws against being charmed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Figurine of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Flame Tongue",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Melee Weapon)\nWhile holding this magic weapon, you can take a Bonus Action and use a command word to cause flames to engulf the damage-dealing part of the weapon. These flames shed Bright Light in a 40foot radius and Dim Light for an additional 40 feet. While the weapon is ablaze, it deals an extra 2d6 Fire damage on a hit. The flames last until you take a Bonus Action to issue the command again or until you drop, stow, or sheathe the weapon.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Flayer Slayer",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d12",
        "damageType": "slashing",
        "properties": [
            "heavy",
            "two-handed"
        ],
        "description": "Weapon (greataxe). +1 bonus to attack and damage. An Aberration hit takes an extra 1d12 slashing damage. If the Aberration is grappling a creature, it must succeed on a DC 15 Strength save or release each creature it is grappling. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Flying Chariot",
        "category": "magic-item",
        "type": "other",
        "description": "This chariot can fly through the air. While riding it, you have a flying speed of 60 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Folding Boat",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis object appears as a wooden box that measures 12 inches long, 6 inches wide, and 6 inches deep.It weighs 4 pounds and floats. It can be opened to store items inside. This item also has three command words, each requiring a Magic action to use:First Command Word. The box unfolds into a Rowboat.Second Command Word. The box unfolds into a Keelboat.Third Command Word. The Folding Boat folds back into a box if no creatures are aboard. Any objects in the vessel that can't fit inside the box remain outside the box as it folds. Any objects in the vessel that can fit inside the box do so.When the box becomes a vessel, its weight becomes that of a normal vessel its size, and anything that was stored in the box remains in the boat.\nStatistics for the Rowboat and Keelboat appear in \"Equipment.\" If either vessel is reduced to 0 Hit Points, the Folding Boat is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Fulminating Treatise",
        "category": "magic-item",
        "type": "other",
        "description": "This book can explode. When you open it, you can use an action to cause it to explode, dealing fire damage to creatures within 10 feet of it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Galder's Bubble Pipe",
        "category": "magic-item",
        "type": "other",
        "description": "While smoking this pipe, you can use an action to blow bubbles that create harmless visual effects.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gambler's Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon's damage is unpredictable. When you hit with it, you roll an additional die to determine the damage type.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gauntlets of Flaming Fury",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these gauntlets, your unarmed strikes deal fire damage instead of bludgeoning damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gavel of the Venn Rune",
        "category": "magic-item",
        "type": "weapon",
        "description": "This gavel bears the Venn rune. When you strike it, you can cast the command spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gem of Seeing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis gem has 3 charges. As a Magic action, you can expend 1 charge. For the next 10 minutes, you have Truesight out to 120 feet when you peer through the gem.\nThe gem regains 1d3 expended charges daily at dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ghost Lantern",
        "category": "magic-item",
        "type": "other",
        "description": "While this lantern is lit, it sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern's bright light.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Giant Slayer",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Simple or Martial)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.\nWhen you hit a Giant with this weapon, the Giant takes an extra 2d6 damage of the weapon's type and must succeed on a DC 15 Strength saving throw or have the Prone condition.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Glamoured Studded Leather",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Studded Leather Armor)\nWhile wearing this armor, you gain a +1 bonus to Armor Class. You can also take a Bonus Action tocause the armor to assume the appearance of a normal set of clothing or some other kind of armor. You decide what it looks like-including color, style, and accessories-but the armor retains its normal bulk and weight. The illusory appearance lasts until you use this property again or doff the armor.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Glimmering Moonbow",
        "category": "magic-item",
        "type": "weapon",
        "description": "This bow glimmers with moonlight. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gloomwrought Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made in the Shadowfell. While wearing it, you have advantage on Dexterity (Stealth) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Glowrune Pigment",
        "category": "magic-item",
        "type": "other",
        "description": "This pigment can be used to create glowing marks. When you paint with it, the marks glow with dim light in a 5-foot radius.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Grasping Whip",
        "category": "magic-item",
        "type": "weapon",
        "description": "This whip can grapple creatures. When you hit a creature with it, you can use a bonus action to attempt to grapple the target.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Guild Keyrune",
        "category": "magic-item",
        "type": "other",
        "description": "This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gulthias Staff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff is made from the wood of a blighted tree. While holding it, you can use an action to cast the blight spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Heart Weaver's Primer",
        "category": "magic-item",
        "type": "other",
        "description": "This primer contains knowledge of emotions and relationships. While holding it, you have advantage on Charisma (Persuasion) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hell Hound Cloak",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you have resistance to fire damage. In addition, you can use an action to cast the fireball spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Helm of Teleportation",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis helm has 3 charges. While wearing it, you can expend 1 charge to cast Teleport from it. The helm regains 1d3 expended charges daily at dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Helm of the Gods",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you have advantage on saving throws against being charmed or frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hew",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "slashing",
        "properties": [
            "versatile"
        ],
        "description": "+1 battleaxe. You gain a +1 bonus to attack and damage rolls made with this magic weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Heward's Handy Haversack",
        "category": "magic-item",
        "type": "other",
        "description": "This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hook of Fisher's Delight",
        "category": "magic-item",
        "type": "other",
        "description": "This hook can be used to catch fish. While holding it, you have advantage on Wisdom (Survival) checks made to catch fish.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Blasting",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYou can take a Magic action to blow the horn, which emits a thunderous blast in a 30-foot Cone that is audible out to 600 feet. Each creature in the Cone makes a DC 15 Constitution saving throw. On a failed save, a creature takes 5d8 Thunder damage and has the Deafened condition for 1 minute. On a successful save, a creature takes half as much damage only. Glass or crystal objects in the Cone that aren't being worn or carried take 10d8 Thunder damage.\nEach use of the horn's magic has a 20 percent chance of causing the horn to explode. The explosion deals 10d6 Force damage to the user and destroys the horn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Horn of the Endless Maze",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this horn, you can create a maze. Creatures within 30 feet of you must succeed on a Wisdom saving throw or become lost.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horseshoes of Speed",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese horseshoes come in a set of four. As a Magic action, you can touch one of the horseshoes to the hoof of a horse or similar creature, whereupon the horseshoe affixes itself to the hoof. Removing a horseshoe also takes a Magic action.\nWhile all four horseshoes are attached to the same creature, its Speed is increased by 30 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Iggwylv's Horn",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this horn, you can summon fey creatures. The creatures serve you for 1 hour or until they are reduced to 0 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of the Bards",
        "category": "magic-item",
        "type": "other",
        "description": "An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ioun Stone",
        "category": "magic-item",
        "type": "other",
        "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Iron Bands of Bilarro",
        "category": "magic-item",
        "type": "other",
        "description": "This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Kagonesti Forest Shroud",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this shroud, you have advantage on Dexterity (Stealth) checks made in forest terrain.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Knave's Eye Patch",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this eye patch, you have advantage on Wisdom (Perception) checks that rely on sight. However, you have disadvantage on attack rolls against targets more than 30 feet away.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lash of Immolation",
        "category": "magic-item",
        "type": "weapon",
        "description": "This whip is wreathed in flames. When you hit a creature with it, you can choose to deal extra fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Leather Golem Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the hide of a golem. While wearing it, you have resistance to nonmagical bludgeoning, piercing, and slashing damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lightbringer",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [],
        "description": "+1 mace. You gain a +1 bonus to attack and damage rolls. While holding it, you can use an action to cast the light spell from it. If you hit an undead with it, that target takes an extra 1d6 radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Libram of Souls and Flesh",
        "category": "magic-item",
        "type": "other",
        "description": "This book contains knowledge of necromancy. While holding it, you have advantage on Intelligence (Religion) checks made to understand undead.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Loadstone",
        "category": "magic-item",
        "type": "other",
        "description": "This stone is extremely heavy. While holding it, your movement speed is halved.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Luminous War Pick",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [],
        "description": "Weapon (war pick). +1 to attack and damage. As a bonus action while wielding it, you can cast the daylight spell, choosing a point on the war pick. Once used, cannot be used again until the next dawn. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lyre of Building",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this lyre, you can use an action to cast the fabricate spell from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mace of Disruption",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Mace)\nWhen you hit a Fiend or an Undead with this magic weapon, that creature takes an extra 2d6 Radiant damage. If the target has 25 Hit Points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed. On a successful save, the creature has the Frightened condition until the end of your next turn.\nLight. While you hold this weapon, it sheds Bright Light in a 20-foot radius and Dim Light for an additional 20 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mace of Smiting",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Mace)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon. The bonus increases to +3 when you use the weapon to attack a Construct.\nWhen you roll a 20 on an attack roll made with this weapon, the target takes an extra 7 Bludgeoning damage, or 14 Bludgeoning damage if it's a Construct. If a Construct has 25 Hit Points or fewer after taking this damage, it is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Mace of Terror",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Mace)\nThis magic weapon has 3 charges and regains 1d3 expended charges daily at dawn. While holding the weapon, you can take a Magic action and expend1 charge to release a wave of terror from it. Each creature of your choice within 30 feet of you must succeed on a DC 15 Wisdom saving throw or have the Frightened condition for 1 minute. While Frightened in this way, a creature must spend its turns trying to move as far away from you as it can, andit can't make Opportunity Attacks. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If it has nowhere it can move, the creature can take the Dodge action. At the end of each of its turns, a creature repeats the save, ending the effect on itself on a success.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mantle of Spell Resistance",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYou have Advantage on saving throws against spells while you wear this cloak.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mimir",
        "category": "magic-item",
        "type": "other",
        "description": "This item can answer questions. While holding it, you can use an action to ask it a question and receive an answer.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This blade deals psychic damage. When you hit a creature with it, you can choose to deal psychic damage instead of the weapon's normal damage type.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Crystal",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mind Lash",
        "category": "magic-item",
        "type": "weapon",
        "description": "This whip deals psychic damage. When you hit a creature with it, you can choose to deal psychic damage instead of the weapon's normal damage type.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mirror of the Past",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this mirror, you can use an action to view the past of a location or object you can see.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mizzium Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from mizzium, a rare metal. While wearing it, you have resistance to force damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mizzium Mortar",
        "category": "magic-item",
        "type": "other",
        "description": "This mortar can be used to create alchemical items. While holding it, you have advantage on Intelligence checks made to create alchemical items.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Molten Bronze Skin",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor appears to be made of molten bronze. While wearing it, you have resistance to fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moon Sickle",
        "category": "magic-item",
        "type": "weapon",
        "description": "This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Necklace of Fireballs",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis necklace has 1d6 + 3 beads hanging from it. You can take a Magic action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a level 3 Fireball (save DC 15).\nYou can hurl multiple beads, or even the whole necklace, at one time. When you do so, increase the damage of the Fireball by 1d6 for each bead after the first (maximum 12d6).",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Necklace of Prayer Beads",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis necklace has 1d4 + 2 magic beads made from aquamarine, black pearl, or topaz. It also has many nonmagical beads made from stones such as amber, bloodstone, citrine, coral, jade, pearl, or quartz. If a magic bead is removed from the necklace, that bead loses its magic.\nSix types of magic beads exist. The GM decides the type of each bead on the necklace or determines it randomly by rolling on the table below. A necklace can have more than one bead of the same type. To use one, you must be wearing the necklace. Each bead contains a spell that you can cast from it as a Bonus Action (using your spell save DC if a save is necessary). Once a magic bead's spell is cast, that bead can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Needle of Mending",
        "category": "magic-item",
        "type": "other",
        "description": "This needle can be used to repair objects. When you use it to sew, it can repair any damage to the object.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Oil of Etherealness",
        "category": "magic-item",
        "type": "other",
        "description": "Potion\nOne vial of this oil can cover one Medium or smaller creature, along with the equipment it's wearing and carrying (one additional vial is required for each size category above Medium). Applying the oil takes 10 minutes. The affected creature then gains the effect of the Etherealness spell for 1 hour.\nBeads of this cloudy, gray oil form on the outside of its container and quickly evaporate.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Opal of the Ild Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This opal bears the Ild rune. While holding it, you can use an action to cast the fireball spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of the Stein Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This orb bears the Stein rune. While holding it, you can use an action to cast the stone shape spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Outer Essence Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains energy from the Outer Planes. While holding it, you can use an action to cast a spell related to the Outer Planes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pariah's Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have disadvantage on Charisma (Persuasion) checks. However, you have advantage on saving throws against being charmed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Periapt of Proof against Poison",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis delicate silver chain has a brilliant-cut black gem pendant. While you wear it, you have Immunity to the Poisoned condition and Poison damage.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Piwafwi of Fire Resistance",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you have resistance to fire damage. In addition, you have advantage on Dexterity (Stealth) checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Planecaller's Codex",
        "category": "magic-item",
        "type": "other",
        "description": "This codex contains knowledge of the planes. While holding it, you have advantage on Intelligence (Arcana) checks made to understand planar travel.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Portable Hole",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\nYou can take a Magic action to unfold a Portable Hole and place it on or against a solid surface, whereupon the Portable Hole creates an extradimensional hole 10 feet deep. The cylindrical space within the hole exists on a different plane of existence, so it can't be used to create open passages. Any creature inside an open Portable Hole can exit the hole by climbing out of it.\nYou can take a Magic action to close a Portable Hole by taking hold of the edges of the cloth and folding it up. Folding the cloth closes the hole, and any creatures or objects within remain in the extradimensional space. No matter what's in it, the hole weighs next to nothing.\nIf the hole is folded up, a creature within the hole's extradimensional space can take an action to make a DC 10 Strength (Athletics) check. On a successful check, the creature forces its way out and appears within 5 feet of the Portable Hole. A closed Portable Hole holds enough air for 1 hour of breathing, divided by the number of breathing creatures inside.\nPlacing a Portable Hole inside an extradimensional space created by a Bag of Holding, Handy Haversack, or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate and not behind Total Cover is sucked through it and deposited ina random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Prehistoric Figurines of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Professor Orb",
        "category": "magic-item",
        "type": "other",
        "description": "This orb can provide instruction. While holding it, you have advantage on Intelligence checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Protective Verses",
        "category": "magic-item",
        "type": "other",
        "description": "This scroll contains protective verses. While holding it, you can use an action to cast the protection from evil and good spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Quaal's Feather Token",
        "category": "magic-item",
        "type": "other",
        "description": "This small, fluffy feather can be activated to create various effects, such as a tree, a bird, or a fan. Each token has a specific effect.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Reveler's Concertina",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this concertina, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rhythm Maker's Drum",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Animal Influence",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nThis ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can expend 1 charge to cast one of the following spells (save DC 13) from it:• Animal Friendship• Fear (affects Beasts only)• Speak with Animals",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Evasion",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nThis ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing the ring, you can take a Reaction to expend 1 charge to succeed on that save instead.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Feather Falling",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhen you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Free Action",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile you wear this ring, Difficult Terrain doesn't cost you extra movement. In addition, magic can neither reduce any of your Speeds nor cause you to have the Paralyzed or Restrained condition.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Protection",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nYou gain a +1 bonus to Armor Class and saving throws while wearing this ring.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Resistance",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nYou have Resistance to one damage type while wearing this ring. The gemstone in the ring indicates the type, which the GM chooses or determines randomly by rolling on the following table.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Spell Storing",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nThis ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time. When found, it contains 1d6 1 levels of stored spells chosen by the GM.\nAny creature can cast a spell of level 1 through 5 into the ring by touching the ring as the spell is cast. The spell has no effect other than to be stored in the ring. If the ring can't hold the spell, the spell is expended without effect. The level of the slot used to cast the spell determines how much space it uses.\nWhile wearing this ring, you can cast any spell stored in it. The spell uses the slot level, spell save DC, spell attack bonus, and spellcasting ability of the original caster but is otherwise treated as if you cast the spell. The spell cast from the ring is no longer stored in it, freeing up space.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Temporal Salvation",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you can use a reaction to reroll a saving throw you just made. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of the Ram",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nThis ring has 3 charges and regains 1d3 expended charges daily at dawn. While wearing the ring, you can take a Magic action to expend 1 to 3 charges to make a ranged spell attack against one creature you can see within 60 feet of yourself. The ring produces a spectral ram's head and makes its attack roll with a +7 bonus. On a hit, for each charge you spend, the target takes 2d10 Force damage and is pushed 5 feet away from you.\nAlternatively, you can expend 1 to 3 of the ring's charges as a Magic action to try to break a nonmagical object you can see within 60 feet of yourself that isn't being worn or carried. The ring makesa Strength check with a +5 bonus for each charge you spend.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of X-Ray Vision",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can take a Magic action to gain X-ray vision with a range of 30 feet for 1 minute. To you, solid objects within that radius appear transparent and don't prevent light from passing through them. The vision can penetrate 1foot of stone, 1 inch of common metal, or up to 3 feet of wood or dirt. Thicker substances or a thin sheet of lead block the vision.\nWhenever you use the ring again before taking a Long Rest, you must succeed on a DC 15 Constitution saving throw or gain 1 Exhaustion level.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe of Eyes",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis robe is adorned with eyelike patterns. Whileyou wear the robe, you gain the following benefits:All-Around Vision. The robe gives you Advantage on Wisdom (Perception) checks that rely on sight.Special Senses. You have Darkvision and Truesight, both with a range of 120 feet.\nDrawbacks. A Light spell cast on the robe or a Daylight spell cast within 5 feet of the robe gives you the Blinded condition for 1 minute. At the end of each of your turns, you make a Constitution saving throw (DC 11 for Light or DC 15 for Daylight), ending the condition on yourself on a success.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe of Summer",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this robe, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rod of Rulership",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nYou can take a Magic action to present the rod and command obedience from each creature of your choice that you can see within 120 feet of yourself.Each target must succeed on a DC 15 Wisdom saving throw or have the Charmed condition for 8 hours. While Charmed in this way, the creature regards you as its trusted leader. If harmed by you or your allies or commanded to do something contrary to its nature, a target ceases to be Charmed in this way. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of the Pact Keeper, +1, +2, +3",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rod of the Vonindod",
        "category": "magic-item",
        "type": "other",
        "description": "This rod can be used to control constructs. While holding it, you can use an action to cast the animate objects spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rogue's Mantle",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mantle, you have advantage on Dexterity (Stealth) checks. In addition, you can use an action to cast the invisibility spell on yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rope of Entanglement",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis rope is 30 feet long. While holding one end of the rope, you can take a Magic action to command the other end to dart forward and entangle one creature you can see within 20 feet of yourself. The target must succeed on a DC 15 Dexterity saving throw or have the Restrained condition. You can release the target by letting go of your end of the rope (causing the rope to coil up in the target's space)or by using a Bonus Action to repeat the command (causing the rope to coil up in your hand).\nA target Restrained by the rope can take an action to make its choice of a DC 15 Strength (Athletics) or Dexterity (Acrobatics) check. On a successful check, the target is no longer Restrained by the rope. If you're still holding onto the rope when a target escapes from it, you can take a Reaction to command the rope to coil up in your hand; otherwise, the rope coils up in the target's space.\nThe rope has AC 20, HP 20, and Immunity to Poison and Psychic damage. It regains 1 Hit Point every 5 minutes as long as it has at least 1 Hit Point. If the rope drops to 0 Hit Points, it is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Ruinous Flail",
        "category": "magic-item",
        "type": "weapon",
        "description": "This flail deals extra damage to objects. When you hit an object with it, the attack deals maximum damage to the object.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sage's Signet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this signet, you have advantage on Intelligence checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Saint Markovia's Thighbone",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from the thighbone of Saint Markovia. When you hit an undead creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scaled Ornament",
        "category": "magic-item",
        "type": "other",
        "description": "This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scissors of Shadow Snipping",
        "category": "magic-item",
        "type": "other",
        "description": "These scissors can cut shadows. When you use them to cut a creature's shadow, that creature takes psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scorpion Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the carapace of a scorpion. While wearing it, you have resistance to poison damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Protection",
        "category": "magic-item",
        "type": "other",
        "description": "Using an action to read the scroll encloses you in an invisible barrier that extends from you to form a 5-foot-radius, 10-foot-tall cylinder.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Serpent's Fang",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from a serpent's fang. When you hit a creature with it, you can choose to deal extra poison damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shadowfell Brand Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo is branded with the power of the Shadowfell. While it is on your skin, you have resistance to necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shadowfell Shard",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains energy from the Shadowfell. While holding it, you can use an action to cast a spell that deals necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shard of Xeluan",
        "category": "magic-item",
        "type": "other",
        "description": "This shard contains the essence of Xeluan. While holding it, you can use an action to cast a spell related to Xeluan.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield, +1, +2, +3",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have a bonus to AC. The bonus is determined by the shield's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of Far Sight",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you can see twice as far as normal. In addition, you have advantage on Wisdom (Perception) checks that rely on sight.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of Missile Attraction",
        "category": "magic-item",
        "type": "shield",
        "description": "Armor (Shield)\nWhile holding this Shield, you have Resistance to damage from attacks made with Ranged weapons.\nCurse. This Shield is cursed. Attuning to it curses you until you are targeted by a Remove Curse spell or similar magic. Removing the Shield fails toend the curse on you. Whenever an attack with a Ranged weapon targets a creature within 10 feet of you, the curse causes you to become the target instead.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Shrieking Greaves",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these greaves, you can use a bonus action to cause them to emit a loud shriek. Each creature within 10 feet of you must make a Constitution saving throw or be deafened for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Siren Song Lyre",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this lyre, you can use an action to cast the suggestion spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Scroll",
        "category": "magic-item",
        "type": "other",
        "description": "A spell scroll contains a single spell that can be cast by a spellcaster who can read it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spelljamming Helm",
        "category": "magic-item",
        "type": "other",
        "description": "This helm can be used to control a spelljamming ship. While wearing it, you can use an action to move the ship through space.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spellwrought Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spider Staff",
        "category": "magic-item",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [
            "versatile"
        ],
        "description": "+1 quarterstaff. You can use an action to speak this staff's command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant spider under your control and acts on its own initiative count.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Charming",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 10 charges. While holding the staff, you can use any of its properties:Cast Spell. You can expend 1 of the staff's charges to cast Charm Person, Command, or Comprehend Languages from it using your spell save DC.Reflect Enchantment. If you succeed on a saving throw against an Enchantment spell that targets only you, you can take a Reaction to expend 1 charge from the staff and turn the spell back on its caster as if you had cast the spell.Resist Enchantment. If you fail a saving throw against an Enchantment spell that targets only you, you can turn your failed save into a successful one. You can't use this property of the staff again until the next dawn.\nRegaining Charges. The staff regains 1d8 + 2 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff crumbles to dust and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Defense",
        "category": "magic-item",
        "type": "weapon",
        "description": "While holding this staff, you have a +1 bonus to your Armor Class. The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: mage armor (1 charge) or shield (2 charges).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Healing",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 10 charges. While holding the staff, you can cast one of the spells on the following table from it, using your spellcasting ability modifier. The table indicates how many charges you must expend to cast the spell.Spell  Charge CostLesser Restoration  2\nRegaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff vanishes in a flash of light, lost forever.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Ruling",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: command (1 charge), compel duel (1 charge), or dominate person (5 charges).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Swarming Insects",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 10 charges.\nInsect Cloud. While holding the staff, you can take a Magic action and expend 1 charge to cause a swarm of harmless flying insects to fill a 30-footEmanation originating from you. The insects remain for 10 minutes, making the area Heavily Obscured for creatures other than you. A strong wind (like that created by Gust of Wind) disperses theSpellCharge Costswarm and ends the effect.\nSpells. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC and spell attack modifier. The table indicates how many charges you must expend to cast the spell.Spell  ChargeCostLightning Bolt (level 7 version)  7Passwall  5Protection from Evil and Good  0Wall of Fire  4Insect Plague  5\nRegaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, a swarm of insects consumes and destroys the staff, then disperses.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of the Ivory Claw",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff is made from the claw of an ivory dragon. While holding it, you can use an action to cast the cone of cold spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of the Rooted Hills",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff is made from the root of an ancient tree. While holding it, you can use an action to cast the entangle spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of the Woodlands",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 6 charges and can be wielded as a magic Quarterstaff that grants a +2 bonus to attack rolls and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.\nSpells. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.SpellChargeCostAnimal Friendship1Awaken5Barkskin2Locate Animals or Plants2Pass without Trace2Speak with Animals1Speak with Plants3Wall of Thorns6\nTree Form. You can take a Magic action to plant one end of the staff in earth in an unoccupied space and expend 1 charge to transform the staff intoa healthy tree. The tree is 60 feet tall and has a5-foot-diameter trunk, and its branches at the top spread out in a 20-foot radius. The tree appears ordinary but radiates a faint aura of Transmutation magic that can be discerned with the Detect Magic spell. While touching the tree and using a Magic action, you return the staff to its normal form. Any creature in the tree falls when the tree reverts toa staff.\nRegaining Charges. The staff regains 1d6 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff loses its properties and becomes a nonmagical Quarterstaff.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Withering",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 3 charges and regains 1d3 expended charges daily at dawn.\nThe staff can be wielded as a magic Quarterstaff. On a hit, it deals damage as a normal Quarterstaff, and you can expend 1 charge to deal an extra 2d10 Necrotic damage to the target and force it to make a DC 15 Constitution saving throw. On a failed save, the target has Disadvantage for 1 hour on any ability check or saving throw that uses Strength or Constitution.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Starshot Crossbow",
        "category": "magic-item",
        "type": "weapon",
        "description": "This crossbow fires bolts of starlight. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Stone of Controlling Earth Elementals",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile touching this 5-pound stone to the ground, you can take a Magic action to summon an Earth Elemental. The elemental appears in an unoccupied space you choose within 30 feet of yourself, obeys your commands, and takes its turn immediately after you on your Initiative count. The elemental disappears after 1 hour, when it dies, or when you dismiss it as a Bonus Action. The stone can't be used this way again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Stonespeaker Crystal",
        "category": "magic-item",
        "type": "other",
        "description": "This crystal can communicate with stone. While holding it, you can use an action to cast the speak with plants spell, but it only works on stone.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sun Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Longsword)\nThis item appears to be a sword hilt.\nBlade of Radiance. While grasping the hilt, you can take a Bonus Action to cause a blade of pure radiance to spring into existence or make theblade disappear. While the blade exists, this magic weapon functions as a Longsword with the Finesse property. If you are proficient with Longswords or Shortswords, you are proficient with the Sun Blade.\nYou gain a +2 bonus to attack rolls and damage rolls made with this weapon, which deals Radiant damage instead of Slashing damage. When you hit an Undead with it, that target takes an extra 1d8 Radiant damage.\nSunlight. The sword's luminous blade emits Bright Light in a 15-foot radius and Dim Light for an additional 15 feet. The light is sunlight. While the blade persists, you can take a Magic action to expand or reduce its radius of Bright Light and Dim Light by 5 feet each, to a maximum of 30 feet each or a minimum of 10 feet each.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sun Staff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff glows with sunlight. While holding it, you can use an action to cause it to shed bright light in a 30-foot radius.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sunforger",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon glows with the light of the sun. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sword of Life Stealing",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, Rapier, Scimitar, or Shortsword)\nWhen you attack a creature with this magic weapon and roll a 20 on the d20 for the attack roll, that target takes an extra 15 Necrotic damage if it isn'ta Construct or an Undead, and you gain Temporary Hit Points equal to the amount of Necrotic damage taken.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sword of Wounding",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, Rapier, Scimitar, or Shortsword)\nWhen you hit a creature with an attack using this magic weapon, the target takes an extra 2d6 Necrotic damage and must succeed on a DC 15Constitution saving throw or be unable to regain Hit Points for 1 hour. The target repeats the save at the end of each of its turns, ending the effect on itself on a success.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Teleportation Tablet",
        "category": "magic-item",
        "type": "other",
        "description": "This tablet can be used to teleport. When you activate it, you can cast the teleportation circle spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tentacle Rod",
        "category": "magic-item",
        "type": "weapon",
        "description": "Made by the drow, this rod is a magic weapon that ends in three rubbery tentacles. While holding the rod, you can use an action to direct each tentacle to attack a creature you can see within 15 feet of you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Two-Birds Sling",
        "category": "magic-item",
        "type": "weapon",
        "description": "When you make a ranged attack with this sling and hit a target, you can cause the ammunition to ricochet toward a second target within 10 feet of the first, and then make a ranged attack against the second target.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ventilating Lungs",
        "category": "magic-item",
        "type": "other",
        "description": "These lungs can filter air. While wearing them, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Vicious Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Simple or Martial)\nThis magic weapon deals an extra 2d6 damage to any creature it hits. This extra damage is of the same type as the weapon's normal damage.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Voidwalker Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the essence of the void. While wearing it, you have resistance to force damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Binding",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges.\nSpells. While holding the wand, you can cast one of the spells (save DC 17) on the following table from it. The table indicates how many charges you must expend to cast the spell.Spell  ChargeCostHold Person  2\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Enemy Detection",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can take a Magic action to expend 1 charge. For 1 minute, you know the direction of the nearest creature Hostile to you within 60 feet, but not its distance from you. The wand can sense the presence of Hostile creatures that are Invisible, ethereal, disguised, or hidden, as well as those in plain sight. The effect ends if you stop holding the wand.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Fear",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges.\nSpells. While holding the wand, you can cast one of the spells (save DC 15) on the following table from it. The table indicates how many charges you must expend to cast the spell.Charge",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Fireballs",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can expend no more than 3 charges to cast Fireball (save DC 15) from it. For 1 charge, you cast the level 3 version of the spell. You can increase the spell's level by 1 for each additional charge you expend.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Lightning Bolts",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can expend no more than 3 charges to cast Lightning Bolt (save DC 15) from it. For 1 charge, you cast the level 3 version of the spell. You can increase the spell's level by 1 for each additional charge you expend.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of Paralysis",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can take a Magic action to expend 1 charge to cause a thin blue ray to streak from the tip toward a creature you can see within 60 feet of yourself. The target must succeed on a DC 15 Constitution savingthrow or have the Paralyzed condition for 1 minute. At the end of each of the target's turns, it repeats the save, ending the effect on itself on a success.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of the War Mage",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Viscid Globs",
        "category": "magic-item",
        "type": "other",
        "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the web spell (save DC 15) from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Winter",
        "category": "magic-item",
        "type": "other",
        "description": "This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the cone of cold spell (save DC 15) from it. For 1 charge, you cast the 5th-level version of the spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Wonder",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can take a Magic action to expend 1 charge while choosing a point within 120 feet of yourself. Thatlocation becomes the point of origin of a spell or other magical effect determined by rolling on the Wand of Wonder Effects table. Spells cast from the wand have a save DC of 15. If a spell's maximum range is normally less than 120 feet, it becomes 120 feet when cast from the wand. If an effect has multiple possible subjects, the GM determines randomly which among them are affected.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into dust and is destroyed.Wand of Wonder Effects1d100  Effect61-64 Grass covers a 60-foot-radius circle of ground, with the center of that circle as close to the chosen point of origin as possible. Grass that's already there grows to ten times its normal size and remains overgrown for 1 minute.21-25 Nothing happens at the chosen point of origin. Instead, you have the Stunned condition until the start of your next turn, believing something awesome just happened.69-72 Nothing happens at the chosen point of origin. Instead, you shrink as if you had cast Enlarge/ Reduce on yourself and remain in that state for 1 minute.31-35  Nothing happens at the chosen point of origin. Instead, you take 1d6 Psychic damage.41-45  A cloud of 600 oversized butterflies fills a 60-foot-high, 30-foot-radius Cylinder centered on the chosen point of origin. The butterflies remain for 10 minutes, during which time the area of effect is Heavily Obscured.78-82 Nothing happens at the chosen point of origin. Instead, a burst of colorful, shimmering light extends from you in a 30-foot Emanation. Each creature in the area must succeed on a DC 15 Constitution saving throw or have the Blinded condition for 1 minute. A creature repeats the save at the end of each of its turns, ending the effect on itself on a success.51-55 The creature closest to the chosen point of origin is enlarged as if you had cast Enlarge/ Reduce on it. If the target isn't you and can't be affected by that spell, you become the target instead.88-92  Nothing happens at the chosen point of origin. Instead, a stream of 1d4 × 10 gems, each worth 1 GP, shoots from the wand's tip in a Line 30 feet long and 5 feet wide toward the chosen point of origin. Each gem deals 1 Bludgeoning damage, and the total damage of the gems is divided equally among all creatures in the Line.98-00 The creature closest to the chosen point of origin makes a DC 15 Constitution saving throw. On a failed save, the creature has the Restrained condition and begins to turn to stone. While Restrained in this way, the creature repeats the save at the end of its next turn. On a successful save, the effect ends. On a failed save, the creature has the Petrified condition instead of the Restrained condition. The petrification lasts until the creature is freed by the Greater Restoration spell or similar magic.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "War Horn of Valor",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this horn, all friendly creatures within 60 feet of you have advantage on attack rolls for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Warrior's Passkey",
        "category": "magic-item",
        "type": "other",
        "description": "This key can open any lock. When you use it to unlock a door, the door cannot be locked again for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wayfarer's Boots",
        "category": "magic-item",
        "type": "other",
        "description": "While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn't reduced if you are encumbered or wearing heavy armor.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Weapon of Certain Death",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of death. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Weird Tank",
        "category": "magic-item",
        "type": "other",
        "description": "This tank can store a weird. While holding it, you can use an action to release the weird, which then serves you for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wings of Flying",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this cloak, you can take a Magic action to turn the cloak into a pair of wings on your back. The wings lasts for 1 hour or until you end the effect early as a Magic action. The wings give you a Fly Speed of 60 feet. If you are aloft when the wings disappear, you fall. When the wings disappear, you can't use them again for 1d12 hours.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Woodcutter's Axe",
        "category": "magic-item",
        "type": "weapon",
        "description": "This axe deals extra damage to plants and wooden objects. When you hit a plant or wooden object with it, you can choose to deal maximum damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wraps Of Unarmed Prowess",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Zephyr Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the essence of wind. While wearing it, you have a flying speed of 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Abracadabrus",
        "category": "magic-item",
        "type": "other",
        "description": "This item can perform minor magical tricks. While holding it, you can use an action to cast the prestidigitation cantrip.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Absorbing Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo can absorb damage. When you take damage, you can use a reaction to reduce the damage by an amount equal to your proficiency bonus.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "All-Purpose Tool",
        "category": "magic-item",
        "type": "other",
        "description": "This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan's tool of your choice.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amethyst Lodestone",
        "category": "magic-item",
        "type": "other",
        "description": "This lodestone can attract metal objects. While holding it, you can use an action to cause metal objects within 30 feet of you to move toward you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ammunition, +1, +2, or +3",
        "category": "magic-item",
        "type": "weapon",
        "description": "You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of the Black Skull",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you have advantage on saving throws against necrotic damage. In addition, you can use an action to cast the animate dead spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of the Devout",
        "category": "magic-item",
        "type": "other",
        "description": "This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Amulet of the Planes",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile wearing this amulet, you can take a Magic action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence (Arcana) check. On a successful check, you cast Plane Shift. On a failed check, you and each creature and object within 15 feet of you travel toa random destination determined by rolling 1d100 and consulting the following table.1d100 Destination 01-60 Random location on the plane you named 61-70 Random location on an Inner Plane determined by rolling 1d6: on a 1, the Plane of Air; on a 2, the Plane of Earth; on a 3, the Plane of Fire; on a 4, the Plane of Water; on a 5, the Feywild; on a 6, the Shadowfell 81-90 Random location on an Outer Plane determined by rolling 1d8: on a 1, the Abyss; on a 2, Acheron; on a 3, Carceri; on a 4, Gehenna;on a 5, Hades; on a 6, Limbo; on a 7, the Nine Hells; on an 8, Pandemonium 91-00  Random location on the Astral Plane",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Animated Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "Armor (Shield)\nWhile holding this Shield, you can take a Bonus Action to cause it to animate. The Shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free. The Shield remains animate for 1 minute, until you take a Bonus Action to end this effect, or until you die or have the Incapacitated condition, at which point the Shield falls to the ground or into your hand if you have one free.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Antimagic Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have advantage on saving throws against spells. In addition, you can use an action to create an antimagic field around yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arcane Cannon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This cannon can fire magical projectiles. When you use it to make a ranged attack, you can choose to deal force damage instead of the weapon's normal damage type.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arcane Grimoire",
        "category": "magic-item",
        "type": "other",
        "description": "While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arcane Propulsion Arm",
        "category": "magic-item",
        "type": "other",
        "description": "This prosthetic arm can be used as a weapon. While attached, you can use it to make unarmed strikes that deal force damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor, +1, +2, or +3",
        "category": "magic-item",
        "type": "armor",
        "description": "You have a bonus to AC while wearing this armor. The bonus is determined by the armor's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor of Safeguarding",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have advantage on saving throws against being charmed or frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Arrow of Slaying",
        "category": "magic-item",
        "type": "weapon",
        "description": "An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both arrows of dragon slaying and arrows of ancient dragon slaying.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bag of Devouring",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis bag resembles a Bag of Holding but is a feedingorifice for a gigantic extradimensional creature. Turning the bag inside out closes the orifice.\nThe extradimensional creature attached to the bag can sense whatever is placed inside the bag. Animal or vegetable matter placed wholly in the bag is devoured and lost forever. When part of a living creature is placed in the bag, as happens when someone reaches inside it, there is a 50 percent chance that the creature is pulled inside the bag. A creature inside the bag can take an action to try to escape, doing so with a successful DC 15 Strength (Athletics) check. Another creature can take an action to reach into the bag to pull a creature out, doing so with a successful DC 20 Strength (Athletics) check, provided the puller isn't pulled inside the bag first. Any creature that starts its turn inside the bag is devoured, its body destroyed.\nInanimate objects can be stored in the bag, which can hold a cubic foot of such material. However, once each day, the bag swallows any objects inside it and spits them out into another plane of existence. The GM determines the time and plane.\nIf the bag is pierced or torn, it is destroyed, and anything contained within it is transported to a random location on the Astral Plane.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Baleful Talon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from the talon of a baleful creature. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Barrier Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Battle Standard of Infernal Power",
        "category": "magic-item",
        "type": "other",
        "description": "While this standard is displayed, all friendly creatures within 30 feet of it have advantage on attack rolls against fiends.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Belt of Giant Strength",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blade of the Medusa",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a medusa. When you hit a creature with it, you can choose to deal extra damage and force the target to make a Constitution saving throw or be petrified.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blast Scepter",
        "category": "magic-item",
        "type": "other",
        "description": "This scepter can be used to cast spells that deal force damage. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodaxe",
        "category": "magic-item",
        "type": "weapon",
        "description": "This axe is stained with blood that never dries. When you hit a creature with it, you can choose to deal extra necrotic damage and regain hit points equal to half the damage dealt.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodseeker Ammunition",
        "category": "magic-item",
        "type": "weapon",
        "description": "This ammunition seeks out blood. When you fire it, it automatically hits a creature that is bleeding within range.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodshed Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This blade grows more powerful as you deal damage. When you reduce a creature to 0 hit points with it, you gain a bonus to attack and damage rolls made with this weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bloodwell Vial",
        "category": "magic-item",
        "type": "other",
        "description": "This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bobbing Lily Pad",
        "category": "magic-item",
        "type": "other",
        "description": "This lily pad can support your weight. While standing on it, you can move across water at your walking speed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bow Of Melodies",
        "category": "magic-item",
        "type": "weapon",
        "description": "This bow plays music when you draw it. While holding it, you can use an action to cast the suggestion spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bracelet of Rock Magic",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this bracelet, you can use an action to cast the stone shape spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Candle of Invocation",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis candle's magic is activated when the candle is lit, which requires a Magic action. After burning for 4 hours, the candle is destroyed. You can snuff it out early for use at a later time. Deduct the time it burned in increments of 1 minute from its total burn time.\nWhile lit, the candle sheds Dim Light in a 30-foot radius. While you are within that light, you have Advantage on D20 Tests. In addition, a Cleric or Druid in the light can cast level 1 spells they have prepared without expending spell slots.\nAlternatively, when you light the candle for the first time, you can cast Gate with it. Doing so destroys the candle. The portal created by the spell links to a particular Outer Plane chosen by the GM or determined by rolling on the following table.1d100  Outer Plane  1d100  Outer Plane 01-05 Abyss    55-59 Gehenna   06-10 Acheron    60-64 Hades 11-17 Arborea    65-69 Limbo   18-25 Arcadia    70-77 Mechanus 26-33 Beastlands    78-85 Mount Celestia   34-41 Bytopia    86-90 Nine Hells 42-46 Carceri    91-95 Pandemonium   47-54 Elysium    96-00 Ysgard",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Cape of Enlargement",
        "category": "magic-item",
        "type": "other",
        "description": "The cape has 3 charges. As a bonus action, expend 1 charge to enlarge yourself: add your proficiency bonus to weapon/unarmed damage, advantage on Strength checks and saves, size increases by one category. Benefits last 10 minutes or until dismissed. Regains 1d3 charges at dawn. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Carpet of Flying",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nYou can make this carpet hover and fly by taking a Magic action and using the carpet's command word. It moves according to your directions if you are within 30 feet of it.\nFour sizes of Carpet of Flying exist. The GM chooses the size of a given carpet or determines it randomly by rolling on the following table. A carpet can carry up to twice the weight shown on the table, but its Fly Speed is halved if it carries more than its normal capacity.1d100  Size  Capacity  Fly Speed21-55  4 ft. × 6 ft.  400 lb.  60 feet81-00  6 ft. × 9 ft.  800 lb.  30 feet",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Cauldron of Rebirth",
        "category": "magic-item",
        "type": "other",
        "description": "This cauldron can bring creatures back to life. When you place a dead creature in it, you can use an action to cast the raise dead spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Chime of Exile",
        "category": "magic-item",
        "type": "other",
        "description": "When you strike this chime, you can banish a creature. The creature must succeed on a Charisma saving throw or be banished to another plane.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Chronolometer",
        "category": "magic-item",
        "type": "other",
        "description": "This device can measure time. While holding it, you always know what time it is, and you can use an action to cast the time stop spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Arachnida",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis fine garment is made of black silk interwoven with faint, silvery threads. While wearing it, you gain the following benefits.\nPoison Resistance. You have Resistance to Poison damage.\nSpider Climb. You have a Climb Speed equal to your Speed and can move up, down, and across vertical surfaces and along ceilings, while leaving your hands free.\nSpider Walk. You can't be caught in webs of any sort and can move through webs as if they were Difficult Terrain.\nWeb. You can cast Web (save DC 13). The web created by the spell fills twice its normal area. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Clockwork Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from clockwork mechanisms. While wearing it, you have resistance to bludgeoning damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Conch of Teleportation",
        "category": "magic-item",
        "type": "other",
        "description": "This conch shell can be used to teleport. When you blow it, you can cast the teleport spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Constantori's Portrait",
        "category": "magic-item",
        "type": "other",
        "description": "This portrait can store memories. When you look at it, you can view memories stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crown Of Whirling Comets",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this crown, you can use an action to cast the meteor swarm spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crystal Ball",
        "category": "magic-item",
        "type": "other",
        "description": "The typical crystal ball, a very rare item, is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crystalline Chronicle",
        "category": "magic-item",
        "type": "other",
        "description": "This chronicle can store information. While holding it, you can use an action to view information stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dancing Sword",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Greatsword, Longsword, Rapier, Scimitar, or Shortsword)\nYou can take a Bonus Action to toss this magic weapon into the air. When you do so, the weapon begins to hover, flies up to 30 feet, and attacks one creature of your choice within 5 feet of itself. The weapon uses your attack roll and adds your ability modifier to damage rolls.\nWhile the weapon hovers, you can take a Bonus Action to cause it to fly up to 30 feet to another spot within 30 feet of you. As part of the same Bonus Action, you can cause the weapon to attack one creature within 5 feet of the weapon.After the hovering weapon attacks for the fourthtime, it flies back to you and tries to return to yourhand. If you have no hand free, the weapon falls to the ground in your space. If the weapon has no unobstructed path to you, it moves as close to you as it can and then falls to the ground. It also ceases to hover if you grasp it or are more than 30 feet away from it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Deck Of Dimensions",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that can create dimensional portals. When you draw a card, you can use it to create a portal to another location.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Deck Of Wild Cards",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that produce random effects. When you draw a card, a random magical effect occurs.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Demon Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Any Light, Medium, or Heavy)\nWhile wearing this armor, you gain a +1 bonus to Armor Class, and you know Abyssal. In addition, the armor's clawed gauntlets allow your Unarmed Strikes to deal 1d8 Slashing damage instead of the usual Bludgeoning damage, and you gain a +1 bonus to the attack and damage rolls of your Unarmed Strikes.\nCurse. Once you don this cursed armor, you can't doff it unless you are targeted by a Remove Curse spell or similar magic. While wearing the armor, you have Disadvantage on attack rolls against demons and on saving throws against their spells and special abilities.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Devastation Orb",
        "category": "magic-item",
        "type": "other",
        "description": "This orb can be used to create a devastating explosion. When you throw it, it explodes in a 30-foot radius, dealing force damage to all creatures in the area.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dimensional Loop",
        "category": "magic-item",
        "type": "other",
        "description": "This loop can create a portal. When you use an action to activate it, you can create a portal to a location you can see within 60 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dispelling Stone",
        "category": "magic-item",
        "type": "other",
        "description": "This stone can dispel magic. When you use an action to crush it, you can cast the dispel magic spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Scale Mail",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Scale Mail)\nDragon Scale Mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them. Other times, hunters carefully preserve the hide of a dead dragon. In either case, Dragon Scale Mail is highly valued.\nWhile wearing this armor, you gain a +1 bonus to Armor Class, you have Advantage on saving throws against the breath weapons of Dragons, and you have Resistance to one damage type determined by the kind of dragon that provided the scales (see the accompanying table).\nAdditionally, you can focus your senses as a Magic action to discern the distance and direction to the closest dragon within 30 miles of yourself that isof the same type as the armor. This action can't be used again until the next dawn.Dragon  Resistance  Dragon  Resistance Blue  Lightning  Green   Poison Brass  Fire  Red  Fire Bronze  Lightning  Silver  Cold",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dragon Vessel",
        "category": "magic-item",
        "type": "other",
        "description": "This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragonhide Belt",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon's Wrath Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon-Touched Focus",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Duskcrusher",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon deals extra damage to undead creatures. When you hit an undead creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dwarven Plate",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Half Plate Armor or Plate Armor)\nWhile wearing this armor, you gain a +2 bonus to Armor Class. In addition, if an effect moves you against your will along the ground, you can take a Reaction to reduce the distance you are moved by up to 10 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Dwarven Thrower",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Warhammer)\nYou gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. It has the Thrown property with a normal range of 20 feet and a long range of 60 feet. When you hit with a ranged attack using this weapon, it deals an extra 1d8 Force damage, or an extra 2d8 Force damage if the target isa Giant. Immediately after hitting or missing, theweapon flies back to your hand.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dyrrn's Tentacle Whip",
        "category": "magic-item",
        "type": "weapon",
        "description": "This whip is made from the tentacle of a mind flayer. When you hit a creature with it, you can choose to deal extra psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Efreeti Bottle",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhen you take a Magic action to remove the stopper of this painted brass bottle, a cloud of thick smoke flows out of it. At the end of your turn, the smoke disappears with a flash of harmless fire, and an Efreeti appears in an unoccupied space within 30 feet of you.The first time the bottle is opened, the GM rolls onthe following table to determine what happens.1d10  Effect2-9  The efreeti understands your languages and obeys your commands for 1 hour, after which it returns to the bottle, and a new stopper contains it. The stopper can't be removed for 24 hours. The next two times the bottle is opened, the same effect occurs. If the bottle is opened a fourth time, the efreeti escapes and disappears, and the bottle loses its magic.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Eldritch Staff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Far Gear",
        "category": "magic-item",
        "type": "other",
        "description": "This gear can be used to create mechanical devices. While holding it, you have advantage on Intelligence checks made to create or repair mechanical devices.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fate Cutter Shears",
        "category": "magic-item",
        "type": "other",
        "description": "These shears can cut the threads of fate. When you use them to cut a thread, you can alter the outcome of an event.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fate Dealer's Deck",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Figurine of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fish Suit",
        "category": "magic-item",
        "type": "armor",
        "description": "This suit allows you to breathe underwater and grants you a swimming speed equal to your walking speed.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Flying Citadel Helm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you can use an action to cause a citadel to appear and fly through the air. The citadel can carry up to 20 Medium creatures.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fool's Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon appears to be a powerful magic weapon, but it is actually cursed. While attuned to it, you have disadvantage on attack rolls made with weapons other than this one.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Forcebreaker Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon deals extra damage to constructs and objects. When you hit a construct or object with it, you can choose to deal maximum damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Frost Brand",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, Rapier, Scimitar, or Shortsword)\nWhen you hit with an attack roll using this magic weapon, the target takes an extra 1d6 Cold damage. In addition, while you hold the weapon, you have Resistance to Fire damage.\nIn freezing temperatures, the weapon sheds Bright Light in a 10-foot radius and Dim Light for an additional 10 feet.\nWhen you draw this weapon, you can extinguish all nonmagical flames within 30 feet of yourself. Once used, this property can't be used again for1 hour.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ghost Step Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo allows you to become ethereal. While it is on your skin, you can use an action to cast the etherealness spell on yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Guild Keyrune",
        "category": "magic-item",
        "type": "other",
        "description": "This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hammer of Runic Focus",
        "category": "magic-item",
        "type": "weapon",
        "description": "This hammer bears runes that enhance spellcasting. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Helm of Brilliance",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its magic.You gain the following benefits while wearing thehelm.\nDiamond Light. As long as it has at least one diamond, the helm emits a 30-foot Emanation. When at least one Undead is within that area, the Emanation is filled with Dim Light. Any Undead that starts its turn in that area takes 1d6 Radiant damage.\nFire Opal Flames. As long as the helm has at least one fire opal, you can take a Magic action to cause one weapon you are holding to burst into flames.The flames emit Bright Light in a 10-foot radius and Dim Light for an additional 10 feet. The flames are harmless to you and the weapon. When you hit with an attack using the blazing weapon, the target takes an extra 1d6 Fire damage. The flames last until you take a Bonus Action to extinguish them or until you drop or stow the weapon.\nRuby Resistance. As long as the helm has at least one ruby, you have Resistance to Fire damage.\nSpells. You can cast one of the following spells (save DC 18), using one of the helm's gems of the specified type as a component: Daylight (opal), Fireball (fire opal), Prismatic Spray (diamond), or Wall of Fire (ruby). The gem is destroyed when the spell is cast and disappears from the helm.\nTaking Fire Damage. Roll 1d20 if you are wearing the helm and take Fire damage as a result of failing a saving throw against a spell. On a roll of 1, the helm emits beams of light from its remaining gems and is then destroyed. Each creature within a 60foot Emanation originating from you must succeed on a DC 17 Dexterity saving throw or be struck by a beam, taking Radiant damage equal to the number of gems in the helm.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Helm of Devil Command",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you can use an action to cast the dominate monster spell (save DC 17) on a fiend. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Heward's Hireling Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor can summon a hireling. While wearing it, you can use an action to summon a creature that serves you for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horned Ring",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you can use an action to grow horns. While you have horns, you can use them to make unarmed strikes that deal piercing damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horseshoes of a Zephyr",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThese horseshoes come in a set of four. As a Magic action, you can touch one of the horseshoes to the hoof of a horse or similar creature, whereupon the horseshoe affixes itself to the hoof. Removing a horseshoe also takes a Magic action.\nWhile all four shoes are affixed to the hooves of a horse or similar creature, they allow the creature to move normally while floating 4 inches above a surface. This effect means the creature can cross or stand above nonsolid or unstable surfaces, such as water or lava. The creature leaves no tracks and ignores Difficult Terrain. In addition, the creature can travel for up to 12 hours a day without gaining Exhaustion levels from extended travel.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Hunter's Coat",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this coat, you have advantage on Wisdom (Survival) checks made to track creatures.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Illusionist's Bracers",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these bracers, whenever you cast a cantrip, you can use a bonus action on the same turn to cast that cantrip a second time.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ingot of the Skold Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This ingot bears the Skold rune. While holding it, you can use an action to cast the shield spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of the Bards",
        "category": "magic-item",
        "type": "other",
        "description": "An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ioun Stone",
        "category": "magic-item",
        "type": "other",
        "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Kyrzin's Ooze",
        "category": "magic-item",
        "type": "other",
        "description": "This ooze can be used to create various effects. While holding it, you can use an action to cast a spell related to oozes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Last Stand Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, when you are reduced to 0 hit points, you can use a reaction to drop to 1 hit point instead.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lifewell Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo can store life energy. While it is on your skin, you can use an action to regain hit points equal to your level.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Living Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is alive. While wearing it, you have advantage on saving throws against being charmed or frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lord's Ensemble",
        "category": "magic-item",
        "type": "armor",
        "description": "This ensemble consists of multiple pieces of clothing. While wearing all pieces, you gain a bonus to AC and saving throws.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lucent Destroyer",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon glows with light. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Manual of Bodily Health",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book contains health and nutrition tips, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Constitution increases by 2, to a maximum of 30. The manual then loses its magic but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Manual of Gainful Exercise",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Strengthincreases by 2, to a maximum of 30. The manual then loses its magic but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Manual of Golems",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis tome contains information and incantations necessary to make a particular type of golem. The GM chooses the type or determines it randomly by rolling on the accompanying table. To decipher and use the manual, you must be a spellcaster with at least two level 5 spell slots. A creature that can't use a Manual of Golems and attempts to read it takes 6d6 Psychic damage.\nTo create a golem, you must spend the time shown on the table, working without interruption with the manual at hand and resting no more than 8 hours per day. You must also pay the specified cost to purchase supplies.\nOnce you finish creating the golem, the book is consumed in eldritch flames. The golem becomes animate when the ashes of the manual are sprinkled on it. See \"Monsters\" for the golem's stat block. The golem is under your control, and it understands and obeys your commands. 1d20 Golem Time Cost 1-5 Clay Golem 30 days 65,000 GP 6-17 Flesh Golem 60 days 50,000 GP 18 Iron Golem 120 days 100,000 GP 19-20 Stone Golem 90 days 80,000 GP",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Manual of Quickness of Action",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book contains coordination and balance exercises, and its words are charged with magic.If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Dexterity increases by 2, to a maximum of 30. The manual then loses its magic but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Mindblasting Cap",
        "category": "magic-item",
        "type": "other",
        "description": "As a bonus action while wearing this violet cap, project psychic energy in a 60-foot cone. Each creature makes a DC 15 Intelligence save; failed: 5d8 psychic damage and stunned 1 min (repeat save at end of each turn); success: half damage. Once used, cannot be used again until the next dawn. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mindguard Crown",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this adamantine crown, you have advantage on Intelligence, Wisdom, and Charisma saving throws, and you have resistance to psychic damage. Requires attunement.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mirror of Life Trapping",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhen this 4-foot-tall, 2-foot-wide mirror is viewed indirectly, its surface shows faint images of creatures. The mirror weighs 50 pounds, and it has AC 11, HP 10, Immunity to Poison and Psychic damage, and Vulnerability to Bludgeoning damage. It shatters and is destroyed when reduced to 0 Hit Points.\nIf the mirror is hanging on a vertical surface and you are within 5 feet of it, you can take a Magic action and use a command word to activate it. It remains activated until you take a Magic action and repeat the command word to deactivate it.\nAny creature other than you that sees its reflection in the activated mirror while within 30 feet of the mirror must succeed on a DC 15 Charisma saving throw or be trapped, along with anything itis wearing or carrying, in one of the mirror's twelve extradimensional cells. A creature that knows the mirror's nature makes the save with Advantage, and Constructs succeed on the save automatically.\nAn extradimensional cell is an infinite expanse filled with thick fog that reduces visibility to 10 feet. Creatures trapped in the mirror's cells don't age, and they don't need to eat, drink, or sleep. A creature trapped within a cell can escape using magic that permits planar travel. Otherwise, the creature is confined to the cell until freed.\nIf the mirror traps a creature but its twelve extradimensional cells are already occupied, the mirror frees one trapped creature at random to accommodate the new prisoner. A freed creature appears in an unoccupied space within sight of the mirrorbut facing away from it. If the mirror is shattered, all creatures it contains are freed and appear in unoccupied spaces near it.\nWhile within 5 feet of the mirror, you can take a Magic action to name one creature trapped in it or call out a particular cell by number. The creature named or contained in the named cell appears as an image on the mirror's surface. You and the creature can then communicate.\nIn a similar way, you can take a Magic action and use a second command word to free one creature trapped in the mirror. The freed creature appears, along with its possessions, in the unoccupied space nearest to the mirror and facing away from it.\nPlacing the mirror inside an extradimensional space created by a Bag of Holding, Portable Hole, or similar item instantly destroys both items andopens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate and not behind Total Cover is sucked through it to a random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Mirror of Reflected Pasts",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this mirror, you can use an action to view the past of a location or object you can see.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mistral Mantle",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mantle, you have a flying speed equal to your walking speed. In addition, you have resistance to wind damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moon Sickle",
        "category": "magic-item",
        "type": "weapon",
        "description": "This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Mudslick Tower",
        "category": "magic-item",
        "type": "other",
        "description": "1-inch granite sphere. Action + command word \"petrification\" (Terran): grows into a 20×20×30 ft adamantine tower. Creatures in the area make DC 15 Dex save or take 10d10 bludgeoning and are pushed out. Tower has arrow slits, two floors, roof; immune to Knock. Merges with natural stone. Regains with Wish. Shrinks when empty with command word.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Navigation Orb",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this orb, you always know which way is north. In addition, you can use an action to determine your exact location.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nimbus Coronet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this coronet, you can use an action to cast the daylight spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nine Lives Stealer",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Simple or Martial)\nYou gain a +2 bonus to attack rolls and damage rolls made with this magic weapon.\nLife Stealing. The weapon has 1d8 + 1 charges. When you attack a creature that has fewer than 100 Hit Points with this weapon and roll a 20 on the d20 for the attack roll, the creature must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body. Constructs and Undead succeed on the save automatically. The weapon loses 1 charge if the creature is slain. When the weapon has no charges remaining, it loses this property.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Nolzur's Marvelous Pigments",
        "category": "magic-item",
        "type": "other",
        "description": "Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound total), these pigments allow you to create three-dimensional objects by painting them in two dimensions.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Oathbow",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Longbow or Shortbow)\nWhen you nock an arrow on this bow, it whispers in Elvish, \"Swift defeat to my enemies.\" When you use this weapon to make a ranged attack, you can utter or sign the following command words: \"Swift death to you who have wronged me.\" The target of your attack becomes your sworn enemy until it dies or until dawn 7 days later. You can have only one such sworn enemy at a time. When your sworn enemy dies, you can choose a new one after the next dawn.\nWhen you make a ranged attack roll with this weapon against your sworn enemy, you have Advantage on the roll. In addition, your target gains no benefit from Half Cover or Three-Quarters Cover, and you suffer no Disadvantage due to long range. If the attack hits, your sworn enemy takes an extra 3d6 Piercing damage.\nWhile your sworn enemy lives, you have Disadvantage on attack rolls with all other weapons.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Oil of Sharpness",
        "category": "magic-item",
        "type": "other",
        "description": "Potion\nOne vial of this oil can coat one Melee weapon or twenty pieces of ammunition, but only ammunition and Melee weapons that are nonmagical and deal Slashing or Piercing damage are affected. Applying the oil takes 1 minute, after which the oil magicallyseeps into whatever it coats, turning the coated weapon into a +3 Weapon or the coated ammunition into +3 Ammunition.\nThis clear, gelatinous oil sparkles with tiny, ultrathin silver shards.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Orb of the Veil",
        "category": "magic-item",
        "type": "other",
        "description": "This orb can create illusions. While holding it, you can use an action to cast the major image spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ornithopter of Flying",
        "category": "magic-item",
        "type": "other",
        "description": "This mechanical device can fly. While using it, you have a flying speed of 60 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pennant of the Vind Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This pennant bears the Vind rune. While holding it, you can use an action to cast the wind wall spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Peregrine Mask",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mask, you have advantage on Wisdom (Perception) checks that rely on sight. In addition, you can see twice as far as normal.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Polymorph Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon can change its form. When you use an action to speak its command word, it transforms into a different type of weapon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Prehistoric Figurines of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Reincarnation Dust",
        "category": "magic-item",
        "type": "other",
        "description": "This dust can bring creatures back to life. When you sprinkle it on a dead creature, you can cast the reincarnate spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rhythm Maker's Drum",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Amity",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you have advantage on Charisma (Persuasion) checks. In addition, you can use an action to cast the charm person spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Red Fury",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this ring, you have advantage on attack rolls against creatures that have damaged you since your last turn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Regeneration",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you regain 1d6 Hit Points every 10 minutes if you have at least 1 Hit Point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6 + 1 days if you have at least 1 Hit Point the whole time.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Shooting Stars",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nYou can cast Dancing Lights or Light from the ring.\nThe ring has 6 charges and regains 1d6 expended charges daily at dawn. You can expend its charges to use the properties below.\nFaerie Fire. You can expend 1 charge to cast Faerie Fire from the ring.\nLightning Spheres. You can expend 2 charges as a Magic action to create up to four 3-foot-diameter spheres of lightning.\nEach sphere appears in an unoccupied space you can see within 120 feet of yourself. The spheres last as long as you maintain Concentration, up to 1 minute. Each sphere sheds Dim Light in a 30-foot radius.\nAs a Bonus Action, you can move each sphere up to 30 feet, but no farther than 120 feet away from yourself. The first time the sphere comes within 5 feet of a creature other than you that isn't behind Total Cover, the sphere discharges lightning at that creature and disappears. That creature makes a DC 15 Dexterity saving throw. On a failed save, thecreature takes Lightning damage based on the number of spheres you created, as shown in the following table. On a successful save, the creature takes half as much damage.Number of SpheresLightning DamageNumber of SpheresLightning Damage14d1232d625d442d4\nShooting Stars. You can expend 1 to 3 charges as a Magic action. For every charge you expend, you launch a glowing mote of light from the ring at a point you can see within 60 feet of yourself. Each creature in a 15-foot Cube originating from that point is showered in sparks and makes a DC 15 Dexterity saving throw, taking 5d4 Radiant damage on a failed save or half as much damage on a successful one.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Telekinesis",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can cast Telekinesisfrom it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe of Scintillating Colors",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis robe has 3 charges, and it regains 1d3 expended charges daily at dawn. While you wear it, you can take a Magic action and expend 1 charge to cause the garment to display a shifting pattern of dazzling hues until the end of your next turn. During this time, the robe sheds Bright Light in a 30-foot radius and Dim Light for an additional 30feet, and creatures that can see you have Disadvantage on attack rolls against you. Any creature in the Bright Light that can see you when the robe's power is activated must succeed on a DC 15 Wisdom saving throw or have the Stunned condition until the effect ends.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe of Stars",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis black or dark-blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it.\nSix stars, located on the robe's upper-front portion, are particularly large. While wearing this robe, you can take a Magic action to remove one of the stars and expend it to cast the level 5 version of Magic Missile. Daily at dusk, 1d6 removed stars reappear on the robe.\nWhile you wear the robe, you can take a Magic action to enter the Astral Plane along with everything you are wearing and carrying. You remain there until you take a Magic action to return to the plane you were on. You reappear in the last space you occupied or, if that space is occupied, the nearest unoccupied space.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of Absorption",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nWhile holding this rod, you can take a Reaction to absorb a spell that is targeting only you and doesn't create an area of effect. The absorbed spell's effect is canceled, and the spell's energy-not the spell itself-is stored in the rod. The energy has the same level as the spell when it was cast. A canceled spell dissipates with no effect, and any resources usedto cast it are wasted. The rod can absorb and store up to 50 levels of energy over the course of its existence. Once the rod absorbs 50 levels of energy, it can't absorb more. If you are targeted by a spellthat the rod can't store, the rod has no effect on that spell.\nWhen you become attuned to the rod, you know how many levels of energy the rod has absorbed over the course of its existence and how many levels of spell energy it currently has stored.\nIf you are a spellcaster holding the rod, you can convert energy stored in it into spell slots to cast spells you have prepared or know. You can create spell slots only of a level equal to or lower than your own spell slots, up to a maximum of level 5. You use the stored levels in place of your slots but otherwise cast the spell as normal. For example, you can use 3 levels stored in the rod as a level 3 spell slot.\nA newly found rod typically has 1d10 levels of spell energy stored in it. A rod that can no longer absorb spell energy and has no energy remaining becomes nonmagical.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of Alertness",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nThis rod has the following properties.\nAlertness. While holding the rod, you have Advantage on Wisdom (Perception) checks and on Initiative rolls.\nSpells. While holding the rod, you can cast the following spells from it:• Detect Evil and Good• Detect Magic• Detect Poison and Disease• See Invisibility\nProtective Aura. As a Magic action, you can plant the haft end of the rod in the ground, whereupon the rod's head sheds Bright Light in a 60-foot radius and Dim Light for an additional 60 feet. While in that Bright Light, you and your allies gain a +1 bonus to Armor Class and saving throws and can sense the location of any Invisible creature that is also in the Bright Light.\nThe rod's head stops glowing and the effect ends after 10 minutes or when a creature takes a Magic action to pull the rod from the ground. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod Of Hellish Flames",
        "category": "magic-item",
        "type": "other",
        "description": "This rod can be used to cast spells that deal fire damage. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells that deal fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rod of Security",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nWhile holding this rod, you can take a Magic action to activate it. The rod then instantly transports you and up to 199 other willing creatures you can see to a demiplane. You choose the form the demiplanetakes. It could be a tranquil garden, a cheery tavern, an immense palace, a tropical island, a fantastic carnival, or whatever else you can imagine. Regardless of its nature, the demiplane contains enough water and food to sustain its visitors, and the demiplane's environment can't harm its occupants. Everything else that can be interacted with there can existonly there. For example, a flower picked from a garden there disappears if it is taken outside the demiplane.\nFor each hour spent in the demiplane, a visitor regains Hit Points as if it had spent 1 Hit Point Die. Also, creatures don't age while there, although time passes normally. Visitors can remain there for up to 200 days divided by the number of creatures present (round down).\nWhen the time runs out or you take a Magic action to end the effect, all visitors reappear in the location they occupied when you activated the rod or an unoccupied space nearest that location. Once used, this property can't be used again until 10 days have passed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of the Pact Keeper, +1, +2, +3",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rotor of Return",
        "category": "magic-item",
        "type": "other",
        "description": "This rotor can be used to return to a location. When you activate it, you can cast the teleport spell, but you can only teleport to a location you have been to before.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruidium Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from ruidium, a rare metal. While wearing it, you have resistance to psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruidium Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "This shield is made from ruidium. While holding it, you have resistance to psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruidium Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from ruidium. When you hit a creature with it, you can choose to deal extra psychic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sage's Signet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this signet, you have advantage on Intelligence checks.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sanctum Amulet",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this amulet, you have advantage on saving throws against spells cast by creatures that are not on your plane of existence.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sapphire Buckler",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have a +1 bonus to AC. In addition, you can use a reaction to cast the shield spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scaled Ornament",
        "category": "magic-item",
        "type": "other",
        "description": "This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scimitar of Speed",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Scimitar)\nYou gain a +2 bonus to attack rolls and damage rolls made with this magic weapon. In addition, you can make one attack with it as a Bonus Action on each of your turns.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Shard of the Ise Rune",
        "category": "magic-item",
        "type": "other",
        "description": "This shard bears the Ise rune. While holding it, you can use an action to cast the ice storm spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield, +1, +2, +3",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have a bonus to AC. The bonus is determined by the shield's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of the Uven Rune",
        "category": "magic-item",
        "type": "shield",
        "description": "This shield bears the Uven rune. While holding it, you can use a reaction to cast the shield spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Skull Helm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you have advantage on saving throws against being frightened. In addition, you can use an action to cast the fear spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sling Bullets of Althemone",
        "category": "magic-item",
        "type": "weapon",
        "description": "These sling bullets are blessed by Althemone. When you hit a creature with them, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Speaking Stone",
        "category": "magic-item",
        "type": "other",
        "description": "This stone can speak. While holding it, you can use an action to cause it to speak a message.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spear of Backbiting",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is cursed. While attuned to it, you have a +2 bonus to attack and damage rolls made with this magic weapon. However, whenever you roll a 1 on an attack roll with this weapon, you must make an attack roll against yourself.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Scroll",
        "category": "magic-item",
        "type": "other",
        "description": "A spell scroll contains a single spell that can be cast by a spellcaster who can read it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spellguard Shield",
        "category": "magic-item",
        "type": "shield",
        "description": "Armor (Shield)\nWhile holding this Shield, you have Advantage on saving throws against spells and other magical effects, and spell attack rolls have Disadvantage against you.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Dunamancy",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your dunamancy spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Fate",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can alter fate. While holding it, you can use an action to reroll a die roll you just made.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of Fire",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nYou have Resistance to Fire damage while you hold this staff.\nSpells. The staff has 10 charges. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.of your choice, up to a number of feet equal to5 times your Intelligence modifier (minimum 5SpellChargeCost  SpellChargeCostfeet). Any creature whose space the sphere enters must succeed on a DC 19 Dexterity saving throw or be touched by it, taking 8d10 Force damage. A creature reduced to 0 Hit Points by this damage is Burning Hands  1    Wall of Fire  4  Fireball  3\nRegaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff crumbles intospell save DC. The table indicates how many charges you must expend to cast the spell.Chargecinders and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Frost",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nYou have Resistance to Cold damage while you hold this staff.\nSpells. The staff has 10 charges. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.Fireball (level 5 version)  5Hold Monster  5Lightning Bolt (level 5 version)  5Ray of Enfeeblement  1SpellChargeCost  SpellCharge Cost Regaining Charges. The staff regains 2d8 + 4 expended charges daily at dawn. If you expend theFog Cloud  1  Wall of Ice  4\nRegaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff turns to water and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Power",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 20 charges and can be wielded as a magic Quarterstaff that grants a +2 bonus to attack rolls and damage rolls made with it. While holding it, you gain a +2 bonus to Armor Class, saving throws, and spell attack rolls.\nSpells. While holding the staff, you can cast one of the spells on the following table from it, using yourlast charge, roll 1d20. On a 1, the staff retains its +2 bonus to attack rolls and damage rolls but loses all other properties. On a 20, the staff regains 1d8 + 2 charges.\nRetributive Strike. You can take a Magic action to break the staff over your knee or against a solid surface. The staff is destroyed and releases its magic in an explosion that fills a 30-foot Emanation originating from itself. You have a 50 percent chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take Force damage equal to 16 times the numberof charges in the staff. Each other creature in the area makes a DC 17 Dexterity saving throw. On a failed save, a creature takes Force damage equal to 4 times the number of charges in the staff. On a successful save, a creature takes half as much damage.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Striking",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff can be wielded as a magic Quarterstaff that grants a +3 bonus to attack rolls and damage rolls made with it.\nThe staff has 10 charges. When you hit with a melee attack using it, you can expend up to 3charges. For each charge you expend, the target takes an extra 1d6 Force damage.\nRegaining Charges. The staff regains 1d6 + 4 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 1, the staff becomes a nonmagical Quarterstaff.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff of Thunder and Lightning",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff can be wielded as a magic Quarterstaff that grants a +2 bonus to attack rolls and damage rolls made with it. It also has the following additional properties. Once one of these properties is used, it can't be used again until the next dawn.\nLightning. When you hit with a melee attack using the staff, you can cause the target to take an extra 2d6 Lightning damage (no action required).\nThunder. When you hit with a melee attack using the staff, you can cause the staff to emit a crack of thunder audible out to 300 feet (no action required). The target you hit must succeed on a DC 17 Constitution saving throw or have the Stunned condition until the end of your next turn.\nThunder and Lightning. Immediately after you hit with a melee attack using the staff, you can take a Bonus Action to use the Lightning and Thunder properties (see above) at the same time. Doing so doesn't expend the daily use of those properties, only the use of this one.\nLightning Strike. You can take a Magic action to cause a bolt of lightning to leap from the staff's tip in a Line that is 5 feet wide and 120 feet long. Each creature in that Line makes a DC 17 Dexterity saving throw, taking 9d6 Lightning damage on a failed save or half as much damage on a successful one.\nThunderclap. You can take a Magic action to cause the staff to produce a thunderclap audible out to 600 feet. Every creature within a 60-foot Emanation originating from you makes a DC 17 Constitution saving throw. On a failed save, a creature takes 2d6 Thunder damage and has the Deafened condition for 1 minute. On a successful save, a creature takes half as much damage only.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Steel",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from steel. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Stonemaker War Pick",
        "category": "magic-item",
        "type": "weapon",
        "description": "This war pick can shape stone. When you hit a stone object with it, you can use an action to cast the stone shape spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sword of Sharpness",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, or Scimitar)\nWhen you attack an object with this magic weapon and hit, maximize your weapon damage dice against the target.\nWhen you attack a creature with this weapon and roll a 20 on the d20 for the attack roll, that target takes an extra 14 Slashing damage and gains1 Exhaustion level.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sword of the Paruns",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of the Paruns. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tasha's Creeping Keepboat",
        "category": "magic-item",
        "type": "other",
        "description": "This boat can move on land. While riding it, you can use an action to cause it to move across land at a speed of 30 feet.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Thunderbuss",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon fires thunderous blasts. When you hit a creature with it, you can choose to deal extra thunder damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tidecaller Trident",
        "category": "magic-item",
        "type": "weapon",
        "description": "This trident can control water. While holding it, you can use an action to cast the control water spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Timepiece of Travel",
        "category": "magic-item",
        "type": "other",
        "description": "This timepiece can be used to travel through time. When you activate it, you can cast the time stop spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tome of Clear Thought",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book contains memory and logic exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Intelligence increases by 2, to a maximum of30. The manual then loses its magic but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Tome of Leadership and Influence",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book contains guidelines for influencing and charming others, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Charisma increases by 2, to a maximum of 30. The manual then loses its magic but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Tome of Understanding",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis book contains intuition and insight exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book's contents and practicing its guidelines, your Wisdom increases by 2, to a maximum of 30.The manual then loses its magic, but regains it in a century.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Voyager Staff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can be used to travel. While holding it, you can use an action to cast the teleport spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wand of Polymorph",
        "category": "magic-item",
        "type": "other",
        "description": "Wand\nThis wand has 7 charges. While holding it, you can expend 1 charge to cast Polymorph (save DC 15) from it.\nRegaining Charges. The wand regains 1d6 + 1 expended charges daily at dawn. If you expendthe wand's last charge, roll 1d20. On a 1, the wand crumbles into ashes and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Very Rare",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand of the War Mage",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Watchful Helm",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you have advantage on Wisdom (Perception) checks. In addition, you can't be surprised while you are conscious.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Weapon, +1, +2, or +3",
        "category": "magic-item",
        "type": "weapon",
        "description": "You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Weapon of Throne's Command",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of command. When you hit a creature with it, you can choose to force the target to make a Wisdom saving throw or be charmed by you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wheel of Stars",
        "category": "magic-item",
        "type": "other",
        "description": "This wheel shows the positions of stars. While holding it, you always know your position relative to major stars.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wraps Of Unarmed Prowess",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wyrmreaver Gauntlets",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these gauntlets, you have advantage on attack rolls against dragons. In addition, your unarmed strikes deal extra damage to dragons.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Apparatus of Kwalish",
        "category": "magic-item",
        "type": "other",
        "description": "The apparatus is a large, sealed iron barrel with a metal hatch in one end. The barrel contains enough air for 1 hour of breathing, divided by the number of breathing Medium or Small creatures inside.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor, +1, +2, or +3",
        "category": "magic-item",
        "type": "armor",
        "description": "You have a bonus to AC while wearing this armor. The bonus is determined by the armor's rarity.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Armor of Invulnerability",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Plate Armor)\nYou have Resistance to Bludgeoning, Piercing, and Slashing damage while you wear this armor.\nMetal Shell. You can take a Magic action to give yourself Immunity to Bludgeoning, Piercing, and Slashing damage for 10 minutes or until you are no longer wearing the armor. Once this property is used, it can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Azuredge",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of justice. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Belashyrra's Beholder Crown",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this crown, you can use an action to cast the beholder's eye ray spells. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Belt of Giant Strength",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt's score, the item has no effect on you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Black Crystal Tablet",
        "category": "magic-item",
        "type": "other",
        "description": "This tablet contains dark knowledge. While holding it, you have advantage on Intelligence (Arcana) checks made to understand necromancy.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blackrazor",
        "category": "magic-item",
        "type": "weapon",
        "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you use it to reduce a creature to 0 hit points, that creature is destroyed, and you regain 2d6 + Constitution modifier hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blackstaff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Blood Fury Tattoo",
        "category": "magic-item",
        "type": "other",
        "description": "This tattoo grants you the ability to enter a blood fury. While it is on your skin, you can use a bonus action to enter a rage that lasts for 1 minute.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Bookmark",
        "category": "magic-item",
        "type": "other",
        "description": "This bookmark can mark a page in any book. When you place it in a book, you can instantly return to that page at any time.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cloak of Invisibility",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this cloak, you can pull its hood over your head to become invisible. While invisible, anything you are carrying or wearing is invisible with you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Crystal Ball",
        "category": "magic-item",
        "type": "other",
        "description": "The typical crystal ball, a very rare item, is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Cubic Gate",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis cube is 3 inches across and radiates palpable magical energy. The six sides of the cube are each keyed to a different plane of existence, one of which is the Material Plane. The other sides are linked to planes determined by the GM.\nThe cube has 3 charges and regains 1d3 expended charges daily at dawn. As a Magic action, you can expend 1 of the cube's charges to cast one of the following spells using the cube.\nGate. Pressing one side of the cube, you cast Gate, opening a portal to the plane of existence keyed to that side.\nPlane Shift. Pressing one side of the cube twice, you cast Plane Shift, transporting the targets to the plane of existence keyed to that side.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Danoth's Visor",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this visor, you have truesight out to a range of 120 feet. In addition, you can see invisible creatures and objects.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dawnbringer",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon glows with the light of dawn. When you hit a creature with it, you can choose to deal extra radiant damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Deck Of Many More Things",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains additional cards beyond the standard deck. When you draw a card, a random magical effect occurs.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Deck of Many Things",
        "category": "magic-item",
        "type": "other",
        "description": "Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. As soon as you draw a card from the deck, its magic takes effect.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Deck of Several Things",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains a smaller number of cards than the full deck. When you draw a card, a random magical effect occurs.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Defender",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Melee Weapon)\nYou gain a +3 bonus to attack rolls and damage rolls made with this magic weapon.\nThe first time you attack with the weapon on each of your turns, you can transfer some or all of the weapon's bonus to your Armor Class. For example, you could reduce the bonus to your attack rolls and damage rolls to +1 and gain a +2 bonus to Armor Class. The adjusted bonuses remain in effect until the start of your next turn, although you must hold the weapon to gain a bonus to AC from it.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dragon Mask",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mask, you can use an action to transform into a dragon. The type of dragon is determined by the mask's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon Vessel",
        "category": "magic-item",
        "type": "other",
        "description": "This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragonlance",
        "category": "magic-item",
        "type": "weapon",
        "description": "This legendary weapon is designed to slay dragons. When you hit a dragon with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon's Wrath Weapon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragonstaff of Ahghairon",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can control dragons. While holding it, you can use an action to cast the dominate monster spell on a dragon.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Dragon-Touched Focus",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Drown",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of water. When you hit a creature with it, you can choose to deal extra cold damage and force the target to make a Constitution saving throw or be restrained.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Efreeti Chain",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the chain of an efreeti. While wearing it, you have resistance to fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Euryale's Aegis",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have advantage on saving throws against being petrified. In addition, you can use a reaction to reflect a petrifying gaze back at the attacker.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fane-Eater",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon consumes magic. When you hit a creature with it, you can choose to dispel one magical effect on the target.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Fate Dealer's Deck",
        "category": "magic-item",
        "type": "other",
        "description": "This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Figurine of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Flail of Tiamat",
        "category": "magic-item",
        "type": "weapon",
        "description": "This flail is imbued with the power of Tiamat. When you hit a creature with it, you can choose to deal extra damage of a type determined by one of Tiamat's heads.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gloves of Soul Catching",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing these gloves, when you hit a creature with an unarmed strike, you can choose to deal extra necrotic damage and regain hit points equal to the damage dealt.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Grimoire Infinitus",
        "category": "magic-item",
        "type": "other",
        "description": "This grimoire contains infinite knowledge. While holding it, you have advantage on Intelligence checks, and you can use an action to cast any spell from it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Gurt's Greataxe",
        "category": "magic-item",
        "type": "weapon",
        "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a giant with it, the giant takes an extra 2d12 slashing damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hammer of Thunderbolts",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Maul or Warhammer)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.\nThe weapon has 5 charges. You can expend 1 charge and make a ranged attack with the weapon, hurling it as if it had the Thrown property with a normal range of 20 feet and a long range of 60 feet. If the attack hits, the weapon unleashes a thunderclap audible out to 300 feet. The target and every creature within 30 feet of it other than you must succeed on a DC 17 Constitution saving throw or have the Stunned condition until the end of your next turn. Immediately after hitting or missing, the weapon flies back to your hand. The weapon regains 1d4 + 1 expended charges daily at dawn.\nGiant's Bane. While you are attuned to the weapon and wearing either a Belt of Giant Strength or Gauntlets of Ogre Power to which you are also attuned, you gain the following benefits:Giants' Bane. When you roll a 20 on the d20 for an attack roll made with this weapon against a Giant, the creature must succeed on a DC 17 Constitution saving throw or die.Might of Giants. The Strength score bestowed by your Belt of Giant Strength or Gauntlets of Ogre Power increases by 4, to a maximum of 30.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Hammock of Worlds",
        "category": "magic-item",
        "type": "other",
        "description": "This hammock can transport you between worlds. When you lie in it, you can use an action to travel to another plane of existence.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Harp of Gilded Plenty",
        "category": "magic-item",
        "type": "other",
        "description": "While you are playing this harp, you can use an action to create food and water for up to 10 people.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hazirawn",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with dark power. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Helm of Disjunction",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you can use an action to cast the disintegrate spell. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Helm of the Scavenger",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this helm, you have advantage on Wisdom (Survival) checks made to find food and water.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Heretic",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is designed to slay religious figures. When you hit a cleric or paladin with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hide of the Feral Guardian",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you can use an action to transform into a beast. The type of beast is determined by the hide's origin.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Hither-Thither Staff",
        "category": "magic-item",
        "type": "weapon",
        "description": "This staff can create portals. While holding it, you can use an action to cast the dimension door spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Holy Avenger",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Any Simple or Martial)\nYou gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. When you hit a Fiend or an Undead with it, that creature takes an extra 2d10 Radiant damage.While you hold the drawn weapon, it creates a10-foot Emanation originating from you. You and all creatures Friendly to you in the Emanation have Advantage on saving throws against spells and other magical effects. If you have 17 or more levels in the Paladin class, the size of the Emanation increases to 30 feet.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Holy Symbol of Ravenkind",
        "category": "magic-item",
        "type": "other",
        "description": "While holding this symbol, you can use an action to cast the turn undead feature. In addition, you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Beckoning Death",
        "category": "magic-item",
        "type": "other",
        "description": "When you blow this horn, undead creatures within 60 feet of you are drawn to you. They must make a Wisdom saving throw or be charmed by you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Icon of Ravenloft",
        "category": "magic-item",
        "type": "other",
        "description": "This icon represents the domain of Ravenloft. While holding it, you have advantage on saving throws against being frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Infernal Tack",
        "category": "magic-item",
        "type": "other",
        "description": "This tack can be used to control infernal creatures. When you place it on a mount, the mount becomes your servant.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Infiltrator's Key",
        "category": "magic-item",
        "type": "other",
        "description": "This key can open any lock. When you use it to unlock a door, the door cannot be locked again for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Instrument of the Bards",
        "category": "magic-item",
        "type": "other",
        "description": "An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ioun Stone",
        "category": "magic-item",
        "type": "other",
        "description": "An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Iron Flask",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile holding this brass-stoppered iron flask, you can take a Magic action to target a creature that you can see within 60 feet of yourself. If the flask is empty and the target is native to a plane of existence other than the one you're on, the target must succeed on a DC 17 Wisdom saving throw or be trapped in the flask. If the target has been trapped by the flask before, it has Advantage on the save. Once trapped, a creature remains in the flask until released. The flask can hold only one creature at atime. A creature trapped in the flask doesn't age anddoesn't need to breathe, eat, or drink.\nYou can take a Magic action to remove the flask's stopper and release the creature in the flask. The creature then obeys your commands for 1 hour, understanding those commands even if it doesn't know the language in which the commands are given. If you issue no commands or give the creature a command that is likely to result in its death or imprisonment, it defends itself but otherwise takes no actions. At the end of the duration, the creature acts in accordance with its normal disposition and alignment.\nAn Identify spell reveals if the flask contains a creature, but the only way to determine the type of creature is to open the flask. A newly discovered Iron Flask might already contain a creature chosen by the GM.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Ironfang",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is made from iron. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Jester's Mask",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this mask, you have advantage on Charisma (Performance) checks. In addition, you can use an action to cast the confusion spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Jewel of Three Prayers",
        "category": "magic-item",
        "type": "other",
        "description": "This jewel contains three prayers. While holding it, you can use an action to cast one of the prayers stored within it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Korolnor Scepter",
        "category": "magic-item",
        "type": "other",
        "description": "This scepter can be used to command creatures. While holding it, you can use an action to cast the command spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Longbow of the Healing Hearth",
        "category": "magic-item",
        "type": "weapon",
        "description": "This bow can heal. When you hit a creature with it, you can choose to heal the target instead of dealing damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Lost Crown of Besilmer",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this crown, you have advantage on Charisma (Persuasion) checks made to interact with dwarves.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Luck Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, Rapier, Scimitar, Sickle, or Shortsword)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon. While the weapon is on your person, you also gain a +1 bonus to saving throws.\nLuck. If the weapon is on your person, you can call on its luck (no action required) to reroll one failed D20 Test if you don't have the Incapacitated condition. You must use the second roll. Once used, this property can't be used again until the next dawn.\nWish. The weapon has 1d3 charges. While holding it, you can expend 1 charge and cast Wish from it.Once used, this property can't be used again until the next dawn. The weapon loses this property if it has no charges.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Luxon Beacon",
        "category": "magic-item",
        "type": "other",
        "description": "This beacon can guide you. While holding it, you always know which way is north, and you can use an action to cast the guiding bolt spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Matalotok",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of ice. When you hit a creature with it, you can choose to deal extra cold damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Moonblade",
        "category": "magic-item",
        "type": "weapon",
        "description": "A moonblade is an elven longsword that passes down from parent to child. The sword chooses its bearer and remains bonded to that person for life.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Murgaxor's Orb",
        "category": "magic-item",
        "type": "other",
        "description": "This orb can be used to cast spells. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nepenthe",
        "category": "magic-item",
        "type": "other",
        "description": "This item can erase memories. When you use it, you can cause a creature to forget a specific event.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nether Scroll of Azumar",
        "category": "magic-item",
        "type": "other",
        "description": "This scroll contains forbidden knowledge. While holding it, you have advantage on Intelligence (Arcana) checks made to understand dark magic.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nightbringer",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of darkness. When you hit a creature with it, you can choose to deal extra necrotic damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Nightfall Pearl",
        "category": "magic-item",
        "type": "other",
        "description": "This pearl can create darkness. While holding it, you can use an action to cast the darkness spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Obsidian Flint Dragon Plate",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is made from the scales of an obsidian flint dragon. While wearing it, you have resistance to fire and cold damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orb of Skoraeus",
        "category": "magic-item",
        "type": "other",
        "description": "This orb can control stone. While holding it, you can use an action to cast the stone shape spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Orcsplitter",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is designed to slay orcs. When you hit an orc with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Plate Armor of Etherealness",
        "category": "magic-item",
        "type": "armor",
        "description": "Armor (Half Plate Armor or Plate Armor)\nWhile you're wearing this armor, you can take a Magic action and use a command word to gain the effect of the Etherealness spell. The spell ends immediately if you remove the armor or take a Magic action to repeat the command word. This property of the armor can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Platinum Scarf",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this scarf, you have advantage on Charisma (Persuasion) checks. In addition, you can use an action to cast the charm person spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Powered Armor",
        "category": "magic-item",
        "type": "armor",
        "description": "This armor is powered by magic. While wearing it, you have a +1 bonus to AC, and your Strength score increases by 2.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Prehistoric Figurines of Wondrous Power",
        "category": "magic-item",
        "type": "other",
        "description": "These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Pyxis of Pandemonium",
        "category": "magic-item",
        "type": "other",
        "description": "This box can create chaos. When you open it, random magical effects occur within 30 feet of it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Rakdos Riteknife",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is used in Rakdos rituals. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Reaper's Scream",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon emits a terrifying scream. When you hit a creature with it, you can choose to deal extra psychic damage and force the target to make a Wisdom saving throw or be frightened.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Red Wizard Blade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of the Red Wizards. When you hit a creature with it, you can choose to deal extra fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ring of Djinni Summoning",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can take a Magic action to summon a particular Djinni from the Elemental Plane of Air. The djinni appears in an unoccupied space you choose within 120 feet of yourself. It remains as long as you maintain Concentration, to a maximum of 1 hour, or until it drops to 0 Hit Points.\nWhile summoned, the djinni is Friendly to you and your allies, and it obeys your commands. If you fail to command it, the djinni defends itself against attackers but takes no other actions.\nAfter the djinni departs, it can't be summoned again for 24 hours, and the ring becomes nonmagical if the djinni dies.\nRings of Djinni Summoning are often created by the djinn they summon and given to mortals as gifts of friendship or tokens of esteem.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Elemental Command",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nEach Ring of Elemental Command is linked to one of the four Elemental Planes. The GM chooses or randomly determines the linked plane. For example, a Ring of Elemental Command (air) is linked to the Elemental Plane of Air.\nEvery Ring of Elemental Command has the following two properties:Elemental Bane. While wearing the ring, you have Advantage on attack rolls against Elementals and they have Disadvantage on attack rolls against you.Elemental Compulsion. While wearing the ring, you can take a Magic action to try to compel an Elemental you see within 60 feet of yourself. The Elemental makes a DC 18 Wisdom saving throw. On a failed save, the Elemental has the Charmed condition until the start your next turn, and you determine what it does with its move and action on its next turn.\nElemental Focus. While wearing the ring, you benefit from additional properties corresponding to the ring's linked Elemental Plane:Air. You know Auran, you have Resistance to Lightning damage, and you have a Fly Speed equal to your Speed and can hover.Earth. You know Terran, and you have Resistance to Acid damage. Terrain composed of rubble, rocks, or dirt isn't Difficult Terrain for you. In addition, you can move through solid earth or rock as if those areas were Difficult Terrain without disturbing the matter through which you pass. Ifyou end your turn in solid earth or rock, you are shunted out to the nearest unoccupied space you last occupied.Fire. You know Ignan, and you have Immunity to Fire damage.Water. You know Aquan, you gain a Swim Speed of 60 feet, and you can breathe underwater.\nSpellcasting. The ring has 5 charges and regains 1d4 + 1 expended charges daily at dawn. While wearing the ring, you can cast a spell from it. Choose the spell from the list of available spells based on the Elemental Plane the ring is linked to, as shown in the following table. The table indicates how many charges you must expend to cast the spell, which has a save DC of 18.Plane  Spells (Charges)Earth  Earthquake (5 charges), Stone Shape (2 charges), Stoneskin (3 charges), Wall of Stone (3 charges)Water  Create or Destroy Water (1 charge), Ice Storm (2 charges), Tsunami (5 charges), Wall of Ice (3 charges), Water Walk (2 charges)",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Invisibility",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can take a Magic action to give yourself the Invisible condition. You remain Invisible until the ring is removed or until you take a Bonus Action to become visible again.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Spell Turning",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you have Advantage on saving throws against spells. If you succeed on the save for a spell of level 7 or lower, the spell has no effect on you. If that spell targeted only you and didn't create an area of effect, you can take a Reaction to deflect the spell back at the spell's caster; the caster must make a saving throw against the spell using their own spell save DC.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ring of Three Wishes",
        "category": "magic-item",
        "type": "other",
        "description": "Ring\nWhile wearing this ring, you can expend 1 of its 3 charges to cast Wish from it. The ring becomes nonmagical when you use the last charge.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe of the Archmagi",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis elegant garment is made from exquisite cloth and adorned with runes.\nYou gain these benefits while wearing the robe.\nArmor. If you aren't wearing armor, your base Armor Class is 15 plus your Dexterity modifier.\nMagic Resistance. You have Advantage on saving throws against spells and other magical effects.\nWar Mage. Your spell save DC and spell attack bonus each increase by 2.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of Lordly Might",
        "category": "magic-item",
        "type": "other",
        "description": "Rod\nThis rod has a flanged head, and it functions as a magic Mace that grants a +3 bonus to attack rolls and damage rolls made with it. The rod has properties associated with six different buttons that are set in a row along the haft. It has three other properties as well, detailed below.\nButtons. You can press one of the following buttons as a Bonus Action; a button's effect lasts until you push a different button or until you push the same button again, which causes the rod to revert to its normal form:Button 1. A fiery blade sprouts from the end opposite the rod's flanged head. The flames shed Bright Light in a 40-foot radius and Dim Light for an additional 40 feet, and the blade functions as a magic Longsword or Shortsword (your choice) that deals an extra 2d6 Fire damage on a hit.Button 2. The rod's flanged head folds down and two crescent-shaped blades spring out, transforming the rod into a magic Battleaxe that grants a +3 bonus to attack rolls and damage rolls made with it.Button 3. The rod's flanged head folds down, a spear point springs from the rod's tip, and the rod's handle lengthens into a 6-foot haft, transforming the rod into a magic Spear that grants a+3 bonus to attack rolls and damage rolls made with it.Button 4. The rod transforms into a climbing pole up to 50 feet long (you specify the length), though the rod's buttons remain within your reach. In surfaces as hard as granite, a spike at the bottom and three hooks at the top anchor the pole.Horizontal bars 3 inches long fold out from the sides, 1 foot apart, forming a ladder. The pole can bear up to 4,000 pounds. More weight or lack of solid anchoring causes the rod to revert to its normal form.Button 5. The rod transforms into a handheld battering ram and grants its user a +10 bonus to Strength (Athletics) checks made to break through doors, barricades, and other barriers.Button 6. The rod assumes or remains in its normal form and indicates magnetic north. (Nothing happens if this function of the rod is used in a location that has no magnetic north.) The rod also gives you knowledge of your approximate depth beneath the ground or your height above it.\nDrain Life. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failed save, the target takes an extra 4d6 Necrotic damage, and you regain a number of Hit Points equal to half that Necrotic damage. Once used, this property can't be used again until the next dawn.\nParalyze. When you hit a creature with a melee attack using the rod, you can force the target to make a DC 17 Constitution saving throw. On a failed save, the target has the Paralyzed condition for 1 minute. The target repeats the save at the end of each of its turns, ending the effect on a success.Once used, this property can't be used again until the next dawn.\nTerrify. While holding the rod, you can take a Magic action to force each creature you can see within 30 feet of yourself to make a DC 17 Wisdom saving throw. On a failed save, a target has the Frightened condition for 1 minute. A Frightened target repeats the save at the end of each of its turns, ending the effect on itself on a success. Once used, this property can't be used again until the next dawn.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod of Resurrection",
        "category": "magic-item",
        "type": "other",
        "description": "This rod can bring creatures back to life. While holding it, you can use an action to cast the resurrection spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruby Weave Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem contains the power of the Weave. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ruinblade",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of ruin. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scaled Ornament",
        "category": "magic-item",
        "type": "other",
        "description": "This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament's color.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scarab of Protection",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis beetle-shaped medallion provides three bene-fits while it is on your person.Defense. You gain a +1 bonus to Armor Class.\nPreservation. The scarab has 12 charges. If you fail a saving throw against a Necromancy spell or a harmful effect originating from an Undead, youcan take a Reaction to expend 1 charge and turn the failed save into a successful one. The scarab crumbles into powder and is destroyed when its last charge is expended.\nSpell Resistance. You have Advantage on saving throws against spells.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Scroll of Tarrasque Summoning",
        "category": "magic-item",
        "type": "other",
        "description": "This scroll can summon a tarrasque. When you read it, you can cast the summon tarrasque spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of the Comet",
        "category": "magic-item",
        "type": "other",
        "description": "This scroll can call down a comet. When you read it, you can cast the meteor swarm spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shard Solitaire",
        "category": "magic-item",
        "type": "other",
        "description": "This shard can be used to cast spells. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of the Blazing Dreadnought",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have resistance to fire damage. In addition, you can use a reaction to cast the fireball spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Shield of the Hidden Lord",
        "category": "magic-item",
        "type": "shield",
        "description": "While holding this shield, you have advantage on saving throws against being charmed or frightened. In addition, you can use an action to cast the suggestion spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Snicker-Snack",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is known for its vorpal quality. When you roll a 20 on an attack roll with it, you can choose to sever the target's head.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sovereign Glue",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside with Oil of Slipperiness. When found, a container contains 1d6 + 1 ounces.\nOne ounce of the glue can cover a 1-foot square surface. Applying an ounce of Sovereign Glue takes a Utilize action, and the applied glue takes 1 minuteto set. Once it has done so, the bond it creates can be broken only by the application of Universal Solvent or Oil of Etherealness, or with a Wish spell.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Spell Bottle",
        "category": "magic-item",
        "type": "other",
        "description": "This bottle can store spells. You can cast a spell into the bottle, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Gem",
        "category": "magic-item",
        "type": "other",
        "description": "This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Spell Scroll",
        "category": "magic-item",
        "type": "other",
        "description": "A spell scroll contains a single spell that can be cast by a spellcaster who can read it.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sphere Of Annihilation",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis 2-foot-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it.\nThe sphere obliterates all matter it passes through and all matter that passes through it. Artifacts are the exception. Unless an Artifact is susceptible to damage from a Sphere of Annihilation, it passes through the sphere unscathed. Anything else that touches the sphere but isn't wholly engulfed and obliterated by it takes 8d10 Force damage.\nControlling the Sphere. A Sphere of Annihilation is stationary until someone takes control of it. If you are within 60 feet of a sphere, you can take a Magic action to make a DC 25 Intelligence (Arcana) check. On a successful check, you control the sphere until the start of your next turn, and if it was under another creature's control, that creature loses control of the sphere. On a failed check, the sphere moves 10 feet toward you in a straight line.\nWhile in control of the sphere, you can take a Bonus Action to cause it to move in one directionobliterated, leaving its possessions behind but no other physical remains.\nSphere Interactions. If the sphere comes into contact with a planar portal (such as that created by the Gate spell) or an extradimensional space (such as that within a Portable Hole), the GM determines randomly what happens using the following table.1d100  Result 01-50 The sphere is destroyed.   51-85 The sphere moves through the portal or intothe extradimensional space.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Spindle Of Fate",
        "category": "magic-item",
        "type": "other",
        "description": "This spindle can alter fate. While holding it, you can use an action to reroll a die roll you just made.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Staff of the Magi",
        "category": "magic-item",
        "type": "weapon",
        "description": "Staff\nThis staff has 50 charges and can be wielded as a magic Quarterstaff that grants a +2 bonus to attack rolls and damage rolls made with it. While you hold it, you gain a +2 bonus to spell attack rolls.\nSpell Absorption. While holding the staff, you have Advantage on saving throws against spells. In addition, you can take a Reaction when another creature casts a spell that targets only you. If you do, the staff absorbs the magic of the spell, cancel-ing its effect and gaining a number of charges equal to the absorbed spell's level. However, if doing so brings the staff's total number of charges above 50, the staff explodes as if you activated its Retributive Strike (see below).\nSpells. While holding the staff, you can cast one of the spells on the following table from it, using your spell save DC. The table indicates how many charges you must expend to cast the spell.Charge\nRegaining Charges. The staff regains 4d6 + 2 expended charges daily at dawn. If you expend the last charge, roll 1d20. On a 20, the staff regains 1d12 + 1 charges.\nRetributive Strike. You can take a Magic action to break the staff over your knee or against a solid surface. The staff is destroyed and releases its magic in an explosion that fills a 30-foot Emanation originating from itself. You have a 50 percent chance to instantly travel to a random plane of existence, avoiding the explosion. If you fail to avoid the effect, you take Force damage equal to 16 times the numberof charges in the staff. Each other creature in the area makes a DC 17 Dexterity saving throw. On a failed save, a creature takes Force damage equal to 6 times the number of charges in the staff. On a successful save, a creature takes half as much damage.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Stonebreaker's Breastplate",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have advantage on attack rolls against constructs and objects.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Stormgirdle",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this girdle, you have resistance to lightning and thunder damage. In addition, you can use an action to cast the call lightning spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sunsword",
        "category": "magic-item",
        "type": "weapon",
        "description": "This item appears to be a longsword hilt. While grasping it, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sword of Answering",
        "category": "magic-item",
        "type": "weapon",
        "description": "In the world of Greyhawk, only nine of these blades are known to exist. Each is patterned after the legendary sword Fragarach, which is variously translated as \"Final Word.\"",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Sword of the Planes",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon can cut through planar boundaries. When you hit a creature with it, you can choose to banish the target to another plane.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tablet of Reawakening",
        "category": "magic-item",
        "type": "other",
        "description": "This tablet can bring creatures back to life. When you place it on a dead creature, you can cast the raise dead spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Talarith",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of the Talarith. When you hit a creature with it, you can choose to deal extra damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Talisman of Pure Good",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis talisman is a mighty symbol of goodness. A Fiend or an Undead that touches the talisman takes 8d6 Radiant damage and takes the damage again each time it ends its turn holding or carrying the talisman.\nHoly Symbol. You can use the talisman as a Holy Symbol. You gain a +2 bonus to spell attack rolls while you wear or hold it.\nPure Rebuke. The talisman has 7 charges. While wearing or holding the talisman, you can take a Magic action to expend 1 charge and target one creature you can see on the ground within 120 feet of yourself. A flaming fissure opens under the target, and the target makes a DC 20 Dexterity saving throw. If the target is a Fiend or an Undead, it has Disadvantage on the save. On a failed save, the target falls into the fissure and is destroyed, leaving no remains. On a successful save, the target isn't cast into the fissure but takes 4d6 Psychic damage from the ordeal. In either case, the fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman disperses into motes of golden light and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Talisman of the Sphere",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile holding or wearing this talisman, you have Advantage on any Intelligence (Arcana) check you make to control a Sphere of Annihilation. In addition, when you start your turn in control of a Sphere of Annihilation, you can take a Magic action to move it 10 feet plus a number of additional feet equal to 10 times your Intelligence modifier. This movement doesn't have to be in a straight line.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Talisman of Ultimate Evil",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis item symbolizes unrepentant evil. A creature that isn't a Fiend or an Undead that touches the talisman takes 8d6 Necrotic damage and takes the damage again each time it ends its turn holding or carrying the talisman.\nHoly Symbol. You can use the talisman as a Holy Symbol. You gain a +2 bonus to spell attack rolls while you wear or hold it.\nUltimate End. The talisman has 6 charges. While wearing or holding the talisman, you can take a Magic action to expend 1 charge and target one creature you can see on the ground within 120 feet of yourself. A flaming fissure opens under the target, and the target makes a DC 20 Dexterity saving throw. If the target is a Celestial, it has Disadvantage on the save. On a failed save, the targetfalls into the fissure and is destroyed, leaving no remains. On a successful save, the target isn't cast into the fissure but takes 4d6 Psychic damage from the ordeal. In either case, the fissure then closes, leaving no trace of its existence. When you expend the last charge, the talisman dissolves into foul-smelling slime and is destroyed.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Telescopic Transporter",
        "category": "magic-item",
        "type": "other",
        "description": "This device can transport you to distant locations. When you activate it, you can cast the teleport spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tinderstrike",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of fire. When you hit a creature with it, you can choose to deal extra fire damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Tome of the Stilled Tongue",
        "category": "magic-item",
        "type": "other",
        "description": "This tome contains knowledge of silence. While holding it, you can use an action to cast the silence spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Topaz Annihilator",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon can destroy creatures. When you hit a creature with it, you can choose to deal maximum damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Universal Solvent",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis tube holds milky liquid with a strong alcohol smell. When found, a tube contains 1d6 + 1 ounces.\nYou can take a Utilize action to pour 1 or more ounces of solvent from the tube onto a surface within reach. Each ounce instantly dissolves up to 1 square foot of adhesive it touches, including Sovereign Glue.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Verminshroud",
        "category": "magic-item",
        "type": "armor",
        "description": "While wearing this armor, you have advantage on saving throws against being poisoned. In addition, you can use an action to cast the insect plague spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Vorpal Sword",
        "category": "magic-item",
        "type": "weapon",
        "description": "Weapon (Glaive, Greatsword, Longsword, or Scimitar)\nYou gain a +3 bonus to attack rolls and damage rolls made with this magic weapon. In addition, the weapon ignores Resistance to Slashing damage.\nWhen you use this weapon to attack a creature that has at least one head and roll a 20 on the d20 for the attack roll, you cut off one of the creature's heads. The creature dies if it can't survive without the lost head. A creature is immune to this effect if it has Immunity to Slashing damage, if it doesn't have or need a head, or if the GM decides that thecreature is too big for its head to be cut off with this weapon. Such a creature instead takes an extra 30 Slashing damage from the hit. If the creature has Legendary Resistance, it can expend one daily use of that trait to avoid losing its head, taking the extra damage instead.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wave",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of water. When you hit a creature with it, you can choose to deal extra cold damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Waythe",
        "category": "magic-item",
        "type": "weapon",
        "description": "This weapon is imbued with the power of the wind. When you hit a creature with it, you can choose to deal extra force damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Well of Many Worlds",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. It unfolds into a circular sheet 6 feet in diameter.\nYou can take a Magic action to unfold the Well of Many Worlds and place it on a solid surface, whereupon it forms a two-way, 6-foot-diameter, circular portal to another world or plane of existence. Each time the item opens a portal, the GM decides where it leads. The portal remains open until a creature within 5 feet of it takes a Magic action to close itby taking hold of the edges of the cloth and folding it up.\nOnce the Well of Many Worlds has opened a portal, it can't do so again for 1d8 hours.",
        "equipped": false,
        "isBaseItem": true,
        "rarity": "Legendary",
        "attunement": false,
        "source": "SRD 5.2"
    },
    {
        "name": "Whelm",
        "category": "magic-item",
        "type": "weapon",
        "description": "You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a giant or an elemental with it, that creature takes an extra 1d6 bludgeoning damage.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Windvane",
        "category": "magic-item",
        "type": "other",
        "description": "This vane can control the wind. While holding it, you can use an action to cast the control weather spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Witchlight Vane",
        "category": "magic-item",
        "type": "other",
        "description": "This vane can create light. While holding it, you can use an action to cast the daylight spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Witchlight Watch",
        "category": "magic-item",
        "type": "other",
        "description": "This watch can tell time. While holding it, you always know what time it is, and you can use an action to cast the time stop spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Wreath of the Prism",
        "category": "magic-item",
        "type": "other",
        "description": "While wearing this wreath, you have resistance to all damage. In addition, you can use an action to cast the prismatic spray spell.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Ythryn Mythallar",
        "category": "magic-item",
        "type": "other",
        "description": "This mythallar can power magical effects. While holding it, you can use an action to cast any spell of 8th level or lower.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Healing",
        "category": "potion",
        "type": "other",
        "description": "A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Greater Healing",
        "category": "potion",
        "type": "other",
        "description": "A character who drinks the magical red fluid in this vial regains 4d4 + 4 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Superior Healing",
        "category": "potion",
        "type": "other",
        "description": "A character who drinks the magical red fluid in this vial regains 8d4 + 8 hit points.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Invisibility",
        "category": "potion",
        "type": "other",
        "description": "A character who drinks this potion becomes invisible for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Flying",
        "category": "potion",
        "type": "other",
        "description": "When you drink this potion, you gain a flying speed equal to your walking speed for 1 hour.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Potion of Vitality",
        "category": "potion",
        "type": "other",
        "description": "When you drink this potion, it removes any exhaustion you are suffering and cures any disease or poison affecting you.",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Fireball",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Fireball spell (3rd level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Cure Wounds",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Cure Wounds spell (1st level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Magic Missile",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Magic Missile spell (1st level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Misty Step",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Misty Step spell (2nd level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Lightning Bolt",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Lightning Bolt spell (3rd level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Scroll of Charm Person",
        "category": "scroll",
        "type": "other",
        "description": "A spell scroll containing the Charm Person spell (1st level).",
        "equipped": false,
        "isBaseItem": true
    },
    {
        "name": "Backpack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Backpack holds up to 30 pounds within 1 cubic foot. It can also serve as a saddlebag.",
        "cost": "2 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rope, Hempen (50 feet)",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can tie a knot with Rope if you succeed on a DC 10 Dexterity (Sleight of Hand) check. The Rope can be burst with a successful DC 20 Strength (Athletics) check.\nYou can bind an unwilling creature with the Rope only if the creature has the Grappled, Incapacitated, or Restrained condition. If the creature's legs are bound, the creature has the Restrained condition until it escapes. Escaping the Rope requires the creature to make a successful DC 15 Dexterity (Acrobatics) check as an action.",
        "cost": "1 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Torch",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Torch burns for 1 hour, casting Bright Light in a 20-foot radius and Dim Light for an additional 20 feet. When you take the Attack action, you can attack with the Torch, using it as a Simple Melee weapon. On a hit, the target takes 1 Fire damage.",
        "cost": "1 CP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rations (1 day)",
        "category": "miscellaneous",
        "type": "other",
        "description": "Rations consist of travel-ready food, including jerky, dried fruit, hardtack, and nuts. See \"Malnutrition\" in \"Rules Glossary\" for the risks of not eating.",
        "cost": "5 SP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Acid",
        "category": "miscellaneous",
        "type": "other",
        "description": "When you take the Attack action, you can replace one of your attacks with throwing a vial of Acid. Target one creature or object you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 2d6 Acid damage.",
        "cost": "25 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Alchemist's Fire",
        "category": "miscellaneous",
        "type": "other",
        "description": "When you take the Attack action, you can replace one of your attacks with throwing a flask of Alchemist's Fire. Target one creature or object you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 1d4 Fire damage and start burning (see \"Rules Glossary\").",
        "cost": "25 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Amulet",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to channel divine magic. A Cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.\nThe table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (such as a tabard or banner) or a Shield.",
        "cost": "5 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Antitoxin",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Bonus Action, you can drink a vial of Antitoxin to gain Advantage on saving throws to avoid or end the Poisoned condition for 1 hour.",
        "cost": "50 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Arrows",
        "category": "miscellaneous",
        "type": "other",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ball bearings",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can spill Ball Bearings from their pouch. They spread to cover a level, 10-footsquare area within 10 feet of yourself. A creature that enters this area for the first time on a turn must succeed on a DC 10 Dexterity saving throw or have the Prone condition. It takes 10 minutes to recover the Ball Bearings.",
        "cost": "1 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Barrel",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Barrel holds up to 40 gallons of liquid or up to 4 cubic feet of dry goods.",
        "cost": "2 GP",
        "weight": 70,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Basket",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Basket holds up to 40 pounds within 2 cubic feet.",
        "cost": "2 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bedroll",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Bedroll sleeps one Small or Medium creature. While in a Bedroll, you automatically succeed on saving throws against extreme cold (see \"Gameplay Toolbox\").",
        "cost": "2 GP",
        "weight": 25,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bell",
        "category": "miscellaneous",
        "type": "other",
        "description": "When rung as a Utilize action, a Bell produces a sound that can be heard up to 60 feet away.",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Blanket",
        "category": "miscellaneous",
        "type": "other",
        "description": "While wrapped in a blanket, you have Advantage on saving throws against extreme cold (see \"Gameplay Toolbox\").",
        "cost": "5 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Block and tackle",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Block and Tackle allows you to hoist up to four times the weight you can normally lift.",
        "cost": "1 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Blowgun",
        "category": "weapon",
        "type": "weapon",
        "damage": "1",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 25/100)",
            "loading"
        ],
        "mastery": "vex",
        "weaponCategory": "martial",
        "cost": "10 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Vex."
    },
    {
        "name": "Book",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Book contains fiction or nonfiction. If you consult an accurate nonfiction Book about its topic, you gain a +5 bonus to Intelligence (Arcana, History, Nature, or Religion) checks you make about that topic.",
        "cost": "25 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bolts",
        "category": "miscellaneous",
        "type": "other",
        "cost": "1 GP",
        "weight": 1.5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bottle, Glass",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Glass Bottle holds up to 11/2 pints.",
        "cost": "2 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bucket",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Bucket holds up to half a cubic foot of contents.",
        "cost": "5 CP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bullets, Firearm",
        "category": "miscellaneous",
        "type": "other",
        "cost": "3 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bullets, Sling",
        "category": "miscellaneous",
        "type": "other",
        "cost": "4 CP",
        "weight": 1.5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Burglar's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Burglar's Pack contains the following items: Backpack, Ball Bearings, Bell, 10 Candles, Crowbar, Hooded Lantern, 7 flasks of Oil, 5 days of Rations, Rope, Tinderbox, and Waterskin.\nContains: Backpack, Ball bearings, Bell, Candle (10), Crowbar, Lantern, Hooded, Flask (7), Oil (7), Rations (5), Rope, Tinderbox, Waterskin",
        "cost": "16 GP",
        "weight": 20,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Caltrops",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can spread Caltrops from their bag to cover a 5-foot-square area within 5 feet of yourself. A creature that enters this area for the first time on a turn must succeed on a DC 15 Dexterity saving throw or take 1 Piercing damage and have its Speed reduced to 0 until the start of its next turn. It takes 10 minutes to recover the Caltrops.",
        "cost": "2 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Candle",
        "category": "miscellaneous",
        "type": "other",
        "description": "For 1 hour, a lit Candle sheds Bright Light in a 5-foot radius and Dim Light for an additional 5 feet.",
        "cost": "1 CP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Case, Crossbow Bolt",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Crossbow Bolt Case holds up to 20 Bolts.",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Case, Map or Scroll",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Map or Scroll Case holds up to 10 sheets of paper or 5 sheets of parchment.",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Chain",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can wrap a Chain around an unwilling creature within 5 feet of yourself that has the Grappled, Incapacitated, or Restrained condition if you succeed on a DC 13 Strength (Athletics) check. If the creature's legs are bound, the creature has the Restrained condition until it escapes. Escaping the Chain requires the creature to make a successful DC 18 Dexterity (Acrobatics) check as an action. Bursting the Chain requires a successful DC 20 Strength (Athletics) check as an action.",
        "cost": "5 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Chest",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Chest holds up to 12 cubic feet of contents.",
        "cost": "50 GP",
        "weight": 20,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Climber's Kit",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Climber's Kit includes boot tips, gloves, pitons, and a harness. As a Utilize action, you can use the Climber's Kit to anchor yourself; when you do, you can't fall more than 25 feet from the anchor point, and you can't move more than 25 feet from there without undoing the anchor as a Bonus Action.",
        "cost": "25 GP",
        "weight": 8,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Clothes, Fine",
        "category": "miscellaneous",
        "type": "other",
        "description": "Fine Clothes are made of expensive fabrics and adorned with expertly crafted details. Some events and locations admit only people wearing these clothes.",
        "cost": "15 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Clothes, Traveler's",
        "category": "miscellaneous",
        "type": "other",
        "description": "Traveler's Clothes are resilient garments designed for travel in various environments.",
        "cost": "5 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Club",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "bludgeoning",
        "properties": [
            "light"
        ],
        "mastery": "slow",
        "weaponCategory": "simple",
        "cost": "1 SP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Slow."
    },
    {
        "name": "Component Pouch",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Component Pouch is watertight and filled with compartments that hold all the free Material components of your spells.",
        "cost": "2 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Costume",
        "category": "miscellaneous",
        "type": "other",
        "description": "While wearing a Costume, you have Advantage on any ability check you make to impersonate the person or type of person it represents.",
        "cost": "5 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Crowbar",
        "category": "miscellaneous",
        "type": "other",
        "description": "Using a Crowbar gives you Advantage on Strength checks where the Crowbar's leverage can be applied.",
        "cost": "2 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Crystal",
        "category": "miscellaneous",
        "type": "other",
        "cost": "10 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dart",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "piercing",
        "properties": [
            "finesse",
            "thrown (range 20/60)"
        ],
        "mastery": "vex",
        "weaponCategory": "simple",
        "cost": "5 GP",
        "weight": 0.25,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Vex."
    },
    {
        "name": "Diplomat's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Diplomat's Pack contains the following items: Chest, Fine Clothes, Ink, 5 Ink Pens, Lamp, 2 Map or Scroll Cases, 4 flasks of Oil, 5 sheets of Paper, 5 sheets of Parchment, Perfume, and Tinderbox.\nContains: Chest, Clothes, Fine, Ink, Ink Pen (5), Lamp, Case, Map or Scroll (2), Flask (4), Oil (4), Paper (5), Parchment (5), Perfume, Tinderbox",
        "cost": "39 GP",
        "weight": 20,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dungeoneer's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Dungeoneer's Pack contains the following items: Backpack, Caltrops, Crowbar, 2 flasks of Oil, 10 days of Rations, Rope, Tinderbox, 10 Torches, and Waterskin.\nContains: Backpack, Caltrops (10), Crowbar, Flask (2), Oil (2), Rations (10), Rope, Tinderbox, Torch (10), Waterskin",
        "cost": "12 GP",
        "weight": 55,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Emblem",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to channel divine magic. A Cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.\nThe table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (such as a tabard or banner) or a Shield.",
        "cost": "5 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Entertainer's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "Contains: Backpack, Bedroll, Costume (2), Candle (5), Rations (5), Waterskin, Disguise Kit",
        "cost": "40 GP",
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Explorer's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "An Explorer's Pack contains the following items: Backpack, Bedroll, 2 flasks of Oil, 10 days of Rations, Rope, Tinderbox, 10 Torches, and Waterskin.\nContains: Backpack, Bedroll, Oil (2), Rations (10), Rope, Tinderbox, Torch (10), Waterskin",
        "cost": "10 GP",
        "weight": 55,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Flail",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "bludgeoning",
        "properties": [],
        "mastery": "sap",
        "weaponCategory": "martial",
        "cost": "10 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Sap."
    },
    {
        "name": "Flask",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Flask holds up to 1 pint.",
        "cost": "2 CP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Glaive",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "slashing",
        "properties": [
            "heavy",
            "reach",
            "two-handed"
        ],
        "mastery": "graze",
        "weaponCategory": "martial",
        "cost": "20 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Graze."
    },
    {
        "name": "Grappling Hook",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can throw the Grappling Hook at a railing, a ledge, or another catch within 50 feet of yourself, and the hook catches on if you succeed on a DC 13 Dexterity (Acrobatics) check. If you tied a Rope to the hook, you can then climb it.",
        "cost": "2 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Greataxe",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d12",
        "damageType": "slashing",
        "properties": [
            "heavy",
            "two-handed"
        ],
        "mastery": "cleave",
        "weaponCategory": "martial",
        "cost": "30 GP",
        "weight": 7,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Cleave."
    },
    {
        "name": "Greatclub",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "bludgeoning",
        "properties": [
            "two-handed"
        ],
        "mastery": "push",
        "weaponCategory": "simple",
        "cost": "2 SP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Push."
    },
    {
        "name": "Halberd",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "slashing",
        "properties": [
            "heavy",
            "reach",
            "two-handed"
        ],
        "mastery": "cleave",
        "weaponCategory": "martial",
        "cost": "20 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Cleave."
    },
    {
        "name": "Hand Crossbow",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "ammunition (range 30/120)",
            "light",
            "loading"
        ],
        "mastery": "vex",
        "weaponCategory": "martial",
        "cost": "25 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial ranged weapon. Mastery: Vex."
    },
    {
        "name": "Handaxe",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "slashing",
        "properties": [
            "light",
            "thrown (range 20/60)"
        ],
        "mastery": "vex",
        "weaponCategory": "simple",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Vex."
    },
    {
        "name": "Healer's Kit",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Healer's Kit has ten uses. As a Utilize action, you can expend one of its uses to stabilize an Unconscious creature that has 0 Hit Points without needing to make a Wisdom (Medicine) check.",
        "cost": "5 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Holy Water",
        "category": "miscellaneous",
        "type": "other",
        "description": "When you take the Attack action, you can replace one of your attacks with throwing a flask of Holy Water. Target one creature you can see within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or take 2d8 Radiant damage if it is a Fiend or an Undead.",
        "cost": "25 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Hunting Trap",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can set a Hunting Trap, which is a sawtooth steel ring that snaps shut when a creature steps on a pressure plate in the center. The trap is affixed by a heavy chain to an immobile object, such as a tree or a spike driven into the ground. A creature that steps on the plate must succeed on a DC 13 Dexterity saving throw or take 1d4 Piercing damage and have its Speed reduced to 0 until the start of its next turn. Thereafter, until the creature breaks free of the trap, its movement is limited by the length of the chain (typically 3 feet). A creature can use its action to make a DC 13 Strength (Athletics) check, freeing itself or another creature within its reach on a success. Each failed check deals 1 Piercing damage to the trapped creature.",
        "cost": "5 GP",
        "weight": 25,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ink",
        "category": "miscellaneous",
        "type": "other",
        "description": "Ink comes in a 1-ounce bottle, which provides enough ink to write about 500 pages.",
        "cost": "10 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ink Pen",
        "category": "miscellaneous",
        "type": "other",
        "description": "Using Ink, an Ink Pen is used to write or draw.",
        "cost": "2 CP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Javelin",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "thrown (range 30/120)"
        ],
        "mastery": "slow",
        "weaponCategory": "simple",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Slow."
    },
    {
        "name": "Jug",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Jug holds up to 1 gallon.",
        "cost": "2 CP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ladder",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Ladder is 10 feet tall. You must climb to move up or down it. Lamp (5 SP)",
        "cost": "1 SP",
        "weight": 25,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Lamp",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Lamp burns Oil as fuel to cast Bright Light in a 15- foot radius and Dim Light for an additional 30 feet",
        "cost": "5 SP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Lance",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "piercing",
        "properties": [
            "heavy",
            "reach",
            "two-handed"
        ],
        "mastery": "topple",
        "weaponCategory": "martial",
        "description": "Two-handed unless mounted",
        "cost": "10 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Lantern, Bullseye",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Bullseye Lantern burns Oil as fuel to cast Bright Light in a 60-foot Cone and Dim Light for an additional 60 feet.",
        "cost": "10 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Lantern, Hooded",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Hooded Lantern burns Oil as fuel to cast Bright Light in a 30-foot radius and Dim Light for an additional 30 feet. As a Bonus Action, you can lower the hood, reducing the light to Dim Light in a 5-foot radius, or raise it again.",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Light Hammer",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "bludgeoning",
        "properties": [
            "light",
            "thrown (range 20/60)"
        ],
        "mastery": "nick",
        "weaponCategory": "simple",
        "cost": "2 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Nick."
    },
    {
        "name": "Lock",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Lock comes with a key. Without the key, a creature can use Thieves' Tools to pick this Lock with a successful DC 15 Dexterity (Sleight of Hand) check.",
        "cost": "10 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mace",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "bludgeoning",
        "properties": [],
        "mastery": "sap",
        "weaponCategory": "simple",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Sap."
    },
    {
        "name": "Magnifying Glass",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Magnifying Glass grants Advantage on any ability check made to appraise or inspect a highly detailed item. Lighting a fire with a Magnifying Glass requires light as bright as sunlight to focus, tinder to ignite, and about 5 minutes for the fire to ignite.",
        "cost": "100 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Manacles",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Utilize action, you can use Manacles to bind an unwilling Small or Medium creature within 5 feet of yourself that has the Grappled, Incapacitated, or Restrained condition if you succeed on a DC 13 Dexterity (Sleight of Hand) check. While bound, a creature has Disadvantage on attack rolls, and the creature is Restrained if the Manacles are attached to a chain or hook that is fixed in place. Escaping the Manacles requires a successful DC 20 Dexterity (Sleight of Hand) check as an action. Bursting them requires a successful DC 25 Strength (Athletics) check as an action.\nEach set of Manacles comes with a key. Without the key, a creature can use Thieves' Tools to pick the Manacles' lock with a successful DC 15 Dexterity (Sleight of Hand) check.",
        "cost": "2 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Map",
        "category": "miscellaneous",
        "type": "other",
        "description": "If you consult an accurate Map, you gain a +5 bonus to Wisdom (Survival) checks you make to find your way in the place represented on it.",
        "cost": "1 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mirror",
        "category": "miscellaneous",
        "type": "other",
        "description": "A handheld steel Mirror is useful for personal cosmetics but also for peeking around corners and reflecting light as a signal.",
        "cost": "5 GP",
        "weight": 0.5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Maul",
        "category": "weapon",
        "type": "weapon",
        "damage": "2d6",
        "damageType": "bludgeoning",
        "properties": [
            "heavy",
            "two-handed"
        ],
        "mastery": "topple",
        "weaponCategory": "martial",
        "cost": "10 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Topple."
    },
    {
        "name": "Morningstar",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [],
        "mastery": "sap",
        "weaponCategory": "martial",
        "cost": "15 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Sap."
    },
    {
        "name": "Needles",
        "category": "miscellaneous",
        "type": "other",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Net",
        "category": "miscellaneous",
        "type": "other",
        "description": "When you take the Attack action, you can replace one of your attacks with throwing a Net. Target a creature you can see within 15 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or have the Restrained condition until it escapes. The target succeeds automatically if it is Huge or larger.\nTo escape, the target or a creature within 5 feet of it must take an action to make a DC 10 Strength (Athletics) check, freeing the Restrained creature on a success. Destroying the Net (AC 10; 5 HP; Immunity to Bludgeoning, Poison, and Psychic damage) also frees the target, ending the effect.",
        "cost": "1 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Oil",
        "category": "miscellaneous",
        "type": "other",
        "description": "You can douse a creature, object, or space with Oil or use it as fuel, as detailed below.\nDousing a Creature or an Object. When you take the Attack action, you can replace one of your attacks with throwing an Oil flask. Target one creature or object within 20 feet of yourself. The target must succeed on a Dexterity saving throw (DC 8 plus your Dexterity modifier and Proficiency Bonus) or be covered in oil. If the target takes Fire damage before the oil dries (after 1 minute), the target takes an extra 5 Fire damage from burning oil.\nDousing a Space. You can take the Utilize action to pour an Oil flask on level ground to cover a 5-foot-square area within 5 feet of yourself. If lit, the oil burns until the end of the turn 2 rounds from when the oil was lit (or 12 seconds) and deals 5 Fire damage to any creature that enters the area or ends its turn there. A creature can take this damage only once per turn.\nFuel.  Oil serves as fuel for Lamps and Lanterns. Once lit, a flask of Oil burns for 6 hours in a Lamp or Lantern. That duration doesn't need to be consecutive; you can extinguish the burning Oil (as a Utilize action) and rekindle it again until it has burned for a total of 6 hours",
        "cost": "1 SP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Orb",
        "category": "miscellaneous",
        "type": "other",
        "cost": "20 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Paper",
        "category": "miscellaneous",
        "type": "other",
        "description": "One sheet of Paper can hold about 250 handwritten words.",
        "cost": "2 SP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Parchment",
        "category": "miscellaneous",
        "type": "other",
        "description": "One sheet of Parchment can hold about 250 handwritten words.",
        "cost": "3 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Perfume",
        "category": "miscellaneous",
        "type": "other",
        "description": "Perfume comes in a 4-ounce vial. For 1 hour after applying Perfume to yourself, you have Advantage on Charisma (Persuasion) checks made to influence an Indifferent Humanoid within 5 feet of yourself.",
        "cost": "5 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Pike",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d10",
        "damageType": "piercing",
        "properties": [
            "heavy",
            "reach",
            "two-handed"
        ],
        "mastery": "push",
        "weaponCategory": "martial",
        "cost": "5 GP",
        "weight": 6,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Push."
    },
    {
        "name": "Poison, Basic",
        "category": "miscellaneous",
        "type": "other",
        "description": "As a Bonus Action, you can use a vial of Basic Poison to coat one weapon or up to three pieces of ammunition. A creature that takes Piercing or Slashing damage from the poisoned weapon or ammunition takes an extra 1d4 Poison damage. Once applied, the poison retains potency for 1 minute or until its damage is dealt, whichever comes first.",
        "cost": "100 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Pole",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Pole is 10 feet long. You can use it to touch something up to 10 feet away. If you must make a Strength (Athletics) check as part of a High or Long Jump, you can use the Pole to vault, giving yourself Advantage on the check.",
        "cost": "5 CP",
        "weight": 7,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Pot, Iron",
        "category": "miscellaneous",
        "type": "other",
        "description": "An Iron Pot holds up to 1 gallon.",
        "cost": "2 GP",
        "weight": 10,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Pouch",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Pouch holds up to 6 pounds within one-fifth of a cubic foot.",
        "cost": "5 SP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Priest's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Priest's Pack contains the following items: Backpack, Blanket, Holy Water, Lamp, 7 days of Rations, Robe, and Tinderbox.\nContains: Backpack, Blanket, Holy Water, Lamp, Rations (7), Robe, Tinderbox",
        "cost": "33 GP",
        "weight": 29,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Quiver",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Quiver holds up to 20 Arrows.",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ram, Portable",
        "category": "miscellaneous",
        "type": "other",
        "description": "You can use a Portable Ram to break down doors. When doing so, you gain a +4 bonus to the Strength check. One other character can help you use the ram, giving you Advantage on this check.",
        "cost": "4 GP",
        "weight": 35,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Reliquary",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Holy Symbol takes one of the forms in the Holy Symbol table and is bejeweled or painted to channel divine magic. A Cleric or Paladin can use a Holy Symbol as a Spellcasting Focus.\nThe table indicates whether a Holy Symbol needs to be held, worn, or borne on fabric (such as a tabard or banner) or a Shield.",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Robe",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Robe has vocational or ceremonial significance. Some events and locations admit only people wearing a Robe bearing certain colors or symbols.",
        "cost": "1 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Rod",
        "category": "miscellaneous",
        "type": "other",
        "cost": "10 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Sack holds up to 30 pounds within 1 cubic foot.",
        "cost": "1 CP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Scholar's Pack",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Scholar's Pack contains the following items: Backpack, Blanket, Book, Ink, Ink Pen, Lamp, 10 flasks of Oil, 10 sheets of Parchment, and Tinderbox.\nContains: Backpack, Blanket, Book, Ink, Ink Pen, Lamp, Oil (10), Parchment (10), Tinderbox",
        "cost": "40 GP",
        "weight": 22,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Scimitar",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "slashing",
        "properties": [
            "finesse",
            "light"
        ],
        "mastery": "nick",
        "weaponCategory": "martial",
        "cost": "25 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Nick."
    },
    {
        "name": "Shovel",
        "category": "miscellaneous",
        "type": "other",
        "description": "Working for 1 hour, you can use a Shovel to dig a hole that is 5 feet on each side in soil or similar material.",
        "cost": "2 GP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sickle",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "slashing",
        "properties": [
            "light"
        ],
        "mastery": "nick",
        "weaponCategory": "simple",
        "cost": "1 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Nick."
    },
    {
        "name": "Signal Whistle",
        "category": "miscellaneous",
        "type": "other",
        "description": "When blown as a Utilize action, a Signal Whistle produces a sound that can be heard up to 600 feet away.",
        "cost": "5 CP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Spear",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "thrown (range 20/60)",
            "versatile (1d8)"
        ],
        "mastery": "sap",
        "weaponCategory": "simple",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Simple melee weapon. Mastery: Sap."
    },
    {
        "name": "Spellbook",
        "category": "miscellaneous",
        "type": "other",
        "description": "Essential for wizards, a spellbook is a leather-bound tome with 100 blank vellum pages suitable for recording spells.",
        "cost": "50 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Spell Scroll, Cantrip",
        "category": "miscellaneous",
        "type": "other",
        "description": "A *Spell Scroll* (Cantrip) or *Spell Scroll* (Level 1) is a magic item that bears the words of a cantrip or level 1 spell, respectively, determined by the scroll's creator. If the spell is on your class's spell list, you can read the scroll and cast the spell using its normal casting time and without providing any Material components.\nIf the spell requires a saving throw or an attack roll, the spell save DC is 13, and the attack bonus is +5. The scroll disintegrates when the casting is completed.",
        "cost": "30 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Spell Scroll, Level 1",
        "category": "miscellaneous",
        "type": "other",
        "description": "A *Spell Scroll* (Cantrip) or *Spell Scroll* (Level 1) is a magic item that bears the words of a cantrip or level 1 spell, respectively, determined by the scroll's creator. If the spell is on your class's spell list, you can read the scroll and cast the spell using its normal casting time and without providing any Material components.\nIf the spell requires a saving throw or an attack roll, the spell save DC is 13, and the attack bonus is +5. The scroll disintegrates when the casting is completed.",
        "cost": "50 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Spikes, Iron",
        "category": "miscellaneous",
        "type": "other",
        "description": "Iron Spikes come in bundles of ten. As a Utilize action, you can use a blunt object, such as a Light Hammer, to hammer a spike into wood, earth, or a similar material. You can do so to jam a door shut or to then tie a Rope or Chain to the Spike.",
        "cost": "1 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Sprig of Mistletoe",
        "category": "miscellaneous",
        "type": "other",
        "cost": "1 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Spyglass",
        "category": "miscellaneous",
        "type": "other",
        "description": "Objects viewed through a Spyglass are magnified to twice their size.",
        "cost": "1000 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Staff",
        "category": "miscellaneous",
        "type": "other",
        "cost": "5 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "String",
        "category": "miscellaneous",
        "type": "other",
        "description": "String is 10 feet long. You can tie a knot in it as a Utilize action.",
        "cost": "1 SP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Tent",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Tent sleeps up to two Small or Medium creatures.",
        "cost": "2 GP",
        "weight": 20,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Tinderbox",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Tinderbox is a small container holding flint, fire steel, and tinder (usually dry cloth soaked in light oil) used to kindle a fire. Using it to light a Candle, Lamp, Lantern, or Torch—or anything else with exposed fuel—takes a Bonus Action. Lighting any other fire takes 1 minute.",
        "cost": "5 SP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Trident",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d6",
        "damageType": "piercing",
        "properties": [
            "thrown (range 20/60)",
            "versatile (1d8)"
        ],
        "mastery": "topple",
        "weaponCategory": "martial",
        "cost": "5 GP",
        "weight": 4,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Topple."
    },
    {
        "name": "Vial",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Vial holds up to 4 ounces.",
        "cost": "1 GP",
        "weight": 0,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Wand",
        "category": "miscellaneous",
        "type": "other",
        "cost": "10 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "War Pick",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d8",
        "damageType": "piercing",
        "properties": [
            "versatile (1d10)"
        ],
        "mastery": "sap",
        "weaponCategory": "martial",
        "cost": "5 GP",
        "weight": 2,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Sap."
    },
    {
        "name": "Waterskin",
        "category": "miscellaneous",
        "type": "other",
        "description": "A Waterskin holds up to 4 pints. If you don't drink sufficient water, you risk dehydration (see \"Rules Glossary\").",
        "cost": "2 SP",
        "weight": 5,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Whip",
        "category": "weapon",
        "type": "weapon",
        "damage": "1d4",
        "damageType": "slashing",
        "properties": [
            "finesse",
            "reach"
        ],
        "mastery": "slow",
        "weaponCategory": "martial",
        "cost": "2 GP",
        "weight": 3,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2",
        "description": "Martial melee weapon. Mastery: Slow."
    },
    {
        "name": "Yew Wand",
        "category": "miscellaneous",
        "type": "other",
        "cost": "10 GP",
        "weight": 1,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Ammunition of Slaying",
        "category": "magic-item",
        "type": "other",
        "description": "Weapon (Any Ammunition)\nThis magic ammunition is meant to slay creatures of a particular type, which the GM chooses or determines randomly by rolling on the table below. If a creature of that type takes damage from the ammunition, the creature makes a DC 17 Constitution saving throw, taking an extra 6d10 Force damage on a failed save or half as much extra damage on a successful one.\nAfter dealing its extra damage to a creature, the ammunition becomes nonmagical.1d100 Creature Type  1d100 Creature Type 01-10 Aberrations    51-60 Fey   11-15 Beasts    61-70 Fiends 16-20 Celestials    71-75 Giants   21-25 Constructs    76-80 Monstrosities 26-35 Dragons    81-85 Oozes   36-45 Elementals    86-90 Plants 46-50  Humanoids    91-00 Undead",
        "rarity": "Very Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Apparatus of the Crab",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis item first appears to be a sealed iron barrel weighing 500 pounds. The barrel has a hidden catch, which can be found with a successful DC 20 Intelligence (Investigation) check. Releasing the catch unlocks a hatch at one end of the barrel, allowing two Medium or smaller creatures to crawl inside. Ten levers are set in a row at the far end, each in a neutral position, able to move up or down. When certain levers are used, the apparatus transforms to resemble a giant lobster.\nThe Apparatus of the Crab is a Large object with the following statistics: AC 20; HP 200; Speed 30 ft., Swim 30 ft. (or 0 ft. for both if the legs aren't extended); Immunity to Poison and Psychic damage.\nTo be used as a vehicle, the apparatus requires one pilot. While the apparatus's hatch is closed, the compartment is airtight and watertight. The compartment holds enough air for 10 hours of breathing, divided by the number of breathing creatures inside.\nThe apparatus floats on water. It can also go underwater to a depth of 900 feet. Below that, the vehicle takes 2d6 Bludgeoning damage each minute from pressure.\nA creature in the compartment can take a Utilize action to move as many as two of the apparatus's levers up or down. After each use, a lever goes back to its neutral position. Each lever, from left to right, functions as shown in the Apparatus of the Crab Levers table.Apparatus of the Crab LeversLever Up  Down2  Forward window shutter opens.  Forward window shutter closes.4  Two claws extend from the front side of the apparatus.The claws retract.6  The apparatus walks or swims forward provided its legs are extended.The apparatus walks or swims backward provided its legs are extended.8  Eyelike fixtures emit Bright Light in a 30-foot radiusand Dim Light for an additional 30 feet.The light turns off.10  The rear hatch unseals and opens.  The rear hatch closes and seals.",
        "rarity": "Legendary",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Crystal Ball of Mind Reading",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile touching this crystal orb, you can cast Scrying (save DC 17) with it. In addition, you can cast Detect Thoughts (save DC 17) targeting creatures you can see within 30 feet of the spell's sensor. You don't need to concentrate on this Detect Thoughts spellto maintain it during its duration, but it ends if theScrying spell ends.",
        "rarity": "Legendary",
        "attunement": true,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Crystal Ball of Telepathy",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile touching this crystal orb, you can cast Scrying (save DC 17) with it. In addition, you can communicate telepathically with creatures you can see within 30 feet of the spell's sensor. You can also cast Suggestion (save DC 17) through the sensor on one of those creatures. You don't need to concentrate on this Suggestion to maintain it during its duration, but it ends if Scrying ends. You can't cast Suggestion in this way again until the next dawn.",
        "rarity": "Legendary",
        "attunement": true,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Crystal Ball of True Seeing",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nWhile touching this crystal orb, you can cast Scrying (save DC 17) with it. In addition, you have Truesight with a range of 120 feet centered on the spell's sensor.",
        "rarity": "Legendary",
        "attunement": true,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Dragon Orb",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nAn orb is an etched crystal globe about 10 inches in diameter. When used, it grows to about 20 inches in diameter, and mist swirls inside it.\nWhile attuned to an orb, you can take a Magic action to peer into the orb's depths. You must then make a DC 15 Charisma saving throw. On a successful save, you control the orb for as long as you remain attuned to it. On a failed save, the orb imposes the Charmed condition on you for as long as you remain attuned to it.\nWhile you are Charmed by the orb, you can't voluntarily end your Attunement to it, and the orb casts Suggestion on you at will (save DC 18), urging you to work toward the evil ends it desires. The dragon essence within the orb might want many things: the annihilation of a particular society or organization, freedom from the orb, to spread suffering in the world, to advance the worship of Tiamat, or something else the GM decides.\nSpells. The orb has 7 charges and regains 1d4 + 3 expended charges daily at dawn. If you control the orb, you can cast one of the spells on the following table from it. The table indicates how many charges you must expend to cast the spell.SpellCharge CostCure Wounds (level 9 version)4Daylight1Death Ward2Detect Magic0Scrying (save DC 18)3\nCall Dragons. While you control the orb, you can take a Magic action to cause the orb to issue a telepathic call that extends in all directions for 40 miles. Chromatic dragons in range feel compelled to come to the orb as soon as possible by the mostdirect route. Dragon deities such as Tiamat are unaffected by this call. Chromatic dragons drawn to the orb might be Hostile toward you for compelling them against their will. Once you have used this property, it can't be used again for 1 hour.\nDestroying an Orb. A Dragon Orb has AC 20 and is destroyed if it takes damage from a +3 Weapon or a Disintegrate spell. Nothing else can harm it.",
        "rarity": "Artifact",
        "attunement": true,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Efficient Quiver",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nEach of the quiver's three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds. The shortest compartment can hold up to 60 Arrows, Bolts, or similar objects. The midsize compartment holds up to 18 Javelins or similar objects. The longest compartment holds up to 6 long objects, such as bows, Quarterstaffs, or Spears.\nYou can draw any item the quiver contains as if doing so from a regular quiver or scabbard.",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Handy Haversack",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 200 pounds of material, not exceeding a volume of 25 cubic feet. The central pouch can hold up to 500 pounds of material, not exceeding a volume of 64 cubic feet. Thehaversack always weighs 5 pounds, regardless of its contents.\nRetrieving an item from the haversack requires a Utilize action or a Bonus Action (your choice). When you reach into the haversack for a specific item, the item is always magically on top.\nIf any of its pouches is overloaded, pierced, or torn, the haversack ruptures and is destroyed. If the haversack is destroyed, its contents are lost forever, although an Artifact always turns up again somewhere. If the haversack is turned inside out, its contents spill forth unharmed, and the haversack must be put right before it can be used again.\nEach pouch of the haversack holds enough air for 10 minutes of breathing, divided by the number of breathing creatures inside.\nPlacing the haversack inside an extradimensional space created by a Bag of Holding, Portable Hole,or similar item instantly destroys both items and opens a gate to the Astral Plane. The gate originates where the one item was placed inside the other. Any creature within 10 feet of the gate and not behind Total Cover is sucked through it and deposited ina random location on the Astral Plane. The gate then closes. The gate is one-way only and can't be reopened.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Silver Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nRare (Silver)\nYou can take a Magic action to blow this horn. In response, warrior spirits from the plane of Ysgard appear in unoccupied spaces within 60 feet of you. Each spirit uses the Berserker stat block and returns to Ysgard after 1 hour or when it drops to 0 Hit Points. The spirits look like living, breathing warriors, and they have Immunity to the Charmed and Frightened conditions. Once you use the horn, it can't be used again until 7 days have passed.\nFour types of Horn of Valhalla are known to exist, each made of a different metal. The horn's type determines how many spirits it summons, as well as the requirement for its use. The GM chooses the horn's type or determines it randomly by rolling on the following table.\nIf you blow the horn without meeting its requirement, the summoned spirits attack you. If you meet the requirement, they are Friendly to you and your allies and follow your commands.1d100Horn TypeSpiritsRequirement01-40Silver2None41-75Brass3Proficiency with allSimple weapons76-90Bronze4Training with all Medium armor91-00Iron5Proficiency with allMartial weapons",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Brass Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nRare (Brass)\nYou can take a Magic action to blow this horn. In response, warrior spirits from the plane of Ysgard appear in unoccupied spaces within 60 feet of you. Each spirit uses the Berserker stat block and returns to Ysgard after 1 hour or when it drops to 0 Hit Points. The spirits look like living, breathing warriors, and they have Immunity to the Charmed and Frightened conditions. Once you use the horn, it can't be used again until 7 days have passed.\nFour types of Horn of Valhalla are known to exist, each made of a different metal. The horn's type determines how many spirits it summons, as well as the requirement for its use. The GM chooses the horn's type or determines it randomly by rolling on the following table.\nIf you blow the horn without meeting its requirement, the summoned spirits attack you. If you meet the requirement, they are Friendly to you and your allies and follow your commands.1d100Horn TypeSpiritsRequirement01-40Silver2None41-75Brass3Proficiency with allSimple weapons76-90Bronze4Training with all Medium armor91-00Iron5Proficiency with allMartial weapons",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Bronze Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nVery Rare (Bronze)\nYou can take a Magic action to blow this horn. In response, warrior spirits from the plane of Ysgard appear in unoccupied spaces within 60 feet of you. Each spirit uses the Berserker stat block and returns to Ysgard after 1 hour or when it drops to 0 Hit Points. The spirits look like living, breathing warriors, and they have Immunity to the Charmed and Frightened conditions. Once you use the horn, it can't be used again until 7 days have passed.\nFour types of Horn of Valhalla are known to exist, each made of a different metal. The horn's type determines how many spirits it summons, as well as the requirement for its use. The GM chooses the horn's type or determines it randomly by rolling on the following table.\nIf you blow the horn without meeting its requirement, the summoned spirits attack you. If you meet the requirement, they are Friendly to you and your allies and follow your commands.1d100Horn TypeSpiritsRequirement01-40Silver2None41-75Brass3Proficiency with allSimple weapons76-90Bronze4Training with all Medium armor91-00Iron5Proficiency with allMartial weapons",
        "rarity": "Very Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Iron Horn of Valhalla",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nLegendary (Iron)\nYou can take a Magic action to blow this horn. In response, warrior spirits from the plane of Ysgard appear in unoccupied spaces within 60 feet of you. Each spirit uses the Berserker stat block and returns to Ysgard after 1 hour or when it drops to 0 Hit Points. The spirits look like living, breathing warriors, and they have Immunity to the Charmed and Frightened conditions. Once you use the horn, it can't be used again until 7 days have passed.\nFour types of Horn of Valhalla are known to exist, each made of a different metal. The horn's type determines how many spirits it summons, as well as the requirement for its use. The GM chooses the horn's type or determines it randomly by rolling on the following table.\nIf you blow the horn without meeting its requirement, the summoned spirits attack you. If you meet the requirement, they are Friendly to you and your allies and follow your commands.1d100Horn TypeSpiritsRequirement01-40Silver2None41-75Brass3Proficiency with allSimple weapons76-90Bronze4Training with all Medium armor91-00Iron5Proficiency with allMartial weapons",
        "rarity": "Legendary",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Instant Fortress",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nAs a Magic action, you can place this 1-inch adamantine statuette on the ground and, using a command word, cause it to grow rapidly into asquare adamantine tower. Repeating the commandword causes the tower to revert to statuette form, which works only if the tower is empty. Each creature in the area where the tower appears is pushed to an unoccupied space outside but next to the tower. Objects in the area that aren't being worn or carried are also pushed clear of the tower.\nThe tower is 20 feet on a side and 30 feet high, with arrow slits on all sides and a battlement atop it. Its interior is divided into two floors, with a ladder, staircase, or ramp (your choice) connecting them. This ladder, staircase, or ramp ends at a trapdoor leading to the roof. When created, the tower has a single door at ground level on the side facing you. The door opens only at your command, which you can issue as a Bonus Action. It is immune to the Knock spell and similar magic.\nMagic prevents the tower from being tipped over. The roof, the door, and the walls each have AC 20; HP 100; Immunity to Bludgeoning, Piercing, and Slashing damage except that which is dealt by siege equipment; and Resistance to all other damage. Shrinking the tower back down to statuette form doesn't repair damage to the tower. Only a Wish spell can repair the tower (this use of the spell counts as replicating a spell of level 8 or lower). Each casting of Wish causes the tower to regain all its Hit Points.",
        "rarity": "Rare",
        "attunement": true,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Iron Bands",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can take a Magic action to throw the sphere at a Huge or smaller creature you can see within 60 feet of yourself. As the sphere moves through the air, it opens into a tangle of metal bands.\nMake a ranged attack roll with an attack bonus equal to your Dexterity modifier plus your Proficiency Bonus. On a hit, the target has the Restrained condition until you take a Bonus Action to issue a command that releases it. Doing so or missing with the attack causes the bands to contract and become a sphere once more.\nA creature that can touch the bands, including the one Restrained, can take an action to make a DC 20 Strength (Athletics) check to break the iron bands. On a successful check, the item is destroyed, and the Restrained creature is freed. On a failed check, any further attempts made by that creature automatically fail until 24 hours have elapsed.\nOnce the bands are used, they can't be used again until the next dawn.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Marvelous Pigments",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nThis fine wooden box contains 1d4 pots of pigmentand a brush (weighing 1 pound in total).\nUsing the brush and expending 1 pot of pigment, you can paint any number of three-dimensional objects and terrain features (such as walls, doors, trees, flowers, weapons, webs, and pits), provided these elements are all confined to a 20-foot Cube. The effort takes 10 minutes (regardless of the number of elements you create), during which time you must remain in the Cube, and requires Concentration. If your Concentration is broken or you leave the Cube before the work is done, all the painted elements vanish, and the pot of pigment is wasted.\nWhen the work is done, all the painted objects and terrain features become real. Thus, painting a door on a wall creates an actual door, which can be opened to whatever is beyond. Painting a pit creates a real pit, the entire depth of which must lie within the 20-foot Cube.\nNo object created by a pot of pigment can have a value greater than 25 GP, and the total value of all objects created by a pot of pigment can't exceed 500 GP. If you paint objects of greater value (such as a large pile of gold), they look authentic, but close inspection reveals they're made from paste, cookies, or some other worthless material.\nIf you paint a form of energy such as fire or lightning, the energy dissipates as soon as you complete the painting, doing no harm.",
        "rarity": "Very Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Mysterious Deck",
        "category": "magic-item",
        "type": "other",
        "description": "Wondrous Item\nUsually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. Most (75 percent) of these decks have thirteen cards, but some have twenty-two. Use the appropriate column of the Mysterious Deck table when randomly determining cards drawn from the deck.\nBefore you draw a card, you must declare how many cards you intend to draw and then draw them randomly. Any cards drawn in excess of this number have no effect. Otherwise, as soon as you draw a card from the deck, its magic takes effect. You must draw each card no more than 1 hour after the previous draw. If you fail to draw the chosen number, the remaining number of cards fly from the deck on their own and take effect all at once.\nOnce a card is drawn, it disappears. Unless the card is the Fool or Jester, the card reappears in the deck, making it possible to draw the same card twice. (Once the Fool or Jester has left the deck, reroll on the table if that card comes up again.)Mysterious Deck1d100(13-Card Deck)1d100(22-Card Deck)Cardcan reveal the location of your prison. You draw no more cards.\nEuryale. The card's medusa-like visage curses you. You take a -2 penalty to saving throws while cursed in this way. Only a god or the magic of the-  06-10  Comet01-08  15-18  Euryale09-16  24-27  Flames-  32-36  Gem25-32  42-46  Key41-48  52-56  Moon49-56  61-64  Rogue-  69-73  Sage73-80  78-82  Star-  88-91  Talons97-00  97-00  VoidEach card's effect is described below.\nBalance. You can increase one of your ability scores by 2, to a maximum of 22, provided you also decrease another one of your ability scores by 2.You can't decrease an ability that has a score of 5 or lower. Alternatively, you can choose not to adjust your ability scores, in which case this card has no effect.\nComet. The next time you enter combat against one or more Hostile creatures, you can select one of them as your foe when you roll Initiative. If you reduce your foe to 0 Hit Points during that combat, you have Advantage on Death Saving Throws for 1 year. If someone else reduces your chosen foe to 0Hit Points or you don't choose a foe, this card has no effect.\nDonjon. You disappear and become entombed in a state of suspended animation in an extradimensional sphere. Everything you're wearing and carrying disappears with you except for Artifacts,which stay behind in the space you occupied when you disappeared. You remain imprisoned until you are found and removed from the sphere. You can't be located by any Divination magic, but a Wish spellFates card can end this curse.\nFates. Reality's fabric unravels and spins anew, allowing you to avoid or erase one event as if it never happened. You can use the card's magic as soonas you draw the card or at any other time before you die.\nFlames. A powerful devil becomes your enemy. The devil seeks your ruin and torments you, savoring your suffering before attempting to slay you.This enmity lasts until either you or the devil dies.\nFool. You have Disadvantage on D20 Tests for the next 72 hours. Draw another card; this draw doesn't count as one of your declared draws.\nGem. Twenty-five pieces of jewelry worth 2,000 GP each or fifty gems worth 1,000 GP each appear at your feet.\nJester. You have Advantage on D20 Tests for the next 72 hours, or you can draw two additional cards beyond your declared draws.\nKey. A Rare or rarer magic weapon with which you are proficient appears on your person. The GM chooses the weapon.\nKnight. You gain the service of a Knight, who magically appears in an unoccupied space you choose within 30 feet of yourself. The knight has the same alignment as you and serves you loyally until death, believing the two of you have been drawn together by fate. Work with your GM to create a name and backstory for this NPC. The GM can use a different stat block to represent the knight, as desired.Moon. You gain the ability to cast Wish 1d3 times.\nPuzzle. Permanently reduce your Intelligence or Wisdom by 1d4 + 1 (to a minimum score of 1). You can draw one additional card beyond your declared draws.\nRogue. An NPC of the GM's choice becomes Hostile toward you. You don't know the identity of this NPC until they or someone else reveals it. Nothing less than a Wish spell or divine intervention can end the NPC's hostility toward you.\nRuin. All forms of wealth that you carry or own, other than magic items, are lost to you. Portable property vanishes. Businesses, buildings, and land you own are lost in a way that alters reality the least. Any documentation that proves you should own something lost to this card also disappears.\nSage. At any time you choose within one year of drawing this card, you can ask a question in meditation and mentally receive a truthful answer to that question.\nSkull. An Avatar of Death (see the accompanying stat block) appears in an unoccupied space as closeto you as possible. The avatar targets only you with its attacks, appearing as a ghostly skeleton clad in a tattered black robe and carrying a spectral scythe. The avatar disappears when it drops to 0 Hit Points or you die. If an ally of yours deals damage to the avatar, that ally summons another Avatar of Death. The new avatar appears in an unoccupied space as close to that ally as possible and targets only that ally with its attacks. You and your allies can each summon only one avatar as a consequence of this draw. A creature slain by an avatar can't be restored to life.\nStar. Increase one of your ability scores by 2, to a maximum of 24.\nSun. A magic item (chosen by the GM) appears on your person. In addition, you gain 10 Temporary Hit Points daily at dawn until you die.\nTalons. Every magic item you wear or carry disintegrates. Artifacts in your possession vanish instead.\nThrone. You gain proficiency and Expertise in your choice of History, Insight, Intimidation, or Persuasion. In addition, you gain rightful ownership of a small keep somewhere in the world. However, the keep is currently home to one or more monsters, which must be cleared out before you can claim the keep as yours.\nVoid. Your soul is drawn from your body and contained in an object in a place of the GM's choice. One or more powerful beings guard the place. While your soul is trapped in this way, your body is inert, ceases aging, and requires no food, air, or water. A Wish spell can't return your soul to your body, but the spell reveals the location of the object that holds your soul. You draw no more cards.Medium Undead, Neutral evilAC 20  Initiative +3 (13) HP Half the HP maximum of its summoner Speed 60 ft., Fly 60 ft. (hover)MOD SAVE  MOD SAVE  MOD SAVEStr 16+3+3Dex 16+3+3Con 16+3+3Int  16+3+3WIS 16+3+3Cha 16+3+3Immunities Necrotic, Poison; Charmed, Exhaustion,Frightened, Paralyzed, Petrified, Poisoned, UnconsciousSenses Truesight 60 ft., Passive Perception 13 Languages All languages known to its summoner CR None (XP 0; PB equals its summoner's)Traits  Incorporeal Movement. The avatar can move through other creatures and objects as if they were Difficult Terrain. It takes 5 (1d10) Force damage if it ends its turn inside an object.Actions  Multiattack. The avatar makes a number of Reaping Scythe attacks equal to half the summoner's Proficiency Bonus (rounded up).Reaping Scythe. Melee Attack Roll: Automatic hit, reach 5 ft. Hit: 7 (1d8 + 3) Slashing damage plus 4 (1d8) Necrotic damage.",
        "rarity": "Legendary",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Animal Friendship",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you can cast the level3 version of the Animal Friendship spell (save DC 13). Agitating this potion's muddy liquid brings little bits into view: a fish scale, a hummingbird feather, acat claw, or a squirrel hair.",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Clairvoyance",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain the effect of the Clairvoyance spell (no Concentration required).\nAn eyeball bobs in this potion's yellowish liquid but vanishes when the potion is opened.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Diminution",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain the \"reduce\" effect of the Enlarge/Reduce spell for 1d4 hours (no Concentration required).\nThe red in the potion's liquid continuously contracts to a tiny bead and then expands to color the clear liquid around it. Shaking the bottle fails to interrupt this process.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Growth",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain the \"enlarge\" effect of the Enlarge/Reduce spell for 10 minutes (no Concentration required).\nThe red in the potion's liquid continuously expands from a tiny bead to color the clear liquid around it and then contracts. Shaking the bottle fails to interrupt this process.",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Gaseous Form",
        "category": "potion",
        "type": "other",
        "description": "Potion\nPotion of Healing    (supreme)",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Heroism",
        "category": "potion",
        "type": "other",
        "description": "Potion\n10d4 + 20  Very Rare      When you drink this potion, you gain the effect of the Gaseous Form spell for 1 hour (no Concentration required) or until you end the effect as a Bonus Action.\nThis potion's container seems to hold fog that moves and pours like water.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Giant Strength",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, your Strength score changes for 1 hour. The type of giant determines the score (see the table below). The potion has no effect on you if your Strength is equal to or greater than that score.\nThis potion's transparent liquid has floating in it a sliver of light resembling a giant's fingernail.When you drink this potion, you gain 10 Temporary Hit Points that last for 1 hour. For the same duration, you are under the effect of the Bless spell (no Concentration required).\nThis potion's blue liquid bubbles and steams as if boiling.",
        "rarity": "Rarity Varies",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Mind Reading",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain the effect of the Detect Thoughts spell (save DC 13) for 10 minutes (no Concentration required).This potion's dense, purple liquid has an ovoidcloud of pink floating in it.",
        "rarity": "Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Poison",
        "category": "potion",
        "type": "other",
        "description": "Potion\nThis concoction looks, smells, and tastes like a Potion of Healing or another beneficial potion. However, it is actually poison masked by illusion magic. Identify reveals its true nature.\nIf you drink this potion, you take 4d6 Poison damage and must succeed on a DC 13 Constitution saving throw or have the Poisoned condition for 1 hour.",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Resistance",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you have Resistance to one type of damage for 1 hour. The GM chooses the type or determines it randomly by rolling on the following table.1d10  Damage Type  1d10  Damage Type1 Acid  6  Necrotic2 Cold  7  Poison3 Fire  8  Psychic4 Force  9  Radiant5 Lightning  10  Thunder",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Speed",
        "category": "potion",
        "type": "other",
        "description": "Potion\nWhen you drink this potion, you gain the effect of the Haste spell for 1 minute (no Concentration required) without suffering the wave of lethargy that typically occurs when the effect ends.This potion's yellow fluid is streaked with blackand swirls on its own.",
        "rarity": "Very Rare",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    },
    {
        "name": "Potion of Water Breathing",
        "category": "potion",
        "type": "other",
        "description": "Potion\nYou can breathe underwater for 24 hours after drinking this potion.\nThis potion's cloudy green fluid smells of the sea and has a jellyfish-like bubble floating in it.",
        "rarity": "Uncommon",
        "attunement": false,
        "equipped": false,
        "isBaseItem": true,
        "source": "SRD 5.2"
    }
];
