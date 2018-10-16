const {expect} = require('chai');
const compare = require('./compare');
const markdown = require('./markdown');
const {
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

	try {
		expect(before).to.not.deep.equal(after);
	} catch (error) {
		return 'Modules unchanged';
	}

	return [
		'## Modules',
		markdown(
			compare(
				before,
				after,
			)
		),
		'> <sup>raw sizes</sup>',
	].join('\n');
}
