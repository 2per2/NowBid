const express = require('express'),
	router = express.Router(),
    authController = require("../controllers/authController");

    
/* Sign up */
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', authController.createUser);


/* Sign in */
router.get('/signin', (req, res) => {
    res.render('auth/signin');
});
router.post('/signin', authController.signin);


module.exports = router;