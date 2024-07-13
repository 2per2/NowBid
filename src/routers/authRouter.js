const express = require('express'),
	router = express.Router(),
    passport = require("passport"),
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
router.post('/signin', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Failed to sign in',
        successRedirect: '/',
        successFlash: 'welcome'
    })
);


module.exports = router;