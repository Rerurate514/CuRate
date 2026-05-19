import { Failure, Result, Success } from "../../core/utils/result";
import { UserEntity } from "../../domain/entities/user.entity";
import { IDbUsersRepository } from "../../domain/repositories/i_db_users_repository";
import { db } from "../db/db";

export class SqliteUsersRepositoryImpl implements IDbUsersRepository {
    async add(user: UserEntity): Promise<Result<void>> {
        const query = db.prepare(`
            INSERT INTO users (id, username, password_hash, role)
            VALUE (?, ?, ?, ?)
        `);
        
        try {
            query.run(user.id, user.name, user.passwordHash, user.role);
            return new Success();
        } catch(e: any) {
            return new Failure(e);
        }
    }

    async findById(id: string): Promise<Result<UserEntity>> {
        throw new Error("Method not implemented.");
    }

    async findByName(usename: string): Promise<Result<UserEntity>> {
        throw new Error("Method not implemented.");
    }

    async exists(id: string): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
}
