'use strict';
const chai = require('chai');
const inputValidation = require('../src/middleware/inputValidation');

describe('Input Validation Test', () => {
    describe('# Number only should return false', () => {
        chai.expect(inputValidation.isNumberOnly('ad123')).to.equal(false);
    });

    describe('# Number with negative only should return true', () => {
        chai.expect(inputValidation.isNumberWithMinusOnly('-123')).to.equal(false);
    });
});
