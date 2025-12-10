
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = 'evelasq6@gmail.com';
    const password = 'password123';

    console.log(`Attempting login for: ${email} with password: ${password}`);

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            console.log('User NOT found.');
            return;
        }

        console.log('User found:', user.email);
        console.log('Stored Hash:', user.passwordHash);

        const validPass = await bcrypt.compare(password, user.passwordHash);

        if (validPass) {
            console.log('--- LOGIN SUCCESSFUL (in script) ---');
        } else {
            console.log('--- LOGIN FAILED (in script) ---');
            console.log('Password does not match hash.');
        }

    } catch (error) {
        console.error('Error verifying login:', error);
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
