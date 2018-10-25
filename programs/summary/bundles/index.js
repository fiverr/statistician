const chunkalyse = require('chunkalyse');
const byteSize = require('byte-size');
const esc = require('../../../lib/esc');
const sortBy = require('../../../lib/sortBy');
const row = require('../../../lib/row');

/**
 * Create the markdown section for bundles
 * @param  {String} route to stats file
 * @return {String}
 */
module.exports = async stats => Object.entries(chunkalyse(stats))
	.reduce(
		(accumulator, [name, {size, modules}]) => accumulator.concat(
			`### ${esc(name)} (${byteSize(size)})`,
			row([
				'Module',
				'Size',
				'Percent',
			]),
			row([...new Array(3).fill('-')]),
			...sortBy(
				Object.entries(modules),
				([, {size}]) => size,
				{order: 'desc'},
			).map(
				([name, {size, percent}]) => row([
					name,
					byteSize(size),
					`${percent}%`,
				])
			)
		),
		[]
	).join('\n');
