'use strict';

const logger = require('../utils/logs').logger;

exports.isCoordValid = (startLatitude, endLatitude, startLongitude, endLongitude) => {
    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
        logger().log('error', `Coordiante can not be accepted.`);
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        };
    }

    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        logger().log('error', `Coordiante can not be accepted.`);
        return {
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
        };
    }

    return true;
};

exports.isStringValid = (stringKey, stringValue) => {
    if (typeof stringValue !== 'string' || stringValue.length < 1) {
        logger().log('error', `${stringKey} name must be a non empty string`);
        return {
            error_code: 'VALIDATION_ERROR',
            message: `${stringKey} name must be a non empty string`
        };
    }

    return true;
};

exports.isNumberOnly = value => {
    return /^\d+$/.test(value);
};

exports.isNumberWithMinusOnly = value => {
    if (value < -1) {
        return false;
    } else {
        return /^[0-9-]+$/.test(value);
    }
};
