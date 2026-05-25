import { Result, Success } from "../core/utils/result";
import { IDbSessionRepository } from "../domain/repositories/i_db_session_repository";

export class CheckValidSessionUsecase {
  constructor(private readonly sessionRepo: IDbSessionRepository) {}

  async execute(sessionId: string): Promise<Result<boolean>> {
    const result = await this.sessionRepo.findById(sessionId);
    if (!result.success) return result;
    const value = result.value;
    if (value == null) return new Success(false);
    if (value.expiresAt.isPast()) return new Success(false);
    return new Success(true);
  }
}
