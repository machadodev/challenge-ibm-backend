// custom middleware to redirect back to the page requested in the ?redirect query parameter to the request
module.exports = (req, res, next) => {
  let redirectPage = '/'; // default to returning to the root page
  if (req.query && req.query.redirect) {
    redirectPage = req.query.redirect;
  }

  // this will set the redirect page so long as the WebAppStrategy does not specify a successRedirect option
  req.originalUrl = process.env.UI_BASE_URL + redirectPage;

  next();
};
