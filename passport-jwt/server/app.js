const express = require('express');
const cors = require('cors');
const User = require('./models/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();

require('./config/database');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//home route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the server</h1>');
});

//register route
app.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('User already exist');

    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });

      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: 'User is created successfully',
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: 'User is not created',
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//login route
app.post('/login', (req, res) => {
  res.send('<h1>Welcome to the login</h1>');
});

//profile route
app.get('/profile', (req, res) => {
  res.send('<h1>Welcome to the profile</h1>');
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
