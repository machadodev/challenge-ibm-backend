const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const swaggerFile = require('../docs/swagger_output.json');
const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;
const HealthController = require('../app/controllers/health-controller');
const constants = require('../lib/constants');

module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.get('/', HealthController.getHealth);

  app.get('/logout', (req, res) => {
    //Note: if you enabled SSO for Cloud Directory be sure to use webAppStrategy.logoutSSO instead.
    WebAppStrategy.logout(req);
    res.redirect('/');
  });
  // Callback to finish the authorization process. Will retrieve access and identity tokens/
  // from AppID service and redirect to either (in below order)
  // 1. the original URL of the request that triggered authentication, as persisted in HTTP session under WebAppStrategy.ORIGINAL_URL key.
  // 2. successRedirect as specified in passport.authenticate(name, {successRedirect: "...."}) invocation
  // 3. application root ("/")
  app.get(
    constants.CALLBACK_URL,
    passport.authenticate(WebAppStrategy.STRATEGY_NAME, {
      failureRedirect: '/error',
    })
  );

  // Protect everything under /api
  app.use('/api', passport.authenticate(WebAppStrategy.STRATEGY_NAME));

  app.get('/api/asd', (req, res) => {
    return res.send('asd');
  });

  //Serves the identity token payload
  app.get('/api/idPayload', (req, res) => {
    return res.send(
      req.session[WebAppStrategy.AUTH_CONTEXT].identityTokenPayload
    );
  });

  app.get('/error', (req, res) => {
    return res.send('Authentication Error');
  });
};
