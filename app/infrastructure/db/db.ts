import { Database } from 'bun:sqlite'

const db = new Database("curate.db")

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
