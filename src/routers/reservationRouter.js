const express = require('express'),
	router = express.Router(),
    reservationController = require("../controllers/reservationController"),
    isAuthenticated = require("../middlewares/auth"),
    upload = require("../middlewares/multerConfig");

router.get('/reservation', reservationController.handleGetReservation);
router.get('/reservation/new', isAuthenticated, (req, res) => {
    res.render("reservations/createReservation");
});
router.get('/reservation/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});
router.post('/reservation/upload', upload.single('photo'), (req, res) => {
    console.log(req.file, req.body);
    res.send('ok');
});

module.exports = router;