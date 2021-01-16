const { rideSchema } = require('../JoiValidations');
const { httpResponses } = require('../helpers');

module.exports = {
  submitRide: (req, res, next) => {
    const { error } = rideSchema.validate(req.body, { abortEarly: false });

    if (error) {
      res
        .status(422)
        .json(httpResponses.validation(error.details));
    }

    next();
  },
};
