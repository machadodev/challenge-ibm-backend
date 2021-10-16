const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(morgan('combined'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

require('./router')(app);

console.log(process.env.TEST);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
