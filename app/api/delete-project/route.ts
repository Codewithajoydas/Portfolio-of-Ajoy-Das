import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    await connectDB();
    const deleteProject = await Project.findByIdAndDelete(data.id);
    return NextResponse.json({ deleteProject }, { status: 200 });
  } catch (error) {
    logger.error(`Failed to create project ${error}`);
  }
}
