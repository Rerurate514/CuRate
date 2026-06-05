import adapter from '@hono/vite-dev-server/bun'
import tailwindcss from '@tailwindcss/vite'
import honox from 'honox/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ mode }) => {
  if (mode === 'client') {
    return {
      plugins: [
        honox({
          devServer: { adapter },
          client: { input: ['/app/client.ts', '/app/style.css'] }
        }),
        tailwindcss(),
      ]
    }
  }

  return {
    build: {
      ssr: true,
      emptyOutDir: false,
      rolldownOptions: {
        input: ['./app/server.ts'],
        external: ['bun', 'fflate'],
      },
      rollupOptions: {
        input: ['./app/server.ts'],
        external: ['bun', 'fflate'],
      }
    },
    plugins: [
      honox({
        devServer: { adapter },
      }),
      tailwindcss(),
    ]
  }
})
