import pool from "../clients/pg.js";

export const insertVideoMetadata = async ({
  id: userId,
  title,
  videoFilePath,
  thumbnailFilePath,
}) => {
  return pool.query(
    `INSERT INTO videos (userid , title , video,thumbnail) values ($1,$2,$3,$4)`,
    [userId, title, videoFilePath, thumbnailFilePath]
  );
};

export const getVideos = async ({ limit = 10, offset = 0 }) => {
  return pool.query(`SELECT * FROM videos limit $1 offset $2 `, [
    Number(limit),
    Number(offset),
  ]);
};

export const getVideoFromVideoId = async ({ videoId }) => {
  if (!videoId) return new Error("Missing video Id");
  return pool.query(`SELECT * FROM videos WHERE id = $1`, [videoId]);
};
