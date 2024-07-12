module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        photo_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        photo_path: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        timestamps: true
    });

    Photo.associate = function(models) {
        Photo.belongsTo(models.Auction_reservation, {
            foreignKey: 'photo_id'
        });

        Photo.belongsTo(models.Auction_history, {
            foreignKey: 'photo_id'
        });
    };

    return Photo;
};