const healthRouter = require('express').Router();

healthRouter.get('/health', (req, res) => res.send('Healthy'));

module.exports = healthRouter;
