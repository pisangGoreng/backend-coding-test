const express = require('express');

const app = express();
// const winston = require('winston');

// const logger = winston.createLogger({
//   transports: [
//     new winston.transports.Console(),
//   ],
// });

const bodyParser = require('body-parser');

const { validateBody } = require('./middlewares');
const { logger } = require('./helpers');
// const logger = ;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// app.use((req, res, done) => {
//   logger.info(req.originalUrl);
//   done();
// });

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', validateBody.submitRide, (req, res) => {
    const path = '/rides';

    logger.info(path, 'add new record on rides table', req.body);

    const {
      start_lat: startLatitude,
      start_long: startLongitude,
      end_lat: endLatitude,
      end_long: endLongitude,
      rider_name: riderName,
      driver_name: driverName,
      driver_vehicle: driverVehicle,
    } = req.body;

    // console.log(req.body);

    const values = [
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude,
      riderName,
      driverName,
      driverVehicle,
    ];

    const result = db.run(
      'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
      values,
      (err) => {
        if (err) {
          return res.send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        db.all(
          'SELECT * FROM Rides WHERE rideID = ?',
          this.lastID,
          (error, rows) => {
            if (err) {
              return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
              });
            }

            return res.send(rows);
          },
        );

        return result;
      },
    );
    console.log('🚀 ~ file: app.js ~ line 87 ~ app.post ~ result', result);
  });

  app.get('/rides', (req, res) => {
    db.all('SELECT * FROM Rides', (err, rows) => {
      if (err) {
        return res.send({
          error_code: 'SERVER_ERROR',
          message: 'Unknown error',
        });
      }

      if (rows.length === 0) {
        return res.send({
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        });
      }

      return res.send(rows);
    });
  });

  app.get('/rides/:id', (req, res) => {
    db.all(
      `SELECT * FROM Rides WHERE rideID='${req.params.id}'`,
      (err, rows) => {
        if (err) {
          return res.send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        if (rows.length === 0) {
          return res.send({
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides',
          });
        }

        return res.send(rows);
      },
    );
  });

  return app;
};
