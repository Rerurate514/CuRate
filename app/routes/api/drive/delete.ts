import { createRoute } from "honox/factory";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { zValidator } from "@hono/zod-validator";
import { deleteFileSchema } from "../../../domain/schemas/delete_file.schema";

export const DELETE = createRoute(
  diMiddleware,
  zValidator("json", deleteFileSchema),
  async (c) => {
    const body = c.req.valid("json");

    const usecase = c.get("deleteFileUsecase");
    const result = await usecase.execute(body.targetPath);

    if (!result.success) {
      return c.json({ error: result.error.message }, 400);
    }

    return c.json({ success: true }, 200);
  },
);
