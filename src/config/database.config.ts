import Database from "better-sqlite3";

const DB_PATH = "../database/foxerbase.sqlite";
let db: Database.Database;

const connectDB = () => {
  db = new Database(DB_PATH);

  db.exec(`
    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      tags TEXT NOT NULL
    );
  `);

  console.log("📦 SQLite DB initialized at:", DB_PATH);
};

export { connectDB, db };
