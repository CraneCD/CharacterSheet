export interface ClassInfo {
    id: string;
    name: string;
    description: string;
    hitDie: number;
    primaryAbility: string[];
    savingThrows: string[];
    skillChoices: number;
    skillOptions: string[];
    armorProficiencies: string[];
    weaponProficiencies: string[];
    startingEquipment: string[];
    spellcaster: boolean;
    spellcastingAbility?: string;
    subclassLevel?: number;
}

export const classes: ClassInfo[] = [
    {
        id: 'fighter',
        name: 'Fighter',
        description: 'A master of martial combat, skilled with a variety of weapons and armor.',
        hitDie: 10,
        primaryAbility: ['str', 'dex'],
        savingThrows: ['str', 'con'],
        skillChoices: 2,
        skillOptions: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
        armorProficiencies: ['All armor', 'Shields'],
        weaponProficiencies: ['Simple weapons', 'Martial weapons'],
        startingEquipment: ['Chain mail or leather armor', 'Shield and martial weapon or two martial weapons', 'Light crossbow and 20 bolts or two handaxes', 'Dungeoneer\'s pack or Explorer\'s pack'],
        spellcaster: false,
        subclassLevel: 3
    },
    {
        id: 'wizard',
        name: 'Wizard',
        description: 'A scholarly magic-user capable of manipulating the structures of reality.',
        hitDie: 6,
        primaryAbility: ['int'],
        savingThrows: ['int', 'wis'],
        skillChoices: 2,
        skillOptions: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
        armorProficiencies: ['None'],
        weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
        startingEquipment: ['Quarterstaff or dagger', 'Component pouch or arcane focus', 'Scholar\'s pack or Explorer\'s pack', 'Spellbook'],
        spellcaster: true,
        spellcastingAbility: 'int',
        subclassLevel: 2
    },
    {
        id: 'rogue',
        name: 'Rogue',
        description: 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies.',
        hitDie: 8,
        primaryAbility: ['dex'],
        savingThrows: ['dex', 'int'],
        skillChoices: 4,
        skillOptions: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'],
        armorProficiencies: ['Light armor'],
        weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
        startingEquipment: ['Rapier or shortsword', 'Shortbow and quiver of 20 arrows or shortsword', 'Burglar\'s pack or Dungeoneer\'s pack or Explorer\'s pack', 'Leather armor, two daggers, and thieves\' tools'],
        spellcaster: false,
        subclassLevel: 3
    },
    {
        id: 'cleric',
        name: 'Cleric',
        description: 'A priestly champion who wields divine magic in service of a higher power.',
        hitDie: 8,
        primaryAbility: ['wis'],
        savingThrows: ['wis', 'cha'],
        skillChoices: 2,
        skillOptions: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
        weaponProficiencies: ['Simple weapons'],
        startingEquipment: ['Mace or warhammer', 'Scale mail or leather armor or chain mail', 'Light crossbow and 20 bolts or any simple weapon', 'Priest\'s pack or Explorer\'s pack', 'Shield and holy symbol'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        subclassLevel: 1
    },
    {
        id: 'ranger',
        name: 'Ranger',
        description: 'A warrior who uses martial prowess and nature magic to combat threats on the edges of civilization.',
        hitDie: 10,
        primaryAbility: ['dex', 'wis'],
        savingThrows: ['str', 'dex'],
        skillChoices: 3,
        skillOptions: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
        armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
        weaponProficiencies: ['Simple weapons', 'Martial weapons'],
        startingEquipment: ['Scale mail or leather armor', 'Two shortswords or two simple melee weapons', 'Dungeoneer\'s pack or Explorer\'s pack', 'Longbow and quiver of 20 arrows'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        subclassLevel: 3
    },
    {
        id: 'barbarian',
        name: 'Barbarian',
        description: 'A fierce warrior of primitive background who can enter a battle rage.',
        hitDie: 12,
        primaryAbility: ['str'],
        savingThrows: ['str', 'con'],
        skillChoices: 2,
        skillOptions: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
        armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
        weaponProficiencies: ['Simple weapons', 'Martial weapons'],
        startingEquipment: ['Greataxe or any martial melee weapon', 'Two handaxes or any simple weapon', 'Explorer\'s pack and four javelins'],
        spellcaster: false,
        subclassLevel: 3
    },
    {
        id: 'bard',
        name: 'Bard',
        description: 'An inspiring magician whose power echoes the music of creation.',
        hitDie: 8,
        primaryAbility: ['cha'],
        savingThrows: ['dex', 'cha'],
        skillChoices: 3,
        skillOptions: ['Acrobatics', 'Animal Handling', 'Arcana', 'Athletics', 'Deception', 'History', 'Insight', 'Intimidation', 'Investigation', 'Medicine', 'Nature', 'Perception', 'Performance', 'Persuasion', 'Religion', 'Sleight of Hand', 'Stealth', 'Survival'],
        armorProficiencies: ['Light armor'],
        weaponProficiencies: ['Simple weapons', 'Hand crossbows', 'Longswords', 'Rapiers', 'Shortswords'],
        startingEquipment: ['Rapier or longsword or any simple weapon', 'Diplomat\'s pack or Entertainer\'s pack', 'Lute or other musical instrument', 'Leather armor and dagger'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        subclassLevel: 3
    },
    {
        id: 'druid',
        name: 'Druid',
        description: 'A priest of the Old Faith, wielding the powers of nature and adopting animal forms.',
        hitDie: 8,
        primaryAbility: ['wis'],
        savingThrows: ['int', 'wis'],
        skillChoices: 2,
        skillOptions: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
        armorProficiencies: ['Light armor', 'Medium armor', 'Shields'],
        weaponProficiencies: ['Clubs', 'Daggers', 'Darts', 'Javelins', 'Maces', 'Quarterstaffs', 'Scimitars', 'Sickles', 'Slings', 'Spears'],
        startingEquipment: ['Wooden shield or any simple weapon', 'Scimitar or any simple melee weapon', 'Leather armor, explorer\'s pack, druidic focus'],
        spellcaster: true,
        spellcastingAbility: 'wis',
        subclassLevel: 2
    },
    {
        id: 'monk',
        name: 'Monk',
        description: 'A master of martial arts, harnessing the power of the body in pursuit of physical and spiritual perfection.',
        hitDie: 8,
        primaryAbility: ['dex', 'wis'],
        savingThrows: ['str', 'dex'],
        skillChoices: 2,
        skillOptions: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
        armorProficiencies: ['None'],
        weaponProficiencies: ['Simple weapons', 'Shortswords'],
        startingEquipment: ['Shortsword or any simple weapon', 'Dungeoneer\'s pack or Explorer\'s pack', '10 darts'],
        spellcaster: false,
        subclassLevel: 3
    },
    {
        id: 'paladin',
        name: 'Paladin',
        description: 'A holy warrior bound to a sacred oath.',
        hitDie: 10,
        primaryAbility: ['str', 'cha'],
        savingThrows: ['wis', 'cha'],
        skillChoices: 2,
        skillOptions: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
        armorProficiencies: ['All armor', 'Shields'],
        weaponProficiencies: ['Simple weapons', 'Martial weapons'],
        startingEquipment: ['Martial weapon and shield or two martial weapons', 'Five javelins or any simple melee weapon', 'Priest\'s pack or Explorer\'s pack', 'Chain mail and holy symbol'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        subclassLevel: 3
    },
    {
        id: 'sorcerer',
        name: 'Sorcerer',
        description: 'A spellcaster who draws on inherent magic from a gift or bloodline.',
        hitDie: 6,
        primaryAbility: ['cha'],
        savingThrows: ['con', 'cha'],
        skillChoices: 2,
        skillOptions: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
        armorProficiencies: ['None'],
        weaponProficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
        startingEquipment: ['Light crossbow and 20 bolts or any simple weapon', 'Component pouch or arcane focus', 'Dungeoneer\'s pack or Explorer\'s pack', 'Two daggers'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        subclassLevel: 1
    },
    {
        id: 'warlock',
        name: 'Warlock',
        description: 'A wielder of magic that is derived from a bargain with an extraplanar entity.',
        hitDie: 8,
        primaryAbility: ['cha'],
        savingThrows: ['wis', 'cha'],
        skillChoices: 2,
        skillOptions: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'],
        armorProficiencies: ['Light armor'],
        weaponProficiencies: ['Simple weapons'],
        startingEquipment: ['Light crossbow and 20 bolts or any simple weapon', 'Component pouch or arcane focus', 'Scholar\'s pack or Dungeoneer\'s pack', 'Leather armor, any simple weapon, and two daggers'],
        spellcaster: true,
        spellcastingAbility: 'cha',
        subclassLevel: 1
    }
];
