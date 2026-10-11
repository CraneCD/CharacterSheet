// Grants (or revokes with --revoke) admin access for an existing user.
// Usage: npm run make-admin -- someone@example.com
//        npm run make-admin -- someone@example.com --revoke
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    const email = args.find((a) => !a.startsWith('--'));
    const revoke = args.includes('--revoke');

    if (!email) {
        console.error('Usage: npm run make-admin -- someone@example.com [--revoke]');
        process.exit(1);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        console.error(`No user found with email: ${email}`);
        process.exit(1);
    }

    const updated = await prisma.user.update({
        where: { email },
        data: { isAdmin: !revoke },
    });

    console.log(`${updated.email} isAdmin=${updated.isAdmin}`);
    console.log('The change applies on their next request.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
