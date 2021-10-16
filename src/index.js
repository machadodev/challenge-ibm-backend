const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
