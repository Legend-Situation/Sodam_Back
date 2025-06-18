module.exports = (sequelize, DataTypes) => {
	const DailyQuestion = sequelize.define('DailyQuestion', {
		id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
		content: { type: DataTypes.TEXT, allowNull: false },
		date: { type: DataTypes.DATEONLY, allowNull: false, unique: true },
	});
	return DailyQuestion;
};
