const express = require('express');
const session = require('cookie-session');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const logger = require('./app/config/logger');
const constants = require('./lib/constants');

// if production, enable helmet
/* istanbul ignore if  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}
app.use(morgan('tiny'));
app.use(
  session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
  })
);

logger.info('Processo');
logger.info(process.env);
logger.info('App Env');
logger.info(process.env['VCAP_APPLICATION']);

require('./app/config/AppID')(app);
require('./router')(app);

app.listen(constants.PORT, () => {
  logger.info(`App running on port ${constants.PORT}`);
});
