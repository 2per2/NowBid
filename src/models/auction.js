module.exports = (sequelize, DataTypes) => {
    const auction = sequelize.define('Auction', {
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
            allowNull: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        winning_bid: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0
        },
        start_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['reserved', 'ongoing', 'completed', 'cancelled'],
            defaultValue: 'reserved'
        },
    }, {
        timestamps: true
    });

    auction.associate = function(models) {
        auction.belongsTo(models.User, {
            foreignKey: 'seller_id'
        });
        auction.belongsTo(models.User, {
            foreignKey: 'bidder_id'
        });
        auction.hasOne(models.AuctionDetail, {
            foreignKey: 'auction_id',
            as: 'details'
        });
    };

    return auction;
}