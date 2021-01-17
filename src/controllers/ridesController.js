const { logger, httpResponses } = require('../helpers');
const { ridesServices } = require('../services');

module.exports = {
  getRide: async (req, res) => {
    const { url, params } = req;
    try {
      logger.info(url, 'get ride data in ride controller');
      const result = await ridesServices.getRide(params.id);

      return res
        .status(200)
        .json(httpResponses.success('success get ride data', result, 200));
    } catch (error) {
      logger.error(url, 'failed get ride with id in ride controller', error);
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },

  getRides: async (req, res) => {
    const { url, query } = req;
    const { page, limit } = query;
    try {
      logger.info(url, 'get all ride data in ride controller');
      let result = {};

      if (page && limit) {
        result = await ridesServices.getRidesPagination(page, limit);
      } else {
        result = await ridesServices.getRides();
      }

      return res
        .status(200)
        .json(httpResponses.success('success get all ride data', result, 200));
    } catch (error) {
      logger.error(url, 'failed get all ride in ride controller', error);
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },

  insertRide: async (req, res) => {
    const { body, url } = req;
    try {
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
      logger.error(url, 'failed insert new ride in ride controller', error);
      return res
        .status(422)
        .json(httpResponses.error(error));
    }
  },
};
