import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";

export const authMiddleware = createMiddleware(async (c, next) => {
    const sessionId = getCookie(c, 'curate_session')

    if(c.req.path === '/auth/login') {
        await next()
        return
    }

    if(!sessionId || !(await isValidSsession(sessionId))) {
        return c.redirect('/auth/login')
    }

    await next()
})

async function isValidSsession(id: string): Promise<boolean> {
    return true
}
