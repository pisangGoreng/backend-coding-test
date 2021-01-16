const { rideSchema } = require('../JoiValidations');
const { httpResponses, logger } = require('../helpers');

module.exports = {
  submitRide: (req, res, next) => {
    const { body, url } = req;
    const { error } = rideSchema.validate(body, { abortEarly: false });

    if (error) {
      logger.error(url, `failed validate when POST ${url}`, req.body);
      return res
        .status(422)
        .json(httpResponses.validation(error.details));
    }

    return next();
  },
};
