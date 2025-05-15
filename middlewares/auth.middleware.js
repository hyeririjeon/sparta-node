const jwt = require("jsonwebtoken");
const errorResponse = require("../common/error/error.response");
const httpStatus = require("../common/error/error.httpStatus");
const secretKey = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, httpStatus.TOKEN_NOT_FOUND);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return errorResponse(res, httpStatus.TOKEN_EXPIRED);
    }
    return errorResponse(res, httpStatus.INVALID_TOKEN);
  }
};