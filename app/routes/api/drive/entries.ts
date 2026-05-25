import { diMiddleware } from "../../../middlewares/_di_middleware";
import { DRIVE_DIR } from "../../../domain/constants/file_names";
import { createRoute } from "honox/factory";

export const GET = createRoute(diMiddleware, async (c) => {
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
