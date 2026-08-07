"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyGithubSignature = verifyGithubSignature;
const crypto_1 = __importDefault(require("crypto"));
function verifyGithubSignature(payload, signature, secret) {
    if (!signature) {
        return false;
    }
    const expectedSignature = 'sha256=' +
        crypto_1.default
            .createHmac('sha256', secret)
            .update(payload)
            .digest('hex');
    return crypto_1.default.timingSafeEqual(Buffer.from(expectedSignature), Buffer.from(signature));
}
