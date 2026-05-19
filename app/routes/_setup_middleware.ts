import { createMiddleware } from "hono/factory";
import { DiEnv } from "./_di._middleware";

export const setupMiddleware = createMiddleware<DiEnv>(async (c, next) => {
    const { pathname } = new URL(c.req.url);

    if(pathname === '/setup') return await next();

    const usecase = c.get('checkInitializeUsecase');
    const result = await usecase.execute();

    if(!result.success) return await next();
    if(result.value!) return c.redirect('/auth/login');

    await next();
});
