function lookupChar(string, index) {
    if (typeof(string) !== 'string' || !Number.isInteger(index)) {
        return undefined;
    }
    if (string.length <= index || index < 0) {
        return "Incorrect index";
    }

    return string.charAt(index);
}

const expect = require('chai').expect;

describe('char lookup', function() {
    it('should return undefined with non-string first parameter', () => {
        const actual = lookupChar(123, 3);
        expect(actual).to.equal(undefined, 'the first parameter should be a string');
    });
    it('should return undefined if second parameter is not a number', () => {
        const actual = lookupChar('string', '3');
        expect(actual).to.equal(undefined, 'the second parameter should be a number');
    });
    it('should return undefined if second parameter is not an integer', () => {
        const actual = lookupChar('string', 3.15);
        expect(actual).to.equal(undefined, 'the second parameter should be an integer');
    });
    it('should return an error message if second parameter out of range', function() {
        const actual = lookupChar('string', -3);
        expect(actual).to.equal("Incorrect index", 'the index parameter should be > 0');
    });
    it('should return an error message if index is out of string range', function() {
        const actual = lookupChar('string', 15);
        expect(actual).to.equal("Incorrect index", 'the index parameter should be < length of the first parameter');
    });

    it('should return a char from the indicated index', function() {
        const actual = lookupChar('string', 2);
        expect(actual).to.equal('r');
    });
});