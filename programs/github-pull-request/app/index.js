const GitHubApp = require('../../../lib/GitHubApp');

/**
 * Get a github app installation token.
 * @param  {String} options.appId
 * @param  {String} options.appPrivateKey
 * @return {Promise<String | undefined>}
 */
module.exports = async function app({appId, appPrivateKey}) {
	if (!(appId && appPrivateKey)) {
		return;
	}

    return new GitHubApp({
        appId, appPrivateKey
    }).getUserToken();
};
