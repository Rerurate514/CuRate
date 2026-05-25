import { DiEnv } from "../../../middlewares/_di_middleware";
import { DRIVE_DIR } from "../../../domain/constants/file_names";
import { Hono } from "hono";
import z from "zod";

export const DriveEntriesSchema = z.object({
  success: z.boolean(),
  entries: z.object({
    directories: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        path: z.string(),
        createdAt: z.coerce.date(),
        modifiedAt: z.coerce.date(),
      })
    ),
    files: z.array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
        path: z.string(),
        size: z.number(),
        createdAt: z.coerce.date(),
        modifiedAt: z.coerce.date(),
      })
    ),
  }).optional(),
});

export const app = new Hono<DiEnv>();

app.get("/api/drive/entries", async (c) => {
  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(DRIVE_DIR);

  if (!result.success || !result.value) {
    return c.json({ success: false }, 500);
  }

  return c.json({
    success: true,
    entries: result.value,
  });
});
