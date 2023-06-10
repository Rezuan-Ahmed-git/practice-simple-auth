// salting and hashing password

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const User = require('./models/user.model');

const app = express();

const PORT = process.env.PORT || 5000;
const dbURL = process.env.MONGO_URL;

//connect with database
const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log('Database is connected');
  } catch (error) {
    console.log('Not connected');
    console.log(error);
    process.exit(1);
  }
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/./views/index.html');
});

app.post('/register', async (req, res) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const newUser = new User({
        email: req.body.email,
        password: hash,
      });
      await newUser.save();
      res.status(201).json(newUser);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        // result == true
        if (result) {
          res.status(200).json({ status: 'valid user' });
        }
      });
    } else {
      console.log('user not found');
      res.status(404).send('not valid user');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//route not found error
app.use((req, res, next) => {
  res.status(400).json({
    message: 'route not found',
  });
});

//handling server error
app.use((err, req, res, next) => {
  res.status(500).json({
    message: 'Something broke',
  });
});

app.listen(PORT || 5000, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await connectDB();
});
