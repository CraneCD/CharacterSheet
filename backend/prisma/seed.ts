// Seeds ReferenceItem from the static data files in backend/src/data.
// Safe to run more than once (skipDuplicates): it only fills in rows that
// don't exist yet, so it never overwrites data an admin has since edited.
// To push rules updates into an existing database, use
// `npm run sync-reference` (src/scripts/syncReferenceData.ts) instead.
import { PrismaClient } from '@prisma/client';
import { buildReferenceRows } from '../src/lib/referenceSeed';

const prisma = new PrismaClient();

async function main() {
    const rows = buildReferenceRows();

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
