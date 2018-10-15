const {promisify} = require('util');
const fs = require('fs');
const FUNCTIONS = [
	'readdir',
	'readFile',
	'stat',
];

/**
 * "Promisified" versions of fs functions
 */
module.exports = FUNCTIONS.reduce(
	(accumulator, fn) => Object.assign(
		accumulator,
		{[fn]: promisify(fs[fn])}
	),
	{}
);
