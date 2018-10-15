/**
 * Add items to beginning of array and return it
 * @param  {Array}  array
 * @param  {...Any} items
 * @return {Array}
 */
module.exports = function unshift(array, ...items) {
	array.unshift(...items);
	return array;
};
