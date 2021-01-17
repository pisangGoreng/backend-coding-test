const { open } = require('sqlite');
const sqlite3 = require('sqlite3').verbose();

const { logger } = require('../helpers');

module.exports = async () => {
  try {
    logger.info('sqlite3', 'OPEN connection sqlite3');
    const db = await open({
      filename: ':sampleDb',
      driver: sqlite3.Database,
    });

    const createRideTableSchema = `
    CREATE TABLE IF NOT EXISTS Rides
      (
      rideID INTEGER PRIMARY KEY AUTOINCREMENT,
      startLat DECIMAL NOT NULL,
      startLong DECIMAL NOT NULL,
      endLat DECIMAL NOT NULL,
      endLong DECIMAL NOT NULL,
      riderName TEXT NOT NULL,
      driverName TEXT NOT NULL,
      driverVehicle TEXT NOT NULL,
      created DATETIME default CURRENT_TIMESTAMP
      )
    `;

    await db.run(createRideTableSchema);

    logger.info('sqlite3', 'SUCCESS connection sqlite3');

    return db;
  } catch (error) {
    return logger.error('sqlite3', 'FAILED connection sqlite3', error.message);
  }
};
