'use strict';

const expect = require('chai').expect;
const ridesModels = require('../src/models/rides');

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../src/models/schemas');

describe('SQL test', () => {
    before(done => {
        db.serialize(err => {
            if (err) {
                return done(err);
            }
            buildSchemas(db);
            done();
        });
    });

    describe('# Negative Test - SQL runQuery test', () => {
        it('given wrong SQL runQuery statement should return SERVER_ERROR', done => {
            ridesModels
                .sqlRun('INSERT INTO Ride', [1, 2, 3, 4, 5])
                .then(result => {
                    expect(result).to.have.property('error_code', 'SERVER_ERROR');
                })
                .catch(err => {
                    done();
                });
        });
    });

    describe('# Negative Test - SQL runAll test', () => {
        it('given wrong SQL runAll statement should return SERVER_ERROR', done => {
            ridesModels
                .sqlAll('INSERT INTO Ride')
                .then(result => {
                    expect(result).to.have.property('error_code', 'SERVER_ERROR');
                })
                .catch(err => {
                    done();
                });
        });
    });

    describe('# Positive Test - SQL getAll test', () => {
        it('given sql statement with no data should RIDES_NOT_FOUND_ERROR', async () => {
            await ridesModels.sqlRun('DELETE FROM Rides WHERE rideID=?', 1);
            const result = await ridesModels.getAll(-1, 0);

            expect(result).to.have.property('error_code', 'RIDES_NOT_FOUND_ERROR');
        });
    });
});
