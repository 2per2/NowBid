'use strict';
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(10),
            defaultValue: 'anonymous'
        },
        email: {
            type: DataTypes.STRING(255),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255)
        },
        google_id: {
            type: DataTypes.STRING(255)
        },
    }, {
        timestamps: true
    });

    User.beforeSave(async (user, options) => {
        if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 10);
        }
    });

    User.prototype.validPassword = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    User.associate = function(models) {
        User.hasMany(models.Reservation, {
            foreignKey: 'seller_id'
        });

        User.hasMany(models.History, {
            foreignKey: 'seller_id'
        });

        User.hasMany(models.History, {
            foreignKey: 'bidder_id'
        });
    };

    return User;
}