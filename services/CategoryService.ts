import prisma from "@/lib/prisma";
import { CategoryCreateInput, CategoryUpdateInput } from "@/app/generated/prisma/models";

export class CategoryService {
    static async addCategory(data: CategoryCreateInput) {

        return prisma.category.create({ data });
    }

    static async getAllCategories() {
        return prisma.category.findMany();
    }

    static async getCategoryById(id: number) {
        const category = await prisma.category.findUnique({ where: { id } });
        if (!category) {
            return null;
        }
        return category;

    }

    static async updateCategory(id: number, data: CategoryUpdateInput) {
        return prisma.category.update({
            where: { id },
            data,
        });
    }


    static async deleteCategory(id: number) {
        return prisma.category.delete({
            where: { id },
        });
    }

    static async deleteAllCategories(){
        return prisma.category.deleteMany();
    }

}
