const { CalendarMemo, GroupMember, Users } = require('../../models');
const authUtil = require('../../response/authUtil');

const createMemo = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { groupId, date, content } = req.body;

	if (!groupId || !date || !content) {
		return res.status(400).send(authUtil.successFalse(400, '모든 필드를 입력하세요.'));
	}

	try {
		const isMember = await GroupMember.findOne({ where: { userId, groupId } });
		if (!isMember) {
			return res.status(403).send(authUtil.successFalse(403, '그룹에 속해있지 않습니다.'));
		}

		const existing = await CalendarMemo.findOne({ where: { groupId, date } });
		if (existing) {
			return res
				.status(409)
				.send(authUtil.successFalse(409, '이미 작성된 메모가 있습니다.'));
		}

		await CalendarMemo.create({ groupId, userId, date, content });

		return res.status(201).send(authUtil.successTrue(201, '메모 작성 완료'));
	} catch (err) {
		console.error(err);
		return res.status(500).send(authUtil.unknownError({ error: err }));
	}
};

module.exports = createMemo;
