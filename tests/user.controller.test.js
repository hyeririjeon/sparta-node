const request = require("supertest");
const app = require("../index");
const httpStatus = require("../common/error/error.httpStatus");

describe("User Signup API", () => {
  test("회원가입 실패 - 필수값 없음", async () => {
    const res = await request(app)
      .post("/api/users/signup") 
      .send({ username: "", password: "", nickname: "" }); 

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(httpStatus.INVALID_INPUT.code);
    expect(res.body.error.message).toBe(httpStatus.INVALID_INPUT.message);
  });

  test("회원가입 실패 - 중복된 사용자", async () => {
    
    await request(app)
      .post("/api/users/signup")
      .send({
        username: "testuser",
        password: "password",
        nickname: "nickname",
      });

    
    const res = await request(app)
      .post("/api/users/signup")
      .send({
        username: "testuser",
        password: "password",
        nickname: "nickname",
      });

    expect(res.status).toBe(409);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(httpStatus.USER_ALREADY_EXISTS.code);
    expect(res.body.error.message).toBe(httpStatus.USER_ALREADY_EXISTS.message);
  });
});
