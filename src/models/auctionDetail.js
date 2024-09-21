module.exports = (sequelize, DataTypes) => {
    const auctionDetail = sequelize.define('AuctionDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        auction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Auctions',
                key: 'id'
            }
        },
        title: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.STRING(255)
        },
    }, {
        timestamps: true
    });

    auctionDetail.associate = function(models) {
        auctionDetail.belongsTo(models.Auction, {
            foreignKey: 'auction_id',
            as: 'auction'
        });
    };

    return auctionDetail;
}