import { Database } from 'bun:sqlite'

const db = new Database("curate.db")

db.run(`
    CREATE TABLE IF NOT EXIST users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'user', 'guest')) DEFAULT 'user'
    )  
`)

export { db }
