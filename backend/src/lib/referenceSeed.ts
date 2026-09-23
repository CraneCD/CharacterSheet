// Builds ReferenceItem rows from the static data files in src/data. Shared by
// prisma/seed.ts (first-time fill) and scripts/syncReferenceData.ts (pushing
// rules updates into an existing database).
import { races } from '../data/races';
import { classes } from '../data/classes';
import { backgrounds } from '../data/backgrounds';
import { spells } from '../data/spells';
import { subclasses } from '../data/subclasses';
import { classFeatures } from '../data/classFeatures';
import { feats } from '../data/feats';
import { baseItems } from '../data/baseItems';
import { traits } from '../data/traits';
import { fightingStyles } from '../data/fightingStyles';
import { uniqueSlug } from '../utils/slug';
import { ReferenceType } from './referenceTypes';

export interface ReferenceRow {
    type: ReferenceType;
    key: string;
    data: any;
}

export function buildReferenceRows(): ReferenceRow[] {
    const rows: ReferenceRow[] = [];

    for (const r of races) rows.push({ type: 'race', key: r.id, data: r });
    for (const c of classes) rows.push({ type: 'class', key: c.id, data: c });
    for (const b of backgrounds) rows.push({ type: 'background', key: b.id, data: b });
    for (const s of spells) rows.push({ type: 'spell', key: s.id, data: s });
    for (const sc of subclasses) rows.push({ type: 'subclass', key: sc.id, data: sc });
    for (const f of feats) rows.push({ type: 'feat', key: f.id, data: f });
    for (const fs of fightingStyles) rows.push({ type: 'fightingStyle', key: fs.id, data: fs });

    // classFeatures.ts is a map keyed by classId -> ClassFeature[]; each
    // class's whole feature list is one ReferenceItem row.
    for (const classId of Object.keys(classFeatures)) {
        rows.push({ type: 'classFeature', key: classId, data: classFeatures[classId] });
    }

    // traits.ts is a map keyed by trait name -> Trait.
    for (const name of Object.keys(traits)) {
        rows.push({ type: 'trait', key: name, data: traits[name] });
    }

    // baseItems.ts entries have no id field; derive stable slugs from name.
    // Order matters for duplicate names (-2, -3, ...), so new items are only
    // ever appended to baseItems.ts.
    const takenSlugs = new Set<string>();
    for (const item of baseItems) {
        const key = uniqueSlug(item.name, takenSlugs);
        rows.push({ type: 'baseItem', key, data: item });
    }

    return rows;
}
