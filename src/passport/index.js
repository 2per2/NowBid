const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const db = require('../models');

passport.use(new LocalStrategy(
  {
    usernameField: 'email', // 폼 필드 이름
    passwordField: 'password' // 폼 필드 이름
  },
  async function(email, password, done) {
    try {
      const user = await db.User.findOne({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await user.validPassword(password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
  try {
      const user = await db.User.findOne({
          where : { id },
      });
      return done(null, user);
  } catch (error) {
      console.error(error);
      return done(error);
  }
});

require('./googleStrategy');

module.exports = passport;