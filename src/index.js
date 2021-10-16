const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

require('./router')(app);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
