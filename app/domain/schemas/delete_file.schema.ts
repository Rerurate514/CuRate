import z from "zod";

export const deleteFileSchema = z.object({
  targetPath: z.string().min(1),
});
