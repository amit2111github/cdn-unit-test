import bcrypt from "bcrypt";
import { SECRET_KEY } from "../env.js";
import jwt from "jsonwebtoken";
import { ERROR } from "../constant/error.js";

export const trimUserDetails = (obj) => {
  for (let key in obj) {
    if (typeof obj[key] === "string") obj[key] = obj[key].trim();
  }
};

export const validateUser = ({ email, password, name }) => {
  if (!email) return { error: ERROR.MISSING_EMAIL };
  if (!password) return { error: ERROR.MISSING_PASSWORD };
  if (!name) return { error: ERROR.MISSING_NAME };
  if (!isValidEmail(email)) return { error: ERROR.INVALID_EMAIL };
  if (password.length < 3) {
    return { error: ERROR.SHORT_PASSWORD };
  }
  return {};
};
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const hash = async (text) => {
  if (!text) throw new Error("Empty text can not be hashed");
  const saltRounds = 10;
  const hash = await bcrypt.hash(text, saltRounds);
  return hash;
};

export const verifyPassword = async (plainPassword, hash) => {
  const match = await bcrypt.compare(plainPassword, hash);
  return match;
};

export const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

export const validateJwt = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    console.log("JWT validation failed : ", err);
    return 0;
  }
};
