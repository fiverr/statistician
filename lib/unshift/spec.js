const {expect} = require('chai');
const unshift = require('.');

describe('unshift', () => {
	it('Should push items to the top of an array', () => {
		const array = ['a', 'b'];
		unshift(array, 'c', 'd');

		expect(array).to.deep.equal(['c', 'd', 'a', 'b']);
	});
	it('Should return the array', () => {
		expect(unshift(['a', 'b'], 'c', 'd')).to.deep.equal(['c', 'd', 'a', 'b']);
	});
});
