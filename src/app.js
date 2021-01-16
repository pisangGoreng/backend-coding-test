const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = () => {
  app.use(routes.ridesRouter);
  app.use(routes.healthRouter);

  return app;
};
