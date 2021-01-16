const ridesRouter = require('express').Router();

const { validateBody, validateParams } = require('../middlewares');
const { ridesControllers } = require('../controllers');

ridesRouter.get(
  '/rides',
  ridesControllers.getRides,
);

ridesRouter.get(
  '/rides/:id',
  validateParams.getRide,
  ridesControllers.getRide,
);

ridesRouter.post(
  '/rides',
  validateBody.submitRide,
  ridesControllers.insertRide,
);

module.exports = ridesRouter;
