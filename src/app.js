const express = require('express');

const app = express();
// const validator = require('express-joi-validation').createValidator({

// })

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const { ridesSchema } = require('./JoiValidations');
const { validateBody } = require('./middlewares');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

module.exports = (db) => {
  app.get('/health', (req, res) => res.send('Healthy'));

  app.post('/rides', validateBody.submitRide, (req, res) => {
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
      function (err) {
        if (err) {
          return res.send({
            error_code: 'SERVER_ERROR',
            message: 'Unknown error',
          });
        }

        db.all(
          'SELECT * FROM Rides WHERE rideID = ?',
          this.lastID,
          (err, rows) => {
            if (err) {
              return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
              });
            }

            res.send(rows);
          },
        );
      },
    );
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

      res.send(rows);
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

        res.send(rows);
      },
    );
  });

  return app;
};
