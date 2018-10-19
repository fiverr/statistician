const byteSize = require('byte-size');

module.exports = diff => [
	diff > 0 ? '+' : '',
	byteSize(diff)
].join('');
