const {join} = require('path');
const reduce = require('await-reduce');
const {
	gzipSize,
	removeFingerprint,
	afsync: { readdir, stat },
	matches: { ignoreRules, matchRules },
} = require('../../lib');

/**
 * Create a recursive named list of filesizes in a directory
 * @param  {String}          [options.dir='./']
 * @param  {[String|RegExp]} [options.ignore]
 * @return {Object}
 */
module.exports = async function files({
	dir = './',
	ignore,
} = {}) {
	ignore = ignoreRules(ignore);

	return await reduce(
		await readdir(dir),
		async(accumulator, content) => {
			const path = join(dir, content);

			if (matchRules(path, ignore)) {
				return accumulator;
			}

			const stats = await stat(path);
			if (!stats) {
				return accumulator;
			}

			if (stats.isDirectory()) {
				Object.assign(
					accumulator,
					await files({dir: path, ignore})
				);
			} else if (stats.isFile()) {
				const name = await removeFingerprint(path);
				const size = await gzipSize(path);
				Object.assign(
					accumulator,
					{[name]: size}
				);
			}

			return accumulator;
		},
		{}
	)
}
