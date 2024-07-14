const db = require("../models");

exports.findReservationByUser = async (username) => {
    return await db.Reservation.findAll({ where: { username: username }});
};

exports.createReservation = async (newPhoto, newReservation) => {
    try {
        const photo = await db.Photo.create({
            
        });
        const reservation = await db.Reservation.create({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
        });
        return user;
    } catch (error) {
        throw new Error('사용자 생성에 실패했습니다: ' + error.message);
    }
};