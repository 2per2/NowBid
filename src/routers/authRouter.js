const express = require('express'),
	router = express.Router(),
    passport = require("passport"),
    authController = require("../controllers/authController");

    
/* Sign up */
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});
router.post('/signup', authController.handleCreateUser);


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


/* Google authentication */
// Signup route
router.get('/signup/google', passport.authenticate('google-signup', {
    scope: ['profile', 'email']
  }));
  
  router.get('/signup/google/redirect', passport.authenticate('google-signup', {
    failureRedirect: '/signup'
  }), function(req, res) {
    // Successful signup, redirect to the appropriate page
    res.redirect('/');
  });
  
  // Signin route
  router.get('/signin/google', passport.authenticate('google-signin', {
    scope: ['profile', 'email']
  }));
  
  router.get('/signin/google/redirect', passport.authenticate('google-signin', {
    failureRedirect: '/signin'
  }), function(req, res) {
    // Successful signin, redirect to the appropriate page
    res.redirect('/');
  });

module.exports = router;