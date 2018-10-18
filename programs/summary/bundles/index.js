const byteSize = require('byte-size');
const {
	esc,
	getJSON,
	summarise,
	sortBy,
	row,
} = require('../../../lib');

/**
 * Create the markdown section for bundles
 * @param  {String} route to stats file
 * @return {String}
 */
module.exports = async function bundles(stats) {
	return Object.entries(summarise(await getJSON(stats)))
		.reduce(
			(accumulator, [modul, dependencies]) => [
				...accumulator,
				`### ${esc(modul)}`,
				row([
					'Module',
					'Size',
					'Percent',
				]),
				row([...new Array(3).fill('-')]),
				...sortBy(
					Object.entries(dependencies),
					([, {size}]) => size,
					{order: 'desc'},
				)
				.map(
					([name, {size, percent}]) => row([
						name,
						byteSize(size),
						`${percent}%`,
					])
				),
			],
			[]
		).join('\n')
}
