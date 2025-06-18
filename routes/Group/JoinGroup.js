const { Group, GroupMember } = require('../../models');
const authUtil = require('../../response/authUtil');

const JoinGroup = async (req, res) => {
	const { inviteCode } = req.body;
	const userId = req.user.dataValues.userId;

	if (!inviteCode) {
		return res.status(400).send(authUtil.successFalse(400, '초대 코드가 누락되었습니다.'));
	}

	try {
		const group = await Group.findOne({ where: { inviteCode } });

		if (!group) {
			return res
				.status(404)
				.send(authUtil.successFalse(404, '유효하지 않은 초대 코드입니다.'));
		}

		// 이미 참여한 경우 중복 방지
		const existing = await GroupMember.findOne({
			where: { userId, groupId: group.groupId },
		});

		if (existing) {
			return res.status(409).send(authUtil.successFalse(409, '이미 참여한 그룹입니다.'));
		}

		// 그룹 참여
		await GroupMember.create({
			userId,
			groupId: group.groupId,
		});

		return res.status(200).send(
			authUtil.successTrue(200, '그룹에 성공적으로 참여했습니다.', {
				groupId: group.groupId,
				groupName: group.name,
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = JoinGroup;
