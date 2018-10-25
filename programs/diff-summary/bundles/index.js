const compare = require('./compare');
const markdown = require('./markdown');
const deepEqual = require('../../../lib/deepEqual');
const summarise = require('../../../lib/summarise');

const NO_CHANGES = 'Modules unchanged';
const INSIGNIFICANT = 'No significant modules changes';

/**
 * Create the markdown section for bundles
 * @param  {String} stats
 * @return {String}
 */
module.exports = async function bundles(stats) {
	const [before, after] = stats.map(summarise);

	if (deepEqual(before, after)) {
		return NO_CHANGES;
	}

	const body = markdown(
		compare(
			before,
			after,
		)
	);

	if (body.length === 0) {
		return INSIGNIFICANT;
	}


	return [
		'## Impacted modules',
		body.join('\n\n'),
		'> <sup>raw sizes</sup>',
	].join('\n');
}
