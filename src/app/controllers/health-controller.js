// get health of application
exports.getHealth = (req, res) => {
  res.json({
    status: 'UP',
  });
};
