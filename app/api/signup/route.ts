import signupSchema from "@/validators/signup.validator";
import { NextResponse } from "next/server";
import User from "@/models/user.model";
import { connectDB } from "@/lib/connectDb";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    // 1. Get request body
    const data = await req.json();

    // 2. Validate request body
    const validatedData = signupSchema.safeParse(data);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error: validatedData.error.flatten(),
        },
        { status: 400 }
      );
    }

    // 3. Get validated data
    const { userName, email, password } = validatedData.data;

    // 4. Connect to database
    await connectDB();

    // 5. Check whether user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 409 }
      );
    }

    // 6. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 7. Create user
    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    // 8. Return safe user data
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser._id,
          username: newUser.userName,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}