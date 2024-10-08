const auctionService = require("../services/auctionService"),
    cryptoSHA = require("../utils/cryptoUtils");

exports.handleGetAuctionsByPage = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // 기본값은 1
        const limit = parseInt(req.query.limit, 10) || 10; // 페이지당 항목 수, 기본값은 10

        const auctions = await auctionService.getAuctionsByPage(page, limit);

        res.send(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Error in handleGetAllAuctions ', error: error.message });
    }
};

exports.handleGetOneAuction = async (req, res, next) => {
    try {
        const auctionId = req.params.id;
        const { auction, auctionDetail } = await auctionService.getOneAuction(auctionId);
        if (!auction) {
            throw new Error('No auction data found');
        }
        
        // Generate roomId with auctionId
        const roomId = cryptoSHA.generateSHA256Hash(auctionId);

        // Set user's session
        req.session.auctionId = auctionId;

        res.render("auctions/auctionDetail", { auction, auctionDetail, roomId });
    } catch (error) {
        res.status(500).json({ message: 'Error in handleGetOneAuction ', error: error.message });
    }
};