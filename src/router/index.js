const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const swaggerFile = require('../docs/swagger_output.json');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const HealthController = require('../app/controllers/health-controller');
const constants = require('../lib/constants');

const UI_BASE_URL = process.env.UI_BASE_URL;

module.exports = function (app) {
  app.get('/', HealthController.getHealth);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

  // custom middleware to redirect back to the page requested in the ?redirect query parameter to the request
  function addRedirect(req, res, next) {
    let redirectPage = '/'; // default to returning to the root page
    if (req.query && req.query.redirect) {
      redirectPage = req.query.redirect;
    }

    // this will set the redirect page so long as the WebAppStrategy does not specify a successRedirect option
    req.originalUrl = UI_BASE_URL + redirectPage;

    next();
  }

  // Explicit login endpoint. Will always redirect browser to login widget due to {forceLogin: true}. If forceLogin is set to false the redirect to login widget will not occur if user is already authenticated
  app.get(
    '/auth/login',
    addRedirect,
    passport.authenticate(WebAppStrategy.STRATEGY_NAME, { forceLogin: true })
  );

  // Callback to finish the authorization process. Will retrieve access and identity tokens/
  // from AppID service and redirect to either (in below order)
  // 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
  // 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
  // 3. application root ("/")
  app.get(
    constants.CALLBACK_URL,
    passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
      allowAnonymousLogin: true,
    })
  );

  // Logout endpoint. Clears authentication information from session
  app.get('/auth/logout', function (req, res) {
    WebAppStrategy.logout(req);
    return res.redirect(UI_BASE_URL);
  });

  app.get('/auth/logged', (req, res) => {
    let loggedInAs = {};
    if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
      loggedInAs['name'] = req.user.name;
      loggedInAs['email'] = req.user.email;
    }

    res.send({
      logged: req.session[WebAppStrategy.AUTH_CONTEXT] ? true : false,
      loggedInAs: loggedInAs,
    });
  });

  function isLoggedIn(req, res, next) {
    if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
      next();
    } else {
      res.redirect(UI_BASE_URL);
    }
  }

  // short hand way to protect a series of different API end points
  app.use('/api/*', isLoggedIn);

  app.get('/api/name', (req, res) => {
    res.send({ name: req.user.name });
  });
};
