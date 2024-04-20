import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkConnection() {
    try {
        // Perform a simple query to check the database connection
        const result: any = await prisma.$queryRaw`SELECT 1+1 as result`;
        console.log('Database connection successful:', result[0].result === 2);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    } finally {
        await prisma.$disconnect(); // Disconnect Prisma Client
    }
}

checkConnection();

export default prisma;