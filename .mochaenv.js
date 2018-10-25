const chai = require('chai');
const clearModule = require('clear-module');

chai.use(require('chai-string'));

Object.assign(
	global,
	chai,
	{
		clearModule,
	}
);
