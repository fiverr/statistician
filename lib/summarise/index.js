const {dependencySizeTree} = require('webpack-bundle-size-analyzer/build/src/size_tree');
const percent = require('../percent');

//  console.log(JSON.stringify(dependencySizeTree(stats), null, 2)) ||
module.exports = stats => dependencySizeTree(stats)
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
