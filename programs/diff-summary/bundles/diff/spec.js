const diff = require('.');

describe('diff', () => {
	it('Should calculate the diff percentage', () => {
		expect(diff({size: 100}, {size: 99})).to.equal('-1%');
	});
	it('Should return the number zero when there is no diff', () => {
		expect(diff({size: 99}, {size: 99})).to.equal(0);
	});
	it('Should add a plus sign for size increase', () => {
		expect(diff({size: 100}, {size: 101})).to.equal('+1%');
	});
	it('Should round diffs', () => {
		expect(diff({size: 1000}, {size: 1004})).to.equal(0);
	});
});
