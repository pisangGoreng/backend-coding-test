const { open } = require('sqlite');

const sqlite3 = require('sqlite3').verbose();

// const buildSchemas = require('../schemas');
const { logger } = require('../helpers');

module.exports = async () => {
  try {
    logger.info('sqlite3', 'OPEN connection sqlite3');
    const db = await open({
      filename: ':memory',
      driver: sqlite3.Database,
    });
    logger.info('sqlite3', 'SUCCESS connection sqlite3');

    return db;
  } catch (error) {
    return logger.error('sqlite3', 'FAILED connection sqlite3', error.message);
  }
};
