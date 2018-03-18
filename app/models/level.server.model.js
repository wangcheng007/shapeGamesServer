// 职位表

function LevelModel(sequelize, DataTypes) {
	const Level = sequelize.define('Level', {
		id: {
			type: DataTypes.BIGINT.UNSIGNED,
			primaryKey: true,
			autoIncrement: true,
			comment: 'ID'
        },
        level_name: {
            type: DataTypes.STRING,
			comment: '3: 员工, 2: 主管, 1: 管理员'
        }
	}, {
		freezeTableName: true,
		updatedAt: false,
		charset: 'utf8',
		collate: 'utf8_general_ci'
	});

	return Level;
}

export default LevelModel;