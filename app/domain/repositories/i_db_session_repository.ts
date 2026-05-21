import { Result } from "../../core/utils/result"
import { SessionDataEntity } from "../entities/session_data.entity"

export interface IDbSessionRepository {
    create(session: SessionDataEntity): Promise<Result<void>>
    findById(id: string): Promise<Result<SessionDataEntity | null>>
    deleteById(id: string): Promise<Result<void>>
    deleteExpired(now: number): Promise<Result<void>>
}
