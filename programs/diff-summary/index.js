const {promisify} = require('util');
const marked = promisify(require('marked'));
const bundles = require('./bundles');
const files = require('./files');

/**
 * Create the markdown for the pull request
 * @param  {Array} [options.bundle] Two objects (before, after)
 * @param  {Array} [options.files]  Two objects (before, after)
 * @return {String}
 */
module.exports = async({bundle, file, html} = {}) => {
	const result = [];

	bundle && result.push(await bundles(bundle));
	file && result.push(await files(file));

	result.unshift(
		result.length ? '# File sizes impact summary' : 'No file size impact detected'
	);


	const output = result.join('\n');

	return html ? (await marked(output.replace('<', '&lt;'), {})).trim() : output;
};
