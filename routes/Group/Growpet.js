const { Point, Pets } = require('../../models');
const authUtil = require('../../response/authUtil');

const GrowPet = async (req, res) => {
	const { groupId } = req.body;

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

		const pet = await Pets.findOne({
			where: { groupId },
		});
		if (!pet) {
			return res.status(404).send(authUtil.successFalse(404, '펫을 찾을 수 없습니다.'));
		}

		console.log(point.dataValues.totalPoints);

		if (point.dataValues.totalPoints >= 10) {
			await Point.decrement({ totalPoints: 10 }, { where: { groupId } });

			const newExp = pet.exp + 10;
			let newLevel = pet.level;
			let finalExp = newExp;

			if (newExp >= 100) {
				newLevel = pet.level + Math.floor(newExp / 100);
				finalExp = newExp % 100;
			}

			await Pets.update(
				{
					exp: finalExp,
					level: newLevel,
				},
				{ where: { groupId } }
			);

			const updatedPet = await Pets.findOne({ where: { groupId } });
			const updatedPoint = await Point.findOne({ where: { groupId } });

			return res.status(200).send(
				authUtil.successTrue(200, '펫이 성장했습니다!', {
					pet: updatedPet,
					point: updatedPoint,
					levelUp: newLevel > pet.level,
				})
			);
		} else {
			return res
				.status(400)
				.send(authUtil.successFalse(400, '포인트가 부족합니다. (필요: 10포인트)'));
		}
	} catch (error) {
		console.error(error);
		return res.status(500).send(authUtil.unknownError({ error }));
	}
};

module.exports = GrowPet;
