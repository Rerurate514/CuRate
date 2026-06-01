import type { Result } from "../core/utils/result";
import type { IDbUsersRepository } from "../domain/repositories/i_db_users_repository";

export class CheckInitializeUsecase {
  constructor(private readonly userRepo: IDbUsersRepository) {}

  async execute(): Promise<Result<boolean>> {
    return await this.userRepo.existsAnyUser();
  }
}
