import { Database } from 'bun:sqlite'
import { DB_FILE_NAME } from '../../domain/constants/file_names'

const db = new Database(DB_FILE_NAME)

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'user', 'guest')),
        created_at TEXT DEFAULT (datetime('now', 'utc'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        expires_at INTEGER NOT NULL
    );
`)

export { db }
