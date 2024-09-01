const auctionService = require("../services/auctionService");

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
        const auctionData = await auctionService.getOneAuction(auctionId);
        if (!auctionData) {
            throw new Error('No auction data found');
        }
        
        const roomId = uuidv4();

        res.render("auctions/auctionDetail", { data: auctionData, roomId: roomId });
    } catch (error) {
        res.status(500).json({ message: 'Error in handleGetOneAuction ', error: error.message });
    }
};