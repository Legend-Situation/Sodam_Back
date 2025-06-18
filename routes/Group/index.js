const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreateGroup = require('./CreateGroup.js');
router.post('/', validateToken, CreateGroup);

const JoinGroup = require('./JoinGroup.js');
router.post('/join', validateToken, JoinGroup);

const GetMyGroup = require('./GetMyGroup.js');
router.get('/me', validateToken, GetMyGroup);

module.exports = router;
