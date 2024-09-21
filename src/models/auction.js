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
            defaultValue: 0,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        winning_bid: {
            type: DataTypes.DECIMAL(10, 0),
            defaultValue: 0
        },
        title: {
            type: DataTypes.STRING(255),
        },
        description: {
            type: DataTypes.STRING(255)
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
        photo_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Photos',
                key: 'id'
            }
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
        auction.belongsTo(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return auction;
}