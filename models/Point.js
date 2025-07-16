module.exports = (sequelize, DataTypes) => {
	const Point = sequelize.define(
		'Point',
		{
			pointId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Groups',
					key: 'groupId',
				},
			},
			totalPoints: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Point.associate = models => {
		Point.belongsTo(models.Group, {
			foreignKey: 'groupId',
			as: 'group',
		});
	};

	return Point;
};
