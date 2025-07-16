const { DailyQuestion, DailyAnswer, Point } = require('../../models');
const authUtil = require('../../response/authUtil');

const AddAnswer = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { groupId, answer, weather } = req.body;
	const today = new Date().toISOString().slice(0, 10);

	try {
		const question = await DailyQuestion.findOne({ where: { date: today } });
		if (!question) {
			return res.status(404).send(authUtil.successFalse(404, '오늘의 질문 없음'));
		}

		const existing = await DailyAnswer.findOne({
			where: { userId, groupId, questionId: question.id },
		});
		if (existing) {
			return res.status(409).send(authUtil.successFalse(409, '이미 답변했습니다.'));
		}

		const groupTotalPoint = Point.findOne({
			where: { groupId },
		});

		if (!groupTotalPoint) {
			Point.create({
				groupId,
			});

			Point.update({ totalPoints: 10 }, { where: { groupId } });
		} else {
			Point.increment({ totalPoints: 10 }, { where: { groupId } });
		}

		const incrementGroupTotalPoint = Point.findOne({
			where: { groupId },
		});

		await DailyAnswer.create({
			userId,
			groupId,
			questionId: question.id,
			answer,
			weather,
		});

		return res.status(201).send(authUtil.successTrue(201, '답변 저장 완료'));
	} catch (e) {
		console.error(e);
		return res.status(500).send(authUtil.unknownError({ error: e }));
	}
};

module.exports = AddAnswer;
