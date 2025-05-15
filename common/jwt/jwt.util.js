const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

// 토큰 생성
exports.generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};
