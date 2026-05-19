import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import z from "zod";

const setupSchema = z.object({
    username: z.string().min(1, 'Please Enter User name'),
    password: z.string().min(1, 'Please Enter Password'),
});

export const GET = createRoute((c) => {
    return c.render(
        <div class="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6">
            <h1 class="text-2xl font-bold text-gray-800 mb-2">CuRate - Setup</h1>
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
                    Create User
                </button>
            </form>
        </div>
    )
})

export const POST = createRoute(
    zValidator('form', setupSchema, (result, c) => {
if (!result.success) {
            return c.render(
                <div class="flex flex-col justify-center min-h-screen max-w-md mx-auto px-6 text-center">

                    <div class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6 shadow-sm">
                        <div class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-100 text-red-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                        </div>

                        <h2 class="text-lg font-bold text-red-800 mb-1">Setup Error</h2>
                        <p class="text-sm text-red-600">There is an error in your input. Please check again.</p>
                    </div>

                    <a href="/auth/login" class="inline-block bg-gray-800 rounded-lg w-full py-2.5 text-white font-semibold hover:bg-gray-700 transition-colors shadow-sm">
                        return to setup page
                    </a>

                </div>
            );
        }
    }),
    async (c) => {
        const {
            username,
            password
        } = c.req.valid('form');

        //await setupUsecase.execute({ username, password });
    }
);
