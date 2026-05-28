import { createRoute } from "honox/factory";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { zValidator } from "@hono/zod-validator";
import { createDirSchema } from "../../../domain/schemas/create_dir.schema";

export const POST = createRoute(
  diMiddleware,
  zValidator("form", createDirSchema),
  async (c) => {
    const body = c.req.valid("form");
    const targetPath = `${body.currentPath}/${body.folderName}`;

    const usecase = c.get("createDirectoryUsecase");
    const result = await usecase.execute(targetPath);

    if (!result.success) {
      return c.json({ error: result.error.message }, 400);
    }

    return c.redirect(body.currentPath);
  },
);
