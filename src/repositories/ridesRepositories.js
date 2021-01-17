/* eslint-disable func-names */
const { db } = require('../configs');
const { utils } = require('../helpers');

module.exports = {
  getRide: (id) => {
    const getRide = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Rides WHERE rideID='${id}'`, (err, row) => {
        if (err) { reject(err); }

        const modifiedRow = utils.convertRideKey(row, 'snakeCase');
        resolve(modifiedRow);
      });
    });

    return getRide;
  },

  getRides: () => {
    const getRides = new Promise((resolve, reject) => {
      db.all('SELECT * FROM Rides', (err, rows) => {
        if (err) { reject(err); }

        const modifiedRows = utils.convertRideKey(rows, 'snakeCase');
        resolve(modifiedRows);
      });
    });

    return getRides;
  },

  insertRide: (payloads) => {
    const insertRide = new Promise((resolve, reject) => {
      db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', payloads, function (err) {
        if (err) { reject(err); }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, row) => {
          if (error) { reject(error); }

          const modifiedRow = utils.convertRideKey(row, 'snakeCase');
          resolve(modifiedRow);
        });
      });
    });

    return insertRide;
  },
};
