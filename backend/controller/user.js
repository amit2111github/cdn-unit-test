import { addUser, findUserFromEmail } from "../accessor/user.js";
import { ERROR } from "../constant/error.js";
import {
  generateToken,
  hash,
  trimUserDetails,
  validateUser,
  verifyPassword,
} from "../utils/index.js";

export const createUser = async (req, res) => {
  try {
    trimUserDetails(req.body);
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error });
    const { email, password, name } = req.body;
    const emailExists = await findUserFromEmail({ email });
    if (emailExists) {
      return res.status(409).json({ error: ERROR.EXISTING_EMAIL });
    }
    const hashedPassword = await hash(password);
    await addUser({ email, password: hashedPassword, name });
    const token = generateToken({ email, name });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(201).json({ succes: "ok", data: { email, name } });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const signin = async (req, res) => {
  try {
    trimUserDetails(req.body);
    const { error } = validateUser({ ...req.body, name: "somefakename" });
    if (error) return res.status(400).json({ error });
    const { email, password } = req.body;
    const user = await findUserFromEmail({ email });
    if (!user) {
      return res.status(400).json({ error: ERROR.UNREGISTERDE_EMAIL });
    }
    const validPassword = await verifyPassword(password, user.password_hash);
    if (!validPassword)
      return res.status(400).json({ error: ERROR.WRONG_PASSWORD });
    const token = generateToken({ email: user.email, name: user.name });
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({ success: "ok", data: { email, name: user.name } });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const logout = (_, res) => {
  res.clearCookie("token");
  return res.status(200).json({ success: "ok" });
};
