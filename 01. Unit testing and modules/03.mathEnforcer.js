const { expect } = require("chai");

let mathEnforcer = {
    addFive: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num + 5;
    },
    subtractTen: function (num) {
        if (typeof(num) !== 'number') {
            return undefined;
        }
        return num - 10;
    },
    sum: function (num1, num2) {
        if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
            return undefined;
        }
        return num1 + num2;
    }
};

describe('mathEnforcer', function() {
    describe('addFive', function() {
        it('should return undefined with a non-number parameter', () => {
            let actual = mathEnforcer.addFive('5');
            expect(actual).to.equal(undefined, 'the parameter should be a number');
        });

        it('should return correct answer with negative number', () => {
            let actual = mathEnforcer.addFive(-5);
            expect(actual).to.equal(0);
        });

        it('should return correct answer with positive number', () => {
            let actual = mathEnforcer.addFive(5);
            expect(actual).to.equal(10);
        });

        it('should return correct answer with floating point number', () => {
            let actual = mathEnforcer.addFive(0.11);
            expect(actual).to.be.closeTo(5.11, 0.01);
        });

        it('should return correct answer with negative floating point number', () => {
            let actual = mathEnforcer.addFive(-3.55);
            expect(actual).to.be.closeTo(1.45, 0.01);
        });

        
    });

    describe('subtractTen', function() {
        it('should return undefined with a non-number parameter', () => {
            let actual = mathEnforcer.subtractTen('5');
            expect(actual).to.equal(undefined, 'the parameter should be a number');
        });
        
        it('should return correct answer with negative number', () => {
            let actual = mathEnforcer.subtractTen(-5);
            expect(actual).to.equal(-15);
        });

        it('should return correct answer with positive number', () => {
            let actual = mathEnforcer.subtractTen(15);
            expect(actual).to.equal(5);
        });

        it('should return correct answer with floating point number', () => {
            let actual = mathEnforcer.subtractTen(1.55);
            expect(actual).to.be.closeTo(-8.45, 0.01);
        });

        it('should return correct answer with negative floating point number', () => {
            let actual = mathEnforcer.subtractTen(-3.55);
            expect(actual).to.be.closeTo(-13.55, 0.01);
        });
    });

    describe('sum', function() {
        it('should return undefined with a non-number first parameter', () => {
            let actual = mathEnforcer.sum('5', 5);
            expect(actual).to.equal(undefined, 'the first parameter should be a number');
        });

        it('should return undefined with a non-number second parameter', () => {
            let actual = mathEnforcer.sum(5, '5');
            expect(actual).to.equal(undefined, 'the second parameter should be a number');
        });

        it('should return undefined with non-number parameters', () => {
            let actual = mathEnforcer.sum('5', '5');
            expect(actual).to.equal(undefined, 'the second parameters should be numbers');
        });
        
        it('should return correct answer with negative number as first param', () => {
            let actual = mathEnforcer.sum(-5, 10);
            expect(actual).to.equal(5);
        });

        it('should return correct answer with negative number as second param', () => {
            let actual = mathEnforcer.sum(10, -5);
            expect(actual).to.equal(5);
        });

        it('should return correct answer with positive numbers', () => {
            let actual = mathEnforcer.sum(5, 5);
            expect(actual).to.equal(10);
        });

        it('should return correct answer with negative numbers', () => {
            let actual = mathEnforcer.sum(-5, -5);
            expect(actual).to.equal(-10);
        });

        it('should return correct answer with floating point numbers', () => {
            let actual = mathEnforcer.sum(5.1, 0.1);
            expect(actual).to.be.closeTo(5.2, 0.01);
        });

        it('should return correct answer with negative floating point numbers', () => {
            let actual = mathEnforcer.sum(-5.55, -5);
            expect(actual).to.be.closeTo(-10.55, 0.01);
        });
        it('should return correct answer with negative and positive floating point numbers', () => {
            let actual = mathEnforcer.sum(-5.55, 5);
            expect(actual).to.be.closeTo(-0.55, 0.01);
        });
    });
});