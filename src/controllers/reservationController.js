const reservationService = require("../services/auctionService");

exports.handleGetReservation = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1; // 기본값은 1
        const limit = parseInt(req.query.limit, 10) || 10; // 페이지당 항목 수, 기본값은 10

        const data = await reservationService.getReservations(page, limit);

        res.send(data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reservations', error: error.message });
    }
};