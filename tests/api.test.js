'use strict';

const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const app = require('../index').app;
// const app = 'http://localhost:8010';
const buildSchemas = require('../src/models/schemas');

describe('API tests', () => {
    before(done => {
        db.serialize(err => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe('GET /rides', () => {
        it('should return no rides data', done => {
            request(app)
                .get('/rides')
                .expect('Content-Type', /json/)
                .expect(res => {
                    res.body.error_code = 'RIDES_NOT_FOUND_ERROR';
                })
                .expect(200, done);
        });
    });

    describe('GET /health', () => {
        it('should return health', done => {
            request(app)
                .get('/health')
                .expect('Content-Type', /text/)
                .expect(200, done);
        });
    });

    describe('POST /rides', () => {
        describe('# Positive Case', () => {
            it('should return 200', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: 80,
                        end_lat: 80,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 'rider_koko',
                        driver_name: 'driver_koko',
                        driver_vehicle: 'vehicle_jet12'
                    })
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error_code : VALIDATION_ERROR on start_lat=-99', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: -99,
                        end_lat: 80,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 'rider_koko',
                        driver_name: 'driver_koko',
                        driver_vehicle: 'vehicle_jet12'
                    })
                    .expect(res => {
                        res.body.error_code = 'VALIDATION_ERROR';
                    })
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error_code : VALIDATION_ERROR on end_lat=-99', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: 80,
                        end_lat: -99,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 'rider_koko',
                        driver_name: 'driver_koko',
                        driver_vehicle: 'vehicle_jet12'
                    })
                    .expect(res => {
                        res.body.error_code = 'VALIDATION_ERROR';
                    })
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error_code : VALIDATION_ERROR on rider_name not string', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: 80,
                        end_lat: 80,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 123,
                        driver_name: 'driver_koko',
                        driver_vehicle: 'vehicle_jet12'
                    })
                    .expect(res => {
                        res.body.error_code = 'VALIDATION_ERROR';
                    })
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error_code : VALIDATION_ERROR on driver_name not string', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: 80,
                        end_lat: 80,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 'rider_koko',
                        driver_name: 123,
                        driver_vehicle: 'vehicle_jet12'
                    })
                    .expect(res => {
                        res.body.error_code = 'VALIDATION_ERROR';
                    })
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error_code : VALIDATION_ERROR on driver_name not string', done => {
                request(app)
                    .post('/rides')
                    .set('content-type', 'application/json')
                    .send({
                        start_lat: 80,
                        end_lat: 80,
                        start_long: 80,
                        end_long: 80,
                        rider_name: 'rider_koko',
                        driver_name: 'driver_koko',
                        driver_vehicle: 123
                    })
                    .expect(res => {
                        res.body.error_code = 'VALIDATION_ERROR';
                    })
                    .expect(200, done);
            });
        });
    });

    describe('GET /rides', () => {
        it('should return list all rides', done => {
            request(app)
                .get('/rides?start=0&limit=3')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /rides/:id', () => {
        describe('# Positive Case', () => {
            it('should return data ride with id 1', done => {
                request(app)
                    .get('/rides/1')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
        });

        describe('# Negative Case', () => {
            it('should return error data not found id 999', done => {
                request(app)
                    .get('/rides/999')
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        res.body.error_code = 'RIDES_NOT_FOUND_ERROR';
                    })
                    .expect(200, done);
            });
        });
    });

    after(async () => {
        require('../index').stopApp();
    });
});
