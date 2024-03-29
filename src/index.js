const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const logger = require('./app/config/logger');
const constants = require('./lib/constants');

app.use(cors({ credentials: true, origin: process.env.UI_BASE_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// if production, enable helmet
/* istanbul ignore if  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}

app.use(
  session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,
    proxy: true,
  })
);

require('./app/config/AppID')(app);
require('./router')(app);

app.listen(constants.PORT, () => {
  logger.info(`App running on port ${constants.PORT}`);
});
