'use strict';

const expect = require('chai').expect;
const logger = require('../src/utils/logs').logger();

describe('Utility Test', () => {
    describe('# Logging_Test', () => {
        it('should be object type', () => {
            expect(typeof logger).to.equal('object');
        });
    });
});
