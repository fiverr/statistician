const markdown = require('./markdown');
const deepEqual = require('../../../lib/deepEqual');
const keys = require('../../../lib/keys');

const NO_CHANGES = 'Files unchanged';
const INSIGNIFICANT = 'No significant file changes';

/**
 * Create the markdown section for files
 * @param  {String} files
 * @return {String}
 */
module.exports = async function files([before, after]) {
	if (deepEqual(before, after)) {
		return;
	}

	const comparison = compare(before, after);

	const filesTable = markdown(comparison);

	if (!filesTable) {
		return;
	}

	return [
		'## Impacted files',
		filesTable,
	].join('\n');
};

/**
 * Merge two files stats to one before and after struct
 * @param  {Object} before
 * @param  {Object} after
 * @return {Object}
 */
const compare = (before, after) => keys(before, after)
	.filter(key => before[key] !== after[key])
	.reduce(
		(accumulator, key) => Object.assign(
			accumulator,
			{
				[key]: {
					before: before[key] || 0,
					after: after[key] || 0,
				},
			}
		),
		{}
	);
