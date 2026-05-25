import z from "zod";

export const DriveEntriesSchema = z.object({
    success: z.boolean(),
    entries: z
        .object({
            directories: z.array(
                z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    path: z.string(),
                    createdAt: z.coerce.date(),
                    modifiedAt: z.coerce.date(),
                }),
            ),
            files: z.array(
                z.object({
                    id: z.string().uuid(),
                    name: z.string(),
                    path: z.string(),
                    size: z.number(),
                    createdAt: z.coerce.date(),
                    modifiedAt: z.coerce.date(),
                }),
            ),
        })
        .optional(),
});
