const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const errorResponse = require('../common/error/error.response');
const httpStatus = require('../common/error/error.httpStatus');

exports.signup = async (req, res) => {
  try {
    const { username, password, nickname } = req.body;

    if (!username || !password || !nickname) {
      return errorResponse(res, httpStatus.INVALID_INPUT);
    }

    const exists = userModel.findUser(username);
    if (exists) {
      return errorResponse(res, httpStatus.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userModel.createUser(username, hashedPassword, nickname);

    return res.status(201).json({
      user: {
        username: newUser.username,
        nickname: newUser.nickname
      }
    });
  } catch (err) {
    console.error('회원가입 중 에러 발생:', err); 
    return errorResponse(res, httpStatus.INTERNAL_ERROR);
  }
};