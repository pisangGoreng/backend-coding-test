const Joi = require('joi');

module.exports = Joi.object({
  start_lat: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  start_long: Joi.number()
    .min(-180)
    .max(180)
    .required(),
  end_lat: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  end_long: Joi.number()
    .min(-90)
    .max(90)
    .required(),
  rider_name: Joi.string()
    .alphanum()
    .required(),
  driver_name: Joi.string()
    .alphanum()
    .required(),
  driver_vehicle: Joi.string()
    .alphanum()
    .required(),
});
