module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        chat_room_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'ChatRooms',
                key: 'id'
            }
        },
        sender_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        receiver_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING(255)
        }
    }, {
        timestamps: true
    });

    Chat.associate = function(models) {
        Chat.belongsTo(models.ChatRoom, {
            foreignKey: 'chat_room_id'
        });
    };
    return Chat;
};