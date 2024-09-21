module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        auction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Auction',
                key: 'id'
            }
        },
        bidder_id: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            references: {
                model: 'Users',
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
        History.belongsTo(models.Auction, {
            foreignKey: 'auction_id'
        });
        History.belongsTo(models.User, {
            foreignKey: 'bidder_id'
        });
    };

    return History;
}