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
async function files({
	dir = './',
	ignore,
	base,
} = {}) {
	base = base || dir;
	const rembase = new RegExp(`^(./)?${base.replace(/^\.?\//, '')}/?`);

	ignore = ignoreRules(ignore);

	return await reduce(
		await readdir(dir),
		async(accumulator, content) => {
			if (matchRules(content, ignore)) {
				return accumulator;
			}

			const path = join(dir, content);

			const stats = await stat(path);
			if (!stats) {
				return accumulator;
			}

			if (stats.isDirectory()) {
				Object.assign(
					accumulator,
					await files({dir: path, ignore, base})
				);
			} else if (stats.isFile()) {
				const name = await removeFingerprint(path);
				const size = await gzipSize(path);
				Object.assign(
					accumulator,
					{[name.replace(rembase, '')]: size}
				);
			}

			return accumulator;
		},
		{}
	);
}

module.exports = async(...args) => JSON.stringify(await files(...args), null, 2);
