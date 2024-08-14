const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth"),
    upload = require("../middlewares/multerConfig");

router.get('/reservations', reservationController.handleGetReservationsByPage);
router.get('/reservations/new', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservations/new', upload.single('photo'), reservationController.handleCreateReservation);
router.get('/reservations/:id', reservationController.handleGetOneReservation);

module.exports = router;