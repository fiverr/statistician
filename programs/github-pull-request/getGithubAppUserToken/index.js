const GitHubApp = require('../../../lib/GithubApp');

/**
 * Get a github app installation token.
 * @param  {String} options.appId
 * @param  {String} options.appPrivateKey
 * @return {Promise<String | undefined>}
 */
module.exports = async function getGithubAppUserToken({appId, appPrivateKey}) {
	if (!(appId && appPrivateKey)) {
		return;
	}

    return new GitHubApp({
        appId,
        appPrivateKey: Buffer.from(appPrivateKey, 'base64').toString(),
    }).getUserToken();
};
