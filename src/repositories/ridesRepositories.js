/* eslint-disable func-names */
const { db } = require('../configs');

module.exports = {
  getRide: (id) => {
    const getRide = new Promise((resolve, reject) => {
      db.all(`SELECT * FROM Rides WHERE rideID='${id}'`, (err, row) => {
        if (err) { reject(err); }

        resolve(row);
      });
    });

    return getRide;
  },

  getRides: () => {
    const getRides = new Promise((resolve, reject) => {
      db.all('SELECT * FROM Rides', (err, row) => {
        if (err) { reject(err); }

        resolve(row);
      });
    });

    return getRides;
  },

  insertRide: (payloads) => {
    const insertRide = new Promise((resolve, reject) => {
      db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', payloads, function (err) {
        if (err) { reject(err); }

        db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (error, rows) => {
          if (error) { reject(error); }

          resolve(rows);
        });
      });
    });

    return insertRide;
  },
};
