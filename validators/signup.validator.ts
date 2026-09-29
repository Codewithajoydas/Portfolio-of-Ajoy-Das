import { z } from "zod";
const signupSchema = z.object({
  userName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export default signupSchema;