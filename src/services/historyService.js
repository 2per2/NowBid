const db = require("../models"),
    { sequelize } = require("../models"); 

exports.getHistoryByUser = async (user_id) => {
    return await db.History.findAll({ where: { seller_id: user_id }});
};

exports.createHistory = async (auctionId) => {
    try {
        const history = await db.History.create({
            auction_id: auctionId
        });
        return history;
    } catch (error) {
        throw new Error('Failed to create a history: ' + error.message);
    }
};

exports.updateHistory = async (historyId, bidderId, currentBid) => {
    try {
        const updatedHistory = await db.History.update(
            {
                bidder_id: bidderId,
                winning_bid: currentBid
            }, {
                where: {
                    id: historyId
                }
            }
        );
        return updatedHistory;
    } catch (error) {
        throw new Error('Failed to update a history: ' + error.message);
    }
};