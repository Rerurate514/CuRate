import { createMiddleware } from "hono/factory";
import { DiEnv } from "./_di_middleware";
import { BYPASS_PATHS } from "../domain/constants/bypass_paths";

export const setupMiddleware = createMiddleware<DiEnv>(async (c, next) => {
    const { pathname } = new URL(c.req.url);

    if (BYPASS_PATHS.some(p => pathname.startsWith(p))) {
        await next();
        return;
    }

    const usecase = c.get('checkInitializeUsecase');
    const result = await usecase.execute();

    if (!result.success) {
        await next();
        return;
    }

    const isCreatedAdmin = result.value;
    if (!isCreatedAdmin) {
        return c.redirect('/auth/setup');
    }

    await next();
});
