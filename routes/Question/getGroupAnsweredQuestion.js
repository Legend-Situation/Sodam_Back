const { DailyAnswer, DailyQuestion } = require('../../models');
const authUtil = require('../../response/authUtil');
const { Op, Sequelize } = require('sequelize');

const getGroupAnsweredQuestion = async (req, res) => {
	const groupId = parseInt(req.params.groupId, 10);
	const { order = 'desc' } = req.query;

	if (isNaN(groupId)) {
		return res
			.status(400)
			.send(authUtil.successFalse(400, '유효한 groupId가 필요합니다.'));
	}

	try {
		const answers = await DailyAnswer.findAll({
			where: { groupId },
			attributes: [
				[Sequelize.fn('DISTINCT', Sequelize.col('questionId')), 'questionId'],
			],
		});

		const questionIds = answers.map(a => a.getDataValue('questionId'));

		if (questionIds.length === 0) {
			return res
				.status(200)
				.send(authUtil.successTrue(200, '답변된 질문 없음', { questions: [] }));
		}

		const questions = await DailyQuestion.findAll({
			where: { id: { [Op.in]: questionIds } },
			order: [['date', order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC']],
		});

		const response = questions.map(q => ({
			id: q.id,
			date: q.date,
			content: q.content,
		}));

		return res.status(200).send(
			authUtil.successTrue(200, '그룹 질문 목록 조회 성공', {
				count: response.length,
				questions: response,
			})
		);
	} catch (err) {
		console.error(err);
		return res.status(500).send(authUtil.unknownError({ error: err }));
	}
};

module.exports = getGroupAnsweredQuestion;
