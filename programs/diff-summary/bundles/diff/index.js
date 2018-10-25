const percent = require('../../../../lib/percent');

/**
 * Diff in percent two objects' size
 * @param  {Number} options.size: a
 * @param  {Number} options.size: b
 * @return {String}
 */
module.exports = ({size: a}, {size: b}) => {
	const difference = percent(b, a) - 100;
	if (difference === 0) { return 0; }

	return `${difference > 0 ? '+' : ''}${difference}%`;
};
