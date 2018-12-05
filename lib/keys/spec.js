const keys = require('.');

describe('keys', () => {
	it('Should return a list of unique keys from all objects', () => {
		expect(
			keys({b:1, c:1}, {c:1, d:1}, {a:1, e:1})
		).to.deep.equal(
			['b', 'c', 'd', 'a', 'e']
		);
	});
});
