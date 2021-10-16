const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// if production, enable helmet
/* istanbul ignore if  */
if (process.env.VCAP_APPLICATION) {
  app.use(helmet());
}

app.use(morgan('combined'));

require('./router')(app);

console.log(process.env.TEST);
console.log('-----------');
console.log(process.env);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
