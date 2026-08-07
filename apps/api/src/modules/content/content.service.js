"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentService = exports.ContentService = void 0;
const content_types_js_1 = require("./content.types.js");
const prisma_service_js_1 = require("../db/prisma.service.js");
const linkedin_generator_js_1 = require("./generators/linkedin.generator.js");
const publishing_service_js_1 = require("../publishing/publishing.service.js");
class ContentService {
    generators;
    constructor() {
        this.generators = new Map();
        this.generators.set(content_types_js_1.Platform.LinkedIn, new linkedin_generator_js_1.LinkedinGenerator());
        // Register future generators here (Twitter, DevTo, Hashnode, etc.)
    }
    async generateContent(understanding, platform, tone = content_types_js_1.ToneProfile.Professional) {
        const generator = this.generators.get(platform);
        if (!generator) {
            throw new Error(`No generator registered for platform: ${platform}`);
        }
        console.log(`[Content Service] Generating content for ${platform} with tone ${tone}`);
        return generator.generate(understanding, tone);
    }
    async approveContent(contentId, organizationId) {
        const content = await prisma_service_js_1.prismaService.client.generatedContent.findUnique({
            where: { id: contentId },
            include: { generation: true },
        });
        if (!content || content.generation.organizationId !== organizationId) {
            throw new Error('Content not found or access denied');
        }
        const updatedContent = await prisma_service_js_1.prismaService.client.generatedContent.update({
            where: { id: contentId },
            data: { status: 'APPROVED' },
        });
        // Prepare for publishing (DO NOT auto-publish yet)
        await publishing_service_js_1.publishingService.preparePublish(contentId, content.platform);
        return updatedContent;
    }
    async rejectContent(contentId, organizationId) {
        const content = await prisma_service_js_1.prismaService.client.generatedContent.findUnique({
            where: { id: contentId },
            include: { generation: true },
        });
        if (!content || content.generation.organizationId !== organizationId) {
            throw new Error('Content not found or access denied');
        }
        return prisma_service_js_1.prismaService.client.generatedContent.update({
            where: { id: contentId },
            data: { status: 'REJECTED' },
        });
    }
}
exports.ContentService = ContentService;
exports.contentService = new ContentService();
