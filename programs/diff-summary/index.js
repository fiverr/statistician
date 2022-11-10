const {promisify} = require('util');
const marked = promisify(require('marked'));
const bundles = require('./bundles');
const files = require('./files');

/**
 * Formats a given project name expected to be at under_score format.
 * @param projectName
 * @returns {string}
 */
const formatProjectName = projectName => projectName.split('_')
		.map((part) => [part[0].toUpperCase(), part.slice(1).toLowerCase()].join('') )
		.join(' ');

/**
 * Create the markdown for the pull request
 * @param  {Array} [options.bundle] Two objects (before, after)
 * @param  {Array} [options.files]  Two objects (before, after)
 * @param  {Array} [options.html]
 * @param  {Array} [options.projectName]
 * @return {String}
 */
module.exports = async({bundle, file, html, projectName} = {}) => {
	const result = [];

	bundle && result.push(await bundles(bundle));
	file && result.push(await files(file));

	const diffTitle = !result.length ? 'No file size impact detected'
			: [
					'# File sizes impact summary',
					projectName ? ` (${formatProjectName(projectName)})` : false,
			].filter(Boolean).join('');

	result.unshift(
			diffTitle.trim()
	);

	const output = result.join('\n');

	return html ? (await marked(output.replace('<', '&lt;'), {})).trim() : output;
};
