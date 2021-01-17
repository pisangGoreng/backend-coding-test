const Joi = require('joi');

const { httpResponses, logger } = require('../helpers');

module.exports = {
  getRide: (req, res, next) => {
    const { query, url } = req;

    const querySchema = Joi.object({
      page: Joi.number()
        .min(1)
        .optional(),
      limit: Joi.number()
        .min(1)
        .optional(),
    });

    const { error } = querySchema.validate(query, { abortEarly: false });
    console.log('🚀 ~ file: validateQuery.js ~ line 19 ~ error', error);

    if (error) {
      logger.error(url, `failed validate QUERY payload when GET ${url} pagination`, {
        payload: query,
        error: error.details,
      });

      return res
        .status(422)
        .json(httpResponses.validation(error.details));
    }

    return next();
  },
};
