// app/actions/createCategory.ts
"use server";

import prisma from "@/lib/prisma";

export default async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;
    await prisma.category.create({ data: { name } });
}
