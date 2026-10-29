
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Project from "@/models/project.model";
import { logger } from "@/utils/logger";
import { projectSchema } from "@/validators/projects.validator";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const data = await req.json();
    const validateData = projectSchema.safeParse(data);

    if (!validateData.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validateData.error.flatten(),
        },
        { status: 400 }
      );
    }

    await connectDB();

    const saveProject = await Project.create(validateData.data);

    return NextResponse.json(
      { success: true, saveProject },
      { status: 201 }
    );
  } catch (error) {
    logger.error(`Failed to create project: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create project",
      },
      { status: 500 }
    );
  }
}
