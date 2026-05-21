import { PasswordMismatchError } from "../core/exceptions/password_mismatch_error";
import { Failure, Result, Success } from "../core/utils/result";
import { SessionDataEntity } from "../domain/entities/session_data.entity";
import { IDbSessionRepository } from "../domain/repositories/i_db_session_repository";
import { IDbUsersRepository } from "../domain/repositories/i_db_users_repository";
import { ExpiresAt } from "../domain/vo/expires_at";

export class LoginUsecase {
    constructor(
        private readonly userRepo: IDbUsersRepository,
        private readonly sessionRepo: IDbSessionRepository
    ) {}

    async execute(username: string, password: string): Promise<Result<SessionDataEntity>> {
        const userResult = await this.userRepo.findByName(username);

        if(!userResult.success) return new Failure(new UserNotFoundError());

        const isValid = await Bun.password.verify(password, userResult.value!.passwordHash);
        if(!isValid) return new Failure(new PasswordMismatchError());

        const session = SessionDataEntity.create({
            userId: userResult.value!.id,
            expiresAt: ExpiresAt.fromSeconds(EXPIRES_IN_SECONDS)
        });
        const result = await this.sessionRepo.create(session);

        if(!result.success) return new Failure(result.error);
        
        return new Success(session);
    }
}
