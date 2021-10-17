const constants = require('../../lib/constants');

module.exports = () => {
  let config = null;

  try {
    config = require('./localdev-config.json');
    config.redirectUri = `http://localhost:${constants.PORT}${constants.CALLBACK_URL}`;
  } catch (e) {
    if (process.env.VCAP_APPLICATION) {
      // running on CF
      let vcapApplication = JSON.parse(process.env['VCAP_APPLICATION']);
      return {
        redirectUri:
          'https://' +
          vcapApplication['application_uris'][0] +
          constants.CALLBACK_URL,
      };
    }
  }

  return config;
};
