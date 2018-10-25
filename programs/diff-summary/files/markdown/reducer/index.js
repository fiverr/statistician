const byteSize = require('byte-size');
const diff = require('../../../../../lib/diff');

/**
 * Add a row to the table
 * @param  {Array}  rows
 * @param  {String} item.key
 * @param  {Number} item.sizes.before
 * @param  {Number} item.sizes.after
 * @return {Array}
 */
module.exports = function reducer(rows, [key, {before, after}]) {
	const difference = diff(before, after);
	if (difference === 0) {
		return rows;
	}

	return [
		...rows,
		[key, byteSize(before), byteSize(after), difference],
	];
}
