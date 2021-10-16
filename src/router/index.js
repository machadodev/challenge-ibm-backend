const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');
const HealthController = require('../app/controllers/health-controller');

module.exports = function (app) {
  app.get('/', HealthController.getHealth);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
