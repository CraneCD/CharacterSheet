
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.RESET_EMAIL;
    const newPassword = process.env.RESET_PASSWORD;

    if (!email || !newPassword) {
        console.error(
            'Set RESET_EMAIL and RESET_PASSWORD in the environment (local admin use only).'
        );
        process.exit(1);
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        const user = await prisma.user.update({
            where: { email },
            data: { passwordHash },
        });

        console.log('--- PASSWORD RESET SUCCESSFUL ---');
        console.log(`User: ${user.email}`);
        console.log(`New Password: ${newPassword}`);
        console.log(`New Hash: ${user.passwordHash}`);
        console.log('-------------------------------');

    } catch (error) {
        console.error('Error resetting password:', error);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
