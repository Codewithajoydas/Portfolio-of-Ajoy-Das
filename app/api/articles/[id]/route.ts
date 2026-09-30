import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Article from "@/models/article.model";
import { logger } from "@/utils/logger";
import { articleSchema } from "@/validators/article.validator";
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
    const validateData = articleSchema.safeParse({ ...data });
    if (!validateData.success) {
      return new Response(JSON.stringify(validateData.error), { status: 400 });
    }
    await connectDB();
    const saveProject = await Article.findByIdAndUpdate(id, validateData.data);
    return NextResponse.json({ saveProject }, { status: 201 });
  } catch (error) {
    logger.error(`Failed to update article ${error}`);
  }
}

export  async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = getAuthenticatedUser();
    if(!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const { id } = await params;
    connectDB();
    const deleteProject = await Article.findByIdAndDelete(id);
    return NextResponse.json({ deleteProject }, { status: 200 });
  } catch (error) {
    logger.error(`Failed to delete article ${error}`);
  }
}
