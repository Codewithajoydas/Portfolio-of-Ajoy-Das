import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { projectSchema } from "@/validators/projects.validator";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    const validateData = projectSchema.safeParse({ id: data.id, ...data });
    if (!validateData.success) {
      return new Response(JSON.stringify(validateData.error), { status: 400 });
    }
    await connectDB();
    const saveProject = await Project.findByIdAndUpdate(
      data.id,
      validateData.data,
    );
    return NextResponse.json({ saveProject }, { status: 201 });
  } catch (error) {
    logger.error(`Failed to create project ${error}`);
  }
}
