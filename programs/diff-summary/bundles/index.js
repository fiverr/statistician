const compare = require('./compare');
const markdown = require('./markdown');
const {
	deepEqual,
	getJSON,
	summarise,
} = require('../../../lib');

/**
 * Create the markdown section for bundles
 * @param  {String} stats
 * @return {String}
 */
module.exports = async function bundles(stats) {
	const [before, after] = (
		await Promise.all(
			stats
			.split(',')
			.map(stat => getJSON(stat))
		)
	).map(summarise);

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
