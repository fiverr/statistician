const { basename } = require('path');
const finger = require('fingerprinting');
const { readFile } = require('../afsync');

/**
 * Removes the hashed part of a file path string
 * @param  {String} path File path
 * @return {String}
 */
const removeHash = (path) => (
    path.replace(/\.[a-f0-9]{20}\.(js|css|js.LICENSE.txt)$/, '.\$1')
);

/**
 * Removes the fingerprint part of a file path string
 * @param  {String} path File path
 * @return {String}
 */
module.exports = async function removeFingerprint(path) {
	const content = await readFile(path);
	const {id} = finger(
		basename(path),
		{content}
	);

    console.log(path);

    const cleanedPath = path.split('.').filter(part => !id.startsWith(part)).join('.');

	return removeHash(cleanedPath);
}
