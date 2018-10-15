const {
	readFile,
} = require('../afsync');
const {promisify} = require('util');
const gzip = promisify(require('zlib').gzip);
const options = {level: 9};

/**
 * Get byte size of a file after its been gzipped
 * @param  {String} path
 * @return {Number}
 */
module.exports = async path => {
	try {
		const buffer = await readFile(path);
		const {byteLength} = await gzip(buffer, options);
		return byteLength;
	} catch (error) {
		return 0;
	}
}
