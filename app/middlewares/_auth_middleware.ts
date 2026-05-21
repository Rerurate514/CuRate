import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { BYPASS_PATHS } from "../domain/constants/bypass_paths";
import { COOKIE_IDENTIFIER } from "../domain/constants/cookie_identifier";

export const authMiddleware = createMiddleware(async (c, next) => {
    const sessionId = getCookie(c, COOKIE_IDENTIFIER)
    const { pathname } = new URL(c.req.url)

    if(BYPASS_PATHS.some(p => pathname.startsWith(p))) {
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
