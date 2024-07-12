const express = require('express'),
	router = express.Router(),
    authController = require("../controllers/authController");

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', authController.createUser);

module.exports = router;