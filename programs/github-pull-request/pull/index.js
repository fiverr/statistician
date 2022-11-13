const {join} = require('path');
const GitHub = require('../../../lib/GitHub');
const {name} = require('../../../package.json');

/**
 * Returns the Stats pull request comment identifier (to be later edited if needed)
 * @param repo
 * @param projectName
 */
const getCommentIdentifier = ({ repo, projectName }) => Buffer.from(projectName ? [
		name,
		repo,
		projectName,
].filter(Boolean).join('-') : name).toString('base64');

/**
 * Create a pull request with the file and bundle stats comparison
 * @param  {String} options.token
 * @param  {String} options.user
 * @param  {String} options.repo
 * @param  {String} options.pr
 * @param  {String} options.message
 * @param  {String} options.projectName
 * @return {Object}
 */
module.exports = async function pull({token, user, repo, pr, message, projectName}) {
	const {request} = new GitHub({token});
	if (pr === true) { // `true` from yargs means an empty value (--pr --message "some message")
		throw new Error('Pull-request entity is not available. I have nowhere to comment my findings ☹️');
	}

	const commentIdentifier = getCommentIdentifier({repo, projectName});

	const comments = await request(
		path('repos', user, repo, 'issues', pr, 'comments')
	);

	const {id} = comments.find(comment => comment.body.includes(commentIdentifier)) || {id: ''};

	const url = id ?
		path('repos', user, repo, 'issues', 'comments', id) :
		path('repos', user, repo, 'issues', pr, 'comments');

	return await request(
		url,
		{
			method: id ? 'PATCH' : 'POST',
			body: JSON.stringify({
				body: [
					`<!-- ${commentIdentifier} -->`,
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
