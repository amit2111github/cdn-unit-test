import AWS from "aws-sdk";
import { AWS_REGION } from "../env.js";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: AWS_REGION,
  signatureVersion: 'v4',        
});

export const uploadObject = async (object) => {
  const prefix = object.mimetype.startsWith("video/") ? "videos" : "images";
  const objectName = object.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
  return s3
    .upload({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: `${prefix}/${Date.now()}_${objectName}`,
      Body: object.data,
      ContentType: object.mimetype,
    })
    .promise();
};

export const getSignedUrl = async (keys) => {
  if (!Array.isArray(keys)) keys = [keys];
  const data = await Promise.all(
    keys.map((unsignedUrl) => getPresignedUrl(unsignedUrl))
  );
  const map = {};
  for (let index = 0; index < keys.length; index++) {
    map[keys[index]] = data[index];
  }
  return map;
};
const getPresignedUrl = async (key, expiresIn = 60 * 60 * 2) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    Expires: expiresIn,
  };

  return s3.getSignedUrlPromise("getObject", params);
};
