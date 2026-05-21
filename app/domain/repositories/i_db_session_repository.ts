import { SessionData } from "../entities/session_data.entity"

export interface IDbSessionRepository {
    create(session: SessionData): void
    findById(id: string): SessionData| null
    deleteById(id: string): void
    deleteExpired(now: number): void
}
