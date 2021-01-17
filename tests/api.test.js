/* eslint-disable no-unused-vars */

// const request = require('supertest');
const mocha = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const should = chai.should();
const { expect } = require('chai');

chai.use(chaiHttp);

const {
  before,
  // should,
  describe,
  it,
} = mocha;

// const app = require('../src/app')(db);
// const buildSchemas = require('../src/schemas');
const server = require('../index');

const testRidePayload = {
  start_lat: 20,
  start_long: 20,
  end_lat: 30,
  end_long: 30,
  rider_name: 'bambang',
  driver_name: 'irwin',
  driver_vehicle: 'expander',
};
let testRideId = 0;

describe('API tests', () => {
  describe('GET | /health', () => {
    it('should return health', (done) => {
      chai.request(server)
        .get('/api/v1/health')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe('POST | /rides | insert new ride', () => {
    it('it should POST a ride', (done) => {
      chai.request(server)
        .post('/api/v1/rides')
        .send(testRidePayload)
        .end((err, res) => {
          testRideId = res.body.results.ride_id;

          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.results.should.have.property('start_lat').eql(testRidePayload.start_lat);
          res.body.results.should.have.property('start_long').eql(testRidePayload.start_long);
          res.body.results.should.have.property('end_lat').eql(testRidePayload.end_lat);
          res.body.results.should.have.property('end_long').eql(testRidePayload.end_long);
          res.body.results.should.have.property('rider_name').eql(testRidePayload.rider_name);
          res.body.results.should.have.property('driver_name').eql(testRidePayload.driver_name);
          res.body.results.should.have.property('driver_vehicle').eql(testRidePayload.driver_vehicle);

          done();
        });
    });
  });

  describe('GET | /rides | get all ride', () => {
    it('it should GET all the rides', (done) => {
      chai.request(server)
        .get('/api/v1/rides')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.results.rows[0].should.have.property('start_lat');
          res.body.results.rows[0].should.have.property('start_long');
          res.body.results.rows[0].should.have.property('end_lat');
          res.body.results.rows[0].should.have.property('end_long');
          res.body.results.rows[0].should.have.property('rider_name');
          res.body.results.rows[0].should.have.property('driver_name');
          res.body.results.rows[0].should.have.property('driver_vehicle');
          done();
        });
    });
  });

  describe('GET | /rides | get ride with specific id', () => {
    it(`it should GET the ride with rideId = ${testRideId}`, (done) => {
      chai.request(server)
        .get(`/api/v1/rides/${testRideId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message');
          res.body.results.should.have.property('start_lat').eql(testRidePayload.start_lat);
          res.body.results.should.have.property('start_long').eql(testRidePayload.start_long);
          res.body.results.should.have.property('end_lat').eql(testRidePayload.end_lat);
          res.body.results.should.have.property('end_long').eql(testRidePayload.end_long);
          res.body.results.should.have.property('rider_name').eql(testRidePayload.rider_name);
          res.body.results.should.have.property('driver_name').eql(testRidePayload.driver_name);
          res.body.results.should.have.property('driver_vehicle').eql(testRidePayload.driver_vehicle);
          done();
        });
    });
  });

  describe('GET | /rides | get ride with pagination', () => {
    it(`it should GET the ride with rideId = ${testRideId}`, (done) => {
      chai.request(server)
        .get('/api/v1/rides')
        .query({ page: 1, limit: 10 })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.results.should.have.property('items_count');
          res.body.results.should.have.property('count');
          res.body.results.rows[0].should.have.property('start_lat');
          res.body.results.rows[0].should.have.property('start_long');
          res.body.results.rows[0].should.have.property('end_lat');
          res.body.results.rows[0].should.have.property('end_long');
          res.body.results.rows[0].should.have.property('rider_name');
          res.body.results.rows[0].should.have.property('driver_name');
          res.body.results.rows[0].should.have.property('driver_vehicle');
          done();
        });
    });
  });
});
