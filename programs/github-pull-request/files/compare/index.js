/**
 * Merge two files stats to one before and after struct
 * @param  {Object} before
 * @param  {Object} after
 * @return {Object}
 */
module.exports = (before, after) => Array.from(
	new Set([
		...Object.keys(before),
		...Object.keys(after),
	])
)
.filter(key => before[key] !== after[key])
.reduce(
	(accumulator, key) => Object.assign(
		accumulator,
		{
			[key]: {
				before: before[key] || 0,
				after: after[key] || 0
			}
		}
	),
	{}
);
