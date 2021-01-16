const Joi = require('joi');

const { httpResponses, logger } = require('../helpers');

module.exports = {
  getRide: (req, res, next) => {
    const { params, url } = req;

    const paramsSchema = Joi.object({
      id: Joi.number()
        .min(1)
        .required(),
    });

    const { error } = paramsSchema.validate(params, { abortEarly: false });

    if (error) {
      logger.error(url, `failed validate PARAMS payload when POST ${url}`, {
        payload: params,
        error: error.details,
      });

      return res
        .status(422)
        .json(httpResponses.validation(error.details));
    }

    return next();
  },
};
