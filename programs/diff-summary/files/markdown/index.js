const {extname} = require('path');
const {
	row,
	sortBy,
} = require('../../../../lib');
const reducer = require('./reducer');
const header = ['File', 'Before', 'After', 'Diff'];

/**
 * Output file sizes diff in markdown
 * @param  {Object} data File sizes diff structure
 * @return {String} markdown
 */
module.exports = data => {
	let entries = Object.entries(data);
	entries = sortBy(
		entries,
		([, i]) => i.before,
		{order: 'desc'}
	);
	entries = sortBy(
		entries,
		([i]) => extname(i).replace('.', '')
	);

	const body = entries.reduce(reducer, []);

	if (!body.length) {
		return '';
	}

	return [
		header,
		new Array(header.length).fill('-'),
		...body,
	].map(row)
	.join('\n');
};
