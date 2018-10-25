const row = require('../row');

module.exports = function tomd(data) {
	if (Array.isArray(data)) {
		if (typeof data[0] === 'object') {
			return table(data);
		}
	}

	return '';
}

/**
 * Convert array of objects to markdown table
 * @param  {Array} array
 * @return {String}
 */
function table(array) {
	const titles = [];
	const body = array.reduce(
		(accumulator, item, index) => {
			Object.entries(item).forEach(
				([key, value]) => {
					let loc = titles.indexOf(key);
					if (loc === -1) {
						loc = titles.push(key) - 1;
					}
					accumulator[index] = accumulator[index] || [];
					accumulator[index][loc] = value;
				}
			);
			return accumulator;
		},
		[]
	);

	return [
		titles,
		new Array(titles.length).fill('-'),
		...body
	].map(row).join('\n');
}
