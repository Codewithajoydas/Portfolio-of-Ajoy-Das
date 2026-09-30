import { connectDB } from "@/lib/connectDb";
import Article from "@/models/article.model";
import { logger } from "@/utils/logger";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const articles = await Article.find();
    return NextResponse.json({ articles }, { status: 200 });
  } catch (error) {
    logger.error(`Failed to get articles ${error}`);
  }
}
