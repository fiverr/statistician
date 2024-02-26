const percent = require('../percent');
const badge = require('../badge');
const COLOUR_THRESHOLD = 10;

/**
 * Create a textual representation of the diff percentage between two numbers
 * @param  {Number} before
 * @param  {Number} after
 * @return {String}
 */
module.exports = (before, after) => {
	if (!after || !before) {
		return 'N/A';
	}

	const percentage = percent(after, before) - 100;
	if (percentage === 0) {
		return 0;
	}

	const string = `${percentage > 0 ? '+' : ''}${percentage}%`;

	if (percentage > COLOUR_THRESHOLD) {
		global.sizeIncrease = true;
		return badge(string, 'red');
	} else if (percentage < -COLOUR_THRESHOLD) {
		return badge(string, 'green');
	}

	return string;
}
