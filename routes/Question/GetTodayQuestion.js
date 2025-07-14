const { DailyQuestion, DailyAnswer, Users } = require('../../models');
const authUtil = require('../../response/authUtil');

const GetTodayQuestion = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const today = new Date().toISOString().slice(0, 10);

	try {
		const question = await DailyQuestion.findOne({ where: { date: today } });
		if (!question) {
			return res.status(404).send(authUtil.successFalse(404, '오늘의 질문 없음'));
		}

		return res.status(200).send(
			authUtil.successTrue(200, '오늘 질문', {
				question: question.dataValues,
			})
		);
	} catch (e) {
		console.error(e);
		return res.status(500).send(authUtil.unknownError({ error: e }));
	}
};

module.exports = GetTodayQuestion;
