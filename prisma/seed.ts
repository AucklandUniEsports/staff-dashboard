import 'dotenv/config'
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

const categoryData: Prisma.CategoryCreateInput[] = [
    {
        name: "TEKKEN 8",
    },
];

export async function main() {
    for (const u of categoryData) {
        await prisma.category.create({ data: u });
    }
}

main();