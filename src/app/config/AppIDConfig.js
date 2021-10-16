const constants = require('../../lib/constants');
module.exports = () => {
  const config = require('./appIdConfig.json');

  const env = process.env.NODE_ENV || 'development';

  if (env === 'development') {
    config.redirectUri = `http://localhost:${constants.PORT}${constants.CALLBACK_URL}`;
  } else if (process.env.VCAP_APPLICATION) {
    // running on CF
    let vcapApplication = JSON.parse(process.env['VCAP_APPLICATION']);
    config.redirectUri =
      'https://' +
      vcapApplication['application_uris'][0] +
      constants.CALLBACK_URL;
  }

  return config;
};
