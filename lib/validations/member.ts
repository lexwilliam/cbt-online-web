import * as z from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  role: z.string().max(50),
  password: z.string().min(1).max(255).optional(),
});

export type UserInput = z.infer<typeof userSchema>;
