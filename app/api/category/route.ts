import { NextRequest, NextResponse } from "next/server";
import { CategoryService } from "@/services/CategoryService";

export async function GET() {
    try {
        const categories = await CategoryService.getAllCategories();
        return NextResponse.json(
            { message: "Successfully fetched all Categories", data: categories },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching all categories:", error);
        return NextResponse.json(
            { error: "Failed to fetch all categories" },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const newCategory = await CategoryService.addCategory(data);
        return NextResponse.json(
            { message: "Successfully created categorie", data: newCategory },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating category:", error);
        return NextResponse.json(
            { error: "Failed to create category" },
            { status: 500 }
        );
    }
}

export async function DELETE() {
    try {
        const categories = await CategoryService.deleteAllCategories();
        return NextResponse.json(`Deleted ${categories.count} categories.`, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting all categories:", error);
        return NextResponse.json(
            { error: "Failed to delete all categories" },
            { status: 500 }
        );
    }
}
