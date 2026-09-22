// Shared config for the admin reference-data UI. Mirrors backend/src/lib/referenceTypes.ts
// and backend/src/routes/admin.ts's shape schemas, but only enough to drive form rendering —
// the backend is the source of truth for validation.

export const REFERENCE_TYPES = [
    'spell',
    'race',
    'class',
    'background',
    'subclass',
    'classFeature',
    'feat',
    'baseItem',
    'trait',
    'fightingStyle',
] as const;

export type ReferenceType = typeof REFERENCE_TYPES[number];

export const TYPE_LABELS: Record<ReferenceType, string> = {
    spell: 'Spells',
    race: 'Races',
    class: 'Classes',
    background: 'Backgrounds',
    subclass: 'Subclasses',
    classFeature: 'Class Features',
    feat: 'Feats',
    baseItem: 'Items',
    trait: 'Traits',
    fightingStyle: 'Fighting Styles',
};

export type FieldKind = 'text' | 'textarea' | 'number' | 'boolean' | 'stringArray' | 'select';

export interface FieldConfig {
    key: string;
    label: string;
    kind: FieldKind;
    options?: string[]; // for kind: 'select'
    optional?: boolean; // for kind: 'select' — adds a blank option
}

// Top-level fields with a dedicated input. Anything else on the record is
// still editable, just via the "Other fields (JSON)" box on the form —
// these are only the fields common enough to deserve their own control.
export const FIELD_CONFIGS: Record<ReferenceType, FieldConfig[]> = {
    spell: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'level', label: 'Level (0 = cantrip)', kind: 'number' },
        { key: 'school', label: 'School', kind: 'text' },
        { key: 'castingTime', label: 'Casting Time', kind: 'text' },
        { key: 'range', label: 'Range', kind: 'text' },
        { key: 'components', label: 'Components', kind: 'text' },
        { key: 'duration', label: 'Duration', kind: 'text' },
        { key: 'ritual', label: 'Ritual', kind: 'boolean' },
        { key: 'classes', label: 'Classes (comma-separated)', kind: 'stringArray' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    race: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'size', label: 'Size', kind: 'text' },
        { key: 'speed', label: 'Speed (ft)', kind: 'number' },
        { key: 'traits', label: 'Trait names (comma-separated)', kind: 'stringArray' },
        { key: 'languages', label: 'Languages (comma-separated)', kind: 'stringArray' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    class: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'hitDie', label: 'Hit Die (e.g. 8, 10, 12)', kind: 'number' },
        { key: 'spellcaster', label: 'Spellcaster', kind: 'boolean' },
        { key: 'preparedCaster', label: 'Prepared Caster', kind: 'boolean' },
        { key: 'spellcastingAbility', label: 'Spellcasting Ability (e.g. int, wis, cha)', kind: 'text' },
        { key: 'subclassLevel', label: 'Subclass Chosen At Level', kind: 'number' },
        { key: 'skillChoices', label: 'Number of Skill Choices', kind: 'number' },
        { key: 'primaryAbility', label: 'Primary Ability (comma-separated)', kind: 'stringArray' },
        { key: 'savingThrows', label: 'Saving Throw Proficiencies (comma-separated)', kind: 'stringArray' },
        { key: 'skillOptions', label: 'Skill Options (comma-separated)', kind: 'stringArray' },
        { key: 'armorProficiencies', label: 'Armor Proficiencies (comma-separated)', kind: 'stringArray' },
        { key: 'weaponProficiencies', label: 'Weapon Proficiencies (comma-separated)', kind: 'stringArray' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    background: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'languages', label: 'Bonus Languages (count)', kind: 'number' },
        { key: 'skillProficiencies', label: 'Skill Proficiencies (comma-separated)', kind: 'stringArray' },
        { key: 'toolProficiencies', label: 'Tool Proficiencies (comma-separated)', kind: 'stringArray' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    subclass: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'classId', label: 'Class Id (e.g. wizard)', kind: 'text' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    classFeature: [], // special-cased: repeating level/name/description rows, see the [type] edit page
    feat: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    baseItem: [
        { key: 'name', label: 'Name', kind: 'text' },
        {
            key: 'category', label: 'Category', kind: 'select',
            options: ['armor', 'weapon', 'shield', 'tool', 'magic-item', 'potion', 'scroll', 'miscellaneous'],
        },
        { key: 'type', label: 'Type', kind: 'select', options: ['armor', 'weapon', 'shield', 'other'], optional: true },
        { key: 'armorMethod', label: 'Armor Method', kind: 'select', options: ['light', 'medium', 'heavy', 'shield', 'none'], optional: true },
        { key: 'baseAC', label: 'Base AC', kind: 'number' },
        { key: 'damage', label: 'Damage (e.g. 1d8)', kind: 'text' },
        { key: 'damageType', label: 'Damage Type (e.g. slashing)', kind: 'text' },
        { key: 'properties', label: 'Properties (comma-separated)', kind: 'stringArray' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    // Trait name IS its key (see the [type] edit page) — no separate name field.
    trait: [
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
    fightingStyle: [
        { key: 'name', label: 'Name', kind: 'text' },
        { key: 'description', label: 'Description', kind: 'textarea' },
    ],
};
