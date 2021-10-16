const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../docs/swagger_output.json');

module.exports = function (app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.get('/about', (req, res) => {
    res.json({ message: 'about' });
  });
};
