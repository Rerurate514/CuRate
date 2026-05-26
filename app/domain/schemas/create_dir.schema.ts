import z from "zod";

export const createDirSchema = z.object({
    targetPath: z.string().min(1),
    name: z.string().min(1)
});
