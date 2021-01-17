/* eslint-disable func-names */
const { db } = require('../configs');
const { utils } = require('../helpers');

module.exports = {
  getTotalRide: async () => {
    const database = await db();
    const totalRide = await database.get('SELECT count(*) as totalRide FROM Rides');
    await database.close();
    return totalRide;
  },

  getRide: async (id) => {
    const database = await db();
    const ride = await database.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
    await database.close();
    return ride;
  },

  getRides: async () => {
    const database = await db();
    const rides = await database.all('SELECT * FROM Rides');
    await database.close();
    return rides;
  },

  getRidesPagination: async (limit, offset) => {
    const database = await db();
    const rides = await database.all(`SELECT * FROM Rides limit ${limit} OFFSET ${offset}`);
    await database.close();
    return rides;
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
