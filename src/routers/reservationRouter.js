const express = require('express'),
	router = express.Router();

router.get('/reservation', (req, res) => {
    res.render("reservations/reservation");
});
router.get('/reservation/upload', (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservation/upload', (req, res) => {
    res.send("successed");
});

module.exports = router;