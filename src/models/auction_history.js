module.exports = (sequelize, DataTypes) => {
    const Auction_history = sequelize.define('auction_history', {
        history_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true
    });

    Auction_history.associate = function(models) {
        Auction_history.hasMany(models.user, {
            foreignKey: 'seller_id'
        });

        Auction_history.hasMany(models.user, {
            foreignKey: 'bidder_id'
        });

        Auction_history.hasMany(models.photo, {
            foreignKey: 'photo_id'
        });
    };

    return Auction_history;
}