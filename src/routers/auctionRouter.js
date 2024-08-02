const express = require('express'),
	router = express.Router();

router.get('/auction', (req, res) => { res.render('auctions/auction')});
router.get('/auction/:roomName', (req, res) => { 
    const name = req.params.roomName;
    res.send(`This is ${name} room`)
});

module.exports = router;