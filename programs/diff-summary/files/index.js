const compare = require('./compare');
const markdown = require('./markdown');
const {
	deepEqual,
} = require('../../../lib');

const NO_CHANGES = 'Files unchanged';
const INSIGNIFICANT = 'No significant file changes';

/**
 * Create the markdown section for files
 * @param  {String} files
 * @return {String}
 */
module.exports = async function files([before, after]) {
	if (deepEqual(before, after)) {
		return NO_CHANGES;
	}

	const filesTable = markdown(
		compare(
			before,
			after
		)
	);

	if (!filesTable) {
		return INSIGNIFICANT;
	}

	return [
		'## Impacted files',
		filesTable,
		'> <sup>measured after gzip</sup>',
	].join('\n');
}
