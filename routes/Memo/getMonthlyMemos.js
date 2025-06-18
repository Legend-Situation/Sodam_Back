const { CalendarMemo, Users, GroupMember } = require('../../models');
const authUtil = require('../../response/authUtil');
const { Op } = require('sequelize');

const getMonthlyMemos = async (req, res) => {
	const userId = req.user.dataValues.userId;
	const { groupId, month } = req.params; // month: '2025-06'

	if (!groupId || !month) {
		return res
			.status(400)
			.send(authUtil.successFalse(400, 'groupId와 month는 필수입니다.'));
	}

	// 날짜 범위 계산: 2025-06-01 ~ 2025-06-30
	const startDate = `${month}-01`;
	const endDate = new Date(month + '-01');
	endDate.setMonth(endDate.getMonth() + 1);
	const endDateStr = endDate.toISOString().slice(0, 10); // 다음달 1일

	try {
		// 그룹 소속 여부 확인
		const isMember = await GroupMember.findOne({ where: { userId, groupId } });
		if (!isMember) {
			return res.status(403).send(authUtil.successFalse(403, '그룹에 속해있지 않습니다.'));
		}

		// 메모 전체 조회
		const memos = await CalendarMemo.findAll({
			where: {
				groupId,
				date: {
					[Op.gte]: startDate,
					[Op.lt]: endDateStr, // 다음 달 1일 미만
				},
			},
			include: [
				{
					model: Users,
					as: 'author',
					attributes: ['userId', 'name', 'profileImg'],
				},
			],
			order: [['date', 'ASC']],
		});

		const response = memos.map(memo => ({
			id: memo.id,
			date: memo.date,
			content: memo.content,
			author: memo.author,
			createdAt: memo.createdAt,
			updatedAt: memo.updatedAt,
		}));

		return res.status(200).send(
			authUtil.successTrue(200, '월별 메모 조회 성공', {
				month,
				memos: response,
			})
		);
	} catch (err) {
		console.error(err);
		return res.status(500).send(authUtil.unknownError({ error: err }));
	}
};

module.exports = getMonthlyMemos;
