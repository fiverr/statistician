const chunkalyse = require('chunkalyse');
const byteSize = require('byte-size');
const diff = require('./diff');
const entry = require('./entry');
const deepEqual = require('../../../lib/deepEqual');
const row = require('../../../lib/row');
const keys = require('../../../lib/keys');

const NO_CHANGES = 'Modules unchanged';
const INSIGNIFICANT = 'No significant modules changes';

/**
 * Create the markdown section for bundles
 * @param  {String} stats
 * @return {String}
 */
module.exports = async function bundles(stats) {
	const [before, after] = stats.map(chunkalyse);

	if (deepEqual(before, after)) {
		return NO_CHANGES;
	}

	const body = compare(before, after);

	if (body.length === 0) {
		return INSIGNIFICANT;
	}


	return [
		'## Impacted modules',
		body.join('\n'),
		'> <sup>raw sizes</sup>',
	].join('\n');
}

const compare = (before, after) => keys(before, after).reduce(
	(accumulator, name) => accumulator.concat([
		`### ${name}`,
		row([
			'Module',
			`Before (${byteSize(before[name].size)})`,
			`After (${byteSize(after[name].size)})`,
			diff(before[name], after[name])
		]),
		row([...new Array(4).fill('-')]),
		...modules(before[name], after[name]),
	]),
	[]
);

const modules = (before, after) => keys(before.modules, after.modules).reduce(
	(accumulator, name) => {
		const [a, b] = [before, after].map(i => i.modules[name] || {size: 0});

		if (a.size === b.size) { return accumulator; }

		const difference = diff(a, b);

		if (!difference) { return accumulator; }

		return accumulator.concat(row([
			name, entry(a), entry(b), difference,
		]))
	},
	[]
);
