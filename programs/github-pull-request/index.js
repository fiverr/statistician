const summary = require('../diff-summary');
const pr = require('./pr');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.user
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {String} options.bundle
 * @param  {String} options.file
 * @return {Object}
 */
module.exports = async({token, user, repo, pr, bundle, file}) => {
	if ([token, user, repo, pr].filter(notStringNorNumber).length) {
		throw new Error([
			'GitHub variables must be strings or numbers.',
			'Instead got',
			JSON.stringify({token, user, repo, pr}),
		].join(' '))
	}

	const message = await summary({bundle, file});

	return await pr({
		token,
		user,
		repo,
		pr,
		message,
	})
};

/**
 * Check if argument is NOT a string or a number
 * @param  {Any} arg
 * @return {Boolen}
 */
const notStringNorNumber = arg => !['string', 'number'].includes(typeof arg);
