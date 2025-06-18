const { DailyQuestion } = require('../../models');
const authUtil = require('../../response/authUtil');

const AddQuestion = async (req, res) => {
	const { content, date } = req.body;

	if (!content || !date) {
		return res.status(400).send(authUtil.successFalse(400, '필수값 누락'));
	}

	try {
		const exists = await DailyQuestion.findOne({ where: { date } });
		if (exists) {
			return res.status(409).send(authUtil.successFalse(409, '이미 존재하는 질문입니다.'));
		}

		const question = await DailyQuestion.create({ content, date });
		return res
			.status(201)
			.send(authUtil.successTrue(201, '질문 추가 완료', question));
	} catch (e) {
		console.error(e);
		return res.status(500).send(authUtil.unknownError({ error: e }));
	}
};

module.exports = AddQuestion;
