const router = require('express').Router();
const transactions = require('../components/transactions');

router.get('/', async (req, res, next) => {
  let transactionsList;
  try {
    transactionsList = await transactions.listTransactions();
  } catch (error) {
    next(error);
    return;
  }
  res.status(200).send({ transactions: transactionsList });
});

router.post('/', async (req, res, next) => {
  let transaction;
  try {
    transaction = await transactions.createTransaction(req.body.transaction);
  } catch (error) {
    next(error);
    return;
  }
  res.status(201).send({ transaction });
});

router.delete('/:transactionId', async (req, res, next) => {
  let deletedTransaction;
  const { transactionId } = req.params;
  try {
    deletedTransaction = await transactions.deleteTransaction(transactionId);
  } catch (error) {
    next(error);
    return;
  }
  res.status(200).send({ deletedTransaction });
});

router.get('/:transactionId', async (req, res, next) => {
  let transaction;
  const { transactionId } = req.params;
  try {
    transaction = await transactions.getTransaction(transactionId);
  } catch (error) {
    next(error);
    return;
  }
  res.status(200).send({ transaction });
});

router.put('/:transactionId', async (req, res, next) => {
  let updatedTransaction;
  const { transactionId } = req.params;
  const { update } = req.body;
  try {
    updatedTransaction = await transactions.updateTransaction(transactionId, update);
  } catch (error) {
    next(error);
    return;
  }
  res.status(200).send({ updatedTransaction });
});

module.exports = router;
