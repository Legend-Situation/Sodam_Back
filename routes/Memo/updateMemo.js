const { CalendarMemo, GroupMember } = require('../../models');
const authUtil = require('../../response/authUtil');

const updateMemo = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { id } = req.params;
	const { content } = req.body;

	if (!content) {
		return res.status(400).send(authUtil.successFalse(400, '내용이 없습니다.'));
	}

	try {
		const memo = await CalendarMemo.findByPk(id);
		if (!memo) {
			return res.status(404).send(authUtil.successFalse(404, '메모 없음'));
		}

		const isMember = await GroupMember.findOne({
			where: {
				userId,
				groupId: memo.groupId,
			},
		});

		if (!isMember) {
			return res
				.status(403)
				.send(authUtil.successFalse(403, '수정 권한 없음: 그룹원이 아님'));
		}

		memo.content = content;
		await memo.save();

		return res.status(200).send(authUtil.successTrue(200, '메모 수정 완료'));
	} catch (err) {
		console.error(err);
		return res.status(500).send(authUtil.unknownError({ error: err }));
	}
};

module.exports = updateMemo;
