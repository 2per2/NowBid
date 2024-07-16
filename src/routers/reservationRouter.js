const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth");

router.get('/reservation', reservationController.handleGetReservation);
router.get('/reservation/upload', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservation/upload', (req, res) => {
    res.send("successed");
});

module.exports = router;