"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubAccountController = exports.GithubAccountController = void 0;
const github_account_service_js_1 = require("./github-account.service.js");
const github_account_types_js_1 = require("./github-account.types.js");
class GithubAccountController {
    async connect(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const data = github_account_types_js_1.ConnectGithubAccountSchema.parse(req.body);
            const result = await github_account_service_js_1.githubAccountService.connectAccount(req.user.userId, data);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    async getMyAccount(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const result = await github_account_service_js_1.githubAccountService.getAccount(req.user.userId);
            if (!result) {
                res.status(404).json({ error: 'GitHub account not found' });
                return;
            }
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async handleCallback(req, res) {
        try {
            if (!req.user?.userId) {
                res.status(401).json({ error: 'Unauthorized' });
                return;
            }
            const code = req.query.code;
            if (!code) {
                res.status(400).json({ error: 'Missing code parameter' });
                return;
            }
            const result = await github_account_service_js_1.githubAccountService.handleCallback(req.user.userId, code);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
exports.GithubAccountController = GithubAccountController;
exports.githubAccountController = new GithubAccountController();
