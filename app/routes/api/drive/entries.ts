import { join } from "node:path";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { createRoute } from "honox/factory";

export const GET = createRoute(diMiddleware, async (c) => {
  const path = c.req.query("path");
  if (!path) {
    return c.json({ success: false }, 400);
  }

  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(path);

  if (!result.success || !result.value) {
    return c.json({ success: false }, 500);
  }

  return c.json({
    success: true,
    entries: result.value,
  });
});
