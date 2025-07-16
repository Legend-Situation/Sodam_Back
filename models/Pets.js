module.exports = (sequelize, DataTypes) => {
	const Pets = sequelize.define(
		'Pets',
		{
			petId: {
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
			level: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			exp: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 100,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Pets.associate = models => {
		Pets.belongsTo(models.Group, {
			foreignKey: 'groupId',
			as: 'group',
		});
	};

	return Pets;
};
