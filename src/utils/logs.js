'use strict';

const { createLogger, format, transports } = require('winston');

module.exports.logger = (services = 'app-rides-log') => {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.errors({ stack: true }),
            format.splat(),
            format.json()
        ),
        defaultMeta: { service: services },
        transports: [
            new transports.File({ filename: 'app-error.log', level: 'error' }),
            new transports.File({ filename: 'app-combined.log' }),
            new transports.Console({
                format: format.combine(format.colorize(), format.simple())
            })
        ]
    });
};
