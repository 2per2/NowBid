const db = require("../models"),
    { sequelize } = require("../models"); 

exports.findAuctionByUser = async (user_id) => {
    return await db.Auction.findAll({ where: { seller_id: user_id }});
};


/** Auction zone */
exports.getAuctionsByPage = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit; // 이미 불러온 데이터는 건너뛰기

        const auctions = await db.Auction.findAndCountAll({
            where: {
              status: 'ongoing'
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

exports.getAllAuctions = async () => {
    try {
        const auctions = await db.Auction.findAll({
            where: {
              status: 'ongoing'
            }
        });
        return auctions;
    } catch (error) {
        throw new Error('Failed to get auctions: ' + error.message);
    }
};

exports.getOneAuction= async (auction_id) => {
    try {
        const auction = await db.Auction.findOne({
            where: { id: auction_id },
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