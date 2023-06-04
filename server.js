const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/data', (req, res) => {
  const reviews = require('./data.json');
  const filteredReviews = reviews.toplists['575'];

  res.json(filteredReviews);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});