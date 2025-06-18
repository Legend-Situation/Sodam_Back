const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware.js');

const AddQuestion = require('./AddQuestion.js');
router.post('/', validateToken, AddQuestion);

const AddAnswer = require('./AddAnswer.js');
router.post('/answer', validateToken, AddAnswer);

const GetAnswer = require('./GetAnswers.js');
router.get('/answer/:groupId', validateToken, GetAnswer);

const GetAnswersByDate = require('./GetAnswersByDate.js');
router.get('/answer/:groupId/:date', validateToken, GetAnswersByDate);

const getGroupAnsweredQuestions = require('./getGroupAnsweredQuestion.js');
router.get(
	'/group/:groupId/questions',
	validateToken,
	getGroupAnsweredQuestions
);

module.exports = router;
