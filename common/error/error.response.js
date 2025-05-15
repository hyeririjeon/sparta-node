module.exports = (res, errorType) => {
  return res.status(errorType.status).json({
    error: {
      code: errorType.code,
      message: errorType.message,
    },
  });
};