"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageService = exports.ImageService = void 0;
const standard_generator_js_1 = require("./generators/standard.generator.js");
const image_provider_factory_js_1 = require("./providers/image-provider.factory.js");
class ImageService {
    generator;
    constructor() {
        // In a more complex setup, this could use a Map based on prompt styles
        this.generator = new standard_generator_js_1.StandardImagePromptGenerator();
    }
    async generatePrompt(understanding, platform) {
        console.log(`[Image Service] Generating image prompt for ${platform}`);
        return this.generator.generatePrompt(understanding, platform);
    }
    async generateImage(prompt) {
        console.log(`[Image Service] Requesting image generation`);
        const provider = image_provider_factory_js_1.ImageProviderFactory.getProvider();
        return provider.generateImage(prompt);
    }
}
exports.ImageService = ImageService;
exports.imageService = new ImageService();
