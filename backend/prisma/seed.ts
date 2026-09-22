// Seeds ReferenceItem from the original static data files in backend/src/data.
// Safe to run more than once (skipDuplicates): it only fills in rows that
// don't exist yet, so it never overwrites data an admin has since edited.
import { PrismaClient } from '@prisma/client';
import { races } from '../src/data/races';
import { classes } from '../src/data/classes';
import { backgrounds } from '../src/data/backgrounds';
import { spells } from '../src/data/spells';
import { subclasses } from '../src/data/subclasses';
import { classFeatures } from '../src/data/classFeatures';
import { feats } from '../src/data/feats';
import { baseItems } from '../src/data/baseItems';
import { traits } from '../src/data/traits';
import { fightingStyles } from '../src/data/fightingStyles';
import { uniqueSlug } from '../src/utils/slug';

const prisma = new PrismaClient();

async function main() {
    const rows: { type: string; key: string; data: any }[] = [];

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
    const takenSlugs = new Set<string>();
    for (const item of baseItems) {
        const key = uniqueSlug(item.name, takenSlugs);
        rows.push({ type: 'baseItem', key, data: item });
    }

    const result = await prisma.referenceItem.createMany({
        data: rows,
        skipDuplicates: true,
    });

    console.log(`Seeded ${result.count} of ${rows.length} reference rows (existing rows left untouched).`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
