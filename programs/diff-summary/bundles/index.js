const chunkalyse = require('chunkalyse');
const byteSize = require('byte-size');
const diff = require('../../../lib/diff');
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
			`Before (${byteSize(getSize(before[name]))})`,
			`After (${byteSize(getSize(after[name]))})`,
			diff(getSize(before[name]), getSize(after[name])),
		]),
		row([...new Array(4).fill('-')]),
		...modules(before[name], after[name]),
	]),
	[]
);

const getSize = entry => entry ? entry.size : 0;

const modules = (before = {modules: {}}, after = {modules: {}}) => keys(before.modules, after.modules).reduce(
	(accumulator, name) => {
		const [a, b] = [before, after].map(i => i.modules[name] || {size: 0});

		if (a.size === b.size) { return accumulator; }

		const difference = diff(a.size, b.size);

		if (!difference) { return accumulator; }

		return accumulator.concat(row([
			name, entry(a), entry(b), difference,
		]))
	},
	[]
);

const entry = ({size, percent}) => size === 0 ? '0' : `${byteSize(size)} (${percent}%)`;
