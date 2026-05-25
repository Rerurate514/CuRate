import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { BYPASS_PATHS } from "../domain/constants/bypass_paths";
import { COOKIE_IDENTIFIER } from "../domain/constants/cookie_identifier";
import { DiEnv } from "./_di_middleware";

export const authMiddleware = createMiddleware<DiEnv>(async (c, next) => {
  const sessionId = getCookie(c, COOKIE_IDENTIFIER);
  const { pathname } = new URL(c.req.url);

  if (BYPASS_PATHS.some((p) => pathname.startsWith(p))) {
    await next();
    return;
  }

  if (!sessionId) {
    return c.redirect("/auth/login");
  }

  const usecase = c.get("checkValidSessionUsecase");
  const result = await usecase.execute(sessionId);

  if (!result.success || !result.value) {
    return c.redirect("/auth/login");
  }

  await next();
});
