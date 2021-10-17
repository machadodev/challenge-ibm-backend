const passport = require('passport');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

// Explicit login endpoint.
// Will always redirect browser to login widget due to {forceLogin: true}.
// If forceLogin is set to false the redirect to login widget will not occur if user is already authenticated
exports.login = () => {
  return passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    forceLogin: true,
  });
};

// Logout endpoint. Clears authentication information from session
exports.logout = (req, res) => {
  WebAppStrategy.logout(req);
  return res.redirect(process.env.UI_BASE_URL);
};

exports.isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn');
  console.log(req.session);
  if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
    return next();
  } else {
    return res.redirect(process.env.UI_BASE_URL);
  }
};

exports.userAuth = (req, res) => {
  let loggedInAs = {};
  if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
    loggedInAs['name'] = req.user.name;
    loggedInAs['email'] = req.user.email;
  }

  return res.send({
    logged: req.session[WebAppStrategy.AUTH_CONTEXT] ? true : false,
    loggedInAs: loggedInAs,
  });
};

// Callback to finish the authorization process. Will retrieve access and identity tokens/
// from AppID service and redirect to either (in below order)
// 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
// 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
// 3. application root ("/")
exports.cbAuthorization = () => {
  return passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
    allowAnonymousLogin: true,
  });
};
