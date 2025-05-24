import { expect } from "vitest";
import request from "supertest"
import app from "../app.js";

export const correctSign = async (user) => {
  const res = await request(app)
    .post("/user/signin")
    .send({
      ...user,
    });
  return res;
};
export const createUser = async (user) => {
  const res = await request(app)
    .post("/user/signup")
    .send({
      ...user,
    });
  // console.log(res.body);
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty("success");
  expect(res.header).toHaveProperty("set-cookie");
  expect(res.header["set-cookie"][0].startsWith("token=")).toBe(true);
};
