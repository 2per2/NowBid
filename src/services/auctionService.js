const db = require("../models"),
    { sequelize } = require("../models");

exports.getAuctionByUser = async (userId) => {
    return await db.Auction.findAll({ where: { seller_id: userId }});
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

exports.getOneAuction= async (auctionId) => {
    try {
        const auction = await db.Auction.findOne({
            where: { id: auctionId }
        });

        return auction;
    } catch (error) {
        throw new Error('Failed to get the auction: ' + error.message);
    }
};

exports.updateBid= async (auctionId, bidderId, bid) => {
    try {
        const updatedAuction = await db.Auction.update(
            {
                bidder_id: bidderId,
                winning_bid: bid
            }, {
                where: {
                    id: auctionId
                }
            }
        );

        return updatedAuction;
    } catch (error) {
        throw new Error('Failed to update the auction: ' + error.message);
    }
};