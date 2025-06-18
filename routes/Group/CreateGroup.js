const { Group, GroupMember, Users } = require('../../models');
const authUtil = require('../../response/authUtil');
const { nanoid } = require('nanoid');

const CreateGroup = async (req, res) => {
	const { name, startedAt } = req.body;
	const userId = req.user.dataValues.userId;

	if (!name || !startedAt) {
		return res.status(400).send(authUtil.successFalse(400, '필수 값이 누락되었습니다.'));
	}

	try {
		const user = await Users.findByPk(userId);
		if (!user) {
			return res
				.status(404)
				.send(authUtil.successFalse(404, '사용자를 찾을 수 없습니다.'));
		}

		const inviteCode = nanoid(8).toUpperCase();

		const group = await Group.create({
			name,
			startedAt,
			inviteCode,
			ownerId: userId,
		});

		await GroupMember.create({
			userId,
			groupId: group.groupId,
		});

		return res.status(201).send(
			authUtil.successTrue(201, '그룹이 정상적으로 생성되었습니다.', {
				groupId: group.groupId,
				inviteCode: group.inviteCode,
				name: group.name,
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = CreateGroup;
