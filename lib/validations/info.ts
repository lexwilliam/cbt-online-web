import * as z from "zod";

export const infoForm = z.object({
  aturan: z.string().min(1, "Aturan is required"),
  info: z.string().min(1, "Info is required"),
});

export type InfoInput = z.infer<typeof infoForm>;
