import * as z from "zod";

export const RoomSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().min(1).max(255),
  exit_key: z.string().min(1).max(255),
  created_at: z
    .date()
    .optional()
    .default(() => new Date()),
  group_id: z.number().int().positive(),
});

export type RoomSchemaType = z.infer<typeof RoomSchema>;
