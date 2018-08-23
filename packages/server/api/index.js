const router = require('express').Router();
const transactionsRouter = require('./transactions.router');

router.use('/transactions', transactionsRouter);

module.exports = router;
