const {expect} = require('chai');
const compare = require('.');

const before = {
	'file-a': 10,
	'file-b': 5,
};
const after = {
	'file-a': 10,
	'file-b': 15,
	'file-c': 12,
};

describe('compare', () => {
	it('Should create the before after object', () => {
		expect(compare(before, after)).to.deep.equal({
			'file-a': {before: 10, after: 10},
			'file-b': {before: 5, after: 15},
			'file-c': {before: 0, after: 12},
		});
	});
});
