const {expect} = require('chai');
const sizeDiff = require('.');

describe('sizeDiff', () => {
	it('Should prefix positive numbers with plus sign (increase in size)', () => {
		expect(sizeDiff(1000)).to.equal('+1.0 kB');
	});
	it('Should convert negative numbers correctly (decrease in size)', () => {
		expect(sizeDiff(-1000)).to.equal('-1.0 kB');
	});
	it('Should have no sign when there is no change', () => {
		expect(sizeDiff(0)).to.equal('0');
	});
});
