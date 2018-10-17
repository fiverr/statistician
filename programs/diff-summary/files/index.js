const compare = require('./compare');
const markdown = require('./markdown');
const {
	deepEqual,
	getJSON,
} = require('../../../lib');

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
