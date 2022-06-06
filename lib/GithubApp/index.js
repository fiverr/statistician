const { join } = require('path');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

const BASE = 'https://api.github.com';

module.exports = class GithubApp {
    constructor({appId, appPrivateKey} = {}) {
        if (!(appId && appPrivateKey)) {
            throw new Error([
                'GitHub authentication variables must be strings or numbers.',
                'Instead got',
                JSON.stringify({appId, appPrivateKey}),
            ].join(' '));
        }

        this.appId = appId;
        this.appPrivateKey = Buffer.from(appPrivateKey, 'base64').toString();
    }

    getJwtAppToken() {
        return jwt.sign(
            {
                iss: this.appId,
            },
            this.appPrivateKey,
            {
                algorithm: 'RS256',
                expiresIn: '120s',
            }
        );
    }

    headers() {
        return {
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.getJwtAppToken()}`,
        }
    }

    async request(url, options = {}) {
		options.headers = Object.assign(
			{},
			this.headers(),
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

        return;
	}

    async getInstallationId() {
        const url = join(BASE, 'app/installations');

        const data = await this.request(url);

        if (data) {
            return data[0].id;
        }

        return;
    }

    async getUserToken() {
        const installationId = await this.getInstallationId();

        if (!installationId) {
            return;
        }

        const url = join(BASE, `app/installations/${installationId}/access_tokens`);

        const data = await this.request(url, {
            method: 'post',
        });

        if (data) {
            return data.token;
        }

        return;
    }
}
