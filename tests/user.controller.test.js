const request = require('supertest');
const app = require('../index');
const httpStatus = require('../common/error/error.httpStatus');
const userModel = require('../models/user.model');

describe('GET /api/users/me', () => {
  let token;

  beforeEach(async () => {
    userModel._clear(); 

    // 회원가입 → 로그인 → 토큰 저장
    await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'test',
        password: 'test1',
        nickname: 'test2'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'test',
        password: 'test1'
      });

    token = res.body.token;

  });

  test('유효한 토큰으로 내 정보 조회 성공', async () => {

    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.username).toBe('test');
    expect(res.body.roles).toContain('USER');
  });

  test('토큰 없이 요청', async () => {
    const res = await request(app)
      .get('/api/users/me');

    expect(res.status).toBe(httpStatus.TOKEN_NOT_FOUND.status);
    expect(res.body.error.code).toBe(httpStatus.TOKEN_NOT_FOUND.code);
  });

  test('유효하지 않은 토큰 요청', async () => {
    const res = await request(app)
      .get('/api/users/me')
      .set('Authorization', 'Bearer invalid.token.here');

    expect(res.status).toBe(httpStatus.INVALID_TOKEN.status);
    expect(res.body.error.code).toBe(httpStatus.INVALID_TOKEN.code);
  });
});
