const byteSize = require('byte-size');
const esc = require('../../../../lib/esc');
const percent = require('../../../../lib/percent');
const row = require('../../../../lib/row');
const sortBy = require('../../../../lib/sortBy');
const columns = require('./columns');

/**
 * Output bundle sizes diff in markdown
 * @param  {Object} data Bundle sizes diff structure
 * @return {String} markdown
 */
module.exports = stats => Object.entries(stats).reduce(reducer, []);

/**
 * Create an entry for a single module
 * @param  {Array} accumulator
 * @param  {String} name
 * @param  {...Object} data.entry.before, data.entry.after
 * @return {Array}
 */
function reducer(accumulator, [name, data]) {
	const difference = percent(data.__TOTAL_SIZE__.after, data.__TOTAL_SIZE__.before) - 100;
	if (difference === 0) {
		return accumulator;
	}

	const header = [
		'Module',
		`Before (${byteSize(data.__TOTAL_SIZE__.before)})`,
		`After (${byteSize(data.__TOTAL_SIZE__.after)})`,
		`Diff (${difference}%)`,
	];

	const body = sortBy(
		Object.entries(data),
		([, i]) => i.before.size,
		{order: 'desc'},
	)
	.reduce((rows, dependency) => columns(rows, dependency), []);

	if (body.length === 0) {
		return accumulator;
	}

	const table = [
		`### ${esc(name)}`,
		...[
			header,
			new Array(header.length).fill('-'),
			...body,
		].map(row),
	].join('\n');

	return [
		...accumulator,
		table,
	];
}

