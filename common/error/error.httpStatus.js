module.exports = {
  USER_ALREADY_EXISTS: {
    status: 409,
    code: "USER_ALREADY_EXISTS",
    message: "이미 가입된 사용자입니다.",
  },
  INVALID_INPUT: {
    status: 400,
    code: "INVALID_INPUT",
    message: "입력값이 올바르지 않습니다.",
  },
  INTERNAL_ERROR: {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "서버 내부 오류가 발생했습니다.",
  },
};
