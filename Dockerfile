FROM oven/bun:latest AS base
WORKDIR /app

FROM base AS WaitDeps
COPY package.json bun.lockb* ./
RUN bun install --production

FROM base AS build
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run setup && bun run build

FROM oven/bun:distroless AS runner
WORKDIR /app
COPY --from=WaitDeps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./.env
COPY package.json ./

EXPOSE 3000
CMD ["bun", "run", "dist/server.mjs"]
