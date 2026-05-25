import { Result } from "../core/utils/result";
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

    return await this.userRepo.add(user);
  }
}
