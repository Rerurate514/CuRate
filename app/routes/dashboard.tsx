import { createRoute } from "honox/factory"
import Counter from "../islands/counter"

export const GET = createRoute((c) => {
    const name = c.req.query('name') ?? 'Hono'
    return c.render(
        <div class="py-8 text-center">
            <title>{name}</title>
            <h1 class="text-3xl font-bold">Hello, {name}!</h1>
            <Counter />
        </div>
    )
})
