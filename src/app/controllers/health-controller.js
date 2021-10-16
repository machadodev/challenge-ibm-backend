// get health of application
exports.getHealth = (req, res) => {
  // #swagger.summary = 'Health Check'
  // #swagger.description = 'Check if app is up.'
  return res.json({
    status: 'UP',
  });
};
