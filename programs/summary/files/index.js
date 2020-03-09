const byteSize = require('byte-size');
const row = require('../../../lib/row');
const sortBy = require('../../../lib/sortBy');

/**
 * Output file sizes diff in markdown
 * @param  {String} route to stats file
 * @return {String}
 */
module.exports = async data => sortBy(
		Object.entries(data),
		([, size]) => size,
		{order: 'desc'}
	)
	.reduce(
		(rows, [name, size]) => [
			...rows,
			[name, byteSize(size)],
		],
		[
			['File', 'size'],
			[...new Array(2).fill('-')],
		]
	)
	.map(row)
	.join('\n');
