module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        timestamps: true
    });

    User.associate = function(models) {
        User.belongsTo(models.auction_reservation, {
            foreignKey: 'seller_id'
        });

        User.belongsTo(models.auction_history, {
            foreignKey: 'seller_id'
        });

        User.belongsTo(models.auction_history, {
            foreignKey: 'bidder_id'
        });
    };

    return User;
}