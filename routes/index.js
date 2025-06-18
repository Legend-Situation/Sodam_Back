const express = require('express');
const router = express.Router();

// 로그인 관련 라우터
const authRouter = require('./Auth');
router.use('/auth', authRouter);

// 유저 관련 라우터
const userRouter = require('./User');
router.use('/user', userRouter);

// 그룹 관련 라우터
const groupRouter = require('./Group');
router.use('/group', groupRouter);

// 질문 관련 라우터
const questionRouter = require('./Question');
router.use('/question', questionRouter);

// 메모 관련 라우터
const memoRouter = require('./Memo');
router.use('/memo', memoRouter);

module.exports = router;
