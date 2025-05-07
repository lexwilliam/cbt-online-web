import * as z from "zod";

export const GroupSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(255),
  created_at: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type GroupSchemaType = z.infer<typeof GroupSchema>;
