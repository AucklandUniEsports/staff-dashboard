import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export function checkAuth(handler: Function) {
    return async (req: NextRequest, context?: any) => {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        } 

        return handler(req, context, session);
    };
}