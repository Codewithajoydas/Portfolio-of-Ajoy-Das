import { connectDB } from "@/lib/connectDb";
import { logger } from "@/utils/logger";
import signInSchema from "@/validators/signin.validator";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(req: Request) {
  try {
    const data = await req.json(); // get data from request
    const validateData = signInSchema.safeParse(data); // validate the data
    if (!validateData.success) {
      // if validation fails
      logger.error(JSON.parse(validateData.error.message));
      return NextResponse.json(
        { error: JSON.parse(validateData.error.message) },
        { status: 400 },
      );
    }
    // if validation succeeds then connect to mongodb
    await connectDB();
    const findUser = await User.findOne({ email: data.email });
    if (!findUser) {
      logger.error("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Now compare the password
    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      findUser.password,
    );
    if (!isPasswordCorrect) {
      logger.error("Password is incorrect");
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 },
      );
    }
    const token = jwt.sign(
      {
        id: findUser._id,
        email: findUser.email,
        role: findUser.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );
    // write cookie and return response
    const response = NextResponse.json({
      message: "success",
      user: { id: findUser._id, email: findUser.email, role: findUser.role },
    });
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    logger.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
