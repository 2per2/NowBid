const db = require("../models");

exports.findReservationByUser = async (username) => {
    return await db.Reservation.findAll({ where: { username: username }});
};

exports.createReservation = async (newPhoto, currentUser, newReservation) => {
    try {
        const photo = await db.Photo.create({
            path: newPhoto.path
        });
        const reservation = await db.Reservation.create({
            seller_id: currentUser.id,
            title: newReservation.title,
            password: newUser.password
        });
        return user;
    } catch (error) {
        throw new Error('사용자 생성에 실패했습니다: ' + error.message);
    }
};

exports.getReservations = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit; // 이미 불러온 데이터는 건너뛰기

        const reservations = await db.Reservation.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['start_time', 'ASC']]
        });

        return {
            total: reservations.count,
            page: page,
            totalPages: Math.ceil(reservations / limit),
            reservations: reservations.rows
        };

    } catch (error) {
        throw new Error('데이터를 불러오는데 실패했습니다' + error.message);
    }
};