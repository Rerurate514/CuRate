import { Failure, Result, Success } from "../core/utils/result";
import { UserEntity } from "../domain/entities/user.entity";
import { IDbUsersRepository } from "../domain/repositories/i_db_users_repository";
import { IEnvConfigRepository } from "../domain/repositories/i_env_config_repository";

export class SetupUsecase {
  constructor(
    private readonly userRepo: IDbUsersRepository,
    private readonly envRepo: IEnvConfigRepository
  ) {}

  async execute(username: string, password: string): Promise<Result<void>> {
    const user = await UserEntity.create({
      username: username,
      passwordRaw: password,
      role: "admin",
    });

    const userCreateResult = await this.userRepo.add(user);
    if(!userCreateResult.success) {
      return new Failure(userCreateResult.error);
    }

    const resolveEnvResult = this.envRepo.resolveDrivePath();
    if(!resolveEnvResult.success) {
      return new Failure(resolveEnvResult.error);
    }

    return new Success();
  }
}
