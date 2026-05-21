import { createRoute } from "honox/factory"
import { NavCard } from "../presentation/dashboard/nav_card"

export const GET = createRoute((c) => {
    return c.render(
        <div class="p-8">
            <p class="text-sm text-gray-400 mb-1">CuRate</p>
            <h1 class="text-2xl font-medium text-gray-800 mb-6">Dashboard</h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <NavCard href="/drive" label="Drive" description="Browse and manage your files" icon="ti-folder" />
            </div>
        </div>
    )
})
