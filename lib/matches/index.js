/**
 * Convert pattern or array of patterns to array of regexp rules
 * @param  {Array|String} rules
 * @return {Array}
 */
function ignoreRules(patterns, flags = 'gm') {
	if (Array.isArray(patterns)) {
		return patterns.map(rule => new RegExp(rule, flags));
	} else if (typeof patterns === 'string' || patterns instanceof RegExp) {
		return [new RegExp(patterns, flags)];
	} else {
		return [];
	}
}

/**
 * Test input by a set of rules
 * @param  {String} input
 * @param  {RegExp[]} rules
 * @return {Boolean}
 */
function matchRules(input, rules) {
	return rules.find(rule => matchRule(input, rule)) !== undefined;
}

/**
 * Test input by a rule
 * @param  {String} input
 * @param  {String|RegExp} rule
 * @return {Boolean}
 */
function matchRule(input, rule) {
	if (rule instanceof RegExp) {
		return rule.test(input);
	}

	if (typeof rule === 'function') {
		return rule(input);
	}

	return input === rule;
}

module.exports = {
	matchRules,
	matchRule,
	ignoreRules,
};
