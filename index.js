'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const rideController = require('./src/controllers/rides');

app.get('/health', rideController.health);
app.post('/rides', jsonParser, rideController.postRide);
app.get('/rides', rideController.getRides);
app.get('/rides/:id', rideController.getRideId);

let server = app.listen(port, () => console.log(`App started and listening on port ${port}`));
module.exports.app = app;

module.exports.stopApp = () => {
    server.close();
};
