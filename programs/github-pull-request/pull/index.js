const {join} = require('path');
const GitHub = require('../../../lib/GitHub');
const {name} = require('../../../package.json');
const UNIQUE_IDENTIFIER = Buffer.from(name).toString('base64');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.user
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {String} options.message
 * @return {Object}
 */
module.exports = async function pull({token, user, repo, pr, message}) {
	const {request} = new GitHub({token});
	if (typeof pr === true) { // `true` from yargs means an empty value (--pr --message "some message")
		throw new Error('Pull-request entity is not available. I have nowhere to comment my findings ☹️');
	}

	const comments = await request(
		path('repos', user, repo, 'issues', pr, 'comments')
	);

	const {id} = comments.find(comment => comment.body.includes(UNIQUE_IDENTIFIER)) || {id: ''};

	const url = id ?
		path('repos', user, repo, 'issues', 'comments', id) :
		path('repos', user, repo, 'issues', pr, 'comments');

	return await request(
		url,
		{
			method: id ? 'PATCH' : 'POST',
			body: JSON.stringify({
				body: [
					`<!-- ${UNIQUE_IDENTIFIER} -->`,
					message,
				].join('\n'),
			}),
		}
	);
}

/**
 * Create a URL path (converts all types to string)
 * @param  {...Any} args
 * @return {String}
 */
const path = (...args) => join(...args.map(i => i.toString()))
