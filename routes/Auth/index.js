const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware');

// 간편로그인 라우터
const KakaoRouter = require('./KakaoAuth');
router.use('/', KakaoRouter);

module.exports = router;
