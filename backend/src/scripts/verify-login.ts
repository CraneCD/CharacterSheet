import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const email = process.env.VERIFY_LOGIN_EMAIL;
    const password = process.env.VERIFY_LOGIN_PASSWORD;

    if (!email || !password) {
        console.error(
            'Set VERIFY_LOGIN_EMAIL and VERIFY_LOGIN_PASSWORD in the environment (local debugging only).'
        );
        process.exit(1);
    }

    console.log(`Attempting login for: ${email}`);

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
