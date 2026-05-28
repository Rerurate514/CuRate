import { UserNotFoundError } from "../../core/exceptions/user_not_found_error";
import { Failure, Result, Success } from "../../core/utils/result";
import { UserEntity } from "../../domain/entities/user.entity";
import { IDbUsersRepository } from "../../domain/repositories/i_db_users_repository";
import { UserRoles } from "../../domain/vo/user_roles";
import { db } from "../db/db";

export class SqliteUsersRepositoryImpl implements IDbUsersRepository {
  async add(user: UserEntity): Promise<Result<void>> {
    const query = db.prepare(`
            INSERT INTO users (id, username, password_hash, role)
            VALUES (?, ?, ?, ?)
        `);

    try {
      await query.run(user.id, user.name, user.passwordHash, user.role);
      return new Success();
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async findById(id: string): Promise<Result<UserEntity>> {
    throw new Error("Method not implemented.");
  }

  async findByName(username: string): Promise<Result<UserEntity>> {
    const query = db.prepare(`
            SELECT 
                id,
                username AS "name",
                password_hash AS "passwordHash",
                role,
                created_at AS "createdAt"
            FROM users
            WHERE name = ?
        `);

    try {
      const record = query.get(username) as {
        id: string;
        name: string;
        passwordHash: string;
        role: UserRoles;
        createdAt: string;
      } | null;

      if (record === null) {
        return new Failure(new UserNotFoundError());
      }

      const user = UserEntity.reconstruct({
        id: record.id,
        name: record.name,
        passwordHash: record.passwordHash,
        role: record.role,
        createdAt: record.createdAt,
      });

      return new Success(user);
    } catch (e: any) {
      return new Failure(e);
    }
  }

  async exists(id: string): Promise<Result<boolean>> {
    throw new Error("Method not implemented.");
  }

  async existsAnyUser(): Promise<Result<boolean>> {
    const query = db.prepare(`
            SELECT EXISTS (SELECT 1 FROM users LIMIT 1) AS "exists"
        `);
    try {
      const result = query.get() as { exists: number };
      return new Success(result.exists === 1);
    } catch (e: any) {
      return new Failure(e);
    }
  }
}
