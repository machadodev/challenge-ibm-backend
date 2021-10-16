// get health of application
exports.getHealth = (req, res) => {
  return res.json({
    status: 'UP',
  });
};
