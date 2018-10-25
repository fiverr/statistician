const {expect} = require('chai');

describe('files', async() => {
	let files;

	before(() => {
		files = require('.');
	});

	it('Should claim "unchanged" when the objects are identical', async() => {
		const result = await files([
			{one: 1000, two: 1000},
			{one: 1000, two: 1000},
		]);
		expect(result).to.include('Files unchanged');
		expect(result).to.not.include('\n');
	});

	it('Should claim "unsignificant" when the objects are extremely close', async() => {
		const result = await files([
			{one: 1001, two: 1000},
			{one: 1000, two: 1001},
		]);
		expect(result).to.include('No significant');
		expect(result).to.not.include('\n');
	});

	it('Should build a table if there are differences', async() => {
		const result = await files([
			{one: 1000, two: 1000},
			{one: 1000, two: 2000},
		]);
		expect(result).to.include('\n');
	});
});
