import z from "zod";

export const deleteContentsSchema = z.object({
  targetPath: z.string().min(1),
  contentsType: z.enum(["file", "directory"]),
});
