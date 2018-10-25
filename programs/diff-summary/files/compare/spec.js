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
const comparison = compare(before, after);

describe('compare', () => {
	it('Should create the before after for entries', () => {
		expect(comparison['file-b']).to.deep.equal({before: 5, after: 15});
	});
	it('Should omit files that have not changed', () => {
		expect(comparison).to.have.all.keys(['file-b', 'file-c']);
	});
});
