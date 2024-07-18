const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth"),
    upload = require("../middlewares/multerConfig");

router.get('/reservation', reservationController.handleGetReservation);
router.get('/reservation/new', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.post('/reservation/new', upload.single('photo'), reservationController.handleCreateReservation);

module.exports = router;