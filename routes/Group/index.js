const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const CreateGroup = require('./CreateGroup.js');
router.post('/', validateToken, CreateGroup);

const JoinGroup = require('./JoinGroup.js');
router.post('/join', validateToken, JoinGroup);

const GetMyGroup = require('./GetMyGroup.js');
router.get('/me', validateToken, GetMyGroup);

const GetPetState = require('./GetPetState.js');
router.get('/pet', validateToken, GetPetState);

const GetGroupPoint = require('./GetPoint.js');
router.get('/point', validateToken, GetGroupPoint);

const GrowPet = require('./Growpet.js');
router.post('/grow', validateToken, GrowPet);

module.exports = router;
