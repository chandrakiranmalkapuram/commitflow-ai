"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGithubWebhook = processGithubWebhook;
const github_validator_js_1 = require("../github/github.validator.js");
const queue_service_js_1 = require("../queue/queue.service.js");
async function processGithubWebhook(payload) {
    if (!(0, github_validator_js_1.validateGithubPushPayload)(payload)) {
        throw new Error('Invalid GitHub payload');
    }
    // Enqueue the heavy lifting to the background worker
    await queue_service_js_1.queueService.enqueueGithubPush({ payload });
    console.log('Successfully enqueued GitHub push payload for background processing.');
    return { success: true, message: 'Webhook queued' };
}
