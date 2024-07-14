module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        id: {
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
        status: {
            type: DataTypes.ENUM,
            values: ['reserved', 'ongoing', 'completed', 'cancelled'],
            allowNull: false,
            defaultValue: 'reserved'
        }
    }, {
        timestamps: true
    });

    Reservation.associate = function(models) {
        Reservation.hasMany(models.User, {
            foreignKey: 'seller_id'
        });

        Reservation.hasMany(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return Reservation;
}