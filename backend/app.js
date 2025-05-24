import express from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import userRouter from "./router/user.js";
import videoRouter from "./router/video.js";
import { FRONTEND_URL } from "./env.js";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(fileUpload());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));

app.get("/health", (_, res) => {
  res.status(200).json({ staus: "health" });
});

app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
