import "dotenv/config";
import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({
    adapter,
});
async function main() {
    const gold = await prisma.sponsorTier.upsert({
        where: { name: "gold" },
        update: {
            sponsor: {
                create: [
                    {
                        name: "me",
                        image_url:
                            "https://cdn.britannica.com/44/4144-004-43DD2776/Peneus-setiferus.jpg",
                    },
                    {
                        name: "justin",
                        image_url:
                            "https://static.wikia.nocookie.net/tekken/images/0/0c/Yoshimitsu_TK8_render_%28High_Resolution%29.jpg/revision/latest?cb=20251203015109&path-prefix=en",
                    },
                ],
            },
        },
        create: {
            name: "gold",
        },
    });
    const silver = await prisma.sponsorTier.upsert({
        where: { name: "silver" },
        update: {
            sponsor: {
                create: [
                    {
                        name: "treyson",
                        image_url:
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOaBjpdhWvLHr1RwB6i-6AotHmQE0MKirVLA&s",
                    },
                    {
                        name: "lawrence",
                        image_url: "",
                    },
                ],
            },
        },
        create: {
            name: "silver",
        },
    });
    const bronze = await prisma.sponsorTier.upsert({
        where: { name: "bronze" },
        update: {
            sponsor: {
                create: [
                    {
                        name: "dragunov",
                        image_url:
                            "https://upload.wikimedia.org/wikipedia/commons/b/b2/Hausziege_04.jpg",
                    },
                    {
                        name: "yoshi",
                        image_url:
                            "https://i.pinimg.com/474x/6f/46/01/6f46018cba280f9d00176726fec6585e.jpg",
                    },
                ],
            },
        },
        create: {
            name: "bronze",
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
        await pool.end();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        await pool.end();
        process.exit(1);
    });
