// One-time backfill for characters created before admin-editable reference
// data existed: their equipment/feat entries are full embedded copies with
// no baseItemId/featId, so they never pick up the reference-data live-merge
// added alongside the admin panel (see EquipmentManager/FeatureManager).
//
// This matches existing equipment/feat entries against current base
// item/feat names and sets baseItemId/featId where exactly one reference
// row has that name. Names that collide across multiple reference rows are
// skipped everywhere (never guess which one an existing character meant).
// Idempotent: entries that already carry an id, or that match nothing, are
// left untouched, so it's safe to re-run.
//
// Usage: npm run backfill-reference-ids -- --dry-run   (preview only)
//        npm run backfill-reference-ids                (apply)
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function normalizeName(name: unknown): string {
    return typeof name === 'string' ? name.trim().toLowerCase() : '';
}

/** Build normalized-name -> key, dropping any name shared by more than one row. */
function buildNameIndex(rows: { key: string; data: unknown }[]): Map<string, string> {
    const byName = new Map<string, string>();
    const collided = new Set<string>();
    for (const row of rows) {
        const name = normalizeName((row.data as any)?.name);
        if (!name) continue;
        if (byName.has(name)) {
            collided.add(name);
        } else {
            byName.set(name, row.key);
        }
    }
    for (const name of collided) byName.delete(name);
    return byName;
}

async function main() {
    const dryRun = process.argv.includes('--dry-run');
    const label = dryRun ? '[DRY RUN] ' : '';

    const [baseItems, feats] = await Promise.all([
        prisma.referenceItem.findMany({ where: { type: 'baseItem' } }),
        prisma.referenceItem.findMany({ where: { type: 'feat' } }),
    ]);
    const baseItemByName = buildNameIndex(baseItems);
    const featByName = buildNameIndex(feats);
    console.log(`${label}${baseItemByName.size}/${baseItems.length} base item names usable for matching (rest share a name with another item).`);
    console.log(`${label}${featByName.size}/${feats.length} feat names usable for matching.`);

    let charactersScanned = 0;
    let charactersChanged = 0;
    let itemsBackfilled = 0;
    let featsBackfilled = 0;

    const pageSize = 100;
    let cursor: string | undefined;

    while (true) {
        const characters = await prisma.character.findMany({
            take: pageSize,
            ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
            orderBy: { id: 'asc' },
        });
        if (characters.length === 0) break;
        cursor = characters[characters.length - 1].id;

        for (const character of characters) {
            charactersScanned++;
            const data = character.data as any;
            let changed = false;

            if (Array.isArray(data?.equipment)) {
                data.equipment = data.equipment.map((item: any) => {
                    if (typeof item !== 'object' || item === null || item.baseItemId) return item;
                    const key = baseItemByName.get(normalizeName(item.name));
                    if (!key) return item;
                    changed = true;
                    itemsBackfilled++;
                    return { ...item, baseItemId: key };
                });
            }

            if (Array.isArray(data?.features)) {
                data.features = data.features.map((feature: any) => {
                    if (typeof feature !== 'object' || feature === null || feature.featId) return feature;
                    if (normalizeName(feature.source) !== 'feat') return feature;
                    const key = featByName.get(normalizeName(feature.name));
                    if (!key) return feature;
                    changed = true;
                    featsBackfilled++;
                    return { ...feature, featId: key };
                });
            }

            if (changed) {
                charactersChanged++;
                if (!dryRun) {
                    await prisma.character.update({ where: { id: character.id }, data: { data } });
                }
            }
        }
    }

    console.log(`${label}Scanned ${charactersScanned} characters.`);
    console.log(`${label}${dryRun ? 'Would update' : 'Updated'} ${charactersChanged} characters.`);
    console.log(`${label}${dryRun ? 'Would backfill' : 'Backfilled'} ${itemsBackfilled} equipment item(s) and ${featsBackfilled} feat(s).`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
