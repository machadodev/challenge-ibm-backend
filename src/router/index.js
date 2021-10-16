module.exports = function (app) {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello World!' });
  });

  app.get('/about', (req, res) => {
    res.json({ message: 'about' });
  });
};
