const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: 내 정보 조회
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *       401:
 *         description: 인증 실패 (유효하지 않은 토큰, 토큰 없음, 만료된 토큰)
 * 
 */
router.get("/me", verifyToken, userController.getMyInfo);

module.exports = router;
