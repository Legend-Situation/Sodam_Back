const { Point } = require('../../models');
const authUtil = require('../../response/authUtil');
const { nanoid } = require('nanoid');

const GetGroupPoint = async (req, res) => {
	const { groupId } = req.query;

	if (!groupId) {
		return res.status(400).send(authUtil.successFalse(400, '필수 값이 누락되었습니다.'));
	}

	try {
		const point = await Point.findOne({
			where: { groupId },
		});

		if (!point) {
			return res
				.status(404)
				.send(authUtil.successFalse(404, '포인트 정보를 찾을 수 없습니다.'));
		}

		return res.status(201).send(
			authUtil.successTrue(201, '포인트 정보를 찾았습니다.', {
				point,
			})
		);
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = GetGroupPoint;
