const router = require('express').Router();

const { validateBody, validateParams } = require('../middlewares');
const { ridesControllers } = require('../controllers');

router.get(
  '/rides',
  ridesControllers.getRides,
);

router.get(
  '/rides/:id',
  validateParams.getRide,
  ridesControllers.getRide,
);

router.post(
  '/rides',
  validateBody.submitRide,
  ridesControllers.insertRide,
);

module.exports = router;
