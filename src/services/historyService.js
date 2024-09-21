const db = require("../models"),
    { sequelize } = require("../models"); 

exports.findHistoryByUser = async (user_id) => {
    return await db.History.findAll({ where: { seller_id: user_id }});
};

exports.createHistory = async (auction) => {
    try {
        const history = await db.History.create({
            seller_id: auction.seller_id,
            photo_id: auction.photo_id
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