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
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Photos',
                key: 'id'
            }
        },
        winning_bid: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0
        }
    }, {
        timestamps: true
    });

    History.associate = function(models) {
        History.belongsTo(models.User, {
            foreignKey: 'seller_id'
        });
        History.belongsTo(models.User, {
            foreignKey: 'bidder_id'
        });
        History.belongsTo(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return History;
}