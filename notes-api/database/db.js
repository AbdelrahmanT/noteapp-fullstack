import sqlite3 from 'sqlite3'
import {open} from 'sqlite'

export async function getDBConnection(){
    const db = await open({
        filename: "./database/database.db",
        driver: sqlite3.Database
    })


    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL
        )
        `
    )

    await db.exec(
        `
        CREATE TABLE IF NOT EXISTS notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT ,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        user_ID INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
        )
        `
    )

    return db
}

