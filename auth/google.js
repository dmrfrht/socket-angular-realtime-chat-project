const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const User = require('../models/User')

passport.use(
  new GoogleStrategy({
      clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
      clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_LOGIB_CB_URL
    },
    ((accessToken, refreshToken, profile, done) => {
      const data = profile._json

      User.findOrCreate({
        'googleId': data.sub
      }, {
        name: data.given_name,
        surname: data.family_name,
        profilePhotoUrl: data.picture
      }, (err, user) => {
        return done(err, user)
      })
    })
  ))

module.exports = passport


