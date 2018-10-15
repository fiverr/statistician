const {expect} = require('chai');
const clearModule = require('clear-module');
describe('afsync', async() => {
	let afsync;
	let fs;

	before(() => {
		clearModule('fs')
		fs = require('fs');
		fs.readdir = (dir, options, callback = () => null) => callback(null, 'result');
		fs.stat = (file, options, callback = () => null) => callback(null, new fs.Stats({some: 'stats'}));

		afsync = require('.');
	});
	after(() => clearModule('fs'));

	it('Should convert callback methods to promises', async() => {
		const promise = afsync.readdir('dd', () => null);
		expect(promise.then).to.be.a('function');

		const result = await promise;
		expect(result).to.equal('result');
	});
});
