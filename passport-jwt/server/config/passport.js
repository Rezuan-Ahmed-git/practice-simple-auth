require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('../models/user.model');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log(jwt_payload);
    // User.findOne({ id: jwt_payload.id }, function (err, user) {
    //   if (err) {
    //     return done(err, false);
    //   }
    //   if (user) {
    //     return done(null, user);
    //   } else {
    //     return done(null, false);
    //     // or you could create a new account
    //   }
    // });

    // User.findOne({ id: jwt_payload.id })
    //   .then((user) => {
    //     if (user) {
    //       return done(null, user);
    //     } else {
    //       return done(null, false);
    //       // or you could create a new account
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    try {
      const user = await User.findOne({ id: jwt_payload._id });

      if (user) {
        console.log(user.username);
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.log(error);
    }
  })
);
