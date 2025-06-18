module.exports = (sequelize, DataTypes) => {
	const DailyAnswer = sequelize.define('DailyAnswer', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		userId: { type: DataTypes.INTEGER, allowNull: false },
		groupId: { type: DataTypes.INTEGER, allowNull: false },
		questionId: { type: DataTypes.INTEGER, allowNull: false },
		answer: { type: DataTypes.TEXT, allowNull: false },
		weather: { type: DataTypes.ENUM('맑음', '흐림', '비', '눈'), allowNull: false },
	});

	DailyAnswer.associate = models => {
		DailyAnswer.belongsTo(models.Users, {
			foreignKey: 'userId',
			as: 'user',
		});

		DailyAnswer.belongsTo(models.DailyQuestion, {
			foreignKey: 'questionId',
			as: 'question',
		});
	};

	return DailyAnswer;
};
