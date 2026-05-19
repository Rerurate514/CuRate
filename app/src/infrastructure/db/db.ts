import { Database } from 'bun:sqlite'

const db = new Database("curate.db")

db.run(`
    CREATE TABLE IF NOT EXIST users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password_hash TEXT
    )  
`)

export { db }
