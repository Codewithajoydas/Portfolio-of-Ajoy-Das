import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { projectSchema } from "@/validators/projects.validator";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { id } = await params;
    const data = await req.json();
    const validateData = projectSchema.safeParse({ ...data });
    if (!validateData.success) {
      return new Response(JSON.stringify(validateData.error), { status: 400 });
    }
    await connectDB();
    const saveProject = await Project.findByIdAndUpdate(
      id,
      validateData.data,
    );
    return NextResponse.json({ saveProject }, { status: 201 });
  } catch (error) {
    logger.error(`Failed to create project ${error}`);
  }
}


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const {id} = await params;
    await connectDB();
    const deleteProject = await Project.findByIdAndDelete(id);
    return NextResponse.json({ deleteProject }, { status: 200 });
  } catch (error) {
    logger.error(`Failed to create project ${error}`);
  }
}