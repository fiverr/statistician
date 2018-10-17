const {expect} = require('chai');
const compare = require('.');

const before = {
	'module-a': {
		self: 10000,
		something: 5000,
		'something-else': 3000,
		__TOTAL_SIZE__: 18000,
	},
	'module-b': {
		self: 20000,
		something: 10000,
		__TOTAL_SIZE__: 30000,
	},
	'module-c': {
		self: 10000,
		__TOTAL_SIZE__: 10000,
	},
};
const after = {
	'module-a': {
		self: 15000,
		something: 10000,
		'something-else': 3000,
		__TOTAL_SIZE__: 28000,
	},
	'module-c': {
		self: 10000,
		__TOTAL_SIZE__: 10000,
	},
};

describe('compare', () => {
	const results = compare(before, after);

	it('Should create the before after object', () => {
		expect(results['module-a']['self']).to.deep.equal({before: 10000, after: 15000});
		expect(results['module-a'].something).to.deep.equal({before: 5000, after: 10000});
		expect(results['module-b'].something).to.deep.equal({before: 10000, after: 0});
	});
	it('Should omit un changed modules', () => {
		expect(results['module-a']).to.not.have.keys(['something-else']);
	});
	it('Should omit un changed dependencies', () => {
		expect(results).to.not.have.keys(['module-c']);
	});
	it('Should have a __TOTAL_SIZE__ poperty', () => {
		expect(results['module-a'].__TOTAL_SIZE__.before).to.be.a('number');
		expect(results['module-a'].__TOTAL_SIZE__.after).to.be.a('number');
	});
	it('__TOTAL_SIZE__ should not be enumerable', () => {
		expect(Object.keys(results['module-a'])).to.not.include('__TOTAL_SIZE__');
		expect(Object.keys(results['module-a'])).to.not.include('__TOTAL_SIZE__');
	});
});
