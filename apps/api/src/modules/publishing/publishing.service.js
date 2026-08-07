"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishingService = exports.PublishingService = void 0;
const publishing_repository_js_1 = require("./publishing.repository.js");
const linkedin_provider_js_1 = require("./providers/linkedin.provider.js");
class PublishingService {
    providers;
    constructor() {
        this.providers = new Map();
        const linkedin = new linkedin_provider_js_1.LinkedinProvider();
        this.providers.set(linkedin.providerName, linkedin);
        // Register future providers (Twitter, DevTo) here
    }
    /**
     * Prepares content for publishing by creating a Publication record.
     * Does NOT automatically publish.
     */
    async preparePublish(contentId, provider) {
        console.log(`[Publishing Service] Preparing publish for content ${contentId} to ${provider}`);
        if (!this.providers.has(provider)) {
            throw new Error(`Provider ${provider} is not supported`);
        }
        // Create a pending publication record
        const publication = await publishing_repository_js_1.publishingRepository.createPublication(contentId, provider);
        return publication;
    }
}
exports.PublishingService = PublishingService;
exports.publishingService = new PublishingService();
