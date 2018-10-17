const {extname} = require('path');
const byteSize = require('byte-size');
const {
	diff,
	row,
	sortBy,
} = require('../../../../lib');

/**
 * Output file sizes diff in markdown
 * @param  {Object} data File sizes diff structure
 * @return {String} markdown
 */
module.exports = data => sort(Object.entries(data))
	.reduce(
		(rows, [key, {before, after}]) => [
			...rows,
			[key, byteSize(before), byteSize(after), diff(before, after)],
		],
		[
			['File', 'Before', 'After', 'Diff'],
			[...new Array(4).fill('-')],
		]
	)
	.map(row)
	.join('\n');

/**
 * Sort entries by size (desc) and then by file type
 * @param  {Object} entries
 * @return {Object}
 */
function sort(entries) {
	entries = sortBy(
		entries,
		([, i]) => i.before,
		{order: 'desc'}
	);
	entries = sortBy(
		entries,
		([i]) => extname(i).replace('.', '')
	);
	return entries;
}
