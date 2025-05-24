import pool from "../clients/pg.js";

export const findUserFromEmail = async ({ email }) => {
  if(!email) throw new Error("missing email");
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
};

export const addUser = async ({ email, name, password }) => {
  return await pool.query(
    `INSERT INTO users (name , email , password_hash) values ($1,$2,$3)`,
    [name, email, password]
  );
};
