const byteSize = require('byte-size');
const {
	esc,
	percent,
	row,
	sortBy,
	unshift,
} = require('../../../../lib');

/**
 * Output bundle sizes diff in markdown
 * @param  {Object} data Bundle sizes diff structure
 * @return {String} markdown
 */
module.exports = stats => Object.entries(stats)
		.reduce(
			(modules, [modul, data]) => [
				...modules,
				unshift(
					sortBy(
						Object.entries(data),
						([, i]) => i.before.size,
						{order: 'desc'},
					)
					.reduce(
						(rows, [name, {before, after}]) => [
							...rows,
							[
								name,
								`${byteSize(before.size)} (${before.percent}%)`,
								`${byteSize(after.size)} (${after.percent}%)`,
								byteSize(before.size - after.size),
							],
						],
						[
							[...new Array(4).fill('-')],
						]
					)
					.map(row),
					`### ${esc(modul)}`,
					row([
						'Module',
						`Before (${byteSize(data.__TOTAL_SIZE__.before)})`,
						`After (${byteSize(data.__TOTAL_SIZE__.after)})`,
						`Diff (${percent(data.__TOTAL_SIZE__.after, data.__TOTAL_SIZE__.before) - 100}%)`,
					])
				)
				.join('\n'),
			],
		[]
	).join('\n\n');
