const byteSize = require('byte-size');
const diff = require('../../../../../lib/diff');

/**
 * Create an entry line for one dependency
 * @param  {Array}  accumulator
 * @param  {String} [name]
 * @param  {Object} [, data.before (size, percent)]
 * @param  {Object} [, data.after (size, percent)]
 * @return {Array}
 */
module.exports = function columns(accumulator, [name, {before, after}]) {
	const difference = diff(before.size, after.size);

	if (difference === 0) {
		return accumulator;
	}

	return [
		...accumulator,
		[
			name,
			cell(before),
			cell(after),
			difference,
		],
	];
}

const cell = ({size, percent}) => [
	size ? byteSize(size) : '0',
	percent ? `(${percent}%)` : '',
].join(' ');
