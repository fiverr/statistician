const {join} = require('path');
const fetch = require('node-fetch');
const BASE = 'api.github.com';

module.exports = class GitHub {
	constructor({token} = {}) {
		this.token = token;
		this.request = this.request.bind(this);
		this.defaultHeaders = {
			'Accept': 'application/json',
			'Authorization': `token ${this.token}`,
		};
	}

	async request(url, options = {}) {
		options.headers = Object.assign(
			{},
			this.defaultHeaders,
			options.headers || {}
		);
		const response = await fetch(
			`https://${join(BASE, url)}`,
			options
		);

		if (response.ok) {
			return await response.json();
		}

		console.error( // eslint-disable-line no-console
			[
				`Error in request ${url}`,
				options.body ? `Body: ${options.body}` : '',
				JSON.stringify(await response.json(), null, 2),
			].join('\n')
		);

		return null;
	}
}
