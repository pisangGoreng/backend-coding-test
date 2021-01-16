const { logger } = require('../helpers');
const { ridesRepositories } = require('../repositories');

module.exports = {
  getRide: async (id) => {
    try {
      return await ridesRepositories.getRide(id);
    } catch (error) {
      logger.error('/ride', 'failed get ride with id', error);
      throw new Error(JSON.stringify(error));
    }
  },

  getRides: async () => {
    try {
      return await ridesRepositories.getRides();
    } catch (error) {
      logger.error('/ride', 'failed get all ride', error);
      throw new Error(JSON.stringify(error));
    }
  },

  insertRide: async (payloads) => {
    try {
      return await ridesRepositories.insertRide(payloads);
    } catch (error) {
      logger.error('/ride', 'failed insert new ride', error);
      throw new Error(JSON.stringify(error));
    }
  },
};
