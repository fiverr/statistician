const tomd = require('.');

describe('tomd', () => {
	it('Should convert array of similar objects to a table', () => {
		expect(tomd([
			{a: 1, b: 2, c: 3},
			{a: 2, b: 3, c: 4},
			{a: 3, b: 4, c: 5},
		])).to.equal(
`| a | b | c
| - | - | -
| 1 | 2 | 3
| 2 | 3 | 4
| 3 | 4 | 5`
);
	});
});
