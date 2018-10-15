const message = require('./message');
const comment = require('./comment');

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
module.exports = async({token, user, repo, pr, bundle, file}) => await comment({
	token,
	user,
	repo,
	pr,
	message: await message({bundle, file}),
});
