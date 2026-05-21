import { zValidator } from '@hono/zod-validator';
import { setCookie } from 'hono/cookie';
import { createRoute } from 'honox/factory';
import { z } from 'zod';
import { diMiddleware } from '../../middlewares/_di_middleware';
import { COOKIE_IDENTIFIER } from '../../domain/constants/cookie_identifier';
import { isProd } from '../../core/utils/is_prod';
import { ErrorMessage } from '../../presentation/common/error_message';
import { EntryForm } from '../../presentation/common/entry_form';

const loginSchema = z.object({
    username: z.string().min(1, 'Please Enter User name'),
    password: z.string().min(1, 'Please Enter Password'),
});

export const GET = createRoute((c) => {
    return c.render(
        <EntryForm
            pageName='Login'
            actionPath='/auth/login'
            buttonText='Login'
        ></EntryForm>
    )
});

export const POST = createRoute(
    diMiddleware,
    zValidator('form', loginSchema, (result, c) => {
        if (!result.success) {
            return c.render(
                <ErrorMessage 
                    message="There is an error in your input. Please check again."
                    buttonText='return to login page'
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
                    buttonText='return to login page'
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
                    buttonText='return to login page'
                    e={error}
                    backTo='/auth/login'
                    title='Login Error'
                ></ErrorMessage>
            );
        }
    }
)
