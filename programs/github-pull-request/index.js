const GitHubApp = require('../../lib/GithubApp');
const diffSummary = require('../diff-summary');
const pull = require('./pull');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.appId
 * @param  {String} options.appPrivateKey
 * @param  {String} options.user
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {String} options.projectName
 * @param  {Array} options.bundle Two objects (before, after)
 * @param  {Array} options.file   Two objects (before, after)
 * @return {Object}
 */
module.exports = async({token, user, repo, pr, bundle, file, appId, appPrivateKey, projectName}) => {
	if ([user, repo, pr].filter(notStringNorNumber).length) {
		throw new Error([
			'GitHub variables must be strings or numbers.',
			'Instead got',
			JSON.stringify({user, repo, pr}),
		].join(' '));
	}

	const message = await diffSummary({bundle, file, projectName});

	if (pr === true) { // `true` from yargs means an empty value (--pr --message "some message")
		throw new Error('Pull-request entity is not available. I have nowhere to comment my findings ☹️');
	}

	if(!token) {
		token = await new GitHubApp({
			appId,
			appPrivateKey,
		}).getUserToken();
	}

	if (!token) {
		throw new Error([
			'GitHub authentication variables must be strings or numbers.',
			'Instead got',
			JSON.stringify({token, appId, appPrivateKey}),
		].join(' '));
	}

	return await pull({
		token,
		user,
		repo,
    projectName,
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
