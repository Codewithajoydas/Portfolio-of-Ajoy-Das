
import { getAuthenticatedUser } from "@/lib/auth";
import { connectDB } from "@/lib/connectDb";
import Article from "@/models/article.model";
import { logger } from "@/utils/logger";
import { articleSchema } from "@/validators/article.validator";
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
    const validateData = articleSchema.safeParse(data);

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

    const saveArticle = await Article.create(validateData.data);

    return NextResponse.json(
      { success: true, saveArticle },
      { status: 201 }
    );
  } catch (error) {
    logger.error(`Failed to create article: ${error}`);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create article",
      },
      { status: 500 }
    );
  }
}
