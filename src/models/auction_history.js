module.exports = (sequelize, DataTypes) => {
    const Auction_history = sequelize.define('Auction_history', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true
    });

    Auction_history.associate = function(models) {
        Auction_history.hasMany(models.User, {
            foreignKey: 'seller_id'
        });

        Auction_history.hasMany(models.User, {
            foreignKey: 'bidder_id'
        });

        Auction_history.hasMany(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return Auction_history;
}