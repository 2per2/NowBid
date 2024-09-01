const db = require("../models"),
    { sequelize } = require("../models"); 

exports.createPhoto = async (newPhoto) => {
    try {
        const photo = await db.Photo.create({
            path: newPhoto.path
        });
        return photo;
    } catch (error) {
        throw new Error('Failed to create a photo record: ' + error.message);
    }
};

exports.createReservation = async (currentUser, newReservation, photo) => {
    try {
        const auction = await db.Auction.create({
            seller_id: currentUser.id,
            title: newReservation.title,
            description: newReservation.description,
            start_time: newReservation.startTime,
            status: 'reserved',
            photo_id: (photo) ? photo.id : null
        });
        return auction;
    } catch (error) {
        throw new Error('Failed to create a auction: ' + error.message);
    }
};

exports.getReservationsByPage = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit; // 이미 불러온 데이터는 건너뛰기

        const auctions = await db.Auction.findAndCountAll({
            where: {
                status: 'reserved'
            },
            limit: limit,
            offset: offset,
            order: [['start_time', 'ASC']]
            });

        return {
            total: auctions.count,
            page: page,
            totalPages: Math.ceil(auctions / limit),
            auctions: auctions.rows
        };

    } catch (error) {
        throw new Error('Failed to get auctions by page: ' + error.message);
    }
};

exports.getAllReservations = async () => {
    try {
        const auctions = await db.Auction.findAll({
            where: {
                status: 'reserved'
            }
        });
        return auctions;
    } catch (error) {
        throw new Error('Failed to get auctions: ' + error.message);
    }
};

exports.getOneReservation = async (reservation_id) => {
    try {
        const auction = await db.Auction.findOne({
            where: { id: reservation_id },
            include: [{
                // photo_id를 통해 path도 가져오기
                model: db.Photo,
                attributes: ['path']
            }]
        });

        return auction;
    } catch (error) {
        throw new Error('Failed to get the auction: ' + error.message);
    }
};

exports.updateReservationStatus = async () => {
    try {
        const now = new Date();
        const nowFormatted = now.toISOString().slice(0, 19).replace('T', ' ');

        const result = await sequelize.query(
            `UPDATE Auctions
            SET status = 'ongoing'
            WHERE start_time <= :now AND status = 'reserved'`,
            {
                replacements: { now: nowFormatted },
                type: sequelize.QueryTypes.UPDATE
            }
        );
        console.log(`Successfully updated ${result[1]} rows.`);
    } catch (error) {
        throw new Error('Failed to update auction statuses: ' + error.message);
    }
};
