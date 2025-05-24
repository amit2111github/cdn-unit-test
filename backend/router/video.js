import express from "express";
import { Authentication } from "../middleware/auth.js";
import { addVideo, getAllVideos, getVideo } from "../controller/video.js";

const router = express.Router();

router.get("/" ,Authentication , getAllVideos);
router.get("/:videoId",Authentication, getVideo);
// router.post("");

router.post("/" , Authentication , addVideo);

export default router;