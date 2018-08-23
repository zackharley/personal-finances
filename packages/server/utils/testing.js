const mongoose = require('mongoose');
const MongoDBMemoryServer = require('mongodb-memory-server').default;

jasmine.DEFAULT_TIMEOUT_INTERVAL = 300000;

module.exports = { initializeTestDB };

async function initializeTestDB() {
  const server = new MongoDBMemoryServer();
  const mongoUri = await server.getConnectionString();
  const connection = await mongoose.connect(mongoUri).catch(err => {
    if (err) {
      throw err;
    }
  });

  return { connection, server };
}
