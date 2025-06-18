const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const UpdateUser = require('./updateUser.js');
router.put('/', validateToken, UpdateUser);

module.exports = router;
