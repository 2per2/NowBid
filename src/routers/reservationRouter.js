const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth"),
    checkFileUpload = require("../middlewares/checkFileUpload").checkFileUpload;

router.get('/reservations', reservationController.handleGetReservationsByPage);
router.get('/reservations/new', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservations/new', checkFileUpload, reservationController.handleCreateReservation);
router.get('/reservations/:id', reservationController.handleGetOneReservation);

module.exports = router;