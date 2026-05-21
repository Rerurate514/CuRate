import { zValidator } from '@hono/zod-validator';
import { setCookie } from 'hono/cookie';
import { createRoute } from 'honox/factory';
import { z } from 'zod';
import { diMiddleware } from '../../middlewares/_di_middleware';
import { COOKIE_IDENTIFIER } from '../../domain/constants/cookie_identifier';
import { isProd } from '../../core/utils/is_prod';
import { ErrorMessage } from '../../presentation/common/error_message';

const loginSchema = z.object({
    username: z.string().min(1, 'Please Enter User name'),
    password: z.string().min(1, 'Please Enter Password'),
});

export const GET = createRoute((c) => {
    return c.render(
        <div class="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">CuRate - Login</h1>
            <form method="post" action="/auth/login">
                <div class="my-4">
                    <label class="block mb-1 text-sm font-medium text-gray-700">Username</label>
                    <input type="text" name="username" class="w-full border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div class="my-4">
                    <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" class="w-full border border-blue-500 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <button type="submit" class="bg-sky-500 rounded-lg w-full py-2 text-white font-semibold hover:bg-sky-600 transition-colors mt-2">
                    Login
                </button>
            </form>
        </div>
    )
});

export const POST = createRoute(
    diMiddleware,
    zValidator('form', loginSchema, (result, c) => {
        if (!result.success) {
            return c.render(
                <ErrorMessage 
                    message="There is an error in your input. Please check again."
                    e={result.error}
                    backTo='/auth/login'
                    title='Login Error'
                ></ErrorMessage>
            );
        }
    }),
    async (c) => {
        const {
            username,
            password
        } = c.req.valid('form');
        const loginUsecase = c.get('loginUsecase');
        const session = await loginUsecase.execute(username, password);

        if(!session.success) {
            return c.render(
                <ErrorMessage 
                    message="The username or password is incorrect."
                    e={session.error}
                    backTo='/auth/login'
                    title='Login Error'
                ></ErrorMessage>
            );
        }

        try {
            setCookie(c, COOKIE_IDENTIFIER, session.value!.id, {
                path: '/',
                httpOnly: true,
                secure: isProd,
                maxAge: session.value!.expiresAt.toMaxAgeSeconds()
            });
            
            return c.redirect('/dashboard', 303);
        } catch (error: any) {
            return c.render(
                <ErrorMessage 
                    message="The username or password is incorrect."
                    e={error}
                    backTo='/auth/login'
                    title='Login Error'
                ></ErrorMessage>
            );
        }
    }
)
