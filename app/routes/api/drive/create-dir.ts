import path from "node:path";
import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { createDirSchema } from "../../../domain/schemas/create_dir.schema";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { CURATE_DIR, DRIVE_DIR } from "../../../domain/constants/file_names";

export const POST = createRoute(
  diMiddleware,
  zValidator("form", createDirSchema),
  async (c) => {
    const body = c.req.valid("form");
    
    const rawPath = path.join(CURATE_DIR, body.currentPath, body.folderName);
    const targetPath = rawPath.split(path.sep).join("/");

      console.log(targetPath)

    const usecase = c.get("createDirectoryUsecase");
    const result = await usecase.execute(targetPath);

    if (!result.success) {
      return c.json({ error: result.error.message }, 400);
    }

    return c.redirect(body.currentPath);
  },
);
