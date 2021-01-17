const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const routes = require('./routes');

const app = express();
const path = '/api/v1';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(path, routes.ridesRouter);
app.use(path, routes.healthRouter);

module.exports = app;
