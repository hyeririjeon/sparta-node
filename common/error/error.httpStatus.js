module.exports = {
  INVALID_INPUT: {
    status: 400,
    code: "INVALID_INPUT",
    message: "입력값이 올바르지 않습니다.",
  },
  USER_ALREADY_EXISTS: {
    status: 409,
    code: "USER_ALREADY_EXISTS",
    message: "이미 가입된 사용자입니다.",
  },
  INTERNAL_ERROR: {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "서버 내부 오류가 발생했습니다.",
  },
  INVALID_CREDENTIALS: {
    status: 401,
    code: "INVALID_CREDENTIALS",
    message: "아이디 또는 비밀번호가 올바르지 않습니다.",
  },
  TOKEN_EXPIRED: {
    status: 401,
    code: "TOKEN_EXPIRED",
    message: "토큰이 만료되었습니다.",
  },
  TOKEN_NOT_FOUND: {
    status: 401,
    code: "TOKEN_NOT_FOUND",
    message: "토큰이 없습니다.",
  },
  INVALID_TOKEN: {
    status: 401,
    code: "INVALID_TOKEN",
    message: "토큰이 유효하지 않습니다.",
  }
};
