const express = require('express'),
	router = express.Router(),
	isAuthenticated = require("../middlewares/auth"),
	auctionController = require("../controllers/auctionController");

router.get('/auctions', auctionController.handleGetAuctionsByPage);
router.get('/auctions/:id', isAuthenticated,auctionController.handleGetOneAuction);

module.exports = router;