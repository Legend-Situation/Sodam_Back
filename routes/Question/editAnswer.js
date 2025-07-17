const { DailyAnswer, Point } = require('../../models');
const authUtil = require('../../response/authUtil');

const AddAnswer = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { answerId, groupId, answer, weather } = req.body;

	console.log(answerId, groupId, answer, weather);

	try {
		const existing = await DailyAnswer.findOne({
			where: { userId, groupId, id: answerId },
		});
		if (!existing) {
			return res
				.status(409)
				.send(authUtil.successFalse(409, 'groupId 또는 answerId가 잘못되었습니다.'));
		}

		if (existing.userId !== userId) {
			return res.status(403).send(authUtil.successFalse(403, '수정 권한이 없습니다.'));
		}

		await DailyAnswer.update(
			{
				answer,
				weather,
			},
			{
				where: { userId, groupId, id: answerId },
			}
		);

		return res.status(201).send(authUtil.successTrue(201, '답변 수정 완료'));
	} catch (e) {
		console.error(e);
		return res.status(500).send(authUtil.unknownError({ error: e }));
	}
};

module.exports = AddAnswer;
