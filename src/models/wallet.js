module.exports = (sequelize, DataTypes) => {
    const Wallet = sequelize.define('Wallet', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        balance: {
            type: DataTypes.DECIMAL(10, 0), // 십진수 자연수
            defaultValue: 0
        },
        gem: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0
        }
    });

    Wallet.associate = function(models) {
        Wallet.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
    }

    return Wallet;
};