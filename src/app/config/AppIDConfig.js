const constants = require('../../lib/constants');
module.exports = () => {
  let config;

  try {
    // if running locally we'll have the local config file
    config = require('./localdev-config.json');
  } catch (e) {
    // running on CF
    let vcapApplication = JSON.parse(process.env['VCAP_APPLICATION']);
    return {
      redirectUri:
        'https://' +
        vcapApplication['application_uris'][0] +
        constants.CALLBACK_URL,
    };
  }
  return config;
};
