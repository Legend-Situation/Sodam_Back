module.exports = (sequelize, DataTypes) => {
	const GroupMember = sequelize.define(
		'GroupMember',
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			groupId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			joinedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
			indexes: [
				{
					unique: true,
					fields: ['userId', 'groupId'],
				},
			],
		}
	);

	GroupMember.associate = models => {
		GroupMember.belongsTo(models.Users, {
			foreignKey: 'userId',
			as: 'user',
		});

		GroupMember.belongsTo(models.Group, {
			foreignKey: 'groupId',
			as: 'group',
		});
	};

	return GroupMember;
};
