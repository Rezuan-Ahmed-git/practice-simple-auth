const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the server</h1>');
});

//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'route not found',
  });
});

//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
