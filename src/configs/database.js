const sqlite3 = require('sqlite3').verbose();

const buildSchemas = require('../schemas');
const { logger } = require('../helpers');

const db = new sqlite3.Database(':memory:', (err) => {
  logger.info('sqlite3', 'OPEN connection sqlite3');

  if (err) {
    return logger.error('sqlite3', 'FAILED connection sqlite3', err.message);
  }

  return logger.info('sqlite3', 'SUCCESS connection sqlite3');
});

db.serialize(() => {
  buildSchemas(db);

  const insert = 'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.run(insert, [20, 20, 30, 30, 'kenzo', 'honda', 'pajeto']);
  db.run(insert, [20, 20, 30, 30, 'irsan', 'daihatsu', 'sirion']);
  db.run(insert, [20, 20, 30, 30, 'irwin', 'mithsubisi', 'expander']);

  // db.run('SELECT * FROM Rides');
  db.all('SELECT * FROM Rides', (err, rows) => {
    if (err) {
      console.log('🚀 ~ file: database.js ~ line 25 ~ db.all ~ err', err);
    }
    console.log('🚀 ~ file: database.js ~ line 24 ~ db.all ~ rows', rows);
  });
});

module.exports = db;
