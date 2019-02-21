const DEFAULT_ARGS = {
	token: 'TOKEN',
	user: 'USER',
	repo: 'REPO',
	pr: 'PR',
};

describe('github-pull-request', () => {
	let args;
	let githubPullRequest;
	before(() => {
		require('./pull');
		require.cache[require.resolve('./pull')].exports = _args => { args = _args; };
		githubPullRequest = require('.');
	});
	beforeEach(() => {
		args = {};
	});
	after(() => {
		delete require.cache[require.resolve('./pull')];
	});
	it('Should pass token, user, repo, pr, to pull request function', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		expect(args).to.include(DEFAULT_ARGS)
	});
	it('Should report no file size impact', async() => {
		await githubPullRequest(DEFAULT_ARGS);
		const {message} = args;
		expect(message).to.be.a('string')
	});
});
