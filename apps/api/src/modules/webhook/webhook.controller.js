"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiveGithubWebhook = receiveGithubWebhook;
const github_signature_js_1 = require("../github/github.signature.js");
const webhook_service_js_1 = require("./webhook.service.js");
async function receiveGithubWebhook(req, res) {
    const signature = req.headers['x-hub-signature-256'];
    const secret = process.env.GITHUB_WEBHOOK_SECRET;
    if (!secret) {
        return res.status(500).json({
            message: 'Webhook secret missing',
        });
    }
    const isValid = (0, github_signature_js_1.verifyGithubSignature)(req.body, signature, secret);
    if (!isValid) {
        return res.status(401).json({
            message: 'Invalid GitHub signature',
        });
    }
    try {
        const event = await (0, webhook_service_js_1.processGithubWebhook)(JSON.parse(req.body.toString()));
        return res.status(200).json({
            received: true,
            event,
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error instanceof Error
                ? error.message
                : 'Invalid payload',
        });
    }
}
