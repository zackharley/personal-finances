const app = require('express')();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const api = require('./api/index');
const db = require('./db/index');

dotenv.config({ path: '../../.env' });

const PORT = process.env.PORT || 8000;

db.connectToDB();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});
app.use('/api', api);

app.use((error, req, res, next) => {
  console.error('ERROR!');
  console.error(error);
  res.send(error.statusCode || 500).send({ error: error.toString() });
});

app.listen(PORT, () =>
  console.log(`Personal finances app running on port ${PORT}`)
);
