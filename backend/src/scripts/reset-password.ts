
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'evelasq6@gmail.com';
    const newPassword = 'password123';

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
