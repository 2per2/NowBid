const express = require('express'),
	router = express.Router(),
	auctionController = require("../controllers/auctionController");

router.get('/auction', auctionController.handleGetAuctionsByPage);
router.get('/auction/:id', auctionController.handleGetOneAuction);

module.exports = router;