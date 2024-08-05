const express = require('express'),
	router = express.Router();

router.get('/room/:id', (req, res) => { res.render("rooms/room")});

module.exports = router;