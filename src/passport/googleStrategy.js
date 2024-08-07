const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models');
require('dotenv').config();

// Signup strategy
passport.use('google-signup', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/signup/google/redirect"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Use findOrCreate with `where` and `defaults`
      const [user, created] = await db.User.findOrCreate({
        where: { google_id: profile.id },
        defaults: {
          username: profile.displayName,
          email: profile.emails[0].value,
          // Add other fields if necessary
        }
      });
      if (created) { user.createWallet(); } // For some reasons, the hook doesn't work
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));

// Signin strategy
passport.use('google-signin', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/signin/google/redirect"
  },
  async (accessToken, refreshToken, profile, cb) => {
    try {
      // Use findOne with `where`
      const user = await db.User.findOne({
        where: { google_id: profile.id }
      });

      if (!user) {
        return cb(null, false, { message: 'User not found' });
      }
      return cb(null, user);
    } catch (error) {
      return cb(error);
    }
  }
));