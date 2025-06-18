const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const createMemo = require('./createMemo.js');
router.post('/', validateToken, createMemo);

const getMemo = require('./getMemo.js');
router.get('/:groupId/:date', validateToken, getMemo);

const updateMemo = require('./updateMemo.js');
router.patch('/:id', validateToken, updateMemo);

const getMonthlyMemos = require('./getMonthlyMemos.js');
router.get('/:groupId/month/:month', validateToken, getMonthlyMemos);

module.exports = router;
