const expect = require('chai').expect;
const PaymentPackage = require('./05.PaymentPackage');

describe ('PaymentPackage', function() {
    let validName = 'My Pack';
    let validValue = 150;

    describe ('Creating instance', function() {

        it ('has valid parameters', () => {
            expect(() => new PaymentPackage(validName, validValue)).to.not.throw();
        });

        it ('throws error with invalid name', () => {
            expect(() => new PaymentPackage('', validValue)).to.throw('Name must be a non-empty string');
            expect(() => new PaymentPackage(1, validValue)).to.throw('Name must be a non-empty string');
            expect(() => new PaymentPackage({}, validValue)).to.throw('Name must be a non-empty string');
            expect(() => new PaymentPackage([], validValue)).to.throw('Name must be a non-empty string');
            expect(() => new PaymentPackage(null, validValue)).to.throw('Name must be a non-empty string');
            expect(() => new PaymentPackage(undefined, validValue)).to.throw('Name must be a non-empty string');
        });

        it ('throws error with invalid value', () => {
            expect(() => new PaymentPackage(validName, -2)).to.throw('Value must be a non-negative number');
            expect(() => new PaymentPackage(validName, '123')).to.throw('Value must be a non-negative number');
            expect(() => new PaymentPackage(validName, [])).to.throw('Value must be a non-negative number');
            expect(() => new PaymentPackage(validName, {})).to.throw('Value must be a non-negative number');
            expect(() => new PaymentPackage(validName, null)).to.throw('Value must be a non-negative number');
            expect(() => new PaymentPackage(validName, undefined)).to.throw('Value must be a non-negative number');
        });

        it ('has all properties', () => {
            let instance = new PaymentPackage(validName, validValue);

            expect(instance).to.have.property('name');
            expect(instance).to.have.property('value');
            expect(instance).to.have.property('VAT');
            expect(instance).to.have.property('active');
        });

        it ('checks the correct setup of the accessor values', () => {
            let instance = new PaymentPackage(validName, validValue);
            expect(instance.name).to.equal(validName);
            expect(instance.value).to.equal(validValue);
            expect(instance.VAT).to.equal(20);
            expect(instance.active).to.equal(true);
        });
    });

    describe ('Accessors', function() {

        let instance = null;

        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });

        it ('throws error if invalid name', () => {
            expect(() => instance.name = 123).to.throw('Name must be a non-empty string');
            expect(() => instance.name = null).to.throw('Name must be a non-empty string');
            expect(() => instance.name = undefined).to.throw('Name must be a non-empty string');
            expect(() => instance.name = '').to.throw('Name must be a non-empty string');
            expect(() => instance.name = {}).to.throw('Name must be a non-empty string');
        });

        it ('accepts valid name', () => {
            expect(() => instance.name = validName).to.not.throw();
            expect(instance.name).to.equal('My Pack');
        });

        it ('throws error if invalid value', () => {
            expect(() => instance.value = '123').to.throw('Value must be a non-negative number');
            expect(() => instance.value = null).to.throw('Value must be a non-negative number');
            expect(() => instance.value = undefined).to.throw('Value must be a non-negative number');
            expect(() => instance.value = -5).to.throw('Value must be a non-negative number');
            expect(() => instance.value = {}).to.throw('Value must be a non-negative number');
        });

        it ('accepts valid value', () => {
            expect(() => instance.value = validValue).to.not.throw();
            expect(instance.value).to.equal(150);
            
            expect(() => instance.value = 0).to.not.throw();
            expect(instance.value).to.equal(0);
        });
        
        it ('throws error if invalid VAT', () => {
            expect(() => instance.VAT = '123').to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = null).to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = undefined).to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = -5).to.throw('VAT must be a non-negative number');
            expect(() => instance.VAT = {}).to.throw('VAT must be a non-negative number');
        });

        it ('accepts valid VAT', () => {
            expect(() => instance.VAT = 20).to.not.throw();
            expect(instance.VAT).to.equal(20);

            expect(() => instance.VAT = 0).to.not.throw();
            expect(instance.VAT).to.equal(0);
        });

        it ('throws error if invalid active', () => {
            expect(() => instance.active = '123').to.throw('Active status must be a boolean');
            expect(() => instance.active = null).to.throw('Active status must be a boolean');
            expect(() => instance.active = undefined).to.throw('Active status must be a boolean');
            expect(() => instance.active = -5).to.throw('Active status must be a boolean');
            expect(() => instance.active = {}).to.throw('Active status must be a boolean');
        });

        it ('accepts valid active', () => {
            expect(() => instance.active = true).to.not.throw();
            expect(instance.active).to.equal(true);

            expect(() => instance.active = false).to.not.throw();
            expect(instance.active).to.equal(false);
        });
    });

    describe ('toString', function() {
        let instance = null;

        beforeEach(() => {
            instance = new PaymentPackage(validName, validValue);
        });

        it ('contains a valid name', () => {
            expect(instance.toString()).to.contain(validName);
        });

        it ('contains a valid value', () => {
            expect(instance.toString()).to.contain(validValue.toString());
        });

        it ('contains a valid VAT', () => {
            expect(instance.toString()).to.contain(instance.VAT + '%');
        });

        it ('checks the label of active', () => {
            instance.active = false;
            expect(instance.toString()).to.contain(validName + ' (inactive)');    
        });

        it ('checks the correct VAT calculation', () => {
            instance.VAT = 20;
            instance.value = 1500;
            expect(instance.toString()).to.contain('Value (VAT 20%): 1800');
        });
    });

});