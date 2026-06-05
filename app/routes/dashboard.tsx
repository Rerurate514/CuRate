import { createRoute } from "honox/factory";
import { NavCard } from "../presentation/dashboard/nav_card";

export const GET = createRoute((c) => {
  return c.render(
    <div class="p-8">
      <p class="text-sm text-gray-400 mb-1">CuRate</p>
      <h1 class="text-2xl font-medium text-gray-800 mb-6">Dashboard</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <NavCard
          href="/drive"
          label="Drive"
          description="Browse and manage your files"
          icon={
            <svg
              viewBox="0 0 24 24"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
          }
        />
      </div>
    </div>,
  );
});
