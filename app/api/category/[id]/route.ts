import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/services/CategoryService";
import { checkAuth } from "@/utils/checkAuth";

export const GET = checkAuth(async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;
    try {
        const category = await CategoryService.getCategoryById(id);

        if (!category) {
            return NextResponse.json(
                { message: "Category not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(category);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});

export const PUT = checkAuth(async (req: NextRequest, { params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;
    const data = await req.json();

    try {
        const updatedCategory = await CategoryService.updateCategory(id, data);
        return NextResponse.json(
            { message: "Category updated successfully", data: updatedCategory },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});

export const DELETE = checkAuth(async ({ params }: { params: Promise<{ id: number }> }) => {
    const { id } = await params;
    try {
        await CategoryService.deleteCategory(id);
        return NextResponse.json(
            { message: "Category deleted successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});