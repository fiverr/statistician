const deepEqual = require('.');

describe('deepEqual', () => {
	it('Should compare identical objects', () => {
		expect(deepEqual(
			{a: 1, b: 2, d: {c: 3}},
			{b: 2, a: 1, d: {c: 3}}
		)).to.be.true;
	});
	it('Should compare different object', () => {
		expect(deepEqual(
			{a: 1, b: 2, d: {c: 3}},
			{a: 1, b: 2, d: {}}
		)).to.be.false;
	});
});
