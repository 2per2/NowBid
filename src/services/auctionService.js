const db = require("../models");

exports.findAuctionByUser = async (user_id) => {
    return await db.Auction.findAll({ where: { seller_id: user_id }});
};

exports.createPhoto = async (newPhoto) => {
    try {
        const photo = await db.Photo.create({
            path: newPhoto.path
        });
        return photo;
    } catch (error) {
        throw new Error('사진 생성에 실패했습니다: ' + error.message);
    }
};

exports.createReservation = async (currentUser, newReservation, photo) => {
    try {
        const reservation = await db.Auction.create({
            seller_id: currentUser.id,
            title: newReservation.title,
            description: newReservation.description,
            start_time: newReservation.startTime,
            status: 'reserved',
            photo_id: photo.id
        });
        return reservation;
    } catch (error) {
        throw new Error('예약 생성에 실패했습니다: ' + error.message);
    }
};

exports.getReservations = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit; // 이미 불러온 데이터는 건너뛰기

        const reservations = await db.Auction.findAndCountAll({
            where: {
              status: 'reserved'
            },
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

exports.getOneReservation = async (reservation_id) => {
    try {
        const reservation = await db.Auction.findAll({
            where: {
                id: reservation_id
            }
        });

        return reservation;
    } catch (error) {
        throw new Error('데이터를 불러오는데 실패했습니다' + error.message);
    }
};