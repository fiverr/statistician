const {expect} = require('chai');
const reducer = require('.');

describe('reducer', () => {
	let rows;
	beforeEach(() => {
		rows = [];
	});

	it('Should concatenate lines into the row or identical lines', () => {
		rows = reducer(rows, ['key', {before: 100, after: 200}]);
		rows = reducer(rows, ['key', {before: 100, after: 200}]);
		expect(rows).to.have.lengthOf(2);
	});

	it('Should drop similar or identical lines', () => {
		rows = reducer(rows, ['key', {before: 1000, after: 1005}]);
		rows = reducer(rows, ['key', {before: 1000, after: 1000}]);
		expect(rows).to.have.lengthOf(0);
	});
});
