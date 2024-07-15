const db = require("../models");

exports.findUserByEmail = async (email) => {
    return await db.User.findOne({ where: { email } });
};

exports.createUser = async (newUser) => {
    try {
        const user = await db.User.create({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });
        return user;
    } catch (error) {
        throw new Error('사용자 생성에 실패했습니다: ' + error.message);
    }
};