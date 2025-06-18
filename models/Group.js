module.exports = (sequelize, DataTypes) => {
	const Group = sequelize.define(
		'Group',
		{
			groupId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(20),
				allowNull: false,
			},
			startedAt: {
				type: DataTypes.DATEONLY,
				allowNull: false,
			},
			inviteCode: {
				type: DataTypes.STRING(10),
				allowNull: false,
				unique: true,
			},
			ownerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			paranoid: true,
			charset: 'utf8',
			collate: 'utf8_general_ci',
		}
	);

	Group.associate = models => {
		Group.belongsTo(models.Users, {
			foreignKey: 'ownerId',
			as: 'owner',
		});

		Group.hasMany(models.GroupMember, {
			foreignKey: 'groupId',
			as: 'members',
			onDelete: 'CASCADE',
		});
	};

	return Group;
};
