module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
        timestamps: true
    });

    History.associate = function(models) {
        History.hasMany(models.User, {
            foreignKey: 'seller_id'
        });

        History.hasMany(models.User, {
            foreignKey: 'bidder_id'
        });

        History.hasMany(models.Photo, {
            foreignKey: 'photo_id'
        });
    };

    return History;
}