import { Result } from "../../core/utils/result";
import { UserEntity } from "../entities/user.entity";

export interface IDbUsersRepository {
    add(user: UserEntity): Promise<Result<void>>
    findById(id: string): Promise<Result<UserEntity>>;
    findByName(usename: string): Promise<Result<UserEntity>>;
    exists(id: string): Promise<Result<boolean>>;
}
