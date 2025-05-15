const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

describe('User Model', () => {
  beforeEach(() => {
    userModel._clear(); 
  });

  test('회원가입 성공 테스트', () => {
    const newUser = userModel.createUser('test', 'test', 'test');
    expect(newUser.username).toBe('test');
    expect(userModel.findUser('test').username).toBe('test');
  });

  test('중복 사용자 조회 테스트', () => {
    userModel.createUser('test', 'test', 'test');

    const found = userModel.findUser('test');
    expect(found).toBeTruthy();
  });
  
  test('비밀번호 해싱 테스트', async () => {
    const plainPassword = 'test';

    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    expect(hashedPassword).not.toBe(plainPassword);
    expect(await bcrypt.compare(plainPassword, hashedPassword)).toBe(true);  
  });

});
