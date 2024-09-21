module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        path: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
    }, {
        timestamps: true
    });

    Photo.associate = function(models) {
        Photo.hasOne(models.AuctionDetail, {
            foreignKey: 'photo_id',
            as: 'auction detail'
        });
    };

    return Photo;
};