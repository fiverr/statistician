const {join} = require('path');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');
const BASE = 'https://api.github.com';

module.exports = class GithubApp {
    constructor({appId, appPrivateKey} = {}) {
        this.appId = appId;
        this.appPrivateKey = appPrivateKey;

        this.getJwtAppToken = this.getJwtAppToken.bind(this);
        this.getUserToken = this.getUserToken.bind(this);
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

    async getInstallationId() {
        const url = join(BASE, 'app/installations');

        const response = await fetch(
            url,
            {
                headers: this.headers(),
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data[0].id
        }

        // eslint-disable-next-line no-console
        console.error(
            [
                `Error in request ${url}`,
                JSON.stringify(await response.json(), null, 2),
            ].join('\n')
        );

        return;
    }

    async getUserToken() {
        const installationId = await this.getInstallationId();

        if (!installationId) {
            return;
        }

        const url = join(BASE, `app/installations/${installationId}/access_tokens`);

        const response = await fetch(
            url,
            {
                headers: this.headers(),
                method: 'post',
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data.token
        }

        // eslint-disable-next-line no-console
        console.error(
            [
                `Error in request ${url}`,
                JSON.stringify(await response.json(), null, 2),
            ].join('\n')
        );

        return;
    }
}
