import {
  getVideoFromVideoId,
  getVideos,
  insertVideoMetadata,
} from "../accessor/video.js";
import { uploadObject } from "../clients/s3.js";
import { getMultimediaUrl } from "../utils/index.js";

export const addVideo = async (req, res) => {
  try {
    const user = req.user;
    const { files: { video, thumbnail } = {}, body: { title } = {} } = req;
    if (!video || !thumbnail || !title) {
      return res
        .status(400)
        .json({ error: "Video, thumbnail, and title are required." });
    }
    const { mimetype: videoMimeType = "" } = video;
    const { mimetype: thumbnailMimeype = "" } = thumbnail;
    if (
      !videoMimeType.startsWith("video/") ||
      !thumbnailMimeype.startsWith("image/")
    ) {
      return res.status(400).send("Invalid file types.");
    }
    const [{ Key: videoFilePath }, { Key: thumbnailFilePath }] =
      await Promise.all([uploadObject(video), uploadObject(thumbnail)]);
    await insertVideoMetadata({
      ...user,
      videoFilePath,
      thumbnailFilePath,
      title,
    });
    return res.status(201).json({ success: "ok" });
  } catch (err) {
    console.log("Error While adding new video", err);
    return res.status(500).json({ error: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const { rows: data } = await getVideos({ limit, offset });
    const keys = [...data.map(({ thumbnail }) => thumbnail)];
    const keyVsSignedUrl = getMultimediaUrl(keys);
    return res.status(200).json({
      success: "ok",
      data: data.map((d) => ({ ...d, thumbnail: keyVsSignedUrl[d.thumbnail] })),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const {
      rows: [video],
    } = await getVideoFromVideoId({ videoId });
    if (!video) return res.status(404).json({ error: "Video Not Found" });
    const keys = [video.thumbnail, video.video];
    const keyVsSignedUrl = getMultimediaUrl(keys);
    return res.status(200).json({
      success: "ok",
      data: {
        ...video,
        thumbnail: keyVsSignedUrl[video.thumbnail],
        video: keyVsSignedUrl[video.video],
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};