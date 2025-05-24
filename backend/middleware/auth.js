import { findUserFromEmail } from "../accessor/user.js";
import { ERROR } from "../constant/error.js";
import { validateJwt } from "../utils/index.js";

export const Authentication = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies["token"]) {
      return res.status(401).json({ error: ERROR.UNAUTHORIZED });
    }
    const token = (cookies || {})["token"];
    const payload = validateJwt(token);
    if (!payload) return res.status(401).json({ error: ERROR.UNAUTHORIZED });
    const user = await findUserFromEmail(payload);
    if (!user) return res.status(401).json({ error: ERROR.UNAUTHORIZED });
    req.user = user;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
