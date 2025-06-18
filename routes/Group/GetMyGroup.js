const { Group, GroupMember, Users } = require('../../models');
const authUtil = require('../../response/authUtil');

const GetMyGroup = async (req, res) => {
	const userId = req.user.dataValues.userId;

	try {
		const myGroupMember = await GroupMember.findOne({
			where: { userId },
		});

		if (!myGroupMember) {
			return res.status(404).send(authUtil.successFalse(404, '가입된 그룹이 없습니다.'));
		}

		const group = await Group.findOne({
			where: { groupId: myGroupMember.groupId },
			include: [
				{
					model: GroupMember,
					as: 'members',
					include: [
						{
							model: Users,
							as: 'user',
							attributes: ['userId', 'name', 'profileImg'],
						},
					],
				},
			],
		});

		if (!group) {
			return res.status(404).send(authUtil.successFalse(404, '그룹을 찾을 수 없습니다.'));
		}

		const memberList = group.members.map(m => ({
			userId: m.user.userId,
			name: m.user.name,
			profileImg: m.user.profileImg,
		}));

		return res.status(200).send(
			authUtil.successTrue(200, '내 그룹 정보 조회 성공', {
				groupId: group.groupId,
				name: group.name,
				startedAt: group.startedAt,
				inviteCode: group.inviteCode,
				members: memberList,
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = GetMyGroup;
