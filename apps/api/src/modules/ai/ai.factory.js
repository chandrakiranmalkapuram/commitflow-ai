"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiFactory = void 0;
const grok_provider_js_1 = require("./providers/grok.provider.js");
class AiFactory {
    static getProvider() {
        const providerName = process.env.LLM_PROVIDER || 'grok';
        switch (providerName.toLowerCase()) {
            case 'grok':
                return new grok_provider_js_1.GrokProvider();
            // Future providers like 'openai', 'claude', 'gemini' can be added here
            default:
                throw new Error(`Unsupported LLM_PROVIDER: ${providerName}`);
        }
    }
}
exports.AiFactory = AiFactory;
