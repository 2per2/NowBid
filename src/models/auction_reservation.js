module.exports = (sequelize, DataTypes) => {
    const Auction_reservation = sequelize.define('auction_reservation', {
        reservation_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        photo_path: {
            type: DataTypes.STRING(255)
        },
    }, {
        timestamps: true
    });

    Auction_reservation.associate = function(models) {
        Auction_reservation.hasMany(models.user, {
            foreignKey: 'seller_id'
        });

        Auction_reservation.belongsTo(models.auction_history, {
            foreignKey: 'photo_path',
            sourceKey: 'photo_path'
        });
    };

    return Auction_reservation;
}