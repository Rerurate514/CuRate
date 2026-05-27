import { join } from "node:path";
import { diMiddleware } from "../../../middlewares/_di_middleware";
import { createRoute } from "honox/factory";
import { DRIVE_DIR } from "../../../domain/constants/file_names";

export const GET = createRoute(diMiddleware, async (c) => {
  const path = c.req.query("path");
  const fullPath = path ? join(DRIVE_DIR, path) : DRIVE_DIR;
  const usecase = c.get("getDriveEntriesUsecase");
  const result = await usecase.execute(fullPath);

  if (!result.success || !result.value) {
    return c.json({ success: false }, 500);
  }

  return c.json({
    success: true,
    entries: result.value,
  });
});
