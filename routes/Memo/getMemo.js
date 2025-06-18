const { CalendarMemo, Users, GroupMember } = require('../../models');
const authUtil = require('../../response/authUtil');

const getMemo = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { groupId, date } = req.params;

	if (!groupId || !date) {
		return res
			.status(400)
			.send(authUtil.successFalse(400, 'groupId와 date는 필수입니다.'));
	}

	try {
		const isMember = await GroupMember.findOne({ where: { userId, groupId } });
		if (!isMember) {
			return res.status(403).send(authUtil.successFalse(403, '그룹에 속해있지 않습니다.'));
		}

		const memo = await CalendarMemo.findOne({
			where: { groupId, date },
			include: [
				{
					model: Users,
					as: 'author',
					attributes: ['userId', 'name', 'profileImg'],
				},
			],
		});

		if (!memo) {
			return res
				.status(200)
				.send(authUtil.successTrue(200, '메모 없음', { content: null }));
		}

		return res.status(200).send(
			authUtil.successTrue(200, '메모 조회 성공', {
				id: memo.id,
				author: memo.author,
				content: memo.content,
				date: memo.date,
				createdAt: memo.createdAt,
				updatedAt: memo.updatedAt,
			})
		);
	} catch (err) {
		console.error(err);
		return res.status(500).send(authUtil.unknownError({ error: err }));
	}
};

module.exports = getMemo;
