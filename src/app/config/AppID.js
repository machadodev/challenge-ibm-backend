const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const appIdConfig = require('./AppIDConfig');
passport.use(new WebAppStrategy(appIdConfig()));

// Configure passportjs with user serialization/deserialization. This is required
// for authenticated session persistence accross HTTP requests. See passportjs docs
// for additional information http://passportjs.org/docs
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
