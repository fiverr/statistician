const {expect} = require('chai');
const clearModule = require('clear-module');
const goodObject = {
	a: 1,
	b: 2,
};

describe('getJSON', async() => {
	let afsync;
	let getJSON;
	const _error = console.error;

	before(() => {
		clearModule('../afsync')
		afsync = require('../afsync');
		afsync.readFile = async path => new Promise(resolve => setTimeout(() => {
			switch (path) {
				case 'good-file':
					resolve(Buffer.from(JSON.stringify(goodObject)));
					break;
				default:
					resolve('Not JSON');
					break;
			}
		}, 2));

		getJSON = require('.');
	});
	afterEach(() => {
		console.error = _error;
	});
	after(() => clearModule('../afsync'));

	it('Should return objects from JSON files', async() => {
		expect(await getJSON('good-file')).to.deep.equal(goodObject);
	});
	it('Should default to an empty object', async() => {
		expect(await getJSON('something-else')).to.deep.equal({});
	});
	it('Should accept a second argument for failed return', async() => {
		expect(await getJSON('something-else', null)).to.equal(null);
	});
	it('Should write to console', async() => {
		let called = false;
		console.error = function(...args) {
			called = true;
			_error.apply(console, args);
		}
		await getJSON('something-else');
		expect(called).to.be.true;
	});
});
