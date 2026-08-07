"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubAccountService = exports.GithubAccountService = void 0;
const github_account_repository_js_1 = require("./github-account.repository.js");
const encryption_util_js_1 = require("../../utils/encryption.util.js");
class GithubAccountService {
    get clientId() {
        return process.env.GITHUB_CLIENT_ID || '';
    }
    get clientSecret() {
        return process.env.GITHUB_CLIENT_SECRET || '';
    }
    async exchangeCodeForToken(code) {
        const response = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code,
            }),
        });
        const data = await response.json();
        if (data.error) {
            throw new Error(`GitHub OAuth Error: ${data.error_description}`);
        }
        return data.access_token;
    }
    async fetchGithubUser(accessToken) {
        const response = await fetch('https://api.github.com/user', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: 'application/vnd.github.v3+json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch user from GitHub API');
        }
        return response.json();
    }
    async handleCallback(userId, code) {
        const accessToken = await this.exchangeCodeForToken(code);
        const ghUser = await this.fetchGithubUser(accessToken);
        const encryptedToken = (0, encryption_util_js_1.encrypt)(accessToken);
        const account = await github_account_repository_js_1.githubAccountRepository.upsert({
            userId,
            githubUserId: ghUser.id.toString(),
            username: ghUser.login,
            avatarUrl: ghUser.avatar_url,
            accessToken: encryptedToken,
        });
        return {
            id: account.id,
            userId: account.userId,
            githubUserId: account.githubUserId,
            username: account.username,
            avatarUrl: account.avatarUrl,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
        };
    }
    async connectAccount(userId, data) {
        const encryptedToken = (0, encryption_util_js_1.encrypt)(data.accessToken);
        const account = await github_account_repository_js_1.githubAccountRepository.upsert({
            userId,
            githubUserId: data.githubUserId,
            username: data.username,
            avatarUrl: data.avatarUrl,
            accessToken: encryptedToken,
        });
        return {
            id: account.id,
            userId: account.userId,
            githubUserId: account.githubUserId,
            username: account.username,
            avatarUrl: account.avatarUrl,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
        };
    }
    async getAccount(userId) {
        const account = await github_account_repository_js_1.githubAccountRepository.findByUserId(userId);
        if (!account)
            return null;
        return {
            id: account.id,
            userId: account.userId,
            githubUserId: account.githubUserId,
            username: account.username,
            avatarUrl: account.avatarUrl,
            createdAt: account.createdAt,
            updatedAt: account.updatedAt,
        };
    }
}
exports.GithubAccountService = GithubAccountService;
exports.githubAccountService = new GithubAccountService();
