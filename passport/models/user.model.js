const mongoose = require('mongoose');

//=======Schema for local passport=====
// const userSchema = mongoose.Schema({
//   username: {
//     type: String,
//     require: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     require: true,
//   },
// });

//=======Schema for google Strategy passport=====
const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  googleId: {
    type: String,
    require: true,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
