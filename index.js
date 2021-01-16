// const express = require('express');
const sqlite3 = require('sqlite3').verbose();
// const app = express();
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }

  console.log('Connected to the in-memory SQlite database.');
  return true;
});

const server = require('./src/app')(db);

const port = 8010;

// const bodyParser = require('body-parser');

// const jsonParser = bodyParser.json();

// const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');

db.serialize(() => {
  buildSchemas(db);

  // const app = require('./src/app')(db);

  server.listen(port, () => console.log(`App started and listening on port ${port}`));
});
