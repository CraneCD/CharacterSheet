export type ItemCategory = 'armor' | 'weapon' | 'shield' | 'magic-item' | 'potion' | 'scroll' | 'miscellaneous';

export interface BaseItem {
    name: string;
    quantity?: number;
    description?: string;
    equipped?: boolean;
    category: ItemCategory;
    type?: 'armor' | 'weapon' | 'shield' | 'other';
    armorMethod?: 'light' | 'medium' | 'heavy' | 'shield' | 'none';
    baseAC?: number;
    damage?: string;
    damageType?: string;
    properties?: string[];
    notes?: string;
    isBaseItem?: boolean;
}

export const baseItems: BaseItem[] = [
    // ARMOR
    {
        name: 'Padded Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'light',
        baseAC: 11,
        description: 'Light armor made of quilted layers of cloth and batting.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Leather Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'light',
        baseAC: 11,
        description: 'The breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Studded Leather Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'light',
        baseAC: 12,
        description: 'Made from tough but flexible leather, studded leather is reinforced with close-set rivets or spikes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hide Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 12,
        description: 'This crude armor consists of thick furs and pelts.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chain Shirt',
        category: 'armor',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 13,
        description: 'Made of interlocking metal rings, a chain shirt is worn between layers of clothing or leather.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scale Mail',
        category: 'armor',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 14,
        description: 'This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Breastplate',
        category: 'armor',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 14,
        description: 'This armor consists of a fitted metal chest piece worn with supple leather.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Half Plate',
        category: 'armor',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 15,
        description: 'Half plate consists of shaped metal plates that cover most of the wearer\'s body.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring Mail',
        category: 'armor',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 14,
        description: 'This armor is leather armor with heavy rings sewn into it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chain Mail',
        category: 'armor',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 16,
        description: 'Made of interlocking metal rings, chain mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Splint Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 17,
        description: 'This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Plate Armor',
        category: 'armor',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 18,
        description: 'Plate consists of shaped, interlocking metal plates to cover the entire body.',
        equipped: false,
        isBaseItem: true
    },

    // WEAPONS
    {
        name: 'Dagger',
        category: 'weapon',
        type: 'weapon',
        damage: '1d4',
        damageType: 'piercing',
        properties: ['finesse', 'light', 'thrown'],
        description: 'A simple melee weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shortsword',
        category: 'weapon',
        type: 'weapon',
        damage: '1d6',
        damageType: 'piercing',
        properties: ['finesse', 'light'],
        description: 'A simple melee weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rapier',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'piercing',
        properties: ['finesse'],
        description: 'A simple melee weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Longsword',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'slashing',
        properties: ['versatile'],
        description: 'A versatile melee weapon (1d10 two-handed).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Greatsword',
        category: 'weapon',
        type: 'weapon',
        damage: '2d6',
        damageType: 'slashing',
        properties: ['heavy', 'two-handed'],
        description: 'A heavy melee weapon requiring two hands.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Warhammer',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'A versatile melee weapon (1d10 two-handed).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Battleaxe',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'slashing',
        properties: ['versatile'],
        description: 'A versatile melee weapon (1d10 two-handed).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shortbow',
        category: 'weapon',
        type: 'weapon',
        damage: '1d6',
        damageType: 'piercing',
        properties: ['ammunition', 'two-handed'],
        description: 'A ranged weapon with a range of 80/320 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Longbow',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'piercing',
        properties: ['ammunition', 'heavy', 'two-handed'],
        description: 'A ranged weapon with a range of 150/600 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crossbow, Light',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'piercing',
        properties: ['ammunition', 'loading', 'two-handed'],
        description: 'A ranged weapon with a range of 80/320 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crossbow, Heavy',
        category: 'weapon',
        type: 'weapon',
        damage: '1d10',
        damageType: 'piercing',
        properties: ['ammunition', 'heavy', 'loading', 'two-handed'],
        description: 'A ranged weapon with a range of 100/400 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Palm Pistol',
        category: 'weapon',
        type: 'weapon',
        damage: '1d8',
        damageType: 'piercing',
        properties: ['ammunition (range 20/80)', 'light', 'reload 1', 'misfire d5'],
        description: 'Cost 20 gp, ammo 2 gp (20), weight 1 lb. A tiny concealable firearm with a short range and a tendency to misfire.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pistol',
        category: 'weapon',
        type: 'weapon',
        damage: '1d10',
        damageType: 'piercing',
        properties: ['ammunition (range 60/120)', 'light', 'reload 4', 'misfire d4'],
        description: 'Cost 50 gp, ammo 4 gp (20), weight 3 lbs. A one-handed firearm designed for quick-drawing and repeated shots before reloading.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pepperbox',
        category: 'weapon',
        type: 'weapon',
        damage: '1d10',
        damageType: 'piercing',
        properties: ['ammunition (range 70/140)', 'reload 6', 'misfire d4'],
        description: 'Cost 70 gp, ammo 4 gp (20), weight 4 lbs. A multi-barreled firearm that can be fired several times before it must be reloaded.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Musket',
        category: 'weapon',
        type: 'weapon',
        damage: '1d12',
        damageType: 'piercing',
        properties: ['ammunition (range 120/240)', 'reload 1', 'two-handed', 'misfire d3'],
        description: 'Cost 100 gp, ammo 5 gp (20), weight 10 lbs. A long-barreled firearm that delivers powerful shots at long range.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blunderbuss',
        category: 'weapon',
        type: 'weapon',
        damage: '2d8',
        damageType: 'piercing',
        properties: ['ammunition (range 15/60)', 'reload 1', 'two-handed', 'misfire d3'],
        description: 'Cost 100 gp, ammo 5 gp (5), weight 10 lbs. A short, wide-mouthed firearm that fires scattering shot in a brutal close-range blast.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hand Mortar',
        category: 'weapon',
        type: 'weapon',
        damage: '2d8',
        damageType: 'fire',
        properties: ['ammunition (range 30/60)', 'reload 1', 'explosive', 'misfire d2'],
        description: 'Cost 200 gp, ammo 10 gp (1), weight 10 lbs. A heavy handheld launcher that fires explosive shells, dealing fire damage in a small area.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bad News',
        category: 'weapon',
        type: 'weapon',
        damage: '2d12',
        damageType: 'piercing',
        properties: ['ammunition (range 200/400)', 'reload 1', 'two-handed', 'misfire d2'],
        description: 'Cost 400 gp, ammo 10 gp (5), weight 20 lbs. A massive, experimental rifle that delivers devastating shots at extreme range, but is prone to catastrophic failure.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Quarterstaff',
        category: 'weapon',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'A versatile melee weapon (1d8 two-handed).',
        equipped: false,
        isBaseItem: true
    },

    // SHIELDS
    {
        name: 'Shield',
        category: 'shield',
        type: 'shield',
        armorMethod: 'shield',
        baseAC: 2,
        description: 'A shield is made from wood or metal and is carried in one hand. Wielding a shield increases your Armor Class by 2.',
        equipped: false,
        isBaseItem: true
    },

    // MAGIC ITEMS
    {
        name: 'Armblade',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'piercing',
        properties: ['finesse', 'light'],
        description: 'This prosthetic arm ends in a weapon. As a bonus action, you can extend or retract the weapon. The weapon can be a dagger, shortsword, or any simple weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor of Gleaming',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 13,
        description: 'This armor never gets dirty. While wearing it, you gain advantage on Charisma (Persuasion) checks made to interact with nobles or royalty.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Band of Loyalty',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on saving throws against being charmed or frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bead of Nourishment',
        category: 'magic-item',
        type: 'other',
        description: 'This small, smooth bead provides enough nourishment to sustain a creature for one day. The bead dissolves after use.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bead of Refreshment',
        category: 'magic-item',
        type: 'other',
        description: 'This bead can be crushed to create enough fresh water to sustain one Medium creature for one day.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of False Tracks',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these boots, you can choose to have them leave tracks that appear to have been made by a creature one size larger than you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bottle of Boundless Coffee',
        category: 'magic-item',
        type: 'other',
        description: 'This bottle magically refills with hot coffee each dawn. Drinking the coffee grants you advantage on Constitution saving throws against exhaustion for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Breathing Bubble',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this bubble, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Candle of the Deep',
        category: 'magic-item',
        type: 'other',
        description: 'This candle burns underwater and provides bright light in a 5-foot radius and dim light for an additional 5 feet. It burns for 4 hours.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cast-Off Armor',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 13,
        description: 'You can doff this armor as an action. When you doff it, the armor magically removes itself and appears in a space within 5 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Charlatan\'s Die',
        category: 'magic-item',
        type: 'other',
        description: 'Whenever you roll this six-sided die, you can choose which number it shows. The die then becomes nonmagical.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chest of Preserving',
        category: 'magic-item',
        type: 'other',
        description: 'Any organic material placed inside this chest is preserved indefinitely and doesn\'t decay.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cleansing Stone',
        category: 'magic-item',
        type: 'other',
        description: 'This smooth stone can be used to clean any object. When rubbed against a surface, it removes dirt, grime, and stains.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Billowing',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you can use a bonus action to make it billow dramatically.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Many Fashions',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you can use a bonus action to change its style, color, and apparent quality. The cloak provides no benefit other than its appearance.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Clockwork Amulet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you can forgo rolling a d20 to take a 10 on any d20 roll. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Clothes of Mending',
        category: 'magic-item',
        type: 'other',
        description: 'These clothes magically repair themselves. If you wear these clothes for 1 minute, they become clean and any tears or holes in them are mended.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Coin of Delving',
        category: 'magic-item',
        type: 'other',
        description: 'This coin can be used to detect nearby secret doors. When you flip it, it lands on edge if a secret door is within 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cuddly Strixhaven Mascot',
        category: 'magic-item',
        type: 'other',
        description: 'This plush toy serves as a spellcasting focus. While holding it, you gain a +1 bonus to spell attack rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dark Shard Amulet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you can use your Charisma modifier in place of your Intelligence modifier when making Intelligence (Arcana) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dread Helm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use a bonus action to cause your eyes to glow red and emit dim light in a 5-foot radius.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ear Horn of Hearing',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this horn to your ear, you can use a bonus action to gain advantage on Wisdom (Perception) checks that rely on hearing for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Earring of Message',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this earring, you can cast the message cantrip at will, targeting only creatures wearing the other earring of the pair.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Enduring Spellbook',
        category: 'magic-item',
        type: 'other',
        description: 'This spellbook is immune to fire and water damage. It doesn\'t deteriorate with age.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ersatz Eye',
        category: 'magic-item',
        type: 'other',
        description: 'This artificial eye replaces a real one that was lost or removed. While the ersatz eye is embedded in your eye socket, it can\'t be removed by anyone other than you, and you can see through it normally.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Everbright Lantern',
        category: 'magic-item',
        type: 'other',
        description: 'This lantern never runs out of oil and sheds bright light in a 30-foot radius and dim light for an additional 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Feather Token',
        category: 'magic-item',
        type: 'other',
        description: 'This small, fluffy feather can be activated to create various effects, such as a tree, a bird, or a fan. Each token has a specific effect.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Glamerweave',
        category: 'magic-item',
        type: 'other',
        description: 'This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hat of Vermin',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this hat, you can use an action to pull a small beast from it. The beast acts on your turn and disappears at the end of your turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hat of Wizardry',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this hat, you can use it as a spellcasting focus for your wizard spells. In addition, you can attempt to cast a cantrip you don\'t know.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Heward\'s Handy Spice Pouch',
        category: 'magic-item',
        type: 'other',
        description: 'This pouch produces an endless supply of salt, pepper, and various spices. You can use an action to pull out any spice you desire.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Silent Alarm',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this horn, only creatures you choose within 600 feet can hear it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Illuminator\'s Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo glows with dim light in a 5-foot radius. You can use a bonus action to cause it to shed bright light in a 20-foot radius and dim light for an additional 20 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Imbued Wood Focus',
        category: 'magic-item',
        type: 'other',
        description: 'This wooden focus is imbued with druidic magic. While holding it, you gain a +1 bonus to spell attack rolls and the saving throw DCs of your druid spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of Illusions',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this musical instrument, you can create harmless, illusory visual effects within a 5-foot-radius sphere centered on the instrument.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of Scribing',
        category: 'magic-item',
        type: 'other',
        description: 'This instrument can magically inscribe words onto any surface. You can use it to write at a rate of 250 words per minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Keycharm',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this charm, you can use an action to touch a lock and cause it to unlock. The charm can be used three times and then becomes nonmagical.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lantern of Tracking',
        category: 'magic-item',
        type: 'other',
        description: 'While this lantern is lit, you can use an action to name a creature you have seen before. The lantern then sheds bright light in a 30-foot radius, but only you can see the light.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lock of Trickery',
        category: 'magic-item',
        type: 'other',
        description: 'This lock appears to be a normal lock, but it can be opened with any key or even a hairpin. However, it can only be opened by someone who knows its secret.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Masque Charm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this charm, you can use an action to cast the disguise self spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Masquerade Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo allows you to cast the disguise self spell at will, targeting only yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of Muscle',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you have advantage on Strength (Athletics) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of the Conch',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you can breathe underwater and have a swimming speed equal to your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of the Horizonback',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, your carrying capacity is doubled.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of the Maze',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you have advantage on Intelligence checks made to navigate.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of the Meat Pie',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you require half the normal amount of food and water.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of the Wetlands',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you have advantage on saving throws against being poisoned and against disease.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medal of Wit',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this medal, you have advantage on Intelligence checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Crystal',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moodmark Paint',
        category: 'magic-item',
        type: 'other',
        description: 'This paint changes color based on the emotional state of the creature it\'s applied to.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moon-Touched Sword',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d8',
        damageType: 'slashing',
        properties: ['versatile'],
        description: 'In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mystery Key',
        category: 'magic-item',
        type: 'other',
        description: 'This key can open any nonmagical lock. Once used, it becomes a normal key.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of Direction',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this orb, you always know which way is north.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of Gonging',
        category: 'magic-item',
        type: 'other',
        description: 'When you strike this orb, it produces a loud gong sound that can be heard up to 600 feet away.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of Shielding',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this orb, you gain a +1 bonus to AC.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of Time',
        category: 'magic-item',
        type: 'other',
        description: 'This orb shows the current time of day. While holding it, you always know what time it is.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Perfume of Bewitching',
        category: 'magic-item',
        type: 'other',
        description: 'This perfume has 3 charges. While you wear it, you can use an action to expend 1 charge and cast the charm person spell (save DC 13).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pipe of Remembrance',
        category: 'magic-item',
        type: 'other',
        description: 'While smoking this pipe, you can perfectly recall any memory from your past.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pipe of Smoke Monsters',
        category: 'magic-item',
        type: 'other',
        description: 'While smoking this pipe, you can use a bonus action to exhale a puff of smoke that takes the form of a Tiny beast or a Tiny dragon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pole of Angling',
        category: 'magic-item',
        type: 'other',
        description: 'This 10-foot pole can extend to 50 feet long. While extended, it can be used as a fishing pole.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pole of Collapsing',
        category: 'magic-item',
        type: 'other',
        description: 'This 10-foot pole can shrink to a 1-foot-long rod that weighs 1 pound. You can use an action to extend or collapse it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pot of Awakening',
        category: 'magic-item',
        type: 'other',
        description: 'After 30 days, a plant placed in this pot becomes awakened and gains the ability to move and communicate.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Climbing',
        category: 'magic-item',
        type: 'other',
        description: 'When you drink this potion, you gain a climbing speed equal to your walking speed for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Healing',
        category: 'magic-item',
        type: 'other',
        description: 'A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Watchful Rest',
        category: 'magic-item',
        type: 'other',
        description: 'When you drink this potion, you don\'t need to sleep and can rest while remaining alert. You gain the benefits of a long rest in 4 hours.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pressure Capsule',
        category: 'magic-item',
        type: 'other',
        description: 'This capsule can be thrown to create a 10-foot-radius sphere of fresh air that lasts for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prosthetic Limb',
        category: 'magic-item',
        type: 'other',
        description: 'This prosthetic replaces a lost limb. It functions identically to the part it replaces.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rope of Mending',
        category: 'magic-item',
        type: 'other',
        description: 'This rope repairs itself. If cut, the rope magically reconnects after 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruby of the War Mage',
        category: 'magic-item',
        type: 'other',
        description: 'This ruby can be attached to a weapon. While attached, the weapon can be used as a spellcasting focus.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scribe\'s Pen',
        category: 'magic-item',
        type: 'other',
        description: 'This pen never runs out of ink and can write on any surface. It writes at a rate of 250 words per minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sekolahian Worshipping Statuette',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this statuette, you can use an action to cast the water walk spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of Expression',
        category: 'magic-item',
        type: 'shield',
        baseAC: 2,
        description: 'This shield can be commanded to display different facial expressions. It provides no mechanical benefit.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shiftweave',
        category: 'magic-item',
        type: 'other',
        description: 'This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Smoldering Armor',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 16,
        description: 'This armor is always warm to the touch and sheds dim light in a 5-foot radius. While wearing it, you have resistance to cold damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Scroll',
        category: 'magic-item',
        type: 'other',
        description: 'A spell scroll contains a single spell that can be cast by a spellcaster who can read it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spellshard',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal shard can store spells like a spellbook. A wizard can use it to prepare spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spellwrought Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Adornment',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'This staff can be used as a spellcasting focus. While holding it, you can use a bonus action to cause it to shed bright light in a 20-foot radius.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Birdcalls',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'This staff can mimic the calls of birds. You can use an action to cause it to produce the sound of any bird you have heard.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Flowers',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'This staff can be used to create flowers. You can use an action to cause fresh flowers to bloom from the staff.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Strixhaven Pennant',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this pennant, you can use a bonus action to cause it to flutter dramatically, even in still air.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Talking Doll',
        category: 'magic-item',
        type: 'other',
        description: 'This doll can repeat the last sentence it heard. You can use an action to cause it to speak.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tankard of Plenty',
        category: 'magic-item',
        type: 'other',
        description: 'This tankard can be used to create any nonmagical beverage. You can use an action to fill it with the beverage of your choice.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tankard of Sobriety',
        category: 'magic-item',
        type: 'other',
        description: 'Any alcoholic beverage poured into this tankard becomes nonalcoholic. The beverage retains its original taste.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Thermal Cube',
        category: 'magic-item',
        type: 'other',
        description: 'This cube maintains a constant temperature. You can use an action to set it to any temperature between freezing and boiling.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Unbreakable Arrow',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'piercing',
        properties: ['ammunition', 'range (80/320)'],
        description: 'This arrow cannot be broken. If it would be destroyed, it instead returns to your quiver at the start of your next turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Veteran\'s Cane',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'This cane can be used as a quarterstaff. While holding it, you have advantage on Wisdom (Insight) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Vox Seeker',
        category: 'magic-item',
        type: 'other',
        description: 'This small device can be activated to seek out a specific voice. It points in the direction of the nearest source of that voice.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Walloping Ammunition',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you hit a target with this piece of ammunition, the target must succeed on a DC 10 Strength saving throw or be knocked prone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Conducting',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you can use it to conduct an invisible orchestra. You can use a bonus action to cause music to play.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Pyrotechnics',
        category: 'magic-item',
        type: 'other',
        description: 'This wand can create harmless fireworks. You can use an action to cause a burst of colorful sparks to appear.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Scowls',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you can use an action to cause a creature you can see to scowl for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Smiles',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you can use an action to cause a creature you can see to smile for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand Sheath',
        category: 'magic-item',
        type: 'other',
        description: 'This sheath can hold a wand. While a wand is sheathed, you can draw or stow it as part of the action used to cast a spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Adamantine Armor',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 16,
        description: 'This suit of armor is reinforced with adamantine, one of the hardest substances in existence. While you\'re wearing it, any critical hit against you becomes a normal hit.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Alchemy Jug',
        category: 'magic-item',
        type: 'other',
        description: 'This ceramic jug appears to be able to hold a gallon of liquid and weighs 12 pounds whether full or empty. Sloshing sounds can be heard from within the jug when it is shaken, even if the jug is empty.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Alchemy Jug (Blue)',
        category: 'magic-item',
        type: 'other',
        description: 'A blue variant of the alchemy jug that produces different liquids.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Alchemy Jug (Orange)',
        category: 'magic-item',
        type: 'other',
        description: 'An orange variant of the alchemy jug that produces different liquids.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'All-Purpose Tool',
        category: 'magic-item',
        type: 'other',
        description: 'This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan\'s tool of your choice.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ammunition, +1, +2, or +3',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of Proof Against Detection and Location',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you are hidden from divination magic. You can\'t be targeted by such magic or perceived through magical scrying sensors.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Devout',
        category: 'magic-item',
        type: 'other',
        description: 'This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Drunkard',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you have advantage on saving throws against being poisoned and against disease.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arcane Grimoire',
        category: 'magic-item',
        type: 'other',
        description: 'While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor Of Fungal Spores',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 14,
        description: 'While wearing this armor, you can use a bonus action to cause spores to burst from the armor. Each creature of your choice within 5 feet of you must succeed on a Constitution saving throw or be poisoned for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor Of The Fallen',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 16,
        description: 'This armor is imbued with the essence of fallen warriors. While wearing it, you have advantage on death saving throws.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor Of Weightlessness',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'heavy',
        baseAC: 16,
        description: 'This armor weighs only 1 pound regardless of its type. While wearing it, you have a climbing speed equal to your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bag Of Bounty',
        category: 'magic-item',
        type: 'other',
        description: 'This bag can produce a variety of food and drink. You can use an action to pull from the bag enough food to feed up to 5 people for one day.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bag of Holding',
        category: 'magic-item',
        type: 'other',
        description: 'This bag has an interior space considerably larger than its outside dimensions, roughly 2 feet in diameter at the mouth and 4 feet deep. The bag can hold up to 500 pounds, not exceeding a volume of 64 cubic feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bag of Tricks',
        category: 'magic-item',
        type: 'other',
        description: 'This ordinary bag, made from gray, rust, or tan cloth, appears empty. Reaching inside the bag, however, reveals the presence of a small, fuzzy object.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Balance of Harmony',
        category: 'magic-item',
        type: 'other',
        description: 'This scale can measure the balance between good and evil. While holding it, you can use an action to determine the alignment of a creature you can see.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Balloon Pack',
        category: 'magic-item',
        type: 'other',
        description: 'This backpack has a balloon attached that can be inflated. While inflated, you have a flying speed of 10 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Barrier Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blasted Goggles',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these goggles, you can see invisible creatures and objects as if they were visible, and you can see into the Ethereal Plane.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blood of the Lycanthrope Antidote',
        category: 'magic-item',
        type: 'other',
        description: 'A character who drinks this vial is cured of lycanthropy if they are currently transformed or infected.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blood Spear',
        category: 'magic-item',
        type: 'weapon',
        description: 'This spear is stained with blood that never dries. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodrage Greataxe',
        category: 'magic-item',
        type: 'weapon',
        description: 'This greataxe grows more powerful as you take damage. When you are below half your hit point maximum, you gain a bonus to attack and damage rolls made with this weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodwell Vial',
        category: 'magic-item',
        type: 'other',
        description: 'This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boomerang Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'This shield can be thrown and returns to you. When you make a ranged attack with it, it returns to your hand immediately after the attack.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of Elvenkind',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of Striding and Springing',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn\'t reduced if you are encumbered or wearing heavy armor. In addition, you can jump three times the normal distance.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of the Winterlands',
        category: 'magic-item',
        type: 'other',
        description: 'These furred boots are snug and feel quite warm. While you wear them, you gain the following benefits: You have resistance to cold damage. You can tolerate temperatures as low as -50 degrees Fahrenheit without any additional protection.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bottled Breath',
        category: 'magic-item',
        type: 'other',
        description: 'This bottle contains a single breath of air. When opened, it releases enough air for one creature to breathe for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bracers of Archery',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these bracers, you have proficiency with longbows and shortbows, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Brooch of Living Essence',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this brooch, you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Brooch of Shielding',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this brooch, you have resistance to force damage, and you are immune to damage from the magic missile spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Broom of Flying',
        category: 'magic-item',
        type: 'other',
        description: 'This wooden broom can fly through the air at your command. It can carry up to 400 pounds at a flying speed of 50 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cap of Water Breathing',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cap underwater, you can breathe normally. You can also speak normally underwater.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Card Sharp\'s Deck',
        category: 'magic-item',
        type: 'other',
        description: 'This deck of cards is always perfectly shuffled. While holding it, you have advantage on ability checks made to play card games.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Circlet of Blasting',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this circlet, you can use an action to cast the scorching ray spell with it. When you make the spell\'s attacks, you do so with an attack bonus of +5.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Circlet of Human Perfection',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this circlet, you can use an action to cast the alter self spell with it. This version of the spell lasts until you use an action to end it or remove the circlet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Elvenkind',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear this cloak with its hood up, Wisdom (Perception) checks made to see you have disadvantage, and you have advantage on Dexterity (Stealth) checks made to hide.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Protection',
        category: 'magic-item',
        type: 'other',
        description: 'You gain a +1 bonus to AC and saving throws while wearing this cloak.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of the Manta Ray',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak with its hood up, you can breathe underwater, and you have a swimming speed of 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Coiling Grasp Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo writhes on your skin. When a creature you can see moves within 5 feet of you, you can use your reaction to cause spectral tentacles to sprout from the tattoo and grapple the creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cracked Driftglobe',
        category: 'magic-item',
        type: 'other',
        description: 'This driftglobe is damaged and functions imperfectly. It sheds dim light in a 10-foot radius instead of bright light.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cursed Luckstone',
        category: 'magic-item',
        type: 'other',
        description: 'While you carry this stone, you have disadvantage on ability checks and saving throws. You cannot willingly part with the stone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Decanter of Endless Water',
        category: 'magic-item',
        type: 'other',
        description: 'This stoppered flask sloshes when shaken, as if it contains water. The decanter weighs 2 pounds. You can use an action to remove the stopper and speak one of three command words, whereupon an amount of fresh water or salt water (your choice) pours out of the flask.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck of Illusions',
        category: 'magic-item',
        type: 'other',
        description: 'This box contains a set of cards. A full deck has 34 cards. The deck is usually missing one or more cards.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Miscellany',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that produce various minor magical effects when drawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Wonder',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that produce wondrous effects when drawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Vessel',
        category: 'magic-item',
        type: 'other',
        description: 'This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragonhide Belt',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon\'s Wrath Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon-Touched Focus',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dried Leech',
        category: 'magic-item',
        type: 'other',
        description: 'This dried leech can be used to cure diseases. When applied to a diseased creature, it removes one disease.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Driftglobe',
        category: 'magic-item',
        type: 'other',
        description: 'This small sphere of crystal sheds bright light in a 20-foot radius and dim light for an additional 20 feet. When you use an action to speak the command word, the globe hovers 5 feet off the ground and moves in any direction you choose.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dust of Corrosion',
        category: 'magic-item',
        type: 'other',
        description: 'This dust can corrode metal. When sprinkled on a metal object, it causes the object to rust and deteriorate over time.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dust of Deliciousness',
        category: 'magic-item',
        type: 'other',
        description: 'This dust can make any food or drink taste delicious. When sprinkled on food or drink, it enhances the flavor.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dust of Disappearance',
        category: 'magic-item',
        type: 'other',
        description: 'Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dust of Dryness',
        category: 'magic-item',
        type: 'other',
        description: 'This small packet contains 1d6 + 4 pinches of dust. You can use an action to sprinkle a pinch of it over water. The dust turns a cube of water 15 feet on a side into one marble-sized pellet, which floats or rests near where the dust was sprinkled.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dust of Sneezing and Choking',
        category: 'magic-item',
        type: 'other',
        description: 'Found in a small container, this powder resembles very fine sand. It appears to be dust of disappearance, and an identification spell reveals it to be such. There is enough of it for one use.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Earworm',
        category: 'magic-item',
        type: 'other',
        description: 'This small creature burrows into your ear. While it lives there, you have advantage on Wisdom (Perception) checks that rely on hearing.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eldritch Claw Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo covers your hand and fingers. While the tattoo is on your skin, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Elemental Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem contains a mote of elemental energy. When you use an action to break the gem, an elemental is summoned as if you had cast the conjure elemental spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Emerald Pen',
        category: 'magic-item',
        type: 'other',
        description: 'This pen never runs out of ink and can write on any surface. It writes at a rate of 250 words per minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eversmoking Bottle',
        category: 'magic-item',
        type: 'other',
        description: 'Smoke leaks from the lead-stoppered mouth of this brass bottle, which weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out in a 60-foot radius from the bottle.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eyes of Charming',
        category: 'magic-item',
        type: 'other',
        description: 'These crystal lenses fit over the eyes. While wearing them, you have advantage on Charisma (Persuasion) checks, and you can cast the charm person spell (save DC 13) once per day.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eyes of Minute Seeing',
        category: 'magic-item',
        type: 'other',
        description: 'These crystal lenses fit over the eyes. While wearing them, you can see much better than normal out to a range of 1 foot. You have advantage on Wisdom (Perception) checks that rely on sight while searching an area or studying an object within that range.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eyes of the Eagle',
        category: 'magic-item',
        type: 'other',
        description: 'These crystal lenses fit over the eyes. While wearing them, you have advantage on Wisdom (Perception) checks that rely on sight. In conditions of clear visibility, you can make out details of even extremely distant creatures and objects as small as 2 feet across.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fabulist Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem can store a lie. When you tell a lie while holding it, the gem records it. You can later use an action to cause the gem to repeat the lie.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Feywild Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard of the Feywild can be used to enhance spells. While holding it, you can choose to have one of your spells deal additional damage or have an additional effect.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Figurine of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Finder\'s Goggles',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these goggles, you can use an action to cast the locate object spell from them. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gauntlets of Ogre Power',
        category: 'magic-item',
        type: 'other',
        description: 'Your Strength score is 19 while you wear these gauntlets. They have no effect on you if your Strength is already 19 or higher.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gem of Brightness',
        category: 'magic-item',
        type: 'other',
        description: 'This prism has 50 charges. While holding it, you can use an action to speak one of three command words to cause one of the following effects.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Glamerweave',
        category: 'magic-item',
        type: 'other',
        description: 'This clothing can be commanded to change its appearance. As an action, you can cause it to appear as any other type of clothing.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gloves of Missile Snaring',
        category: 'magic-item',
        type: 'other',
        description: 'These gloves seem almost weightless. When a ranged weapon attack hits you while you\'re wearing them, you can use your reaction to reduce the damage by 1d10 + your Dexterity modifier, provided that you have a free hand.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gloves of Swimming and Climbing',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these gloves, climbing and swimming don\'t cost you extra movement, and you gain a +5 bonus to Strength (Athletics) checks made to climb or swim.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gloves of Thievery',
        category: 'magic-item',
        type: 'other',
        description: 'These gloves are invisible while worn. While wearing them, you gain a +5 bonus to Dexterity (Sleight of Hand) checks and Dexterity checks made to pick locks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Goggles of Night',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these dark lenses, you have darkvision out to a range of 60 feet. If you already have darkvision, wearing the goggles increases its range by 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Goggles of Object Reading',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these goggles, you can use an action to touch an object and learn its history. You learn significant events involving the object over the past 24 hours.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Guardian Emblem',
        category: 'magic-item',
        type: 'other',
        description: 'This emblem can be attached to a shield. While attached, the shield grants you a bonus to AC.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Guild Keyrune',
        category: 'magic-item',
        type: 'other',
        description: 'This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Guild Signet',
        category: 'magic-item',
        type: 'other',
        description: 'This signet ring represents a guild. While wearing it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Harkon\'s Bite',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a vampire. When you hit a creature with it, you can choose to deal extra necrotic damage and regain hit points equal to half the damage dealt.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hat of Disguise',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this hat, you can use an action to cast the disguise self spell at will. The spell ends if the hat is removed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Headband of Intellect',
        category: 'magic-item',
        type: 'other',
        description: 'Your Intelligence score is 19 while you wear this headband. It has no effect on you if your Intelligence is already 19 or higher.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hellfire Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with hellfire. When you hit a creature with it, you can choose to deal extra fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Comprehending Languages',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use an action to cast the comprehend languages spell from it at will.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Telepathy',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use an action to cast the detect thoughts spell (save DC 13) from it. As long as you maintain concentration on the spell, you can use a bonus action to send a telepathic message to a creature you are focused on.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Underwater Action',
        category: 'magic-item',
        type: 'other',
        description: 'This helm is made of metal and has a glass faceplate. While wearing it, you can breathe underwater, and you have a swimming speed of 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'House Of Cards',
        category: 'magic-item',
        type: 'other',
        description: 'This deck of cards can be used to create a small structure. When you use an action to play the cards, they form a 10-foot cube structure.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Immovable Rod',
        category: 'magic-item',
        type: 'other',
        description: 'This flat iron rod has a button on one end. You can use an action to press the button, which causes the rod to become magically fixed in place.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Infernal Puzzle Box',
        category: 'magic-item',
        type: 'other',
        description: 'This puzzle box can only be opened by solving a complex puzzle. Once opened, it reveals its contents.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Inquisitive\'s Goggles',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these goggles, you have advantage on Wisdom (Investigation) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Insignia of Claws',
        category: 'magic-item',
        type: 'other',
        description: 'The jewels in this insignia of the Cult of the Dragon flare with purple light when you enter combat, empowering your natural weapons or unarmed strikes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of the Bards',
        category: 'magic-item',
        type: 'other',
        description: 'An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Javelin of Lightning',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you hurl it and speak its command word, it transforms into a bolt of lightning, forming a line 5 feet wide that extends out from you to a target within 120 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Keoghtom\'s Ointment',
        category: 'magic-item',
        type: 'other',
        description: 'This glass jar, 3 inches in diameter, contains 1d4 + 1 doses of a thick mixture that smells faintly of aloe. The jar and its contents weigh 1/2 pound.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lantern of Revealing',
        category: 'magic-item',
        type: 'other',
        description: 'While lit, this hooded lantern burns for 6 hours on 1 pint of oil, shedding bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern\'s bright light.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Living Gloves',
        category: 'magic-item',
        type: 'other',
        description: 'These gloves are made of living material. While wearing them, you have advantage on Dexterity (Sleight of Hand) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lorehold Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge from Lorehold College. While holding it, you have advantage on Intelligence (History) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mariner\'s Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have a swimming speed equal to your walking speed. In addition, whenever you start your turn underwater with 0 hit points, you regain 1 hit point.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mask of the Beast',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mask, you can use an action to cast the speak with animals spell from it. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Medallion of Thoughts',
        category: 'magic-item',
        type: 'other',
        description: 'The medallion has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the detect thoughts spell (save DC 13) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Carapace Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the carapace of a mind flayer. While wearing it, you have advantage on saving throws against being charmed or frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Crystal',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mithral Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'Mithral is a light, flexible metal. A suit of armor or shield made of mithral weighs half as much as a normal suit of armor or shield of that type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mizzium Apparatus',
        category: 'magic-item',
        type: 'other',
        description: 'This apparatus can be used to cast spells you don\'t know. While holding it, you can attempt to cast any spell of a level you can cast.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moon Sickle',
        category: 'magic-item',
        type: 'weapon',
        description: 'This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mummy Rot Antidote',
        category: 'magic-item',
        type: 'other',
        description: 'A character who drinks this vial is cured of mummy rot if they are currently infected.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nature\'s Mantle',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mantle, you can use an action to cast the pass without trace spell from it. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Necklace of Adaptation',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this necklace, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Night Caller',
        category: 'magic-item',
        type: 'other',
        description: 'This whistle can summon undead. When you blow it, you can use an action to cast the animate dead spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Oil of Slipperiness',
        category: 'magic-item',
        type: 'other',
        description: 'This sticky black unguent is thick and heavy in the container, but it flows quickly when poured. The oil can cover a Medium or smaller creature, along with the equipment it\'s wearing and carrying (one additional vial is required for each size category above Medium).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Paper Bird',
        category: 'magic-item',
        type: 'other',
        description: 'This paper bird can be folded into a message. When you fold it, it becomes a bird that can deliver the message to a creature you know.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pearl of Power',
        category: 'magic-item',
        type: 'other',
        description: 'While this pearl is on your person, you can use an action to speak its command word and regain one expended spell slot. If the expended slot is of 4th level or higher, the new slot is 3rd level.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Periapt of Health',
        category: 'magic-item',
        type: 'other',
        description: 'You are immune to contracting any disease while you wear this pendant. If you are already infected with a disease, the pendant\'s power doesn\'t cure it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Periapt of Wound Closure',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear this pendant, you stabilize whenever you are dying at the start of your turn. In addition, whenever you roll a Hit Die to regain hit points, double the number of hit points it restores.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Philter of Love',
        category: 'magic-item',
        type: 'other',
        description: 'The next time you see a creature within 10 minutes after drinking this philter, you become charmed by that creature for 1 hour. If the creature is of a species and gender you are normally attracted to, you regard it as your true love while you are charmed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pipes of Haunting',
        category: 'magic-item',
        type: 'other',
        description: 'You must be proficient with wind instruments to use these pipes. They have 3 charges. You can use an action to play them and expend 1 charge to create an eerie, spellbinding tune.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pipes of the Sewers',
        category: 'magic-item',
        type: 'other',
        description: 'You must be proficient with wind instruments to use these pipes. While you are attuned to the pipes, ordinary rats and giant rats are indifferent toward you and will not attack you unless you threaten or harm them.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Piwafwi',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In addition, you can use an action to cast the invisibility spell on yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pixie Dust',
        category: 'magic-item',
        type: 'other',
        description: 'This dust can be used to cast the fly spell. When sprinkled on a creature, it grants that creature a flying speed of 60 feet for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Plate Of Knight\'s Fellowship',
        category: 'magic-item',
        type: 'other',
        description: 'This plate represents a knightly order. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that order.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prehistoric Figurines of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prismari Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge from Prismari College. While holding it, you have advantage on Charisma (Performance) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Propeller Helm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use a bonus action to cause a propeller to extend from the top. While the propeller is active, you have a flying speed of 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Psi Crystal',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal enhances psionic abilities. While holding it, you gain a bonus to psionic attack rolls and the saving throw DCs of your psionic powers.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pyroconverger',
        category: 'magic-item',
        type: 'other',
        description: 'This device can convert heat into energy. While holding it, you can use an action to cast the fireball spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Quandrix Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge from Quandrix College. While holding it, you have advantage on Intelligence (Investigation) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Quiver of Ehlonna',
        category: 'magic-item',
        type: 'other',
        description: 'Each of the quiver\'s three compartments connects to an extradimensional space that allows the quiver to hold numerous items while never weighing more than 2 pounds, regardless of its contents.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rhythm Maker\'s Drum',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Jumping',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can cast the jump spell from it as a bonus action at will, but can target only yourself when you do so.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Mind Shielding',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you are immune to magic that allows other creatures to read your thoughts, determine whether you are lying, know your alignment, or know your creature type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Obscuring',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to cast the fog cloud spell from it. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring Of Puzzler\'s Wit',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on Intelligence checks made to solve puzzles.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Swimming',
        category: 'magic-item',
        type: 'other',
        description: 'You have a swimming speed of 40 feet while wearing this ring.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of the Orator',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on Charisma (Persuasion) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Truth Telling',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to cast the zone of truth spell from it. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Warmth',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Water Walking',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can stand on and move across any liquid surface as if it were solid ground.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rings of Shared Suffering',
        category: 'magic-item',
        type: 'other',
        description: 'These rings come in pairs. When you take damage while wearing one ring, the wearer of the other ring takes half that damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Serpents',
        category: 'magic-item',
        type: 'other',
        description: 'This robe is covered in embroidered serpents. While wearing it, you can use an action to cast the animal friendship spell (save DC 15) on a snake within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Useful Items',
        category: 'magic-item',
        type: 'other',
        description: 'This robe has cloth patches of various shapes on it. While wearing the robe, you can use an action to detach one of the patches, causing it to become the object or creature it represents.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Retribution',
        category: 'magic-item',
        type: 'other',
        description: 'This rod can store spells. When you cast a spell while holding it, you can choose to store the spell in the rod. You can later use an action to cast the stored spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of the Pact Keeper, +1, +2, +3',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rope of Climbing',
        category: 'magic-item',
        type: 'other',
        description: 'This 60-foot length of silk rope weighs 3 pounds and can hold up to 3,000 pounds. If you hold one end of the rope and use an action to speak the command word, the rope animates.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Saddle of the Cavalier',
        category: 'magic-item',
        type: 'other',
        description: 'While in this saddle on a mount, you can\'t be dismounted against your will. In addition, the mount\'s AC can\'t be less than 13 while you\'re riding it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scaled Ornament',
        category: 'magic-item',
        type: 'other',
        description: 'This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Seeker Dart',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d4',
        damageType: 'piercing',
        properties: ['finesse', 'thrown', 'range (20/60)'],
        description: 'When you throw this dart, it magically seeks out a target you can see within 120 feet. The dart has a +3 bonus to attack and damage rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sending Stones',
        category: 'magic-item',
        type: 'other',
        description: 'Sending stones come in pairs, with each smooth stone carved to match the other so the pairing is obvious. While you touch one stone, you can use an action to cast the sending spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sensory Stone',
        category: 'magic-item',
        type: 'other',
        description: 'This stone can store sensory experiences. When you touch it, you can experience the sensations stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sentinel Shield',
        category: 'magic-item',
        type: 'shield',
        baseAC: 2,
        description: 'While holding this shield, you have advantage on initiative rolls and Wisdom (Perception) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Serpent Scale Armor',
        category: 'magic-item',
        type: 'armor',
        armorMethod: 'medium',
        baseAC: 14,
        description: 'This armor is made from the scales of a serpent. While wearing it, you have resistance to poison damage and advantage on saving throws against being poisoned.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shatterspike',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d8',
        damageType: 'piercing',
        properties: ['versatile'],
        description: 'When you hit an object with this weapon, the attack deals maximum damage to the object.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield, +1, +2, +3',
        category: 'magic-item',
        type: 'shield',
        baseAC: 3,
        description: 'While holding this shield, you have a bonus to AC. The bonus is determined by the shield\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield Of The Tortoise',
        category: 'magic-item',
        type: 'shield',
        baseAC: 2,
        description: 'While holding this shield, you can use a bonus action to gain a +2 bonus to AC until the start of your next turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Silverquill Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge from Silverquill College. While holding it, you have advantage on Charisma (Persuasion) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Skyblinder Staff',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'This staff can be used as a spellcasting focus. While holding it, you can use an action to cast the blindness/deafness spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sling Of Giant Felling',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d4',
        damageType: 'bludgeoning',
        properties: ['ammunition', 'range (30/120)'],
        description: 'When you hit a giant with this sling, the giant must succeed on a Strength saving throw or be knocked prone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Slippers of Spider Climbing',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these light shoes, you can move up, down, and across vertical surfaces and upside down along ceilings, while leaving your hands free. You have a climbing speed equal to your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Smokepowder',
        category: 'magic-item',
        type: 'other',
        description: 'This black powder can be used as ammunition for firearms. When ignited, it creates a loud explosion.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Soul Coin',
        category: 'magic-item',
        type: 'other',
        description: 'This coin contains a trapped soul. While holding it, you can use an action to release the soul, which then serves you for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Scroll',
        category: 'magic-item',
        type: 'other',
        description: 'A spell scroll contains a single spell that can be cast by a spellcaster who can read it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spellwrought Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spies\' Murmur',
        category: 'magic-item',
        type: 'other',
        description: 'This item allows you to communicate silently. While holding it, you can use an action to send a telepathic message to a creature you can see within 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Adder',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'You can use a bonus action to speak this staff\'s command word and cause the head of the staff to transform into that of an animate serpent for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Python',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d6',
        damageType: 'bludgeoning',
        properties: ['versatile'],
        description: 'You can use an action to speak this staff\'s command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant constrictor snake under your control and acts on its own initiative count.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stone of Good Luck (Luckstone)',
        category: 'magic-item',
        type: 'other',
        description: 'While this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stone of Ill Luck',
        category: 'magic-item',
        type: 'other',
        description: 'While this stone is on your person, you have disadvantage on ability checks and saving throws. You cannot willingly part with the stone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Storm Boomerang',
        category: 'magic-item',
        type: 'weapon',
        description: 'This boomerang can be thrown and returns to you. When you hit a creature with it, you can choose to deal extra lightning damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of Vengeance',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When a creature damages you, the sword becomes attuned to that creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Thessaltoxin Antidote',
        category: 'magic-item',
        type: 'other',
        description: 'A character who drinks this vial is cured of thessaltoxin poisoning if they are currently poisoned.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Trident of Fish Command',
        category: 'magic-item',
        type: 'weapon',
        description: 'This trident is a magic weapon. It has 3 charges. While you carry it, you can use an action and expend 1 charge to cast dominate beast (save DC 15) from it on a beast that has an innate swimming speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Entangle',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the entangle spell (save DC 15) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Magic Detection',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 3 charges. While holding it, you can use an action to expend 1 of its charges to cast the detect magic spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Magic Missiles',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the magic missile spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Secrets',
        category: 'magic-item',
        type: 'other',
        description: 'The wand has 3 charges. While holding it, you can use an action to expend 1 of its charges. If you do, the wand pulses and points at the nearest secret door or trap within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of the War Mage',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Web',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the web spell (save DC 15) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weapon, +1, +2, or +3',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weapon of Warning',
        category: 'magic-item',
        type: 'weapon',
        damage: '1d8',
        damageType: 'slashing',
        properties: ['versatile'],
        description: 'This magic weapon warns you of danger. While the weapon is on your person, you have advantage on initiative rolls. In addition, you and any of your companions within 30 feet of you can\'t be surprised, except when incapacitated by something other than nonmagical sleep.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wheel of Wind and Water',
        category: 'magic-item',
        type: 'other',
        description: 'This wheel can control wind and water. While holding it, you can use an action to cast the control water or control winds spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wildspace Orrery',
        category: 'magic-item',
        type: 'other',
        description: 'This orrery shows the positions of celestial bodies. While holding it, you always know your position relative to major stars and planets.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wind Fan',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this fan, you can use an action to cast the gust of wind spell (save DC 13) from it. Once used, the fan shouldn\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Winged Ammunition',
        category: 'magic-item',
        type: 'weapon',
        description: 'This piece of ammunition has small wings. When you fire it, it can change direction once to hit a target you can see.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Winged Boots',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, you have a flying speed equal to your walking speed. You can use the boots to fly for up to 4 hours, all at once or in several shorter flights, each one using a minimum of 1 minute from the duration.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wingwear',
        category: 'magic-item',
        type: 'other',
        description: 'This clothing has wings attached. While wearing it, you have a flying speed equal to your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Witherbloom Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge from Witherbloom College. While holding it, you have advantage on Wisdom (Nature) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wraps Of Unarmed Prowess',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Acheron Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This blade is forged from metal found in the River of Blood. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Alchemical Compendium',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains formulas for creating alchemical items. While holding it, you have advantage on Intelligence checks made to create alchemical items.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'All-Purpose Tool',
        category: 'magic-item',
        type: 'other',
        description: 'This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan\'s tool of your choice.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ammunition, +1, +2, or +3',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of Health',
        category: 'magic-item',
        type: 'other',
        description: 'Your Constitution score is 19 while you wear this amulet. It has no effect on you if your Constitution is already 19 or higher.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of Protection from Turning',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you are immune to being turned by clerics or paladins.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Devout',
        category: 'magic-item',
        type: 'other',
        description: 'This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arcane Grimoire',
        category: 'magic-item',
        type: 'other',
        description: 'While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor, +1, +2, or +3',
        category: 'magic-item',
        type: 'armor',
        description: 'You have a bonus to AC while wearing this armor. The bonus is determined by the armor\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor of Resistance',
        category: 'magic-item',
        type: 'armor',
        description: 'You have resistance to one damage type while wearing this armor. The damage type is determined by the armor\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor of Vulnerability',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is cursed. While wearing it, you have vulnerability to one damage type. You cannot remove the armor until you are targeted by the remove curse spell or similar magic.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arrow-Catching Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have advantage on Dexterity saving throws against ranged weapon attacks, and if you aren\'t incapacitated, you can use your reaction to reduce the damage you take from a ranged weapon attack by 1d10 + your Dexterity modifier.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Astral Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains astral energy. While holding it, you can use an action to cast the misty step spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Astromancy Archive',
        category: 'magic-item',
        type: 'other',
        description: 'This archive contains knowledge of the stars and planets. While holding it, you have advantage on Intelligence (Astronomy) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Atlas of Endless Horizons',
        category: 'magic-item',
        type: 'other',
        description: 'This atlas can show you any location in the multiverse. While holding it, you can use an action to view a location you have seen before.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Badge of the Watch',
        category: 'magic-item',
        type: 'other',
        description: 'This badge represents a watch organization. While wearing it, you have advantage on Charisma (Persuasion) checks made to interact with members of that organization.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bag of Beans',
        category: 'magic-item',
        type: 'other',
        description: 'Inside this heavy cloth bag are 3d4 dry beans. The bag weighs 5 pounds plus 1 pound per bean. If you dump the bag\'s contents out on the ground, they explode in a 10-foot radius, extending that radius by 5 feet for each bean beyond the first in the bag.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Banner of the Krig Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This banner bears the Krig rune. While holding it, you can use an action to cast the bless spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Barrier Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Battering Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you can use a bonus action to shove a creature within 5 feet of you. If you succeed, the creature is pushed 5 feet away from you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bead of Force',
        category: 'magic-item',
        type: 'other',
        description: 'This small sphere weighs 1 ounce. When you throw it, it creates a 10-foot-radius sphere of force centered on the point where it lands.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bell Branch',
        category: 'magic-item',
        type: 'other',
        description: 'This branch has small bells attached. When you shake it, you can cast the calm emotions spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Belt of Dwarvenkind',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, you have advantage on Charisma (Persuasion) checks made to interact with dwarves. In addition, while attuned to the belt, you have advantage on saving throws against poison, and you have resistance against poison damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Belt of Giant Strength',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt\'s score, the item has no effect on you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Berserker Axe',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is cursed. While attuned to it, you have a +1 bonus to attack and damage rolls made with this magic weapon. In addition, while you are attuned to this weapon, your hit point maximum increases by 1 for each level you have attained.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blod Stone',
        category: 'magic-item',
        type: 'other',
        description: 'This stone is stained with blood. While holding it, you can use an action to cast the blood curse spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodwell Vial',
        category: 'magic-item',
        type: 'other',
        description: 'This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bonecounter',
        category: 'magic-item',
        type: 'other',
        description: 'This item can count bones. While holding it, you can use an action to determine the number of bones within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of Levitation',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, you can use an action to cast the levitate spell on yourself at will.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Boots of Speed',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, you can use a bonus action and click the boots\' heels together. If you do, you double your walking speed, and any creature that makes an opportunity attack against you has disadvantage on the attack roll.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bow Of Conflagration',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you hit a creature with this bow, you can choose to deal extra fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bowl of Commanding Water Elementals',
        category: 'magic-item',
        type: 'other',
        description: 'While this bowl is filled with water, you can use an action to speak the bowl\'s command word and summon a water elemental, as if you had cast the conjure elemental spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bracer of Flying Daggers',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this bracer, you can use a bonus action to cause a dagger to fly from it and attack a target within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bracers of Celerity',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these bracers, you can use a bonus action to take the Dash action.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bracers of Defense',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these bracers, you gain a +2 bonus to AC if you are wearing no armor and using no shield.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Brazier of Commanding Fire Elementals',
        category: 'magic-item',
        type: 'other',
        description: 'While a fire burns in this brazier, you can use an action to speak the brazier\'s command word and summon a fire elemental, as if you had cast the conjure elemental spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Breastplate Of Balance',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on saving throws against being knocked prone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bridle of Capturing',
        category: 'magic-item',
        type: 'other',
        description: 'This bridle can be used to capture and control a mount. When placed on a willing beast, the beast becomes your mount and follows your commands.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Butcher\'s Bib',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this bib, you have advantage on attack rolls against creatures that are bleeding.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cape of the Mountebank',
        category: 'magic-item',
        type: 'other',
        description: 'This cape smells faintly of brimstone. While wearing it, you can use it to cast the dimension door spell as an action. This property of the cape can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cauldron of Plenty',
        category: 'magic-item',
        type: 'other',
        description: 'This cauldron can produce food. You can use an action to cause it to create enough food to feed up to 10 people for one day.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Censer of Controlling Air Elementals',
        category: 'magic-item',
        type: 'other',
        description: 'While incense burns in this censer, you can use an action to speak the censer\'s command word and summon an air elemental, as if you had cast the conjure elemental spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Charm of Plant Command',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this charm, you can use an action to cast the speak with plants spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chime of Opening',
        category: 'magic-item',
        type: 'other',
        description: 'This hollow metal tube measures about 1 foot long and weighs 1 pound. You can strike it as an action, pointing it at an object that isn\'t being worn or carried.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chromatic Rose',
        category: 'magic-item',
        type: 'other',
        description: 'This rose changes color based on the emotions of nearby creatures. While holding it, you can use an action to determine the emotional state of creatures within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Claw of the Wyrm Rune',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a wyrm. When you hit a creature with it, you can choose to deal extra damage of a type determined by the wyrm\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Claws of the Umber Hulk',
        category: 'magic-item',
        type: 'weapon',
        description: 'These claws are taken from an umber hulk. While wearing them, you can use an action to make a melee attack with them.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Displacement',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of the Bat',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you have advantage on Dexterity (Stealth) checks. In an area of dim light or darkness, you can grip the edges of the cloak with both hands and use it to fly at a speed of 40 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Corpse Slayer',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon deals extra damage to undead creatures. When you hit an undead creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crown of the Wrath Bringer',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this crown, you have advantage on Charisma (Intimidation) checks. In addition, you can use an action to cast the fear spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crystal Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This blade is made of crystal. When you hit a creature with it, you can choose to deal extra force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cube of Force',
        category: 'magic-item',
        type: 'other',
        description: 'This cube is about an inch across. Each face has a distinct marking on it. You can use an action to press one of the cube\'s faces, expending 1 charge and causing the cube to create an invisible barrier around you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Daern\'s Instant Fortress',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to place this 1-inch metal cube on the ground and speak its command word. The cube rapidly grows into a fortress that remains until you use an action to speak the command word that dismisses it, which works only if the fortress is empty.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dagger of Blindsight',
        category: 'magic-item',
        type: 'weapon',
        description: 'While holding this dagger, you have blindsight out to a range of 10 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dagger of Venom',
        category: 'magic-item',
        type: 'weapon',
        description: 'You can use an action to cause thick, black poison to coat the blade. The poison remains for 1 minute or until an attack using this weapon hits a creature. That creature must succeed on a DC 15 Constitution saving throw or take 2d10 poison damage and become poisoned for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Oracles',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that can answer questions about the future. When you draw a card, you can ask it a question and receive an answer.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Delver\'s Claws',
        category: 'magic-item',
        type: 'weapon',
        description: 'These claws are designed for digging. While wearing them, you have a burrowing speed of 10 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Demon Skin',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the skin of a demon. While wearing it, you have resistance to fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Devotee\'s Censer',
        category: 'magic-item',
        type: 'other',
        description: 'This censer can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your cleric spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dimensional Shackles',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to place these shackles on an incapacitated creature. The shackles adjust to fit a creature of Small to Large size. In addition to serving as mundane manacles, the shackles prevent a creature from using any method of extradimensional movement, including teleportation or travel to a different plane of existence.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Docent',
        category: 'magic-item',
        type: 'other',
        description: 'This item can provide guidance and instruction. While holding it, you have advantage on Intelligence checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dodecahedron of Doom',
        category: 'magic-item',
        type: 'other',
        description: 'This 12-sided die is cursed. When you roll it, you must make a saving throw or suffer a random effect.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Donjon\'s Sundering Sphere',
        category: 'magic-item',
        type: 'other',
        description: 'This sphere can be used to destroy objects. When you throw it at an object, the object takes maximum damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Slayer',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a dragon with this weapon, the dragon takes an extra 3d6 damage of the weapon\'s type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Vessel',
        category: 'magic-item',
        type: 'other',
        description: 'This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Wing Bow',
        category: 'magic-item',
        type: 'weapon',
        description: 'This bow is made from the wing of a dragon. When you hit a creature with it, you can choose to deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragonhide Belt',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon\'s Wrath Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragontooth Dagger',
        category: 'magic-item',
        type: 'weapon',
        description: 'This dagger is made from a dragon\'s tooth. When you hit a creature with it, you can choose to deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon-Touched Focus',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Duplicitous Manuscript',
        category: 'magic-item',
        type: 'other',
        description: 'This manuscript can change its contents. While holding it, you can use an action to cause it to display different text.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eagle Whistle',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this whistle, you can summon an eagle. The eagle serves you for 1 hour or until it is reduced to 0 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Elemental Essence Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains the essence of an element. While holding it, you can use an action to cast a spell related to that element.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Elixir of Health',
        category: 'magic-item',
        type: 'other',
        description: 'When you drink this elixir, it cures any disease afflicting you. The clear red liquid has tiny bubbles of light in it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Elven Chain',
        category: 'magic-item',
        type: 'armor',
        description: 'You gain a +1 bonus to AC while you wear this armor. You are considered proficient with this armor even if you lack proficiency with medium armor.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Far Realm Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains energy from the Far Realm. While holding it, you can use an action to cast a spell that deals psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fate Dealer\'s Deck',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Feather of Diatryma Summoning',
        category: 'magic-item',
        type: 'other',
        description: 'When you use an action to throw this feather, it summons a diatryma. The bird serves you for 1 hour or until it is reduced to 0 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Feywrought Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made in the Feywild. While wearing it, you have advantage on saving throws against being charmed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Figurine of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Flame Tongue',
        category: 'magic-item',
        type: 'weapon',
        description: 'You can use a bonus action to speak this magic sword\'s command word, causing flames to erupt from the blade. These flames shed bright light in a 40-foot radius and dim light for an additional 40 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Flayer Slayer',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon deals extra damage to mind flayers. When you hit a mind flayer with it, you can choose to deal extra psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Flying Chariot',
        category: 'magic-item',
        type: 'other',
        description: 'This chariot can fly through the air. While riding it, you have a flying speed of 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Folding Boat',
        category: 'magic-item',
        type: 'other',
        description: 'This object appears to be a wooden box that measures 12 inches long, 12 inches wide, and 6 inches deep. It weighs 4 pounds and floats. You can use an action to speak the command word and fold the boat into a box or unfold it into a boat.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fulminating Treatise',
        category: 'magic-item',
        type: 'other',
        description: 'This book can explode. When you open it, you can use an action to cause it to explode, dealing fire damage to creatures within 10 feet of it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Galder\'s Bubble Pipe',
        category: 'magic-item',
        type: 'other',
        description: 'While smoking this pipe, you can use an action to blow bubbles that create harmless visual effects.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gambler\'s Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon\'s damage is unpredictable. When you hit with it, you roll an additional die to determine the damage type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gauntlets of Flaming Fury',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these gauntlets, your unarmed strikes deal fire damage instead of bludgeoning damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gavel of the Venn Rune',
        category: 'magic-item',
        type: 'weapon',
        description: 'This gavel bears the Venn rune. When you strike it, you can cast the command spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gem of Seeing',
        category: 'magic-item',
        type: 'other',
        description: 'This gem has 3 charges. While holding it, you can use an action to expend 1 charge to cast the detect magic spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ghost Lantern',
        category: 'magic-item',
        type: 'other',
        description: 'While this lantern is lit, it sheds bright light in a 30-foot radius and dim light for an additional 30 feet. Invisible creatures and objects are visible as long as they are in the lantern\'s bright light.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Giant Slayer',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a giant with it, the giant takes an extra 2d6 damage of the weapon\'s type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Glamoured Studded Leather',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you gain a +1 bonus to AC. You can also use a bonus action to speak the armor\'s command word and cause the armor to assume the appearance of a normal set of clothing or some other kind of armor.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Glimmering Moonbow',
        category: 'magic-item',
        type: 'weapon',
        description: 'This bow glimmers with moonlight. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gloomwrought Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made in the Shadowfell. While wearing it, you have advantage on Dexterity (Stealth) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Glowrune Pigment',
        category: 'magic-item',
        type: 'other',
        description: 'This pigment can be used to create glowing marks. When you paint with it, the marks glow with dim light in a 5-foot radius.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Grasping Whip',
        category: 'magic-item',
        type: 'weapon',
        description: 'This whip can grapple creatures. When you hit a creature with it, you can use a bonus action to attempt to grapple the target.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Guild Keyrune',
        category: 'magic-item',
        type: 'other',
        description: 'This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gulthias Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff is made from the wood of a blighted tree. While holding it, you can use an action to cast the blight spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Heart Weaver\'s Primer',
        category: 'magic-item',
        type: 'other',
        description: 'This primer contains knowledge of emotions and relationships. While holding it, you have advantage on Charisma (Persuasion) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hell Hound Cloak',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you have resistance to fire damage. In addition, you can use an action to cast the fireball spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Teleportation',
        category: 'magic-item',
        type: 'other',
        description: 'This helm has 3 charges. While wearing it, you can use an action and expend 1 charge to cast the teleport spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of the Gods',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you have advantage on saving throws against being charmed or frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Heward\'s Handy Haversack',
        category: 'magic-item',
        type: 'other',
        description: 'This backpack has a central pouch and two side pouches, each of which is an extradimensional space. Each side pouch can hold up to 20 pounds of material, not exceeding a volume of 2 cubic feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hook of Fisher\'s Delight',
        category: 'magic-item',
        type: 'other',
        description: 'This hook can be used to catch fish. While holding it, you have advantage on Wisdom (Survival) checks made to catch fish.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Blasting',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to speak this horn\'s command word and then blow it, producing one of three effects. Once the horn has been used, it can\'t be used again until 7 days have passed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of the Endless Maze',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this horn, you can create a maze. Creatures within 30 feet of you must succeed on a Wisdom saving throw or become lost.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Valhalla',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horseshoes of Speed',
        category: 'magic-item',
        type: 'other',
        description: 'These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they increase the creature\'s walking speed by 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Iggwylv\'s Horn',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this horn, you can summon fey creatures. The creatures serve you for 1 hour or until they are reduced to 0 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of the Bards',
        category: 'magic-item',
        type: 'other',
        description: 'An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ioun Stone',
        category: 'magic-item',
        type: 'other',
        description: 'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Iron Bands of Bilarro',
        category: 'magic-item',
        type: 'other',
        description: 'This rusty iron sphere measures 3 inches in diameter and weighs 1 pound. You can use an action to speak the command word and throw the sphere at a Huge or smaller creature you can see within 60 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Kagonesti Forest Shroud',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this shroud, you have advantage on Dexterity (Stealth) checks made in forest terrain.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Knave\'s Eye Patch',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this eye patch, you have advantage on Wisdom (Perception) checks that rely on sight. However, you have disadvantage on attack rolls against targets more than 30 feet away.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lash of Immolation',
        category: 'magic-item',
        type: 'weapon',
        description: 'This whip is wreathed in flames. When you hit a creature with it, you can choose to deal extra fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Leather Golem Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the hide of a golem. While wearing it, you have resistance to nonmagical bludgeoning, piercing, and slashing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Libram of Souls and Flesh',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains knowledge of necromancy. While holding it, you have advantage on Intelligence (Religion) checks made to understand undead.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Loadstone',
        category: 'magic-item',
        type: 'other',
        description: 'This stone is extremely heavy. While holding it, your movement speed is halved.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Luminous War Pick',
        category: 'magic-item',
        type: 'weapon',
        description: 'This war pick glows with light. While holding it, you can use an action to cause it to shed bright light in a 20-foot radius.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lyre of Building',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this lyre, you can use an action to cast the fabricate spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mace of Disruption',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you hit a fiend or an undead with this magic weapon, that creature takes an extra 2d6 radiant damage. If the target has 25 hit points or fewer after taking this damage, it must succeed on a DC 15 Wisdom saving throw or be destroyed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mace of Smiting',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. When you hit a construct with it, that target takes an extra 2d6 bludgeoning damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mace of Terror',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon has 3 charges. While holding it, you can use an action and expend 1 charge to cause each creature of your choice within 30 feet of you to make a DC 15 Wisdom saving throw.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mantle of Spell Resistance',
        category: 'magic-item',
        type: 'other',
        description: 'You have advantage on saving throws against spells while you wear this mantle.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mimir',
        category: 'magic-item',
        type: 'other',
        description: 'This item can answer questions. While holding it, you can use an action to ask it a question and receive an answer.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This blade deals psychic damage. When you hit a creature with it, you can choose to deal psychic damage instead of the weapon\'s normal damage type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Crystal',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal can store a spell. You can cast a spell into the crystal, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mind Lash',
        category: 'magic-item',
        type: 'weapon',
        description: 'This whip deals psychic damage. When you hit a creature with it, you can choose to deal psychic damage instead of the weapon\'s normal damage type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mirror of the Past',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this mirror, you can use an action to view the past of a location or object you can see.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mizzium Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from mizzium, a rare metal. While wearing it, you have resistance to force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mizzium Mortar',
        category: 'magic-item',
        type: 'other',
        description: 'This mortar can be used to create alchemical items. While holding it, you have advantage on Intelligence checks made to create alchemical items.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Molten Bronze Skin',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor appears to be made of molten bronze. While wearing it, you have resistance to fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moon Sickle',
        category: 'magic-item',
        type: 'weapon',
        description: 'This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Necklace of Fireballs',
        category: 'magic-item',
        type: 'other',
        description: 'This necklace has 1d6 + 3 beads hanging from it. You can use an action to detach a bead and throw it up to 60 feet away. When it reaches the end of its trajectory, the bead detonates as a 3rd-level fireball spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Necklace of Prayer Beads',
        category: 'magic-item',
        type: 'other',
        description: 'This necklace has 1d4 + 2 magic beads made from aquamarine, black pearl, or topaz. It also has many nonmagical beads made from stones such as amber, bloodstone, citrine, coral, jade, pearls, or quartz.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Needle of Mending',
        category: 'magic-item',
        type: 'other',
        description: 'This needle can be used to repair objects. When you use it to sew, it can repair any damage to the object.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Oil of Etherealness',
        category: 'magic-item',
        type: 'other',
        description: 'Beads of this cloudy gray oil form on the outside of its container and quickly evaporate. The oil can cover a Medium or smaller creature, along with the equipment it\'s wearing and carrying (one additional vial is required for each size category above Medium).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Opal of the Ild Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This opal bears the Ild rune. While holding it, you can use an action to cast the fireball spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of the Stein Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This orb bears the Stein rune. While holding it, you can use an action to cast the stone shape spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Outer Essence Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains energy from the Outer Planes. While holding it, you can use an action to cast a spell related to the Outer Planes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pariah\'s Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have disadvantage on Charisma (Persuasion) checks. However, you have advantage on saving throws against being charmed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Periapt of Proof against Poison',
        category: 'magic-item',
        type: 'other',
        description: 'This delicate silver chain has a brilliant-cut black gem pendant. While you wear it, poisons have no effect on you. You are immune to the poisoned condition and have immunity to poison damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Piwafwi of Fire Resistance',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you have resistance to fire damage. In addition, you have advantage on Dexterity (Stealth) checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Planecaller\'s Codex',
        category: 'magic-item',
        type: 'other',
        description: 'This codex contains knowledge of the planes. While holding it, you have advantage on Intelligence (Arcana) checks made to understand planar travel.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Portable Hole',
        category: 'magic-item',
        type: 'other',
        description: 'This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. You can use an action to unfold it and place it on a solid surface, whereupon it creates an extradimensional hole 10 feet deep.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prehistoric Figurines of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Professor Orb',
        category: 'magic-item',
        type: 'other',
        description: 'This orb can provide instruction. While holding it, you have advantage on Intelligence checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Protective Verses',
        category: 'magic-item',
        type: 'other',
        description: 'This scroll contains protective verses. While holding it, you can use an action to cast the protection from evil and good spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Quaal\'s Feather Token',
        category: 'magic-item',
        type: 'other',
        description: 'This small, fluffy feather can be activated to create various effects, such as a tree, a bird, or a fan. Each token has a specific effect.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Reveler\'s Concertina',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this concertina, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rhythm Maker\'s Drum',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Animal Influence',
        category: 'magic-item',
        type: 'other',
        description: 'This ring has 3 charges. While wearing it, you can use an action and expend 1 charge to cast one of the following spells: animal friendship (save DC 13), fear (save DC 13), or speak with animals.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Evasion',
        category: 'magic-item',
        type: 'other',
        description: 'This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. When you fail a Dexterity saving throw while wearing it, you can use your reaction to expend 1 charge to succeed on that saving throw instead.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Feather Falling',
        category: 'magic-item',
        type: 'other',
        description: 'When you fall while wearing this ring, you descend 60 feet per round and take no damage from falling.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Free Action',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear this ring, difficult terrain doesn\'t cost you extra movement. In addition, magic can neither reduce your speed nor cause you to be paralyzed or restrained.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Protection',
        category: 'magic-item',
        type: 'other',
        description: 'You gain a +1 bonus to AC and saving throws while wearing this ring.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Resistance',
        category: 'magic-item',
        type: 'other',
        description: 'You have resistance to one damage type while wearing this ring. The damage type is determined by the ring\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Spell Storing',
        category: 'magic-item',
        type: 'other',
        description: 'This ring stores spells cast into it, holding them until the attuned wearer uses them. The ring can store up to 5 levels worth of spells at a time.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Temporal Salvation',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use a reaction to reroll a saving throw you just made. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of the Ram',
        category: 'magic-item',
        type: 'other',
        description: 'This ring has 3 charges, and it regains 1d3 expended charges daily at dawn. While wearing the ring, you can use an action to expend 1 to 3 of its charges to attack one creature you can see within 60 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of X-Ray Vision',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to speak its command word. When you do so, you can see into and through solid matter for 1 minute. This vision has a radius of 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Eyes',
        category: 'magic-item',
        type: 'other',
        description: 'This robe is covered in embroidered eyes. While wearing it, you have advantage on Wisdom (Perception) checks that rely on sight. In addition, the robe has 4 charges.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Summer',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this robe, you have resistance to cold damage. In addition, you and everything you wear and carry are unharmed by temperatures as low as -50 degrees Fahrenheit.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Rulership',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to activate this rod. When you do so, target humanoids within 60 feet of you that can see you must each make a DC 15 Wisdom saving throw or be charmed by you for 8 hours.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of the Pact Keeper, +1, +2, +3',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of the Vonindod',
        category: 'magic-item',
        type: 'other',
        description: 'This rod can be used to control constructs. While holding it, you can use an action to cast the animate objects spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rogue\'s Mantle',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mantle, you have advantage on Dexterity (Stealth) checks. In addition, you can use an action to cast the invisibility spell on yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rope of Entanglement',
        category: 'magic-item',
        type: 'other',
        description: 'This rope is 30 feet long and weighs 3 pounds. If you hold one end of the rope and use an action to speak the command word, the other end darts forward and entangles a creature you can see within 30 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruinous Flail',
        category: 'magic-item',
        type: 'weapon',
        description: 'This flail deals extra damage to objects. When you hit an object with it, the attack deals maximum damage to the object.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sage\'s Signet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this signet, you have advantage on Intelligence checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Saint Markovia\'s Thighbone',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from the thighbone of Saint Markovia. When you hit an undead creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scaled Ornament',
        category: 'magic-item',
        type: 'other',
        description: 'This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scissors of Shadow Snipping',
        category: 'magic-item',
        type: 'other',
        description: 'These scissors can cut shadows. When you use them to cut a creature\'s shadow, that creature takes psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scorpion Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the carapace of a scorpion. While wearing it, you have resistance to poison damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scroll of Protection',
        category: 'magic-item',
        type: 'other',
        description: 'Using an action to read the scroll encloses you in an invisible barrier that extends from you to form a 5-foot-radius, 10-foot-tall cylinder.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Serpent\'s Fang',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from a serpent\'s fang. When you hit a creature with it, you can choose to deal extra poison damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shadowfell Brand Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo is branded with the power of the Shadowfell. While it is on your skin, you have resistance to necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shadowfell Shard',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains energy from the Shadowfell. While holding it, you can use an action to cast a spell that deals necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shard of Xeluan',
        category: 'magic-item',
        type: 'other',
        description: 'This shard contains the essence of Xeluan. While holding it, you can use an action to cast a spell related to Xeluan.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield, +1, +2, +3',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have a bonus to AC. The bonus is determined by the shield\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of Far Sight',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you can see twice as far as normal. In addition, you have advantage on Wisdom (Perception) checks that rely on sight.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of Missile Attraction',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have resistance to damage from ranged weapon attacks. However, whenever a ranged weapon attack is made against a target within 10 feet of you, the shield redirects the attack to you instead.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shrieking Greaves',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these greaves, you can use a bonus action to cause them to emit a loud shriek. Each creature within 10 feet of you must make a Constitution saving throw or be deafened for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Siren Song Lyre',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this lyre, you can use an action to cast the suggestion spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Scroll',
        category: 'magic-item',
        type: 'other',
        description: 'A spell scroll contains a single spell that can be cast by a spellcaster who can read it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spelljamming Helm',
        category: 'magic-item',
        type: 'other',
        description: 'This helm can be used to control a spelljamming ship. While wearing it, you can use an action to move the ship through space.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spellwrought Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo contains a spell. You can use an action to cast the spell from the tattoo. Once used, the tattoo disappears.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spider Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'You can use an action to speak this staff\'s command word and throw the staff on the ground within 10 feet of you. The staff becomes a giant spider under your control and acts on its own initiative count.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Charming',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: charm person (1 charge), command (1 charge), or comprehend languages (1 charge).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Defense',
        category: 'magic-item',
        type: 'weapon',
        description: 'While holding this staff, you have a +1 bonus to your Armor Class. The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: mage armor (1 charge) or shield (2 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Healing',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: cure wounds (1 charge per spell level, up to 4th), lesser restoration (2 charges), or greater restoration (5 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Ruling',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: command (1 charge), compel duel (1 charge), or dominate person (5 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Swarming Insects',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: insect plague (5 charges) or giant insect (4 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Ivory Claw',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff is made from the claw of an ivory dragon. While holding it, you can use an action to cast the cone of cold spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Rooted Hills',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff is made from the root of an ancient tree. While holding it, you can use an action to cast the entangle spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Woodlands',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you have a +2 bonus to spell attack rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Withering',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff has 3 charges and regains 1d3 expended charges daily at dawn. The staff can be wielded as a magic quarterstaff. On a hit, it deals damage as a normal quarterstaff, and you can expend 1 charge to deal an extra 2d10 necrotic damage to the target.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Starshot Crossbow',
        category: 'magic-item',
        type: 'weapon',
        description: 'This crossbow fires bolts of starlight. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stone of Controlling Earth Elementals',
        category: 'magic-item',
        type: 'other',
        description: 'If the stone is touching the ground, you can use an action to speak the stone\'s command word and summon an earth elemental, as if you had cast the conjure elemental spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stonespeaker Crystal',
        category: 'magic-item',
        type: 'other',
        description: 'This crystal can communicate with stone. While holding it, you can use an action to cast the speak with plants spell, but it only works on stone.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sun Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This item appears to be a longsword hilt. While grasping it, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sun Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff glows with sunlight. While holding it, you can use an action to cause it to shed bright light in a 30-foot radius.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sunforger',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon glows with the light of the sun. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of Life Stealing',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you attack a creature with this magic weapon and roll a 20 on the attack roll, that target takes an extra 3d6 necrotic damage, and you regain hit points equal to the amount of necrotic damage dealt.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of Wounding',
        category: 'magic-item',
        type: 'weapon',
        description: 'Hit points lost to this weapon\'s damage can be regained only through a short or long rest, rather than by regeneration, magic, or any other means. Once per turn, when you hit a creature with an attack using this magic weapon, you can wound the target.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Teleportation Tablet',
        category: 'magic-item',
        type: 'other',
        description: 'This tablet can be used to teleport. When you activate it, you can cast the teleportation circle spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tentacle Rod',
        category: 'magic-item',
        type: 'weapon',
        description: 'Made by the drow, this rod is a magic weapon that ends in three rubbery tentacles. While holding the rod, you can use an action to direct each tentacle to attack a creature you can see within 15 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Two-Birds Sling',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you make a ranged attack with this sling and hit a target, you can cause the ammunition to ricochet toward a second target within 10 feet of the first, and then make a ranged attack against the second target.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ventilating Lungs',
        category: 'magic-item',
        type: 'other',
        description: 'These lungs can filter air. While wearing them, you can breathe normally in any environment, and you have advantage on saving throws made against harmful gases and vapors.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Vicious Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you roll a 20 on your attack roll with this magic weapon, the target takes an extra 2d6 damage of the weapon\'s type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Voidwalker Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the essence of the void. While wearing it, you have resistance to force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Binding',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the hold monster spell (save DC 17) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Enemy Detection',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges. If you do, for the next minute, you know the direction of the nearest creature hostile to you within 60 feet, but not its distance from you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Fear',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause each creature in a 30-foot cone to make a DC 15 Wisdom saving throw.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Fireballs',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the fireball spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Lightning Bolts',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the lightning bolt spell (save DC 15) from it. For 1 charge, you cast the 3rd-level version of the spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Paralysis',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cause a creature you can see within 60 feet of you to make a DC 15 Constitution saving throw.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of the War Mage',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Viscid Globs',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the web spell (save DC 15) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Winter',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 or more of its charges to cast the cone of cold spell (save DC 15) from it. For 1 charge, you cast the 5th-level version of the spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Wonder',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges and choose a target within 120 feet of you. The target can be a creature, an object, or a point in space.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'War Horn of Valor',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this horn, all friendly creatures within 60 feet of you have advantage on attack rolls for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Warrior\'s Passkey',
        category: 'magic-item',
        type: 'other',
        description: 'This key can open any lock. When you use it to unlock a door, the door cannot be locked again for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wayfarer\'s Boots',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear these boots, your walking speed becomes 30 feet, unless your walking speed is higher, and your speed isn\'t reduced if you are encumbered or wearing heavy armor.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weapon of Certain Death',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of death. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weird Tank',
        category: 'magic-item',
        type: 'other',
        description: 'This tank can store a weird. While holding it, you can use an action to release the weird, which then serves you for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wings of Flying',
        category: 'magic-item',
        type: 'other',
        description: 'While you wear this cloak, it projects an illusion that makes you appear to be standing in a place near your actual location, causing any creature to have disadvantage on attack rolls against you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Woodcutter\'s Axe',
        category: 'magic-item',
        type: 'weapon',
        description: 'This axe deals extra damage to plants and wooden objects. When you hit a plant or wooden object with it, you can choose to deal maximum damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wraps Of Unarmed Prowess',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Zephyr Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the essence of wind. While wearing it, you have a flying speed of 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Abracadabrus',
        category: 'magic-item',
        type: 'other',
        description: 'This item can perform minor magical tricks. While holding it, you can use an action to cast the prestidigitation cantrip.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Absorbing Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo can absorb damage. When you take damage, you can use a reaction to reduce the damage by an amount equal to your proficiency bonus.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'All-Purpose Tool',
        category: 'magic-item',
        type: 'other',
        description: 'This simple screwdriver can transform into a variety of tools. As an action, you can transform the item into any type of artisan\'s tool of your choice.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amethyst Lodestone',
        category: 'magic-item',
        type: 'other',
        description: 'This lodestone can attract metal objects. While holding it, you can use an action to cause metal objects within 30 feet of you to move toward you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ammunition, +1, +2, or +3',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have a bonus to attack and damage rolls made with this piece of magic ammunition. The bonus is determined by the item\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Black Skull',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you have advantage on saving throws against necrotic damage. In addition, you can use an action to cast the animate dead spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Devout',
        category: 'magic-item',
        type: 'other',
        description: 'This amulet bears the symbol of a deity inlaid with precious stones. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Amulet of the Planes',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Animated Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you can speak its command word as a bonus action to cause it to animate. The shield leaps into the air and hovers in your space to protect you as if you were wielding it, leaving your hands free.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Antimagic Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on saving throws against spells. In addition, you can use an action to create an antimagic field around yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arcane Cannon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This cannon can fire magical projectiles. When you use it to make a ranged attack, you can choose to deal force damage instead of the weapon\'s normal damage type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arcane Grimoire',
        category: 'magic-item',
        type: 'other',
        description: 'While you are holding this book, you can use it as a spellcasting focus for your wizard spells, and you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arcane Propulsion Arm',
        category: 'magic-item',
        type: 'other',
        description: 'This prosthetic arm can be used as a weapon. While attached, you can use it to make unarmed strikes that deal force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor, +1, +2, or +3',
        category: 'magic-item',
        type: 'armor',
        description: 'You have a bonus to AC while wearing this armor. The bonus is determined by the armor\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor of Safeguarding',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on saving throws against being charmed or frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Arrow of Slaying',
        category: 'magic-item',
        type: 'weapon',
        description: 'An arrow of slaying is a magic weapon meant to slay a particular kind of creature. Some are more focused than others; for example, there are both arrows of dragon slaying and arrows of ancient dragon slaying.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bag of Devouring',
        category: 'magic-item',
        type: 'other',
        description: 'This bag appears to be a bag of holding, but it is actually a feeding orifice for a gigantic extradimensional creature. Any time you reach into the bag, there is a 50 percent chance that you are devoured and destroyed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Baleful Talon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from the talon of a baleful creature. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Barrier Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo provides a bonus to your Armor Class. The bonus depends on the tattoo\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Battle Standard of Infernal Power',
        category: 'magic-item',
        type: 'other',
        description: 'While this standard is displayed, all friendly creatures within 30 feet of it have advantage on attack rolls against fiends.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Belt of Giant Strength',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt\'s score, the item has no effect on you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blade of the Medusa',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a medusa. When you hit a creature with it, you can choose to deal extra damage and force the target to make a Constitution saving throw or be petrified.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blast Scepter',
        category: 'magic-item',
        type: 'other',
        description: 'This scepter can be used to cast spells that deal force damage. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodaxe',
        category: 'magic-item',
        type: 'weapon',
        description: 'This axe is stained with blood that never dries. When you hit a creature with it, you can choose to deal extra necrotic damage and regain hit points equal to half the damage dealt.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodseeker Ammunition',
        category: 'magic-item',
        type: 'weapon',
        description: 'This ammunition seeks out blood. When you fire it, it automatically hits a creature that is bleeding within range.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodshed Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This blade grows more powerful as you deal damage. When you reduce a creature to 0 hit points with it, you gain a bonus to attack and damage rolls made with this weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bloodwell Vial',
        category: 'magic-item',
        type: 'other',
        description: 'This vial contains a single drop of blood from a powerful sorcerer. While you wear it, you gain a bonus to spell attack rolls and the saving throw DCs of your sorcerer spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bobbing Lily Pad',
        category: 'magic-item',
        type: 'other',
        description: 'This lily pad can support your weight. While standing on it, you can move across water at your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bow Of Melodies',
        category: 'magic-item',
        type: 'weapon',
        description: 'This bow plays music when you draw it. While holding it, you can use an action to cast the suggestion spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bracelet of Rock Magic',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this bracelet, you can use an action to cast the stone shape spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Candle of Invocation',
        category: 'magic-item',
        type: 'other',
        description: 'This slender taper is dedicated to a deity and shares that deity\'s alignment. The candle\'s alignment can be detected with the detect evil and good spell. The DM chooses the god and associated alignment or determines it randomly.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cape of Enlargement',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cape, you can use an action to cast the enlarge/reduce spell on yourself. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Carpet of Flying',
        category: 'magic-item',
        type: 'other',
        description: 'You can speak the carpet\'s command word as an action to make the carpet hover and fly. It moves according to your spoken directions, provided that you are within 30 feet of it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cauldron of Rebirth',
        category: 'magic-item',
        type: 'other',
        description: 'This cauldron can bring creatures back to life. When you place a dead creature in it, you can use an action to cast the raise dead spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chime of Exile',
        category: 'magic-item',
        type: 'other',
        description: 'When you strike this chime, you can banish a creature. The creature must succeed on a Charisma saving throw or be banished to another plane.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Chronolometer',
        category: 'magic-item',
        type: 'other',
        description: 'This device can measure time. While holding it, you always know what time it is, and you can use an action to cast the time stop spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Arachnida',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you have a climbing speed equal to your walking speed. In addition, you can use an action to cast the web spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Clockwork Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from clockwork mechanisms. While wearing it, you have resistance to bludgeoning damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Conch of Teleportation',
        category: 'magic-item',
        type: 'other',
        description: 'This conch shell can be used to teleport. When you blow it, you can cast the teleport spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Constantori\'s Portrait',
        category: 'magic-item',
        type: 'other',
        description: 'This portrait can store memories. When you look at it, you can view memories stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crown Of Whirling Comets',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this crown, you can use an action to cast the meteor swarm spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crystal Ball',
        category: 'magic-item',
        type: 'other',
        description: 'The typical crystal ball, a very rare item, is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crystalline Chronicle',
        category: 'magic-item',
        type: 'other',
        description: 'This chronicle can store information. While holding it, you can use an action to view information stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dancing Sword',
        category: 'magic-item',
        type: 'weapon',
        description: 'You can use a bonus action to toss this magic sword into the air and speak the command word. When you do so, the sword begins to hover, flies up to 30 feet each round, and attacks one creature of your choice within 5 feet of it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Dimensions',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that can create dimensional portals. When you draw a card, you can use it to create a portal to another location.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Wild Cards',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that produce random effects. When you draw a card, a random magical effect occurs.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Demon Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is cursed. While wearing it, you have a +1 bonus to AC, but you can\'t remove it unless you are targeted by the remove curse spell or similar magic.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Devastation Orb',
        category: 'magic-item',
        type: 'other',
        description: 'This orb can be used to create a devastating explosion. When you throw it, it explodes in a 30-foot radius, dealing force damage to all creatures in the area.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dimensional Loop',
        category: 'magic-item',
        type: 'other',
        description: 'This loop can create a portal. When you use an action to activate it, you can create a portal to a location you can see within 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dispelling Stone',
        category: 'magic-item',
        type: 'other',
        description: 'This stone can dispel magic. When you use an action to crush it, you can cast the dispel magic spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Scale Mail',
        category: 'magic-item',
        type: 'armor',
        description: 'Dragon scale mail is made of the scales of one kind of dragon. Sometimes dragons collect their cast-off scales and gift them to humanoids.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Vessel',
        category: 'magic-item',
        type: 'other',
        description: 'This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragonhide Belt',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, you gain a bonus to spell attack rolls and the saving throw DCs of your monk spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon\'s Wrath Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon-Touched Focus',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Duskcrusher',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon deals extra damage to undead creatures. When you hit an undead creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dwarven Plate',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on saving throws against the paralyzed and restrained conditions.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dwarven Thrower',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. It has the thrown property with a normal range of 20 feet and a long range of 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dyrrn\'s Tentacle Whip',
        category: 'magic-item',
        type: 'weapon',
        description: 'This whip is made from the tentacle of a mind flayer. When you hit a creature with it, you can choose to deal extra psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Efreeti Bottle',
        category: 'magic-item',
        type: 'other',
        description: 'This brass bottle weighs 1 pound. When you use an action to remove the stopper, a cloud of thick smoke pours out of the bottle at the start of your next turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Eldritch Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Far Gear',
        category: 'magic-item',
        type: 'other',
        description: 'This gear can be used to create mechanical devices. While holding it, you have advantage on Intelligence checks made to create or repair mechanical devices.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fate Cutter Shears',
        category: 'magic-item',
        type: 'other',
        description: 'These shears can cut the threads of fate. When you use them to cut a thread, you can alter the outcome of an event.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fate Dealer\'s Deck',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Figurine of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fish Suit',
        category: 'magic-item',
        type: 'armor',
        description: 'This suit allows you to breathe underwater and grants you a swimming speed equal to your walking speed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Flying Citadel Helm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use an action to cause a citadel to appear and fly through the air. The citadel can carry up to 20 Medium creatures.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fool\'s Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon appears to be a powerful magic weapon, but it is actually cursed. While attuned to it, you have disadvantage on attack rolls made with weapons other than this one.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Forcebreaker Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon deals extra damage to constructs and objects. When you hit a construct or object with it, you can choose to deal maximum damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Frost Brand',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you hit with an attack using this magic sword, the target takes an extra 1d6 cold damage. In addition, while you hold the sword, you have resistance to fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ghost Step Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo allows you to become ethereal. While it is on your skin, you can use an action to cast the etherealness spell on yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Guild Keyrune',
        category: 'magic-item',
        type: 'other',
        description: 'This keyrune represents a guild. While holding it, you have advantage on Charisma (Persuasion) checks made to interact with members of that guild.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hammer of Runic Focus',
        category: 'magic-item',
        type: 'weapon',
        description: 'This hammer bears runes that enhance spellcasting. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Brilliance',
        category: 'magic-item',
        type: 'other',
        description: 'This helm is set with 1d10 diamonds, 2d10 rubies, 3d10 fire opals, and 4d10 opals. Any gem pried from the helm crumbles to dust. When all the gems are removed or destroyed, the helm loses its magic.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Devil Command',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use an action to cast the dominate monster spell (save DC 17) on a fiend. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Heward\'s Hireling Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor can summon a hireling. While wearing it, you can use an action to summon a creature that serves you for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Valhalla',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horned Ring',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to grow horns. While you have horns, you can use them to make unarmed strikes that deal piercing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horseshoes of a Zephyr',
        category: 'magic-item',
        type: 'other',
        description: 'These iron horseshoes come in a set of four. While all four shoes are affixed to the hooves of a horse or similar creature, they allow the creature to move through the air as if it were walking on solid ground.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hunter\'s Coat',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this coat, you have advantage on Wisdom (Survival) checks made to track creatures.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Illusionist\'s Bracers',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these bracers, whenever you cast a cantrip, you can use a bonus action on the same turn to cast that cantrip a second time.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ingot of the Skold Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This ingot bears the Skold rune. While holding it, you can use an action to cast the shield spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of the Bards',
        category: 'magic-item',
        type: 'other',
        description: 'An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ioun Stone',
        category: 'magic-item',
        type: 'other',
        description: 'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Kyrzin\'s Ooze',
        category: 'magic-item',
        type: 'other',
        description: 'This ooze can be used to create various effects. While holding it, you can use an action to cast a spell related to oozes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Last Stand Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, when you are reduced to 0 hit points, you can use a reaction to drop to 1 hit point instead.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lifewell Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo can store life energy. While it is on your skin, you can use an action to regain hit points equal to your level.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Living Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is alive. While wearing it, you have advantage on saving throws against being charmed or frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lord\'s Ensemble',
        category: 'magic-item',
        type: 'armor',
        description: 'This ensemble consists of multiple pieces of clothing. While wearing all pieces, you gain a bonus to AC and saving throws.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lucent Destroyer',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon glows with light. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Manual of Bodily Health',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains health and fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Constitution score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Manual of Gainful Exercise',
        category: 'magic-item',
        type: 'other',
        description: 'This book describes fitness exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Strength score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Manual of Golems',
        category: 'magic-item',
        type: 'other',
        description: 'This tome contains information and incantations necessary to make a particular type of golem. The DM chooses the type or determines it randomly.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Manual of Quickness of Action',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains coordination and balance exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Dexterity score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mindblasting Cap',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cap, you can use an action to cast the mind blast spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mindguard Crown',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this crown, you have advantage on saving throws against being charmed or frightened. In addition, you are immune to the stunned condition.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mirror of Life Trapping',
        category: 'magic-item',
        type: 'other',
        description: 'When a creature that you can see within 30 feet of you casts a spell that targets only you, you can use your reaction to reflect the spell back at that creature using your own spellcasting ability, as if you had cast the spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mirror of Reflected Pasts',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this mirror, you can use an action to view the past of a location or object you can see.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mistral Mantle',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mantle, you have a flying speed equal to your walking speed. In addition, you have resistance to wind damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moon Sickle',
        category: 'magic-item',
        type: 'weapon',
        description: 'This silver sickle is a spellcasting focus for druids and rangers. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your druid and ranger spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Mudslick Tower',
        category: 'magic-item',
        type: 'other',
        description: 'This tower can be deployed. When you use an action to place it on the ground, it grows into a 20-foot-tall tower.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Navigation Orb',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this orb, you always know which way is north. In addition, you can use an action to determine your exact location.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nimbus Coronet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this coronet, you can use an action to cast the daylight spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nine Lives Stealer',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +2 bonus to attack and damage rolls made with this magic weapon. The sword has 1d8 + 1 charges. If you score a critical hit against a creature that has fewer than 100 hit points, it must succeed on a DC 15 Constitution saving throw or be slain instantly as the sword tears its life force from its body.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nolzur\'s Marvelous Pigments',
        category: 'magic-item',
        type: 'other',
        description: 'Typically found in 1d4 pots inside a fine wooden box with a brush (weighing 1 pound total), these pigments allow you to create three-dimensional objects by painting them in two dimensions.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Oathbow',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you nock an arrow on this bow, you can speak a creature\'s name. If the arrow hits that creature, the creature takes an extra 3d6 piercing damage. For the next minute or until you speak a different creature\'s name with the bow, your attack rolls against that creature have advantage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Oil of Sharpness',
        category: 'magic-item',
        type: 'other',
        description: 'This clear, gelatinous oil sparkles with tiny, ultrathin silver shards. The oil can coat one slashing or piercing weapon or up to 5 pieces of slashing or piercing ammunition.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of the Veil',
        category: 'magic-item',
        type: 'other',
        description: 'This orb can create illusions. While holding it, you can use an action to cast the major image spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ornithopter of Flying',
        category: 'magic-item',
        type: 'other',
        description: 'This mechanical device can fly. While using it, you have a flying speed of 60 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pennant of the Vind Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This pennant bears the Vind rune. While holding it, you can use an action to cast the wind wall spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Peregrine Mask',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mask, you have advantage on Wisdom (Perception) checks that rely on sight. In addition, you can see twice as far as normal.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Polymorph Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon can change its form. When you use an action to speak its command word, it transforms into a different type of weapon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prehistoric Figurines of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Reincarnation Dust',
        category: 'magic-item',
        type: 'other',
        description: 'This dust can bring creatures back to life. When you sprinkle it on a dead creature, you can cast the reincarnate spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rhythm Maker\'s Drum',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this drum, all friendly creatures within 30 feet of you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Amity',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on Charisma (Persuasion) checks. In addition, you can use an action to cast the charm person spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Red Fury',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on attack rolls against creatures that have damaged you since your last turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Regeneration',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you regain 1d6 hit points every 10 minutes, provided that you have at least 1 hit point. If you lose a body part, the ring causes the missing part to regrow and return to full functionality after 1d6 + 1 days if you have at least 1 hit point the whole time.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Shooting Stars',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring in dim light or darkness, you can cast dancing lights and light from the ring at will. Casting either spell from the ring requires an action.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Telekinesis',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can cast the telekinesis spell at will, but you can target only objects that aren\'t being worn or carried.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Scintillating Colors',
        category: 'magic-item',
        type: 'other',
        description: 'This robe has 3 charges, and it regains 1d3 expended charges daily at dawn. While you wear it, you can use an action and expend 1 charge to cause the garment to display a shifting pattern of dazzling hues until the end of your next turn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of Stars',
        category: 'magic-item',
        type: 'other',
        description: 'This black or dark blue robe is embroidered with small white or silver stars. You gain a +1 bonus to saving throws while you wear it. Six stars, located on the robe\'s upper front portion, are particularly large.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Absorption',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this rod, you can use your reaction to absorb a spell that is targeting only you and not an area. When you do so, the spell\'s effect is canceled, and the spell\'s energy—not the spell itself—is stored in the rod.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Alertness',
        category: 'magic-item',
        type: 'other',
        description: 'This rod has a flanged head and the following properties. Alertness. While holding the rod, you have advantage on Wisdom (Perception) checks and on initiative rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod Of Hellish Flames',
        category: 'magic-item',
        type: 'other',
        description: 'This rod can be used to cast spells that deal fire damage. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells that deal fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Security',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this rod, you can use an action to activate it. The rod releases a wave of energy that rolls outward from the point where the rod was activated.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of the Pact Keeper, +1, +2, +3',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this rod, you gain a bonus to spell attack rolls and the saving throw DCs of your warlock spells. The bonus is determined by the rod\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rotor of Return',
        category: 'magic-item',
        type: 'other',
        description: 'This rotor can be used to return to a location. When you activate it, you can cast the teleport spell, but you can only teleport to a location you have been to before.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruidium Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from ruidium, a rare metal. While wearing it, you have resistance to psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruidium Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'This shield is made from ruidium. While holding it, you have resistance to psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruidium Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from ruidium. When you hit a creature with it, you can choose to deal extra psychic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sage\'s Signet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this signet, you have advantage on Intelligence checks.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sanctum Amulet',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this amulet, you have advantage on saving throws against spells cast by creatures that are not on your plane of existence.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sapphire Buckler',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have a +1 bonus to AC. In addition, you can use a reaction to cast the shield spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scaled Ornament',
        category: 'magic-item',
        type: 'other',
        description: 'This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scimitar of Speed',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +2 bonus to attack and damage rolls made with this magic weapon. In addition, you can make one attack with it as a bonus action on each of your turns.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shard of the Ise Rune',
        category: 'magic-item',
        type: 'other',
        description: 'This shard bears the Ise rune. While holding it, you can use an action to cast the ice storm spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield, +1, +2, +3',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have a bonus to AC. The bonus is determined by the shield\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of the Uven Rune',
        category: 'magic-item',
        type: 'shield',
        description: 'This shield bears the Uven rune. While holding it, you can use a reaction to cast the shield spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Skull Helm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you have advantage on saving throws against being frightened. In addition, you can use an action to cast the fear spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sling Bullets of Althemone',
        category: 'magic-item',
        type: 'weapon',
        description: 'These sling bullets are blessed by Althemone. When you hit a creature with them, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Speaking Stone',
        category: 'magic-item',
        type: 'other',
        description: 'This stone can speak. While holding it, you can use an action to cause it to speak a message.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spear of Backbiting',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is cursed. While attuned to it, you have a +2 bonus to attack and damage rolls made with this magic weapon. However, whenever you roll a 1 on an attack roll with this weapon, you must make an attack roll against yourself.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Scroll',
        category: 'magic-item',
        type: 'other',
        description: 'A spell scroll contains a single spell that can be cast by a spellcaster who can read it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spellguard Shield',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have advantage on saving throws against spells and other magical effects, and spell attacks have disadvantage against you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Dunamancy',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your dunamancy spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Fate',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can alter fate. While holding it, you can use an action to reroll a die roll you just made.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Fire',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have resistance to fire damage while you hold this staff. The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: burning hands (1 charge), fireball (3 charges), or wall of fire (4 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Frost',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have resistance to cold damage while you hold this staff. The staff has 10 charges. While holding it, you can use an action to expend 1 or more of its charges to cast one of the following spells from it, using your spell save DC: ice storm (4 charges), wall of ice (4 charges), or cone of cold (5 charges).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Power',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to spell attack rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Striking',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be wielded as a magic quarterstaff that grants a +3 bonus to attack and damage rolls made with it. When you hit with it, you can deal extra force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of Thunder and Lightning',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. It also has the following additional properties. When one of these properties is used, it can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Steel',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from steel. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stonemaker War Pick',
        category: 'magic-item',
        type: 'weapon',
        description: 'This war pick can shape stone. When you hit a stone object with it, you can use an action to cast the stone shape spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of Sharpness',
        category: 'magic-item',
        type: 'weapon',
        description: 'When you attack an object with this magic sword and hit, maximize your weapon damage dice against the target. When you attack a creature with this weapon and roll a 20 on the attack roll, that target takes an extra 4d6 slashing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of the Paruns',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of the Paruns. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tasha\'s Creeping Keepboat',
        category: 'magic-item',
        type: 'other',
        description: 'This boat can move on land. While riding it, you can use an action to cause it to move across land at a speed of 30 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Thunderbuss',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon fires thunderous blasts. When you hit a creature with it, you can choose to deal extra thunder damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tidecaller Trident',
        category: 'magic-item',
        type: 'weapon',
        description: 'This trident can control water. While holding it, you can use an action to cast the control water spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Timepiece of Travel',
        category: 'magic-item',
        type: 'other',
        description: 'This timepiece can be used to travel through time. When you activate it, you can cast the time stop spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tome of Clear Thought',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains memory and logic exercises, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Intelligence score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tome of Leadership and Influence',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains guidelines for influencing and charming people, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Charisma score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tome of Understanding',
        category: 'magic-item',
        type: 'other',
        description: 'This book contains intuition and insight exercises for the mind, and its words are charged with magic. If you spend 48 hours over a period of 6 days or fewer studying the book\'s contents and practicing its guidelines, your Wisdom score increases by 2, as does your maximum for that score.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Voyager Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be used to travel. While holding it, you can use an action to cast the teleport spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of Polymorph',
        category: 'magic-item',
        type: 'other',
        description: 'This wand has 7 charges. While holding it, you can use an action to expend 1 of its charges to cast the polymorph spell (save DC 15) from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wand of the War Mage',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this wand, you gain a bonus to spell attack rolls. The bonus is determined by the wand\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Watchful Helm',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you have advantage on Wisdom (Perception) checks. In addition, you can\'t be surprised while you are conscious.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weapon, +1, +2, or +3',
        category: 'magic-item',
        type: 'weapon',
        description: 'You have a bonus to attack and damage rolls made with this magic weapon. The bonus is determined by the weapon\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Weapon of Throne\'s Command',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of command. When you hit a creature with it, you can choose to force the target to make a Wisdom saving throw or be charmed by you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wheel of Stars',
        category: 'magic-item',
        type: 'other',
        description: 'This wheel shows the positions of stars. While holding it, you always know your position relative to major stars.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wraps Of Unarmed Prowess',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these wraps, your unarmed strikes are considered magical for the purpose of overcoming resistance and immunity to nonmagical attacks. In addition, you gain a bonus to attack and damage rolls with unarmed strikes.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wyrmreaver Gauntlets',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these gauntlets, you have advantage on attack rolls against dragons. In addition, your unarmed strikes deal extra damage to dragons.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Apparatus of Kwalish',
        category: 'magic-item',
        type: 'other',
        description: 'The apparatus is a large, sealed iron barrel with a metal hatch in one end. The barrel contains enough air for 1 hour of breathing, divided by the number of breathing Medium or Small creatures inside.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor, +1, +2, or +3',
        category: 'magic-item',
        type: 'armor',
        description: 'You have a bonus to AC while wearing this armor. The bonus is determined by the armor\'s rarity.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Armor of Invulnerability',
        category: 'magic-item',
        type: 'armor',
        description: 'You have resistance to nonmagical damage while wearing this armor. Additionally, you can use an action to make yourself immune to nonmagical damage for 10 minutes or until you are no longer wearing the armor.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Azuredge',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of justice. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Belashyrra\'s Beholder Crown',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this crown, you can use an action to cast the beholder\'s eye ray spells. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Belt of Giant Strength',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this belt, your Strength score changes to a score granted by the belt. If your Strength is already equal to or greater than the belt\'s score, the item has no effect on you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Black Crystal Tablet',
        category: 'magic-item',
        type: 'other',
        description: 'This tablet contains dark knowledge. While holding it, you have advantage on Intelligence (Arcana) checks made to understand necromancy.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blackrazor',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you use it to reduce a creature to 0 hit points, that creature is destroyed, and you regain 2d6 + Constitution modifier hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blackstaff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be used as a spellcasting focus. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your wizard spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Blood Fury Tattoo',
        category: 'magic-item',
        type: 'other',
        description: 'This tattoo grants you the ability to enter a blood fury. While it is on your skin, you can use a bonus action to enter a rage that lasts for 1 minute.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Bookmark',
        category: 'magic-item',
        type: 'other',
        description: 'This bookmark can mark a page in any book. When you place it in a book, you can instantly return to that page at any time.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cloak of Invisibility',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this cloak, you can pull its hood over your head to become invisible. While invisible, anything you are carrying or wearing is invisible with you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Crystal Ball',
        category: 'magic-item',
        type: 'other',
        description: 'The typical crystal ball, a very rare item, is about 6 inches in diameter. While touching it, you can cast the scrying spell (save DC 17) with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Cubic Gate',
        category: 'magic-item',
        type: 'other',
        description: 'This cube is 3 inches across and radiates palpable magical energy. The six sides of the cube are each keyed to a different plane of existence, one of which is the Material Plane.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Danoth\'s Visor',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this visor, you have truesight out to a range of 120 feet. In addition, you can see invisible creatures and objects.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dawnbringer',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon glows with the light of dawn. When you hit a creature with it, you can choose to deal extra radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck Of Many More Things',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains additional cards beyond the standard deck. When you draw a card, a random magical effect occurs.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck of Many Things',
        category: 'magic-item',
        type: 'other',
        description: 'Usually found in a box or pouch, this deck contains a number of cards made of ivory or vellum. As soon as you draw a card from the deck, its magic takes effect.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Deck of Several Things',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains a smaller number of cards than the full deck. When you draw a card, a random magical effect occurs.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Defender',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. The first time each turn that you hit with it, you can transfer some or all of the weapon\'s bonus to your Armor Class, instead of using it on the attack roll.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Mask',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mask, you can use an action to transform into a dragon. The type of dragon is determined by the mask\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon Vessel',
        category: 'magic-item',
        type: 'other',
        description: 'This vessel can store the essence of a dragon. While holding it, you can use an action to cast a spell stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragonlance',
        category: 'magic-item',
        type: 'weapon',
        description: 'This legendary weapon is designed to slay dragons. When you hit a dragon with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon\'s Wrath Weapon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of a dragon. When you hit with it, you can deal extra damage of a type determined by the dragon\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragonstaff of Ahghairon',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can control dragons. While holding it, you can use an action to cast the dominate monster spell on a dragon.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Dragon-Touched Focus',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this focus, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Drown',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of water. When you hit a creature with it, you can choose to deal extra cold damage and force the target to make a Constitution saving throw or be restrained.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Efreeti Chain',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the chain of an efreeti. While wearing it, you have resistance to fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Euryale\'s Aegis',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have advantage on saving throws against being petrified. In addition, you can use a reaction to reflect a petrifying gaze back at the attacker.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fane-Eater',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon consumes magic. When you hit a creature with it, you can choose to dispel one magical effect on the target.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Fate Dealer\'s Deck',
        category: 'magic-item',
        type: 'other',
        description: 'This deck contains cards that can alter fate. When you draw a card, you can change the outcome of a die roll.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Figurine of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'A figurine of wondrous power is a statuette of a beast small enough to fit in a pocket. If you use an action to speak the command word and throw the figurine to a point on the ground within 60 feet of you, the figurine becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Flail of Tiamat',
        category: 'magic-item',
        type: 'weapon',
        description: 'This flail is imbued with the power of Tiamat. When you hit a creature with it, you can choose to deal extra damage of a type determined by one of Tiamat\'s heads.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gloves of Soul Catching',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing these gloves, when you hit a creature with an unarmed strike, you can choose to deal extra necrotic damage and regain hit points equal to the damage dealt.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Grimoire Infinitus',
        category: 'magic-item',
        type: 'other',
        description: 'This grimoire contains infinite knowledge. While holding it, you have advantage on Intelligence checks, and you can use an action to cast any spell from it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Gurt\'s Greataxe',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a giant with it, the giant takes an extra 2d12 slashing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hammer of Thunderbolts',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. In addition, you can throw the hammer, and it returns to your hand immediately after it hits or misses.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hammock of Worlds',
        category: 'magic-item',
        type: 'other',
        description: 'This hammock can transport you between worlds. When you lie in it, you can use an action to travel to another plane of existence.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Harp of Gilded Plenty',
        category: 'magic-item',
        type: 'other',
        description: 'While you are playing this harp, you can use an action to create food and water for up to 10 people.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hazirawn',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with dark power. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of Disjunction',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you can use an action to cast the disintegrate spell. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Helm of the Scavenger',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this helm, you have advantage on Wisdom (Survival) checks made to find food and water.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Heretic',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is designed to slay religious figures. When you hit a cleric or paladin with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hide of the Feral Guardian',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you can use an action to transform into a beast. The type of beast is determined by the hide\'s origin.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Hither-Thither Staff',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can create portals. While holding it, you can use an action to cast the dimension door spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Holy Avenger',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a fiend or an undead with it, that creature takes an extra 2d10 radiant damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Holy Symbol of Ravenkind',
        category: 'magic-item',
        type: 'other',
        description: 'While holding this symbol, you can use an action to cast the turn undead feature. In addition, you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Beckoning Death',
        category: 'magic-item',
        type: 'other',
        description: 'When you blow this horn, undead creatures within 60 feet of you are drawn to you. They must make a Wisdom saving throw or be charmed by you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Horn of Valhalla',
        category: 'magic-item',
        type: 'other',
        description: 'You can use an action to blow this horn. In response, warrior spirits from the Valhalla appear within 60 feet of you. They use the statistics of a berserker.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Icon of Ravenloft',
        category: 'magic-item',
        type: 'other',
        description: 'This icon represents the domain of Ravenloft. While holding it, you have advantage on saving throws against being frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Infernal Tack',
        category: 'magic-item',
        type: 'other',
        description: 'This tack can be used to control infernal creatures. When you place it on a mount, the mount becomes your servant.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Infiltrator\'s Key',
        category: 'magic-item',
        type: 'other',
        description: 'This key can open any lock. When you use it to unlock a door, the door cannot be locked again for 1 hour.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Instrument of the Bards',
        category: 'magic-item',
        type: 'other',
        description: 'An instrument of the bards is an exquisite example of its kind, superior to an ordinary instrument in every way. While you are playing the instrument, you can cast any one of the spells it has stored with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ioun Stone',
        category: 'magic-item',
        type: 'other',
        description: 'An Ioun stone is named after Ioun, a god of knowledge and prophecy revered on some worlds. Many types of Ioun stone exist, each type a distinct combination of shape and color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Iron Flask',
        category: 'magic-item',
        type: 'other',
        description: 'This iron bottle has a brass stopper. You can use an action to speak the flask\'s command word, targeting a creature that you can see within 60 feet of you.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ironfang',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is made from iron. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Jester\'s Mask',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this mask, you have advantage on Charisma (Performance) checks. In addition, you can use an action to cast the confusion spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Jewel of Three Prayers',
        category: 'magic-item',
        type: 'other',
        description: 'This jewel contains three prayers. While holding it, you can use an action to cast one of the prayers stored within it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Korolnor Scepter',
        category: 'magic-item',
        type: 'other',
        description: 'This scepter can be used to command creatures. While holding it, you can use an action to cast the command spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Longbow of the Healing Hearth',
        category: 'magic-item',
        type: 'weapon',
        description: 'This bow can heal. When you hit a creature with it, you can choose to heal the target instead of dealing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Lost Crown of Besilmer',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this crown, you have advantage on Charisma (Persuasion) checks made to interact with dwarves.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Luck Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +1 bonus to attack and damage rolls made with this magic weapon. While you hold the sword, you also gain a +1 bonus to saving throws.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Luxon Beacon',
        category: 'magic-item',
        type: 'other',
        description: 'This beacon can guide you. While holding it, you always know which way is north, and you can use an action to cast the guiding bolt spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Matalotok',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of ice. When you hit a creature with it, you can choose to deal extra cold damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Moonblade',
        category: 'magic-item',
        type: 'weapon',
        description: 'A moonblade is an elven longsword that passes down from parent to child. The sword chooses its bearer and remains bonded to that person for life.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Murgaxor\'s Orb',
        category: 'magic-item',
        type: 'other',
        description: 'This orb can be used to cast spells. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nepenthe',
        category: 'magic-item',
        type: 'other',
        description: 'This item can erase memories. When you use it, you can cause a creature to forget a specific event.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nether Scroll of Azumar',
        category: 'magic-item',
        type: 'other',
        description: 'This scroll contains forbidden knowledge. While holding it, you have advantage on Intelligence (Arcana) checks made to understand dark magic.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nightbringer',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of darkness. When you hit a creature with it, you can choose to deal extra necrotic damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Nightfall Pearl',
        category: 'magic-item',
        type: 'other',
        description: 'This pearl can create darkness. While holding it, you can use an action to cast the darkness spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Obsidian Flint Dragon Plate',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is made from the scales of an obsidian flint dragon. While wearing it, you have resistance to fire and cold damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orb of Skoraeus',
        category: 'magic-item',
        type: 'other',
        description: 'This orb can control stone. While holding it, you can use an action to cast the stone shape spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Orcsplitter',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is designed to slay orcs. When you hit an orc with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Plate Armor of Etherealness',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you can use an action to cast the etherealness spell on yourself. Once used, this property can\'t be used again until the next dawn.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Platinum Scarf',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this scarf, you have advantage on Charisma (Persuasion) checks. In addition, you can use an action to cast the charm person spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Powered Armor',
        category: 'magic-item',
        type: 'armor',
        description: 'This armor is powered by magic. While wearing it, you have a +1 bonus to AC, and your Strength score increases by 2.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Prehistoric Figurines of Wondrous Power',
        category: 'magic-item',
        type: 'other',
        description: 'These figurines summon prehistoric creatures. When you use an action to speak the command word and throw the figurine, it becomes a living creature.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Pyxis of Pandemonium',
        category: 'magic-item',
        type: 'other',
        description: 'This box can create chaos. When you open it, random magical effects occur within 30 feet of it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rakdos Riteknife',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is used in Rakdos rituals. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Reaper\'s Scream',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon emits a terrifying scream. When you hit a creature with it, you can choose to deal extra psychic damage and force the target to make a Wisdom saving throw or be frightened.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Red Wizard Blade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of the Red Wizards. When you hit a creature with it, you can choose to deal extra fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Djinni Summoning',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to speak the ring\'s command word and summon a djinni. Once used, this property can\'t be used again until 30 days have passed.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Elemental Command',
        category: 'magic-item',
        type: 'other',
        description: 'This ring is linked to one of the four Elemental Planes. While wearing it, you have advantage on attack rolls against elementals of the linked type.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Invisibility',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to become invisible until you take an action or a reaction.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Spell Turning',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you have advantage on saving throws against spells. In addition, when a spell targets only you, you can use your reaction to redirect the spell back at the caster.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ring of Three Wishes',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this ring, you can use an action to speak one of three command words, causing the ring to cast the wish spell. Once all three wishes have been used, the ring becomes a nonmagical ring.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Robe of the Archmagi',
        category: 'magic-item',
        type: 'other',
        description: 'This elegant garment is made from exquisite cloth of white, gray, or black and adorned with silvery runes. The robe\'s color corresponds to the alignment for which the item was created.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Lordly Might',
        category: 'magic-item',
        type: 'other',
        description: 'This rod has a flanged head, and it functions as a magic mace that grants a +3 bonus to attack and damage rolls made with it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rod of Resurrection',
        category: 'magic-item',
        type: 'other',
        description: 'This rod can bring creatures back to life. While holding it, you can use an action to cast the resurrection spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruby Weave Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem contains the power of the Weave. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ruinblade',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of ruin. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scaled Ornament',
        category: 'magic-item',
        type: 'other',
        description: 'This ornament can be attached to armor. While attached, the armor grants you resistance to one damage type determined by the ornament\'s color.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scarab of Protection',
        category: 'magic-item',
        type: 'other',
        description: 'If you are holding this scarab, you have advantage on saving throws against spells. The scarab has 12 charges. If you fail a saving throw against a spell while holding it, you can use your reaction to expend 1 charge and succeed on the saving throw instead.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scroll of Tarrasque Summoning',
        category: 'magic-item',
        type: 'other',
        description: 'This scroll can summon a tarrasque. When you read it, you can cast the summon tarrasque spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scroll of the Comet',
        category: 'magic-item',
        type: 'other',
        description: 'This scroll can call down a comet. When you read it, you can cast the meteor swarm spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shard Solitaire',
        category: 'magic-item',
        type: 'other',
        description: 'This shard can be used to cast spells. While holding it, you gain a bonus to spell attack rolls and the saving throw DCs of your spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of the Blazing Dreadnought',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have resistance to fire damage. In addition, you can use a reaction to cast the fireball spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Shield of the Hidden Lord',
        category: 'magic-item',
        type: 'shield',
        description: 'While holding this shield, you have advantage on saving throws against being charmed or frightened. In addition, you can use an action to cast the suggestion spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Snicker-Snack',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is known for its vorpal quality. When you roll a 20 on an attack roll with it, you can choose to sever the target\'s head.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sovereign Glue',
        category: 'magic-item',
        type: 'other',
        description: 'This viscous, milky-white substance can form a permanent adhesive bond between any two objects. It must be stored in a jar or flask that has been coated inside and out with oil of slipperiness.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Bottle',
        category: 'magic-item',
        type: 'other',
        description: 'This bottle can store spells. You can cast a spell into the bottle, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Gem',
        category: 'magic-item',
        type: 'other',
        description: 'This gem can store a spell. You can cast a spell into the gem, and it holds the spell until you use an action to release it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spell Scroll',
        category: 'magic-item',
        type: 'other',
        description: 'A spell scroll contains a single spell that can be cast by a spellcaster who can read it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sphere Of Annihilation',
        category: 'magic-item',
        type: 'other',
        description: 'This 2-foot-diameter black sphere is a hole in the multiverse, hovering in space and stabilized by a magical field surrounding it.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Spindle Of Fate',
        category: 'magic-item',
        type: 'other',
        description: 'This spindle can alter fate. While holding it, you can use an action to reroll a die roll you just made.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Staff of the Magi',
        category: 'magic-item',
        type: 'weapon',
        description: 'This staff can be wielded as a magic quarterstaff that grants a +2 bonus to attack and damage rolls made with it. While holding it, you gain a +2 bonus to spell attack rolls.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stonebreaker\'s Breastplate',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on attack rolls against constructs and objects.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Stormgirdle',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this girdle, you have resistance to lightning and thunder damage. In addition, you can use an action to cast the call lightning spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sunsword',
        category: 'magic-item',
        type: 'weapon',
        description: 'This item appears to be a longsword hilt. While grasping it, you can use a bonus action to cause a blade of pure radiance to spring into existence, or make the blade disappear.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of Answering',
        category: 'magic-item',
        type: 'weapon',
        description: 'In the world of Greyhawk, only nine of these blades are known to exist. Each is patterned after the legendary sword Fragarach, which is variously translated as "Final Word."',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Sword of the Planes',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon can cut through planar boundaries. When you hit a creature with it, you can choose to banish the target to another plane.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tablet of Reawakening',
        category: 'magic-item',
        type: 'other',
        description: 'This tablet can bring creatures back to life. When you place it on a dead creature, you can cast the raise dead spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Talarith',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of the Talarith. When you hit a creature with it, you can choose to deal extra damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Talisman of Pure Good',
        category: 'magic-item',
        type: 'other',
        description: 'This talisman is a mighty magic item that can protect you and harm those who are not of good alignment. While you wear it, you are immune to disease, and you have advantage on saving throws against spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Talisman of the Sphere',
        category: 'magic-item',
        type: 'other',
        description: 'While you hold this talisman, you can use an action to name a location that you are familiar with on another plane of existence. Then make a DC 15 Intelligence check.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Talisman of Ultimate Evil',
        category: 'magic-item',
        type: 'other',
        description: 'This talisman is a mighty magic item that can protect you and harm those who are not of evil alignment. While you wear it, you are immune to disease, and you have advantage on saving throws against spells.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Telescopic Transporter',
        category: 'magic-item',
        type: 'other',
        description: 'This device can transport you to distant locations. When you activate it, you can cast the teleport spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tinderstrike',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of fire. When you hit a creature with it, you can choose to deal extra fire damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Tome of the Stilled Tongue',
        category: 'magic-item',
        type: 'other',
        description: 'This tome contains knowledge of silence. While holding it, you can use an action to cast the silence spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Topaz Annihilator',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon can destroy creatures. When you hit a creature with it, you can choose to deal maximum damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Universal Solvent',
        category: 'magic-item',
        type: 'other',
        description: 'This tube holds milky liquid with a strong alcohol smell. You can use an action to pour the contents of the tube onto a surface within reach. The liquid instantly dissolves up to 1 square foot of adhesive it touches, including sovereign glue.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Verminshroud',
        category: 'magic-item',
        type: 'armor',
        description: 'While wearing this armor, you have advantage on saving throws against being poisoned. In addition, you can use an action to cast the insect plague spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Vorpal Sword',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. In addition, the weapon ignores resistance to slashing damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wave',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of water. When you hit a creature with it, you can choose to deal extra cold damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Waythe',
        category: 'magic-item',
        type: 'weapon',
        description: 'This weapon is imbued with the power of the wind. When you hit a creature with it, you can choose to deal extra force damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Well of Many Worlds',
        category: 'magic-item',
        type: 'other',
        description: 'This fine black cloth, soft as silk, is folded up to the dimensions of a handkerchief. You can use an action to unfold it and place it on a solid surface, whereupon it creates an extradimensional hole 10 feet deep.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Whelm',
        category: 'magic-item',
        type: 'weapon',
        description: 'You gain a +3 bonus to attack and damage rolls made with this magic weapon. When you hit a giant or an elemental with it, that creature takes an extra 1d6 bludgeoning damage.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Windvane',
        category: 'magic-item',
        type: 'other',
        description: 'This vane can control the wind. While holding it, you can use an action to cast the control weather spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Witchlight Vane',
        category: 'magic-item',
        type: 'other',
        description: 'This vane can create light. While holding it, you can use an action to cast the daylight spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Witchlight Watch',
        category: 'magic-item',
        type: 'other',
        description: 'This watch can tell time. While holding it, you always know what time it is, and you can use an action to cast the time stop spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Wreath of the Prism',
        category: 'magic-item',
        type: 'other',
        description: 'While wearing this wreath, you have resistance to all damage. In addition, you can use an action to cast the prismatic spray spell.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Ythryn Mythallar',
        category: 'magic-item',
        type: 'other',
        description: 'This mythallar can power magical effects. While holding it, you can use an action to cast any spell of 8th level or lower.',
        equipped: false,
        isBaseItem: true
    },

    // POTIONS
    {
        name: 'Potion of Healing',
        category: 'potion',
        type: 'other',
        description: 'A character who drinks the magical red fluid in this vial regains 2d4 + 2 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Greater Healing',
        category: 'potion',
        type: 'other',
        description: 'A character who drinks the magical red fluid in this vial regains 4d4 + 4 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Superior Healing',
        category: 'potion',
        type: 'other',
        description: 'A character who drinks the magical red fluid in this vial regains 8d4 + 8 hit points.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Potion of Invisibility',
        category: 'potion',
        type: 'other',
        description: 'A character who drinks this potion becomes invisible for 1 hour.',
        equipped: false,
        isBaseItem: true
    },

    // SCROLLS
    {
        name: 'Scroll of Fireball',
        category: 'scroll',
        type: 'other',
        description: 'A spell scroll containing the Fireball spell (3rd level).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scroll of Cure Wounds',
        category: 'scroll',
        type: 'other',
        description: 'A spell scroll containing the Cure Wounds spell (1st level).',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Scroll of Magic Missile',
        category: 'scroll',
        type: 'other',
        description: 'A spell scroll containing the Magic Missile spell (1st level).',
        equipped: false,
        isBaseItem: true
    },

    // MISCELLANEOUS
    {
        name: 'Backpack',
        category: 'miscellaneous',
        type: 'other',
        description: 'A backpack can hold up to 1 cubic foot or 30 pounds of gear.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rope, Hempen (50 feet)',
        category: 'miscellaneous',
        type: 'other',
        description: 'Rope, whether made of hemp or silk, has 2 hit points and can be burst with a DC 17 Strength check.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Torch',
        category: 'miscellaneous',
        type: 'other',
        description: 'A torch burns for 1 hour, providing bright light in a 20-foot radius and dim light for an additional 20 feet.',
        equipped: false,
        isBaseItem: true
    },
    {
        name: 'Rations (1 day)',
        category: 'miscellaneous',
        type: 'other',
        description: 'Rations consist of dry foods suitable for extended travel, including jerky, dried fruit, hardtack, and nuts.',
        equipped: false,
        isBaseItem: true
    }
];
