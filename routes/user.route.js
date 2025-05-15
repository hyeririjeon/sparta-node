const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/me', verifyToken, userController.getMyInfo);

module.exports = router;