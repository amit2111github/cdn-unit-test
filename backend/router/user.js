import express from "express";
import { createUser, logout, signin } from "../controller/user.js";
import { Authentication } from "../middleware/auth.js";

const router = express.Router();

router.get("/", Authentication, (req, res) => {
  const { name, email } = req.user;
  return res.status(200).json({ success: "ok", data: { name, email } });
});

router.post("/signup", createUser);
router.post("/signin", signin);
router.post("/logout", logout);

export default router;
