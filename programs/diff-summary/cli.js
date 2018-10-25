const program = require('.');
const getJSON = require('../../lib/getJSON');

/**
 * Create the markdown for the pull request
 * @param  {String} [options.bundle] Two file routes separated by comma
 * @param  {String} [options.files]   Two file routes separated by comma
 * @return {String}
 */
module.exports = async({bundle, file, html} = {}) => program({

	// before, after
	bundle: await Promise.all(
		bundle
			.split(',')
			.map(
				file => getJSON(file, null)
			)
	),

	// before, after
	file: await Promise.all(
		file
			.split(',')
			.map(
				file => getJSON(file, null)
			)
	),
	html,
});
