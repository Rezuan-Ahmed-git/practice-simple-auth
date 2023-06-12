const express = require('express');
const cors = require('cors');
const ejs = require('ejs');
require('./config/database');

const app = express();
const User = require('./models/user.model');

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//base url
app.get('/', (req, res) => {
  res.render('index');
});

//register : get
app.get('/register', (req, res) => {
  res.render('register');
});

//register : post
app.post('/register', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send('user already exist');
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).redirect('/login');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//login : get
app.get('/login', (req, res) => {
  res.render('login');
});

//login : post
app.post('/login', (req, res) => {
  try {
    res.status(200).send('user is logged in');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//profile protected
app.get('/profile', (req, res) => {
  res.render('profile');
});

//logout
app.get('/logout', (req, res) => {
  res.redirect('/');
});

module.exports = app;
