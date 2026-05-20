import { Database } from 'bun:sqlite'
import { dbFileName } from '../../domain/constants/file_names'

const db = new Database(dbFileName)

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'user', 'guest')),
        created_at TEXT DEFAULT (datetime('now', 'utc'))
    );
`)

export { db }
