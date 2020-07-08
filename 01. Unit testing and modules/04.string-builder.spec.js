/* eslint-disable no-undef */
const StringBuilder = require('./04.string-builder');
const expect = require('chai').expect;
const assert = require('chai').assert;

let validString = 'hello';
let validValue = 3;
let myObject = null;

describe('class StringBuilder', function () {
    describe('constructor', function () {
        
        it('should test with string', function () {
            let myObject = new StringBuilder('hello');
            expect(myObject).to.have.property('_stringArray').with.lengthOf(5);
        });
        // eslint-disable-next-line no-undef
        it('should test with empty value', function () {
            let myObject = new StringBuilder();
            expect(myObject).to.have.property('_stringArray').with.lengthOf(0);
        });
        it('should test with wrong parameter', function () {
            expect(() => new StringBuilder(1)).to.Throw('Argument must be string');
        });
    });

    describe('append', function () {
        
        beforeEach(() => {
            myObject = new StringBuilder(validString);
        });

        it('should test with invalid parameter', function () {
            expect(() => myObject.append(1)).to.Throw('Argument must be string');
        });
        it('should test the new length', function () {
            myObject.append('T');
            expect(myObject).to.have.property('_stringArray').with.lengthOf(6);
        });
        it('should test if added at the end', function () {
            myObject.append('T');
            expect(myObject._stringArray[5]).to.equal('T');
        });
    });
    describe('prepend', function () {
        beforeEach(() => {
            myObject = new StringBuilder(validString);
        });

        it('should test invalid param', function () {
            expect(() => myObject.prepend(1)).to.Throw('Argument must be string');
        });
        it('should test the new length', function () {
            myObject.prepend('x');
            expect(myObject).to.have.property('_stringArray').with.lengthOf(6);
        });
        it('should test if added at the beginning', function () {
            myObject.prepend('x');
            expect(myObject._stringArray[0]).to.equal('x');
        });
    });
    describe('insertAt', function () {
        beforeEach(() => {
            myObject = new StringBuilder(validString);
        });
        it('should test invalid param', function () {
            expect(() => myObject.insertAt(1, 1)).to.Throw('Argument must be string');
        });
        it('should test new length', function () {
            myObject.insertAt('ZX', 1);
            expect(myObject).to.have.property('_stringArray').with.lengthOf(7);
        });
        it('should test if the string is inserted at index', function () {
            myObject.insertAt('ZX', 1);
            expect(myObject._stringArray[1]).to.equal('Z');
        });
    });
    describe('remove', function () {
        beforeEach(() => {
            myObject = new StringBuilder(validString);
        });
        it('should test new length', function () {
            myObject.remove(1, 1);
            expect(myObject).to.have.property('_stringArray').with.lengthOf(4);
        });
        it('should test result', function () {
            myObject.remove(1, 1);
            expect(myObject._stringArray.join('')).to.equal('hllo');
        });
        it('should test result', function () {
            myObject.remove(1, 2);
            expect(myObject._stringArray.join('')).to.equal('hlo');
        });
    });
    describe('toString', function () {
        it('should test if joined', function () {
            let result = new StringBuilder('test');
            expect(result.toString()).to.equal('test');
        });
    });
    describe('Type of StringBuilder', function () {
        it('should test if StringBuilder exists', function () {
            expect(StringBuilder).to.exist;
        });
        it('should test StringBuilder type', function () {
            expect(typeof StringBuilder).to.equal('function');
        });
        it('should have the correct function properties', function () {
            assert.isFunction(StringBuilder.prototype.append);
            assert.isFunction(StringBuilder.prototype.prepend);
            assert.isFunction(StringBuilder.prototype.insertAt);
            assert.isFunction(StringBuilder.prototype.remove);
            assert.isFunction(StringBuilder.prototype.toString);
        });
        it('full test', function () {
            let str = new StringBuilder('hello');
            str.append(', there');
            str.prepend('User, ');
            str.insertAt('woop',5 );
            str.remove(6, 3);

            expect(str.toString()).to.equal('User,w hello, there');
        });
    });
});