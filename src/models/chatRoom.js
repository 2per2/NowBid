module.exports = (sequelize, DataTypes) => {
    const ChatRoom = sequelize.define('ChatRoom', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user1_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        user2_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    }, {
        timestamps: true
    });

    ChatRoom.associate = function(models) {
        ChatRoom.hasMany(models.Chat, {
            foreignKey: 'chat_room_id'
        });
        ChatRoom.belongsTo(models.User, {
            foreignKey: 'user1_id'
        });
        ChatRoom.belongsTo(models.User, {
            foreignKey: 'user2_id'
        });
    };

    return ChatRoom;
};