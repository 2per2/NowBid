const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth"),
    upload = require("../middlewares/multerConfig");

router.get('/reservation', reservationController.handleGetReservationsByPage);
router.get('/reservation/new', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservation/new', upload.single('photo'), reservationController.handleCreateReservation);
router.get('/reservation/:id', reservationController.handleGetOneReservation);

module.exports = router;