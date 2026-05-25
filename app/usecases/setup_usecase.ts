import { Failure, Result, Success } from "../core/utils/result";
import { UserEntity } from "../domain/entities/user.entity";
import { IDbUsersRepository } from "../domain/repositories/i_db_users_repository";

export class SetupUsecase {
  constructor(private readonly userRepo: IDbUsersRepository) {}

  async execute(username: string, password: string): Promise<Result<void>> {
    const user = await UserEntity.create({
      username: username,
      passwordRaw: password,
      role: "admin",
    });

    const userCreateResult = await this.userRepo.add(user);
    if (!userCreateResult.success) {
      return new Failure(userCreateResult.error);
    }

    return new Success();
  }
}
