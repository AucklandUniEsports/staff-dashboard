import { betterAuth } from "better-auth";
import { headers } from "next/headers";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient();
export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),

});

await auth.api.getSession({
    headers: await headers()
})

await auth.api.signInEmail({
    body: {
        email: "john@doe.com",
        password: "password"
    },
    headers: await headers() // optional but would be useful to get the user IP, user agent, etc.
})

await auth.api.verifyEmail({
    query: {
        token: "my_token"
    }
})