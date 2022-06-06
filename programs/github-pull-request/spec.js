const GitHubApp = require('../../lib/GithubApp');

const APP_ARGS = {
	appId: 'APP_ID',
	appPrivateKey: 'APP_PRIVATE_KEY',
};

const PULL_ARGS = {
	token: 'TOKEN',
	user: 'USER',
	repo: 'REPO',
	pr: 'PR',
};

const DEFAULT_ARGS = {
	...PULL_ARGS,
	...APP_ARGS,
};

describe('github-pull-request', () => {
	let argsPull;
	let getUserTokenCalled;
	let originalGetUserToken;
	let githubPullRequest;
	before(() => {
		require('./pull');
		require.cache[require.resolve('./pull')].exports = _args => { argsPull = _args; };

		originalGetUserToken = GitHubApp.prototype.getUserToken;
		GitHubApp.prototype.getUserToken = () => { getUserTokenCalled = true; return 'TOKEN' };

		githubPullRequest = require('.');
	});
	beforeEach(() => {
		argsPull = {};
		getUserTokenCalled = false;
	});
	after(() => {
		delete require.cache[require.resolve('./pull')];

		GitHubApp.prototype.getUserToken = originalGetUserToken;
	});
	it('Should pass token, user, repo, pr, to pull request function', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		expect(argsPull).to.include(PULL_ARGS);
	});
	describe('When token is undefined', () => {
		it('Should call GitHubApp#getUserToken', async() => {
			await githubPullRequest({
				...DEFAULT_ARGS,
				token: undefined,
			});
			expect(getUserTokenCalled).to.equal(true);
		});
	});
	it('Should report no file size impact', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		const {message} = argsPull;
		expect(message).to.be.a('string')
	});
});
