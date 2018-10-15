const bundles = require('../bundles');
const files = require('../files');

/**
 * Create the markdown for the pull request
 * @param  {String} [options.bundle] Two file routes separated by comma
 * @param  {String} [options.files]   Two file routes separated by comma
 * @return {String}
 */
module.exports = async({bundle, file} = {}) => {
	const result = ['# File sizes impact summary'];

	bundle && result.push(await bundles(bundle));
	file && result.push(await files(file));

	return result.join('\n');
};





