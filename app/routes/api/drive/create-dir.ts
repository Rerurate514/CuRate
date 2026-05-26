import { createRoute } from "honox/factory";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { zValidator } from "@hono/zod-validator";
import { createDirSchema } from "../../../domain/schemas/create_dir.schema";

export const POST = createRoute(
    diMiddleware,
    zValidator("json", createDirSchema),
    async (c) => {
        const body = c.req.valid("json");

        const usecase = c.get("createDirectoryUsecase");
        const result = await usecase.execute(body.targetPath);

        if (!result.success) {
            return c.json({ error: result.error.message }, 400);
        }

        return c.json({ success: true }, 200);
    }
)
