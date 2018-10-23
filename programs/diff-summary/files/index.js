const compare = require('./compare');
const markdown = require('./markdown');
const {
	deepEqual,
} = require('../../../lib');

/**
 * Create the markdown section for files
 * @param  {String} files
 * @return {String}
 */
module.exports = async function files([before, after]) {
	if (deepEqual(before, after)) {
		return 'Files unchanged';
	}

	return [
		'## Impacted files',
		markdown(
			compare(
				before,
				after
			)
		),
		'> <sup>measured after gzip</sup>',
	].join('\n');
}
