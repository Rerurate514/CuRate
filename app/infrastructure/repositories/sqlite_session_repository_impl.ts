import { IDbSessionRepository } from "../../domain/repositories/i_db_session_repository"
import { SessionDataEntity } from "../../domain/entities/session_data.entity"
import { db } from "../db/db"
import { Failure, Result, Success } from "../../core/utils/result"
import { SessionNotFoundError } from "../../core/exceptions/session_not_found_error";

export class SqliteSessionRepositoryImpl implements IDbSessionRepository {
    async create(session: SessionDataEntity): Promise<Result<void>> {
        const query = db.prepare(`
            INSERT INTO 
            sessions (id, user_id, expires_at) 
            VALUES (?, ?, ?)
        `);

        const expiresUnix = session.expiresAt.toUnix();
        try {
            await query.run(session.id, session.userId, expiresUnix);
            return new Success();
        } catch (e: any) {
            return new Failure(e);
        }
    }

    async findById(id: string): Promise<Result<SessionDataEntity | null>> {
        const query = db.prepare(`
            SELECT 
                id, 
                user_id AS userId, 
                expires_at AS expiresAt 
            FROM sessions 
            WHERE id = ?
        `);

        try {
            const record = query.get(id) as {
                id: string,
                userId: string,
                expiresAt: number
            } | null;

            if (record === null) {
                return new Failure(new SessionNotFoundError());
            }

            const session = SessionDataEntity.reconstruct({
                id: record.id,
                userId: record.userId,
                expiresAt: record.expiresAt
            });

            return new Success(session);
        } catch (e: any) {
            return new Failure(e);
        }
    }

    async deleteById(id: string): Promise<Result<void>> {
        const query = db.prepare(`
            DELETE 
            FROM sessions 
            WHERE id = ?
        `);
        
        try {
            await query.run(id);
            return new Success();
        } catch (e: any) {
            return new Failure(e);
        }
    }

    async deleteExpired(now: number): Promise<Result<void>> {
        const query = db.prepare(`
            DELETE
            FROM sessions
            WHERE expires_at < ?
        `);
            
        try {
            await query.run(now);
            return new Success();
        } catch (e: any) {
            return new Failure(e);
        }
    }
}
