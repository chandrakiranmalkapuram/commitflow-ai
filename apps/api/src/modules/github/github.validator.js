"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGithubPushPayload = validateGithubPushPayload;
function validateGithubPushPayload(payload) {
    if (!payload || typeof payload !== 'object') {
        return false;
    }
    const data = payload;
    return (typeof data.ref === 'string' &&
        typeof data.repository?.name === 'string' &&
        Array.isArray(data.commits));
}
