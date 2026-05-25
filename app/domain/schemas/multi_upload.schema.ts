import z from "zod";

export const multiUploadSchema = z.object({
    file: z
        .preprocess(
            (val) => (Array.isArray(val) ? val : val ? [val] : []),
            z.array(z.instanceof(File)),
        )
        .refine((files) => files.length > 0, {
            message: "Please select at least one file",
        }),
});
