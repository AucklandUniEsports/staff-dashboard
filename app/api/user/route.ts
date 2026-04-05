import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../../services/UserService";
import { checkAuth } from "@/utils/checkAuth";

export const POST = checkAuth(async (req: NextRequest) => {
    try {
        const data = await req.json();
        const newUser = await UserService.createUser(data);
        return NextResponse.json(
            { message: "Successfully created user", data: newUser },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { error: "Failed to create user" },
            { status: 500 }
        );
    }
});

export const GET = checkAuth(async () => {
    try {
        const users = await UserService.getAllUsers();
        return NextResponse.json(
            { message: "Successfully fetched all users", data: users },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error("Error fetching all users:", error);
        return NextResponse.json(
            { error: "Failed to fetch all users" },
            { status: 500 }
        );
    }
});

export const DELETE = checkAuth(async () => {
    try {
        const users = await UserService.deleteAllUsers();
        return NextResponse.json(`Deleted ${users.count} users.`, {
            status: 200,
        });
    } catch (error) {
        console.error("Error deleting all users:", error);
        return NextResponse.json(
            { error: "Failed to delete all users" },
            { status: 500 }
        );
    }
})
