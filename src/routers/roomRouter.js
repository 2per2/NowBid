const express = require('express'),
	router = express.Router();

router.get('/room/:id', (req, res) => { res.send(`This is room ${req.params.id}`)});

module.exports = router;