
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const email = 'evelasq6@gmail.com';
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (user) {
            console.log('--- USER FOUND ---');
            console.log(`ID: ${user.id}`);
            console.log(`Email: ${user.email}`);
            console.log(`Name: ${user.name}`);
            console.log(`Password Hash: ${user.passwordHash}`);
            console.log('------------------');
        } else {
            console.log(`User not found with email: ${email}`);
        }
    } catch (error) {
        console.error('Error finding user:', error);
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
