import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Article from "@/models/article.model";
import { logger } from "@/utils/logger";
import { articleSchema } from "@/validators/article.validator";
import { NextResponse } from "next/server";

export  async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const data = await req.json();
    const validateData = articleSchema.safeParse(data);
    if (!validateData.success) {
      return new Response(JSON.stringify(validateData.error), { status: 400 });
    }
    await connectDB();
    const saveArticle = await Article.create(validateData.data);
    return NextResponse.json({ saveArticle }, { status: 201 });
  } catch (error) {
    logger.error(`Failed to create project ${error}`);
  }
}
