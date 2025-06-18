const { DailyQuestion, DailyAnswer, Users } = require('../../models');
const authUtil = require('../../response/authUtil');

const GetAnswers = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { groupId } = req.params;
	const today = new Date().toISOString().slice(0, 10);

	if (!groupId) {
		return res.status(400).send(authUtil.successFalse(400, 'groupId는 필수입니다.'));
	}

	try {
		const question = await DailyQuestion.findOne({ where: { date: today } });
		if (!question) {
			return res.status(404).send(authUtil.successFalse(404, '오늘의 질문 없음'));
		}

		const myAnswer = await DailyAnswer.findOne({
			where: { userId, groupId, questionId: question.id },
		});
		if (!myAnswer) {
			return res.status(403).send(authUtil.successFalse(403, '답변 후 열람 가능'));
		}

		const answers = await DailyAnswer.findAll({
			where: { groupId, questionId: question.id },
			include: [
				{
					model: Users,
					as: 'user',
					attributes: ['userId', 'name', 'profileImg'],
				},
			],
		});

		const response = answers.map(a => ({
			userId: a.user.userId,
			name: a.user.name,
			profileImg: a.user.profileImg,
			answer: a.answer,
			weather: a.weather,
			createdAt: a.createdAt,
		}));

		return res.status(200).send(
			authUtil.successTrue(200, '답변 목록 조회 성공', {
				question: question.content,
				answers: response,
			})
		);
	} catch (e) {
		console.error(e);
		return res.status(500).send(authUtil.unknownError({ error: e }));
	}
};

module.exports = GetAnswers;
