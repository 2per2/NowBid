module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
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
        title: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.STRING(255)
        },
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: ['reserved', 'ongoing', 'completed', 'cancelled'],
            allowNull: false,
            defaultValue: 'reserved'
        },
        photo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Photos',
                key: 'id'
            }
        },
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