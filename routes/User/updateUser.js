const { Users } = require('../../models');
const authUtil = require('../../response/authUtil');

const UpdateUser = async (req, res) => {
	const { nickname } = req.body;
	const userId = req.user.dataValues.userId;

	try {
		const user = await Users.findOne({
			where: { userId: req.user.dataValues.userId },
		});

		if (!user) {
			return res.status(403).send(authUtil.jwtSent(403, '유저를 찾을 수 없음'));
		} else {
			await Users.update(
				{
					name: nickname,
				},
				{ where: { userId: userId } }
			);

			return res
				.status(200)
				.send(authUtil.jwtSent(200, '회원정보가 정상적으로 수정되었습니다.'));
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error: error }));
	}
};

module.exports = UpdateUser;
