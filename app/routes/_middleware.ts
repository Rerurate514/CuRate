import { authMiddleware } from "../middlewares/_auth_middleware";
import { diMiddleware } from "../middlewares/_di_middleware";
import { setupMiddleware } from "../middlewares/_setup_middleware";

export default [
    diMiddleware,
    setupMiddleware,
    authMiddleware
]
