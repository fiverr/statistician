const {dependencySizeTree} = require('webpack-bundle-size-analyzer/build/src/size_tree');
const percent = require('../percent');
const chunkalyse = require('chunkalyse');

//  console.log(JSON.stringify(dependencySizeTree(stats), null, 2)) ||
module.exports = stats => {
	const data = chunkalyse(stats);
	console.log(JSON.stringify(data, null, 2));

	return chunkalyse(stats);

	return dependencySizeTree(stats)
	.reduce(
		(accumulator, pkg) => Object.assign(
			accumulator,
			{
				[pkg.packageName]: Object.defineProperty(
					summarise(pkg),
					'__TOTAL_SIZE__', // Defining '__TOTAL_SIZE__' as a Non enumerable property
					{
						value: pkg.size,
						enumerable: false,
					}
				),
			}
		),
		{}
	);
};

function summarise({size, children}) {
	const total = size;

	const summary = children.reduce(
		(accumulator, child) => {
			size -= child.size;

			accumulator[child.packageName] = {
				size: child.size,
				percent: percent(child.size, total),
			};

			return accumulator;
		},
		{}
	);

	summary.self = {
		size,
		percent: percent(size, total),
	}

	return summary;
}
