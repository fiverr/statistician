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
	let argsApp;
	let githubPullRequest;
	before(() => {
		require('./pull');
		require('./app');
		require.cache[require.resolve('./pull')].exports = _args => { argsPull = _args; };
		require.cache[require.resolve('./app')].exports = _args => { argsApp = _args };
		githubPullRequest = require('.');
	});
	beforeEach(() => {
		argsPull = {};
		argsApp = {};
	});
	after(() => {
		delete require.cache[require.resolve('./pull')];
		delete require.cache[require.resolve('./app')];
	});
	it('Should pass token, user, repo, pr, to pull request function', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		expect(argsPull).to.include(PULL_ARGS);
	});
	it('Should pass appId, appPrivateKey, to token app function', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		expect(argsApp).to.include(APP_ARGS);
	});
	it('Should report no file size impact', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		const {message} = argsPull;
		expect(message).to.be.a('string')
	});
});
