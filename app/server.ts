import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import { startSessionCleanup } from "./cleanup";
import { SqliteSessionRepositoryImpl } from "./infrastructure/repositories/sqlite_session_repository_impl";

const app = createApp();

showRoutes(app);
startSessionCleanup(new SqliteSessionRepositoryImpl());

export default app;
