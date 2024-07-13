const db = require("../models");

exports.findUserByEmail = async (email) => {
    return await db.User.findOne({ where: { email } });
};

exports.createUser = async (newUser) => {
    const user = await db.User.create({
        username: newUser.username,
        email: newUser.email,
        password: newUser.password
    });
    return await user;
};