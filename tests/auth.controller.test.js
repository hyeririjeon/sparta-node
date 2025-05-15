const request = require("supertest");
const app = require("../index");
const httpStatus = require("../common/error/error.httpStatus");
const userModel = require('../models/user.model');

describe("User Signup API", () => {
  test("회원가입 실패 - 필수값 없음", async () => {
    const res = await request(app)
      .post("/api/auth/signup") 
      .send({ username: "", password: "", nickname: "" }); 

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
    expect(res.body.error.code).toBe(httpStatus.INVALID_INPUT.code);
    expect(res.body.error.message).toBe(httpStatus.INVALID_INPUT.message);
  });

  test("회원가입 실패 - 중복된 사용자", async () => {
    
    await request(app)
      .post("/api/auth/signup")
      .send({
        username: "testuser",
        password: "password",
        nickname: "nickname",
      });

    
    const res = await request(app)
      .post("/api/auth/signup")
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


describe('User Login API', () => {
  beforeEach(() => {
    userModel._clear();
  });

  test('로그인 성공 - 토큰 발급', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'testpass',
        nickname: 'tester'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpass'
      });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('로그인 실패 - 비밀번호 불일치', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'correctpass',
        nickname: 'tester'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'wrongpass'
      });

    expect(res.status).toBe(httpStatus.INVALID_CREDENTIALS.status);
    expect(res.body.error.code).toBe(httpStatus.INVALID_CREDENTIALS.code);
  });

  test('로그인 실패 - 존재하지 않는 사용자', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'ghost',
        password: 'nope'
      });

    expect(res.status).toBe(httpStatus.INVALID_CREDENTIALS.status);
    expect(res.body.error.code).toBe(httpStatus.INVALID_CREDENTIALS.code);
  });
});