// all routes for users

import vitest, {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";
import request from "supertest";
import app from "../app.js";
import { ERROR } from "../constant/error.js";
import { correctSign, createUser, user } from "./common.js";
import { truncateAllTables } from "../config/index.js";

const globalUser = {
  name: "some1",
  email: "some1@gmail.com",
  password: "password1",
};
beforeAll(async () => {
  await truncateAllTables();
});
afterAll(async () => {
  await truncateAllTables();
});
describe("/signup", () => {
  beforeAll(async () => {
    await truncateAllTables();
  });
  it("missing name", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({
        ...globalUser,
        name: "",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.MISSING_NAME);
  });
  it("wrong email", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({
        ...globalUser,
        email: "somemail.com",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.INVALID_EMAIL);
  });
  it("short password", async () => {
    const res = await request(app)
      .post("/user/signup")
      .send({
        ...globalUser,
        password: "so",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.SHORT_PASSWORD);
  });
  it("creating user", async () => {
    await createUser(globalUser)
  });
});

describe("/signin", () => {
  beforeAll(async () => {
    await truncateAllTables();
    await createUser(globalUser);
  });
  it("email is wrong", async () => {
    const res = await request(app)
      .post("/user/signin")
      .send({
        ...globalUser,
        email: "some",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.INVALID_EMAIL);
  });
  it("wrong password", async () => {
    const res = await request(app)
      .post("/user/signin")
      .send({
        ...globalUser,
        password: "randompassword",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.WRONG_PASSWORD);
  });
  it("short password", async () => {
    const res = await request(app)
      .post("/user/signin")
      .send({
        ...globalUser,
        password: "sh",
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe(ERROR.SHORT_PASSWORD);
  });
  it("true attempt", async () => {
    const res = await correctSign(globalUser);
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success");
    expect(res.header).toHaveProperty("set-cookie");
    expect(res.header["set-cookie"][0].startsWith("token=")).toBe(true);
  });
});

describe("/user/logout endpoint", () => {
  beforeAll(async () => {
    await truncateAllTables();
    await createUser(globalUser);
  });
  it("logout", async () => {
    const res = await correctSign(globalUser);
    const cookie = res.header["set-cookie"];
    const logoutRes = await request(app)
      .post("/user/logout")
      .set("Cookie", cookie);
    expect(logoutRes.statusCode).toBe(200);
    expect(logoutRes.body).toHaveProperty("success");
    const token = logoutRes.header["set-cookie"][0]
      .replaceAll("token=")
      .split(";")[0];
    expect(token).toEqual("undefined");
  });
});

describe("/user get user", () => {
  beforeAll(async () => {
    await truncateAllTables();
    await createUser(globalUser);
  });
  it("Un authorized access", async () => {
    const res = await request(app).get("/user");
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual(ERROR.UNAUTHORIZED);
  });
  it("Authorized access", async () => {
    const user = await correctSign(globalUser);
    const cookie = user.header["set-cookie"];
    const res = await request(app).get("/user").set("Cookie", cookie);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("success");
    expect(res.body).toHaveProperty("data");
  });
});
