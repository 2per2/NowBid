module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        bidder_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        photo_id: {
            type: DataTypes.STRING(255),
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
    }, {
        timestamps: true
    });

    History.associate = function(models) {
        History.hasMany(models.User, {
            foreignKey: 'seller_id'
        });

        History.hasMany(models.User, {
            foreignKey: 'bidder_id'
        });

        History.hasMany(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return History;
}