const flatten = require('.');

describe('flatten', () => {
	it('Should flatten an array of arrays nested array', () => {
		expect(flatten(
			[
				[1, 2, 3],
				[1, 2, 3],
				[1, 2, 3],
			]
		)).to.deep.equal(
			[1, 2, 3, 1, 2, 3, 1, 2, 3]
		);
	});
	it('Should leave an array of mixed items as is', () => {
		expect(flatten(
			[
				[1, 2, 3],
				[1, 2, 3],
				'a',
			]
		)).to.deep.equal(
			[
				[1, 2, 3],
				[1, 2, 3],
				'a',
			]
		);
	});
});
