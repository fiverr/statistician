const deepEqual = require('../../../../lib/deepEqual');

/**
 * Create a comparison of two webpack stats
 * @param  {Object} before Webpack stats
 * @param  {Object} after  Webpack stats
 * @return {Object}
 */
module.exports = (before, after) => Array.from(
	new Set([
		...Object.keys(before),
		...Object.keys(after),
	])
).reduce(
	(accumulator, name) =>

		// Omit un impacted modules
		deepEqual(before[name], after[name])
		?
		accumulator
		:
		Object.assign(
			accumulator,
			{[name]: modul(before[name], after[name])}
		),
	{}
);

/**
 * Create a comparison of two module stats
 * @param  {Object} before Module stats
 * @param  {Object} after  Module stats
 * @return {Object}
 */
const modul = (before = {}, after = {}) => Object.defineProperty(
	Array.from(
		new Set([
			...Object.keys(before),
			...Object.keys(after),
		])
	)
	.reduce(
		(accumulator, dependency) =>

			// Omit un impacted dependencies
			sizeEqual(before[dependency], after[dependency])
			?
			accumulator
			:
			Object.assign(
				accumulator,
				{
					[dependency]: {
						before: before[dependency] || 0,
						after: after[dependency] || 0,
					},
				}
			)
			,
		{}
	),
	'__TOTAL_SIZE__', // Defining '__TOTAL_SIZE__' as a Non enumerable property
	{
		value: {
			before: before.__TOTAL_SIZE__,
			after: after.__TOTAL_SIZE__,
		},
		enumerable: false,
	}
);


const sizeEqual = (a, b) => (a && b) && (a.size && b.size) && (a.size === b.size);
