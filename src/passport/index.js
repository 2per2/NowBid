const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const google = require("./googleStrategy");
const db = require('../models');

passport.use(new LocalStrategy(
  async function(username, password, done) {
    try {
      const user = await db.User.findOne({ where: { username: username } });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
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
  done(null, user.id); // 사용자 ID만 세션에 저장
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await db.User.findByPk(id); // ID로 사용자 조회
    done(null, user); // 복원된 사용자 객체를 전달
  } catch (err) {
    done(err);
  }
});

require('./googleStrategy');

module.exports = passport;