exports.getMyInfo = (req, res) => {
  const user = req.user;

  return res.status(200).json({
    username: user.username,
    roles: user.roles
  });
};