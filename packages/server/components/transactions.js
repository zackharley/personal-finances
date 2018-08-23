const { pick } = require('lodash');
const { Transaction } = require('../models');

module.exports = {
  createTransaction,
  deleteTransaction,
  getTransaction,
  listTransactions,
  updateTransaction
};

async function createTransaction(transaction) {
  const { cost, date, item, notes, subType, type } = transaction;
  return await Transaction.create(transaction);
}

async function deleteTransaction(id) {
  return await Transaction.findOneAndRemove({ _id: id });
}

async function getTransaction(id) {
  return await Transaction.findById(id);
}

async function listTransactions() {
  return await Transaction.find({});
}

const UPDATABLE_FIELDS = ['cost', 'date', 'item', 'notes', 'subType', 'type'];
async function updateTransaction(id, update) {
  const actualUpdates = pick(update, UPDATABLE_FIELDS);
  return await Transaction.findOneAndUpdate({ _id: id }, actualUpdates, {
    new: true
  });
}
