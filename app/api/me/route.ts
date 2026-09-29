import { getAuthenticatedUser } from "@/lib/auth";
import { NextResponse } from "next/server";

export  async function GET(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  return NextResponse.json({ user }, { status: 200 });
}
