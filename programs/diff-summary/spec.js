describe('diff-summary', () => {
	let diffSummary;
	before(() => {
		require('chunkalyse');
		require.cache[require.resolve('chunkalyse')].exports = input => input;
		diffSummary = require('.');
	});
	after(() => {
		delete require.cache[require.resolve('chunkalyse')];
	});

	it('Should report no file size impact', async() => {
		expect(await diffSummary()).to.equalIgnoreCase('No file size impact detected')
	});
	it('Should compare files', async() => {
		const result = await diffSummary({file: [fixtures.files.before, fixtures.files.after]});
		expect(result).to.containIgnoreCase('File sizes impact summary');
		expect(result).to.containIgnoreCase('Impacted files');
		expect(result).to.containIgnoreCase('| File | Before | After | Diff');
		expect(result.split('\n').length).to.gt(4);
	});
	it('Should not include impacted files', async() => {
		const result = await diffSummary({file: [fixtures.files.before, fixtures.files.after]});
		expect(result).not.to.containIgnoreCase('Impacted modules');
	});
	it('Should compare bundle', async() => {
		const result = await diffSummary({bundle: [fixtures.bundle.before, fixtures.bundle.after]});
		expect(result).to.containIgnoreCase('File sizes impact summary');
		expect(result).to.containIgnoreCase('Impacted modules');
		expect(result.split('\n').length).to.gt(4);
	});
	it('Should not include impacted modules', async() => {
		const result = await diffSummary({bundle: [fixtures.bundle.before, fixtures.bundle.after]});
		expect(result).not.to.containIgnoreCase('Impacted files');
	});
});

