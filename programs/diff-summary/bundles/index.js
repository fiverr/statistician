const compare = require('./compare');
const markdown = require('./markdown');
const {
	deepEqual,
	summarise,
} = require('../../../lib');

/**
 * Create the markdown section for bundles
 * @param  {String} stats
 * @return {String}
 */
module.exports = async function bundles(stats) {
	const [before, after] = stats.map(summarise);

	if (deepEqual(before, after)) {
		return 'Modules unchanged';
	}

	return [
		'## Impacted modules',
		markdown(
			compare(
				before,
				after,
			)
		),
		'> <sup>raw sizes</sup>',
	].join('\n');
}
