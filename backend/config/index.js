import pool from "../clients/pg.js";
import { ENV, POSTGRES_HOST } from "../env.js";

const clearData = async () => {
  try {
    await pool.query(`delete from videos`);
    await pool.query(`delete from users`);
  } catch (err) {
    console.log(err);
  }
};
const initalizeTables = async () => {
  // has dependent (videos)
  console.log(POSTGRES_HOST,ENV)
  await pool.query(
    `CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          name TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`
  );
  return Promise.all([
    pool.query(
      `CREATE TABLE IF NOT EXISTS videos (
            id SERIAL PRIMARY KEY,
            userid INTEGER REFERENCES users(id),
            title TEXT NOT NULL,
            video TEXT NOT NULL,
            thumbnail TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`
    ),
  ]);
};
export const makeAllPrerequisiteConnection = async () => {
  return Promise.all([initalizeTables()]);
};

export const truncateAllTables = async () => {
  if (ENV === "test") {
    return clearData();
  }
};
