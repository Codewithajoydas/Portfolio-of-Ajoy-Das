import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export interface AuthPayload {
  id: string;
  email: string;
  role: string;
}

export async function getAuthenticatedUser(): Promise<AuthPayload | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;

    return decoded;
  } catch (error) {
    return null;
  }
}

export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthPayload;
    return decoded;
  } catch (error) {
    return null;
  }
}