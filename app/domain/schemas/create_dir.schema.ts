import z from "zod";

export const createDirSchema = z.object({
  currentPath: z.string().min(1),
  folderName: z.string().min(1),
});
