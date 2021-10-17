const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');
const HealthController = require('../app/controllers/health-controller');
const AuthController = require('../app/controllers/auth-controller');
const addRedirectMiddleware = require('../app/middlewares/addRedirectMiddleware');

module.exports = function (app) {
  app.get('/', HealthController.getHealth);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.get('/auth/login', addRedirectMiddleware, AuthController.login());
  app.get('/auth/logout', AuthController.logout);
  app.get('/auth/logged', AuthController.userAuth);
  app.get('/ibm/cloud/appid/callback', AuthController.cbAuthorization());

  // short hand way to protect a series of different API end points
  app.use('/api/*', AuthController.isLoggedIn);
};
