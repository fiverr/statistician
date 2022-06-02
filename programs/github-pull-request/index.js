const diffSummary = require('../diff-summary');
const app = require('./app');
const pull = require('./pull');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.appId
 * @param  {String} options.appPrivateKey
 * @param  {String} options.user
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {Array} options.bundle Two objects (before, after)
 * @param  {Array} options.file   Two objects (before, after)
 * @return {Object}
 */
module.exports = async({token, user, repo, pr, bundle, file, appId, appPrivateKey}) => {
	if ([user, repo, pr].filter(notStringNorNumber).length) {
		throw new Error([
			'GitHub variables must be strings or numbers.',
			'Instead got',
			JSON.stringify({user, repo, pr}),
		].join(' '))
	}

	if (
		[token].filter(notStringNorNumber).length &&
		[appId, appPrivateKey].filter(notStringNorNumber).length
	) {
		throw new Error([
			'GitHub authentication variables must be strings or numbers.',
			'Instead got',
			JSON.stringify({token, appId, appPrivateKey}),
		].join(' '))
	}

	const message = await diffSummary({bundle, file});

	if (pr === true) { // `true` from yargs means an empty value (--pr --message "some message")
		throw new Error('Pull-request entity is not available. I have nowhere to comment my findings ☹️');
	}

	const appToken = await app({
		appId,
		appPrivateKey,
	});

	return await pull({
		token: token || appToken,
		user,
		repo,
		pr,
		message,
	});
};

/**
 * Check if argument is NOT a string or a number
 * @param  {Any} arg
 * @return {Boolen}
 */
const notStringNorNumber = arg => !['string', 'number'].includes(typeof arg);
