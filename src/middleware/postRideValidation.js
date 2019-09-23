'use strict';

const inputValidation = require('./inputValidation');

module.exports.isValid = postData => {
    const isCoordValid = inputValidation.isCoordValid(
        postData.startLatitude,
        postData.endLatitude,
        postData.startLongitude,
        postData.endLongitude
    );

    const isRiderNameValid = inputValidation.isStringValid('Rider', postData.riderName);
    const isDriverNameValid = inputValidation.isStringValid('Driver', postData.driverName);
    const isVehicleNameValid = inputValidation.isStringValid('Driver', postData.driverVehicle);

    if (isCoordValid !== true) {
        return isCoordValid;
    }

    if (isRiderNameValid !== true) {
        return isRiderNameValid;
    }

    if (isDriverNameValid !== true) {
        return isDriverNameValid;
    }

    if (isVehicleNameValid !== true) {
        return isVehicleNameValid;
    }

    return true;
};
