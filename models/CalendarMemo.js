// models/CalendarMemo.js
module.exports = (sequelize, DataTypes) => {
	const CalendarMemo = sequelize.define(
		'CalendarMemo',
		{
			id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
			groupId: { type: DataTypes.INTEGER, allowNull: false },
			userId: { type: DataTypes.INTEGER, allowNull: false },
			date: { type: DataTypes.DATEONLY, allowNull: false },
			content: { type: DataTypes.TEXT, allowNull: false },
		},
		{
			indexes: [{ unique: true, fields: ['groupId', 'date'] }],
		}
	);

	CalendarMemo.associate = models => {
		CalendarMemo.belongsTo(models.Users, {
			foreignKey: 'userId',
			as: 'author',
		});
		CalendarMemo.belongsTo(models.Group, { foreignKey: 'groupId' });
	};

	return CalendarMemo;
};
