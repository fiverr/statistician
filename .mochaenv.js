const chai = require('chai');
const clearModule = require('clear-module');

chai.use(require('chai-string'));

const fixtures = {
	files: {
		before: require('./fixtures/a/files-before.json'),
		after: require('./fixtures/a/files-after.json'),
	},
	bundle: {
		before: require('./fixtures/a/bundle-before.json'),
		after: require('./fixtures/a/bundle-after.json'),
	},
};

Object.assign(
	global,
	chai,
	{
		clearModule,
		fixtures,
	},
);
