const express = require('express'),
	router = express.Router(),
    signupController = require("../controllers/signupController");

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', signupController.createUser);

module.exports = router;