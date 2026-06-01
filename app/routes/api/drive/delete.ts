import { createRoute } from "honox/factory";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { zValidator } from "@hono/zod-validator";
import { deleteContentsSchema } from "../../../domain/schemas/delete_contents.schema";
import { Result } from "../../../core/utils/result";

export const DELETE = createRoute(
  diMiddleware,
  zValidator("json", deleteContentsSchema),
  async (c) => {
    const body = c.req.valid("json");

    const contentType = body.contentsType;
    let result: Result<void, any>;

    if (contentType === "file") {
      const fileUsecase = c.get("deleteFileUsecase");
      result = await fileUsecase.execute(body.targetPath);
    } else if (contentType === "directory") {
      const dirUsecase = c.get("deleteDirectoryUsecase");
      result = await dirUsecase.execute(body.targetPath);
    } else {
      return c.json({ error: "Invalid content type" }, 400);
    }

    if (!result.success) {
      return c.json({ error: result.error.message }, 400);
    }

    return c.json({ success: true }, 200);
  },
);
