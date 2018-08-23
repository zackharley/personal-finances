const subject = require('./transactions');
const { initializeTestDB } = require('../utils/testing');
const { Transaction } = require('../models');

let db;
let id;
const testTransaction = {
  cost: 28.47,
  date: new Date(),
  item: 'coffee',
  notes: 'Some more information',
  subType: 'eating out',
  type: 'food'
};

describe('transactions', () => {
  beforeAll(async () => {
    db = await initializeTestDB();
  });

  beforeEach(async () => {
    const transaction = await Transaction.create(testTransaction);
    id = transaction._id;
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
    jest.resetAllMocks();
  });

  afterAll(async () => {
    db.connection.disconnect();
    db.server.stop();
    jest.restoreAllMocks();
  });

  describe('#createTransaction', () => {
    describe('when supplying valid a valid transaction', () => {
      it('should return an object containing all of the fields supplied', async () => {
        const validTransaction = {
          cost: 42.24,
          date: new Date(),
          item: 'A thing I bought',
          notes: 'Some extra details about it',
          subType: 'taxi',
          type: 'transportation'
        };
        const actual = await subject.createTransaction(validTransaction);
        expect(actual).toEqual(expect.objectContaining(validTransaction));
      });
    });
  });

  describe('#deleteTransaction', () => {});

  describe('#getTransaction', () => {
    describe('when supplied with a valid transaction id', () => {
      it('should find the transaction with the matching ID', async () => {
        const actual = await subject.getTransaction(id);
        expect(actual).toEqual(expect.objectContaining(testTransaction));
        expect(actual._id).toEqual(id);
      });
    });
    describe('when supplied with an invalid transaction id', () => {
      it('should return null', async () => {
        const invalidId = null;
        const actual = await subject.getTransaction(invalidId);
        expect(actual).toEqual(null);
      });
    });
  });

  describe('#listTransactions', () => {
    let secondTransaction;

    beforeEach(async () => {
      secondTransaction = {
        cost: 42.24,
        date: new Date(),
        item: 'A thing I bought',
        notes: 'Some extra details about it',
        subType: 'taxi',
        type: 'transportation'
      };
      await Transaction.create(secondTransaction);
    });

    it('should return a list of transactions', async () => {
      const actual = await subject.listTransactions();
      expect(actual).toHaveLength(2);
      expect(actual).toContainEqual(
        expect.objectContaining(testTransaction)
      );
      expect(actual).toContainEqual(
        expect.objectContaining(secondTransaction)
      );
    });
  });

  describe('#updateTransaction', () => {
    it('should correctly update the object', async () => {
      const update = {
        type: 'this is a really unique type',
        notes: 'This is a lot of text also'
      };
      const actual = await subject.updateTransaction(id, update);
      expect(actual).toEqual(expect.objectContaining(update));
    })
  });
});
