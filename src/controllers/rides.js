'use strict';

const postRideValidation = require('../middleware/postRideValidation');
const ridesModel = require('../models/rides');

module.exports.health = (req, res) => {
    res.status(200);
    res.send('Healthy');
};

module.exports.postRide = async (req, res) => {
    const postData = {
        startLatitude: Number(req.body.start_lat),
        startLongitude: Number(req.body.start_long),
        endLatitude: Number(req.body.end_lat),
        endLongitude: Number(req.body.end_long),
        riderName: req.body.rider_name,
        driverName: req.body.driver_name,
        driverVehicle: req.body.driver_vehicle
    };

    const isInputValid = postRideValidation.isValid(postData);

    if (isInputValid !== true) {
        res.status(200);
        res.send(isInputValid);
    } else {
        var postDataArray = [
            postData.startLatitude,
            postData.endLatitude,
            postData.startLongitude,
            postData.endLongitude,
            postData.riderName,
            postData.driverName,
            postData.driverVehicle
        ];

        try {
            const dataInserted = await ridesModel.insert(postDataArray);
            res.status(200);
            res.send(dataInserted);
        } catch (error) {
            res.status(200);
            res.send(error);
        }
    }
};

module.exports.getRides = async (req, res) => {
    const listRides = await ridesModel.getAll(req.query.limit, req.query.start);
    res.status(200);
    res.send(listRides);
};

module.exports.getRideId = async (req, res) => {
    const rideData = await ridesModel.getId(req.params.id);
    res.status(200);
    res.send(rideData);
};
