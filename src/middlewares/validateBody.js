const { rideSchema } = require('../validations');
const { httpResponses, logger } = require('../helpers');

module.exports = {
  submitRide: (req, res, next) => {
    const { body, url } = req;
    const { error } = rideSchema.validate(body, { abortEarly: false });

    if (error) {
      logger.error(url, `failed validate BODY payload when POST ${url}`, {
        payload: body,
        error: error.details,
      });

      return res
        .status(422)
        .json(httpResponses.validation(error.details));
    }

    return next();
  },
};
