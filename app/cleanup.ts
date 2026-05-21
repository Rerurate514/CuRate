import { SESSION_CLEANUP_INTERVAL } from "./domain/constants/session_cleanup_interval"
import { IDbSessionRepository } from "./domain/repositories/i_db_session_repository"

export function startSessionCleanup(sessionRepo: IDbSessionRepository) {
    const run = async () => {
        const result = await sessionRepo.deleteExpired(Date.now())
        
        if (!result.success) {
            console.error('[SessionCleanup] Failed to delete expired sessions:', result.error)
        }
    }

    run()

    const interval = setInterval(run, SESSION_CLEANUP_INTERVAL)

    process.on('SIGTERM', () => clearInterval(interval))
    process.on('SIGINT', () => clearInterval(interval))
}
