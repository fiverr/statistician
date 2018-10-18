const {promisify} = require('util');
const marked = promisify(require('marked'));
const bundles = require('./bundles');
const files = require('./files');

module.exports = async({file, bundle, html}) => {
	const result = [];

	bundle && result.push('## Modules', await bundles(bundle), '\n');
	file && result.push('## Files', await files(file), '\n');

	result.unshift(
		result.length ? '# File sizes and bundle summary\n' : 'No stats files'
	);

	const output = result.join('\n');

	return html ? (await marked(output.replace('<', '&lt;'), {})).trim() : output;
}
