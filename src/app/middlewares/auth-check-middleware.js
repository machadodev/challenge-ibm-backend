const WebAppStrategy = require('ibmcloud-appid').WebAppStrategy;

module.exports = (req, res, next) => {
  if (req.session[WebAppStrategy.AUTH_CONTEXT]) {
    return next();
  } else {
    return res.redirect(process.env.UI_BASE_URL);
  }
};
