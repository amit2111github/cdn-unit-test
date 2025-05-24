import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";
import { ERROR } from "../constant/error.js";
import path from "path";
import { correctSign, createUser } from "./common.js";
import { makeAllPrerequisiteConnection, truncateAllTables } from "../config/index.js";

const globalUser = {
  name: "some",
  email: "some@gmail.com",
  password: "password",
};
beforeAll(async () => {
  await makeAllPrerequisiteConnection();
  await truncateAllTables();
});
afterAll(async () => {
  await truncateAllTables();
});
describe("retrive video", () => {
  beforeEach(async () => {
    await truncateAllTables();
    await createUser(globalUser);
  });
  it("get all videos", async () => {
    const res = await request(app).get("/video");
    console.log(res.body);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ERROR.UNAUTHORIZED);
  });
  it("should get empty array", async () => {
    const user = await correctSign(globalUser);
    const cookie = user.header["set-cookie"];
    const res = await request(app).get("/video").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success");
    expect(res.body).toHaveProperty("data");
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
describe("/video post", () => {
  beforeAll(async () => {
    await truncateAllTables();
  });
  it("add video without authentication", async () => {
    const res = await request(app)
      .post("/video")
      .attach("video", path.join(__dirname, "assets", "rrr-demo.mp4"));
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.UNAUTHORIZED);
  });
});
