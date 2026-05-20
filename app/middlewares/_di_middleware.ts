import { createMiddleware } from "hono/factory"
import { SqliteUsersRepositoryImpl } from "../infrastructure/repositories/sqlite_users_repository_impl"
import { SetupUsecase } from "../usecases/setup_usecase"
import { CheckInitializeUsecase } from '../usecases/check_initialize_usecase'
import { LoginUsecase } from "../usecases/login_usecase"

export type DiEnv = {
    Variables: {
        setupUsecase: SetupUsecase,
        checkInitializeUsecase: CheckInitializeUsecase,
        loginUsecase: LoginUsecase
    }
}

const userRepo = new SqliteUsersRepositoryImpl();
const setupUsecase = new SetupUsecase(userRepo);
const checkInitializeUsecase = new CheckInitializeUsecase(userRepo);
const loginUsecase = new LoginUsecase(userRepo);

export const diMiddleware = createMiddleware<DiEnv>(async (c, next) => {
    c.set('setupUsecase', setupUsecase);
    c.set('checkInitializeUsecase', checkInitializeUsecase);
    c.set('loginUsecase', loginUsecase);

    await next();
})
