// Gives items characters got from campaign loot the loot's value (see lib/lootValues).
// Compiled with the app so the Render build can run it after migrations (there's no Shell).
//
// Usage: npm run backfill-loot-values              (dry run: lists what would change)
//        npm run backfill-loot-values -- --apply   (saves it)
import dotenv from 'dotenv';
dotenv.config();
import { prisma } from '../lib/prisma';
import { backfillLootValues } from '../lib/lootValues';

async function main() {
    const apply = process.argv.includes('--apply');
    const label = apply ? '' : '[DRY RUN] ';
    const report = await backfillLootValues(prisma, { apply });
    for (const i of report.items) console.log(`${label}${i.characterName}: ${i.item} = ${i.value}`);
    console.log(`${label}Checked ${report.charactersChecked} character(s) holding loot with a value; ${apply ? 'updated' : 'would update'} ${report.charactersUpdated} (${report.items.length} item(s)).`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exitCode = 1;
    })
    .finally(() => prisma.$disconnect());
