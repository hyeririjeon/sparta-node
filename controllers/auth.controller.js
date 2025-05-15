const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const errorResponse = require("../common/error/error.response");
const httpStatus = require("../common/error/error.httpStatus");
const { generateToken } = require("../common/jwt/jwt.util");

//회원가입
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
        nickname: newUser.nickname,
      },
    });
  } catch (err) {
    console.error("회원가입 중 에러 발생:", err);
    return errorResponse(res, httpStatus.INTERNAL_ERROR);
  }
};

//로그인
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, httpStatus.INVALID_INPUT);
    }

    const user = userModel.findUser(username);
    if (!user) {
      return errorResponse(res, httpStatus.INVALID_CREDENTIALS);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, httpStatus.INVALID_CREDENTIALS);
    }

    const token = generateToken({
      sub: user.id,
      username: user.username,
      roles: user.roles || ["USER"]
    });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("로그인 중 에러 발생:", err);
    return errorResponse(res, httpStatus.INTERNAL_ERROR);
  }
};
