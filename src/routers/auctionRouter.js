const express = require('express'),
	router = express.Router();

router.get('/auction', (req, res) => { res.render('auctions/auction')});
router.get('/auction/:id');

module.exports = router;