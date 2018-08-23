const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  cost: {
    required: true,
    min: 0,
    type: Number
  },
  date: {
    required: true,
    type: Date
  },
  item: {
    required: true,
    type: String
  },
  notes: String,
  subType: String,
  type: {
    required: true,
    type: String
  }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
