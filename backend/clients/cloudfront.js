import { getSignedUrl } from "aws-cloudfront-sign";
import { CLOUDFRONT_PUBLIC_KEY_ID } from "../env.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKeyPath = path.join(
  __dirname,
  "../",
  "cloudfront-key",
  "private_key.pem"
);

const privateKey = fs.readFileSync(privateKeyPath, "utf8");
const keyPairId = CLOUDFRONT_PUBLIC_KEY_ID;

export const getSignedCloudFrontUrl = (cloudFrontUrl) => {
  const expiryTime = 30 * 1000;
  return getSignedUrl(cloudFrontUrl, {
    keypairId: keyPairId,
    privateKeyString: privateKey,
    expireTime: new Date().getTime() + expiryTime,
  });
};