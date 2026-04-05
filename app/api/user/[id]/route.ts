import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../../../services/UserService";
import { checkAuth } from "@/utils/checkAuth";

export const GET = checkAuth(async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
        const user = await UserService.getUserById(id);

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(user);
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
});

export const PUT = checkAuth(async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const data = await req.json();
    try {
        const updatedUser = await UserService.updateUser(id, data);
        return NextResponse.json(
            { message: "User updated successfully", data: updatedUser },
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

export const DELETE = checkAuth(async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    try {
        await UserService.deleteUser(id);
        return NextResponse.json(
            { message: "User deleted successfully" },
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
