import { createMiddleware } from "hono/factory"
import { SqliteUsersRepositoryImpl } from "../infrastructure/repositories/sqlite_users_repository_impl"
import { SetupUsecase } from "../usecases/setup_usecase"
import { CheckInitializeUsecase } from './../usecases/check_initialize_usecase'

type Env = {
    Variables: {
        setupUsecase: SetupUsecase,
        checkInitializeUsecase: CheckInitializeUsecase
    }
}

export const diMiddleware = createMiddleware<Env>(async (c, next) => {
    const userRepo = new SqliteUsersRepositoryImpl();
    const setupUsecase = new SetupUsecase(userRepo);
    const checkInitializeUsecase = new CheckInitializeUsecase(userRepo);

    c.set('setupUsecase', setupUsecase);
    c.set('checkInitializeUsecase', checkInitializeUsecase);

    await next();
})
