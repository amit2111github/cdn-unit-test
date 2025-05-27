import { configDotenv } from "dotenv";
configDotenv();

export const PORT = process.env.PORT;
export const POSTGRES_HOST = process.env.POSTGRES_HOST;
export const POSTGRES_PORT = process.env.POSTGRES_PORT;
export const POSTGRES_MAIN_DB = process.env.POSTGRES_MAIN_DB;
export const POSTGRES_USER = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
export const POSTGRES_TEST_DB = process.env.POSTGRES_TEST_DB;
export const SECRET_KEY = process.env.SECRET_KEY;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;
export const AWS_REGION = process.env.AWS_REGION;
export const FRONTEND_URL = process.env.FRONTEND_URL;
export const ENV = process.env.ENV;
export const CLOUDFRONT_URL = process.env.CLOUDFRONT_URL;
export const CLOUDFRONT_PUBLIC_KEY_ID = process.env.CLOUDFRONT_PUBLIC_KEY_ID;
