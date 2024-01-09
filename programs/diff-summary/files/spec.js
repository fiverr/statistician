describe('files', async() => {
	let files;

	before(() => {
		files = require('.');
	});

	it('Should return undefined when the objects are identical', async() => {
		const result = await files([
			{one: 1000, two: 1000},
			{one: 1000, two: 1000},
		]);
		expect(result).to.equal(undefined);
	});

	it('Should return undefined when the objects are extremely close', async() => {
		const result = await files([
			{one: 1001, two: 1000},
			{one: 1000, two: 1001},
		]);
		expect(result).to.equal(undefined);
	});

	it('Should build a table if there are differences', async() => {
		const result = await files([
			{one: 1000, two: 1000},
			{one: 1000, two: 2000},
		]);
		expect(result).to.include('\n');
	});
});
