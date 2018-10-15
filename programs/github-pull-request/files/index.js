const {expect} = require('chai');
const compare = require('./compare');
const markdown = require('./markdown');
const {getJSON} = require('../../../lib');

/**
 * Create the markdown section for files
 * @param  {String} files
 * @return {String}
 */
module.exports = async function files(stats) {
	const [before, after] = await Promise.all(
		stats
		.split(',')
		.map(stat => getJSON(stat))
	);

	try {
		expect(before).to.not.deep.equal(after);
	} catch (error) {
		return 'Files unchanged';
	}

	return [
		'## Files',
		markdown(
			compare(
				before,
				after
			)
		),
		'> <sup>measured after gzip</sup>',
	].join('\n');
}
