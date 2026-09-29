import {z} from "zod";

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export type signInSchema = z.infer<typeof signInSchema>;
export default signInSchema;