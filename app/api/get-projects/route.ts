import { connectDB } from "@/lib/connectDb";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const projects = await Project.find();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    logger.error(`Failed to get projects ${error}`);
  }
}
