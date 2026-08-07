"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageProviderFactory = void 0;
const mock_provider_js_1 = require("./mock.provider.js");
class ImageProviderFactory {
    static getProvider() {
        const providerName = process.env.IMAGE_PROVIDER || 'mock';
        switch (providerName.toLowerCase()) {
            case 'mock':
                return new mock_provider_js_1.MockImageProvider();
            // future implementations: openai, flux, ideogram, stability
            default:
                console.warn(`[ImageProviderFactory] Unknown provider ${providerName}, falling back to mock.`);
                return new mock_provider_js_1.MockImageProvider();
        }
    }
}
exports.ImageProviderFactory = ImageProviderFactory;
