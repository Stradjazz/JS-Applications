function isOddOrEven(string) {
    if (typeof(string) !== 'string') {
        return undefined;
    }
    if (string.length % 2 === 0) {
        return "even";
    }

    return "odd";
}

const expect = require('chai').expect;

describe('isOddOrEven', function() {
    it('should return undefined if input is not a string', () => {
        expect(isOddOrEven(123)).to.equal(undefined, 'the input type is not a string');
        expect(isOddOrEven([])).to.equal(undefined, 'the input type is not a string');
        expect(isOddOrEven({})).to.equal(undefined, 'the input type is not a string');
    });

    it('should return even if the length of the input is even', () => {
        expect(isOddOrEven('coco')).to.equal('even');
    });

    it('should return odd if the length of the input is odd', () => {
        expect(isOddOrEven('pop')).to.equal('odd');
    });
});