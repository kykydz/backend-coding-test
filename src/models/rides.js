'use strict';

const db = require('../db/connect').db;
const buildSchemas = require('./schemas');
buildSchemas(db);

const logger = require('../utils/logs').logger;

const sqlRun = (sql, arrayData) => {
    return new Promise((resolve, reject) => {
        db.run(sql, arrayData, err => {
            if (err) {
                logger().log('error', err);
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            } else {
                resolve(true);
            }
        });
    });
};

const sqlAll = sql => {
    return new Promise((resolve, reject) => {
        db.all(sql, (err, rows) => {
            if (err) {
                logger().log('error', err);
                reject({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports.insert = async postDataArray => {
    await sqlRun(
        'INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)',
        postDataArray
    );

    const lastData = await sqlAll('SELECT * FROM Rides ORDER BY rideID DESC LIMIT 1');

    return lastData;
};

module.exports.getAll = async (limit = -1, offset = 0) => {
    const data = await sqlAll(`SELECT * FROM Rides LIMIT ${limit} OFFSET ${offset}`);
    console.log('===============', data);
    if (data.length === 0) {
        logger().log('error', 'No data.');
        return {
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides'
        };
    }
    return data;
};

module.exports.getId = async rideID => {
    const data = await sqlAll(`SELECT * FROM Rides WHERE rideID='${rideID}'`);

    if (data.length === 0) {
        logger().log('error', 'No data.');
        return {
            error_code: 'RIDES_NOT_FOUND_ERROR',
            message: 'Could not find any rides'
        };
    }
    return data;
};
