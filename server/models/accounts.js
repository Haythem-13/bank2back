const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [6, 'Your Username should contain 6 letters at least'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (value) {
        // Check if password contains at least one number
        return /\d/.test(value);
      },
      message: 'Password must contain at least one number'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  salary: {
    type: Number,
    required: false,
    validate: {
      validator: function (value) {
        // Check if salary is greater than or equal to 1000
        return value >= 1000;
      },
      message: 'Your loan potential is not big enough'
    }
  },
  fees: {
    type: Number,
    default: 30,
  }
});
const LoginModel = mongoose.model('Login', loginSchema);

module.exports = LoginModel;
