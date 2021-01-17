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

    return utils.convertRideKey(ride, 'snakeCase');
  },

  getRides: async () => {
    const database = await db();
    const rides = await database.all('SELECT * FROM Rides');
    await database.close();

    return utils.convertRideKey(rides, 'snakeCase');
  },

  getRidesPagination: async (limit, offset) => {
    const database = await db();
    const rides = await database.all(`SELECT * FROM Rides limit ${limit} OFFSET ${offset}`);
    await database.close();

    return utils.convertRideKey(rides, 'snakeCase');
  },

  insertRide: async (payloads) => {
    const database = await db();
    const saveRide = await database.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', payloads);
    const selectedRide = await database.all('SELECT * FROM Rides WHERE rideID = ?', saveRide.lastID);

    return utils.convertRideKey(selectedRide, 'snakeCase');
  },
};
