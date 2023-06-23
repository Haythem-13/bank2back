const mongoose = require('mongoose');

const bankOperationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const BankOperation = mongoose.model('BankOperation', bankOperationSchema);

module.exports = BankOperation;
