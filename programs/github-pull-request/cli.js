const program = require('.');
const getJSON = require('../../lib/getJSON');

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
module.exports = async({token, user, repo, pr, bundle, file}) =>  program({
	token,
	user,
	repo,
	pr,

	// before, after
	bundle: await Promise.all(
		bundle
			.split(',')
			.map(
				file => getJSON(file, null)
			)
	),

	// before, after
	file: await Promise.all(
		file
			.split(',')
			.map(
				file => getJSON(file, null)
			)
	),
});
