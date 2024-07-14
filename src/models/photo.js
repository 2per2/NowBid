module.exports = (sequelize, DataTypes) => {
    const Photo = sequelize.define('Photo', {
        id: {
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
        Photo.belongsTo(models.Reservation, {
            foreignKey: 'photo_id'
        });

        Photo.belongsTo(models.History, {
            foreignKey: 'photo_id'
        });
    };

    return Photo;
};