const { Group, GroupMember, Users, Pets } = require('../../models');
const authUtil = require('../../response/authUtil');

const GetPetState = async (req, res) => {
	const { groupId } = req.query;

	if (!groupId) {
		return res.status(400).send(authUtil.successFalse(400, '필수 값이 누락되었습니다.'));
	}

	try {
		const pet = await Pets.findOne({
			where: { groupId },
		});

		if (!pet) {
			return res.status(404).send(authUtil.successFalse(404, '펫을 찾을 수 없습니다.'));
		}

		return res.status(201).send(
			authUtil.successTrue(201, '펫 정보를 찾았습니다.', {
				pet,
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = GetPetState;
