import * as z from "zod";

export const roomSchema = z.object({
  url: z.string().min(1).max(255),
  exit_key: z.string().min(1).max(255),
});

export type RoomInput = z.infer<typeof roomSchema>;
