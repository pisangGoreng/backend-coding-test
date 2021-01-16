const { logger, httpResponses } = require('../helpers');
const { ridesServices } = require('../services');

module.exports = {
  getRide: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await ridesServices.getRide(id);
      return res
        .status(200)
        .json(httpResponses.success('success get ride data', result, 200));
    } catch (error) {
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },

  getRides: async (req, res) => {
    try {
      const result = await ridesServices.getRides();
      return res
        .status(200)
        .json(httpResponses.success('success get all ride data', result, 200));
    } catch (error) {
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },

  insertRide: async (req, res) => {
    try {
      const { body, url } = req;

      logger.info(url, 'add new record on rides table', body);

      const {
        start_lat: startLatitude,
        start_long: startLongitude,
        end_lat: endLatitude,
        end_long: endLongitude,
        rider_name: riderName,
        driver_name: driverName,
        driver_vehicle: driverVehicle,
      } = body;

      const results = await ridesServices.insertRide([
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude,
        riderName,
        driverName,
        driverVehicle,
      ]);

      return res
        .status(200)
        .json(httpResponses.success('success insert ride data', results, 200));
    } catch (error) {
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },
};
