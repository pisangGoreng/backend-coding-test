const { logger } = require('../helpers');
const { ridesRepositories } = require('../repositories');

const path = '/ride';

module.exports = {
  getRide: async (id) => {
    try {
      const [selectedRide] = await ridesRepositories.getRide(id);
      return selectedRide;
    } catch (error) {
      logger.error(path, 'failed get ride with id in ride service', error);
      throw new Error(JSON.stringify(error));
    }
  },

  getRides: async () => {
    try {
      const { totalRide } = await ridesRepositories.getTotalRide();
      const results = await ridesRepositories.getRides();

      return {
        products_page_count: totalRide,
        count: results.length,
        rows: results,
      };
    } catch (error) {
      logger.error(path, 'failed get all ride in ride service', error);
      throw new Error(JSON.stringify(error));
    }
  },

  getRidesPagination: async (page, limit) => {
    try {
      const { totalRide } = await ridesRepositories.getTotalRide();
      const offset = (page - 1) * limit;
      const results = await ridesRepositories.getRidesPagination(limit, offset);

      return {
        items_count: totalRide,
        count: results.length,
        rows: results,
      };
    } catch (error) {
      logger.error(path, 'failed get all ride in ride service', error);
      throw new Error(JSON.stringify(error));
    }
  },

  insertRide: async (payloads) => {
    try {
      const [newRide] = await ridesRepositories.insertRide(payloads);

      return newRide;
    } catch (error) {
      logger.error(path, 'failed insert new ride in ride service', error);
      throw new Error(JSON.stringify(error));
    }
  },
};
