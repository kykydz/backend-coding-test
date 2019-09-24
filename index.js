'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 8010;

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const ridesController = require('./src/controllers/rides');

/**
 * Primary routes for current project
 */
app.get('/health', ridesController.health);

app.listen(port, function() {
    console.log('Running RestHub on port ' + port);
});
