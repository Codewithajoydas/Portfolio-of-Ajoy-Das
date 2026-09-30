import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const response = NextResponse.json(
            { message: "Cookie removed" },
            { status: 200 }
        );
        response.cookies.delete("token");
        return response;
    } catch (error) {
        logger.error(`Failed to remove cookie: ${error}`);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}